import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ALL_ISLANDS, getIsland } from '../../island-data'
import SvallaLogo from '@/components/SvallaLogo'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return ALL_ISLANDS.map(island => ({ slug: island.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const island = getIsland(slug)
  if (!island) return {}
  return {
    title: `Boende på ${island.name} — hotell, vandrarhem och stugor | Svalla`,
    description: `Hela utbudet av boende på ${island.name}: hotell, värdshus, B&B, stugor och vandrarhem. Bokningstips inför sommaren.`,
    keywords: [`${island.name.toLowerCase()} hotell`, `${island.name.toLowerCase()} boende`, `${island.name.toLowerCase()} stuga`, `övernattning ${island.name.toLowerCase()}`],
    openGraph: {
      title: `Boende på ${island.name}`,
      description: `Hotell, vandrarhem och stugor på ${island.name}.`,
      url: `https://svalla.se/o/${slug}/boende`,
    },
    alternates: { canonical: `https://svalla.se/o/${slug}/boende` },
  }
}

export default async function IslandAccommodationPage({ params }: Props) {
  const { slug } = await params
  const island = getIsland(slug)
  if (!island) notFound()

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <nav style={{
        background: 'linear-gradient(160deg, #1e5c82 0%, #2d7d8a 100%)',
        padding: '18px 24px 16px',
      }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', justifyContent: 'space-between' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <SvallaLogo height={24} color="#ffffff" />
          </Link>
          <Link href={`/o/${slug}`} style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, textDecoration: 'none' }}>
            ← {island.name}-guiden
          </Link>
        </div>
      </nav>

      <header style={{
        background: 'linear-gradient(170deg, #1e5c82 0%, #2d7d8a 100%)',
        padding: '40px 24px 56px', color: '#fff',
      }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ fontSize: 11, opacity: 0.8, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 8 }}>
            {island.regionLabel} · {island.name}
          </div>
          <h1 style={{ fontSize: 36, fontWeight: 700, margin: 0, fontFamily: "'Playfair Display', Georgia, serif" }}>
            Boende på {island.name}
          </h1>
        </div>
      </header>

      <main style={{ maxWidth: 900, margin: '-24px auto 0', padding: '0 16px 60px' }}>
        {island.accommodation.length === 0 ? (
          <div style={{ background: 'var(--white)', padding: 24, borderRadius: 14, fontSize: 14, color: 'var(--txt2)' }}>
            Inga registrerade boenden på {island.name}. Många öar har dock möjlighet till privat stuguthyrning — kontakta lokala uthyrare eller använd Airbnb.
          </div>
        ) : (
          <div style={{ display: 'grid', gap: 14 }}>
            {island.accommodation.map(a => (
              <div key={a.name} style={{
                background: 'var(--white)', padding: '20px 22px', borderRadius: 14,
                border: '1px solid var(--surface-3)',
              }}>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12 }}>
                  <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>{a.name}</h2>
                  <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 999, background: 'var(--surface-3)', color: '#1e5c82', fontWeight: 700 }}>
                    {a.type}
                  </span>
                </div>
                <p style={{ fontSize: 14, color: 'var(--txt2)', lineHeight: 1.55, marginTop: 8 }}>{a.desc}</p>
              </div>
            ))}
          </div>
        )}

        <div style={{ marginTop: 32, padding: '20px 22px', background: 'var(--white)', borderRadius: 14, border: '1px solid var(--surface-3)' }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>Mer om {island.name}</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, fontSize: 14 }}>
            <Link href={`/o/${slug}`} style={{ padding: '6px 14px', borderRadius: 999, background: 'var(--surface-2)', color: 'var(--sea)', textDecoration: 'none' }}>Hela ö-guiden →</Link>
            <Link href={`/o/${slug}/restauranger`} style={{ padding: '6px 14px', borderRadius: 999, background: 'var(--surface-2)', color: 'var(--sea)', textDecoration: 'none' }}>Restauranger →</Link>
            <Link href={`/o/${slug}/hamnar`} style={{ padding: '6px 14px', borderRadius: 999, background: 'var(--surface-2)', color: 'var(--sea)', textDecoration: 'none' }}>Hamnar →</Link>
          </div>
        </div>
      </main>
    </div>
  )
}
