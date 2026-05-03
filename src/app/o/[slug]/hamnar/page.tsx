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
    title: `Gästhamnar på ${island.name} — bryggor och båtplatser | Svalla`,
    description: `Alla gästhamnar och bryggor på ${island.name}. Antal platser, bränsle, dusch, el och bokning. Aktuell info inför sommaren.`,
    keywords: [`${island.name.toLowerCase()} gästhamn`, `${island.name.toLowerCase()} brygga`, `båt till ${island.name.toLowerCase()}`],
    openGraph: {
      title: `Gästhamnar på ${island.name}`,
      description: `Alla bryggor och hamnar på ${island.name}.`,
      url: `https://svalla.se/o/${slug}/hamnar`,
    },
    alternates: { canonical: `https://svalla.se/o/${slug}/hamnar` },
  }
}

export default async function IslandHarborsPage({ params }: Props) {
  const { slug } = await params
  const island = getIsland(slug)
  if (!island) notFound()

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <IslandSubPageHeader
        island={island}
        tab="hamnar"
        title={`Gästhamnar på ${island.name}`}
      />

      <main style={{ maxWidth: 900, margin: '-24px auto 0', padding: '0 16px 60px' }}>
        {island.harbors.length === 0 ? (
          <div style={{ background: 'var(--white)', padding: 24, borderRadius: 14, fontSize: 14, color: 'var(--txt2)' }}>
            Inga registrerade gästhamnar på {island.name}.
          </div>
        ) : (
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
                    <span style={{ padding: '4px 10px', borderRadius: 999, background: 'rgba(201,110,42,0.10)', color: '#c96e2a', fontWeight: 700 }}>
                      ⛽ Bränsle
                    </span>
                  )}
                  {h.service?.map(s => (
                    <span key={s} style={{ padding: '4px 10px', borderRadius: 999, background: 'var(--surface-2)', color: 'var(--txt2)' }}>
                      ✓ {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
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
      </main>
    </div>
  )
}
