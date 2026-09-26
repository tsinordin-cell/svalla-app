import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ALL_ISLANDS, getIsland } from '../../island-data'
import IslandSubPageHeader from '@/components/IslandSubPageHeader'
import IslandPlacesList from '@/components/IslandPlacesList'
import { getIslandPlaces } from '@/lib/islandPlaces'

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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const island = getIsland(slug)
  // SOFT-404-SKYDD: loading.tsx streamar svaret — 200 flushas före sidkroppen,
  // så bara ett notFound() HÄR (före headers) ger riktig 404-status. Se
  // motsvarande kommentar i o/[slug]/page.tsx och CLAUDE.md.
  if (!island) notFound()
  return {
    title: `Restauranger på ${island.name} – krogar och kaféer`,
    description: `Restauranger, krogar, barer och kaféer på ${island.name}, med beskrivning och länk till varje ställe.`,
    keywords: [`${island.name.toLowerCase()} restaurang`, `${island.name.toLowerCase()} krog`, `${island.name.toLowerCase()} café`, `mat på ${island.name.toLowerCase()}`],
    openGraph: {
      title: `Restauranger på ${island.name}`,
      description: `Restauranger, krogar och kaféer på ${island.name}.`,
      url: `https://svalla.se/o/${slug}/restauranger`,
    },
    alternates: { canonical: `https://svalla.se/o/${slug}/restauranger` },
  }
}

export default async function IslandRestaurantsPage({ params }: Props) {
  const { slug } = await params
  const island = getIsland(slug)
  if (!island) notFound()

  // Krogar ur platsdatabasen som inte redan står i island-data.
  const known = new Set(island.restaurants.flatMap(r => [r.slug, r.name.toLowerCase()]).filter(Boolean) as string[])
  const dbPlaces = (await getIslandPlaces(island, ['restaurant', 'cafe', 'bar'], { extraKm: 0.5 }))
    .filter(p => !known.has(p.slug) && !known.has(p.name.toLowerCase()))
  const total = island.restaurants.length + dbPlaces.filter(p => p.onIsland).length

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <IslandSubPageHeader
        island={island}
        tab="restauranger"
        subtitle={
          total === 0
            ? `Vi har inga restauranger registrerade på ${island.name}. Kolla säsong och öppettider innan du åker, och ta med matsäck om du är osäker.`
            : total === 1
            ? `Restaurangen på ${island.name} som vi har uppgifter om.`
            : `${total} restauranger, krogar och kaféer på ${island.name} som vi har uppgifter om.`
        }
      />

      <main style={{ maxWidth: 900, margin: '-24px auto 0', padding: '0 16px 60px' }}>
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
      </main>
    </div>
  )
}
