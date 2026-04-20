import type { NextConfig } from 'next'
import { withSentryConfig } from '@sentry/nextjs'

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

export default withSentryConfig(nextConfig, {
  // Din Sentry org och projekt — sätt dessa när du skapat kontot
  org: process.env.SENTRY_ORG ?? 'svalla',
  project: process.env.SENTRY_PROJECT ?? 'svalla-nextjs',

  // Tyst build-output om inte CI
  silent: true,

  // Ladda upp source maps för bättre stack traces
  widenClientFileUpload: true,
  hideSourceMaps: true,

  // Stäng av Vercel-specifika features
  automaticVercelMonitors: false,

  // Stäng av Sentry logger i production bundle
  disableLogger: true,
})
