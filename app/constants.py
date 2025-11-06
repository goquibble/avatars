import json
from pathlib import Path

CLIENT_CACHE_MAX_AGE: int = 31536000  # 1yr
ASSETS_DIR = Path(__file__).resolve().parent.parent / "assets"


def load_expressions():
    with open(ASSETS_DIR / "expressions.json", "r") as file:
        return json.load(file)


EXPRESSIONS = load_expressions()
