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
    // Geo behövs för spara-tur (eget GPS-tracking). Övrigt blockerat.
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(self), payment=(self), usb=(), magnetometer=(), gyroscope=(), accelerometer=(), interest-cohort=()',
  },
  {
    // HSTS: tvinga HTTPS i 2 år, inkludera subdomäner
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    // Cross-origin policies: lägre attack-yta för Spectre-liknande sidokanaler
    // och för spam-iframes. SAMEORIGIN på X-Frame-Options redan ovan, men
    // CORP/COOP är strängare i moderna browsers.
    key: 'Cross-Origin-Opener-Policy',
    value: 'same-origin-allow-popups', // tillåt Stripe redirect-popup
  },
  {
    key: 'Cross-Origin-Resource-Policy',
    value: 'same-origin',
  },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      scriptSrc,
      // unsafe-inline på style krävs av Tailwind/Next runtime — kan ej tas bort utan stor refactor.
      "style-src 'self' 'unsafe-inline'",
      // img-src: tillåt egna bilder, data:URI (avatars, ikoner), Supabase Storage (publika buckets) och Unsplash.
      // Tidigare 'https:' tillät vilken HTTPS-bild som helst — exfiltrationskanal för session-cookies via <img onerror>.
      "img-src 'self' data: blob: https://*.supabase.co https://images.unsplash.com",
      "font-src 'self' data:",
      "media-src 'self' blob: https://*.supabase.co",
      "worker-src 'self' blob:", // service worker + Capacitor
      "manifest-src 'self'",
      "object-src 'none'", // blockera <object>/<embed>/<applet>
      "base-uri 'self'",   // hindra base-tag-injektion som omdirigerar relativa URL:er
      "form-action 'self' https://checkout.stripe.com https://billing.stripe.com",
      // Stripe-domäner tillagda för checkout/portal.
      // wss://*.supabase.co KRÄVS separat — Safari/WebKit mappar INTE https:// → wss://
      // (Chrome gör det, därav att desktop fungerar men iOS kraschar med SecurityError).
      "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://api.anthropic.com https://o4508000000000000.ingest.sentry.io https://api.open-meteo.com https://api.stripe.com https://nominatim.openstreetmap.org",
      "frame-src 'self' https://js.stripe.com https://hooks.stripe.com",
      "frame-ancestors 'self'",
      "upgrade-insecure-requests",
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
