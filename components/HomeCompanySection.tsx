"use client";

import { motion } from "framer-motion";

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
    <section id="company" className="border-t border-gray-800 bg-gray-900 py-16 md:py-20">
      <div className="mx-auto max-w-5xl px-4 text-center">
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
          The PREMIER agency for America&apos;s brightest musical talents
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

      <div className="mx-auto mt-14 grid max-w-5xl gap-6 px-4 md:grid-cols-3">
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
        className="mx-auto mt-12 max-w-3xl px-4 text-center"
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
