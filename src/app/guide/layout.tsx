import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { OG_STANDARD } from '@/lib/og-standard'

export const metadata: Metadata = {
  title: 'Prata med Thorkel: skärgårdsplaneraren',
  description: 'Thorkel är Svallas AI-lots. Berätta vad du vill göra i skärgården. Han ger dig en färdig plan med rutter, krogar och transport.',
  alternates: { canonical: 'https://svalla.se/guide' },
  openGraph: {
    images: OG_STANDARD,
    title: 'Prata med Thorkel | Svalla',
    description: 'Thorkel är Svallas AI-lots. Berätta vad du vill göra i skärgården. Han ger dig en färdig plan.',
    url: 'https://svalla.se/guide',
    type: 'website',
  },
}

export default function GuideLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
