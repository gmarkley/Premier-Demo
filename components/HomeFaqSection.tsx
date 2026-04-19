"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const faqs = [
  {
    question: "Question 1: What types of events do you specialize in?",
    answer:
      "We specialize in a wide range of events, including corporate events, product launches, trade shows, weddings, and community festivals. Our team tailors each event to meet your unique objectives and audience.",
  },
  {
    question: "Question 2: How do you measure the success of an event?",
    answer:
      "We measure success through key metrics such as guest engagement, lead generation, social media reach, and post-event feedback. We provide reporting so you can clearly understand event performance.",
  },
  {
    question: "Question 3: Can you help with both planning and execution?",
    answer:
      "Absolutely. We support everything from concept and planning through day-of execution and post-event follow-up, so your experience stays smooth from start to finish.",
  },
  {
    question: "Question 4: What is your pricing structure for event marketing services?",
    answer:
      "Pricing is customized based on the scope, complexity, and scale of your event. We offer flexible packages and can provide a detailed quote after a quick discovery conversation.",
  },
];

export default function HomeFaqSection() {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section id="faq" className="border-t border-gold-500/20 bg-gray-950 py-10 text-white md:py-14">
      <div className="mx-auto max-w-5xl px-4">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-sm font-semibold uppercase tracking-[0.2em] text-gold-400"
        >
          Still not sure?
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className="mt-2 text-center text-3xl font-extrabold tracking-tight text-white md:text-4xl"
        >
          Frequently Asked Questions
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mx-auto mt-3 max-w-2xl text-center text-base text-gray-300 md:text-lg"
        >
          Got questions about our artists&apos; services? You&apos;re in the right place!
        </motion.p>

        <div className="mt-8 space-y-3">
          {faqs.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <motion.article
                key={item.question}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.04 }}
                className="overflow-hidden rounded-xl border border-white/10 bg-gray-900/70 shadow-sm"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-3.5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-lg font-bold text-white md:text-[1.65rem]">{item.question}</span>
                  <span
                    className={`text-xl font-bold text-gold-400 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  >
                    ▾
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: "easeOut" }}
                      className="overflow-hidden border-t border-white/10 bg-gray-900"
                    >
                      <p className="px-5 py-4 text-base leading-relaxed text-gray-200 md:text-lg">{item.answer}</p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
