"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

interface ArtistCardProps {
  name: string;
  instrument: string;
  image: string;
  slug: string;
}

export default function ArtistCard({ name, instrument, image, slug }: ArtistCardProps) {
  return (
    <Link href={`/artists/${slug}`} className="block h-full" passHref>
      <motion.div
        className="relative flex h-full flex-col overflow-hidden rounded-lg border border-gray-700 bg-gray-800 shadow-xl group cursor-pointer"
        whileHover={{ scale: 1.03, boxShadow: "0 15px 30px rgba(0,0,0,0.4)" }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="relative h-64 w-full shrink-0 overflow-hidden">
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70 group-hover:opacity-80 transition-opacity">
            {/* Gradient Overlay */}
          </div>
        </div>
        <div className="flex flex-1 flex-col p-6 text-center">
          <h2 className="text-3xl font-bold leading-snug text-white">{name}</h2>
          <div className="mt-2 flex min-h-[3.5rem] flex-col items-center justify-center">
            {instrument ? <p className="text-lg text-gold-400">{instrument}</p> : null}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
