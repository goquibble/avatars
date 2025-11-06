from functools import lru_cache
import json
import random

from app.constants import ASSETS_DIR


@lru_cache
def get_expressions():
    with open(ASSETS_DIR / "expressions.json", "r") as file:
        return json.load(file)


# https://stackabuse.com/bytes/generating-random-hex-colors-in-python/
def get_random_hex_color(rand: random.Random) -> str:
    rand = rand or random

    r = rand.randint(0, 255)
    g = rand.randint(0, 255)
    b = rand.randint(0, 255)

    return f"#{r:02x}{g:02x}{b:02x}"


def resolve_avatar_params(
    seed: str, color: str | None, expression: str | None
) -> tuple[str, str]:
    if not color or not expression:
        rng = random.Random(seed)
        expressions = get_expressions()

        color = color or get_random_hex_color(rng)
        expression = expression or rng.choice(expressions)

    return color, expression
