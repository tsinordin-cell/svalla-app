import type { Metadata } from 'next'
import Link from 'next/link'
import SidHuvud from '@/components/SidHuvud'
import { ALL_ISLANDS } from '@/app/o/island-data'
import { bildFor } from '@/lib/omraden'
import { RadKort, Fotokrediter, ListRubrik, KORT_CSS } from '@/components/SvallaKort'

/**
 * FÖRHANDSVISNING 2026-11-19: översikten bakom menypunkten Regioner.
 * Toppen har samma utseende som /oar, korten är sajtens radkort (SvallaKort).
 * Ordningen följer menyn. Antal öar och foton räknas ur island-data och obilder.generated.
 */
export const metadata: Metadata = {
  title: 'Regioner: Sveriges skärgårdar och kuster',
  description: 'Alla regioner på Svalla, från Höga Kusten till Bohuslän och Blekinge, med öar, guider, krogar, boende och gästhamnar per region.',
  robots: { index: false },
}

type Region = { namn: string; href: string; etiketter: string[]; bildSlug?: string }
const REGIONER: Region[] = [
  { namn: 'Stockholms skärgård', href: '/stockholms-skargard', etiketter: ['Innerskärgården', 'Norra skärgården', 'Norra ytterskärgården', 'Mellersta skärgården', 'Mellersta ytterskärgården', 'Södra skärgården', 'Södra ytterskärgården', 'Roslagen'] },
  { namn: 'Bohuslän', href: '/bohuslan', etiketter: ['Bohuslän'], bildSlug: 'kladesholmen' },
  { namn: 'Gotland', href: '/gotland', etiketter: ['Gotland'] },
  { namn: 'Åland', href: '/aland', etiketter: [] },
  { namn: 'Öland', href: '/oland', etiketter: ['Öland', 'Kalmarsund', 'Kalmar läns skärgård'] },
  { namn: 'Blekinge skärgård', href: '/blekinge-skargard', etiketter: ['Blekinge'], bildSlug: 'hano' },
  { namn: 'Västerhavet', href: '/vasterhav', etiketter: [] },
  { namn: 'Höga Kusten', href: '/hoga-kusten', etiketter: ['Höga Kusten'] },
  { namn: 'Halland', href: '/halland', etiketter: ['Hallands skärgård'] },
  { namn: 'Göteborgs skärgård', href: '/goteborg-skargard', etiketter: ['Göteborgs norra skärgård', 'Göteborgs skärgård', 'Göteborgs södra skärgård'] },
  { namn: 'Mälaren', href: '/malaren', etiketter: ['Mälaren'] },
]

export default function RegionerPage() {
  const rader = REGIONER.map(r => {
    const oar = ALL_ISLANDS.filter(i => i.regionLabel && r.etiketter.includes(i.regionLabel))
    const forsta = (r.bildSlug && oar.find(o => o.slug === r.bildSlug)) || oar.find(o => bildFor(o.slug, o.name))
    return { ...r, antal: oar.length, bild: forsta ? bildFor(forsta.slug, forsta.name) : undefined }
  })
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <style>{KORT_CSS}</style>
      <SidHuvud />
      <div style={{ background: 'linear-gradient(170deg, #0d2440 0%, #1e5c82 50%, #2d7d8a 100%)', padding: '56px 24px 72px', color: '#fff' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto' }}>
          <nav aria-label="Brödsmulor" style={{ fontSize: 13, marginBottom: 16, color: 'rgba(255,255,255,0.75)', display: 'flex', gap: 6 }}>
            <Link href="/" style={{ color: 'rgba(255,255,255,0.85)', textDecoration: 'none' }}>Hem</Link><span aria-hidden>›</span><span style={{ color: '#fff', fontWeight: 600 }}>Regioner</span>
          </nav>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 700, margin: '0 0 12px', lineHeight: 1.05, fontFamily: "'Playfair Display', Georgia, serif", letterSpacing: '-0.5px' }}>
            Sveriges skärgårdar <em style={{ color: '#f4b06a', fontStyle: 'italic' }}>på en sida</em>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.82)', fontSize: 16, margin: 0, maxWidth: 620, lineHeight: 1.55 }}>
            Välj en region. Där finns öar, guider, gästhamnar, krogar och boende samlade.
          </p>
        </div>
      </div>
      <main style={{ maxWidth: 1080, margin: '0 auto', padding: '40px 16px 64px' }}>
        <ListRubrik titel="Regioner" antal={rader.length} enhet="regioner" />
        <div className="sk-grid">
          {rader.map(r => (
            <RadKort key={r.href} href={r.href} titel={r.namn} text={r.antal > 0 ? `${r.antal} ${r.antal === 1 ? 'ösida' : 'ösidor'} på Svalla` : 'Regionsida'} bild={r.bild} />
          ))}
        </div>
        <Fotokrediter poster={rader.map(r => ({ namn: r.namn, bild: r.bild }))} />
      </main>
    </div>
  )
}
