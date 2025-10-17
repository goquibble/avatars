from typing import Annotated
import cairosvg
from fastapi import APIRouter, Response, Query
from pydantic import AfterValidator

from app.utils.randomizer import EXPRESSIONS, random_avatar
from app.utils.svg import generate_avatar

router = APIRouter()


def resolve_avatar(
    seed: str, color: str | None, expression: str | None
) -> tuple[str, str, str]:
    """
    Resolve missing avatar attributes by generating random ones.

    Uses the provided seed to consistently generate a random color and expression
    if they are not explicitly specified.

    Returns:
        tuple[str, str, str]: A tuple containing (seed, color, expression).
    """
    if not color or not expression:
        randomized = random_avatar(seed)
        color = color or randomized["color"]
        expression = expression or randomized["expression"]
    return seed, color, expression


def validate_expression(expression: str):
    """Validate that the provided expression exists in the allowed expressions list."""
    if expression not in EXPRESSIONS:
        err = f"Expression not valid. Only valid ones are {', '.join(EXPRESSIONS)}"
        raise ValueError(err)
    return expression


@router.get("/avatar/svg")
async def avatar_svg(
    seed: str = "guest", color: str | None = None, expression: str | None = None
) -> Response:
    seed, color, expression = resolve_avatar(seed, color, expression)
    svg_content = generate_avatar(color=color, expression=expression)

    return Response(content=svg_content, media_type="image/svg+xml")


@router.get("/avatar/png")
async def avatar_png(
    seed: str = "guest",
    color: str | None = None,
    expression: Annotated[str | None, AfterValidator(validate_expression)] = None,
    size: Annotated[int | None, Query(ge=1, le=1024)] = 128,
) -> Response:
    seed, color, expression = resolve_avatar(seed, color, expression)
    svg_content = generate_avatar(color=color, expression=expression)
    png_bytes = cairosvg.svg2png(
        bytestring=svg_content.encode(), output_width=size, output_height=size
    )

    return Response(content=png_bytes, media_type="image/png")
