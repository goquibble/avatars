from pathlib import Path
import re
import xml.etree.ElementTree as ET

# app/assets dir
ASSETS_DIR = Path(__file__).resolve().parent.parent / "assets"


def load_svg_snippet(name: str, folder: str = ".") -> str:
    path = ASSETS_DIR / folder / f"{name}.svg"
    if not path.exists():
        raise FileNotFoundError(f"{folder}/{name}.svg not found")
    return path.read_text()


def clean_svg(svg: str) -> str:
    """Remove outer <svg> tags, keep inner paths/groups."""
    return re.sub(r"</?svg[^>]*>", "", svg).strip()


def extract_viewbox_dimensions(svg: str) -> tuple[float, float]:
    root = ET.fromstring(svg)
    viewbox = root.attrib.get("viewBox")
    if not viewbox:
        raise ET.ParseError("SVG has no attribute viewBox!")

    _, _, w, h = map(float, viewbox.split())
    return -w / 2, -h / 2


def generate_avatar(color: str, expression: str) -> str:
    body_svg = load_svg_snippet("body")
    face_svg = load_svg_snippet(expression, folder="expressions")

    body_svg = body_svg.replace("{{color}}", color)
    offset_x, offset_y = extract_viewbox_dimensions(face_svg)

    combined_svg = f"""
    <svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
        {clean_svg(body_svg)}
        <g transform="translate(150,175)" style="transform-box: fill-box; transform-origin: center;">
            <g transform="translate({offset_x},{offset_y})">
                {clean_svg(face_svg)}
            </g>
        </g>
    </svg>
    """

    return combined_svg.strip()
