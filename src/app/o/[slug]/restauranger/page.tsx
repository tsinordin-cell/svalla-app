import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ALL_ISLANDS, getIsland } from '../../island-data'
import IslandSubPageHeader from '@/components/IslandSubPageHeader'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return ALL_ISLANDS.map(island => ({ slug: island.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const island = getIsland(slug)
  if (!island) return {}
  return {
    title: `Restauranger på ${island.name} — bästa krogarna 2026 | Svalla`,
    description: `Alla restauranger, krogar och caféer på ${island.name}. Öppettider, specialiteter, hur man hittar dit. Uppdaterad guide.`,
    keywords: [`${island.name.toLowerCase()} restaurang`, `${island.name.toLowerCase()} krog`, `${island.name.toLowerCase()} café`, `mat på ${island.name.toLowerCase()}`],
    openGraph: {
      title: `Restauranger på ${island.name}`,
      description: `Var äter man bäst på ${island.name}? Komplett guide.`,
      url: `https://svalla.se/o/${slug}/restauranger`,
    },
    alternates: { canonical: `https://svalla.se/o/${slug}/restauranger` },
  }
}

export default async function IslandRestaurantsPage({ params }: Props) {
  const { slug } = await params
  const island = getIsland(slug)
  if (!island) notFound()

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <IslandSubPageHeader
        island={island}
        tab="restauranger"
        subtitle={
          island.restaurants.length === 0
            ? `${island.name} har begränsat utbud — ta gärna med matsäck.`
            : `Här är de ${island.restaurants.length} restauranger, krogar och caféer som finns på ${island.name}.`
        }
      />

      <main style={{ maxWidth: 900, margin: '-24px auto 0', padding: '0 16px 60px' }}>
        {island.restaurants.length === 0 ? (
          <div style={{ background: 'var(--white)', padding: 24, borderRadius: 14, fontSize: 14, color: 'var(--txt2)' }}>
            Inga registrerade restauranger på {island.name}. <Link href="/partner" style={{ color: 'var(--sea)' }}>Är du krögare här? Kontakta oss</Link> så lägger vi upp.
          </div>
        ) : (
          <div style={{ display: 'grid', gap: 14 }}>
            {island.restaurants.map(r => (
              <div key={r.name} style={{
                background: 'var(--white)', padding: '20px 22px', borderRadius: 14,
                border: '1px solid var(--surface-3)',
              }}>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12 }}>
                  <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>{r.name}</h2>
                  <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 999, background: 'var(--surface-3)', color: '#1e5c82', fontWeight: 700 }}>
                    {r.type}
                  </span>
                </div>
                <p style={{ fontSize: 14, color: 'var(--txt2)', lineHeight: 1.55, marginTop: 8 }}>
                  {r.desc}
                </p>
              </div>
            ))}
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
