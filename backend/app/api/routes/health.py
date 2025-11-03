from fastapi import APIRouter
from datetime import datetime

from app.models.schemas import HealthResponse
from app.core.config import settings

router = APIRouter(prefix="/health", tags=["health"])


@router.get("", response_model=HealthResponse)
async def health_check():
    """
    Health check endpoint
    
    Returns API status and version information
    """
    return HealthResponse(
        status="healthy",
        version=settings.API_VERSION,
        timestamp=datetime.now()
    )
