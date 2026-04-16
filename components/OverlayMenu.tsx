"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface OverlayMenuProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

export default function OverlayMenu({ isOpen, toggleMenu }: OverlayMenuProps) {
  const menuVariants = {
    hidden: { opacity: 0, x: "-100%" },
    visible: { opacity: 1, x: "0%" },
  };

  const linkVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={menuVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 bg-gray-900 bg-opacity-95 flex flex-col items-center justify-center space-y-8 z-40 lg:hidden"
        >
          <Link
            href="/"
            onClick={toggleMenu}
            className="rounded-md p-1 transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-gold-400"
            aria-label="Premier Entertainment home"
          >
            <Image
              src="/brand/premier-logo.png"
              alt="Premier Entertainment logo"
              width={260}
              height={98}
              className="h-14 w-auto"
              priority
            />
          </Link>
          <motion.ul className="flex flex-col space-y-6 text-4xl font-bold text-white">
            <motion.li variants={linkVariants} transition={{ delay: 0.1 }}>
              <Link href="/#company" onClick={toggleMenu} className="hover:text-gold-400 transition-colors">
                  About
              </Link>
            </motion.li>
            <motion.li variants={linkVariants} transition={{ delay: 0.2 }}>
              <Link href="/#services" onClick={toggleMenu} className="hover:text-gold-400 transition-colors">
                  Services
              </Link>
            </motion.li>
            <motion.li variants={linkVariants} transition={{ delay: 0.25 }}>
              <Link href="/#roster" onClick={toggleMenu} className="hover:text-gold-400 transition-colors">
                  Roster
              </Link>
            </motion.li>
            <motion.li variants={linkVariants} transition={{ delay: 0.3 }}>
              <Link href="/#faq" onClick={toggleMenu} className="hover:text-gold-400 transition-colors">
                  FAQ
              </Link>
            </motion.li>
            <motion.li variants={linkVariants} transition={{ delay: 0.35 }}>
              <Link href="/#contact" onClick={toggleMenu} className="hover:text-gold-400 transition-colors">
                  Contact
              </Link>
            </motion.li>
            <motion.li variants={linkVariants} transition={{ delay: 0.4 }}>
              <Link href="/artists" onClick={toggleMenu} className="hover:text-gold-400 transition-colors">
                  Artist Pages
              </Link>
            </motion.li>
          </motion.ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
