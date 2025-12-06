import json
import random
from functools import lru_cache

from app.constants import ASSETS_DIR


@lru_cache
def get_expressions():
    with open(ASSETS_DIR / "expressions.json", "r") as file:
        return json.load(file)


@lru_cache
def get_colors():
    with open(ASSETS_DIR / "colors.json", "r") as file:
        return json.load(file)


def resolve_avatar_params(
    seed: str, color: str | None, expression: str | None
) -> tuple[str, str]:
    if not color or not expression:
        rng = random.Random(seed)
        expressions = get_expressions()
        colors = get_colors()

        color = color or rng.choice(colors)
        expression = expression or rng.choice(expressions)

    return color, expression
