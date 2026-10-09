import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { notFound } from 'next/navigation'
import { isProEnabled } from '@/lib/pro'

export const metadata: Metadata = {
  title: { absolute: 'Svalla Pro — obegränsat loggande och avancerade funktioner' },
  description: 'Uppgradera till Svalla Pro och få tillgång till avancerad statistik, obegränsad turdagbok och exklusiva skärgårdskartor.',
  alternates: { canonical: 'https://svalla.se/pro' },
  // Pro ligger i bakgrunden tills det slås på (Max 2026-10-01): inte i sök.
  robots: isProEnabled() ? undefined : { index: false, follow: true },
  openGraph: {
    title: 'Svalla Pro',
    description: 'Avancerad statistik, obegränsad turdagbok och exklusiva skärgårdskartor.',
    url: 'https://svalla.se/pro',
    type: 'website',
  },
}

export default function ProLayout({ children }: { children: ReactNode }) {
  // Inga priser på sajten (Max 2026-10-09). Så länge Pro är av finns /pro inte.
  if (!isProEnabled()) notFound()
  return <>{children}</>
}
