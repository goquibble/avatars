import random

EXPRESSIONS = ["smile"]
COLORS = ["#0AB5F1"]


def random_avatar(seed: str) -> dict[str, str]:
    random.seed(seed)
    return {"color": random.choice(COLORS), "expression": random.choice(EXPRESSIONS)}
