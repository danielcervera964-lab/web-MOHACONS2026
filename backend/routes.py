from fastapi import APIRouter, HTTPException, Depends, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from models import (
    PresupuestoCreate, Presupuesto, 
    RegistroLlamadaCreate, RegistroLlamada,
    AdminLogin, AdminUser, Token, PresupuestoUpdate
)
from auth import verify_password, get_password_hash, create_access_token, decode_token
from datetime import timedelta, datetime
from typing import List

# Router
router = APIRouter()

# Security
security = HTTPBearer()

# Database will be injected
db = None

def init_db(database):
    """Inicializa la conexión a la base de datos"""
    global db
    db = database

# Dependencia para verificar token
async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    payload = decode_token(token)
    if payload is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token inválido o expirado"
        )
    usuario = payload.get("sub")
    if usuario is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token inválido"
        )
    return usuario

# ==================== ENDPOINTS PÚBLICOS ====================

@router.post("/presupuestos", response_model=Presupuesto, status_code=status.HTTP_201_CREATED)
async def crear_presupuesto(presupuesto_data: PresupuestoCreate):
    """Endpoint público para crear solicitudes de presupuesto"""
    presupuesto = Presupuesto(**presupuesto_data.dict())
    presupuesto_dict = presupuesto.dict()
    
    try:
        await db.presupuestos.insert_one(presupuesto_dict)
        return presupuesto
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error al guardar presupuesto: {str(e)}"
        )

@router.post("/registros-llamada", response_model=RegistroLlamada, status_code=status.HTTP_201_CREATED)
async def crear_registro_llamada(registro_data: RegistroLlamadaCreate):
    """Endpoint público para registrar llamadas"""
    registro = RegistroLlamada(**registro_data.dict())
    registro_dict = registro.dict()
    
    try:
        await db.registros_llamada.insert_one(registro_dict)
        return registro
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error al guardar registro: {str(e)}"
        )

# ==================== ENDPOINTS ADMIN ====================

@router.post("/admin/login", response_model=Token)
async def admin_login(credentials: AdminLogin):
    """Login para administradores"""
    # Buscar usuario en la base de datos
    admin_user = await db.admin_users.find_one({"usuario": credentials.usuario})
    
    if not admin_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Usuario o contraseña incorrectos"
        )
    
    # Verificar contraseña
    if not verify_password(credentials.password, admin_user['password_hash']):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Usuario o contraseña incorrectos"
        )
    
    # Crear token
    access_token = create_access_token(
        data={"sub": admin_user['usuario']},
        expires_delta=timedelta(minutes=480)
    )
    
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/admin/presupuestos", response_model=List[Presupuesto])
async def obtener_presupuestos(
    current_user: str = Depends(get_current_user),
    skip: int = 0,
    limit: int = 100,
    leido: bool = None
):
    """Obtener todos los presupuestos (requiere autenticación)"""
    query = {}
    if leido is not None:
        query['leido'] = leido
    
    presupuestos = await db.presupuestos.find(query).sort("fecha", -1).skip(skip).limit(limit).to_list(limit)
    return [Presupuesto(**p) for p in presupuestos]

@router.get("/admin/presupuestos/{presupuesto_id}", response_model=Presupuesto)
async def obtener_presupuesto(
    presupuesto_id: str,
    current_user: str = Depends(get_current_user)
):
    """Obtener un presupuesto específico"""
    presupuesto = await db.presupuestos.find_one({"id": presupuesto_id})
    if not presupuesto:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Presupuesto no encontrado"
        )
    return Presupuesto(**presupuesto)

@router.patch("/admin/presupuestos/{presupuesto_id}", response_model=Presupuesto)
async def actualizar_presupuesto(
    presupuesto_id: str,
    update_data: PresupuestoUpdate,
    current_user: str = Depends(get_current_user)
):
    """Actualizar un presupuesto (marcar como leído, añadir notas)"""
    update_dict = {k: v for k, v in update_data.dict().items() if v is not None}
    
    if not update_dict:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No hay datos para actualizar"
        )
    
    result = await db.presupuestos.update_one(
        {"id": presupuesto_id},
        {"$set": update_dict}
    )
    
    if result.matched_count == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Presupuesto no encontrado"
        )
    
    presupuesto = await db.presupuestos.find_one({"id": presupuesto_id})
    return Presupuesto(**presupuesto)

@router.delete("/admin/presupuestos/{presupuesto_id}")
async def eliminar_presupuesto(
    presupuesto_id: str,
    current_user: str = Depends(get_current_user)
):
    """Eliminar un presupuesto"""
    result = await db.presupuestos.delete_one({"id": presupuesto_id})
    
    if result.deleted_count == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Presupuesto no encontrado"
        )
    
    return {"message": "Presupuesto eliminado correctamente"}

@router.get("/admin/registros-llamada", response_model=List[RegistroLlamada])
async def obtener_registros_llamada(
    current_user: str = Depends(get_current_user),
    skip: int = 0,
    limit: int = 100
):
    """Obtener todos los registros de llamadas"""
    registros = await db.registros_llamada.find().sort("fecha", -1).skip(skip).limit(limit).to_list(limit)
    return [RegistroLlamada(**r) for r in registros]

@router.get("/admin/estadisticas")
async def obtener_estadisticas(current_user: str = Depends(get_current_user)):
    """Obtener estadísticas generales"""
    total_presupuestos = await db.presupuestos.count_documents({})
    presupuestos_no_leidos = await db.presupuestos.count_documents({"leido": False})
    total_registros_llamada = await db.registros_llamada.count_documents({})
    
    # Presupuestos por urgencia
    urgencias = await db.presupuestos.aggregate([
        {"$group": {"_id": "$urgencia", "count": {"$sum": 1}}}
    ]).to_list(10)
    
    # Presupuestos por servicio
    servicios = await db.presupuestos.aggregate([
        {"$group": {"_id": "$tipoServicio", "count": {"$sum": 1}}}
    ]).to_list(20)
    
    return {
        "total_presupuestos": total_presupuestos,
        "presupuestos_no_leidos": presupuestos_no_leidos,
        "total_registros_llamada": total_registros_llamada,
        "por_urgencia": {item['_id']: item['count'] for item in urgencias},
        "por_servicio": {item['_id']: item['count'] for item in servicios}
    }

# ==================== INICIALIZACIÓN ====================

async def init_admin_user():
    """Crea el usuario administrador si no existe"""
    admin_exists = await db.admin_users.find_one({"usuario": "MOHAC"})
    
    if not admin_exists:
        admin_user = AdminUser(
            usuario="MOHAC",
            password_hash=get_password_hash("MOHA2026"),
            nombre="Administrador MOHACONS",
            email="admin@mohacons.com"
        )
        await db.admin_users.insert_one(admin_user.dict())
        print("✓ Usuario administrador creado: MOHAC")
    else:
        print("✓ Usuario administrador ya existe")
