"use client";

import { useParams } from "next/navigation";
import { Canvas } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, OrbitControls } from "@react-three/drei";

type ServiceEntry = {
  title: string;
  description: string;
  longDescription: string;
  backgroundEffect: string;
  highlights?: string[];
  idealFor?: string[];
};

// Mock data for services - in a real app, this would come from a CMS
const mockServicesData: Record<string, ServiceEntry> = {
  weddings: {
    title: "Weddings",
    description: "Elegant musical performances.",
    longDescription:
      "Make your special day truly unforgettable with our exquisite musical performances. From classical ensembles to modern bands, we tailor every note to your unique love story.",
    backgroundEffect: "#FFD700", // Gold color for weddings
  },
  "corporate-events": {
    title: "Corporate Events",
    description: "Professional entertainment solutions.",
    longDescription:
      "Elevate your corporate gatherings and product launches with bespoke entertainment. Our professional artists ensure your event leaves a lasting impression on clients and colleagues.",
    backgroundEffect: "#00BFFF", // Deep sky blue for corporate
  },
  "djs-bands": {
    title: "DJs & Bands",
    description: "Club-grade DJs, polished MCs, and live bands that keep the floor full from first dance to last call.",
    longDescription:
      "Whether you want a chart-smart DJ with seamless mixing, a high-energy live band, or a hybrid night that blends both, we book talent that reads the room and delivers a premium, on-brand experience. Every set is curated around your timeline, crowd, and venue—so energy builds naturally and never feels generic.",
    backgroundEffect: "#FF1493", // Deep pink for DJs & Bands
    highlights: [
      "Wedding receptions, after-parties, and dance-heavy celebrations",
      "Corporate galas, product launches, and brand activations",
      "Yacht clubs, resorts, and private member events",
      "Curated playlists, live remixing, and tasteful crowd interaction",
      "Professional sound support and coordination with your planner or AV team",
    ],
    idealFor: [
      "Couples who want a packed dance floor without cheesy mic work",
      "Hosts who need a flexible lineup—cocktail jazz into late-night DJ",
      "Venues that expect polished arrivals, load-in, and dress code",
    ],
  },
  festivals: {
    title: "Festivals",
    description: "Dynamic stage acts and engaging performances.",
    longDescription:
      "Captivate large audiences with dynamic stage acts and engaging performances tailored for festivals. Our artists are ready to deliver unforgettable experiences under the lights.",
    backgroundEffect: "#7CFC00", // Lawn green for festivals
  },
  "yacht-clubs": {
    title: "Yacht Clubs",
    description: "Upscale waterfront entertainment experiences.",
    longDescription:
      "Set the tone for exclusive yacht club gatherings with polished live entertainment designed for waterfront elegance. From cocktail-hour ambiance to high-energy evening sets, we tailor every performance to your members and guests.",
    backgroundEffect: "#1E90FF", // Dodger blue for yacht clubs
  },
  "private-jets": {
    title: "Private Jets",
    description: "Luxury-ready entertainment for private aviation.",
    longDescription:
      "Deliver an elevated guest experience with curated entertainment built for private aviation environments. Whether for VIP arrivals, branded activations, or elite charter events, our artists bring refined energy and professionalism.",
    backgroundEffect: "#C0C0C0", // Silver for private jets
  },
  "live-instrumentalists": {
    title: "Live Instrumentalists",
    description: "Sophisticated live musicians for premium events.",
    longDescription:
      "Enhance the atmosphere with polished live instrumentalists tailored to your audience and setting. From elegant ceremonies and cocktail receptions to luxury brand moments, we curate performances that feel seamless and unforgettable.",
    backgroundEffect: "#8A2BE2", // Blue violet for live instrumentalists
  },
  "five-star-restaurants": {
    title: "Five Star Restaurants",
    description: "Luxury entertainment for elevated dining venues.",
    longDescription:
      "Create a signature dining experience with entertainment designed to complement five-star hospitality. We provide tasteful, high-caliber acts that elevate ambiance while matching your brand standards and guest expectations.",
    backgroundEffect: "#DAA520", // Goldenrod for five-star restaurants
  },
  "hotels-and-resorts": {
    title: "Hotels and Resorts",
    description: "Curated performances for destination properties.",
    longDescription:
      "Bring your property to life with tailored entertainment across lobbies, pool decks, lounges, and special events. Our roster supports hotels and resorts with versatile programming that enhances guest satisfaction and on-property experiences.",
    backgroundEffect: "#20B2AA", // Light sea green for hotels and resorts
  },
};

const serviceBySlug = (slug: string): ServiceEntry | undefined =>
  mockServicesData[slug] ?? (slug === "djs-&-bands" ? mockServicesData["djs-bands"] : undefined);

export default function ServiceDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const service = serviceBySlug(slug);

  if (!service) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <h1 className="text-4xl text-white">Service not found.</h1>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden p-8">
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Sphere args={[1, 100, 200]} scale={2.5}>
            <MeshDistortMaterial color={service.backgroundEffect} attach="material" distort={0.5} speed={2} />
          </Sphere>
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>

      <div className="relative z-10 mx-auto max-w-3xl rounded-lg bg-gray-900/70 p-10 text-center shadow-2xl">
        <h1 className="mb-4 text-5xl font-extrabold text-white md:text-6xl">{service.title}</h1>
        <p className="mb-8 text-xl text-gold-400">{service.description}</p>
        <p className="mb-10 text-lg leading-relaxed text-gray-300">{service.longDescription}</p>

        {service.highlights && service.highlights.length > 0 ? (
          <div className="mb-10 text-left">
            <h2 className="mb-4 text-center text-xl font-semibold text-white">What you get</h2>
            <ul className="mx-auto max-w-xl space-y-3 text-gray-300">
              {service.highlights.map((line) => (
                <li key={line} className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-400" aria-hidden />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {service.idealFor && service.idealFor.length > 0 ? (
          <div className="text-left">
            <h2 className="mb-4 text-center text-xl font-semibold text-white">Ideal when</h2>
            <ul className="mx-auto max-w-xl space-y-3 text-gray-300">
              {service.idealFor.map((line) => (
                <li key={line} className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-400" aria-hidden />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
}
