import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ALL_ISLANDS, getIsland } from '../../island-data'
import { getHantverkareForIsland, synligaYrken, YRKE_ETIKETT, type Yrke } from '../../hantverkare-data'
import IslandSubPageHeader from '@/components/IslandSubPageHeader'
import Vidareklick from '@/components/Vidareklick'
import HantverkarKort, { nasUtanBat } from '@/components/HantverkarKort'
import Icon, { type IconName } from '@/components/Icon'
import { ogO } from '@/lib/og-standard'

type Props = { params: Promise<{ slug: string }> }

// Samma soft-404-skydd som övriga ö-undersidor: slug-mängden är känd vid
// bygget, så okänd slug ska 404:a i routern före det streamade skalet.
// Se motsvarande kommentar i o/[slug]/hamnar/page.tsx.
export const dynamicParams = false

export async function generateStaticParams() {
  return ALL_ISLANDS.map(island => ({ slug: island.slug }))
}

/**
 * Behovsgrupper — sidans navigation.
 *
 * Grupperat efter vad besökaren vill ha gjort, inte efter bransch. En husägare
 * tänker "bryggan har ruttnat", inte "mark- och grundarbeten". Ett företag kan
 * ligga i flera grupper: en byggfirma med egen båt hamnar både under huset och
 * under frakten, vilket är sant och som branschindelningen dolde.
 */
const BEHOV: { key: string; fraga: string; rubrik: string; ikon: IconName; yrken: Yrke[] }[] = [
  { key: 'hus', fraga: 'Behöver du hjälp med huset?', rubrik: 'Huset', ikon: 'home',
    yrken: ['snickare', 'elektriker', 'rormokare', 'malare', 'murare', 'taklaggare', 'totalentreprenad', 'betong'] },
  { key: 'brygga', fraga: 'Behöver du hjälp med bryggan?', rubrik: 'Bryggan och sjösidan', ikon: 'anchor',
    yrken: ['dykare', 'betong', 'snickare'] },
  { key: 'bat', fraga: 'Behöver du hjälp med båten?', rubrik: 'Båten', ikon: 'sailboat',
    yrken: ['batmekaniker'] },
  { key: 'tomt', fraga: 'Behöver du hjälp med tomten?', rubrik: 'Tomten', ikon: 'tree',
    yrken: ['markarbete', 'brunnsborrning'] },
  { key: 'frakt', fraga: 'Behöver du få hit något?', rubrik: 'Få hit folk och material', ikon: 'ship',
    yrken: ['sjotransport'] },
  { key: 'ovrigt', fraga: 'Något annat?', rubrik: 'Övrigt', ikon: 'wrench',
    yrken: ['sotare'] },
]

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const island = getIsland(slug)
  if (!island) notFound()

  const alla = getHantverkareForIsland(slug)
  const antal = alla.length
  const n = island.name
  // Frågan nämner bara det som någon post på ön täcker: "huset, bryggan, båten eller
  // tomten" stod på alla 15 öar, men bara Möja har båtmekaniker och Utö och Ornö bara
  // sjötransport (2026-11-02, mall-0234–0237 omarbete).
  const OMRADE: Record<string, string> = { hus: 'huset', brygga: 'bryggan', bat: 'båten', tomt: 'tomten' }
  const omraden = BEHOV
    .filter(b => OMRADE[b.key] && alla.some(h => synligaYrken(h).some(y => b.yrken.includes(y))))
    .map(b => OMRADE[b.key])
  const fraga = omraden.length > 0
    ? `Behöver du hjälp med ${omraden.length > 1 ? `${omraden.slice(0, -1).join(', ')} eller ${omraden[omraden.length - 1]}` : omraden[0]} på ${n}? `
    : alla.some(h => synligaYrken(h).includes('sjotransport')) ? `Behöver du få hit folk och material till ${n}? ` : ''

  return {
    title: antal > 0
      ? `Hantverkare och service på ${n}: ${antal} företag`
      : `Hantverkare och service på ${n}`,
    // Yrkeslistan stod på alla ösidor, även utan poster (2026-11-02, mall-0234–0237).
    description: antal > 0
      ? `${fraga}${antal === 1 ? 'Ett företag som självt uppger att det arbetar' : `${antal} företag som själva uppger att de arbetar`} på ön. Varje uppgift med källa och läsdatum.`
      // Inte "inga kontrollerade uppgifter": ösidan kan ha belagd text om hantverk (Fjäderholmarnas hantverksateljéer),
      // och sidan listar bara företag som själva uppger att de arbetar på ön (Fjäderholmarnas Granskare; mallarnas runda 5).
      : `Vi har inga företag registrerade som själva uppger att de arbetar på ${n}.`,
    keywords: [
      `hantverkare ${n.toLowerCase()}`, `snickare ${n.toLowerCase()}`,
      `elektriker ${n.toLowerCase()}`, `båttaxi ${n.toLowerCase()}`,
      `sjötransport ${n.toLowerCase()}`,
    ],
    openGraph: {
      images: ogO(island.slug),
      title: `Hantverkare och service på ${n}`,
      description: antal > 0 ? `${antal} företag som själva uppger att de arbetar på ${n}.` : `Vi har inga företag registrerade som själva uppger att de arbetar på ${n}.`,
      url: `https://svalla.se/o/${slug}/hantverkare`,
    },
    alternates: { canonical: `https://svalla.se/o/${slug}/hantverkare` },
  }
}

export default async function IslandHantverkarePage({ params }: Props) {
  const { slug } = await params
  const island = getIsland(slug)
  if (!island) notFound()

  const alla = getHantverkareForIsland(slug)

  const grupper = BEHOV
    .map(b => ({
      ...b,
      poster: alla.filter(h => synligaYrken(h).some(y => b.yrken.includes(y))),
    }))
    .filter(g => g.poster.length > 0)

  // Poster som inte fastnat i någon behovsgrupp ska ändå synas — annars
  // försvinner de tyst, och en tyst bortfiltrering är värre än en ful rubrik.
  const grupperade = new Set(grupper.flatMap(g => g.poster.map(p => p.slug)))
  const ogrupperade = alla.filter(h => !grupperade.has(h.slug))

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <IslandSubPageHeader
        island={island}
        tab="hantverkare"
        title={`Hantverkare och service på ${island.name}`}
      />
      <Vidareklick islandSlug={island.slug} standard="hantverk" />

      <div style={{ maxWidth: 900, margin: '24px auto 0', padding: '0 16px 60px' }}>
        {alla.length === 0 ? (
          <div style={{
            background: 'var(--white)', padding: 24, borderRadius: 14,
            fontSize: 14, color: 'var(--txt2)', lineHeight: 1.7,
          }}>
            Vi har inga företag registrerade som själva uppger att de arbetar på {island.name}.
            {' '}Driver du ett företag här, eller vet du vem som gör vad på ön?
            {' '}Hör av dig till <a href="mailto:info@svalla.se" style={{ color: 'var(--acc-d)' }}>info@svalla.se</a>.
          </div>
        ) : (
          <>
            {/* Källraden ligger först med flit. Besökaren ska veta vad det här
                är innan hen läser ett enda telefonnummer. */}
            <div style={{
              background: 'var(--white)', border: '1px solid var(--hairline)',
              borderRadius: 14, padding: '14px 16px', marginBottom: 22,
              fontSize: 13.5, color: 'var(--txt2)', lineHeight: 1.65,
              display: 'flex', gap: 11, alignItems: 'flex-start',
            }}>
              <span style={{ color: 'var(--sea)', flexShrink: 0, marginTop: 2 }} aria-hidden>
                <Icon name="info" size={17} stroke={2} />
              </span>
              <div>
                {/* "Uppgifterna" gällde också vilken ö ett företag står under, men Delsholmen Entreprenad stod på Möja
                    efter ett register (sm08-k016; runda 10). Nu sägs vilka uppgifter som kommer från webbplatserna. */}
                Namn, yrken och kontaktuppgifter kommer från företagens egna
                webbplatser och, för elföretag, Elsäkerhetsverkets register.
                Varje post visar sin källa och när vi läste den.{' '}
                <strong>Vi kan inte garantera att en uppgift är aktuell</strong>{' '}
               , ring och bekräfta innan du beställer arbete. Svalla förmedlar
                inga uppdrag och har ingen affärsrelation med företagen.
                {' '}Ser du ett fel, eller vill du inte synas här?{' '}
                <a href="mailto:info@svalla.se" style={{ color: 'var(--acc-d)' }}>info@svalla.se</a>
                {' '}så rättar vi.
              </div>
            </div>

            {grupper.map(g => (
              <section key={g.key} id={`b-${g.key}`} style={{ marginBottom: 34 }}>
                <h2 style={{
                  fontSize: 19, fontWeight: 700, color: 'var(--txt)',
                  margin: '0 0 4px', display: 'flex', alignItems: 'center', gap: 9,
                }}>
                  <span style={{ color: 'var(--acc)' }} aria-hidden>
                    <Icon name={g.ikon} size={19} stroke={2} />
                  </span>
                  {g.fraga}
                </h2>
                <p style={{ margin: '0 0 12px', fontSize: 13.5, color: 'var(--txt3)' }}>
                  {g.poster.length} {g.poster.length === 1 ? 'företag' : 'företag'}
                </p>
                <ul style={{ display: 'grid', gap: 10, margin: 0, padding: 0 }}>
                  {g.poster.map(h => <HantverkarKort key={h.slug} h={h} oSlug={slug} utanBat={nasUtanBat(island.getting_there, island.name)} />)}
                </ul>
              </section>
            ))}

            {ogrupperade.length > 0 && (
              <section style={{ marginBottom: 34 }}>
                <h2 style={{ fontSize: 19, fontWeight: 700, color: 'var(--txt)', margin: '0 0 12px' }}>
                  Övriga företag
                </h2>
                <ul style={{ display: 'grid', gap: 10, margin: 0, padding: 0 }}>
                  {ogrupperade.map(h => <HantverkarKort key={h.slug} h={h} oSlug={slug} utanBat={nasUtanBat(island.getting_there, island.name)} />)}
                </ul>
              </section>
            )}

            {/* Öns egen text om näringsliv och hantverk (fältet hantverk_text, Lag 3 b, Redaktörens beslut 2026-11-17). */}
            {island.hantverk_text && island.hantverk_text.length > 0 && (
              <section style={{ marginBottom: 34 }}>
                <h2 style={{ fontSize: 19, fontWeight: 700, color: 'var(--txt)', margin: '0 0 8px' }}>
                  Näringsliv på {island.name}
                </h2>
                {island.hantverk_text.map((t, i) => (
                  <p key={i} style={{ margin: '0 0 10px', fontSize: 14.5, color: 'var(--txt2)', lineHeight: 1.7 }}>{t}</p>
                ))}
              </section>
            )}

            <div style={{
              background: 'var(--acc-l)', border: '1px solid var(--acc-15)',
              borderRadius: 16, padding: '20px 22px', marginTop: 30,
            }}>
              <h2 style={{ fontSize: 19, fontWeight: 700, color: 'var(--acc-d)', margin: '0 0 7px' }}>
                Driver du ett av företagen?
              </h2>
              <p style={{ margin: '0 0 6px', fontSize: 14.5, color: 'var(--txt2)', lineHeight: 1.65 }}>
                Bekräfta uppgifterna, lägg till telefonnummer och beskrivning, eller
                be oss ta bort dig. Kostnadsfritt, och du kan rätta och komplettera det som står.
              </p>
              <a href="mailto:info@svalla.se" style={{ fontSize: 14.5, color: 'var(--acc-d)', fontWeight: 600 }}>
                info@svalla.se
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
