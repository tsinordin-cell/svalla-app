import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ALL_ISLANDS, getIsland } from '../../island-data'
import IslandSubPageHeader from '@/components/IslandSubPageHeader'
import Vidareklick from '@/components/Vidareklick'
import Icon from '@/components/Icon'
import IslandPlacesList from '@/components/IslandPlacesList'
import { getIslandPlaces, utanDubbletter } from '@/lib/islandPlaces'
import { ogO } from '@/lib/og-standard'

type Props = { params: Promise<{ slug: string }> }

// SOFT-404, DEL 2 (2026-08-12). notFound() i generateMetadata (PR #117)
// räckte inte: Vercel serverar ett byggtids-fallbackskal för ISR-rutter
// med loading.tsx (x-nextjs-prerender: 1) — 200-statusen är satt INNAN
// någon kod körs, och vår notFound() landar bara som en error-digest i
// streamen (NEXT_HTTP_ERROR_FALLBACK;404 i body, status ändå 200).
// Den här routens hela slug-mängd är känd vid bygget (data ligger i
// repot), så dynamicParams=false är semantiskt rätt: okänd slug 404:ar
// i routern, före skalet. Gäller INTE db-backade rutter (upptack, tur,
// u) — nya rader där måste kunna renderas utan ny deploy.
export const dynamicParams = false
// ISR: hamnarna ur platsdatabasen hämtas vid bygget och uppdateras varje timme.
export const revalidate = 3600

export async function generateStaticParams() {
  return ALL_ISLANDS.map(island => ({ slug: island.slug }))
}

/** Hamnar och bryggor ur platsdatabasen som inte redan står i öns egen lista (samma urval i titeln och på sidan). */
async function hamnarIDatabasen(island: NonNullable<ReturnType<typeof getIsland>>) {
  const known = new Set(island.harbors.map(h => h.name.toLowerCase()))
  return utanDubbletter(
    (await getIslandPlaces(island, ['harbor', 'marina', 'anchorage', 'nature_harbor', 'fuel'], { extraKm: 1 }))
      .filter(p => !known.has(p.name.toLowerCase())),
    island.harbors.map(h => h.name),
    island.name,
  )
}

/**
 * Rubriken följer vad sidan har: "Hamnar och bryggor på X" när ön har en hamn i ödatan eller databasen, "Ankringsplatser
 * vid X" när databasen bara har ankringsplatser på ön, "nära X" när databasen bara har hamnar utanför ön, och "X: ingen
 * hamn registrerad" när sidan inte har någon. Förut stod "Hamnar och bryggor på X" även på öar utan hamn, som Gotska Sandön,
 * där Naturvårdsverket skriver "Det finns ingen hamn" (Kontrollantens fynd sm04-k005; mallarnas runda 10, 2026-11-17).
 */
const ANKRING = new Set(['anchorage', 'nature_harbor'])
function hamnrubriker(island: NonNullable<ReturnType<typeof getIsland>>, db: { onIsland: boolean; type: string }[]) {
  const n = island.name
  if (island.harbors.length > 0 || db.some(p => p.onIsland && !ANKRING.has(p.type))) {
    return { titel: `Hamnar och bryggor på ${n}`, h1: `Hamnar på ${n}`, lista: island.harbors.length > 0 ? `Fler hamnar och bryggor på och nära ${n}` : `Hamnar och bryggor på och nära ${n}`, not: '', beskrivning: `Hamnar och bryggor på ${n}: antal platser, bränsle, dusch och el där vi har en källa för det.`, og: `Hamnar och bryggor på ${n}.` }
  }
  // Bara ankringsplatser på ön (Gotska Sandön: databasens "Gotska Sandön", typ anchorage).
  if (db.some(p => p.onIsland)) {
    return { titel: `Ankringsplatser vid ${n}`, h1: `Ankringsplatser vid ${n}`, lista: `Ankringsplatser vid ${n}`, not: `Vi har ingen gästhamn eller brygga registrerad på ${n}, bara ankringsplatser.`, beskrivning: `Vi har ingen hamn eller brygga registrerad på ${n}, bara ankringsplatser. Under Komma dit står vad som gäller för båt.`, og: `Ankringsplatser vid ${n}.` }
  }
  if (db.length > 0) {
    return { titel: `Hamnar och bryggor nära ${n}`, h1: `Hamnar nära ${n}`, lista: `Hamnar och bryggor nära ${n}`, not: `Vi har ingen gästhamn registrerad på själva ${n}. Hamnarna nedan ligger nära ön.`, beskrivning: `Hamnar och bryggor nära ${n}, med avstånd fågelvägen. Vi har ingen hamn registrerad på själva ön.`, og: `Hamnar och bryggor nära ${n}.` }
  }
  return { titel: `${n}: ingen hamn registrerad`, h1: `${n}: ingen hamn registrerad`, lista: '', not: `Vi har inga gästhamnar registrerade på ${n}.`, beskrivning: `Vi har inga hamnar eller bryggor registrerade på ${n}. Under Komma dit står hur du tar dig dit.`, og: `Vi har inga hamnar eller bryggor registrerade på ${n}.` }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const island = getIsland(slug)
  // SOFT-404-SKYDD: loading.tsx streamar svaret — 200 flushas före sidkroppen,
  // så bara ett notFound() HÄR (före headers) ger riktig 404-status. Se
  // motsvarande kommentar i o/[slug]/page.tsx och CLAUDE.md.
  if (!island) notFound()
  const r = hamnrubriker(island, await hamnarIDatabasen(island))
  return {
    title: r.titel,
    description: r.beskrivning,
    keywords: [`${island.name.toLowerCase()} gästhamn`, `${island.name.toLowerCase()} brygga`, `båt till ${island.name.toLowerCase()}`],
    openGraph: {
      images: ogO(island.slug),
      title: r.titel,
      description: r.og,
      url: `https://svalla.se/o/${slug}/hamnar`,
    },
    alternates: { canonical: `https://svalla.se/o/${slug}/hamnar` },
  }
}

/**
 * Servicemärkena står i ödatan med olika stavning ("toalett", "Toalett", "toilet", "WC"). Märket visas på svenska
 * med versal: "✓ toilet" stod på /o/vaxholm/hamnar (full-15 utanför-4; mallarnas runda 5, 2026-11-10).
 */
const SERVICE_SVENSKA: Record<string, string> = { toilet: 'Toalett', toilets: 'Toalett', shower: 'Dusch', water: 'Vatten', electricity: 'El', fuel: 'Bränsle', laundry: 'Tvätt', sauna: 'Bastu' }
function serviceEtikett(s: string): string {
  const t = s.trim()
  const sv = SERVICE_SVENSKA[t.toLowerCase()] ?? t
  return /^wc$/i.test(sv) ? 'WC' : sv.charAt(0).toUpperCase() + sv.slice(1)
}

export default async function IslandHarborsPage({ params }: Props) {
  const { slug } = await params
  const island = getIsland(slug)
  if (!island) notFound()

  const dbHarbors = await hamnarIDatabasen(island)
  const rubriker = hamnrubriker(island, dbHarbors)

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <IslandSubPageHeader
        island={island}
        tab="hamnar"
        title={rubriker.h1}
      />
      <Vidareklick islandSlug={island.slug} standard="hamn" />

      <div style={{ maxWidth: 900, margin: '24px auto 0', padding: '0 16px 60px' }}>
        {/* Utan hamn på ön säger sidan det, med länk till Komma dit (runda 10, sm04-k005). */}
        {rubriker.not && (
          <div style={{ background: 'var(--white)', padding: 24, borderRadius: 14, fontSize: 14, color: 'var(--txt2)', marginBottom: dbHarbors.length > 0 ? 28 : 0 }}>
            {rubriker.not}{' '}
            <Link href={`/o/${slug}/komma-dit`} style={{ color: 'var(--sea)' }}>Så tar du dig till {island.name} →</Link>
          </div>
        )}
        {island.harbors.length === 0 ? null : (
          <div style={{ display: 'grid', gap: 14 }}>
            {island.harbors.map(h => (
              <div key={h.name} style={{
                background: 'var(--white)', padding: '20px 22px', borderRadius: 14,
                border: '1px solid var(--surface-3)',
              }}>
                <h2 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 8px' }}>{h.name}</h2>
                <p style={{ fontSize: 14, color: 'var(--txt2)', lineHeight: 1.55, marginBottom: 12 }}>{h.desc}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, fontSize: 12 }}>
                  {h.spots && (
                    <span style={{ padding: '4px 10px', borderRadius: 999, background: 'var(--surface-3)', color: '#1e5c82', fontWeight: 700 }}>
                      {h.spots} platser
                    </span>
                  )}
                  {h.fuel && (
                    <span style={{ padding: '4px 10px', borderRadius: 999, background: 'rgba(201,110,42,0.10)', color: '#c96e2a', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                      <Icon name="fuel" size={13} stroke={2} />Bränsle
                    </span>
                  )}
                  {h.service?.map(s => (
                    <span key={s} style={{ padding: '4px 10px', borderRadius: 999, background: 'var(--surface-2)', color: 'var(--txt2)' }}>
                      ✓ {serviceEtikett(s)}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {dbHarbors.length > 0 && (
          <div style={{ marginTop: island.harbors.length > 0 ? 28 : 0 }}>
            <IslandPlacesList
              places={dbHarbors}
              islandName={island.name}
              heading={rubriker.lista}
            />
          </div>
        )}

        <div style={{ marginTop: 32, padding: '20px 22px', background: 'var(--white)', borderRadius: 14, border: '1px solid var(--surface-3)' }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>Mer om {island.name}</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, fontSize: 14 }}>
            <Link href={`/o/${slug}`} style={{ padding: '6px 14px', borderRadius: 999, background: 'var(--surface-2)', color: 'var(--sea)', textDecoration: 'none' }}>Hela ö-guiden →</Link>
            <Link href={`/o/${slug}/restauranger`} style={{ padding: '6px 14px', borderRadius: 999, background: 'var(--surface-2)', color: 'var(--sea)', textDecoration: 'none' }}>Restauranger →</Link>
            <Link href={`/o/${slug}/boende`} style={{ padding: '6px 14px', borderRadius: 999, background: 'var(--surface-2)', color: 'var(--sea)', textDecoration: 'none' }}>Boende →</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
