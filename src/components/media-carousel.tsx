"use client";

import { useRef } from "react";

const videos = [
  { id: "_0mhDJg-wEg", label: "Conversation" },
  { id: "FCovm1mpHpE", label: "Interview" },
  { id: "YV-MEaLIWNw", label: "Industry view" },
  { id: "8NeO9EH5MMg", label: "Sports business" },
  { id: "DAgQAxVOhpQ", label: "Media conversation" },
];

export function MediaCarousel() {
  const track = useRef<HTMLDivElement>(null);

  function move(direction: -1 | 1) {
    const element = track.current;
    if (!element) return;
    element.scrollBy({ left: direction * element.clientWidth / 3, behavior: "smooth" });
  }

  return (
    <div className="media-carousel">
      <div className="carousel-controls" aria-label="Media carousel controls">
        <button type="button" onClick={() => move(-1)} aria-label="Previous video">←</button>
        <span>SCROLL / DRAG</span>
        <button type="button" onClick={() => move(1)} aria-label="Next video">→</button>
      </div>
      <div className="video-track" ref={track}>
        {videos.map((video, index) => (
          <article className="video-card" key={video.id}>
            <div className="video-frame"><iframe src={`https://www.youtube-nocookie.com/embed/${video.id}`} title={video.label} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen /></div>
            <p><span>{String(index + 1).padStart(2, "0")} / {video.label}</span><b>PLAY ↗</b></p>
          </article>
        ))}
      </div>
    </div>
  );
}
