"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Artist {
  id: string;
  name: string;
  instrument: string;
  image: string;
  slug: string;
}

const artistImageOverrides: Record<string, string> = {
  "jaron-clark": "/artists/jaron-clark.png",
  "leo-lux": "/artists/leo-lux.png",
  "ennis-one-man-band": "/artists/ennis-one-man-band.png",
  "craig-and-ennis": "/artists/craig-and-ennis.png",
};

const fallbackBySlug: Record<string, string> = {
  "jaron-clark": "/artists/jaron-clark.png",
  "leo-lux": "/artists/leo-lux.png",
  "ennis-one-man-band": "/artists/ennis-one-man-band.png",
  "craig-and-ennis": "/artists/craig-and-ennis.png",
};

/** Video CTA copy aligned with premierentertainment.events “Meet Our Artists” cards */
function videoCta(name: string) {
  if (name === "Jaron Clark") {
    return (
      <>
        <span className="block leading-tight">Check out my videos</span>
        <span className="block text-[11px] font-normal leading-tight text-gray-500">Video 2 · Video 3</span>
      </>
    );
  }
  return "Check out my video";
}

export default function HomeMeetArtistsStrip() {
  const [artists, setArtists] = useState<Artist[]>([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const res = await fetch("/api/artists", { cache: "no-store" });
      const data: Artist[] = await res.json();
      if (!cancelled) setArtists(data);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="roster" className="bg-gray-800/70 py-14 md:py-20">
      <div className="relative mx-auto max-w-6xl px-4">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center text-3xl font-extrabold tracking-tight text-white md:text-4xl"
        >
          Meet Our Artists
        </motion.h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {artists.map((artist, i) => (
            <motion.article
              key={artist.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.06 * i, duration: 0.45 }}
              className="flex h-full flex-col rounded-2xl border border-white/10 bg-black px-5 pb-5 pt-6 text-center shadow-xl shadow-black/50 backdrop-blur-sm"
            >
              <Link
                href={`/artists/${artist.slug}`}
                className="group flex w-full flex-1 flex-col items-center text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0c14]"
              >
                <div className="relative h-36 w-36 shrink-0 overflow-hidden rounded-full border-4 border-gray-800 shadow-lg ring-2 ring-gold-500/45 transition group-hover:ring-gold-300 group-hover:shadow-[0_0_0_6px_rgba(255,215,0,0.28)]">
                  <img
                    src={artistImageOverrides[artist.slug] ?? artist.image}
                    alt={artist.name}
                    className="h-full w-full object-cover object-top"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget;
                      const directFallback = fallbackBySlug[artist.slug] ?? "/jaron-owner.png";
                      const fallbackState = target.dataset.fallbackApplied ?? "0";
                      if (fallbackState === "0") {
                        target.dataset.fallbackApplied = "1";
                        target.src = directFallback;
                        return;
                      }
                      if (fallbackState === "1") {
                        target.dataset.fallbackApplied = "2";
                        target.src = "/jaron-owner.png";
                      }
                    }}
                  />
                </div>
                <div className="mt-3 flex h-[4.25rem] w-full flex-col items-center justify-start text-center">
                  <h3
                    className="line-clamp-2 w-full text-lg font-extrabold leading-tight text-white"
                    title={artist.name}
                  >
                    {artist.name}
                  </h3>
                </div>
                <div className="mt-0 flex min-h-[2rem] w-full flex-col items-center justify-start">
                  {artist.instrument ? (
                    <p className="text-center text-sm font-bold uppercase leading-tight tracking-wide text-gray-400">
                      {artist.instrument.replace(/\s*·\s*Owner/gi, "").trim()}
                    </p>
                  ) : null}
                </div>
                <span className="mt-auto flex min-h-[3rem] w-full flex-col items-center justify-start gap-0 pt-2 text-xs font-semibold leading-tight text-gold-400 underline decoration-gold-500/40 underline-offset-2 transition group-hover:text-gold-300">
                  {videoCta(artist.name)}
                </span>
              </Link>
            </motion.article>
          ))}
        </div>

        <p className="mt-10 text-center text-sm font-medium text-gray-500">
          <Link
            href="/artists"
            className="underline decoration-white/20 underline-offset-2 transition hover:text-gold-400"
          >
            View full artist roster
          </Link>
        </p>
      </div>
    </section>
  );
}
