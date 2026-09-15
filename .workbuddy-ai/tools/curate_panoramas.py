"""Preview Poly Haven CC0 equirectangular panoramas to pick tour assets."""
import io
import os
import urllib.request
from concurrent.futures import ThreadPoolExecutor

from PIL import Image, ImageDraw

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
TMP = os.path.join(ROOT, ".workbuddy-ai", "tmp")
os.makedirs(TMP, exist_ok=True)
UA = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"}

CANDIDATES = [
    "hotel_room", "kiara_interior", "cayley_interior", "white_home_studio",
    "small_empty_house", "solitude_interior", "industrial_wooden_attic",
    "pine_attic", "lythwood_lounge", "lythwood_room", "modern_bathroom",
    "combination_room", "bathroom", "old_room", "empty_play_room",
    "ferndale_studio_01", "ferndale_studio_05", "ferndale_studio_09",
    "anniversary_lounge", "aft_lounge", "art_studio", "blocky_photo_studio",
    "brown_photostudio_01", "monochrome_studio_01", "entrance_hall",
    "cinema_lobby", "newman_lobby", "hayloft", "mirrored_hall", "old_hall",
]


def fetch(slug):
    dest = os.path.join(TMP, f"ph_{slug}.jpg")
    if os.path.exists(dest) and os.path.getsize(dest) > 5000:
        return slug, dest
    url = f"https://cdn.polyhaven.com/asset_img/primary/{slug}.png?height=420"
    try:
        req = urllib.request.Request(url, headers=UA)
        with urllib.request.urlopen(req, timeout=60) as r:
            data = r.read()
        if len(data) < 4000:
            return slug, None
        Image.open(io.BytesIO(data)).convert("RGB").save(dest, quality=85)
        return slug, dest
    except Exception as exc:  # noqa: BLE001
        print("FAIL", slug, exc)
        return slug, None


def main():
    with ThreadPoolExecutor(max_workers=8) as ex:
        results = list(ex.map(fetch, CANDIDATES))
    ok = [(s, p) for s, p in results if p]
    print(f"fetched {len(ok)}/{len(CANDIDATES)}")

    cols, cw, ch = 3, 520, 260
    rows = (len(ok) + cols - 1) // cols
    sheet = Image.new("RGB", (cols * cw, rows * (ch + 24)), (247, 244, 238))
    draw = ImageDraw.Draw(sheet)
    for i, (slug, path) in enumerate(ok):
        r, c = divmod(i, cols)
        im = Image.open(path).convert("RGB").resize((cw, ch))
        x, y = c * cw, r * (ch + 24)
        sheet.paste(im, (x, y))
        draw.text((x + 6, y + ch + 6), f"P{i}  {slug}", fill=(20, 20, 20))
    out = os.path.join(TMP, "pano_sheet.jpg")
    sheet.save(out, quality=84)
    print("SHEET", out, sheet.size)
    for i, (slug, _) in enumerate(ok):
        print(f"P{i}\t{slug}")


if __name__ == "__main__":
    main()
