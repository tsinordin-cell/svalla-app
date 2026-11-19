import type { Metadata } from 'next'
import Link from 'next/link'
import SidHuvud from '@/components/SidHuvud'
import { ALL_ISLANDS } from '@/app/o/island-data'
import { bildFor } from '@/lib/omraden'

/**
 * FÖRHANDSVISNING 2026-11-19: översikten bakom menypunkten Regioner.
 * Tidigare gick Regioner till /resmal, som bara handlar om Stockholm.
 * Antal öar och foton räknas ur island-data och obilder.generated.
 */
export const metadata: Metadata = {
  title: 'Regioner: Sveriges skärgårdar och kuster',
  description: 'Alla regioner på Svalla, från Höga Kusten till Bohuslän och Blekinge, med öar, guider, krogar, boende och gästhamnar per region.',
  robots: { index: false },
}

const GRUPPER: { rubrik: string; regioner: { namn: string; href: string; etiketter: string[]; bildSlug?: string }[] }[] = [
  { rubrik: 'Östersjön', regioner: [
    { namn: 'Stockholms skärgård', href: '/stockholms-skargard', etiketter: ['Innerskärgården', 'Norra skärgården', 'Norra ytterskärgården', 'Mellersta skärgården', 'Mellersta ytterskärgården', 'Södra skärgården', 'Södra ytterskärgården', 'Roslagen'] },
    { namn: 'Åland', href: '/aland', etiketter: [] },
    { namn: 'Gotland', href: '/gotland', etiketter: ['Gotland'] },
    { namn: 'Öland', href: '/oland', etiketter: ['Öland', 'Kalmarsund', 'Kalmar läns skärgård'] },
    { namn: 'Blekinge skärgård', href: '/blekinge-skargard', etiketter: ['Blekinge'], bildSlug: 'hano' },
  ] },
  { rubrik: 'Västkusten', regioner: [
    { namn: 'Halland', href: '/halland', etiketter: ['Hallands skärgård'] },
    { namn: 'Göteborgs skärgård', href: '/goteborg-skargard', etiketter: ['Göteborgs norra skärgård', 'Göteborgs skärgård', 'Göteborgs södra skärgård'] },
    { namn: 'Bohuslän', href: '/bohuslan', etiketter: ['Bohuslän'], bildSlug: 'kladesholmen' },
    { namn: 'Västerhavet', href: '/vasterhav', etiketter: [] },
  ] },
  { rubrik: 'Norrland och insjöar', regioner: [
    { namn: 'Höga Kusten', href: '/hoga-kusten', etiketter: ['Höga Kusten'] },
    { namn: 'Mälaren', href: '/malaren', etiketter: ['Mälaren'] },
  ] },
]

export default function RegionerPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <SidHuvud />
      <div style={{ background: 'var(--grad-sea-hero)', padding: '40px 20px 32px' }}>
        <div style={{ maxWidth: 1040, margin: '0 auto' }}>
          <nav aria-label="Brödsmulor" style={{ fontSize: 12.5, marginBottom: 14, color: 'rgba(255,255,255,0.75)', display: 'flex', gap: 6 }}>
            <Link href="/" style={{ color: 'rgba(255,255,255,0.85)', textDecoration: 'none' }}>Hem</Link><span aria-hidden>›</span><span style={{ color: '#fff', fontWeight: 600 }}>Regioner</span>
          </nav>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#fff', margin: '0 0 8px', fontFamily: "'Playfair Display', Georgia, serif" }}>Regioner</h1>
          <p style={{ color: 'rgba(255,255,255,0.78)', fontSize: 15, margin: 0, maxWidth: 640 }}>
            Välj en del av kusten. På varje regionsida finns öar, guider, krogar, boende och gästhamnar samlade.
          </p>
        </div>
      </div>
      <main style={{ maxWidth: 1040, margin: '0 auto', padding: '8px 20px 64px' }}>
        {GRUPPER.map(g => (
          <section key={g.rubrik} style={{ marginTop: 28 }}>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 24, margin: '0 0 12px', color: 'var(--txt)' }}>{g.rubrik}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 14 }}>
              {g.regioner.map(r => {
                const oar = ALL_ISLANDS.filter(i => i.regionLabel && r.etiketter.includes(i.regionLabel))
                const forsta = (r.bildSlug && oar.find(o => o.slug === r.bildSlug)) || oar.find(o => bildFor(o.slug, o.name))
                const bild = forsta ? bildFor(forsta.slug, forsta.name) : undefined
                return (
                  <Link key={r.href} href={r.href} style={{ display: 'flex', flexDirection: 'column', background: 'var(--white)', borderRadius: 14, overflow: 'hidden', textDecoration: 'none', boxShadow: '0 2px 12px rgba(0,0,0,0.07)', border: '1px solid rgba(10,123,140,0.06)' }}>
                    <div style={{ height: 140, background: bild ? `url(${bild.url}) center/cover` : 'var(--grad-sea)', display: 'flex', alignItems: 'flex-end', padding: 16 }}>
                      {!bild && <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 30, fontWeight: 700, color: 'rgba(255,255,255,0.92)' }}>{r.namn}</span>}
                    </div>
                    <div style={{ padding: '14px 16px 16px', display: 'flex', flexDirection: 'column', gap: 4 }}>
                      <b style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 18, color: 'var(--txt)' }}>{r.namn}</b>
                      <small style={{ fontSize: 13, color: 'var(--txt3)' }}>{oar.length > 0 ? `${oar.length} ${oar.length === 1 ? 'ösida' : 'ösidor'}` : 'Regionsida'}</small>
                      {bild && <span style={{ fontSize: 10, color: 'var(--txt3)' }}>Foto: {bild.fotograf}, {bild.licens}</span>}
                      <em style={{ fontStyle: 'normal', fontSize: 13, fontWeight: 700, color: 'var(--sea)', marginTop: 6 }}>Allt om {r.namn} →</em>
                    </div>
                  </Link>
                )
              })}
            </div>
          </section>
        ))}
      </main>
    </div>
  )
}
