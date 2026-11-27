import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import VinterIFlodet from '@/components/VinterIFlodet'
import VinterFore from './VinterFore'

/**
 * Förhandsvisning av vinterrutorna i Flödet (2026-11-27), före och efter.
 * Flödet kräver inloggning, så rutorna visas här för att kunna granskas och
 * fotograferas. Finns bara i förhandsversioner, aldrig på svalla.se.
 * ?v=fore visar dagens rutor, ?v=efter (standard) de mindre.
 */
export const metadata: Metadata = {
  title: 'Förhandsvisning: vinterrutor',
  robots: { index: false, follow: false },
}

export default async function Page({ searchParams }: { searchParams: Promise<{ v?: string }> }) {
  if (process.env.VERCEL_ENV === 'production') notFound()
  const { v } = await searchParams
  const fore = v === 'fore'
  return (
    <main className="feed-layout-wrap" style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      {/* Före-kopian har mobilbredden 78 % som i dag; efter använder globals.css (72 %). */}
      <style>{'@media (max-width: 767px) { .dfs-fore .vinter-kort { flex: 0 0 78%; } }'}</style>
      <p style={{ fontSize: 12, color: 'var(--txt3)', margin: '0 0 12px' }}>
        Förhandsvisning: {fore ? 'före (som i dag)' : 'efter (mindre rutor)'}
      </p>
      <div className={fore ? 'dfs-fore' : undefined}>
        {fore ? <VinterFore /> : <VinterIFlodet manad={12} />}
      </div>
    </main>
  )
}
