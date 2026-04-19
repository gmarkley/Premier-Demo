"use client";

import Image from "next/image";

export default function Footer() {
  return (
    <footer className="mt-auto bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 p-8 text-center text-gray-400 shadow-lg">
      <div className="container mx-auto">
        <div className="mb-4 flex justify-center">
          <Image
            src="/brand/premier-logo.png"
            alt="Premier Entertainment logo"
            width={220}
            height={83}
            className="h-14 w-auto"
          />
        </div>
        <p>&copy; {new Date().getFullYear()} Premier Entertainment. All rights reserved.</p>
        <p>Make Your Event Unforgettable!</p>
        <p className="mt-3 text-gold-500/90">
          <a href="tel:4077650323" className="hover:text-gold-300">
            407-765-0323
          </a>
          {' · '}
          <a
            href="https://premierentertainment.events/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-gold-300"
          >
            premierentertainment.events
          </a>
        </p>
      </div>
    </footer>
  );
}
