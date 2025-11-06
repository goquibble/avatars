from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_avatar_svg_defaults():
    response = client.get("/1.x/avatar/svg")
    assert response.status_code == 200
    assert response.headers["content-type"] == "image/svg+xml"
    assert response.content.startswith(b"<svg")


def test_avatar_svg_with_query_params():
    response = client.get("/1.x/avatar/svg?seed=test")
    assert response.status_code == 200
    assert response.headers["content-type"] == "image/svg+xml"
    assert b"<svg" in response.content


def test_avatar_png_defaults():
    response = client.get("/1.x/avatar/png")
    assert response.status_code == 200
    assert response.headers["content-type"] == "image/png"
    # PNG files start with the PNG signature bytes: 89 50 4E 47 0D 0A 1A 0A
    assert response.content.startswith(b"\x89PNG\r\n\x1a\n")


def test_avatar_png_size_validation():
    # test size too large (above max 1024) returns 422
    response = client.get("/1.x/avatar/png?size=2048")
    assert response.status_code == 422

    # test size too small (below min 1) returns 422
    response = client.get("/1.x/avatar/png?size=0")
    assert response.status_code == 422


def test_avatar_png_invalid_expression():
    # test invalid expression (should trigger validation error)
    response = client.get("/1.x/avatar/png?expression=invalid_expression")
    assert response.status_code == 422
