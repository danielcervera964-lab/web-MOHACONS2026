from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from routes import router as api_routes, init_admin_user, init_db

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Initialize database in routes module
init_db(db)

# Create the main app
app = FastAPI(
    title="MOHACONS API", 
    version="1.0.0",
    description="Sistema Profesional de Gestión de Presupuestos para MOHACONS"
)

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Health check endpoint
@api_router.get("/")
async def root():
    return {
        "message": "MOHACONS API - Sistema de Gestión de Presupuestos",
        "version": "1.0.0",
        "status": "operational"
    }

# Include all routes
api_router.include_router(api_routes)
app.include_router(api_router)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("startup")
async def startup_event():
    """Inicialización al arrancar el servidor"""
    logger.info("🚀 Iniciando servidor MOHACONS...")
    await init_admin_user()
    logger.info("✓ Sistema listo - Panel Admin disponible")

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
    logger.info("👋 Servidor detenido")
