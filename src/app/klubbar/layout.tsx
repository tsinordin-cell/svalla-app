import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { ogSida } from '@/lib/og-standard'

export const metadata: Metadata = {
  title: 'Segelsällskap och båtklubbar',
  description: 'Hitta segelsällskap och båtklubbar i din skärgård. Gå med i en flotta, organisera utflykter och träffa andra båtentusiaster.',
  alternates: { canonical: 'https://svalla.se/klubbar' },
  openGraph: {
    images: ogSida('https://svalla.se/klubbar'),
    title: 'Segelsällskap och båtklubbar | Svalla',
    description: 'Hitta segelsällskap och båtklubbar i din skärgård.',
    url: 'https://svalla.se/klubbar',
    type: 'website',
  },
}

export default function KlubbarLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
