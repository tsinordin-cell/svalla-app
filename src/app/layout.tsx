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
// Note: Leaflet CSS is imported dynamically in client components that need it, not here

export const metadata: Metadata = {
  title: {
    default: 'Svalla – Skärgårdslivet, loggat',
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
    title: 'Svalla – Skärgårdslivet, loggat',
    description: 'Logga dina båtturer, hitta restauranger längs kusten och följ andra seglare i den svenska skärgården.',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Svalla – Skärgårdslivet, loggat',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Svalla – Skärgårdslivet, loggat',
    description: 'Logga dina båtturer, hitta restauranger längs kusten och följ andra seglare.',
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
        {/* Preconnect to Supabase — reduces connection latency for API + image CDN */}
        <link rel="preconnect" href="https://oiklttwylndesewauytj.supabase.co" />
        <link rel="dns-prefetch" href="https://oiklttwylndesewauytj.supabase.co" />
        {/* Preconnect to OSM tile servers for Leaflet maps */}
        <link rel="dns-prefetch" href="https://tile.openstreetmap.org" />
        <link rel="dns-prefetch" href="https://tiles.openseamap.org" />
        {/* Preconnect to PostHog EU — minimizes analytics latency */}
        <link rel="preconnect" href="https://eu.i.posthog.com" />
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
          </ThemeProvider>
        </PostHogProvider>
      </body>
    </html>
  )
}
