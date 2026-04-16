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
        <span className="block">Check out my videos</span>
        <span className="mt-0.5 block text-[11px] font-normal text-gray-600">Video 2 · Video 3</span>
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
    <section id="roster" className="border-t border-amber-200/40 bg-[#f7d54a] py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl"
        >
          Meet our artists
        </motion.h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {artists.map((artist, i) => (
            <motion.article
              key={artist.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.06 * i, duration: 0.45 }}
              className="flex flex-col items-center rounded-2xl bg-white px-5 pb-6 pt-8 text-center shadow-md shadow-black/10"
            >
              <Link
                href={`/artists/${artist.slug}`}
                className="group flex w-full flex-col items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:ring-offset-2"
              >
                <div className="relative h-36 w-36 overflow-hidden rounded-full border-4 border-white shadow-lg ring-2 ring-amber-300/60 transition group-hover:ring-amber-500">
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
                <h3 className="mt-5 text-lg font-extrabold text-gray-900">{artist.name}</h3>
                {artist.instrument ? (
                  <p className="mt-1 text-sm font-bold uppercase tracking-wide text-gray-800">
                    {artist.instrument.replace(/\s*·\s*Owner/gi, "").trim()}
                  </p>
                ) : null}
                <span className="mt-4 text-xs font-semibold text-amber-900 underline decoration-amber-700/50 underline-offset-2 transition group-hover:text-amber-950">
                  {videoCta(artist.name)}
                </span>
              </Link>
            </motion.article>
          ))}
        </div>

        <p className="mt-10 text-center text-sm font-medium text-gray-800">
          <Link href="/artists" className="underline decoration-gray-700/40 underline-offset-2 hover:text-gray-950">
            View full artist roster
          </Link>
        </p>
      </div>
    </section>
  );
}
