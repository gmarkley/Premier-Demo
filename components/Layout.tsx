"use client";

import { ReactNode } from "react";
import Navigation from "./Navigation";
import Footer from "./Footer";
import TransitionEffect from "./TransitionEffect";
import GlobalMouseSpotlight from "./GlobalMouseSpotlight";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="relative min-h-screen bg-gray-900 text-gray-100">
      <GlobalMouseSpotlight />
      <div className="relative z-[2] flex min-h-screen flex-col">
        <Navigation />
        <TransitionEffect>
          <main className="min-h-0 flex-1">{children}</main>
        </TransitionEffect>
        <Footer />
      </div>
    </div>
  );
}
