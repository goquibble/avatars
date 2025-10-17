from typing import Annotated
import cairosvg
from fastapi import APIRouter, Response, Query

from app.utils.randomizer import random_avatar
from app.utils.svg import generate_avatar

router = APIRouter()


def resolve_avatar(
    seed: str, color: str | None, expression: str | None
) -> tuple[str, str, str]:
    if not color or not expression:
        randomized = random_avatar(seed)
        color = color or randomized["color"]
        expression = expression or randomized["expression"]
    return seed, color, expression


@router.get("/avatar/svg")
async def avatar_svg(
    seed: str = "guest", color: str | None = None, expression: str | None = None
) -> Response:
    seed, color, expression = resolve_avatar(seed, color, expression)
    svg_content = generate_avatar(seed=seed, color=color, expression=expression)

    return Response(content=svg_content, media_type="image/svg+xml")


@router.get("/avatar/png")
async def avatar_png(
    seed: str = "guest",
    color: str | None = None,
    expression: str | None = None,
    size: Annotated[int | None, Query(ge=1, le=1024)] = 128,
) -> Response:
    seed, color, expression = resolve_avatar(seed, color, expression)
    svg_content = generate_avatar(seed=seed, color=color, expression=expression)
    png_bytes = cairosvg.svg2png(
        bytestring=svg_content.encode("utf-8"), output_width=size, output_height=size
    )

    return Response(content=png_bytes, media_type="image/png")
