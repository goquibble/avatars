FROM python:3.13-slim AS base
# base work dir
WORKDIR /app
# install cario requird deps
RUN apt-get update -y
RUN apt-get install -y libcairo2

FROM base AS build
# install uv.
COPY --from=ghcr.io/astral-sh/uv:latest /uv /bin/uv

# copy deps and lock file for cache
COPY pyproject.toml uv.lock ./
RUN uv sync --locked --no-cache

# copy the source dir
COPY . /app

FROM base
# copy only source and venv.
COPY --from=build /app /app
# run the application.
CMD ["/app/.venv/bin/uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "80"]
