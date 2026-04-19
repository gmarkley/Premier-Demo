import './globals.css';
import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';

import Layout from '../components/Layout';

const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' });

export const metadata: Metadata = {
  title: 'Premier Entertainment',
  description: 'Make Your Event Unforgettable!',
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${montserrat.variable} font-sans`}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
