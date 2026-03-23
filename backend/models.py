from pydantic import BaseModel, Field, EmailStr
from typing import Optional
from datetime import datetime
import uuid

class PresupuestoCreate(BaseModel):
    nombre: str
    email: EmailStr
    telefono: str
    tipoServicio: str
    direccion: str
    descripcion: str
    presupuesto: Optional[str] = None
    urgencia: str

class Presupuesto(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    nombre: str
    email: EmailStr
    telefono: str
    tipoServicio: str
    direccion: str
    descripcion: str
    presupuesto: Optional[str] = None
    urgencia: str
    fecha: datetime = Field(default_factory=datetime.utcnow)
    leido: bool = False
    notas: Optional[str] = None

class RegistroLlamadaCreate(BaseModel):
    nombre: str
    email: EmailStr

class RegistroLlamada(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    nombre: str
    email: EmailStr
    fecha: datetime = Field(default_factory=datetime.utcnow)
    llamadaRealizada: bool = False

class ContactoCreate(BaseModel):
    nombre: str
    email: EmailStr
    telefono: str
    servicio: str

class Contacto(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    nombre: str
    email: EmailStr
    telefono: str
    servicio: str
    fecha: datetime = Field(default_factory=datetime.utcnow)
    leido: bool = False

class AdminLogin(BaseModel):
    usuario: str
    password: str

class AdminUser(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    usuario: str
    password_hash: str
    nombre: str
    email: EmailStr
    createdAt: datetime = Field(default_factory=datetime.utcnow)

class Token(BaseModel):
    access_token: str
    token_type: str

class PresupuestoUpdate(BaseModel):
    leido: Optional[bool] = None
    notas: Optional[str] = None
