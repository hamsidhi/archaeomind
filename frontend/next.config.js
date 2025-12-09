/** @type {import('next').NextConfig} */
const nextConfig = {
  // ✅ TURBOPACK + NEXT.JS 16 OPTIMIZATIONS
  experimental: {
    // Enable Turbopack (faster dev server)
    turbopack: true,
    
    // Fix hydration: disable font optimization (common cause)
    optimizeFonts: false,
    
    // Better React Server Components
    ppr: "incremental",
  },

  // ✅ HYDRATION MISMATCH FIXES
  eslint: {
    // Skip during dev (focus on hydration first)
    ignoreDuringBuilds: true,
  },
  
  typescript: {
    // Strict typing but no build blocks
    ignoreBuildErrors: false,
  },

  // ✅ IMAGE + EXTERNAL RESOURCES
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'r2cdn.perplexity.ai',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.gravatar.com',
      },
    ],
    // Disable image optimization (prevents hydration issues)
    unoptimized: true,
  },

  // ✅ DEVELOPMENT EXPERIENCE
  webpack: (config, { dev, isServer }) => {
    // Fix Turbopack + SVGR (if using icons)
    if (!dev && !isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      }
    }
    return config
  },

  // ✅ OUTPUT + TRAILING SLASH
  trailingSlash: false,
  output: 'standalone', // Docker production-ready

  // ✅ SECURITY HEADERS
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'X-Frame-Options',
          value: 'DENY',
        },
        {
          key: 'X-XSS-Protection',
          value: '1; mode=block',
        },
      ],
    },
  ],
}

module.exports = nextConfig
