import type { NextConfig } from 'next'

const isDev = process.env.NODE_ENV === 'development'

// I dev behövs unsafe-eval för Next.js HMR/fast refresh.
// I produktion tas det bort för att stärka XSS-skyddet.
const scriptSrc = isDev
  ? "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://us-assets.i.posthog.com"
  : "script-src 'self' 'unsafe-inline' https://us-assets.i.posthog.com"

const securityHeaders = [
  {
    // Tillåter Google att visa stora bilder i Discover och Image Search
    // Kritiskt för en naturbaserad sajt med rika Google Photos
    key: 'X-Robots-Tag',
    value: 'max-image-preview:large',
  },
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
      "img-src 'self' data: blob: https://*.supabase.co https://images.unsplash.com https://upload.wikimedia.org https://commons.wikimedia.org https://tile.openstreetmap.org https://*.tile.openstreetmap.org https://*.basemaps.cartocdn.com https://tiles.openseamap.org",
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
      "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://api.anthropic.com https://o4508000000000000.ingest.sentry.io https://api.open-meteo.com https://api.stripe.com https://nominatim.openstreetmap.org https://us.i.posthog.com https://us-assets.i.posthog.com",
      "frame-src 'self' https://js.stripe.com https://hooks.stripe.com",
      "frame-ancestors 'self'",
      "upgrade-insecure-requests",
    ].join('; '),
  },
]

const nextConfig: NextConfig = {
  // ESLint körs separat (npm run lint) — blockera inte CI-builds på warnings.
  // TypeScript-kontroll körs fortfarande (tsc --noEmit passerar rent).
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Krävs av PostHog reverse proxy — annars omdirigerar Next /ingest/ → /ingest
  // och tappar query-strängar.
  skipTrailingSlashRedirect: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    /**
     * 31 dagar. Utan denna gäller källans Cache-Control — och våra 576
     * platsbilder i Supabase storage serveras med `no-cache` (fel metadata
     * vid uppladdningen, går inte att rätta via SQL — verifierat 2026-08-10).
     * Effekten var att Vercel slängde varje optimerad variant efter en timme
     * och omhämtade 368 kB-original från Supabase, om och om igen: 8,25 GB
     * cached egress/mån och kvotvarning med strypning 8 sep 2026.
     *
     * Optimerad variant: 15 kB för samma bild — 24× mindre. Bilderna är
     * statiska kopior av Google Places-foton och ändras aldrig, så 31 dagar
     * är konservativt. Byts en bild får den ny URL och ny cachepost.
     */
    minimumCacheTTL: 2678400,
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
  experimental: {
    optimizePackageImports: ['@turf/turf'],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
      {
        // OG-bildrutterna hamnade i Googles index ("Indexed, though blocked
        // by robots.txt"). De är bilder för delning, inte sidor någon ska
        // hitta via sök. robots.txt räcker inte — den stoppar crawl, inte
        // indexering — så de svarar med noindex och är samtidigt crawlbara
        // (Allow: /api/og/ i robots.ts) så headern faktiskt läses.
        source: '/api/og/:path*',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex' }],
      },
    ]
  },
  // Reverse proxy för PostHog — kringgår AdBlock (30-40% av trafiken
  // blockerar `posthog.com`-domänen). Browsers ser bara svalla.se/ingest,
  // Next.js förmedlar till PostHog server-side. Identiska events, mer data.
  // Se: https://posthog.com/docs/advanced/proxy/nextjs
  async rewrites() {
    return [
      // Statiska JS-tillgångar (posthog-js bundle, recordings, etc.)
      { source: '/ingest/static/:path*', destination: 'https://us-assets.i.posthog.com/static/:path*' },
      // Feature flag-decisioner — egen rewrite för att de skickas separat
      { source: '/ingest/decide',         destination: 'https://us.i.posthog.com/decide' },
      // Allt annat (events, identifies, recordings) → main PostHog ingest
      { source: '/ingest/:path*',         destination: 'https://us.i.posthog.com/:path*' },
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
      // /o (index, utan slug) → /oar är canonical. /o/[slug]-detaljsidor påverkas EJ
      // eftersom Next-redirects matchar exakt utan path-fortsättning.
      {
        source: '/o',
        destination: '/oar',
        permanent: true,
      },
      // /evenemang → /event (svenska alias för evenemangssidan)
      {
        source: '/evenemang',
        destination: '/event',
        permanent: true,
      },
      {
        source: '/evenemang/:path*',
        destination: '/event/:path*',
        permanent: true,
      },
      { source: '/blogg/midsommar-skargarden-2026', destination: '/guider/midsommar-skargarden-2026', permanent: true },
      { source: '/blogg/packlista-skargarden', destination: '/guider/packlista-skargarden', permanent: true },
      { source: '/blogg/allemansratten-pa-sjon', destination: '/guider/allemansratten-pa-sjon', permanent: true },
      { source: '/blogg/waxholmsbolaget-guide', destination: '/guider/waxholmsbolaget-guide', permanent: true },
      { source: '/blogg/skargard-utan-bat', destination: '/guider/skargard-utan-bat', permanent: true },

      // ── 404:or funna i GSC 2026-07-28 ────────────────────────────────────
      // Sidor som aldrig funnits på de adresser Google känner till, men vars
      // innehåll finns någon annanstans. 301 i stället för 404 så att
      // inbound links och gammal indexering landar rätt.

      // Kontaktuppgifterna ligger under /om. Sidfoten länkade till /kontakt
      // på varje sida i sajten och gav 404 för riktiga besökare.
      { source: '/kontakt', destination: '/om#kontakt', permanent: true },

      // Cookie-bannern och /kom-igang länkade till /integritet. Sidan heter
      // /integritetspolicy — dvs en 404 mitt i samtyckesflödet.
      { source: '/integritet', destination: '/integritetspolicy', permanent: true },

      // Möja: ö-sidor ligger under /o/<slug>.
      { source: '/moja', destination: '/o/moja', permanent: true },

      // Regionen heter /hoga-kusten med bindestreck.
      { source: '/hogakusten', destination: '/hoga-kusten', permanent: true },
      { source: '/hogakusten/:path*', destination: '/hoga-kusten/:path*', permanent: true },

      // Forumkategorin döptes om nybörjare → nyborjare (f54ae24) av samma
      // ASCII-skäl som krogö → krogar. Trådlänkar med ö finns kvar utifrån.
      { source: '/forum/nybörjare/:path*', destination: '/forum/nyborjare/:path*', permanent: true },
      { source: '/forum/nyb%C3%B6rjare/:path*', destination: '/forum/nyborjare/:path*', permanent: true },
      { source: '/forum/nybörjare', destination: '/forum/nyborjare', permanent: true },
    ]
  },
}

// withSentryConfig kräver SENTRY_AUTH_TOKEN för source map-upload.
// Lägg till den i Vercel env vars när Sentry-kontot är skapat.
// Sentry runtime (error capturing) fungerar ändå via sentry.client.config.ts.
export default nextConfig
