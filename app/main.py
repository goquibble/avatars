from fastapi import FastAPI, Response

from app.utils.randomizer import random_avatar
from app.utils.svg import generate_avatar

app = FastAPI()


@app.get("/avatar")
async def avatar(
    seed: str = "guest", color: str | None = None, expression: str | None = None
) -> Response:
    if not color or not expression:
        randomized = random_avatar(seed)
        color = color or randomized["color"]
        expression = expression or randomized["expression"]

    svg_content = generate_avatar(seed=seed, color=color, expression=expression)
    return Response(content=svg_content, media_type="image/svg+xml")
