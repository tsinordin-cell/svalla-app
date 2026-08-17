import type { Metadata } from 'next'
import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import SvallaLogo from '@/components/SvallaLogo'
import { HIKES, REGIONS, type Hike } from '../hike-data'
import { HIKE_DESCRIPTIONS } from '../hike-descriptions'
import Icon, { type IconName } from '@/components/Icon'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return HIKES.map(h => ({ slug: h.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const hike = HIKES.find(h => h.slug === slug)
  if (!hike) return {}
  const region = REGIONS.find(r => r.id === hike.region)
  return {
    title: `Vandra ${hike.name} — guide, led och tips`,
    description: `${hike.tagline} ${hike.distanceKm > 0 ? `${hike.distanceKm} km, ` : ''}${hike.durationMin}–${hike.durationMax} timmar. ${hike.transport}.`,
    keywords: [
      `vandra ${hike.name.toLowerCase()}`,
      `vandring ${hike.name.toLowerCase()}`,
      `${hike.name.toLowerCase()} vandringsleder`,
      region?.name.toLowerCase() ?? '',
    ],
    alternates: { canonical: `https://svalla.se/aktivitet/vandring/${hike.slug}` },
    openGraph: {
      title: `Vandra ${hike.name}`,
      description: hike.tagline,
      url: `https://svalla.se/aktivitet/vandring/${hike.slug}`,
    },
  }
}

const REGION_LABEL: Record<string, string> = {
  'stockholms-skargard': 'Stockholms skärgård',
  'bohuslan': 'Bohuslän',
  'goteborg-skargard': 'Göteborgs skärgård',
  'gotland': 'Gotland',
  'hoga-kusten': 'Höga kusten',
  'blekinge': 'Blekinge skärgård',
  'oland': 'Öland',
  'skane': 'Skånes kust',
  'sormland': 'Sörmlands skärgård',
  'ostgota': 'Östgötaskärgården',
  'smalandskusten': 'Smålandskusten',
  'halland': 'Hallandskusten',
}

const DIFFICULTY_COLOR: Record<string, string> = {
  'lätt': '#22c55e',
  'medel': '#f59e0b',
  'krävande': '#ef4444',
}

const DIFFICULTY_DESC: Record<string, string> = {
  'lätt': 'Passar alla — inklusive barn och de som inte vandrar ofta. Tydlig stig, liten höjdskillnad.',
  'medel': 'Kräver bekväma skor. Kan ha ojämn terräng, rotstupor och kortare branter.',
  'krävande': 'Längre led eller brantare terräng. Kräver vandringskängor och erfarenhet.',
}

function Tag({ icon, label, active }: { icon: IconName; label: string; active: boolean }) {
  if (!active) return null
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: '5px 12px', borderRadius: 999,
      background: 'var(--surface-2)', border: '1px solid var(--surface-3)',
      fontSize: 12, color: 'var(--txt2)',
    }}>
      <Icon name={icon} size={13} stroke={2} />{label}
    </span>
  )
}

export default async function VandringHikePage({ params }: Props) {
  const { slug } = await params
  const hike = HIKES.find(h => h.slug === slug)
  if (!hike) notFound()

  const region = REGIONS.find(r => r.id === hike.region)
  const regionLabel = REGION_LABEL[hike.region] ?? hike.region
  const desc = HIKE_DESCRIPTIONS[hike.slug]

  // Nearby hikes in same region
  const nearby = HIKES.filter(h => h.region === hike.region && h.slug !== hike.slug).slice(0, 5)

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Hem', item: 'https://svalla.se' },
      { '@type': 'ListItem', position: 2, name: 'Vandring', item: 'https://svalla.se/aktivitet/vandring' },
      { '@type': 'ListItem', position: 3, name: hike.name, item: `https://svalla.se/aktivitet/vandring/${hike.slug}` },
    ],
  }

  const touristAttraction = {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    name: `Vandra ${hike.name}`,
    description: hike.tagline,
    url: `https://svalla.se/aktivitet/vandring/${hike.slug}`,
    touristType: [
      ...(hike.suitableForChildren ? ['Barnfamiljer'] : []),
      ...(hike.ferryRequired ? ['Skärgårdsresenärer'] : []),
      ...(hike.hasBathing ? ['Badgäster'] : []),
      'Vandrare',
    ],
    additionalType: 'https://schema.org/ExerciseAction',
    isAccessibleForFree: true,
    ...(hike.distanceKm > 0 ? {
      amenityFeature: [
        { '@type': 'LocationFeatureSpecification', name: 'Längd', value: `${hike.distanceKm} km` },
        { '@type': 'LocationFeatureSpecification', name: 'Svårighet', value: hike.difficulty },
        { '@type': 'LocationFeatureSpecification', name: 'Uppskattad tid', value: `${hike.durationMin}–${hike.durationMax} timmar` },
        { '@type': 'LocationFeatureSpecification', name: 'Bästa säsong', value: hike.bestSeason },
        ...(hike.hasBathing ? [{ '@type': 'LocationFeatureSpecification', name: 'Badmöjligheter', value: true }] : []),
        ...(hike.hasRestaurant ? [{ '@type': 'LocationFeatureSpecification', name: 'Restaurang', value: true }] : []),
      ],
    } : {}),
    ...(desc?.tips && desc.tips.length > 0 ? {
      subjectOf: {
        '@type': 'HowTo',
        name: `Hur du vandrar ${hike.name}`,
        description: hike.tagline,
        ...(hike.distanceKm > 0 ? { estimatedCost: { '@type': 'MonetaryAmount', currency: 'SEK', value: '0' } } : {}),
        step: desc.tips.map((tip, i) => ({
          '@type': 'HowToStep',
          position: i + 1,
          text: tip,
        })),
      },
    } : {}),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(touristAttraction) }} />

      <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>

        {/* Nav */}
        <nav style={{
          background: 'linear-gradient(160deg, #1e5c82 0%, #2d7d8a 100%)',
          padding: '18px 24px 16px',
        }}>
          <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', justifyContent: 'space-between' }}>
            <Link href="/" style={{ textDecoration: 'none' }}>
              <SvallaLogo height={24} color="#ffffff" />
            </Link>
            <Link
              href="/aktivitet/vandring"
              style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, textDecoration: 'none' }}
            >
              ← Alla vandringar
            </Link>
          </div>
        </nav>

        {/* Hero */}
        <header style={{
          background: 'linear-gradient(170deg, #1e5c82 0%, #2d7d8a 100%)',
          padding: '40px 24px 56px', color: '#fff',
        }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <div style={{
              fontSize: 11, opacity: 0.8,
              letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 8,
            }}>
              Vandring · {regionLabel}
            </div>
            <h1 style={{
              fontSize: 'clamp(26px, 5vw, 38px)',
              fontWeight: 700, margin: '0 0 12px',
              fontFamily: "'Playfair Display', Georgia, serif",
              lineHeight: 1.2,
            }}>
              Vandra {hike.name}
            </h1>
            <p style={{ fontSize: 16, lineHeight: 1.6, maxWidth: 620, opacity: 0.92, margin: 0 }}>
              {hike.tagline}
            </p>
          </div>
        </header>

        <main style={{ maxWidth: 900, margin: '-24px auto 0', padding: '0 16px 72px' }}>

          {/* Snabbfakta */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: 10, marginBottom: 24,
          }}>
            {hike.distanceKm > 0 && (
              <div style={{ background: 'var(--white)', border: '1px solid var(--surface-3)', borderRadius: 12, padding: '14px 16px' }}>
                <div style={{ fontSize: 11, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 4 }}>Längd</div>
                <div style={{ fontSize: 18, color: 'var(--txt)', fontWeight: 700 }}>{hike.distanceKm} km</div>
              </div>
            )}
            <div style={{ background: 'var(--white)', border: '1px solid var(--surface-3)', borderRadius: 12, padding: '14px 16px' }}>
              <div style={{ fontSize: 11, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 4 }}>Tid</div>
              <div style={{ fontSize: 18, color: 'var(--txt)', fontWeight: 700 }}>
                {hike.durationMin}–{hike.durationMax} h
              </div>
            </div>
            <div style={{ background: 'var(--white)', border: '1px solid var(--surface-3)', borderRadius: 12, padding: '14px 16px' }}>
              <div style={{ fontSize: 11, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 4 }}>Svårighet</div>
              <div style={{
                fontSize: 15, fontWeight: 700,
                color: DIFFICULTY_COLOR[hike.difficulty] ?? 'var(--txt)',
                textTransform: 'capitalize',
              }}>
                {hike.difficulty}
              </div>
            </div>
            <div style={{ background: 'var(--white)', border: '1px solid var(--surface-3)', borderRadius: 12, padding: '14px 16px' }}>
              <div style={{ fontSize: 11, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 4 }}>Bästa säsong</div>
              <div style={{ fontSize: 13, color: 'var(--txt)', fontWeight: 600 }}>{hike.bestSeason}</div>
            </div>
          </div>

          {/* Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>
            <Tag icon="ship" label="Utan bil" active={!hike.carRequired} />
            <Tag icon="anchor" label="Kräver färja" active={hike.ferryRequired} />
            <Tag icon="swim" label="Bad längs vägen" active={hike.hasBathing} />
            <Tag icon="utensils" label="Restaurang" active={hike.hasRestaurant} />
            <Tag icon="coffee" label="Café" active={hike.hasCafe} />
            <Tag icon="child" label="Barnvänligt" active={hike.suitableForChildren} />
            <Tag icon="dog" label="Hundvänligt" active={hike.suitableForDogs} />
          </div>

          {/* Description */}
          {desc?.body && (
            <section style={{
              background: 'var(--white)', border: '1px solid var(--surface-3)',
              borderRadius: 14, padding: '20px 22px', marginBottom: 20,
            }}>
              <h2 style={{
                fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '0 0 10px',
                fontFamily: "'Playfair Display', Georgia, serif",
              }}>
                Om vandringen
              </h2>
              <p style={{ fontSize: 15, color: 'var(--txt2)', lineHeight: 1.7, margin: 0 }}>
                {desc.body}
              </p>
            </section>
          )}

          {/* Tips */}
          {desc?.tips && desc.tips.length > 0 && (
            <section style={{
              background: '#f0f9ff', border: '1px solid #bae6fd',
              borderRadius: 14, padding: '20px 22px', marginBottom: 20,
            }}>
              <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--txt)', margin: '0 0 10px' }}>
                Tips inför vandringen
              </h2>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: 8 }}>
                {desc.tips.map((tip, i) => (
                  <li key={i} style={{ display: 'flex', gap: 10, fontSize: 13, color: 'var(--txt2)', lineHeight: 1.6 }}>
                    <span style={{
                      flexShrink: 0, marginTop: 3,
                      width: 18, height: 18, borderRadius: 999,
                      background: 'var(--sea)', color: '#fff',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 10, fontWeight: 700,
                    }}>
                      {i + 1}
                    </span>
                    {tip}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Transport */}
          <section style={{
            background: 'var(--white)', border: '1px solid var(--surface-3)',
            borderRadius: 14, padding: '20px 22px', marginBottom: 20,
          }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--txt)', margin: '0 0 8px' }}>
              Hur tar man sig dit?
            </h2>
            <p style={{ fontSize: 14, color: 'var(--txt2)', lineHeight: 1.65, margin: 0 }}>
              {hike.transport}
            </p>
            {hike.carRequired && (
              <p style={{ fontSize: 12, color: 'var(--txt3)', margin: '8px 0 0', fontStyle: 'italic' }}>
                Bil rekommenderas eller krävs för att nå denna vandring.
              </p>
            )}
          </section>

          {/* Svårighet */}
          <section style={{
            background: 'var(--white)', border: '1px solid var(--surface-3)',
            borderRadius: 14, padding: '20px 22px', marginBottom: 20,
          }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--txt)', margin: '0 0 8px' }}>
              Svårighetsgrad:{' '}
              <span style={{ color: DIFFICULTY_COLOR[hike.difficulty], textTransform: 'capitalize' }}>
                {hike.difficulty}
              </span>
            </h2>
            <p style={{ fontSize: 14, color: 'var(--txt2)', lineHeight: 1.65, margin: 0 }}>
              {DIFFICULTY_DESC[hike.difficulty]}
            </p>
          </section>

          {/* Praktisk info */}
          <section style={{
            background: 'var(--white)', border: '1px solid var(--surface-3)',
            borderRadius: 14, padding: '20px 22px', marginBottom: 20,
          }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--txt)', margin: '0 0 12px' }}>
              Praktisk information
            </h2>
            <div style={{ display: 'grid', gap: 8 }}>
              {[
                { label: 'Bad längs vägen', value: hike.hasBathing ? 'Ja — det finns badplatser längs leden' : 'Inga markerade badplatser längs leden' },
                { label: 'Mat och dryck', value: hike.hasRestaurant && hike.hasCafe ? 'Restaurang och café finns' : hike.hasRestaurant ? 'Restaurang finns' : hike.hasCafe ? 'Café finns' : 'Ingen servering — ta med mat och vatten' },
                { label: 'Hund', value: hike.suitableForDogs ? 'Hund välkommen — kontrollera alltid lokala reservatsregler' : 'Kontrollera lokala regler — kan ha begränsningar' },
                { label: 'Barn', value: hike.suitableForChildren ? 'Passar familjer med barn' : 'Bättre lämpad för vuxna och äldre barn med vandringsvana' },
                { label: 'Region', value: regionLabel },
              ].map(row => (
                <div key={row.label} style={{
                  display: 'flex', gap: 12,
                  paddingBottom: 8, borderBottom: '1px solid var(--surface-3)',
                }}>
                  <span style={{ fontSize: 12, color: 'var(--txt3)', fontWeight: 600, minWidth: 120, flexShrink: 0 }}>
                    {row.label}
                  </span>
                  <span style={{ fontSize: 13, color: 'var(--txt2)', lineHeight: 1.5 }}>
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Thorkel CTA */}
          <section style={{
            background: 'linear-gradient(135deg, #1e5c82 0%, #2d7d8a 100%)',
            borderRadius: 14, padding: '24px 24px',
            marginBottom: 28, color: '#fff',
          }}>
            <h2 style={{
              fontSize: 18, fontWeight: 700, margin: '0 0 8px',
              fontFamily: "'Playfair Display', Georgia, serif",
            }}>
              Planera hela dagen kring {hike.name}
            </h2>
            <p style={{ fontSize: 13, lineHeight: 1.6, opacity: 0.92, margin: '0 0 16px' }}>
              Thorkel sätter ihop färjor, tider och mat — du berättar bara vad du vill.
            </p>
            <Link
              href="/thorkel"
              style={{
                display: 'inline-block', padding: '10px 20px',
                background: '#fff', color: '#1e5c82',
                borderRadius: 8, textDecoration: 'none',
                fontWeight: 700, fontSize: 13,
              }}
            >
              Planera med Thorkel →
            </Link>
          </section>

          {/* Island link */}
          {hike.islandSlug && (
            <div style={{
              background: 'var(--white)', border: '1px solid var(--surface-3)',
              borderRadius: 12, padding: '16px 18px', marginBottom: 16,
            }}>
              <div style={{ fontSize: 12, color: 'var(--txt3)', marginBottom: 4 }}>Mer om ön</div>
              <Link
                href={`/o/${hike.islandSlug}`}
                style={{ fontSize: 15, fontWeight: 700, color: 'var(--sea)', textDecoration: 'none' }}
              >
                Hela guiden till {hike.name} →
              </Link>
            </div>
          )}

          {/* Nearby hikes */}
          {nearby.length > 0 && (
            <section style={{ marginBottom: 16 }}>
              <h2 style={{
                fontSize: 18, fontWeight: 700, color: 'var(--txt)',
                fontFamily: "'Playfair Display', Georgia, serif",
                margin: '0 0 12px',
              }}>
                Fler vandringar i {regionLabel}
              </h2>
              <div style={{ display: 'grid', gap: 8 }}>
                {nearby.map(h => (
                  <Link
                    key={h.slug}
                    href={`/aktivitet/vandring/${h.slug}`}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 12,
                      background: 'var(--white)', border: '1px solid var(--surface-3)',
                      borderRadius: 10, padding: '12px 16px',
                      textDecoration: 'none', color: 'inherit',
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--txt)', marginBottom: 2 }}>
                        {h.name}
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--txt3)' }}>
                        {h.distanceKm > 0 ? `${h.distanceKm} km · ` : ''}{h.difficulty} · {h.bestSeason}
                      </div>
                    </div>
                    <span style={{ color: 'var(--sea)', fontSize: 16 }}>→</span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Back to overview */}
          <div style={{ textAlign: 'center', paddingTop: 8 }}>
            <Link
              href="/aktivitet/vandring"
              style={{ fontSize: 13, color: 'var(--sea)', textDecoration: 'none', fontWeight: 600 }}
            >
              ← Alla vandringar i Sverige
            </Link>
          </div>

        </main>
      </div>
    </>
  )
}
