"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { premierMedia } from "../lib/premier-media";

export default function HomeOwnerSpotlight() {
  return (
    <section id="about" className="relative border-t border-gold-500/20 bg-gray-950 py-16 md:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 md:grid-cols-2 md:gap-14">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-2xl border border-gold-500/30 shadow-2xl shadow-black/40"
        >
          <Image
            src={premierMedia.jaronPortrait}
            alt="Jaron Clark, owner of Premier Entertainment, modern violinist"
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-left"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-400">
            Meet the owner
          </p>
          <h2 className="mt-2 text-4xl font-extrabold text-white md:text-5xl">Jaron Clark</h2>
          <p className="mt-2 text-xl text-gold-300 md:text-2xl">Modern Violinist · Premier Entertainment</p>
          <p className="mt-6 text-lg leading-relaxed text-gray-300">
            Jaron leads Premier Entertainment as a performing artist and curator of live experiences. From
            elegant violin moments to full-scale event energy, he represents the same standard of excellence
            you see across our roster—professional, memorable, and tailored to your audience.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-gray-400">
            At Premier Entertainment, we believe every event has a story to tell. Our artists combine
            innovative ideas with meticulous execution so your gathering not only meets expectations—it exceeds
            them.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/artists/jaron-clark"
              className="inline-flex rounded-full border border-gold-500/60 bg-gold-500/10 px-6 py-3 text-sm font-semibold text-gold-200 transition hover:bg-gold-500/20"
            >
              View artist profile
            </Link>
            <a
              href="https://premierentertainment.events/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex rounded-full border border-gray-600 px-6 py-3 text-sm font-semibold text-gray-200 transition hover:border-gold-500/50 hover:text-white"
            >
              Live site
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
