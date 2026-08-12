import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ALL_ISLANDS, getIsland, type IslandBeach } from '../../island-data'
import IslandSubPageHeader from '@/components/IslandSubPageHeader'

type Props = { params: Promise<{ slug: string }> }

function isBeachObject(b: string | IslandBeach): b is IslandBeach {
  return typeof b === 'object' && b !== null && 'name' in b
}

const typeLabel: Record<IslandBeach['type'], string> = {
  sandstrand: '🏖 Sandstrand',
  klippbad: '🪨 Klippbad',
  grusstrand: '🪨 Grusstrand',
  brygga: '🛶 Badbrygga',
  trampolinbad: '🤸 Trampolinbad',
  badvik: '🌊 Badvik',
}

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

  const badSchema = beaches.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Badplatser på ${island.name}`,
    url: `https://svalla.se/o/${slug}/bad`,
    numberOfItems: beaches.length,
    itemListElement: beaches.map((b, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: isBeachObject(b) ? b.name : b,
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
        {beaches.length > 0 && (
          <div style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', marginBottom: 16 }}>
              Badplatser på {island.name}
            </h2>
            <div style={{ display: 'grid', gap: 16 }}>
              {beaches.map((beach, i) => (
                isBeachObject(beach) ? (
                  <div key={i} style={{
                    background: 'var(--white)', borderRadius: 14,
                    padding: '20px 22px',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
                    border: '1px solid rgba(10,123,140,0.07)',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--sea)', background: 'rgba(10,123,140,0.08)', padding: '2px 10px', borderRadius: 20 }}>
                        {typeLabel[beach.type] ?? beach.type}
                      </span>
                      {beach.child_friendly && (
                        <span style={{ fontSize: 13, color: '#4a8c4a', background: 'rgba(74,140,74,0.08)', padding: '2px 10px', borderRadius: 20, fontWeight: 600 }}>
                          👶 Barnvänlig
                        </span>
                      )}
                    </div>
                    <div style={{ fontWeight: 700, fontSize: 17, color: 'var(--txt)', marginBottom: 6 }}>{beach.name}</div>
                    <div style={{ fontSize: 14, color: 'var(--txt2)', lineHeight: 1.6, marginBottom: beach.depth || beach.directions || beach.insider_tip ? 12 : 0 }}>
                      {beach.desc}
                    </div>
                    {beach.depth && (
                      <div style={{ fontSize: 13, color: 'var(--txt3)', marginBottom: 4 }}>
                        <span style={{ fontWeight: 600 }}>Djup: </span>{beach.depth}
                      </div>
                    )}
                    {beach.directions && (
                      <div style={{ fontSize: 13, color: 'var(--txt3)', marginBottom: 4 }}>
                        <span style={{ fontWeight: 600 }}>Vägbeskrivning: </span>{beach.directions}
                      </div>
                    )}
                    {beach.insider_tip && (
                      <div style={{ fontSize: 13, background: 'rgba(232,146,74,0.08)', borderLeft: '3px solid #e8924a', padding: '8px 12px', borderRadius: '0 8px 8px 0', marginTop: 10 }}>
                        <span style={{ fontWeight: 600, color: '#c07030' }}>Insidertips: </span>
                        <span style={{ color: 'var(--txt2)' }}>{beach.insider_tip}</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div key={i} style={{
                    background: 'var(--white)', borderRadius: 14,
                    padding: '18px 20px',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
                    border: '1px solid rgba(10,123,140,0.07)',
                    display: 'flex', alignItems: 'center', gap: 14,
                  }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 16, color: 'var(--txt)' }}>{beach}</div>
                      <div style={{ fontSize: 13, color: 'var(--txt3)', marginTop: 3 }}>Badplats på {island.name}</div>
                    </div>
                  </div>
                )
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
