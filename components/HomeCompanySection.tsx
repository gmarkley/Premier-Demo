"use client";

import { motion } from "framer-motion";

/** Soft wedding atmosphere — Unsplash (Unsplash License). Replace with your own asset (e.g. from Freepik) in `/public` if preferred. */
const COMPANY_SECTION_BG =
  "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2400&q=80";

const pillars = [
  {
    title: "Customized solutions",
    body: "Custom-tailored events designed to enhance your unique occasion.",
  },
  {
    title: "Experienced professionals",
    body: "A passionate team with deep experience executing successful events.",
  },
  {
    title: "Comprehensive support",
    body: "End-to-end services covering planning, promotion, execution, and follow-up.",
  },
];

export default function HomeCompanySection() {
  return (
    <section
      id="company"
      className="relative overflow-hidden border-t border-gray-800 bg-gray-900 py-16 md:py-20"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <div
          className="absolute left-1/2 top-1/2 h-[140%] w-[140%] -translate-x-1/2 -translate-y-1/2 scale-110 bg-cover bg-center bg-no-repeat opacity-25"
          style={{ backgroundImage: `url('${COMPANY_SECTION_BG}')` }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-sm font-semibold uppercase tracking-[0.25em] text-gold-400"
        >
          Premier Entertainment
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.05 }}
          className="mt-3 text-3xl font-extrabold leading-tight text-white md:text-4xl"
        >
          The Premier Agency for World Class Luxury Events
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-gray-300"
        >
          We specialize in transforming your event visions into reality. Our dedicated team combines
          creativity and strategic thinking to create impactful experiences that engage your audience and
          elevate your event.
        </motion.p>
      </div>

      <div className="relative z-10 mx-auto mt-14 grid max-w-5xl gap-6 px-4 md:grid-cols-3">
        {pillars.map((item, i) => (
          <motion.article
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 * i }}
            className="rounded-xl border border-gray-800 bg-gray-950/80 p-6 text-left shadow-lg"
          >
            <h3 className="text-lg font-bold text-gold-300">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-400">{item.body}</p>
          </motion.article>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative z-10 mx-auto mt-12 max-w-3xl px-4 text-center"
      >
        <p className="text-sm uppercase tracking-widest text-gray-500">Want to work with us?</p>
        <a
          href="tel:4077650323"
          className="mt-2 inline-block text-2xl font-bold text-gold-400 transition hover:text-gold-300 md:text-3xl"
        >
          407-765-0323
        </a>
        <p className="mt-2 text-sm text-gray-500">Call or reach out through our contact page.</p>
      </motion.div>
    </section>
  );
}
