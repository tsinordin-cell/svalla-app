import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ALL_ISLANDS, getIsland } from '../../island-data'
import IslandSubPageHeader from '@/components/IslandSubPageHeader'
import Icon from '@/components/Icon'
import { emojiToIcon } from '@/lib/iconMap'
import { ACTIVITY_LIST, islandActivitiesForType, type ActivityType } from '@/app/aktivitet/activity-data'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return ALL_ISLANDS.map(island => ({ slug: island.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const island = getIsland(slug)
  // SOFT-404-SKYDD: loading.tsx streamar svaret — 200 flushas före sidkroppen,
  // så bara ett notFound() HÄR (före headers) ger riktig 404-status. Se
  // motsvarande kommentar i o/[slug]/page.tsx och CLAUDE.md.
  if (!island) notFound()
  const title = `Aktiviteter på ${island.name} — vad göra 2026 | Svalla`
  const description = `Allt du kan göra på ${island.name}: ${island.activities.slice(0, 3).map(a => a.name.toLowerCase()).join(', ')} och mer. Komplett aktivitetsguide.`
  return {
    title,
    description,
    keywords: [
      `aktiviteter ${island.name.toLowerCase()}`,
      `vad göra ${island.name.toLowerCase()}`,
      `${island.name.toLowerCase()} upplevelser`,
      `${island.name.toLowerCase()} skärgård`,
    ],
    alternates: { canonical: `https://svalla.se/o/${slug}/aktiviteter` },
    openGraph: {
      title,
      description,
      url: `https://svalla.se/o/${slug}/aktiviteter`,
      type: 'article',
      images: [{ url: `https://svalla.se/api/og/island/${slug}`, width: 1200, height: 630 }],
    },
  }
}

export default async function IslandAktiviteterPage({ params }: Props) {
  const { slug } = await params
  const island = getIsland(slug)
  if (!island) notFound()

  // Aktivitetstyper där denna ö förekommer (cross-länkar till /aktivitet/[type]/[slug])
  const matchingTypes = ACTIVITY_LIST.filter(a =>
    islandActivitiesForType(island, a.slug as ActivityType).length > 0
  )

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Hem',        item: 'https://svalla.se' },
              { '@type': 'ListItem', position: 2, name: 'Öar',        item: 'https://svalla.se/oar' },
              { '@type': 'ListItem', position: 3, name: island.name,  item: `https://svalla.se/o/${slug}` },
              { '@type': 'ListItem', position: 4, name: 'Aktiviteter', item: `https://svalla.se/o/${slug}/aktiviteter` },
            ],
          }),
        }}
      />
      {island.activities.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ItemList',
              name: `Aktiviteter på ${island.name}`,
              url: `https://svalla.se/o/${slug}/aktiviteter`,
              numberOfItems: island.activities.length,
              itemListElement: island.activities.map((a, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                name: a.name,
                description: a.desc,
              })),
            }),
          }}
        />
      )}

      <IslandSubPageHeader
        island={island}
        tab="aktiviteter"
        subtitle={
          island.activities.length === 0
            ? `Inga registrerade aktiviteter för ${island.name} ännu.`
            : `${island.activities.length} aktiviteter och upplevelser på ${island.name}.`
        }
      />

      <main style={{ maxWidth: 900, margin: '-24px auto 0', padding: '0 16px 60px' }}>

        {island.activities.length === 0 ? (
          <div style={{
            background: 'var(--white)', padding: 24, borderRadius: 14,
            fontSize: 14, color: 'var(--txt2)', border: '1px solid var(--surface-3)',
          }}>
            Inga aktiviteter är registrerade för {island.name} ännu.{' '}
            <Link href={`/o/${slug}`} style={{ color: 'var(--sea)' }}>
              Läs hela ö-guiden
            </Link>{' '}
            för mer information.
          </div>
        ) : (
          <>
            {/* Aktivitetskort */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 14, marginBottom: 40 }}>
              {island.activities.map(act => (
                <div key={act.name} style={{
                  background: 'var(--white)', borderRadius: 14,
                  padding: '20px 22px',
                  border: '1px solid var(--surface-3)',
                  borderLeft: '3px solid var(--sea)',
                }}>
                  <div style={{
                    width: 38, height: 38, borderRadius: 10,
                    background: 'rgba(45,125,138,0.12)', color: 'var(--sea)',
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: 12,
                  }}>
                    <Icon name={emojiToIcon(act.icon)} size={19} stroke={1.85} />
                  </div>
                  <h2 style={{ fontSize: 15, fontWeight: 700, color: 'var(--txt)', margin: '0 0 6px' }}>
                    {act.name}
                  </h2>
                  <p style={{ fontSize: 13, color: 'var(--txt2)', margin: 0, lineHeight: 1.65 }}>
                    {act.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Cross-länk till aktivitetstyp-sidor */}
            {matchingTypes.length > 0 && (
              <section style={{ marginBottom: 40 }}>
                <h2 style={{
                  fontSize: 17, fontWeight: 700, color: 'var(--txt)',
                  margin: '0 0 14px',
                  fontFamily: "'Playfair Display', Georgia, serif",
                }}>
                  Utforska aktiviteter djupare
                </h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {matchingTypes.map(a => (
                    <Link
                      key={a.slug}
                      href={`/aktivitet/${a.slug}/${slug}`}
                      style={{
                        padding: '9px 16px', borderRadius: 999,
                        background: 'var(--white)', color: 'var(--sea)',
                        textDecoration: 'none', fontSize: 13, fontWeight: 600,
                        border: '1px solid var(--surface-3)',
                        display: 'inline-flex', alignItems: 'center', gap: 6,
                      }}
                    >
                      <Icon name="arrowRight" size={13} stroke={2.2} />
                      {a.name} på {island.name}
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Tips */}
            {island.tips && island.tips.length > 0 && (
              <section style={{ marginBottom: 40 }}>
                <h2 style={{
                  fontSize: 17, fontWeight: 700, color: 'var(--txt)',
                  margin: '0 0 14px',
                  fontFamily: "'Playfair Display', Georgia, serif",
                }}>
                  Tips inför besöket
                </h2>
                <div style={{
                  background: 'linear-gradient(135deg, rgba(30,92,130,0.05) 0%, rgba(45,125,138,0.05) 100%)',
                  borderRadius: 14, padding: '20px 24px',
                  border: '1px solid rgba(30,92,130,0.10)',
                }}>
                  {island.tips.map((tip, i) => (
                    <div key={i} style={{
                      display: 'flex', gap: 10,
                      marginBottom: i < island.tips.length - 1 ? 14 : 0,
                      paddingBottom: i < island.tips.length - 1 ? 14 : 0,
                      borderBottom: i < island.tips.length - 1 ? '1px solid rgba(30,92,130,0.08)' : 'none',
                    }}>
                      <span style={{ fontSize: 16, lineHeight: 1.5, flexShrink: 0, color: 'var(--sea)', fontWeight: 700 }}>→</span>
                      <p style={{ fontSize: 13.5, color: 'var(--txt2)', margin: 0, lineHeight: 1.65 }}>{tip}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </>
        )}

        {/* CTA — tillbaka till ö-guiden */}
        <Link href={`/o/${slug}`} style={{ textDecoration: 'none', display: 'block' }}>
          <div style={{
            background: 'linear-gradient(135deg, #1a3a5c 0%, #2d7d8a 100%)',
            borderRadius: 16, padding: '20px 24px',
            display: 'flex', alignItems: 'center', gap: 16,
            boxShadow: '0 4px 20px rgba(30,92,130,0.18)',
          }}>
            <div style={{
              width: 44, height: 44, borderRadius: 12, flexShrink: 0,
              background: 'rgba(255,255,255,0.14)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Icon name="map" size={20} stroke={1.8} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginBottom: 4 }}>
                Vill du veta mer?
              </div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#fff', fontFamily: "'Playfair Display', Georgia, serif" }}>
                Fullständig guide till {island.name}
              </div>
            </div>
            <Icon name="arrowRight" size={18} stroke={2.2} />
          </div>
        </Link>
      </main>
    </div>
  )
}
