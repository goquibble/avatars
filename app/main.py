from fastapi import FastAPI
from mangum import Mangum

from app.constants import CLIENT_CACHE_MAX_AGE
from app.middleware.client_cache_middleware import ClientCacheMiddleware
from app.routes.v1 import avatar

app = FastAPI()

app.add_middleware(ClientCacheMiddleware, max_age=CLIENT_CACHE_MAX_AGE)  # ty:ignore[invalid-argument-type]
app.include_router(avatar.router, prefix="/1.x")

# for aws lambda
handler = Mangum(app)
