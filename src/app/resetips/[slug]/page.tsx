import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { TRIPS, getTrip, type TripDifficulty } from '../trips-data'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return TRIPS.map(t => ({ slug: t.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const trip = getTrip(slug)
  if (!trip) return {}
  return {
    title: `${trip.title} – Svalla`,
    description: trip.tagline,
    alternates: { canonical: `https://svalla.se/resetips/${slug}` },
    openGraph: {
      title: `${trip.title} – Svalla`,
      description: trip.tagline,
      url: `https://svalla.se/resetips/${slug}`,
    },
  }
}

const DIFFICULTY_LABEL: Record<TripDifficulty, string> = {
  lätt: 'Lätt',
  medel: 'Medel',
  krävande: 'Krävande',
}

const DIFFICULTY_COLOR: Record<TripDifficulty, string> = {
  lätt: '#2a9d5c',
  medel: '#e07b2a',
  krävande: '#c0392b',
}

const STOP_ICONS: Record<string, string> = {
  transport: '⛵',
  mat: '🍽',
  kultur: '🏛',
  natur: '🌿',
  bad: '🏊',
  aktivitet: '🎯',
  boende: '🏡',
}

const STOP_LABEL: Record<string, string> = {
  transport: 'Transport',
  mat: 'Mat & dryck',
  kultur: 'Kultur',
  natur: 'Natur',
  bad: 'Bad',
  aktivitet: 'Aktivitet',
  boende: 'Boende',
}

export default async function ResetipsDetailPage({ params }: Props) {
  const { slug } = await params
  const trip = getTrip(slug)
  if (!trip) notFound()

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg, #f8f7f4)', paddingBottom: 80 }}>
      {/* Back */}
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '28px 24px 0' }}>
        <Link href="/resetips" style={{ fontSize: 14, color: 'var(--sea, #0a7b8c)', textDecoration: 'none' }}>
          ← Alla resetips
        </Link>
      </div>

      <article style={{ maxWidth: 760, margin: '20px auto 0', padding: '0 24px' }}>
        {/* Badges */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
          <span style={{
            fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase',
            color: DIFFICULTY_COLOR[trip.difficulty],
            background: `${DIFFICULTY_COLOR[trip.difficulty]}18`,
            padding: '4px 10px', borderRadius: 20,
          }}>
            {DIFFICULTY_LABEL[trip.difficulty]}
          </span>
          <span style={{
            fontSize: 11, fontWeight: 500, color: 'var(--txt3, #888)',
            background: 'var(--surface, #fff)',
            border: '1px solid var(--border, rgba(0,0,0,0.1))',
            padding: '4px 10px', borderRadius: 20,
          }}>
            {trip.transport}
          </span>
          <span style={{
            fontSize: 11, fontWeight: 500, color: 'var(--txt3, #888)',
            background: 'var(--surface, #fff)',
            border: '1px solid var(--border, rgba(0,0,0,0.1))',
            padding: '4px 10px', borderRadius: 20,
          }}>
            {trip.season}
          </span>
        </div>

        {/* Title */}
        <h1 style={{
          fontFamily: 'var(--font-playfair, "Playfair Display", Georgia, serif)',
          fontSize: 'clamp(26px, 4vw, 42px)',
          fontWeight: 700,
          color: 'var(--txt, #1a1a1a)',
          margin: '0 0 12px',
          lineHeight: 1.2,
        }}>
          {trip.title}
        </h1>

        <p style={{ fontSize: 17, color: 'var(--txt2, #555)', lineHeight: 1.7, margin: '0 0 28px' }}>
          {trip.description}
        </p>

        {/* Meta facts */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
          gap: 10,
          marginBottom: 40,
        }}>
          {[
            { label: 'Varaktighet', value: trip.duration },
            { label: 'Startpunkt', value: trip.startPoint },
            { label: 'Transport', value: trip.transport },
            { label: 'Säsong', value: trip.season },
          ].map(({ label, value }) => (
            <div key={label} style={{
              background: 'var(--surface, #fff)',
              border: '1px solid var(--border, rgba(0,0,0,0.08))',
              borderRadius: 10,
              padding: '12px 16px',
            }}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--txt3, #888)', margin: '0 0 4px' }}>
                {label}
              </p>
              <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--txt, #1a1a1a)', margin: 0 }}>
                {value}
              </p>
            </div>
          ))}
        </div>

        {/* Stops */}
        <h2 style={{
          fontFamily: 'var(--font-playfair, "Playfair Display", Georgia, serif)',
          fontSize: 22,
          fontWeight: 700,
          color: 'var(--txt, #1a1a1a)',
          margin: '0 0 20px',
        }}>
          Rutten — stopp för stopp
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, marginBottom: 48, position: 'relative' }}>
          {trip.stops.map((stop, i) => (
            <div key={i} style={{ display: 'flex', gap: 16, position: 'relative' }}>
              {/* Timeline line */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: 'var(--surface, #fff)',
                  border: '2px solid var(--sea, #0a7b8c)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 16, flexShrink: 0,
                  zIndex: 1,
                }}>
                  {STOP_ICONS[stop.type]}
                </div>
                {i < trip.stops.length - 1 && (
                  <div style={{
                    width: 2,
                    flex: 1,
                    minHeight: 24,
                    background: 'var(--border, rgba(0,0,0,0.1))',
                    margin: '4px 0',
                  }} />
                )}
              </div>

              {/* Stop content */}
              <div style={{ paddingBottom: i < trip.stops.length - 1 ? 20 : 0, flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--txt, #1a1a1a)', margin: 0 }}>
                    {stop.name}
                  </h3>
                  <span style={{
                    fontSize: 10, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase',
                    color: 'var(--txt3, #aaa)',
                    background: 'var(--bg, #f8f7f4)',
                    padding: '2px 7px', borderRadius: 10,
                  }}>
                    {STOP_LABEL[stop.type]}
                  </span>
                </div>
                <p style={{ fontSize: 15, color: 'var(--txt2, #555)', lineHeight: 1.6, margin: '0 0 6px' }}>
                  {stop.desc}
                </p>
                {stop.tip && (
                  <div style={{
                    display: 'flex', gap: 6, alignItems: 'flex-start',
                    background: 'rgba(10,123,140,0.07)',
                    borderLeft: '3px solid var(--sea, #0a7b8c)',
                    padding: '8px 12px',
                    borderRadius: '0 6px 6px 0',
                    fontSize: 13,
                    color: 'var(--txt2, #444)',
                    lineHeight: 1.5,
                  }}>
                    <span style={{ flexShrink: 0 }}>💡</span>
                    <span>{stop.tip}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Island links */}
        {trip.islandSlugs && trip.islandSlugs.length > 0 && (
          <div style={{ marginBottom: 48 }}>
            <p style={{ fontSize: 14, color: 'var(--txt3, #888)', marginBottom: 8 }}>Relaterade öar på Svalla:</p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {trip.islandSlugs.map(s => (
                <Link key={s} href={`/o/${s}`} style={{
                  fontSize: 14, fontWeight: 600,
                  color: 'var(--sea, #0a7b8c)',
                  textDecoration: 'none',
                  border: '1px solid var(--sea, #0a7b8c)',
                  padding: '6px 14px', borderRadius: 8,
                }}>
                  Se {s.charAt(0).toUpperCase() + s.slice(1)} →
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Back */}
        <div style={{ borderTop: '1px solid var(--border, rgba(0,0,0,0.08))', paddingTop: 24 }}>
          <Link href="/resetips" style={{ fontSize: 14, color: 'var(--sea, #0a7b8c)', textDecoration: 'none' }}>
            ← Fler resetips
          </Link>
        </div>
      </article>
    </main>
  )
}
