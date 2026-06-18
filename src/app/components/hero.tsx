"use client";

import React, { useRef, useState, useEffect } from "react";

export default function Hero() {
  // Two videos: noc.webm first, then bannervideo.webm
  const videos = ["/Videos/noc.webm", "/Videos/bannervideo.webm"];
  const [index, setIndex] = useState<number>(0); // active video index
  const trackRef = useRef<HTMLDivElement | null>(null);
  // stable refs array for video elements
  const videoRefsRef = useRef<Array<HTMLVideoElement | null>>([null, null]);
  const [muted, setMuted] = useState<boolean>(true);

  // When index changes, play the active video and pause/reset the inactive one; slide the track
  useEffect(() => {
    const active = videoRefsRef.current[index];
    const inactive = videoRefsRef.current[1 - index];
    // (clear any UI hints on switch)

    if (inactive) {
      try {
        inactive.pause();
        inactive.currentTime = 0;
      } catch {}
    }

    if (active) {
      // Apply desired muted state
      try {
        active.muted = muted;
      } catch {}

      // If user requests unmuted and this is the first video, try to play with sound
      if (!muted && index === 0) {
        const p = active.play();
        if (p && typeof p.then === "function") {
          p.catch(() => {
            // autoplay with sound blocked -> revert to muted playback
            try {
              active.muted = true;
              active.play().catch(() => {});
            } catch {}
            setMuted(true);
          });
        }
      } else {
        // play (muted or unmuted as requested)
        const p = active.play();
        if (p && typeof p.then === "function") p.catch(() => {});
      }
    }

    if (trackRef.current) {
      const pct = (index / videos.length) * 100;
      trackRef.current.style.transform = `translateX(-${pct}%)`;
    }
  }, [index, muted, videos.length]);

  // Attach ended listeners to advance to the next video
  useEffect(() => {
    const cleanups: Array<() => void> = [];
    videoRefsRef.current.forEach((el) => {
      if (!el) return;
      const onEnded = () => setIndex((prev) => (prev + 1) % videos.length);
      el.addEventListener("ended", onEnded);
      cleanups.push(() => el.removeEventListener("ended", onEnded));
    });
    return () => cleanups.forEach((c) => c());
  }, [videos.length]);

  return (
    <div className="relative w-full h-[220px] sm:h-[320px] md:h-[400px] lg:h-[670px] min-h-[180px] text-white overflow-hidden">
      <div
        ref={trackRef}
        className="flex w-[200%] h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${(index / videos.length) * 100}%)` }}
      >
        {videos.map((src, i) => (
          <div key={src} className="w-1/2 flex-shrink-0 h-full">
            <video
              ref={(el) => {
                videoRefsRef.current[i] = el;
              }}
              className="w-full h-full object-cover"
              style={{ objectFit: "cover" }}
              src={src}
              playsInline
              // controls
              preload="metadata"
            />
          </div>
        ))}
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {videos.map((_, i) => (
          <button
            key={i}
            aria-label={`Show banner ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full transition-colors duration-200 ${
              i === index ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </div>

      {/* Mute / Unmute toggle (simple icon, not native controls) */}
      <button
        aria-label={muted ? "Unmute" : "Mute"}
        onClick={() => {
          const next = !muted;
          setMuted(next);
          const v = videoRefsRef.current[index];
          if (!v) return;
          try {
            v.muted = next;
            if (!next) v.play().catch(() => {});
          } catch {}
        }}
        className="absolute right-4 bottom-4 z-30 bg-black/50 text-white p-2 rounded-full"
      >
        {muted ? "🔇" : "🔊"}
      </button>
    </div>
  );
}
