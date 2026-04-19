"use client";

import { motion } from "framer-motion";
import { useState } from "react";

function Spinner({ className }: { className?: string }) {
  return (
    <svg
      className={`animate-spin ${className ?? ""}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-90"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        }),
      });

      const data = (await res.json().catch(() => ({}))) as { error?: string };

      if (res.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        console.error("Contact API error", res.status, data);
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldEase = [0.22, 1, 0.36, 1] as const;

  return (
    <div className="relative overflow-hidden py-16 md:py-24">
      <div className="pointer-events-none absolute inset-0 hero-grid opacity-40" />
      <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[min(90vw,42rem)] -translate-x-1/2 rounded-full bg-gold-500/12 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 rounded-full bg-[#1a1f3a]/80 blur-3xl" />

      <div className="container relative mx-auto max-w-3xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: fieldEase }}
          className="relative rounded-[1.75rem] p-[1px] shadow-[0_32px_120px_-24px_rgba(0,0,0,0.75)]"
        >
          <div className="absolute inset-0 rounded-[1.75rem] bg-gradient-to-br from-white/[0.18] via-white/[0.04] to-gold-500/25" />
          <div className="relative overflow-hidden rounded-[1.7rem] border border-white/[0.08] bg-[#0a0c14]/75 backdrop-blur-2xl">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
            <div className="px-6 py-10 sm:px-10 sm:py-12">
              <div className="mb-10 text-center sm:text-left">
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.05, duration: 0.4 }}
                  className="text-[0.7rem] font-semibold uppercase tracking-[0.35em] text-gold-400/90"
                >
                  Get in touch
                </motion.p>
                <motion.h1
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1, duration: 0.45 }}
                  className="mt-3 bg-gradient-to-br from-white via-white to-white/75 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl"
                >
                  Let&apos;s Plan Your Event
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15, duration: 0.45 }}
                  className="mt-3 max-w-xl text-pretty text-base leading-relaxed text-white/55 sm:text-lg"
                >
                  Tell us about your date, venue, and vibe—we&apos;ll follow up within one business day.
                </motion.p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.12, duration: 0.4, ease: fieldEase }}
                  className="group relative"
                >
                  <input
                    type="text"
                    id="name"
                    name="name"
                    autoComplete="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder=" "
                    className="peer block w-full rounded-2xl border border-white/[0.1] bg-white/[0.04] px-4 pb-3 pt-7 text-[15px] text-white outline-none ring-0 transition-[border,box-shadow] duration-200 placeholder:text-transparent focus:border-gold-500/45 focus:bg-white/[0.06] focus:shadow-[0_0_0_4px_rgba(255,215,0,0.12)]"
                  />
                  <label
                    htmlFor="name"
                    className="pointer-events-none absolute left-4 top-[1.125rem] origin-[0] text-[15px] text-white/45 transition-all duration-200 peer-focus:-translate-y-2 peer-focus:scale-[0.78] peer-focus:text-gold-400 peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:scale-[0.78]"
                  >
                    Full name
                  </label>
                </motion.div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.16, duration: 0.4, ease: fieldEase }}
                    className="group relative"
                  >
                    <input
                      type="email"
                      id="email"
                      name="email"
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder=" "
                      className="peer block w-full rounded-2xl border border-white/[0.1] bg-white/[0.04] px-4 pb-3 pt-7 text-[15px] text-white outline-none transition-[border,box-shadow] duration-200 placeholder:text-transparent focus:border-gold-500/45 focus:bg-white/[0.06] focus:shadow-[0_0_0_4px_rgba(255,215,0,0.12)]"
                    />
                    <label
                      htmlFor="email"
                      className="pointer-events-none absolute left-4 top-[1.125rem] origin-[0] text-[15px] text-white/45 transition-all duration-200 peer-focus:-translate-y-2 peer-focus:scale-[0.78] peer-focus:text-gold-400 peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:scale-[0.78]"
                    >
                      Email
                    </label>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.4, ease: fieldEase }}
                    className="group relative"
                  >
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      autoComplete="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder=" "
                      className="peer block w-full rounded-2xl border border-white/[0.1] bg-white/[0.04] px-4 pb-3 pt-7 text-[15px] text-white outline-none transition-[border,box-shadow] duration-200 placeholder:text-transparent focus:border-gold-500/45 focus:bg-white/[0.06] focus:shadow-[0_0_0_4px_rgba(255,215,0,0.12)]"
                    />
                    <label
                      htmlFor="phone"
                      className="pointer-events-none absolute left-4 top-[1.125rem] origin-[0] text-[15px] text-white/45 transition-all duration-200 peer-focus:-translate-y-2 peer-focus:scale-[0.78] peer-focus:text-gold-400 peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:scale-[0.78]"
                    >
                      Phone <span className="text-white/30">(optional)</span>
                    </label>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.24, duration: 0.4, ease: fieldEase }}
                  className="group relative"
                >
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder=" "
                    className="peer min-h-[148px] w-full resize-y rounded-2xl border border-white/[0.1] bg-white/[0.04] px-4 pb-3 pt-7 text-[15px] leading-relaxed text-white outline-none transition-[border,box-shadow] duration-200 placeholder:text-transparent focus:border-gold-500/45 focus:bg-white/[0.06] focus:shadow-[0_0_0_4px_rgba(255,215,0,0.12)]"
                  />
                  <label
                    htmlFor="message"
                    className="pointer-events-none absolute left-4 top-[1.125rem] origin-[0] text-[15px] text-white/45 transition-all duration-200 peer-focus:-translate-y-2 peer-focus:scale-[0.78] peer-focus:text-gold-400 peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:scale-[0.78]"
                  >
                    Event details
                  </label>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.28, duration: 0.4 }}
                  className="pt-2"
                >
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: isSubmitting ? 1 : 1.01 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.99 }}
                    className="relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-gold-500 via-gold-500 to-gold-600 px-8 py-4 text-base font-bold text-gray-950 shadow-[0_16px_40px_-12px_rgba(255,215,0,0.55)] transition-[box-shadow] duration-300 hover:shadow-[0_20px_50px_-10px_rgba(255,215,0,0.65)] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <span className="absolute inset-0 bg-gradient-to-t from-white/0 via-white/10 to-white/25 opacity-0 transition-opacity duration-300 hover:opacity-100" />
                    {isSubmitting ? (
                      <>
                        <Spinner className="h-5 w-5" />
                        Sending…
                      </>
                    ) : (
                      "Send message"
                    )}
                  </motion.button>
                </motion.div>

                <div role="status" aria-live="polite" className="min-h-[3rem]">
                  {submitStatus === "success" && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-start gap-3 rounded-2xl border border-emerald-500/25 bg-emerald-500/[0.08] px-4 py-3 text-left text-sm text-emerald-100/95"
                    >
                      <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/25 text-emerald-200">
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span>
                        <span className="font-semibold text-emerald-50">Received.</span> We&apos;ll reply within one business day.
                      </span>
                    </motion.div>
                  )}
                  {submitStatus === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-start gap-3 rounded-2xl border border-red-500/30 bg-red-500/[0.08] px-4 py-3 text-left text-sm text-red-100/95"
                    >
                      <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-500/25 text-red-200">
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      </span>
                      <span>
                        <span className="font-semibold text-red-50">Something went wrong.</span> Please try again in a moment.
                      </span>
                    </motion.div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
