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
    # The SVG endpoint doesn't directly handle size for the root SVG element
    # as the SVG itself is vector and can be scaled by the client.
    # We pass a default size (e.g., 128) to generate_avatar for consistent internal element sizing,
    # though the SVG itself can be rendered at any resolution.
    svg_content = generate_avatar(seed=seed, color=color, expression=expression, size=128)

    return Response(content=svg_content, media_type="image/svg+xml")


@router.get("/avatar/png")
async def avatar_png(
    seed: str = "guest",
    color: str | None = None,
    expression: str | None = None,
    size: int = Query(128, ge=1, le=1024, description="Desired width and height of the PNG image in pixels."),
) -> Response:
    seed, color, expression = resolve_avatar(seed, color, expression)
    # Pass the requested size to generate_avatar so the SVG content
    # is generated with appropriate internal scaling for the target PNG dimensions.
    svg_content = generate_avatar(seed=seed, color=color, expression=expression, size=size)
    png_bytes = cairosvg.svg2png(
        bytestring=svg_content.encode("utf-8"),
        output_width=size,  # Use the provided size for PNG output dimensions
        output_height=size,
    )

    return Response(content=png_bytes, media_type="image/png")