/** @type {import('next').NextConfig} */
const nextConfig = {
  /** Avoid stale/missing framer-motion server chunks in App Router builds */
  transpilePackages: ['framer-motion'],
  experimental: {
    /** Smaller / more stable imports for framer-motion in App Router */
    optimizePackageImports: ['framer-motion'],
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.leadconnectorhq.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
