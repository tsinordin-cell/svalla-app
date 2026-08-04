import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ALL_ISLANDS, getIsland, type IslandBeach } from '../../island-data'
import IslandSubPageHeader from '@/components/IslandSubPageHeader'

function normalizeBeach(b: string | IslandBeach, islandName: string): IslandBeach {
  if (typeof b === 'string') {
    const type = b.toLowerCase().includes('sand') ? 'sandstrand'
      : b.toLowerCase().includes('brygga') ? 'brygga'
      : 'klippbad'
    return { name: b, desc: `Badplats på ${islandName}.`, type }
  }
  return b
}

function beachIcon(type: IslandBeach['type']) {
  switch (type) {
    case 'sandstrand': return '🏖️'
    case 'trampolinbad': return '🤸'
    case 'brygga': return '⚓'
    case 'badvik': return '🌊'
    default: return '🏊'
  }
}

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return ALL_ISLANDS.map(island => ({ slug: island.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const island = getIsland(slug)
  if (!island) return {}
  return {
    title: `Bästa badplatser på ${island.name} 2026 | Svalla`,
    description: `Var badar man på ${island.name}? Klippbad, sandstränder och dolda badvikar — komplett guide med tips om hur du hittar dit.`,
    keywords: [
      `bada på ${island.name.toLowerCase()}`,
      `badplatser ${island.name.toLowerCase()}`,
      `${island.name.toLowerCase()} bad`,
      `${island.name.toLowerCase()} strand`,
      `klippbad ${island.name.toLowerCase()}`,
      `${island.name.toLowerCase()} swim`,
    ],
    openGraph: {
      title: `Bästa badplatser på ${island.name}`,
      description: `Klippbad, sandstränder och dolda badvikar på ${island.name}. Komplett guide.`,
      url: `https://svalla.se/o/${slug}/bad`,
    },
    alternates: { canonical: `https://svalla.se/o/${slug}/bad` },
  }
}

export default async function IslandBadPage({ params }: Props) {
  const { slug } = await params
  const island = getIsland(slug)
  if (!island) notFound()

  const beaches = island.activity_meta?.bad?.beaches ?? []
  const hasBad = island.activities.some(a =>
    ['bad', 'klippbad', 'simning', 'strand', 'sandstrand'].some(k => a.name.toLowerCase().includes(k) || a.desc.toLowerCase().includes(k))
  )
  const badActivities = island.activities.filter(a =>
    ['bad', 'klipp', 'sim', 'strand', 'brygga', 'dopp'].some(k =>
      a.name.toLowerCase().includes(k) || a.desc.toLowerCase().includes(k)
    )
  )

  const normalizedBeaches = beaches.map(b => normalizeBeach(b, island.name))

  const badSchema = normalizedBeaches.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Badplatser på ${island.name}`,
    url: `https://svalla.se/o/${slug}/bad`,
    numberOfItems: normalizedBeaches.length,
    itemListElement: normalizedBeaches.map((b, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: b.name,
    })),
  } : null

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {badSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(badSchema) }} />
      )}

      <IslandSubPageHeader
        island={island}
        tab="bad"
        subtitle={
          !hasBad && beaches.length === 0
            ? `${island.name} är inte känt som badö — men det finns alltid klippor och bryggor att doppa sig från.`
            : `Var badar man bäst på ${island.name}? Här är allt du behöver veta.`
        }
      />

      <main style={{ maxWidth: 900, margin: '-24px auto 0', padding: '0 16px 60px' }}>

        {/* Stränder och badplatser */}
        {normalizedBeaches.length > 0 && (
          <div style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', marginBottom: 16 }}>
              Badplatser på {island.name}
            </h2>
            <div style={{ display: 'grid', gap: 16 }}>
              {normalizedBeaches.map((b, i) => (
                <div key={i} style={{
                  background: 'var(--white)', borderRadius: 16,
                  border: '1px solid var(--surface-3)',
                  overflow: 'hidden',
                }}>
                  {/* Huvud */}
                  <div style={{ padding: '18px 20px 14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                      <span style={{ fontSize: 24 }}>{beachIcon(b.type)}</span>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 17, color: 'var(--txt)', lineHeight: 1.2 }}>{b.name}</div>
                        <div style={{ display: 'flex', gap: 6, marginTop: 4, flexWrap: 'wrap' as const }}>
                          <span style={{
                            fontSize: 11, padding: '2px 9px', borderRadius: 999,
                            background: b.type === 'sandstrand' ? '#fef3c7' : b.type === 'trampolinbad' ? '#ede9fe' : 'var(--surface-3)',
                            color: b.type === 'sandstrand' ? '#92400e' : b.type === 'trampolinbad' ? '#5b21b6' : '#1e5c82',
                            fontWeight: 700,
                          }}>
                            {b.type === 'sandstrand' ? 'Sandstrand' : b.type === 'klippbad' ? 'Klippbad' : b.type === 'trampolinbad' ? 'Trampolinbad' : b.type === 'brygga' ? 'Badbrygga' : b.type === 'badvik' ? 'Badvik' : 'Badplats'}
                          </span>
                          {b.child_friendly && (
                            <span style={{ fontSize: 11, padding: '2px 9px', borderRadius: 999, background: '#dcfce7', color: '#166534', fontWeight: 700 }}>👶 Barnvänlig</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <p style={{ fontSize: 14, color: 'var(--txt2)', lineHeight: 1.65, margin: 0 }}>{b.desc}</p>
                  </div>

                  {/* Metadata */}
                  {(b.depth || b.directions || b.insider_tip) && (
                    <div style={{ borderTop: '1px solid var(--surface-3)', padding: '14px 20px', display: 'grid', gap: 8, background: 'rgba(10,123,140,0.02)' }}>
                      {b.depth && (
                        <div style={{ display: 'flex', gap: 8, fontSize: 13 }}>
                          <span>🌊</span>
                          <span style={{ color: 'var(--txt2)' }}><strong style={{ color: 'var(--txt)' }}>Vatten:</strong> {b.depth}</span>
                        </div>
                      )}
                      {b.directions && (
                        <div style={{ display: 'flex', gap: 8, fontSize: 13 }}>
                          <span>🗺️</span>
                          <span style={{ color: 'var(--txt2)' }}><strong style={{ color: 'var(--txt)' }}>Hitta dit:</strong> {b.directions}</span>
                        </div>
                      )}
                      {b.insider_tip && (
                        <div style={{ display: 'flex', gap: 8, fontSize: 13 }}>
                          <span>💡</span>
                          <span style={{ color: 'var(--txt2)' }}><strong style={{ color: 'var(--txt)' }}>Lokaltips:</strong> {b.insider_tip}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bad-aktiviteter från activities[] */}
        {badActivities.length > 0 && (
          <div style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', marginBottom: 16 }}>
              Bad och vattenliv på {island.name}
            </h2>
            <div style={{ display: 'grid', gap: 12 }}>
              {badActivities.map((a, i) => (
                <div key={i} style={{
                  background: 'var(--white)', borderRadius: 14,
                  padding: '18px 20px',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
                  border: '1px solid rgba(10,123,140,0.07)',
                }}>
                  <div style={{ fontWeight: 700, fontSize: 16, color: 'var(--txt)', marginBottom: 6 }}>
                    {a.name}
                  </div>
                  <div style={{ fontSize: 14, color: 'var(--txt2)', lineHeight: 1.6 }}>{a.desc}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Om inga baddata finns */}
        {beaches.length === 0 && badActivities.length === 0 && (
          <div style={{
            background: 'var(--white)', borderRadius: 14, padding: '24px 20px',
            border: '1px solid rgba(10,123,140,0.07)',
            boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
          }}>
            <p style={{ fontSize: 15, color: 'var(--txt2)', lineHeight: 1.7, margin: 0 }}>
              {island.name} har klippor och bryggor längs hela kusten. Allemansrätten ger rätt att bada och vistas längs stranden — ta med snorkel och utforska på eget hand. Se <Link href={`/o/${slug}/aktiviteter`} style={{ color: 'var(--sea)' }}>alla aktiviteter på {island.name}</Link> för mer info.
            </p>
          </div>
        )}

        {/* Allmänt om bad i skärgården */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(10,123,140,0.06) 0%, rgba(26,74,107,0.04) 100%)',
          borderRadius: 16, padding: '24px 22px',
          border: '1px solid rgba(10,123,140,0.10)',
          marginBottom: 32,
        }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--txt)', marginBottom: 12 }}>
            Tips för bad i skärgården
          </h3>
          <ul style={{ margin: 0, padding: '0 0 0 18px', fontSize: 14, color: 'var(--txt2)', lineHeight: 1.9 }}>
            <li>Vattnet är varmast i slutet av juli — runt 18–22°C i innerskärgården</li>
            <li>Klippbad är ofta bättre än stränder — renare vatten och färre folk</li>
            <li>Badbryggor med stege finns vid de flesta gästhamnar och värdshus</li>
            <li>Allemansrätten ger rätt att bada och vistas vid strandkanten — håll avstånd till privata tomter</li>
            <li>Ta med vattenost — siktdjupet i ytterskärgården kan vara 8–10 meter</li>
          </ul>
        </div>

        {/* Planera med Thorkel */}
        <div style={{
          background: 'linear-gradient(160deg, #1a4a6b 0%, #0d6e6e 100%)',
          borderRadius: 16, padding: '28px 24px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: 20, flexWrap: 'wrap' as const,
        }}>
          <div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', fontWeight: 600, marginBottom: 6 }}>AI-planeraren</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 6 }}>
              Planera hela dagen på {island.name}
            </div>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)' }}>
              Thorkel fixar båttider, lunch och bad — på sekunder.
            </div>
          </div>
          <Link href="/planera" style={{
            display: 'inline-block', background: '#e8924a', color: '#fff',
            fontSize: 14, fontWeight: 700, textDecoration: 'none',
            padding: '12px 28px', borderRadius: 50, flexShrink: 0,
          }}>
            Planera med Thorkel →
          </Link>
        </div>

        <div style={{ marginTop: 36, display: 'flex', justifyContent: 'center' }}>
          <Link href={`/o/${slug}`} style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'var(--sea)', color: '#fff',
            fontSize: 14, fontWeight: 700, textDecoration: 'none',
            padding: '12px 28px', borderRadius: 28,
          }}>
            ← Tillbaka till {island.name}
          </Link>
        </div>
      </main>
    </div>
  )
}
