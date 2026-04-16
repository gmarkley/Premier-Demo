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
];

export default function Services() {
  return (
    <div className="container mx-auto px-4 py-16">
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
  );
}
