"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, OrbitControls } from "@react-three/drei";

// Mock data for services - in a real app, this would come from a CMS
const mockServicesData: { [key: string]: { title: string; description: string; longDescription: string; backgroundEffect: string } } = {
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
    description: "Top-tier DJs and live bands.",
    longDescription:
      "Experience vibrant and energetic performances from our top-tier DJs and live bands. We bring the rhythm and excitement to any event, ensuring an unforgettable atmosphere.",
    backgroundEffect: "#FF1493", // Deep pink for DJs & Bands
  },
  festivals: {
    title: "Festivals",
    description: "Dynamic stage acts and engaging performances.",
    longDescription:
      "Captivate large audiences with dynamic stage acts and engaging performances tailored for festivals. Our artists are ready to deliver unforgettable experiences under the lights.",
    backgroundEffect: "#7CFC00", // Lawn green for festivals
  },
};

export default function ServiceDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const service = mockServicesData[slug];

  if (!service) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="text-4xl text-white">Service not found.</h1>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden p-8">
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Sphere args={[1, 100, 200]} scale={2.5}>
            <MeshDistortMaterial
              color={service.backgroundEffect}
              attach="material"
              distort={0.5}
              speed={2}
            />
          </Sphere>
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 text-center bg-gray-900 bg-opacity-70 p-10 rounded-lg max-w-3xl mx-auto shadow-2xl"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-5xl md:text-6xl font-extrabold text-white mb-4"
        >
          {service.title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-xl text-gold-400 mb-8"
        >
          {service.description}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="text-gray-300 text-lg leading-relaxed"
        >
          {service.longDescription}
        </motion.p>
      </motion.div>
    </div>
  );
}
