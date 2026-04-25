import type { Metadata, Viewport } from 'next'
import { Suspense } from 'react'
import './globals.css'
import Nav from '@/components/Nav'
import InstallPrompt from '@/components/InstallPrompt'
import PushPrompt from '@/components/PushPrompt'
import ServiceWorkerRegister from '@/components/ServiceWorkerRegister'
import ToastContainer from '@/components/Toast'
import ThemeProvider from '@/components/ThemeProvider'
import OfflineToast from '@/components/OfflineToast'
// Note: Leaflet CSS is imported dynamically in client components that need it, not here

export const metadata: Metadata = {
  title: {
    default: 'Svalla – Skärgårdslivet, loggat',
    template: '%s – Svalla',
  },
  description: 'Logga dina båtturer, hitta restauranger längs kusten och följ andra seglare i den svenska skärgården.',
  keywords: [
    'skärgård', 'båtliv', 'segla', 'logga tur', 'skärgårdsrestaurang',
    'Sverige', 'Stockholm', 'Stockholms skärgård', 'svenska öar', 'segling',
    'båttur', 'naturhamn', 'gästhamn', 'skärgårdsguide', 'kajakpaddling',
    'Gotland', 'Åland', 'Bohuslän', 'kustliv', 'seglarsällskap',
  ],
  authors: [{ name: 'Svalla' }],
  creator: 'Svalla',
  metadataBase: new URL('https://svalla.se'),
  alternates: { canonical: 'https://svalla.se' },
  openGraph: {
    type: 'website',
    locale: 'sv_SE',
    url: 'https://svalla.se',
    siteName: 'Svalla',
    title: 'Svalla – Skärgårdslivet, loggat',
    description: 'Logga dina båtturer, hitta restauranger längs kusten och följ andra seglare i den svenska skärgården.',
    images: [
      {
        url: '/og-image.jpg',
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
    images: ['/og-image.jpg'],
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Svalla',
  },
  icons: {
    icon: [
      { url: '/favicon.ico',  type: 'image/x-icon', sizes: 'any' },
      { url: '/favicon.svg',  type: 'image/svg+xml' },
      { url: '/icon-32.png',  sizes: '32x32',  type: 'image/png' },
      { url: '/icon-96.png',  sizes: '96x96',  type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
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

const softwareAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Svalla',
  applicationCategory: 'TravelApplication',
  operatingSystem: 'iOS, Android, Web',
  url: 'https://svalla.se',
  description: 'Logga dina båtturer, hitta restauranger längs kusten och följ andra seglare i den svenska skärgården.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'SEK',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '127',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Vad är Svalla?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Svalla är en app för skärgårdslivet — logga båtturer med GPS, hitta restauranger och bryggor längs kusten, och följ andra seglare i den svenska skärgården.',
      },
    },
    {
      '@type': 'Question',
      name: 'Kostar Svalla pengar?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Grundfunktionerna i Svalla är helt gratis. Du kan logga turer, hitta platser och följa andra seglare utan kostnad. Premium-funktioner finns för den som vill ha mer.',
      },
    },
    {
      '@type': 'Question',
      name: 'Fungerar Svalla utan internetuppkoppling?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ja, Svalla fungerar offline. Du kan logga turer och se sparade platser utan mobilnät — perfekt när du är ute i skärgården utan täckning.',
      },
    },
    {
      '@type': 'Question',
      name: 'Vilka skärgårdar täcker Svalla?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Svalla täcker hela Sveriges kust — Stockholms skärgård, Bohuslän, Gotland, Åland och Blekinges skärgård. Fler regioner läggs till löpande.',
      },
    },
    {
      '@type': 'Question',
      name: 'Hur installerar jag Svalla på min telefon?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Svalla är en progressiv webbapp (PWA). På iPhone: öppna svalla.se i Safari → tryck Dela → Lägg till på hemskärmen. På Android: öppna i Chrome → tryck ⋮ → Installera app. Inga nedladdningar krävs.',
      },
    },
  ],
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Svalla',
  url: 'https://svalla.se',
  logo: {
    '@type': 'ImageObject',
    url: 'https://svalla.se/icon-512.png',
    width: 512,
    height: 512,
  },
  sameAs: [],
  description: 'Logga dina båtturer, hitta restauranger längs kusten och följ andra seglare i den svenska skärgården.',
}

const webSiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Svalla',
  url: 'https://svalla.se',
  potentialAction: {
    '@type': 'SearchAction',
    target: { '@type': 'EntryPoint', urlTemplate: 'https://svalla.se/sok?q={search_term_string}' },
    'query-input': 'required name=search_term_string',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sv" suppressHydrationWarning>
      <head>
        {/* Preconnect to Supabase — reduces connection latency for API + image CDN */}
        <link rel="preconnect" href="https://oiklttwylndesewauytj.supabase.co" />
        <link rel="dns-prefetch" href="https://oiklttwylndesewauytj.supabase.co" />
        {/* Preconnect to OSM tile servers for Leaflet maps */}
        <link rel="dns-prefetch" href="https://tile.openstreetmap.org" />
        <link rel="dns-prefetch" href="https://tiles.openseamap.org" />
        {/* Organization + WebSite schema — Google använder detta för logga i sökresultat */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }} />
        {/* SoftwareApplication — visar betyg och "Gratis" direkt i Google-sökresultat */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }} />
        {/* FAQPage — ger rich results med expanderbara svar i Google */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      </head>
      <body>
        <ThemeProvider>
          <main style={{ minHeight: '100dvh' }}>
            {children}
          </main>
          <Suspense fallback={null}><Nav /></Suspense>
          <Suspense fallback={null}><InstallPrompt /></Suspense>
          <Suspense fallback={null}><PushPrompt /></Suspense>
          <ServiceWorkerRegister />
          <ToastContainer />
          <OfflineToast />
        </ThemeProvider>
      </body>
    </html>
  )
}
