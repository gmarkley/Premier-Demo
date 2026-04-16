"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
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

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    if (Math.random() > 0.2) { // 80% success rate for demo
      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } else {
      setSubmitStatus("error");
    }
    setIsSubmitting(false);
  };

  const inputVariants = {
    initial: { y: 10, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <div className="container mx-auto px-4 py-16 min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-gray-800 rounded-lg p-10 shadow-2xl max-w-2xl w-full border border-gray-700"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-6xl font-extrabold text-white text-center mb-8"
        >
          Contact Us
        </motion.h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div variants={inputVariants} transition={{ delay: 0.1 }}>
            <label htmlFor="name" className="block text-gray-300 text-lg font-semibold mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-4 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none transition-all"
            />
          </motion.div>

          <motion.div variants={inputVariants} transition={{ delay: 0.2 }}>
            <label htmlFor="email" className="block text-gray-300 text-lg font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-4 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none transition-all"
            />
          </motion.div>

          <motion.div variants={inputVariants} transition={{ delay: 0.3 }}>
            <label htmlFor="message" className="block text-gray-300 text-lg font-semibold mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              className="w-full p-4 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none transition-all"
            ></textarea>
          </motion.div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255, 198, 0, 0.6)" }}
            whileTap={{ scale: 0.95 }}
            disabled={isSubmitting}
            className="w-full mt-8 px-10 py-4 bg-gold-500 text-gray-900 text-xl font-bold rounded-full shadow-lg hover:bg-gold-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </motion.button>

          {submitStatus === "success" && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-green-500 text-lg mt-4"
            >
              Message sent successfully! We'll be in touch soon.
            </motion.p>
          )}
          {submitStatus === "error" && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-red-500 text-lg mt-4"
            >
              Oops! Something went wrong. Please try again later.
            </motion.p>
          )}
        </form>
      </motion.div>
    </div>
  );
}
