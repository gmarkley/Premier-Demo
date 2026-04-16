"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { type MouseEvent, useState } from "react";

interface HeroProps {
  children: React.ReactNode;
}

export default function Hero({ children }: HeroProps) {
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    setMouse({ x, y });
  };

  const resetTilt = () => setMouse({ x: 0.5, y: 0.5 });

  const tiltX = (0.5 - mouse.y) * 4;
  const tiltY = (mouse.x - 0.5) * 5;
  const lightX = `${Math.round(mouse.x * 100)}%`;
  const lightY = `${Math.round(mouse.y * 100)}%`;

  return (
    <div className="relative flex min-h-[76vh] w-full items-center justify-center overflow-hidden py-14 md:min-h-[82vh] md:py-16">
      <div className="absolute inset-0 z-0 bg-[linear-gradient(180deg,#05070f_0%,#080d1f_55%,#090f24_100%)]" />
      <div className="hero-grid absolute inset-0 z-0" />
      <div
        className="hero-spotlight absolute inset-0 z-0 transition-all duration-200"
        style={{
          background: `radial-gradient(circle at ${lightX} ${lightY}, rgba(246,195,51,0.22), rgba(246,195,51,0.04) 24%, transparent 58%)`,
        }}
      />
      <div className="hero-vignette absolute inset-0 z-0" />

      <div
        className="hero-logo-stage absolute inset-0 z-0"
        onMouseMove={handleMouseMove}
        onMouseLeave={resetTilt}
      />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="hero-content-shell relative z-10 w-full max-w-6xl px-6 text-center transition-transform duration-150"
        style={{ transform: `translate3d(${tiltY * 0.4}px, ${tiltX * 0.4}px, 0)` }}
      >
        <motion.div
          animate={{ opacity: [0.72, 0.86, 0.72] }}
          transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
          className="hero-logo-blend mx-auto mb-6 w-[78vw] max-w-[1140px] bg-black px-4 py-3 sm:mb-7 sm:px-5 sm:py-4 md:mb-8"
          style={{ transform: `translate3d(${tiltY * 0.9}px, ${tiltX * 0.9}px, 0)` }}
        >
          <Image
            src="/brand/premier-logo.png"
            alt="Premier Entertainment"
            width={880}
            height={332}
            priority
            className="hero-logo-image h-auto w-full select-none"
          />
        </motion.div>
        {children}
      </motion.div>
    </div>
  );
}
