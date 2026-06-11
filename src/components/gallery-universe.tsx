"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { GalleryImage } from "@/lib/gallery";

type Transform = { x: number; y: number; scale: number };
type Bounds = { minX: number; minY: number; maxX: number; maxY: number };

const EDGE_ROOM = 180;

function imageBounds(images: GalleryImage[]): Bounds {
  if (!images.length) return { minX: 0, minY: 0, maxX: 1, maxY: 1 };
  return images.reduce((bounds, image) => {
    const displayHeight = image.displayWidth * (image.height / image.width);
    return {
      minX: Math.min(bounds.minX, image.x),
      minY: Math.min(bounds.minY, image.y),
      maxX: Math.max(bounds.maxX, image.x + image.displayWidth),
      maxY: Math.max(bounds.maxY, image.y + displayHeight),
    };
  }, { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity });
}

function clampAxis(value: number, contentMin: number, contentMax: number, viewportSize: number, scale: number) {
  const scaledSize = (contentMax - contentMin) * scale;
  if (scaledSize <= viewportSize - EDGE_ROOM * 2) {
    return viewportSize / 2 - ((contentMin + contentMax) / 2) * scale;
  }
  const minimum = viewportSize - contentMax * scale - EDGE_ROOM;
  const maximum = EDGE_ROOM - contentMin * scale;
  return Math.min(maximum, Math.max(minimum, value));
}

function constrain(transform: Transform, bounds: Bounds): Transform {
  if (typeof window === "undefined") return transform;
  return {
    ...transform,
    x: clampAxis(transform.x, bounds.minX, bounds.maxX, window.innerWidth, transform.scale),
    y: clampAxis(transform.y, bounds.minY, bounds.maxY, window.innerHeight, transform.scale),
  };
}

export function GalleryUniverse({ images, categories }: { images: GalleryImage[]; categories: string[] }) {
  const [category, setCategory] = useState("All");
  const [selected, setSelected] = useState<GalleryImage | null>(null);
  const [transform, setTransform] = useState<Transform>({ x: -500, y: -300, scale: 0.7 });
  const drag = useRef<{ x: number; y: number; tx: number; ty: number; moved: boolean } | null>(null);

  const visible = useMemo(() => images.filter((image) => category === "All" || image.category === category), [category, images]);
  const bounds = useMemo(() => imageBounds(visible), [visible]);
  const applyTransform = useCallback((next: Transform) => setTransform(constrain(next, bounds)), [bounds]);

  useEffect(() => {
    const reset = () => {
      const scale = window.innerWidth < 700 ? 0.58 : 0.72;
      applyTransform({
        scale,
        x: window.innerWidth / 2 - ((bounds.minX + bounds.maxX) / 2) * scale,
        y: window.innerHeight / 2 - ((bounds.minY + bounds.maxY) / 2) * scale,
      });
    };
    reset();
    window.addEventListener("resize", reset);
    return () => window.removeEventListener("resize", reset);
  }, [applyTransform, bounds]);

  function randomFocus() {
    const image = visible[Math.floor(Math.random() * visible.length)];
    if (!image) return;
    const scale = 1;
    applyTransform({ x: window.innerWidth / 2 - (image.x + image.displayWidth / 2) * scale, y: window.innerHeight / 2 - image.y * scale, scale });
    setSelected(image);
  }

  return (
    <div className="universe-shell">
      <div
        className="universe-viewport"
        onPointerDown={(event) => { drag.current = { x: event.clientX, y: event.clientY, tx: transform.x, ty: transform.y, moved: false }; event.currentTarget.setPointerCapture(event.pointerId); }}
        onPointerMove={(event) => {
          if (!drag.current) return;
          const dx = event.clientX - drag.current.x;
          const dy = event.clientY - drag.current.y;
          if (Math.abs(dx) + Math.abs(dy) > 5) drag.current.moved = true;
          applyTransform({ ...transform, x: drag.current.tx + dx, y: drag.current.ty + dy });
        }}
        onPointerUp={() => { drag.current = null; }}
        onPointerCancel={() => { drag.current = null; }}
        onWheel={(event) => {
          event.preventDefault();
          const nextScale = Math.min(1.35, Math.max(0.48, transform.scale - event.deltaY * 0.0006));
          const worldX = (event.clientX - transform.x) / transform.scale;
          const worldY = (event.clientY - transform.y) / transform.scale;
          applyTransform({ scale: nextScale, x: event.clientX - worldX * nextScale - event.deltaX, y: event.clientY - worldY * nextScale });
        }}
      >
        <div className="universe" style={{ transform: `translate3d(${transform.x}px, ${transform.y}px, 0) scale(${transform.scale})` }}>
          {images.map((image) => {
            const active = visible.includes(image);
            return (
              <button
                key={image.id}
                className={`cloud-photo ${active ? "visible" : "muted"}`}
                style={{ left: image.x, top: image.y, width: image.displayWidth, transform: `rotate(${image.rotation}deg)` }}
                onPointerDown={(event) => event.stopPropagation()}
                onClick={(event) => { if (active) { event.stopPropagation(); setSelected(image); } }}
                aria-label={`Open photograph: ${image.caption}`}
              >
                <Image src={image.src} alt={image.caption} width={image.width} height={image.height} sizes="310px" draggable={false} />
              </button>
            );
          })}
        </div>
      </div>

      <div className="gallery-title"><p>NEERAJ JHA</p><h1>THE PHOTO<br />ARCHIVE</h1><span>Drag to explore · Scroll to zoom</span></div>
      <div className="tag-filter"><button className="random" onClick={randomFocus}>RANDOM ↗</button>{categories.map((item) => <button className={category === item ? "active" : ""} onClick={() => setCategory(item)} key={item}>{item}</button>)}</div>
      <div className="gallery-counter">{String(visible.length).padStart(2, "0")} / {String(images.length).padStart(2, "0")} PHOTOGRAPHS</div>

      {selected && (
        <div className="lightbox" role="dialog" aria-modal="true" onClick={() => setSelected(null)}>
          <button className="lightbox-close" onClick={() => setSelected(null)}>CLOSE ×</button>
          <Image src={selected.src} alt={selected.caption} width={selected.width} height={selected.height} sizes="90vw" />
          <div><p>{selected.caption}</p><span>{selected.category} archive</span></div>
        </div>
      )}
    </div>
  );
}
