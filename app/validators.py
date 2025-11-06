from app.lib.utils import get_expressions


def expression_validator(expression: str):
    expressions = get_expressions()

    if expression not in expressions:
        err = f"Expression not valid. Only valid ones are {', '.join(expressions)}"
        raise ValueError(err)
    return expression
