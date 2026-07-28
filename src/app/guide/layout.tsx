import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Prata med Thorkel — skärgårdsplaneraren',
  description: 'Thorkel är Svallas AI-lots. Berätta vad du vill göra i skärgården — han ger dig en färdig plan med rutter, krogar och transport.',
  alternates: { canonical: 'https://svalla.se/guide' },
  openGraph: {
    title: 'Prata med Thorkel — Svalla',
    description: 'Thorkel är Svallas AI-lots. Berätta vad du vill göra i skärgården — han ger dig en färdig plan.',
    url: 'https://svalla.se/guide',
    type: 'website',
  },
}

export default function GuideLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
