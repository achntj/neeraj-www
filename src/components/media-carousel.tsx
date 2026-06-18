"use client";

import { useEffect, useRef, type RefObject } from "react";

type InstagramWindow = Window & {
  instgrm?: { Embeds?: { process: () => void } };
};

const instagramReels = [
  { id: "DWNdN5JTGNV", label: "Connect India reel", url: "https://www.instagram.com/reel/DWNdN5JTGNV/?utm_source=ig_embed&utm_campaign=loading" },
  { id: "DWRNhB0T-ti", label: "Connect India reel", url: "https://www.instagram.com/reel/DWRNhB0T-ti/?utm_source=ig_embed&utm_campaign=loading" },
  { id: "DWWXIPxzp2B", label: "Connect India reel", url: "https://www.instagram.com/reel/DWWXIPxzp2B/?utm_source=ig_embed&utm_campaign=loading" },
];

const youtubeVideos = [
  { id: "8NeO9EH5MMg", label: "Sports business" },
  { id: "DAgQAxVOhpQ", label: "Media conversation" },
  { id: "FCovm1mpHpE", label: "Interview" },
  { id: "YV-MEaLIWNw", label: "Industry view" },
];

export function MediaCarousel() {
  const instagramTrack = useRef<HTMLDivElement>(null);
  const youtubeTrack = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const win = window as InstagramWindow;
    if (win.instgrm?.Embeds) {
      win.instgrm.Embeds.process();
      return;
    }

    const existing = document.querySelector<HTMLScriptElement>("script[src='https://www.instagram.com/embed.js']");
    if (existing) {
      existing.addEventListener("load", () => win.instgrm?.Embeds?.process(), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.async = true;
    script.src = "https://www.instagram.com/embed.js";
    script.onload = () => win.instgrm?.Embeds?.process();
    document.body.appendChild(script);
  }, []);

  function move(track: RefObject<HTMLDivElement | null>, direction: -1 | 1) {
    const element = track.current;
    if (!element) return;
    element.scrollBy({ left: direction * element.clientWidth / 3, behavior: "smooth" });
  }

  return (
    <div className="media-carousel">
      <div className="carousel-controls" aria-label="Media carousel controls">
        <button type="button" onClick={() => move(instagramTrack, -1)} aria-label="Previous Instagram reel">←</button>
        <span>SCROLL / DRAG</span>
        <button type="button" onClick={() => move(instagramTrack, 1)} aria-label="Next Instagram reel">→</button>
      </div>
      <div className="video-track" ref={instagramTrack}>
        {instagramReels.map((item, index) => (
          <article className="video-card video-card-reel" key={item.id}>
            <div className="instagram-frame">
              <blockquote
                className="instagram-media"
                data-instgrm-captioned
                data-instgrm-permalink={item.url}
                data-instgrm-version="14"
                style={{
                  background: "#fff",
                  border: 0,
                  borderRadius: 3,
                  boxShadow: "0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)",
                  margin: 1,
                  maxWidth: 540,
                  minWidth: 326,
                  padding: 0,
                  width: "calc(100% - 2px)",
                }}
              >
                <div style={{ padding: 16 }}>
                  <a href={item.url} target="_blank" rel="noreferrer">View this post on Instagram</a>
                </div>
              </blockquote>
            </div>
            <p><span>{String(index + 1).padStart(2, "0")} / {item.label}</span><b>VIEW ↗</b></p>
          </article>
        ))}
      </div>

      <div className="media-subsection">
        <div className="media-subhead">
          <p className="eyebrow">YOUTUBE</p>
          <div className="carousel-controls" aria-label="YouTube carousel controls">
            <button type="button" onClick={() => move(youtubeTrack, -1)} aria-label="Previous YouTube video">←</button>
            <span>SCROLL / DRAG</span>
            <button type="button" onClick={() => move(youtubeTrack, 1)} aria-label="Next YouTube video">→</button>
          </div>
        </div>
        <div className="video-track" ref={youtubeTrack}>
          {youtubeVideos.map((video, index) => (
            <article className="video-card" key={video.id}>
              <div className="video-frame">
                <iframe src={`https://www.youtube-nocookie.com/embed/${video.id}`} title={video.label} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
              </div>
              <p><span>{String(index + 1).padStart(2, "0")} / {video.label}</span><b>PLAY ↗</b></p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
