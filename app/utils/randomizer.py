import json
from pathlib import Path
import random

# app/assets dir
ASSETS_DIR = Path(__file__).resolve().parent.parent / "assets"

with open(ASSETS_DIR / "expressions.json", "r") as file:
    EXPRESSIONS = json.load(file)


# https://stackabuse.com/bytes/generating-random-hex-colors-in-python/
def get_random_hex_color() -> str:
    r = random.randint(0, 255)
    g = random.randint(0, 255)
    b = random.randint(0, 255)
    return f"#{r:02x}{g:02x}{b:02x}"


def random_avatar(seed: str) -> dict[str, str]:
    random.seed(seed)
    return {"color": get_random_hex_color(), "expression": random.choice(EXPRESSIONS)}
