from fastapi import FastAPI

from app.routes.v1.avatar import router as v1_avatar_router

app = FastAPI()
app.include_router(v1_avatar_router, prefix="/1.x")
