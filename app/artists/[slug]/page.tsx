"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, OrbitControls } from "@react-three/drei";
import Image from "next/image";
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

interface ArtistVideo {
  title: string;
  url: string;
}

const jaronVideos: ArtistVideo[] = [
  { title: "Jaron Clark Performance 1", url: "https://www.youtube.com/watch?v=LYyJFDvOHvo" },
  { title: "Jaron Clark Performance 2", url: "https://www.youtube.com/shorts/LiFsQcLrEHc" },
  { title: "Jaron Clark Performance 3", url: "https://www.youtube.com/watch?v=AXrDexTPGjw" },
];

/** Extra Ennis clips (optional). Primary video can also live in `data/artists.json` → `video`. */
const ennisVideos: ArtistVideo[] = [];

function featuredVideosForArtist(artist: Artist): ArtistVideo[] {
  if (artist.slug === "jaron-clark") return jaronVideos;
  if (artist.slug === "ennis-one-man-band") {
    if (ennisVideos.length > 0) return ennisVideos;
    if (artist.video) return [{ title: "Ennis — performance", url: artist.video }];
    return [];
  }
  return [];
}

function getYouTubeVideoId(url: string) {
  const shortsMatch = url.match(/youtube\.com\/shorts\/([^?&/]+)/i);
  if (shortsMatch?.[1]) return shortsMatch[1];
  const watchMatch = url.match(/[?&]v=([^?&/]+)/i);
  if (watchMatch?.[1]) return watchMatch[1];
  const shortUrlMatch = url.match(/youtu\.be\/([^?&/]+)/i);
  if (shortUrlMatch?.[1]) return shortUrlMatch[1];
  return "";
}

function toEmbedUrl(url: string) {
  const videoId = getYouTubeVideoId(url);
  return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
}

export default function ArtistDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [artist, setArtist] = useState<Artist | null>(null);
  const [ready, setReady] = useState(false);
  const [activeVideoUrl, setActiveVideoUrl] = useState<string>("");

  useEffect(() => {
    let cancelled = false;
    async function fetchArtist() {
      setReady(false);
      const response = await fetch("/api/artists");
      const artistsData: Artist[] = await response.json();
      const foundArtist = artistsData.find((a) => a.slug === slug);
      if (!cancelled) {
        setArtist(foundArtist ?? null);
        if (foundArtist?.slug === "jaron-clark") {
          setActiveVideoUrl(jaronVideos[0].url);
        } else if (foundArtist?.slug === "ennis-one-man-band") {
          const list = featuredVideosForArtist(foundArtist);
          setActiveVideoUrl(list[0]?.url ?? foundArtist?.video ?? "");
        } else {
          setActiveVideoUrl(foundArtist?.video ?? "");
        }
        setReady(true);
      }
    }
    fetchArtist();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  useEffect(() => {
    if (!artist) return;
    document.title = `${artist.name} | Premier Entertainment`;
    return () => {
      document.title = "Premier Entertainment";
    };
  }, [artist]);

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <h1 className="text-4xl text-white">Loading artist…</h1>
      </div>
    );
  }

  if (!artist) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <h1 className="text-4xl text-white">Artist not found.</h1>
      </div>
    );
  }

  const featuredVideos = featuredVideosForArtist(artist);
  const activeEmbedUrl = toEmbedUrl(activeVideoUrl);

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden p-8">
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Sphere args={[1, 100, 200]} scale={2.5}>
            <MeshDistortMaterial color="#8352FD" attach="material" distort={0.5} speed={2} />
          </Sphere>
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 mx-auto max-w-4xl rounded-lg bg-gray-900/70 p-10 text-center shadow-2xl"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="relative mx-auto mb-6 h-48 w-48 overflow-hidden rounded-full border-4 border-gold-500 shadow-lg"
        >
          <Image src={artist.image} alt={artist.name} fill className="object-cover" sizes="192px" />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="mb-2 text-5xl font-extrabold text-white md:text-6xl"
        >
          {artist.name}
        </motion.h1>
        {artist.instrument ? (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="mb-6 text-xl text-gold-400"
          >
            {artist.instrument}
          </motion.p>
        ) : null}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="mb-8 text-lg leading-relaxed text-gray-300"
        >
          {artist.bio}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
          className="mx-auto mt-2 w-full max-w-3xl"
        >
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-left text-xl font-bold text-gold-300 md:text-2xl">Featured Videos</h2>
            {activeVideoUrl ? (
              <a
                href={activeVideoUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-gold-500/50 px-4 py-2 text-sm font-semibold text-gold-200 transition hover:bg-gold-500/10"
              >
                Watch on YouTube
              </a>
            ) : null}
          </div>

          <div className="aspect-video w-full overflow-hidden rounded-lg bg-gray-800 shadow-xl">
            {activeEmbedUrl ? (
              <iframe
                src={activeEmbedUrl}
                title={`${artist.name} Video`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            ) : (
              <div className="flex h-full min-h-[200px] items-center justify-center text-gray-500">
                No video available yet.
              </div>
            )}
          </div>

          {featuredVideos.length ? (
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {featuredVideos.map((video, idx) => {
                const videoId = getYouTubeVideoId(video.url);
                const thumb = videoId ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` : "";
                const isActive = video.url === activeVideoUrl;
                return (
                  <button
                    key={video.url}
                    onClick={() => setActiveVideoUrl(video.url)}
                    className={`overflow-hidden rounded-lg border text-left transition ${
                      isActive
                        ? "border-gold-400 bg-gold-500/10 shadow-[0_0_0_1px_rgba(255,215,0,0.35)]"
                        : "border-gray-700 bg-gray-900/80 hover:border-gold-500/40"
                    }`}
                  >
                    <div className="aspect-video w-full bg-gray-800">
                      {thumb ? (
                        <img src={thumb} alt={video.title} className="h-full w-full object-cover" loading="lazy" />
                      ) : null}
                    </div>
                    <div className="px-3 py-2">
                      <p className="text-sm font-semibold text-white">Video {idx + 1}</p>
                      <p className="mt-0.5 line-clamp-2 text-xs text-gray-300">{video.title}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          ) : null}
        </motion.div>
      </motion.div>
    </div>
  );
}
