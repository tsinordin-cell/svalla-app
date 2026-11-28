/**
 * /ta-dig-till — Listsida med alla transport-sidor per ö.
 *
 * Grupperar per region för bättre översikt. ItemList Schema.
 */
import { serializeForScript } from '@/lib/serializeForScript'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ALL_ISLANDS } from '../o/island-data'
import { getIslandTransit } from '@/lib/transit-stops'
import Icon from '@/components/Icon'
import { emojiToIcon } from '@/lib/iconMap'
import { ogSida } from '@/lib/og-standard'

// RÄTTAD 2026-11-28 (fas 3, f300b-0097, f300b-0098): "Komplett guide" och "alla skärgårdsöar" lovade mer än sidan har.
// Runda 2 (f300b-0097 till f300b-0099): ingen ö har snabbåt som färdsätt, 40 öar saknar restid, och "alla öar" lovade mer än listan.
// Runda 3 (f300b-0097 till f300b-0099, f300b-0102): ALL_ISLANDS har 144 poster, 133 öar, 7 orter, 3 naturreservat och nationalparken Kosterhavet (MÄTT), därför "öar och platser".
export const metadata: Metadata = {
  title: `Hur tar man sig till öarna? Transport till ${ALL_ISLANDS.length} öar och platser`,
  description: `Så tar du dig till ${ALL_ISLANDS.length} öar och platser med färja, buss eller egen båt. Linjer, restider och praktiska tips står med där de finns.`,
  alternates: { canonical: 'https://svalla.se/ta-dig-till' },
  openGraph: {
    images: ogSida('https://svalla.se/ta-dig-till'),
    title: 'Transport till skärgårdens öar',
    description: `Hur du tar dig till ${ALL_ISLANDS.length} öar och platser, med linjer och restider där de finns.`,
    url: 'https://svalla.se/ta-dig-till',
  },
}

export default function TaDigTillIndex() {
  // RÄTTAD 2026-11-28 (fas 3, f300b-0100): goteborg och ovriga saknades, så 68 av öarna i räkningen syntes inte.
  // Etiketterna är desamma som på /oar (src/app/oar/page.tsx).
  const byRegion: Record<string, typeof ALL_ISLANDS> = {
    mellersta: [],
    norra: [],
    södra: [],
    goteborg: [],
    bohuslan: [],
    ovriga: [],
  }
  for (const island of ALL_ISLANDS) {
    byRegion[island.region]?.push(island)
  }

  const regionConfig: Record<string, { label: string; color: string }> = {
    mellersta: { label: 'Mellersta skärgården', color: '#1e5c82' },
    norra: { label: 'Norra skärgården', color: '#1a5276' },
    södra: { label: 'Södra skärgården', color: '#0d6e6e' },
    goteborg: { label: 'Göteborgs skärgård', color: '#2e6878' },
    bohuslan: { label: 'Bohuslän & Västkusten', color: '#2e6878' },
    ovriga: { label: 'Övriga Sverige', color: '#1e5c82' },
  }

  // Schema.org ItemList
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Transport till skärgårdens öar',
    numberOfItems: ALL_ISLANDS.length,
    itemListElement: ALL_ISLANDS.map((i, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      // f300b-0101: /ta-dig-till/[ö] skickas vidare (308) till komma-dit; listan pekar dit direkt, som korten.
      url: `https://svalla.se/o/${i.slug}/komma-dit`,
      name: `Hur tar man sig till ${i.name}`,
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeForScript(itemListSchema) }}
      />

      <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: 80 }}>

        {/* Hero */}
        <div style={{
          background: 'linear-gradient(160deg, #1e5c82 0%, #0d6e6e 100%)',
          paddingTop: 'calc(env(safe-area-inset-top, 0px))',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: -60, right: -60,
            width: 280, height: 280, borderRadius: '50%',
            background: 'rgba(255,255,255,0.04)', pointerEvents: 'none',
          }} />

          <div style={{ maxWidth: 800, margin: '0 auto', padding: '40px 20px 40px', position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
              <span style={{
                background: 'rgba(255,255,255,0.18)', color: '#fff',
                fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em',
                padding: '4px 12px', borderRadius: 20,
              }}>
                Transport
              </span>
            </div>
            <h1 style={{
              fontFamily: 'var(--font-display, "Playfair Display", Georgia, serif)',
              fontSize: 'clamp(28px, 4.5vw, 44px)',
              fontWeight: 800, color: '#fff',
              margin: '0 0 14px', lineHeight: 1.2,
            }}>
              Hur tar man sig till skärgården?
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.78)', fontSize: 16, lineHeight: 1.6, margin: 0, maxWidth: 620 }}>
              {/* f300b-0103: "längs hela kusten" stämde inte för öar i sjöar (Visingsö i Vättern).
                  Runda 2 (f300b-0102): 40 öar saknar restid, så restid och linjer står med där de finns.
                  Runda 3: listan har öar, orter, naturreservat och en nationalpark, därför "öar och platser". */}
              Hur du tar dig till {ALL_ISLANDS.length} öar och platser. Linjer, restider och biljetter står med där de finns.
            </p>
          </div>

          <svg viewBox="0 0 1440 40" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: 40, marginBottom: -1 }}>
            <path d="M0,20 C360,40 1080,0 1440,20 L1440,40 L0,40 Z" fill="var(--bg, #f8f7f4)" />
          </svg>
        </div>

        {/* Regions */}
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '24px 20px 0' }}>
          {Object.entries(byRegion).map(([region, islands]) => {
            if (islands.length === 0) return null
            const cfg = regionConfig[region] ?? { label: region, color: '#1e5c82' }
            return (
              <section key={region} style={{ marginBottom: 36 }}>
                <h2 style={{
                  fontSize: 20, fontWeight: 700,
                  color: cfg.color,
                  margin: '0 0 14px',
                  paddingBottom: 8,
                  borderBottom: `2px solid ${cfg.color}22`,
                }}>
                  {cfg.label} <span style={{ color: 'var(--txt3)', fontWeight: 600, fontSize: 14 }}>({islands.length})</span>
                </h2>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                  gap: 10,
                }}>
                  {islands.map(island => {
                    const hasLive = !!getIslandTransit(island.slug)
                    return (
                      <Link key={island.slug} href={`/o/${island.slug}/komma-dit`} style={{ textDecoration: 'none' }}>
                        <div style={{
                          background: 'var(--white)',
                          borderRadius: 12,
                          padding: '14px 16px',
                          boxShadow: '0 1px 6px rgba(0,0,0,0.04)',
                          border: '1px solid rgba(10,123,140,0.06)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 10,
                        }}>
                          <div style={{
                            width: 32, height: 32, flexShrink: 0,
                            borderRadius: 8,
                            background: `${cfg.color}14`,
                            color: cfg.color,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                          }}>
                            <Icon name={emojiToIcon(island.emoji)} size={18} stroke={1.8} />
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--txt)' }}>
                              {island.name}
                            </div>
                            {hasLive && (
                              <div style={{ fontSize: 11, color: '#16a34a', fontWeight: 700, marginTop: 2 }}>
                                {/* f300b-0104: avgångarna visas på ösidan, inte på komma-dit som kortet länkar till, och de är tidtabellsdata. */}
                                Avgångar på ösidan
                              </div>
                            )}
                          </div>
                          <span style={{ color: cfg.color, fontWeight: 700, fontSize: 16 }}>→</span>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </section>
            )
          })}
        </div>
      </div>
    </>
  )
}
