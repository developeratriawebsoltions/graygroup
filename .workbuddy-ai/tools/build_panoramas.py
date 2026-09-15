"""Build seamless 360-degree cylindrical panoramas for the virtual tour.

Each panorama is a circular sequence of the property's own interior
photography — A -> B -> C -> D -> A — laid out with long, smoothstep cross
dissolves. Because the sequence closes on itself, the left and right edges of
the strip are the same part of the same photograph, so the wrap is exact and
there is no seam.

Exposure is normalised across the set first, so the dissolves read as a change
of room rather than a change of lighting.

Output: public/images/tours/<name>.jpg at 4096x1024 (4:1).
"""
import os

from PIL import Image, ImageStat

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
SRC = os.path.join(ROOT, "public", "images")
DEST = os.path.join(SRC, "tours")

WIDTH, HEIGHT = 4096, 1024
STEPS = 4                      # photographs in the loop
STEP = WIDTH // STEPS          # horizontal advance per photograph
OVERLAP = 520                  # dissolve width, ~46 degrees of arc

TOURS = {
    "great-room": [
        "interiors/open-plan-timber.jpg",
        "interiors/great-room-fireplace.jpg",
        "interiors/editorial-living-warm.jpg",
        "interiors/warm-living-garden.jpg",
    ],
    "kitchen-dining": [
        "interiors/chef-kitchen-ivory.jpg",
        "interiors/dining-pavilion.jpg",
        "interiors/minimal-kitchen-island.jpg",
        "interiors/breakfast-nook.jpg",
    ],
    "primary-suite": [
        "interiors/primary-suite.jpg",
        "interiors/serene-bedroom.jpg",
        "interiors/guest-bedroom-light.jpg",
        "interiors/neutral-lounge.jpg",
    ],
    "pool-terrace": [
        "interiors/pool-terrace-glass.jpg",
        "interiors/glass-living-view.jpg",
        "interiors/sunlit-living.jpg",
        "interiors/family-room-neutral.jpg",
    ],
}


def load(rel: str) -> Image.Image:
    """Load, cover-fit to (STEP + OVERLAP) x HEIGHT, and normalise exposure."""
    im = Image.open(os.path.join(SRC, rel)).convert("RGB")
    target_w = STEP + OVERLAP
    scale = max(target_w / im.width, HEIGHT / im.height)
    resized = im.resize(
        (round(im.width * scale), round(im.height * scale)), Image.LANCZOS
    )
    left = (resized.width - target_w) // 2
    top = (resized.height - HEIGHT) // 2
    return resized.crop((left, top, left + target_w, top + HEIGHT))


def normalise(images: list[Image.Image]) -> list[Image.Image]:
    """Match mean luminance across the set so dissolves do not flicker."""
    means = [ImageStat.Stat(im.convert("L")).mean[0] for im in images]
    target = sum(means) / len(means)
    out = []
    for im, mean in zip(images, means):
        if mean <= 1:
            out.append(im)
            continue
        gain = max(0.82, min(1.18, target / mean))
        out.append(im.point(lambda v, g=gain: min(255, round(v * g))))
    return out


def smoothstep_mask(width: int, height: int, invert: bool = False) -> Image.Image:
    """Alpha ramp 0 -> 1 with an ease-in-out curve, as an 8-bit mask."""
    mask = Image.new("L", (width, 1))
    pixels = []
    for x in range(width):
        t = x / max(1, width - 1)
        s = t * t * (3 - 2 * t)          # smoothstep
        if invert:
            s = 1 - s
        pixels.append(round(s * 255))
    mask.putdata(pixels)
    return mask.resize((width, height))


def build(name: str, rels: list[str]) -> tuple[str, int]:
    images = normalise([load(rel) for rel in rels])

    canvas_w = WIDTH + OVERLAP
    canvas = Image.new("RGB", (canvas_w, HEIGHT))
    canvas.paste(images[0], (0, 0))

    for i in range(1, len(images) + 1):
        incoming = images[i % len(images)]          # closes the loop back to A
        x = i * STEP
        strip = canvas.crop((x, 0, x + OVERLAP, HEIGHT))
        mask = smoothstep_mask(OVERLAP, HEIGHT)
        blended = Image.composite(incoming.crop((0, 0, OVERLAP, HEIGHT)), strip, mask)
        canvas.paste(blended, (x, 0))
        # The remainder of the incoming photograph is pasted unblended.
        if x + OVERLAP < canvas_w:
            rest = incoming.crop((OVERLAP, 0, incoming.width, HEIGHT))
            canvas.paste(rest, (x + OVERLAP, 0))

    pano = canvas.crop((0, 0, WIDTH, HEIGHT))
    os.makedirs(DEST, exist_ok=True)
    out = os.path.join(DEST, f"{name}.jpg")
    pano.save(out, quality=86, optimize=True, progressive=True)
    return out, os.path.getsize(out)


def main():
    total = 0
    for name, rels in TOURS.items():
        out, nbytes = build(name, rels)
        total += nbytes
        print(f"{name:15} {WIDTH}x{HEIGHT}  {nbytes // 1024} KB")
    print(f"total {total / 1024 / 1024:.1f} MB")


if __name__ == "__main__":
    main()
