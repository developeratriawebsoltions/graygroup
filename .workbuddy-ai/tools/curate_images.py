"""Download candidate thumbnails from Unsplash and build labelled contact sheets.

Used only during development to visually curate photography for the site.
"""
import os
import sys
import urllib.request
from concurrent.futures import ThreadPoolExecutor

from PIL import Image, ImageDraw

OUT = os.path.join(os.environ.get("TEMP", "/tmp"), "gg_thumbs")
SHEET = os.path.join(os.environ.get("TEMP", "/tmp"), "gg_sheets")
os.makedirs(OUT, exist_ok=True)
os.makedirs(SHEET, exist_ok=True)

UA = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
                    "(KHTML, like Gecko) Chrome/120.0 Safari/537.36"}

CANDIDATES = [
    # --- Luxury exteriors / estates ---
    "1600585154340-be6161a56a0c", "1600596542815-ffad4c1539a9",
    "1600607687939-ce8a6c25118c", "1512917774080-9991f1c4c750",
    "1568605114967-8130f3a36994", "1570129477492-45c003edd2be",
    "1580587771525-78b9dba3b914", "1564013799919-ab600027ffc6",
    "1613490493576-7fde63acd811", "1512918728675-ed5a9ecdebfd",
    "1449844908441-8829872d2607", "1502672260266-1c1ef2d93688",
    "1560448204-e02f11c3d0e2", "1493809842364-78817add7ffb",
    "1522708323590-d24dbb6b0267", "1600047509807-ba8f99d2cdde",
    "1600566753086-00f18fb6b3ea", "1600210492486-724fe5c67fb0",
    "1600607687920-4e2a09cf159d", "1600585152220-90363fe7e115",
    "1600573472592-401b489a3cdc", "1600047509358-9dc75507daeb",
    "1600566752355-35792bedcfea", "1600585154526-990dced4db0d",
    # --- Desert / landscape / mountains ---
    "1547234935-80c7145ec969", "1509316785289-025f5b846b35",
    "1533587851505-d119e13fa0d7", "1518152006812-edab29b069ac",
    "1470770903676-69b98201ea1c", "1500530855697-b586d89ba3ee",
    "1469474968028-56623f02e42e", "1509316785289-025f5b846b35",
    # --- City / skyline / architecture ---
    "1544198365-f5d60b6d8190", "1518391846015-55a9cc003b25",
    "1444723121867-7a241cacace9", "1486406146926-c627a92ad1ab",
    "1470071459604-3b5ec3a7fe05", "1487958449943-2429e8be8625",
    "1511818966892-d7d671e672a2", "1494526585095-c41746248156",
    # --- Luxury interiors ---
    "1618221195710-dd6b41faaea6", "1616486338812-3dadae4b4ace",
    "1600210492493-0946911123ea", "1600607686527-6fb886090705",
    "1586023492125-27b2c045efd7", "1586105251261-72a756497a11",
    "1524758631624-e2822e304c36", "1497366754035-f200968a6e72",
    "1567016432779-094069958ea5", "1552321554-5fefe8c9ef14",
    "1615529182904-14819c35db37", "1600121848594-d8644e57abab",
    # --- Portraits ---
    "1560250097-0b93528c311a", "1507003211169-0a1dd7228f2d",
    "1472099645785-5658abf4ff4e", "1494790108377-be9c29b29330",
    "1573497019940-1c28c88b4f3e", "1580489944761-15a19d654956",
    "1519085360753-af0119f7cbe7", "1500648767791-00dcc994a43e",
]

# de-dupe, preserve order
seen = set()
POOL = [c for c in CANDIDATES if not (c in seen or seen.add(c))]


def fetch(pid: str):
    path = os.path.join(OUT, f"{pid}.jpg")
    if os.path.exists(path) and os.path.getsize(path) > 2000:
        return pid, path
    url = f"https://images.unsplash.com/photo-{pid}?w=340&h=240&fit=crop&q=70&fm=jpg"
    try:
        req = urllib.request.Request(url, headers=UA)
        with urllib.request.urlopen(req, timeout=30) as r:
            data = r.read()
        if len(data) < 2000:
            return pid, None
        with open(path, "wb") as f:
            f.write(data)
        return pid, path
    except Exception as exc:  # noqa: BLE001
        print("FAIL", pid, exc, file=sys.stderr)
        return pid, None


def build_sheet(items, index, name):
    cols, cw, ch = 5, 340, 240
    rows = (len(items) + cols - 1) // cols
    sheet = Image.new("RGB", (cols * cw, rows * (ch + 26)), (245, 243, 238))
    draw = ImageDraw.Draw(sheet)
    for i, (pid, path) in enumerate(items):
        r, c = divmod(i, cols)
        try:
            im = Image.open(path).convert("RGB").resize((cw, ch))
        except Exception:  # noqa: BLE001
            continue
        x, y = c * cw, r * (ch + 26)
        sheet.paste(im, (x, y))
        draw.text((x + 6, y + ch + 6), f"#{index[i]}  {pid[:22]}", fill=(20, 20, 20))
    out = os.path.join(SHEET, f"{name}.jpg")
    sheet.save(out, quality=82)
    print("SHEET", out, sheet.size)


def main():
    with ThreadPoolExecutor(max_workers=12) as ex:
        results = list(ex.map(fetch, POOL))
    ok = [(p, path) for p, path in results if path]
    index = {pid: i for i, (pid, _) in enumerate(ok)}
    print(f"downloaded {len(ok)}/{len(POOL)}")
    chunk = 25
    for n in range(0, len(ok), chunk):
        part = ok[n:n + chunk]
        build_sheet(part, [index[p] for p, _ in part], f"sheet_{n // chunk + 1}")
    with open(os.path.join(SHEET, "index.txt"), "w", encoding="utf-8") as f:
        for pid, _ in ok:
            f.write(f"{index[pid]}\t{pid}\n")


if __name__ == "__main__":
    main()
