"use client";

import { useEffect, useState } from "react";

/**
 * Soft gold spotlight that follows the cursor across the entire viewport.
 * pointer-events-none so it never blocks clicks.
 */
export default function GlobalMouseSpotlight() {
  const [pos, setPos] = useState({ xPct: 50, yPct: 40 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const xPct = (e.clientX / Math.max(window.innerWidth, 1)) * 100;
      const yPct = (e.clientY / Math.max(window.innerHeight, 1)) * 100;
      setPos({ xPct, yPct });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1] transition-all duration-200 ease-out"
      style={{
        background: `radial-gradient(circle at ${pos.xPct}% ${pos.yPct}%, rgba(255,215,0,0.16), rgba(255,215,0,0.04) 22%, transparent 52%)`,
      }}
    />
  );
}
