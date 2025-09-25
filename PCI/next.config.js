/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  images: {
    domains: ["www.paralympicindia.com", "paralympicindia.com", "localhost", "4.187.228.16"], // allow external image hostname
    unoptimized: false, // Keep optimization for local images
    formats: ['image/avif', 'image/webp'], // Enable modern formats
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // Cache images for 1 year
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Performance optimizations
  experimental: {
    optimizePackageImports: ['lucide-react', 'next/image', '@radix-ui/react-slot', 'clsx', 'tailwind-merge'],
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
  // Bundle analyzer - enable with ANALYZE=true
  ...(process.env.ANALYZE === 'true' && {
    webpack: (config) => {
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          openAnalyzer: false, 
        })
      );
      return config;
    },
  }),
  // Compress responses
  compress: true,
  // Bundle optimization
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Bundle analyzer - only in production builds
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        ...config.optimization.splitChunks,
        cacheGroups: {
          ...config.optimization.splitChunks?.cacheGroups,
          default: false,
          vendors: false,
          // Create separate chunk for vendor libraries
          vendor: {
            name: 'vendors',
            chunks: 'all',
            test: /node_modules/,
            priority: 20,
          },
          // Create separate chunk for common modules
          common: {
            name: 'commons',
            minChunks: 2,
            chunks: 'all',
            priority: 10,
            reuseExistingChunk: true,
            enforce: true,
          },
        },
      };
    }
    return config;
  },
  // Cache optimization
  headers: async () => [
    {
      source: '/assets/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
  ],
  output: 'standalone',
};

export default config;
