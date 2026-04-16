"use client";

import Link from "next/link";
import Hero from "../components/Hero";
import AnimatedText from "../components/AnimatedText";
import HomeOwnerSpotlight from "../components/HomeOwnerSpotlight";
import HomeCompanySection from "../components/HomeCompanySection";
import HomeMeetArtistsStrip from "../components/HomeMeetArtistsStrip";
import HomeFaqSection from "../components/HomeFaqSection";
import Services from "./services/page";
import Contact from "./contact/page";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <>
      <Hero>
        <AnimatedText
          text="Your Partner in Unforgettable Events!"
          className="text-5xl md:text-7xl font-extrabold text-white leading-tight"
          delay={0.2}
        />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="mt-4 font-montserrat text-xl text-gold-400 md:text-2xl"
        >
          Live instrumentalists · Weddings · Corporate events · DJs & bands · Yacht clubs · Resorts ·
          Festivals
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="mt-8"
        >
          <Link
            href="/#contact"
            className="inline-block rounded-full bg-gold-500 px-10 py-4 text-xl font-bold text-gray-900 shadow-lg transition-all duration-300 hover:bg-gold-400 hover:shadow-[0_0_20px_rgba(255,198,0,0.6)] active:scale-[0.98]"
          >
            BOOK YOUR EVENT
          </Link>
        </motion.div>
      </Hero>
      <HomeCompanySection />
      <section id="services">
        <Services />
      </section>
      <HomeOwnerSpotlight />
      <section id="roster">
        <HomeMeetArtistsStrip />
      </section>
      <HomeFaqSection />
      <section id="contact">
        <Contact />
      </section>
    </>
  );
}
