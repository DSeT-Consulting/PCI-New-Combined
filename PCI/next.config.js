/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  images: {
    domains: ["www.paralympicindia.com", "localhost"], // allow external image hostname
    unoptimized: false, // Keep optimization for local images
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // output: 'standalone',
};

export default config;
