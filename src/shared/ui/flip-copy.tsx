"use client";

import { useEffect, useState, type ReactNode } from "react";

// Holds stacked frames at a shared height and crossfades them so bilingual lines stay readable.
export default function FlipCopy({ frames, interval = 5600, className = "", label }: { frames: ReactNode[]; interval?: number; className?: string; label?: string }) {
  const [index, setIndex] = useState(0);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduce(motion.matches);
    sync();
    motion.addEventListener("change", sync);
    return () => motion.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (frames.length < 2) return;
    let timer = 0;
    function tick() {
      if (!document.hidden) setIndex(current => (current + 1) % frames.length);
      timer = window.setTimeout(tick, interval);
    }
    timer = window.setTimeout(tick, interval);
    return () => window.clearTimeout(timer);
  }, [frames.length, interval]);

  return (
    <>
      {label ? <span className="sr-only">{label}</span> : null}
      <span className={`grid ${className}`} aria-hidden={label ? true : undefined}>
        {frames.map((frame, frameIndex) => {
          const on = frameIndex === index;
          return (
            <span
              key={frameIndex}
              className="col-start-1 row-start-1 block"
              style={{
                opacity: on ? 1 : 0,
                transform: reduce || on ? "translate3d(0, 0, 0)" : "translate3d(0, 8px, 0)",
                filter: reduce || on ? "none" : "blur(6px)",
                pointerEvents: on ? "auto" : "none",
                transition: reduce
                  ? "none"
                  : "opacity 820ms cubic-bezier(.22, 1, .36, 1), transform 820ms cubic-bezier(.22, 1, .36, 1), filter 820ms cubic-bezier(.22, 1, .36, 1)",
              }}
            >
              {frame}
            </span>
          );
        })}
      </span>
    </>
  );
}
