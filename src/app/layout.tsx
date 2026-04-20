import type { Metadata, Viewport } from 'next'
import { Suspense } from 'react'
import './globals.css'
import Nav from '@/components/Nav'
import InstallPrompt from '@/components/InstallPrompt'
import PushPrompt from '@/components/PushPrompt'
import ServiceWorkerRegister from '@/components/ServiceWorkerRegister'
import ToastContainer from '@/components/Toast'
import ThemeProvider from '@/components/ThemeProvider'
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
    <html lang="sv" suppressHydrationWarning>
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
        </ThemeProvider>
      </body>
    </html>
  )
}
