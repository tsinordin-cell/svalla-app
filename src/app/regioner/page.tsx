import type { Metadata } from 'next'
import Link from 'next/link'
import SidHuvud from '@/components/SidHuvud'
import { ALL_ISLANDS } from '@/app/o/island-data'
import { bildFor } from '@/lib/omraden'
import { RadKort, Fotokrediter, ListRubrik, KORT_CSS, type KortBild } from '@/components/SvallaKort'

/**
 * FÖRHANDSVISNING 2026-11-19: översikten bakom menypunkten Regioner.
 * Regionerna är grupperade efter de fyra kusterna, samma indelning som menyn.
 * Fem delar, samma som kartan på startsidan: fyra kuster och de stora sjöarna. Åland under Ostkusten.
 * Antal öar och foton räknas ur island-data och obilder.generated. Tre regioner saknar
 * öfoto i obilder och har ett eget fritt foto från Wikimedia Commons (fotograf och licens visas).
 */
export const metadata: Metadata = {
  title: 'Regioner: Sveriges skärgårdar och kuster',
  alternates: { canonical: 'https://svalla.se/regioner' },
  description: 'Alla regioner på Svalla, från Höga Kusten till Bohuslän och Blekinge, med öar, guider, krogar, boende och gästhamnar per region.',
}

type Region = { namn: string; href: string; etiketter: string[]; bildSlug?: string; bildEtiketter?: string[]; egenBild?: KortBild & { motiv: string } }
type Kust = { kust: string; regioner: Region[] }

const KUSTER: Kust[] = [
  { kust: 'Ostkusten', regioner: [
    { namn: 'Stockholms skärgård', href: '/stockholms-skargard', etiketter: ['Innerskärgården', 'Norra skärgården', 'Norra ytterskärgården', 'Mellersta skärgården', 'Mellersta ytterskärgården', 'Södra skärgården', 'Södra ytterskärgården', 'Roslagen'] },
    // Foto: https://commons.wikimedia.org/wiki/File:LemlandReefs.jpg (Clem23, CC BY-SA 3.0), skär vid Lemland på Åland.
    { namn: 'Åland', href: '/aland', etiketter: [], egenBild: { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/LemlandReefs.jpg/500px-LemlandReefs.jpg', fotograf: 'Clem23', licens: 'CC BY-SA 3.0', kalla: 'https://commons.wikimedia.org/wiki/File:LemlandReefs.jpg', motiv: 'skär vid Lemland' } },
    { namn: 'Gotland', href: '/gotland', etiketter: ['Gotland'] },
    { namn: 'Öland', href: '/oland', etiketter: ['Öland', 'Kalmarsund', 'Kalmar läns skärgård'] },
  ] },
  { kust: 'Västkusten', regioner: [
    { namn: 'Bohuslän', href: '/bohuslan', etiketter: ['Bohuslän'], bildSlug: 'kladesholmen' },
    { namn: 'Göteborgs skärgård', href: '/goteborg-skargard', etiketter: ['Göteborgs norra skärgård', 'Göteborgs skärgård', 'Göteborgs södra skärgård'] },
    // Foto: https://commons.wikimedia.org/wiki/File:Nidingen_-_KMB_-_16000700003133.jpg (Jan Norrman, Riksantikvarieämbetet, CC BY 2.5), Nidingen i Kungsbacka kommun.
    { namn: 'Halland', href: '/halland', etiketter: ['Hallands skärgård'], egenBild: { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Nidingen_-_KMB_-_16000700003133.jpg/500px-Nidingen_-_KMB_-_16000700003133.jpg', fotograf: 'Jan Norrman', licens: 'CC BY 2.5', kalla: 'https://commons.wikimedia.org/wiki/File:Nidingen_-_KMB_-_16000700003133.jpg', motiv: 'Nidingen' } },
    { namn: 'Västerhavet', href: '/vasterhav', etiketter: [], bildEtiketter: ['Göteborgs södra skärgård', 'Göteborgs norra skärgård', 'Göteborgs skärgård', 'Bohuslän'] },
  ] },
  { kust: 'Sydkusten', regioner: [
    { namn: 'Blekinge skärgård', href: '/blekinge-skargard', etiketter: ['Blekinge'], bildSlug: 'hano' },
  ] },
  { kust: 'Norrlandskusten', regioner: [
    { namn: 'Höga Kusten', href: '/hoga-kusten', etiketter: ['Höga Kusten'] },
  ] },
  { kust: 'Insjöarna', regioner: [
    { namn: 'Mälaren', href: '/malaren', etiketter: ['Mälaren'] },
  ] },
]

/** Ankare som kartan på startsidan länkar till, t.ex. /regioner#vastkusten. */
const ANKARE: Record<string, string> = { Ostkusten: 'ostkusten', Västkusten: 'vastkusten', Sydkusten: 'sydkusten', Norrlandskusten: 'norrlandskusten', Insjöarna: 'insjoarna' }

export default function RegionerPage() {
  const anvanda = new Set<string>()
  const grupper = KUSTER.map(k => ({
    kust: k.kust,
    rader: k.regioner.map(r => {
      const oar = ALL_ISLANDS.filter(i => i.regionLabel && r.etiketter.includes(i.regionLabel))
      let bild: KortBild | undefined
      let motiv = ''
      if (r.egenBild) { bild = r.egenBild; motiv = r.egenBild.motiv }
      else {
        const kandidater = r.bildEtiketter ? ALL_ISLANDS.filter(i => i.regionLabel && r.bildEtiketter!.includes(i.regionLabel)) : oar
        const forsta = (r.bildSlug && kandidater.find(o => o.slug === r.bildSlug))
          || kandidater.find(o => { const b = bildFor(o.slug, o.name); return b && !anvanda.has(b.url) })
        const b = forsta ? bildFor(forsta.slug, forsta.name) : undefined
        if (b && forsta) { bild = b; motiv = forsta.name }
      }
      if (bild) anvanda.add(bild.url)
      return { ...r, antal: oar.length, bild, motiv }
    }),
  }))
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <style>{KORT_CSS}</style>
      <SidHuvud />
      <div style={{ background: 'var(--grad-sea-hero)', padding: '56px 24px 64px', color: '#fff' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto' }}>
          <nav aria-label="Brödsmulor" style={{ fontSize: 13, marginBottom: 16, color: 'rgba(255,255,255,0.8)', display: 'flex', gap: 6 }}>
            <Link href="/" style={{ color: 'rgba(255,255,255,0.9)', textDecoration: 'none' }}>Hem</Link><span aria-hidden>›</span><span style={{ color: '#fff', fontWeight: 600 }}>Regioner</span>
          </nav>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 700, margin: '0 0 12px', lineHeight: 1.05, fontFamily: "'Playfair Display', Georgia, serif", letterSpacing: '-0.5px' }}>
            Sveriges skärgårdar <em style={{ color: '#f4b06a', fontStyle: 'italic' }}>på en sida</em>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.88)', fontSize: 16, margin: 0, maxWidth: 620, lineHeight: 1.55 }}>
            Fyra kuster och de stora sjöarna. Välj en region, så finns öar, guider, gästhamnar, krogar och boende samlade där.
          </p>
        </div>
      </div>
      <main style={{ maxWidth: 1080, margin: '0 auto', padding: '40px 16px 64px' }}>
        {grupper.map(g => (
          <section key={g.kust} id={ANKARE[g.kust]} style={{ marginBottom: 36, scrollMarginTop: 90 }}>
            <ListRubrik titel={g.kust} antal={g.rader.length} enhet={g.rader.length === 1 ? 'region' : 'regioner'} />
            <div className="sk-grid">
              {g.rader.map(r => (
                <RadKort key={r.href} href={r.href} titel={r.namn} text={r.antal > 0 ? `${r.antal} ${r.antal === 1 ? 'ösida' : 'ösidor'} på Svalla` : 'Regionsida'} bild={r.bild} />
              ))}
            </div>
            <Fotokrediter poster={g.rader.map(r => ({ namn: r.motiv && r.motiv !== r.namn ? `${r.namn} (${r.motiv})` : r.namn, bild: r.bild }))} />
          </section>
        ))}
      </main>
    </div>
  )
}
