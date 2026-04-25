import type { NextConfig } from 'next'

const isDev = process.env.NODE_ENV === 'development'

// I dev behövs unsafe-eval för Next.js HMR/fast refresh.
// I produktion tas det bort för att stärka XSS-skyddet.
const scriptSrc = isDev
  ? "script-src 'self' 'unsafe-inline' 'unsafe-eval'"
  : "script-src 'self' 'unsafe-inline'"

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
    // HSTS: tvinga HTTPS i 2 år, inkludera subdomäner
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      scriptSrc,
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https:",
      "font-src 'self'",
      // Stripe-domäner tillagda för checkout/portal.
      // wss://*.supabase.co KRÄVS separat — Safari/WebKit mappar INTE https:// → wss://
      // (Chrome gör det, därav att desktop fungerar men iOS kraschar med SecurityError).
      "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://api.anthropic.com https://o4508000000000000.ingest.sentry.io https://api.open-meteo.com https://api.stripe.com https://nominatim.openstreetmap.org",
      "frame-src 'self' https://js.stripe.com https://hooks.stripe.com",
      "frame-ancestors 'self'",
    ].join('; '),
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
  async redirects() {
    // ASCII-safe slugs — gamla ö-slugs gav 404 på Vercel edge pga URL-encoding.
    // 301 bevarar SEO-juice för inbound links till originalslugsen.
    return [
      {
        source: '/blogg/kajak-stockholms-skargard-nyb%C3%B6rjare',
        destination: '/blogg/kajak-stockholms-skargard-nyborjare',
        permanent: true,
      },
      {
        source: '/blogg/kajak-stockholms-skargard-nybörjare',
        destination: '/blogg/kajak-stockholms-skargard-nyborjare',
        permanent: true,
      },
      {
        source: '/blogg/segling-nyb%C3%B6rjare-guide',
        destination: '/blogg/segling-nyborjare-guide',
        permanent: true,
      },
      {
        source: '/blogg/segling-nybörjare-guide',
        destination: '/blogg/segling-nyborjare-guide',
        permanent: true,
      },
    ]
  },
}

// withSentryConfig kräver SENTRY_AUTH_TOKEN för source map-upload.
// Lägg till den i Vercel env vars när Sentry-kontot är skapat.
// Sentry runtime (error capturing) fungerar ändå via sentry.client.config.ts.
export default nextConfig
