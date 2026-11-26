import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ALL_ISLANDS, getIsland } from '../../island-data'
import IslandSubPageHeader from '@/components/IslandSubPageHeader'
import Vidareklick from '@/components/Vidareklick'
import IslandPlacesList from '@/components/IslandPlacesList'
import { krogarIDatabasen } from '@/lib/islandPlaces'
import { arButik } from '@/lib/mallRegler'
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
// ISR: krogarna ur platsdatabasen hämtas vid bygget och uppdateras varje timme.
export const revalidate = 3600

export async function generateStaticParams() {
  return ALL_ISLANDS.map(island => ({ slug: island.slug }))
}

/**
 * Restaurang, krog eller värdshus – inte kafé, kiosk eller handel. "Restauranger på"
 * stod också där enda stället är ett kafé eller en lanthandel (Husarö, Nämdö, Rödlöga,
 * Vinga, Trysunda m.fl.; 2026-11-02, mall-0132 omarbete).
 */
const RESTAURANGTYP = /restaurang|krog|värdshus|wärdshus|bistro|brasserie/i

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const island = getIsland(slug)
  // SOFT-404-SKYDD: loading.tsx streamar svaret — 200 flushas före sidkroppen,
  // så bara ett notFound() HÄR (före headers) ger riktig 404-status. Se
  // motsvarande kommentar i o/[slug]/page.tsx och CLAUDE.md.
  if (!island) notFound()
  const rubrik = island.restaurants.length > 0 && !island.restaurants.some(r => RESTAURANGTYP.test(r.type))
    ? `Mat och dryck på ${island.name}`
    : `Restauranger på ${island.name}`
  // Löftet om ställen "med beskrivning" bara när sidan har några: 22 öar har inga i ödatan, och sidan säger då "Vi har
  // inga restauranger registrerade" (Gotska Sandön; Kontrollantens fynd mo01-k042; mallarnas runda 7, 2026-11-17).
  const finns = island.restaurants.length > 0 || (await krogarIDatabasen(island)).some(p => p.onIsland)
  const beskrivning = finns
    ? `Ställen att äta och dricka på ${island.name} som vi har uppgifter om, med beskrivning.`
    : `Vi har inga restauranger registrerade på ${island.name}. Kolla säsong och öppettider innan du åker.`
  return {
    title: rubrik,
    description: beskrivning,
    keywords: [`${island.name.toLowerCase()} restaurang`, `${island.name.toLowerCase()} krog`, `${island.name.toLowerCase()} café`, `mat på ${island.name.toLowerCase()}`],
    openGraph: {
      images: ogO(island.slug),
      title: rubrik,
      description: finns ? `Ställen att äta och dricka på ${island.name}.` : beskrivning,
      url: `https://svalla.se/o/${slug}/restauranger`,
    },
    alternates: { canonical: `https://svalla.se/o/${slug}/restauranger` },
  }
}

export default async function IslandRestaurantsPage({ params }: Props) {
  const { slug } = await params
  const island = getIsland(slug)
  if (!island) notFound()

  // Krogar ur platsdatabasen som inte redan står i island-data (samma urval som ösidans FAQ, src/lib/islandPlaces.ts).
  const dbPlaces = await krogarIDatabasen(island)
  const total = island.restaurants.length + dbPlaces.filter(p => p.onIsland).length
  // Butiker räknas för sig, inte som "restauranger, krogar och kaféer" (mo01-k040; mallarnas runda 7, 2026-11-17).
  const butiker = island.restaurants.filter(r => arButik(r.type)).length
  const mat = total - butiker
  const delar = [
    mat === 1 ? 'ett ställe att äta och dricka' : mat > 1 ? `${mat} restauranger, krogar och kaféer` : '',
    butiker === 1 ? 'en butik' : butiker > 1 ? `${butiker} butiker` : '',
  ].filter(Boolean).join(' och ')
  const undertitel = `${delar.charAt(0).toUpperCase()}${delar.slice(1)} på ${island.name} som vi har uppgifter om.${mat === 0 ? ' Vi har inga restauranger eller kaféer registrerade på ön.' : ''}`
  const harRestaurang = island.restaurants.some(r => RESTAURANGTYP.test(r.type)) || dbPlaces.some(p => p.onIsland && p.type === 'restaurant')

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <IslandSubPageHeader
        island={island}
        tab="restauranger"
        title={total > 0 && !harRestaurang ? `Mat och dryck på ${island.name}` : undefined}
        subtitle={
          total === 0
            ? `Vi har inga restauranger registrerade på ${island.name}. Kolla säsong och öppettider innan du åker, och ta med matsäck om du är osäker.`
            : undertitel
        }
      />
      <Vidareklick islandSlug={island.slug} standard="mat" />

      <div style={{ maxWidth: 900, margin: '24px auto 0', padding: '0 16px 60px' }}>
        {island.restaurants.length === 0 && dbPlaces.length === 0 ? (
          <div style={{ background: 'var(--white)', padding: 24, borderRadius: 14, fontSize: 14, color: 'var(--txt2)' }}>
            Inga registrerade restauranger på {island.name}. <Link href="/partner" style={{ color: 'var(--sea)' }}>Är du krögare här? Kontakta oss</Link> så lägger vi upp.
          </div>
        ) : (
          <div style={{ display: 'grid', gap: 14 }}>
            {island.restaurants.map(r => {
              const cardContent = (
                <>
                  <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12 }}>
                    <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>{r.name}</h2>
                    <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 999, background: 'var(--surface-3)', color: '#1e5c82', fontWeight: 700 }}>
                      {r.type}
                    </span>
                  </div>
                  <p style={{ fontSize: 14, color: 'var(--txt2)', lineHeight: 1.55, marginTop: 8 }}>
                    {r.desc}
                  </p>
                  {r.slug && (
                    <span style={{ fontSize: 12, color: 'var(--sea)', marginTop: 8, display: 'inline-block', fontWeight: 600 }}>
                      Se mer info →
                    </span>
                  )}
                </>
              )
              return r.slug ? (
                <Link key={r.name} href={`/upptack/${r.slug}`} style={{
                  display: 'block', background: 'var(--white)', padding: '20px 22px', borderRadius: 14,
                  border: '1px solid var(--surface-3)', textDecoration: 'none', color: 'inherit',
                  transition: 'border-color 0.15s',
                }}>
                  {cardContent}
                </Link>
              ) : (
                <div key={r.name} style={{
                  background: 'var(--white)', padding: '20px 22px', borderRadius: 14,
                  border: '1px solid var(--surface-3)',
                }}>
                  {cardContent}
                </div>
              )
            })}
          </div>
        )}

        {dbPlaces.length > 0 && (
          <div style={{ marginTop: island.restaurants.length > 0 ? 28 : 0 }}>
            <IslandPlacesList
              places={dbPlaces}
              islandName={island.name}
              heading={island.restaurants.length > 0 ? `Fler ställen på och nära ${island.name}` : `Restauranger och kaféer på och nära ${island.name}`}
            />
          </div>
        )}

        <div style={{ marginTop: 32, padding: '20px 22px', background: 'var(--white)', borderRadius: 14, border: '1px solid var(--surface-3)' }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>Mer om {island.name}</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, fontSize: 14 }}>
            <Link href={`/o/${slug}`} style={{ padding: '6px 14px', borderRadius: 999, background: 'var(--surface-2)', color: 'var(--sea)', textDecoration: 'none' }}>Hela ö-guiden →</Link>
            <Link href={`/o/${slug}/hamnar`} style={{ padding: '6px 14px', borderRadius: 999, background: 'var(--surface-2)', color: 'var(--sea)', textDecoration: 'none' }}>Hamnar →</Link>
            <Link href={`/o/${slug}/boende`} style={{ padding: '6px 14px', borderRadius: 999, background: 'var(--surface-2)', color: 'var(--sea)', textDecoration: 'none' }}>Boende →</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
