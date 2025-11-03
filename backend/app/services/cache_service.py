import json
import hashlib
from typing import Optional, Any
from app.core.logging import logger

try:
    import redis
    from app.core.config import settings
    
    redis_client = redis.Redis(
        host=settings.REDIS_HOST,
        port=settings.REDIS_PORT,
        db=settings.REDIS_DB,
        decode_responses=True
    )
    REDIS_AVAILABLE = True
except Exception as e:
    logger.warning(f"Redis not available: {e}. Caching disabled.")
    REDIS_AVAILABLE = False
    redis_client = None


class CacheService:
    """Service for caching with Redis"""
    
    @staticmethod
    def _generate_key(prefix: str, data: Any) -> str:
        """Generate cache key from data"""
        data_str = json.dumps(data, sort_keys=True)
        hash_obj = hashlib.md5(data_str.encode())
        return f"{prefix}:{hash_obj.hexdigest()}"
    
    @staticmethod
    def get(key: str) -> Optional[Any]:
        """Get value from cache"""
        if not REDIS_AVAILABLE:
            return None
        
        try:
            value = redis_client.get(key)
            if value:
                logger.info(f"Cache hit: {key}")
                return json.loads(value)
            logger.info(f"Cache miss: {key}")
            return None
        except Exception as e:
            logger.error(f"Cache get error: {e}")
            return None
    
    @staticmethod
    def set(key: str, value: Any, ttl: int = None) -> bool:
        """Set value in cache"""
        if not REDIS_AVAILABLE:
            return False
        
        try:
            from app.core.config import settings
            ttl = ttl or settings.CACHE_TTL
            
            redis_client.setex(
                key,
                ttl,
                json.dumps(value)
            )
            logger.info(f"Cache set: {key} (TTL: {ttl}s)")
            return True
        except Exception as e:
            logger.error(f"Cache set error: {e}")
            return False
    
    @staticmethod
    def delete(key: str) -> bool:
        """Delete value from cache"""
        if not REDIS_AVAILABLE:
            return False
        
        try:
            redis_client.delete(key)
            logger.info(f"Cache deleted: {key}")
            return True
        except Exception as e:
            logger.error(f"Cache delete error: {e}")
            return False
    
    @staticmethod
    def clear_pattern(pattern: str) -> int:
        """Clear all keys matching pattern"""
        if not REDIS_AVAILABLE:
            return 0
        
        try:
            keys = redis_client.keys(pattern)
            if keys:
                count = redis_client.delete(*keys)
                logger.info(f"Cache cleared: {count} keys matching {pattern}")
                return count
            return 0
        except Exception as e:
            logger.error(f"Cache clear error: {e}")
            return 0


cache_service = CacheService()
