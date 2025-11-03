from fastapi import APIRouter
from app.api.routes import news, insights, health

api_router = APIRouter()

# Include all route modules
api_router.include_router(health.router)
api_router.include_router(news.router)
api_router.include_router(insights.router)
