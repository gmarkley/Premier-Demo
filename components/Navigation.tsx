"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import OverlayMenu from "./OverlayMenu";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="relative z-50 w-full bg-black shadow-lg">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link
          href="/"
          className="rounded-md p-1 transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-gold-400"
          aria-label="Premier Entertainment home"
        >
          <Image
            src="/brand/premier-stars.png"
            alt="Premier stars logo"
            width={72}
            height={72}
            className="h-10 w-auto md:h-12"
            priority
          />
        </Link>
        <button
          onClick={toggleMenu}
          className="text-white focus:outline-none focus:ring-2 focus:ring-gold-400 p-2 rounded-md lg:hidden"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            ></path>
          </svg>
        </button>
        <ul className="hidden lg:flex space-x-6">
          <li>
            <Link href="/#company" className="text-white hover:text-gold-400 transition-colors">
                About
            </Link>
          </li>
          <li>
            <Link href="/#services" className="text-white hover:text-gold-400 transition-colors">
                Services
            </Link>
          </li>
          <li>
            <Link href="/#roster" className="text-white hover:text-gold-400 transition-colors">
                Roster
            </Link>
          </li>
          <li>
            <Link href="/#faq" className="text-white hover:text-gold-400 transition-colors">
                FAQ
            </Link>
          </li>
          <li>
            <Link href="/#contact" className="text-white hover:text-gold-400 transition-colors">
                Contact
            </Link>
          </li>
          <li>
            <Link href="/artists" className="text-white hover:text-gold-400 transition-colors">
                Artist Pages
            </Link>
          </li>
        </ul>
      </div>
      <OverlayMenu isOpen={isMenuOpen} toggleMenu={toggleMenu} />
    </nav>
  );
}
