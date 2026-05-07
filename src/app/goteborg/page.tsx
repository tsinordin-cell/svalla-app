import type { Metadata } from 'next'
import Link from 'next/link'
import { CATEGORIES, REGIONS, getPlacesForRegionCategory } from '@/components/RegionCategoryPage'

export const metadata: Metadata = {
  title: 'Göteborgs skärgård 2026 — krogar, hamnar, sjömackar — Svalla',
  description: 'Komplett guide till Göteborgs skärgård. Krogar, gästhamnar, sjömackar och bastu på Brännö, Donsö, Vrångö, Styrsö, Hönö och Öckerö.',
  alternates: { canonical: 'https://svalla.se/goteborg' },
}

export default async function GoteborgPage() {
  const region = REGIONS.goteborg
  const counts: Record<string, number> = {}
  for (const k of Object.keys(CATEGORIES)) {
    const places = await getPlacesForRegionCategory('goteborg', k)
    counts[k] = places.length
  }
  return (
    <main style={{ maxWidth: 960, margin: '0 auto', padding: '32px 16px 96px' }}>
      <header style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 'clamp(32px, 6vw, 56px)', fontWeight: 700, fontFamily: "'Playfair Display', Georgia, serif", margin: 0 }}>
          {region.label}
        </h1>
        <p style={{ fontSize: 19, lineHeight: 1.6, color: 'var(--txt-muted, #555)', marginTop: 12 }}>
          {region.description}
        </p>
      </header>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
        {Object.entries(CATEGORIES).map(([k, c]) => (
          <li key={k}>
            <Link href={`/goteborg/${k}`} style={{ display: 'block', padding: 24, background: 'var(--white, #fff)', border: '1px solid var(--border, rgba(0,0,0,0.08))', borderRadius: 12, color: 'inherit', textDecoration: 'none' }}>
              <div style={{ fontSize: 22, fontWeight: 700, fontFamily: "'Playfair Display', Georgia, serif" }}>{c.label}</div>
              <div style={{ fontSize: 14, color: 'var(--txt-muted, #777)', marginTop: 6 }}>{counts[k]} {counts[k] === 1 ? 'plats' : 'platser'}</div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
