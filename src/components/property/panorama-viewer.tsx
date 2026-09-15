"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Compass, Loader2, Minus, Plus, RotateCcw } from "lucide-react";

import { cn } from "@/lib/utils";

const TAU = Math.PI * 2;
/** The generated panoramas cover 360° horizontally and 90° vertically. */
const VERTICAL_SPAN = Math.PI / 2;
const BASE_FOV = (80 * Math.PI) / 180;
const MIN_ZOOM = 0.7;
const MAX_ZOOM = 2.2;
const AUTO_ROTATE_SPEED = (2.4 * Math.PI) / 180; // radians per second
const FRICTION = 2.6; // exponential decay, per second

interface ViewState {
  yaw: number;
  pitch: number;
  zoom: number;
  velocity: number;
  dragging: boolean;
  pointerId: number | null;
  lastX: number;
  lastY: number;
  lastT: number;
  interacted: boolean;
  hovering: boolean;
}

/**
 * A true cylindrical 360° viewer rendered on canvas.
 *
 * The panorama is a uniform cylindrical strip, so the projection separates:
 * horizontal maps through `atan(x / f)` and vertical through `atan(y / f)`,
 * independently. Each frame is therefore one `drawImage` per column with a
 * single shared vertical crop — smooth and dependency-free, with none of the
 * seam artefacts a segmented CSS cylinder produces.
 */
export function PanoramaViewer({
  src,
  alt,
  className,
  initialYaw = 0,
}: {
  src: string;
  alt: string;
  className?: string;
  initialYaw?: number;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const lastFrameRef = useRef(0);
  const reducedRef = useRef(false);
  const visibleRef = useRef(false);

  const view = useRef<ViewState>({
    yaw: initialYaw,
    pitch: 0,
    zoom: 1,
    velocity: 0,
    dragging: false,
    pointerId: null,
    lastX: 0,
    lastY: 0,
    lastT: 0,
    interacted: false,
    hovering: false,
  });

  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [zoomLabel, setZoomLabel] = useState(1);
  const [hintVisible, setHintVisible] = useState(true);

  /* ------------------------------- drawing ------------------------------- */

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    const image = imageRef.current;
    if (!canvas || !wrap || !image || !image.naturalWidth) return;

    const cssW = wrap.clientWidth;
    const cssH = wrap.clientHeight;
    if (cssW === 0 || cssH === 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const outW = Math.round(cssW * dpr);
    const outH = Math.round(cssH * dpr);
    if (canvas.width !== outW || canvas.height !== outH) {
      canvas.width = outW;
      canvas.height = outH;
    }

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const v = view.current;
    const f = (outW / 2 / Math.tan(BASE_FOV / 2)) * v.zoom;

    // Vertical crop is the same for every column, so compute it once.
    const verticalHalfFov = Math.atan(outH / 2 / f);
    const maxPitch = Math.max(0, VERTICAL_SPAN / 2 - verticalHalfFov);
    v.pitch = Math.max(-maxPitch, Math.min(maxPitch, v.pitch));

    const pxPerRadianY = image.naturalHeight / VERTICAL_SPAN;
    const phiTop = Math.atan(-outH / 2 / f) + v.pitch;
    const phiBottom = Math.atan(outH / 2 / f) + v.pitch;
    const rawSrcY = image.naturalHeight / 2 - phiTop * pxPerRadianY;
    const srcH = (phiTop - phiBottom) * pxPerRadianY;
    const srcY = Math.max(
      0,
      Math.min(Math.max(0, image.naturalHeight - srcH), rawSrcY),
    );

    const srcFullW = image.naturalWidth;
    const pxPerRadianX = srcFullW / TAU;
    // A sliver of overlap removes hairline seams between adjacent columns.
    const bleed = pxPerRadianX * 0.002;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    for (let x = 0; x < outW; x += 1) {
      const thetaA = Math.atan((x - outW / 2) / f);
      const thetaB = Math.atan((x + 1 - outW / 2) / f);
      const srcW = (thetaB - thetaA) * pxPerRadianX + bleed;

      let sx = ((thetaA + v.yaw) * pxPerRadianX) % srcFullW;
      if (sx < 0) sx += srcFullW;

      if (sx + srcW <= srcFullW) {
        ctx.drawImage(image, sx, srcY, srcW, srcH, x, 0, 1, outH);
      } else {
        // The column straddles the wrap point — draw it in two pieces.
        const firstW = srcFullW - sx;
        const ratio = firstW / srcW;
        ctx.drawImage(image, sx, srcY, firstW, srcH, x, 0, ratio, outH);
        ctx.drawImage(
          image,
          0,
          srcY,
          srcW - firstW,
          srcH,
          x + ratio,
          0,
          1 - ratio,
          outH,
        );
      }
    }
  }, []);

  /* ------------------------------ animation ------------------------------ */

  const tick = useCallback(
    (now: number) => {
      const v = view.current;
      const dt = Math.min(0.05, (now - lastFrameRef.current) / 1000 || 0);
      lastFrameRef.current = now;

      // Off screen: release the frame and wait to be woken by the observer.
      if (!visibleRef.current) {
        frameRef.current = null;
        return;
      }

      // Nothing to draw yet — the load handler restarts the loop.
      if (!imageRef.current?.naturalWidth) {
        frameRef.current = null;
        return;
      }

      if (!v.dragging) {
        if (Math.abs(v.velocity) > 0.01) {
          v.yaw += v.velocity * dt;
          v.velocity *= Math.exp(-FRICTION * dt);
        } else {
          v.velocity = 0;
          if (!v.interacted && !v.hovering && !reducedRef.current) {
            v.yaw += AUTO_ROTATE_SPEED * dt;
          }
        }
      }

      draw();

      const settled =
        !v.dragging &&
        v.velocity === 0 &&
        (v.interacted || v.hovering || reducedRef.current);

      if (settled) {
        frameRef.current = null;
        return;
      }
      frameRef.current = requestAnimationFrame(tick);
    },
    [draw],
  );

  const startLoop = useCallback(() => {
    if (frameRef.current !== null) return;
    lastFrameRef.current = performance.now();
    frameRef.current = requestAnimationFrame(tick);
  }, [tick]);

  const stopLoop = useCallback(() => {
    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
  }, []);

  /* -------------------------------- loading ------------------------------ */

  useEffect(() => {
    setReady(false);
    setFailed(false);
    const image = new Image();
    image.decoding = "async";
    image.src = src;
    imageRef.current = image;

    let cancelled = false;
    const settle = () => {
      if (cancelled) return;
      if (!image.naturalWidth) {
        setFailed(true);
        return;
      }
      setReady(true);
      draw();
      startLoop();
    };

    if (typeof image.decode === "function") {
      image.decode().then(settle, settle);
    } else {
      image.onload = settle;
      image.onerror = settle;
    }

    return () => {
      cancelled = true;
      stopLoop();
    };
  }, [src, draw, startLoop, stopLoop]);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const observer = new ResizeObserver(() => {
      draw();
      startLoop();
    });
    observer.observe(wrap);
    return () => observer.disconnect();
  }, [draw, startLoop]);

  /* Only run the render loop while the viewer is actually on screen. */
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          lastFrameRef.current = performance.now();
          startLoop();
        }
      },
      { rootMargin: "120px" },
    );
    observer.observe(wrap);
    return () => observer.disconnect();
  }, [startLoop]);

  /* Honour reduced-motion: hold the frame still instead of drifting. */
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedRef.current = query.matches;
    const onChange = (event: MediaQueryListEvent) => {
      reducedRef.current = event.matches;
    };
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  useEffect(() => stopLoop, [stopLoop]);

  /* ------------------------------ interaction ---------------------------- */

  /** Screen position → viewing angle, so content tracks the pointer exactly. */
  const anglesAt = useCallback((clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    const image = imageRef.current;
    if (!canvas || !image) return null;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    const f =
      (canvas.width / 2 / Math.tan(BASE_FOV / 2)) * view.current.zoom;

    const px = (clientX - rect.left) * dpr;
    const py = (clientY - rect.top) * dpr;

    return {
      f,
      dpr,
      theta: Math.atan((px - canvas.width / 2) / f),
      phi: Math.atan((py - canvas.height / 2) / f),
    };
  }, []);

  const onPointerDown = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      const v = view.current;
      v.dragging = true;
      v.pointerId = event.pointerId;
      v.lastX = event.clientX;
      v.lastY = event.clientY;
      v.lastT = performance.now();
      v.velocity = 0;
      v.interacted = true;
      setHintVisible(false);
      event.currentTarget.setPointerCapture?.(event.pointerId);
      startLoop();
    },
    [startLoop],
  );

  const onPointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      const v = view.current;
      if (!v.dragging || v.pointerId !== event.pointerId) return;

      const now = performance.now();
      const dt = Math.max(8, now - v.lastT);
      const dx = event.clientX - v.lastX;
      const dy = event.clientY - v.lastY;
      v.lastX = event.clientX;
      v.lastY = event.clientY;
      v.lastT = now;
      if (dx === 0 && dy === 0) return;

      const here = anglesAt(event.clientX, event.clientY);
      const there = anglesAt(event.clientX - dx, event.clientY - dy);
      if (!here || !there) return;

      const yawDelta = -(here.theta - there.theta);
      v.yaw += yawDelta;
      v.pitch += here.phi - there.phi;
      v.velocity = (yawDelta / dt) * 1000;

      draw();
      startLoop();
    },
    [anglesAt, draw, startLoop],
  );

  const endDrag = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      const v = view.current;
      if (v.pointerId !== event.pointerId) return;
      v.dragging = false;
      v.pointerId = null;
      startLoop();
    },
    [startLoop],
  );

  const onWheel = useCallback(
    (event: WheelEvent) => {
      event.preventDefault();
      const v = view.current;
      v.interacted = true;
      setHintVisible(false);
      v.zoom = Math.max(
        MIN_ZOOM,
        Math.min(MAX_ZOOM, v.zoom * (event.deltaY > 0 ? 0.92 : 1.08)),
      );
      setZoomLabel(Number(v.zoom.toFixed(2)));
      draw();
      startLoop();
    },
    [draw, startLoop],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.addEventListener("wheel", onWheel, { passive: false });
    return () => canvas.removeEventListener("wheel", onWheel);
  }, [onWheel]);

  const nudge = useCallback(
    (direction: 1 | -1) => {
      const v = view.current;
      v.interacted = true;
      setHintVisible(false);
      v.velocity = 0;
      v.yaw += direction * ((12 * Math.PI) / 180);
      draw();
      startLoop();
    },
    [draw, startLoop],
  );

  const changeZoom = useCallback(
    (direction: 1 | -1) => {
      const v = view.current;
      v.interacted = true;
      setHintVisible(false);
      v.zoom = Math.max(
        MIN_ZOOM,
        Math.min(MAX_ZOOM, v.zoom * (direction > 0 ? 1.18 : 0.85)),
      );
      setZoomLabel(Number(v.zoom.toFixed(2)));
      draw();
      startLoop();
    },
    [draw, startLoop],
  );

  const reset = useCallback(() => {
    const v = view.current;
    v.yaw = initialYaw;
    v.pitch = 0;
    v.zoom = 1;
    v.velocity = 0;
    v.interacted = true;
    setZoomLabel(1);
    draw();
    startLoop();
  }, [draw, initialYaw, startLoop]);

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      const handlers: Record<string, () => void> = {
        ArrowLeft: () => nudge(-1),
        ArrowRight: () => nudge(1),
        "+": () => changeZoom(1),
        "=": () => changeZoom(1),
        "-": () => changeZoom(-1),
        "0": () => reset(),
      };
      const handler = handlers[event.key];
      if (handler) {
        event.preventDefault();
        handler();
      }
    },
    [changeZoom, nudge, reset],
  );

  return (
    <div
      ref={wrapRef}
      className={cn("group relative overflow-hidden bg-charcoal", className)}
    >
      <canvas
        ref={canvasRef}
        role="img"
        aria-label={alt}
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onMouseEnter={() => {
          view.current.hovering = true;
          startLoop();
        }}
        onMouseLeave={() => {
          view.current.hovering = false;
        }}
        className="block h-full w-full cursor-grab touch-none select-none focus-visible:outline-none active:cursor-grabbing"
      />

      {!ready && !failed ? (
        <div className="absolute inset-0 flex items-center justify-center bg-charcoal">
          <Loader2 className="h-6 w-6 animate-spin text-sand" strokeWidth={1.5} />
          <span className="sr-only">Loading panorama</span>
        </div>
      ) : null}

      {failed ? (
        <div className="absolute inset-0 flex items-center justify-center bg-charcoal px-6 text-center">
          <p className="text-sm text-ivory/60">
            This tour could not be loaded. Please try again.
          </p>
        </div>
      ) : null}

      {ready ? (
        <>
          <div
            className={cn(
              "pointer-events-none absolute inset-x-0 bottom-20 flex justify-center transition-opacity duration-700",
              hintVisible ? "opacity-100" : "opacity-0",
            )}
          >
            <span className="rounded-full bg-charcoal/60 px-5 py-2.5 text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-white/90 backdrop-blur-sm">
              Drag to look around
            </span>
          </div>

          <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 p-4 sm:p-5">
            <span className="inline-flex items-center gap-2 rounded-full bg-charcoal/55 px-4 py-2 text-[0.625rem] font-medium uppercase tracking-[0.16em] text-white/85 backdrop-blur-sm">
              <Compass className="h-3.5 w-3.5" strokeWidth={1.6} />
              Panorama
            </span>

            <div className="flex items-center gap-2">
              <div className="hidden items-center gap-1 rounded-full bg-charcoal/55 p-1 backdrop-blur-sm sm:flex">
                <button
                  type="button"
                  onClick={() => changeZoom(-1)}
                  aria-label="Zoom out"
                  className="flex h-8 w-8 items-center justify-center rounded-full text-white/85 transition-colors hover:bg-white/15 hover:text-white"
                >
                  <Minus className="h-3.5 w-3.5" strokeWidth={1.8} />
                </button>
                <span className="w-9 text-center text-[0.625rem] tabular-nums text-white/70">
                  {zoomLabel.toFixed(1)}×
                </span>
                <button
                  type="button"
                  onClick={() => changeZoom(1)}
                  aria-label="Zoom in"
                  className="flex h-8 w-8 items-center justify-center rounded-full text-white/85 transition-colors hover:bg-white/15 hover:text-white"
                >
                  <Plus className="h-3.5 w-3.5" strokeWidth={1.8} />
                </button>
              </div>

              <button
                type="button"
                onClick={reset}
                aria-label="Reset view"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-charcoal/55 text-white/85 backdrop-blur-sm transition-colors hover:bg-charcoal/75 hover:text-white"
              >
                <RotateCcw className="h-4 w-4" strokeWidth={1.6} />
              </button>

              <button
                type="button"
                onClick={() => nudge(-1)}
                aria-label="Look left"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-charcoal text-white transition-colors hover:bg-bronze"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                  <path
                    d="M15 5l-7 7 7 7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => nudge(1)}
                aria-label="Look right"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-charcoal text-white transition-colors hover:bg-bronze"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                  <path
                    d="M9 5l7 7-7 7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
