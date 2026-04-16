"use client";

import { ReactNode } from "react";
import Navigation from "./Navigation";
import Footer from "./Footer";
import TransitionEffect from "./TransitionEffect";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Navigation />
      <TransitionEffect>
        <main>{children}</main>
      </TransitionEffect>
      <Footer />
    </div>
  );
}
