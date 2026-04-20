import type { NextConfig } from 'next'

const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(self)',
  },
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self' https://*.supabase.co https://api.anthropic.com https://o4508000000000000.ingest.sentry.io; frame-ancestors 'self';",
  },
]

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },
}

// Sentry aktiveras när SENTRY_AUTH_TOKEN är satt i miljön (Netlify env vars).
// Utan token: bygg normalt utan source map-upload.
async function buildConfig(): Promise<NextConfig> {
  if (process.env.SENTRY_AUTH_TOKEN) {
    const { withSentryConfig } = await import('@sentry/nextjs')
    return withSentryConfig(nextConfig, {
      org:     process.env.SENTRY_ORG     ?? 'svalla',
      project: process.env.SENTRY_PROJECT ?? 'svalla-nextjs',
      silent: true,
      widenClientFileUpload: true,
      hideSourceMaps: true,
      automaticVercelMonitors: false,
      disableLogger: true,
    })
  }
  return nextConfig
}

export default buildConfig()
