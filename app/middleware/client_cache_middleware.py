from typing import override
from fastapi import Request, Response
from starlette.middleware.base import BaseHTTPMiddleware, RequestResponseEndpoint
from starlette.types import ASGIApp


class ClientCacheMiddleware(BaseHTTPMiddleware):
    def __init__(self, app: ASGIApp, max_age: int = 60) -> None:
        super().__init__(app)
        self.max_age: int = max_age

    @override
    async def dispatch(
        self, request: Request, call_next: RequestResponseEndpoint
    ) -> Response:
        response: Response = await call_next(request)
        response.headers["Cache-Control"] = f"public, max-age={self.max_age}, immutable"
        return response
