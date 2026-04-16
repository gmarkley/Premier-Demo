"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
}

/** Match keys in `app/services/[slug]/page.tsx` (e.g. "DJs & Bands" → djs-bands). */
function serviceSlugFromTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/&/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function ServiceCard({ title, description, icon }: ServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const serviceSlug = serviceSlugFromTitle(title);

  return (
    <Link href={`/services/${serviceSlug}`} passHref>
      <motion.div
        className="relative bg-gray-800 rounded-lg p-8 shadow-xl border border-gray-700 cursor-pointer"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileTap={{ scale: 0.98 }}
        initial={{ scale: 1 }}
        animate={{
          rotateX: isHovered ? [0, -5, 5, 0] : 0,
          rotateY: isHovered ? [0, 5, -5, 0] : 0,
          y: isHovered ? -10 : 0,
          transition: {
            duration: 0.6,
            ease: "easeOut",
            times: [0, 0.2, 0.8, 1],
          },
        }}
      >
        <div className="text-5xl mb-4">{icon}</div>
        <h2 className="text-3xl font-bold text-white mb-2">{title}</h2>
        <p className="text-gray-300">{description}</p>
      </motion.div>
    </Link>
  );
}
