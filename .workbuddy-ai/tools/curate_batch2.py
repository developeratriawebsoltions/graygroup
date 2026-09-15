"""Second curation batch: deeper pool of luxury exteriors and Arizona architecture."""
import os
import sys
from concurrent.futures import ThreadPoolExecutor

from PIL import Image, ImageDraw

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from curate_images import UA, fetch, OUT, SHEET  # noqa: E402

import urllib.request  # noqa: E402

BATCH2 = [
    "1600585153490-76fb20a32601", "1605276374104-dee2a0ed3cd6",
    "1600573472550-8090b5e0745e", "1600585154084-4e5fe7c39198",
    "1600607688969-a5bfcd646154", "1600607688066-890987f18a86",
    "1600566753190-17f0baa2a6c3", "1600607687644-c7171b42498f",
    "1592595896551-12b371d546d5", "1567496898669-ee935f5f647a",
    "1598228723793-52759bba239c", "1512915922686-57c11dde9b6b",
    "1523217582562-09d0def993a6", "1560185127-6ed189bf02f4",
    "1560184897-ae75f418493e", "1560185007-cde436f6a4d0",
    "1560185031-0e4e2966929a", "1560448204-603b3fc33ddc",
    "1600610281865-1808ce97d8ff", "1528127269322-539801943592",
    "1602085026020-9c1a0b0d1b0e", "1600047509782-20d39509f26d",
    "1600566753376-12c8ab7fb75b", "1583608205776-bfd35f0d9f83",
    "1613977257363-707ba9348227", "1600607687644-c7171b42498f",
    "1600585154340-be6161a56a0c", "1502005229762-cf1b2da7c5d6",
    "1512699355324-f07e3106dae5", "1493809842364-78817add7ffb",
]


def main():
    seen = set()
    pool = [p for p in BATCH2 if not (p in seen or seen.add(p))]
    with ThreadPoolExecutor(max_workers=12) as ex:
        results = list(ex.map(fetch, pool))
    ok = [(p, path) for p, path in results if path]
    print(f"batch2 downloaded {len(ok)}/{len(pool)}")

    cols, cw, ch = 5, 340, 240
    rows = (len(ok) + cols - 1) // cols
    sheet = Image.new("RGB", (cols * cw, rows * (ch + 26)), (245, 243, 238))
    draw = ImageDraw.Draw(sheet)
    lines = []
    for i, (pid, path) in enumerate(ok):
        r, c = divmod(i, cols)
        im = Image.open(path).convert("RGB").resize((cw, ch))
        x, y = c * cw, r * (ch + 26)
        sheet.paste(im, (x, y))
        draw.text((x + 6, y + ch + 6), f"B{i}  {pid[:24]}", fill=(20, 20, 20))
        lines.append(f"B{i}\t{pid}")
    out = os.path.join(SHEET, "batch2.jpg")
    sheet.save(out, quality=82)
    print("SHEET", out, sheet.size)
    with open(os.path.join(SHEET, "batch2.txt"), "w", encoding="utf-8") as f:
        f.write("\n".join(lines))


if __name__ == "__main__":
    main()
