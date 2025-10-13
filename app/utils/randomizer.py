import json
from pathlib import Path
import random

# app/assets dir
ASSETS_DIR = Path(__file__).resolve().parent.parent / "assets"

with open(ASSETS_DIR / "expressions.json", "r") as file:
    EXPRESSIONS = json.load(file)
with open(ASSETS_DIR / "colors.json", "r") as file:
    COLORS = json.load(file)


def random_avatar(seed: str) -> dict[str, str]:
    random.seed(seed)
    return {"color": random.choice(COLORS), "expression": random.choice(EXPRESSIONS)}
