import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import SvallaLogo from '@/components/SvallaLogo'
import { getIsland } from '../../../o/island-data'
import {
  ACTIVITY_LIST,
  getActivity,
  islandsForActivity,
  islandActivitiesForType,
  type ActivityType,
} from '../../activity-data'

type Props = { params: Promise<{ type: string; island: string }> }

export async function generateStaticParams() {
  // Bara giltiga (typ, ö)-kombinationer som matchar (annars genererar vi 84×5 = 420 sidor varav många tomma)
  const params: { type: string; island: string }[] = []
  for (const activity of ACTIVITY_LIST) {
    const islands = islandsForActivity(activity.slug)
    for (const island of islands) {
      params.push({ type: activity.slug, island: island.slug })
    }
  }
  return params
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { type, island: slug } = await params
  const activity = getActivity(type)
  const island = getIsland(slug)
  if (!activity || !island) return {}

  const verb = activity.shortName.toLowerCase()
  return {
    title: `${activity.name} på ${island.name} — guide, tips och bästa säsong | Svalla`,
    description: `${verb} på ${island.name}: vad du kan göra, var du startar och vad du behöver packa. ${island.tagline}`,
    keywords: [`${verb} ${island.name.toLowerCase()}`, `${island.name.toLowerCase()} ${verb}`, `${verb} skärgården`, island.regionLabel.toLowerCase()],
    alternates: { canonical: `https://svalla.se/aktivitet/${activity.slug}/${island.slug}` },
    openGraph: {
      title: `${activity.name} på ${island.name}`,
      description: island.tagline,
      url: `https://svalla.se/aktivitet/${activity.slug}/${island.slug}`,
    },
  }
}

export default async function ActivityIslandPage({ params }: Props) {
  const { type, island: slug } = await params
  const activity = getActivity(type)
  const island = getIsland(slug)
  if (!activity || !island) notFound()

  const matchingActivities = islandActivitiesForType(island, activity.slug as ActivityType)

  // BreadcrumbList JSON-LD
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Hem', item: 'https://svalla.se' },
      { '@type': 'ListItem', position: 2, name: 'Aktiviteter', item: 'https://svalla.se/aktivitet' },
      { '@type': 'ListItem', position: 3, name: activity.name, item: `https://svalla.se/aktivitet/${activity.slug}` },
      { '@type': 'ListItem', position: 4, name: island.name, item: `https://svalla.se/aktivitet/${activity.slug}/${island.slug}` },
    ],
  }

  // TouristAttraction JSON-LD
  const touristAttraction = {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    name: `${activity.name} på ${island.name}`,
    description: island.tagline,
    geo: island.lat && island.lng ? {
      '@type': 'GeoCoordinates',
      latitude: island.lat,
      longitude: island.lng,
    } : undefined,
    touristType: activity.name,
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(touristAttraction) }} />

      <nav style={{
        background: 'linear-gradient(160deg, #1e5c82 0%, #2d7d8a 100%)',
        padding: '18px 24px 16px',
      }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', justifyContent: 'space-between' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <SvallaLogo height={24} color="#ffffff" />
          </Link>
          <Link href={`/aktivitet/${activity.slug}`} style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, textDecoration: 'none' }}>
            ← {activity.name}
          </Link>
        </div>
      </nav>

      <header style={{
        background: 'linear-gradient(170deg, #1e5c82 0%, #2d7d8a 100%)',
        padding: '40px 24px 56px', color: '#fff',
      }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ fontSize: 11, opacity: 0.8, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 8 }}>
            {activity.name} · {island.regionLabel}
          </div>
          <h1 style={{ fontSize: 36, fontWeight: 700, margin: 0, fontFamily: "'Playfair Display', Georgia, serif" }}>
            {activity.name} på {island.name}
          </h1>
          <p style={{ fontSize: 16, lineHeight: 1.55, marginTop: 12, maxWidth: 640, opacity: 0.92 }}>
            {island.tagline}
          </p>
        </div>
      </header>

      <main style={{ maxWidth: 900, margin: '-24px auto 0', padding: '0 16px 60px' }}>
        {/* Snabbfakta */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 10, marginBottom: 24,
        }}>
          <div style={{ background: 'var(--white)', border: '1px solid var(--surface-3)', borderRadius: 12, padding: '14px 16px' }}>
            <div style={{ fontSize: 11, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 4 }}>Restid</div>
            <div style={{ fontSize: 13, color: 'var(--txt)', fontWeight: 600 }}>{island.facts.travel_time}</div>
          </div>
          <div style={{ background: 'var(--white)', border: '1px solid var(--surface-3)', borderRadius: 12, padding: '14px 16px' }}>
            <div style={{ fontSize: 11, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 4 }}>Säsong</div>
            <div style={{ fontSize: 13, color: 'var(--txt)', fontWeight: 600 }}>{island.facts.season}</div>
          </div>
          <div style={{ background: 'var(--white)', border: '1px solid var(--surface-3)', borderRadius: 12, padding: '14px 16px' }}>
            <div style={{ fontSize: 11, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 4 }}>Karaktär</div>
            <div style={{ fontSize: 13, color: 'var(--txt)', fontWeight: 600 }}>{island.facts.character}</div>
          </div>
        </div>

        {/* Aktivitetsspecifika kort */}
        {matchingActivities.length > 0 && (
          <section style={{ marginBottom: 28 }}>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--txt)', margin: '0 0 14px', fontFamily: "'Playfair Display', Georgia, serif" }}>
              Vad du kan göra
            </h2>
            <div style={{ display: 'grid', gap: 12 }}>
              {matchingActivities.map(a => (
                <div key={a.name} style={{
                  background: 'var(--white)', border: '1px solid var(--surface-3)',
                  borderRadius: 12, padding: '16px 18px',
                }}>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--txt)', margin: '0 0 6px' }}>
                    {a.name}
                  </h3>
                  <p style={{ fontSize: 14, color: 'var(--txt2)', lineHeight: 1.55, margin: 0 }}>
                    {a.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Packlista för aktiviteten */}
        <section style={{
          background: 'var(--white)', border: '1px solid var(--surface-3)',
          borderRadius: 14, padding: '20px 22px', marginBottom: 28,
        }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--txt)', margin: '0 0 10px' }}>
            Packlista — {activity.shortName.toLowerCase()}
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
        </section>

        {/* Tips från ön */}
        {island.tips.length > 0 && (
          <section style={{
            background: 'var(--white)', border: '1px solid var(--surface-3)',
            borderRadius: 14, padding: '20px 22px', marginBottom: 28,
          }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--txt)', margin: '0 0 10px' }}>
              Lokala tips för {island.name}
            </h2>
            <ul style={{ margin: 0, paddingLeft: 18, color: 'var(--txt2)', fontSize: 14, lineHeight: 1.65 }}>
              {island.tips.map((tip, i) => <li key={i} style={{ marginBottom: 6 }}>{tip}</li>)}
            </ul>
          </section>
        )}

        {/* Krosslänkar */}
        <div style={{
          marginTop: 32, padding: '20px 22px',
          background: 'var(--white)', borderRadius: 14,
          border: '1px solid var(--surface-3)',
        }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>Mer på {island.name}</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, fontSize: 14 }}>
            <Link href={`/o/${island.slug}`} style={{ padding: '6px 14px', borderRadius: 999, background: 'var(--surface-2)', color: 'var(--sea)', textDecoration: 'none' }}>
              Hela ö-guiden →
            </Link>
            <Link href={`/o/${island.slug}/restauranger`} style={{ padding: '6px 14px', borderRadius: 999, background: 'var(--surface-2)', color: 'var(--sea)', textDecoration: 'none' }}>
              Restauranger →
            </Link>
            <Link href={`/o/${island.slug}/hamnar`} style={{ padding: '6px 14px', borderRadius: 999, background: 'var(--surface-2)', color: 'var(--sea)', textDecoration: 'none' }}>
              Hamnar →
            </Link>
            <Link href={`/o/${island.slug}/boende`} style={{ padding: '6px 14px', borderRadius: 999, background: 'var(--surface-2)', color: 'var(--sea)', textDecoration: 'none' }}>
              Boende →
            </Link>
          </div>
        </div>

        {/* Andra aktiviteter på samma ö */}
        <div style={{
          marginTop: 16, padding: '20px 22px',
          background: 'var(--white)', borderRadius: 14,
          border: '1px solid var(--surface-3)',
        }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>Andra aktiviteter på {island.name}</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, fontSize: 14 }}>
            {ACTIVITY_LIST
              .filter(a => a.slug !== activity.slug)
              .filter(a => islandActivitiesForType(island, a.slug as ActivityType).length > 0)
              .map(a => (
                <Link
                  key={a.slug}
                  href={`/aktivitet/${a.slug}/${island.slug}`}
                  style={{ padding: '6px 14px', borderRadius: 999, background: 'var(--surface-2)', color: 'var(--sea)', textDecoration: 'none' }}
                >
                  {a.name} →
                </Link>
              ))}
          </div>
        </div>
      </main>
    </div>
  )
}
