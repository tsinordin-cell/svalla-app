import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: { absolute: 'Kom igång med Svalla — skapa konto' },
  description: 'Skapa ett gratis konto på Svalla och börja logga dina båtturer, hitta restauranger längs kusten och följ andra skärgårdsälskare.',
  alternates: { canonical: 'https://svalla.se/kom-igang' },
  openGraph: {
    title: 'Skapa konto på Svalla',
    description: 'Logga båtturer, hitta krogar i skärgården och följ andra seglare. Gratis att komma igång.',
    url: 'https://svalla.se/kom-igang',
    type: 'website',
  },
}

export default function KomIgangLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
