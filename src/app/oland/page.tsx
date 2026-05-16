import type { Metadata } from 'next'
import Link from 'next/link'
import { CATEGORIES, REGIONS, getPlacesForRegionCategory } from '@/components/RegionCategoryPage'

export const metadata: Metadata = {
  title: 'Öland 2026 — krogar, hotell och kaféer — Svalla',
  description: 'Komplett guide till Öland — Borgholm, Mörbylånga, Färjestaden och Byxelkrok. Hotell, restauranger, krogar och kaféer.',
  alternates: { canonical: 'https://svalla.se/oland' },
}

export default async function OlandPage() {
  const region = REGIONS.oland
  const counts: Record<string, number> = {}
  for (const k of Object.keys(CATEGORIES)) counts[k] = (await getPlacesForRegionCategory('oland', k)).length
  return (
    <main style={{ maxWidth: 960, margin: '0 auto', padding: '32px 16px 96px' }}>
      {/* Äventyrsbanner */}
      <a href="/oland/aventyr" style={{ textDecoration: 'none', display: 'block', marginBottom: 28 }}>
        <div style={{
          background: 'linear-gradient(135deg, #1a3a5c 0%, #0d6e6e 100%)',
          borderRadius: 20,
          padding: '22px 24px',
          display: 'flex',
          alignItems: 'center',
          gap: 18,
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 6px 28px rgba(13,110,110,0.25)',
          border: '1px solid rgba(255,255,255,0.08)',
        }}>
          <div style={{ position: 'absolute', top: -40, right: -40, width: 180, height: 180, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', pointerEvents: 'none' }} />
          <div style={{
            width: 48, height: 48, flexShrink: 0, borderRadius: 14,
            background: 'rgba(255,255,255,0.14)', border: '1px solid rgba(255,255,255,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" /><polygon points="16.24,7.76 14.12,14.12 7.76,16.24 9.88,9.88 16.24,7.76" />
            </svg>
          </div>
          <div style={{ flex: 1, position: 'relative', zIndex: 1 }}>
            <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginBottom: 4 }}>Utforska mer</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 3, fontFamily: "'Playfair Display', Georgia, serif" }}>Äventyr på Öland</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.72)' }}>10 utvalda rundor – bil, cykel och buss</div>
          </div>
          <div style={{ width: 34, height: 34, flexShrink: 0, borderRadius: 10, background: 'rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </div>
        </div>
      </a>

      <header style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 'clamp(32px, 6vw, 56px)', fontWeight: 700, fontFamily: "'Playfair Display', Georgia, serif", margin: 0 }}>{region.label}</h1>
        <p style={{ fontSize: 19, lineHeight: 1.6, color: 'var(--txt-muted, #555)', marginTop: 12 }}>{region.description}</p>
      </header>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
        {Object.entries(CATEGORIES).map(([k, c]) => (
          <li key={k}>
            <Link href={`/oland/${k}`} style={{ display: 'block', padding: 24, background: 'var(--white, #fff)', border: '1px solid var(--border, rgba(0,0,0,0.08))', borderRadius: 12, color: 'inherit', textDecoration: 'none' }}>
              <div style={{ fontSize: 22, fontWeight: 700, fontFamily: "'Playfair Display', Georgia, serif" }}>{c.label}</div>
              <div style={{ fontSize: 14, color: 'var(--txt-muted, #777)', marginTop: 6 }}>{counts[k]} {counts[k] === 1 ? 'plats' : 'platser'}</div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
