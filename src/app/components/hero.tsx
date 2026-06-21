"use client";

import React, { useRef, useState, useEffect } from "react";

export default function Hero() {
  const videos = ["/Videos/noc.webm", "/Videos/bannervideo.webm"];
  const [index, setIndex] = useState<number>(0);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const videoRefsRef = useRef<Array<HTMLVideoElement | null>>([null, null]);
  const [muted, setMuted] = useState<boolean>(true);

  useEffect(() => {
    const active = videoRefsRef.current[index];
    const inactive = videoRefsRef.current[1 - index];

    if (inactive) {
      try {
        inactive.pause();
        inactive.currentTime = 0;
      } catch {}
    }

    if (active) {
      try {
        active.muted = muted;
      } catch {}

      if (!muted && index === 0) {
        const p = active.play();
        if (p && typeof p.then === "function") {
          p.catch(() => {
            try {
              active.muted = true;
              active.play().catch(() => {});
            } catch {}
            setMuted(true);
          });
        }
      } else {
        const p = active.play();
        if (p && typeof p.then === "function") p.catch(() => {});
      }
    }

    if (trackRef.current) {
      const pct = (index / videos.length) * 100;
      trackRef.current.style.transform = `translateX(-${pct}%)`;
    }
  }, [index, muted, videos.length]);

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

  const scrollToProducts = () => {
    const el = document.getElementById("products");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      data-testid="hero-section"
      className="relative w-full h-[60vh] min-h-[460px] sm:h-[70vh] md:h-[78vh] lg:h-[88vh] text-k-paper overflow-hidden bg-k-espresso"
    >
      {/* Video track */}
      <div
        ref={trackRef}
        className="flex w-[200%] h-full transition-transform duration-1200 ease-out-expo"
        style={{ transform: `translateX(-${(index / videos.length) * 100}%)` }}
      >
        {videos.map((src, i) => (
          <div key={src} className="w-1/2 flex-shrink-0 h-full">
            <video
              ref={(el) => {
                videoRefsRef.current[i] = el;
              }}
              className="w-full h-full object-cover"
              src={src}
              playsInline
              preload="metadata"
              autoPlay
              muted={muted}
              loop={false}
            />
          </div>
        ))}
      </div>

      {/* Cinematic gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-k-espresso/55 via-k-espresso/20 to-k-espresso/75 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-k-espresso/45 via-transparent to-transparent pointer-events-none" />

      {/* Content overlay */}
      <div className="absolute inset-0 z-10 flex items-center">
        <div className="container-koffee w-full">
          <div className="max-w-3xl">
            <div className="eyebrow text-k-amber mb-5 md:mb-7 animate-fade-in-down">
              United by Coffee · Crafted with Care
            </div>
            <h1
              data-testid="hero-headline"
              className="font-display text-display-xl md:text-display-2xl text-k-paper mb-6 md:mb-8 animate-fade-in-up"
            >
              Coffee, <em className="italic text-k-amber font-normal">redefined.</em>
              <br />
              Brewed for the bold.
            </h1>
            <p
              className="text-base md:text-lg text-k-cream-50/85 max-w-xl mb-8 md:mb-10 leading-relaxed animate-fade-in-up delay-200"
            >
              India&apos;s first nitro cold brew cartridge — a sophisticated ritual
              for late nights, early mornings, and every moment in between.
            </p>
            <div className="flex flex-wrap items-center gap-4 animate-fade-in-up delay-400">
              <button
                data-testid="hero-shop-btn"
                onClick={scrollToProducts}
                className="btn-pill-gold hover-lift group"
                type="button"
              >
                <span>Shop the Collection</span>
                <span className="inline-block transition-transform duration-400 group-hover:translate-x-1">→</span>
              </button>
              <a
                href="/aboutus"
                data-testid="hero-story-btn"
                className="text-sm tracking-[0.18em] uppercase text-k-paper/90 hover:text-k-amber link-underline"
              >
                Our Story
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {videos.map((_, i) => (
          <button
            key={i}
            data-testid={`hero-dot-${i}`}
            aria-label={`Show banner ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-1 rounded-full transition-all duration-500 ease-out-expo ${
              i === index ? "w-10 bg-k-amber" : "w-5 bg-k-paper/40 hover:bg-k-paper/70"
            }`}
          />
        ))}
      </div>

      {/* Mute/Unmute */}
      <button
        data-testid="hero-mute-btn"
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
        className="absolute right-5 md:right-8 bottom-6 md:bottom-8 z-30 w-11 h-11 rounded-full bg-k-espresso/60 backdrop-blur-md border border-k-paper/20 text-k-paper hover:bg-k-espresso/80 transition-all duration-400 flex items-center justify-center"
      >
        {muted ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
          </svg>
        )}
      </button>

      {/* Scroll cue */}
      <button
        onClick={scrollToProducts}
        data-testid="hero-scroll-cue"
        className="hidden md:flex absolute left-1/2 -translate-x-1/2 bottom-20 z-20 flex-col items-center gap-2 text-k-paper/70 hover:text-k-amber transition-colors duration-400 group"
        aria-label="Scroll to products"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <span className="block w-px h-10 bg-current animate-pulse" />
      </button>
    </section>
  );
}
