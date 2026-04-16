"use client";

import { motion } from "framer-motion";
import ArtistCard from "../../components/ArtistCard";
import { useEffect, useState } from "react";

interface Artist {
  id: string;
  name: string;
  instrument: string;
  bio: string;
  image: string;
  video: string;
  slug: string;
}

export default function Artists() {
  const [artists, setArtists] = useState<Artist[]>([]);

  useEffect(() => {
    async function fetchArtists() {
      // In a real app, this would be an API call, e.g., /api/artists
      const response = await fetch('/api/artists', { cache: 'no-store' });
      const data = await response.json();
      setArtists(data);
    }
    fetchArtists();
  }, []);

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-5xl md:text-6xl font-extrabold text-white text-center mb-12"
      >
        Our Artists
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {artists.map((artist) => (
          <ArtistCard
            key={artist.id}
            name={artist.name}
            instrument={artist.instrument}
            image={artist.image}
            slug={artist.slug}
          />
        ))}
      </div>
    </div>
  );
}
