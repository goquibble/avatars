from typing import Annotated
import cairosvg
from fastapi import APIRouter, Response, Query
from pydantic import AfterValidator

from app.lib.svg import generate_avatar
from app.lib.utils import resolve_avatar_params
from app.validators import expression_validator

router = APIRouter()


@router.get("/avatar/svg")
async def avatar_svg(
    seed: str = "guest", color: str | None = None, expression: str | None = None
) -> Response:
    color, expression = resolve_avatar_params(seed, color, expression)
    svg_content = generate_avatar(color=color, expression=expression)

    return Response(content=svg_content, media_type="image/svg+xml")


@router.get("/avatar/png")
async def avatar_png(
    seed: str = "guest",
    color: str | None = None,
    expression: Annotated[str | None, AfterValidator(expression_validator)] = None,
    size: Annotated[int | None, Query(ge=1, le=1024)] = 128,
) -> Response:
    color, expression = resolve_avatar_params(seed, color, expression)
    svg_content = generate_avatar(color=color, expression=expression)
    png_bytes = cairosvg.svg2png(
        bytestring=svg_content.encode(), output_width=size, output_height=size
    )

    return Response(content=png_bytes, media_type="image/png")
