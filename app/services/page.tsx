"use client";

import { motion } from "framer-motion";
import ServiceCard from "../../components/ServiceCard";

const servicesData = [
  {
    title: "Weddings",
    description: "Elegant musical performances to make your special day unforgettable.",
    icon: "👰",
  },
  {
    title: "Corporate Events",
    description: "Professional entertainment solutions for corporate gatherings and product launches.",
    icon: "🏢",
  },
  {
    title: "DJs & Bands",
    description: "Top-tier DJs and live bands for vibrant and energetic performances.",
    icon: "🎤",
  },
  {
    title: "Festivals",
    description: "Dynamic stage acts and engaging performances for large-scale festivals.",
    icon: "🎉",
  },
  {
    title: "Yacht Clubs",
    description: "Upscale live entertainment crafted for waterfront venues and yacht club events.",
    icon: "🛥️",
  },
  {
    title: "Private Jets",
    description: "Luxury-ready performances and ambiance tailored for private aviation experiences.",
    icon: "🛩️",
  },
  {
    title: "Live Instrumentalists",
    description: "Sophisticated live musicians to elevate cocktail hours, ceremonies, and premium events.",
    icon: "🎻",
  },
  {
    title: "Five Star Restaurants",
    description: "Refined entertainment programming for luxury dining and elevated guest experiences.",
    icon: "🍽️",
  },
  {
    title: "Hotels and Resorts",
    description: "Curated performances for destination properties, lobby ambiance, and signature events.",
    icon: "🏨",
  },
];

/** Wedding reception venue — Unsplash (Unsplash License). */
const SERVICES_BG_IMAGE =
  "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=80";

export default function Services() {
  return (
    <div className="relative overflow-hidden border-t border-gold-500/15">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-[0.14]"
        style={{ backgroundImage: `url('${SERVICES_BG_IMAGE}')` }}
      />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-[#0c0f1a]/92 via-gray-950/88 to-[#05070f]/92" />
      <div className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(255,215,0,0.06),transparent_55%)]" />
      <div className="container relative z-10 mx-auto px-4 py-16">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-5xl md:text-6xl font-extrabold text-white text-center mb-12"
      >
        Our Services
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {servicesData.map((service, index) => (
          <ServiceCard
            key={index}
            title={service.title}
            description={service.description}
            icon={service.icon}
          />
        ))}
      </div>
      </div>
    </div>
  );
}
