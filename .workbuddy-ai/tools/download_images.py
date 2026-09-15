"""Download the curated photography at production sizes and emit blur placeholders.

Outputs:
  public/images/<group>/<name>.jpg
  src/lib/blur-data.ts   (base64 LQIP map for next/image placeholder="blur")
"""
import base64
import io
import json
import os
import sys
from concurrent.futures import ThreadPoolExecutor

from PIL import Image

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
IMG_ROOT = os.path.join(ROOT, "public", "images")
UA = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
                    "(KHTML, like Gecko) Chrome/120.0 Safari/537.36"}

# (group, name, unsplash id, width)
MANIFEST = [
    # ---------- site-wide / hero ----------
    ("site", "hero-desert-villa", "1600596542815-ffad4c1539a9", 2560),
    ("site", "cta-desert-dusk", "1509316785289-025f5b846b35", 2400),
    ("site", "seller-estate-dusk", "1600585154340-be6161a56a0c", 1800),
    ("site", "why-architecture", "1487958449943-2429e8be8625", 1600),
    ("site", "global-canyon", "1533587851505-d119e13fa0d7", 2000),
    ("site", "about-hero", "1523217582562-09d0def993a6", 2000),
    ("site", "contact-hero", "1600573472592-401b489a3cdc", 2000),
    ("site", "phoenix-skyline", "1486406146926-c627a92ad1ab", 1600),
    ("site", "desert-road", "1500530855697-b586d89ba3ee", 1800),
    ("site", "search-panel", "1600566753190-17f0baa2a6c3", 2000),
    ("site", "buyer-architecture", "1511818966892-d7d671e672a2", 1400),
    ("site", "story-interior", "1600585154084-4e5fe7c39198", 1600),

    # ---------- properties (hero card image) ----------
    ("properties", "paradise-valley-modern-desert-estate", "1613490493576-7fde63acd811", 1800),
    ("properties", "north-scottsdale-hillside-contemporary", "1512917774080-9991f1c4c750", 1800),
    ("properties", "scottsdale-silverleaf-estate", "1600585154526-990dced4db0d", 1800),
    ("properties", "arcadia-camelback-vista-residence", "1494526585095-c41746248156", 1800),
    ("properties", "phoenix-papago-park-modern", "1600047509358-9dc75507daeb", 1800),
    ("properties", "paradise-valley-vista-del-sol", "1613977257363-707ba9348227", 1800),
    ("properties", "central-scottsdale-cactus-corridor", "1580587771525-78b9dba3b914", 1800),
    ("properties", "gilbert-agritopia-courtyard-home", "1600585153490-76fb20a32601", 1800),
    ("properties", "mesa-las-sendas-desert-retreat", "1600047509782-20d39509f26d", 1800),
    ("properties", "tempe-papago-contemporary", "1600607688969-a5bfcd646154", 1800),
    ("properties", "north-scottsdale-desert-highlands", "1600566753376-12c8ab7fb75b", 1800),
    ("properties", "phoenix-biltmore-estate", "1564013799919-ab600027ffc6", 1800),

    # ---------- property gallery / interiors ----------
    ("interiors", "great-room-fireplace", "1600607687939-ce8a6c25118c", 1600),
    ("interiors", "open-plan-timber", "1600585154084-4e5fe7c39198", 1600),
    ("interiors", "glass-living-view", "1560448204-e02f11c3d0e2", 1600),
    ("interiors", "warm-living-garden", "1600210492486-724fe5c67fb0", 1600),
    ("interiors", "chef-kitchen-ivory", "1600585152220-90363fe7e115", 1600),
    ("interiors", "spa-bathroom-stone", "1600566752355-35792bedcfea", 1600),
    ("interiors", "editorial-living-warm", "1618221195710-dd6b41faaea6", 1600),
    ("interiors", "neutral-lounge", "1616486338812-3dadae4b4ace", 1600),
    ("interiors", "midcentury-timber-lounge", "1600210492493-0946911123ea", 1600),
    ("interiors", "minimal-kitchen-island", "1600607686527-6fb886090705", 1600),
    ("interiors", "primary-suite", "1586105251261-72a756497a11", 1600),
    ("interiors", "dining-pavilion", "1600607687920-4e2a09cf159d", 1600),
    ("interiors", "guest-bedroom-light", "1512918728675-ed5a9ecdebfd", 1600),
    ("interiors", "marble-bath-detail", "1552321554-5fefe8c9ef14", 1600),
    ("interiors", "sunlit-living", "1600566753086-00f18fb6b3ea", 1600),
    ("interiors", "stone-bath-vanity", "1600607688066-890987f18a86", 1600),
    ("interiors", "breakfast-nook", "1560185007-cde436f6a4d0", 1600),
    ("interiors", "family-room-neutral", "1560448204-603b3fc33ddc", 1600),
    ("interiors", "serene-bedroom", "1600607687644-c7171b42498f", 1600),
    ("interiors", "pool-terrace-glass", "1600573472550-8090b5e0745e", 1600),

    # ---------- neighbourhoods ----------
    ("neighborhoods", "paradise-valley", "1580587771525-78b9dba3b914", 1600),
    ("neighborhoods", "scottsdale", "1568605114967-8130f3a36994", 1600),
    ("neighborhoods", "arcadia", "1511818966892-d7d671e672a2", 1600),
    ("neighborhoods", "tempe", "1444723121867-7a241cacace9", 1600),
    ("neighborhoods", "phoenix", "1600573472592-401b489a3cdc", 1600),
    ("neighborhoods", "north-scottsdale", "1600585154526-990dced4db0d", 1600),
    ("neighborhoods", "central-scottsdale", "1600047509807-ba8f99d2cdde", 1600),
    ("neighborhoods", "gilbert", "1600047509358-9dc75507daeb", 1600),
    ("neighborhoods", "mesa", "1500530855697-b586d89ba3ee", 1600),

    # ---------- insights ----------
    ("insights", "arizona-market-update", "1486406146926-c627a92ad1ab", 1600),
    ("insights", "scottsdale-luxury-market", "1600596542815-ffad4c1539a9", 1600),
    ("insights", "paradise-valley-guide", "1613490493576-7fde63acd811", 1600),
    ("insights", "arizona-investment-opportunities", "1547234935-80c7145ec969", 1600),
    ("insights", "desert-modern-architecture", "1512915922686-57c11dde9b6b", 1600),
    ("insights", "international-buyers-guide", "1512699355324-f07e3106dae5", 1600),

    # ---------- team ----------
    ("team", "chris-gray", "1560250097-0b93528c311a", 900),
    ("team", "jan-gray", "1573497019940-1c28c88b4f3e", 900),
    ("team", "marcus-hale", "1519085360753-af0119f7cbe7", 900),
    ("team", "elena-ruiz", "1494790108377-be9c29b29330", 900),
]

BLUR_MAP = {}


def download(item):
    group, name, pid, width = item
    dest_dir = os.path.join(IMG_ROOT, group)
    os.makedirs(dest_dir, exist_ok=True)
    dest = os.path.join(dest_dir, f"{name}.jpg")
    url = f"https://images.unsplash.com/photo-{pid}?w={width}&q=80&fm=jpg&fit=max&auto=format"
    try:
        import urllib.request
        req = urllib.request.Request(url, headers=UA)
        with urllib.request.urlopen(req, timeout=60) as r:
            data = r.read()
        if len(data) < 3000:
            return group, name, None, "too small"
        with open(dest, "wb") as f:
            f.write(data)
        # blur placeholder
        im = Image.open(io.BytesIO(data)).convert("RGB")
        w, h = im.size
        tiny = im.resize((16, max(1, round(16 * h / w))), Image.LANCZOS)
        buf = io.BytesIO()
        tiny.save(buf, format="JPEG", quality=42)
        BLUR_MAP[f"/images/{group}/{name}.jpg"] = (
            "data:image/jpeg;base64," + base64.b64encode(buf.getvalue()).decode()
        )
        return group, name, (w, h, len(data)), None
    except Exception as exc:  # noqa: BLE001
        return group, name, None, str(exc)


def main():
    with ThreadPoolExecutor(max_workers=8) as ex:
        results = list(ex.map(download, MANIFEST))

    fails = [(g, n, e) for g, n, ok, e in results if ok is None]
    ok = [(g, n, ok) for g, n, ok, e in results if ok is not None]
    total = sum(o[2] for _, _, o in ok)
    print(f"downloaded {len(ok)}/{len(MANIFEST)}  total={total / 1024 / 1024:.1f} MB")
    for g, n, e in fails:
        print("  FAIL", g, n, e)

    lines = [
        "// AUTO-GENERATED by .workbuddy-ai/tools/curate_images.py — do not edit by hand.",
        "// Tiny base64 LQIP placeholders for next/image `placeholder=\"blur\"`.",
        "",
        "export const blurData: Record<string, string> = {",
    ]
    for path in sorted(BLUR_MAP):
        lines.append(f'  "{path}":')
        lines.append(f'    "{BLUR_MAP[path]}",')
    lines.append("};")
    lines.append("")
    lines.append("/** Returns the LQIP placeholder for a public image path, if one exists. */")
    lines.append("export function blurFor(src: string): string | undefined {")
    lines.append("  return blurData[src];")
    lines.append("}")
    lines.append("")
    out = os.path.join(ROOT, "src", "lib", "blur-data.ts")
    os.makedirs(os.path.dirname(out), exist_ok=True)
    with open(out, "w", encoding="utf-8") as f:
        f.write("\n".join(lines))
    print("wrote", out, len(BLUR_MAP), "placeholders")

    with open(os.path.join(ROOT, ".workbuddy-ai", "image-manifest.json"), "w", encoding="utf-8") as f:
        json.dump(
            [{"group": g, "name": n, "size": o} for g, n, o in ok],
            f,
            indent=2,
        )


if __name__ == "__main__":
    sys.exit(main())
