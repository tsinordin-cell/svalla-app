import type { Metadata } from 'next'
import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import SvallaLogo from '@/components/SvallaLogo'
import EmailSignup from '@/components/EmailSignup'
import { ACTIVITY_LIST, getActivity, islandsForActivity, type ActivityType } from '../activity-data'
import type { Island } from '../../o/island-data'

type Props = { params: Promise<{ type: string }> }

export async function generateStaticParams() {
  return ACTIVITY_LIST.map(a => ({ type: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { type } = await params
  const activity = getActivity(type)
  if (!activity) return {}
  const islandCount = islandsForActivity(activity.slug).length
  return {
    title: { absolute: `${activity.name} i skärgården — ${islandCount} öar att välja mellan | Svalla` },
    description: `Hitta de bästa öarna för ${activity.name.toLowerCase()} i Stockholms och Bohusläns skärgård. ${activity.description.split('.')[0]}.`,
    keywords: [`${activity.name.toLowerCase()} skärgården`, `${activity.name.toLowerCase()} stockholm`, `${activity.name.toLowerCase()} bohuslän`, 'skärgården'],
    alternates: { canonical: `https://svalla.se/aktivitet/${activity.slug}` },
    openGraph: {
      title: `${activity.name} i skärgården`,
      description: activity.hero,
      url: `https://svalla.se/aktivitet/${activity.slug}`,
    },
  }
}

export default async function ActivityTypePage({ params }: Props) {
  const { type } = await params
  const activity = getActivity(type)
  if (!activity) notFound()

  const islands = islandsForActivity(activity.slug as ActivityType)
  const featuredIslands = (activity.featured ?? [])
    .map(slug => islands.find(i => i.slug === slug))
    .filter(Boolean) as Island[]
  const grouped = {
    norra: islands.filter(i => i.region === 'norra'),
    mellersta: islands.filter(i => i.region === 'mellersta'),
    södra: islands.filter(i => i.region === 'södra'),
    bohuslan: islands.filter(i => i.region === 'bohuslan'),
  }

  // JSON-LD: CollectionPage
  const collectionPage = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${activity.name} i skärgården`,
    description: activity.description,
    url: `https://svalla.se/aktivitet/${activity.slug}`,
    about: {
      '@type': 'TouristAttraction',
      name: `${activity.name} i Stockholms och Bohusläns skärgård`,
      description: activity.hero,
      touristType: [activity.name],
      availableLanguage: 'sv',
      address: {
        '@type': 'PostalAddress',
        addressRegion: 'Stockholms län',
        addressCountry: 'SE',
      },
    },
    hasPart: islands.slice(0, 20).map(island => ({
      '@type': 'TouristDestination',
      name: island.name,
      url: `https://svalla.se/aktivitet/${activity.slug}/${island.slug}`,
      description: island.tagline,
    })),
  }

  // JSON-LD: ItemList (ranking av toppöar)
  const itemList = featuredIslands.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Bästa öar för ${activity.name.toLowerCase()} i skärgården`,
    description: `Rankade öar för ${activity.name.toLowerCase()} — baserat på tillgänglighet, upplevelse och säsong.`,
    url: `https://svalla.se/aktivitet/${activity.slug}`,
    numberOfItems: featuredIslands.length,
    itemListElement: featuredIslands.map((island, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: island.name,
      url: `https://svalla.se/aktivitet/${activity.slug}/${island.slug}`,
      description: island.tagline,
    })),
  } : null

  // JSON-LD: BreadcrumbList
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Hem', item: 'https://svalla.se' },
      { '@type': 'ListItem', position: 2, name: 'Aktiviteter', item: 'https://svalla.se/aktivitet' },
      { '@type': 'ListItem', position: 3, name: activity.name, item: `https://svalla.se/aktivitet/${activity.slug}` },
    ],
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPage) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      {itemList && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }} />}
      <nav style={{
        background: 'linear-gradient(160deg, #1e5c82 0%, #2d7d8a 100%)',
        padding: '18px 24px 16px',
      }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', justifyContent: 'space-between' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <SvallaLogo height={24} color="#ffffff" />
          </Link>
          <Link href="/aktivitet" style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, textDecoration: 'none' }}>
            ← Alla aktiviteter
          </Link>
        </div>
      </nav>

      <header style={{
        background: 'linear-gradient(170deg, #1e5c82 0%, #2d7d8a 100%)',
        padding: '40px 24px 56px', color: '#fff',
      }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ fontSize: 11, opacity: 0.8, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 8 }}>
            Aktivitet · {islands.length} öar
          </div>
          <h1 style={{ fontSize: 36, fontWeight: 700, margin: 0, fontFamily: "'Playfair Display', Georgia, serif" }}>
            {activity.hero}
          </h1>
          <p style={{ fontSize: 16, lineHeight: 1.55, marginTop: 12, maxWidth: 640, opacity: 0.92 }}>
            {activity.description}
          </p>
        </div>
      </header>

      <main style={{ maxWidth: 900, margin: '-24px auto 0', padding: '0 16px 60px' }}>
        {/* Faktarutor */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12, marginBottom: 28 }}>
          <div style={{ background: 'var(--white)', border: '1px solid var(--surface-3)', borderRadius: 12, padding: '14px 16px' }}>
            <div style={{ fontSize: 11, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 4 }}>Bästa säsong</div>
            <div style={{ fontSize: 13, color: 'var(--txt)', fontWeight: 600 }}>{activity.bestSeason}</div>
          </div>
          <div style={{ background: 'var(--white)', border: '1px solid var(--surface-3)', borderRadius: 12, padding: '14px 16px' }}>
            <div style={{ fontSize: 11, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 4 }}>Svårighetsgrad</div>
            <div style={{ fontSize: 13, color: 'var(--txt)', fontWeight: 600 }}>{activity.level}</div>
          </div>
        </div>

        {/* Packlista */}
        <div style={{
          background: 'var(--white)', border: '1px solid var(--surface-3)',
          borderRadius: 14, padding: '20px 22px', marginBottom: 28,
        }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--txt)', margin: '0 0 10px' }}>
            Vad du behöver packa
          </h2>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 8 }}>
            {activity.whatToBring.map(item => (
              <li key={item} style={{
                fontSize: 13, color: 'var(--txt2)', lineHeight: 1.5,
                paddingLeft: 18, position: 'relative',
              }}>
                <span style={{
                  position: 'absolute', left: 0, top: 6, width: 10, height: 10,
                  borderRadius: 999, background: 'var(--sea)',
                }} />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Favoriter */}
        {featuredIslands.length > 0 && (
          <div style={{ marginBottom: 36 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 4 }}>
              <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--txt)', margin: 0, fontFamily: "'Playfair Display', Georgia, serif" }}>
                Våra favoriter
              </h2>
              <span style={{ fontSize: 12, color: 'var(--txt3)' }}>Swipa →</span>
            </div>
            <p style={{ fontSize: 13, color: 'var(--txt3)', margin: '4px 0 14px' }}>
              De {featuredIslands.length} bästa öarna för {activity.shortName.toLowerCase()} — rankade efter upplevelse och tillgänglighet
            </p>
            {/* Scroll-wrapper med fade-ut på höger kant */}
            <div style={{ position: 'relative' }}>
              <div style={{
                display: 'flex', gap: 14, overflowX: 'auto',
                paddingBottom: 14, paddingRight: 32,
                scrollbarWidth: 'thin',
                scrollbarColor: 'var(--surface-3) transparent',
                WebkitOverflowScrolling: 'touch',
              } as React.CSSProperties}>
                {featuredIslands.map((island, idx) => {
                  const actDesc = island.activities.find(a =>
                    a.name.toLowerCase().includes(activity.shortName.toLowerCase()) ||
                    activity.matchers.some(m => a.name.toLowerCase().includes(m))
                  )?.desc ?? island.tagline
                  // Visa upp till 2 meningar
                  const sentences = actDesc.split('.')
                  const twoSentences = sentences.slice(0, 2).join('.').trim() + (sentences.length > 1 ? '.' : '')
                  const regionLabel: Record<string, string> = {
                    norra: 'Norra skärgården',
                    mellersta: 'Mellersta skärgården',
                    södra: 'Södra skärgården',
                    bohuslan: 'Bohuslän',
                  }
                  return (
                    <Link
                      key={island.slug}
                      href={`/aktivitet/${activity.slug}/${island.slug}`}
                      style={{
                        flex: '0 0 250px', background: 'var(--white)',
                        border: '1px solid var(--surface-3)', borderRadius: 14,
                        padding: '18px 18px 14px', textDecoration: 'none',
                        color: 'inherit', display: 'flex', flexDirection: 'column',
                        position: 'relative', boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
                        transition: 'box-shadow 0.15s',
                      }}
                    >
                      {/* Rankingnummer */}
                      <span style={{
                        position: 'absolute', top: 14, right: 14,
                        fontSize: 11, color: 'var(--txt3)', fontWeight: 700,
                        background: 'var(--surface-2)', borderRadius: 999,
                        width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        {idx + 1}
                      </span>
                      {/* Regionetikett */}
                      <div style={{
                        fontSize: 10, color: 'var(--txt3)',
                        textTransform: 'uppercase', letterSpacing: 0.8,
                        marginBottom: 6, fontWeight: 600,
                      }}>
                        {regionLabel[island.region] ?? island.region}
                      </div>
                      {/* Önamn */}
                      <div style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', marginBottom: 4, paddingRight: 28 }}>
                        {island.name}
                      </div>
                      {/* Tagline */}
                      <div style={{ fontSize: 11, color: 'var(--txt3)', marginBottom: 10, lineHeight: 1.4 }}>
                        {island.tagline}
                      </div>
                      {/* Aktivitetsbeskrivning */}
                      <div style={{ fontSize: 12, color: 'var(--txt2)', lineHeight: 1.6, flex: 1 }}>
                        {twoSentences}
                      </div>
                      {/* CTA */}
                      <div style={{
                        fontSize: 12, color: 'var(--sea)', marginTop: 14,
                        fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4,
                      }}>
                        Utforska {island.name} →
                      </div>
                    </Link>
                  )
                })}
              </div>
              {/* Fade-ut höger kant */}
              <div style={{
                position: 'absolute', right: 0, top: 0, bottom: 14,
                width: 48, pointerEvents: 'none',
                background: 'linear-gradient(to right, transparent, var(--bg))',
              }} />
            </div>
          </div>
        )}

        {/* Öar grupperade per region */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--txt)', margin: '0 0 16px', fontFamily: "'Playfair Display', Georgia, serif" }}>
          Öar för {activity.shortName.toLowerCase()}
        </h2>

        {(['norra', 'mellersta', 'södra', 'bohuslan'] as const).map(region => {
          if (grouped[region].length === 0) return null
          const label = region === 'bohuslan' ? 'Bohuslän' : `${region.charAt(0).toUpperCase()}${region.slice(1)} skärgården`
          return (
            <section key={region} style={{ marginBottom: 24 }}>
              <h3 style={{
                fontSize: 12, fontWeight: 700, color: 'var(--txt3)',
                textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10,
              }}>
                {label} · {grouped[region].length}
              </h3>
              <div style={{ display: 'grid', gap: 10 }}>
                {grouped[region].map(island => (
                  <Link
                    key={island.slug}
                    href={`/aktivitet/${activity.slug}/${island.slug}`}
                    style={{
                      background: 'var(--white)',
                      border: '1px solid var(--surface-3)',
                      borderRadius: 12,
                      padding: '14px 18px',
                      textDecoration: 'none',
                      color: 'inherit',
                      display: 'flex', alignItems: 'center', gap: 14,
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--txt)', marginBottom: 2 }}>
                        {island.name}
                      </div>
                      <div style={{ fontSize: 12, color: 'var(--txt2)', lineHeight: 1.4 }}>
                        {island.tagline}
                      </div>
                    </div>
                    <span style={{ color: 'var(--sea)', fontSize: 18 }}>→</span>
                  </Link>
                ))}
              </div>
            </section>
          )
        })}

        {islands.length === 0 && (
          <div style={{
            background: 'var(--white)', border: '1px solid var(--surface-3)',
            borderRadius: 12, padding: '24px', color: 'var(--txt2)', fontSize: 14,
          }}>
            Vi hittade inga öar som matchar — säg till om någon ö har {activity.shortName.toLowerCase()} så lägger vi till den.
          </div>
        )}

        {/* Cross-länk till andra aktiviteter */}
        <div style={{
          marginTop: 32, padding: '20px 22px',
          background: 'var(--white)', borderRadius: 14,
          border: '1px solid var(--surface-3)',
        }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>Andra aktiviteter</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, fontSize: 14 }}>
            {ACTIVITY_LIST.filter(a => a.slug !== activity.slug).map(a => (
              <Link
                key={a.slug}
                href={`/aktivitet/${a.slug}`}
                style={{ padding: '6px 14px', borderRadius: 999, background: 'var(--surface-2)', color: 'var(--sea)', textDecoration: 'none' }}
              >
                {a.name} →
              </Link>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 16 }}>
          <EmailSignup
            variant="card"
            source={`aktivitet-${activity.slug}`}
            title={`Mer om ${activity.shortName.toLowerCase()} i skärgården`}
            description="Nya guider, säsongstips och insidertips direkt i inkorgen. Varannan tisdag."
          />
        </div>
      </main>
    </div>
  )
}
