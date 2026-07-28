import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ALL_ISLANDS } from '@/app/o/island-data'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  // Alla öar förgenereras, inte bara de med transport_meta. Sidan renderar
  // redan utan transport_meta (allt som använder `tm` är villkorat), och de
  // 73 öar som saknade fältet hamnade annars i on-demand-rendering.
  return ALL_ISLANDS.map(i => ({ slug: i.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const island = ALL_ISLANDS.find(i => i.slug === slug)
  if (!island) return {}

  const title = `Hur tar man sig till ${island.name}? Båt, buss och tips | Svalla`
  const description = `Steg-för-steg guide: hur du tar dig till ${island.name} med kollektivtrafik, bil och egen båt. Restider, avgångar och praktiska tips.`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://svalla.se/ta-dig-till/${slug}`,
    },
    alternates: { canonical: `https://svalla.se/ta-dig-till/${slug}` },
    robots: { index: true, follow: true },
  }
}

export const revalidate = 86400

export default async function TaDigTillPage({ params }: Props) {
  const { slug } = await params
  const island = ALL_ISLANDS.find(i => i.slug === slug)
  if (!island) notFound()

  const tm = island.transport_meta
  const gt = island.getting_there ?? []

  // `facts` är Record<string, string> och nycklarna varierar mellan öarna —
  // Bohuslän-datan använder t.ex. area/population/known_for i stället för
  // travel_time/character/best_for. Utan fallbacks renderas "undefined" i
  // både JSON-LD och faktarutan.
  const facts = island.facts ?? {}
  const factTravelTime = facts.travel_time ?? facts.area ?? ''
  const factCharacter  = facts.character   ?? facts.known_for ?? ''
  const factSeason     = facts.season      ?? ''
  const factBestFor    = facts.best_for    ?? facts.population ?? ''

  // ── BusTrip JSON-LD ────────────────────────────────────────────
  const busTrips = gt
    .filter(t => t.method.toLowerCase().includes('båt') || t.method.toLowerCase().includes('waxholm') || t.method.toLowerCase().includes('cinderella'))
    .map(t => ({
      '@type': 'BusTrip',
      name: `${t.method} till ${island.name}`,
      departureBusStop: {
        '@type': 'BusStop',
        name: t.from ?? 'Stockholm',
        address: { '@type': 'PostalAddress', addressLocality: 'Stockholm', addressCountry: 'SE' },
      },
      arrivalBusStop: {
        '@type': 'BusStop',
        name: `${island.name} brygga`,
        address: { '@type': 'PostalAddress', addressLocality: island.name, addressCountry: 'SE' },
      },
      provider: {
        '@type': 'Organization',
        name: tm?.operator ?? 'Waxholmsbolaget',
        url: tm?.booking_url ?? 'https://waxholmsbolaget.se',
      },
      ...(t.time ? { estimatedFlightDuration: `PT${tm?.from_city_min ?? 90}M` } : {}),
    }))

  // ── HowTo JSON-LD ──────────────────────────────────────────────
  const howTo = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `Hur tar man sig till ${island.name}?`,
    description: `Steg-för-steg guide för att ta sig till ${island.name} med kollektivtrafik.`,
    totalTime: `PT${tm?.from_city_min ?? 90}M`,
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Ta dig till avgångsbryggan',
        text: tm?.nearest_hub
          ? `Åk till ${tm.nearest_hub}. ${tm.car_parking ?? ''}`
          : 'Ta dig till Strömkajen i Stockholm.',
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: `Ta båten till ${island.name}`,
        text: tm
          ? `${tm.operator} trafikerar ${island.name}. ${tm.frequency}. Restid från ${tm.nearest_hub}: ca ${tm.from_nearest_hub_min} min.`
          : `Ta båten till ${island.name}.`,
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: `Anländer till ${island.name}`,
        text: `Du kliver av vid ${island.name}s brygga.${factTravelTime ? ` ${factTravelTime}.` : ''}`,
      },
    ],
  }

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Hem', item: 'https://svalla.se' },
      { '@type': 'ListItem', position: 2, name: 'Ta dig till', item: 'https://svalla.se/ta-dig-till' },
      { '@type': 'ListItem', position: 3, name: island.name, item: `https://svalla.se/ta-dig-till/${slug}` },
    ],
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: 80 }}>
      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howTo) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      {busTrips.map((bt, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', ...bt }) }} />
      ))}

      {/* Header */}
      <div style={{ background: 'var(--grad-sea-hero)', padding: '0 20px 44px', paddingTop: 'calc(env(safe-area-inset-top, 0px) + 16px)' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <Link href={`/o/${island.slug}`} style={{ color: 'var(--white)', opacity: 0.8, fontSize: 14, textDecoration: 'none', display: 'inline-block', marginBottom: 16 }}>
            ← {island.name}
          </Link>
          <h1 style={{ fontSize: 'clamp(24px, 5vw, 36px)', fontWeight: 800, color: 'var(--white)', margin: 0 }}>
            Hur tar man sig till {island.name}?
          </h1>
          <p style={{ color: 'var(--white)', opacity: 0.85, marginTop: 10, fontSize: 16, lineHeight: 1.6 }}>
            {island.tagline}
          </p>
          {tm && (
            <div style={{ display: 'flex', gap: 12, marginTop: 20, flexWrap: 'wrap' }}>
              <span style={{ background: 'rgba(255,255,255,0.2)', color: 'var(--white)', borderRadius: 20, padding: '6px 14px', fontSize: 14, fontWeight: 600 }}>
                ⏱ {tm.from_city_min} min från city
              </span>
              <span style={{ background: 'rgba(255,255,255,0.2)', color: 'var(--white)', borderRadius: 20, padding: '6px 14px', fontSize: 14, fontWeight: 600 }}>
                ⛴ {tm.operator}
              </span>
            </div>
          )}
        </div>
      </div>

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '32px 20px' }}>

        {/* Steg-för-steg */}
        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--ink)', marginBottom: 20 }}>
            Steg-för-steg — med kollektivtrafik
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {gt.map((t, i) => (
              <div key={i} style={{ background: 'var(--white)', borderRadius: 14, padding: '20px 22px', border: '1px solid var(--surface-3)', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 28, flexShrink: 0 }}>{t.icon}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 16, color: 'var(--ink)', marginBottom: 4 }}>
                    {t.method}
                    {t.from && <span style={{ fontWeight: 400, color: 'var(--ink-muted)', fontSize: 14 }}> från {t.from}</span>}
                  </div>
                  {t.time && (
                    <div style={{ fontSize: 13, color: 'var(--sea)', fontWeight: 600, marginBottom: 6 }}>⏱ {t.time}</div>
                  )}
                  <p style={{ fontSize: 14, color: 'var(--ink-muted)', margin: 0, lineHeight: 1.6 }}>{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Parkering & praktisk info */}
        {tm?.car_parking && (
          <section style={{ marginBottom: 40, background: 'var(--surface-2)', borderRadius: 14, padding: '20px 22px' }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--ink)', marginBottom: 10 }}>
              🚗 Parkering & biltrafik
            </h2>
            <p style={{ fontSize: 15, color: 'var(--ink-muted)', margin: 0, lineHeight: 1.7 }}>{tm.car_parking}</p>
          </section>
        )}

        {/* Avgångstider */}
        {tm && (
          <section style={{ marginBottom: 40 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--ink)', marginBottom: 12 }}>
              📅 Avgångsfrekvens
            </h2>
            <div style={{ background: 'var(--white)', borderRadius: 12, padding: '16px 20px', border: '1px solid var(--surface-3)' }}>
              <div style={{ fontSize: 15, color: 'var(--ink)', marginBottom: 6 }}>
                <strong>{tm.operator}</strong>{tm.line ? ` · Linje ${tm.line}` : ''}
              </div>
              <div style={{ fontSize: 14, color: 'var(--ink-muted)', marginBottom: 12 }}>{tm.frequency}</div>
              {tm.booking_url && (
                <a href={tm.booking_url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 14, color: 'var(--sea)', fontWeight: 600, textDecoration: 'none' }}>
                  Se aktuella tidtabeller →
                </a>
              )}
            </div>
          </section>
        )}

        {/* Facts */}
        <section style={{ marginBottom: 40, background: 'var(--surface-2)', borderRadius: 14, padding: '20px 22px' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--ink)', marginBottom: 14 }}>
            Snabbfakta om {island.name}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
            {[
              { label: 'Restid', value: factTravelTime },
              { label: 'Karaktär', value: factCharacter },
              { label: 'Säsong', value: factSeason },
              { label: 'Bäst för', value: factBestFor },
            ].filter(f => f.value).map(f => (
              <div key={f.label}>
                <div style={{ fontSize: 12, color: 'var(--ink-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>{f.label}</div>
                <div style={{ fontSize: 14, color: 'var(--ink)', lineHeight: 1.5 }}>{f.value}</div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA till ö-sida */}
        <div style={{ textAlign: 'center', padding: '24px 0' }}>
          <Link href={`/o/${island.slug}`} style={{
            display: 'inline-block',
            background: 'var(--sea)',
            color: 'var(--white)',
            padding: '14px 28px',
            borderRadius: 50,
            fontWeight: 700,
            fontSize: 16,
            textDecoration: 'none',
          }}>
            Utforska {island.name} →
          </Link>
        </div>
      </div>
    </div>
  )
}
