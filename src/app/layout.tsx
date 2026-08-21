import type { Metadata, Viewport } from 'next'
import { Playfair_Display } from 'next/font/google'
import { Suspense } from 'react'
import './globals.css'

// Display-typsnitt för rubriker. Hostas lokalt av Vercel via next/font —
// ingen extern Google Fonts-fetch (CSP-säkert) och inget FOUT.
const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-display',
})
import Nav from '@/components/Nav'
import InstallPrompt from '@/components/InstallPrompt'
import PushPrompt from '@/components/PushPrompt'
import ServiceWorkerRegister from '@/components/ServiceWorkerRegister'
import ToastContainer from '@/components/Toast'
import ThemeProvider from '@/components/ThemeProvider'
import OfflineToast from '@/components/OfflineToast'
import PostHogProvider from '@/components/PostHogProvider'
import PostHogPageView from '@/components/PostHogPageView'
import CookieConsent from '@/components/CookieConsent'
import FeedbackWidget from '@/components/FeedbackWidget'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
// Note: Leaflet CSS is imported dynamically in client components that need it, not here

export const metadata: Metadata = {
  title: {
    default: 'Svalla – Sveriges samlade skärgårdssida',
    template: '%s – Svalla',
  },
  description: 'Logga dina båtturer, hitta restauranger längs kusten och följ andra seglare i den svenska skärgården.',
  keywords: ['skärgård', 'båtliv', 'segla', 'logga tur', 'skärgårdsrestaurang', 'Sverige', 'Stockholm'],
  authors: [{ name: 'Svalla' }],
  creator: 'Svalla',
  metadataBase: new URL('https://svalla.se'),
  openGraph: {
    type: 'website',
    locale: 'sv_SE',
    url: 'https://svalla.se',
    siteName: 'Svalla',
    title: 'Svalla – Sveriges samlade skärgårdssida',
    description: 'Allt om svenska öar — öprofiler, restauranger, aktiviteter och ruttplanering för skärgårdsresan.',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Svalla – Sveriges samlade skärgårdssida',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Svalla – Sveriges samlade skärgårdssida',
    description: 'Allt om svenska öar — öprofiler, restauranger, aktiviteter och ruttplanering för skärgårdsresan.',
    images: ['/opengraph-image'],
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Svalla',
  },
  icons: {
    icon: [
      { url: '/favicon.svg',  type: 'image/svg+xml' },   // primär — skalas perfekt i alla storlekar
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon.svg',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  verification: {
    google: 'EtRPKzzEk_uNIH6VTi31ltZ0JjzGbmQ8KPm47pWdvL8',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#1e5c82',
  viewportFit: 'cover',  // Täcker notch på iPhone
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sv" suppressHydrationWarning className={playfair.variable}>
      <head>
        {/* Sätt data-theme FÖRE första målningen. ThemeProvider gör samma sak
            i en useEffect, men den kör först efter hydrering — på tunga sidor
            (t.ex. /team) hann sidan visas LJUS i flera sekunder innan mörkt
            läge slog till. Rapporterat av Tom 2026-08-11 med skärmdump.
            Logiken MÅSTE spegla resolvedTheme() i ThemeProvider.tsx: läs
            'svalla-theme' ur localStorage; 'auto' = mörkt 20:00–05:59.
            Blockerande med flit — ett async-script hade inte hindrat blixten. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{var t=localStorage.getItem('svalla-theme')||'auto';var h=new Date().getHours();var d=t==='dark'||(t==='auto'&&(h>=20||h<6));document.documentElement.setAttribute('data-theme',d?'dark':'light')}catch(e){}",
          }}
        />
        {/* Preconnect to Supabase — reduces connection latency for API + image CDN */}
        <link rel="preconnect" href="https://oiklttwylndesewauytj.supabase.co" />
        <link rel="dns-prefetch" href="https://oiklttwylndesewauytj.supabase.co" />
        {/* Preconnect to OSM tile servers for Leaflet maps */}
        <link rel="dns-prefetch" href="https://tile.openstreetmap.org" />
        <link rel="dns-prefetch" href="https://tiles.openseamap.org" />
        {/* Preconnect to PostHog EU — minimizes analytics latency */}
        <link rel="preconnect" href="https://eu.i.posthog.com" />
        {/* Schema.org Organization — binder svalla.se till varumärket "Svalla"
            i Googles Knowledge Graph. sameAs fylls på när sociala konton
            är skapade (Instagram, LinkedIn, Facebook). */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              '@id': 'https://svalla.se/#organization',
              name: 'Svalla',
              alternateName: 'Svalla.se',
              url: 'https://svalla.se',
              logo: 'https://svalla.se/icon-512.png',
              description: 'Svenska skärgårdens digitala hem. Logga båtturer, hitta restauranger längs kusten och följ andra seglare — Strava för båtfolk.',
              foundingDate: '2025',
              areaServed: { '@type': 'Country', name: 'Sweden' },
              inLanguage: 'sv-SE',
              sameAs: [
                'https://www.instagram.com/svalla.app/',
                // Fyll på när fler konton skapas:
                // 'https://www.linkedin.com/company/svalla/',
                // 'https://www.facebook.com/svalla.se/',
                // 'https://www.tiktok.com/@svalla.app',
              ],
            }),
          }}
        />
        {/* WebSite-schema med SearchAction → Sitelinks Search Box i Google */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              '@id': 'https://svalla.se/#website',
              url: 'https://svalla.se',
              name: 'Svalla',
              description: 'Sveriges samlade skärgårdssida',
              publisher: { '@id': 'https://svalla.se/#organization' },
              potentialAction: {
                '@type': 'SearchAction',
                target: {
                  '@type': 'EntryPoint',
                  urlTemplate: 'https://svalla.se/sok?q={search_term_string}',
                },
                'query-input': 'required name=search_term_string',
              },
              inLanguage: 'sv-SE',
            }),
          }}
        />
      </head>
      <body>
        <PostHogProvider>
          <ThemeProvider>
            <PostHogPageView />
            <main style={{ minHeight: '100dvh' }}>
              {children}
            </main>
            <Suspense fallback={null}><Nav /></Suspense>
            <Suspense fallback={null}><InstallPrompt /></Suspense>
            <Suspense fallback={null}><PushPrompt /></Suspense>
            <ServiceWorkerRegister />
            <ToastContainer />
            <OfflineToast />
            <CookieConsent />
            <FeedbackWidget />
            <Analytics />
            <SpeedInsights />
          </ThemeProvider>
        </PostHogProvider>
      </body>
    </html>
  )
}
