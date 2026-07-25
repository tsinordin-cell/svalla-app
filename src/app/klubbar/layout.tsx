import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: { absolute: 'Segelsällskap och båtklubbar — Svalla' },
  description: 'Hitta segelsällskap och båtklubbar i din skärgård. Gå med i en flotta, organisera utflykter och träffa andra båtentusiaster.',
  alternates: { canonical: 'https://svalla.se/klubbar' },
  openGraph: {
    title: 'Segelsällskap och båtklubbar — Svalla',
    description: 'Hitta segelsällskap och båtklubbar i din skärgård.',
    url: 'https://svalla.se/klubbar',
    type: 'website',
  },
}

export default function KlubbarLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
