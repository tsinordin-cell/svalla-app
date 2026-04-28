import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { ISLANDS, getIsland } from '@/app/o/island-data'
import { ISLAND_COORDS } from '@/lib/islandCoords'

export const metadata: Metadata = {
  title: 'Min skärgård | Svalla',
  description: 'Dina sparade öar, dina besökta öar och nästa äventyr — allt på ett ställe.',
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

const TOTAL_ISLANDS = ISLANDS.length

// Achievements baserade på antal besökta öar
const ACHIEVEMENTS = [
  { threshold: 1,  emoji: '⚓', label: 'Första turen',   sub: 'Du har satt foten i skärgården' },
  { threshold: 5,  emoji: '🌊', label: 'Skärgårds-novis', sub: '5 öar besökta — bra start' },
  { threshold: 10, emoji: '🧭', label: 'Skärgårdsräv',   sub: '10 öar — du börjar veta vart vinden bär' },
  { threshold: 20, emoji: '🏝',  label: 'Halvvägs',        sub: '20 öar — du har sett mer än de flesta' },
  { threshold: 35, emoji: '⛵', label: 'Skärgårdsmästare', sub: '35 öar — sällsynt sällskap' },
  { threshold: 60, emoji: '👑', label: 'Skärgårdskung',  sub: 'Få har gjort detta' },
] as const

export default async function MinSkargardPage() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect('/auth?next=/min-skargard')
  }

  // Hämta sparade öar
  const { data: savedRows } = await supabase
    .from('saved_islands')
    .select('island_slug, created_at')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  // Hämta besökta öar (befintlig tabell)
  const { data: visitedRows } = await supabase
    .from('visited_islands')
    .select('island_slug, created_at')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  const savedSlugs = new Set((savedRows ?? []).map(r => r.island_slug))
  const visitedSlugs = new Set((visitedRows ?? []).map(r => r.island_slug))
  const visitedCount = visitedSlugs.size
  const percentVisited = Math.round((visitedCount / TOTAL_ISLANDS) * 100)

  const earned = ACHIEVEMENTS.filter(a => visitedCount >= a.threshold)
  const next = ACHIEVEMENTS.find(a => visitedCount < a.threshold)

  // Räkna ut närmaste oupptäckt ö (fågelvägen från Stockholm centrum)
  // Använder ISLAND_COORDS — om DB-rad finns med koord
  const STOCKHOLM = { lat: 59.3293, lng: 18.0686 }
  const nearestUnvisited = ISLAND_COORDS
    .filter(c => !visitedSlugs.has(c.slug))
    .map(c => {
      const dlat = (c.lat - STOCKHOLM.lat) * 111
      const dlng = (c.lng - STOCKHOLM.lng) * 111 * Math.cos((STOCKHOLM.lat * Math.PI) / 180)
      return { ...c, distance: Math.sqrt(dlat * dlat + dlng * dlng) }
    })
    .sort((a, b) => a.distance - b.distance)[0]

  const nearestIsland = nearestUnvisited ? getIsland(nearestUnvisited.slug) : null

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg, #f5f4ef)', paddingBottom: 100 }}>
      {/* HERO */}
      <header style={{
        background: 'linear-gradient(165deg, #1e5c82 0%, #2d7d8a 100%)',
        padding: '40px 24px 56px', color: '#fff',
      }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ fontSize: 12, opacity: 0.8, letterSpacing: 1.4, textTransform: 'uppercase', marginBottom: 8 }}>
            Min skärgård
          </div>
          <h1 style={{
            fontSize: 36, fontWeight: 700, margin: '0 0 8px',
            fontFamily: "'Playfair Display', Georgia, serif",
          }}>
            Hej {user.user_metadata?.username || user.email?.split('@')[0] || 'seglare'}
          </h1>
          <p style={{ fontSize: 16, opacity: 0.85, maxWidth: 540 }}>
            Här är din skärgårds-resa. Spara öar du vill besöka. Logga öar du har varit på.
          </p>
        </div>
      </header>

      <main style={{ maxWidth: 900, margin: '-32px auto 0', padding: '0 16px', position: 'relative' }}>
        {/* PROGRESS-CARD */}
        <section style={{
          background: 'var(--surface-1, #fff)',
          border: '1px solid var(--border, rgba(0,0,0,0.08))',
          borderRadius: 18,
          padding: '24px 24px 28px',
          boxShadow: '0 6px 24px rgba(0,0,0,0.06)',
          marginBottom: 20,
        }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 14 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0, color: 'var(--txt, #1a2530)' }}>
              Din skärgård
            </h2>
            <div style={{ fontSize: 32, fontWeight: 800, color: 'var(--sea, #1e5c82)', fontFamily: "'Playfair Display', Georgia, serif" }}>
              {visitedCount}<span style={{ fontSize: 18, opacity: 0.5 }}>/{TOTAL_ISLANDS}</span>
            </div>
          </div>
          <div style={{
            background: 'rgba(30,92,130,0.10)', borderRadius: 999, height: 10, overflow: 'hidden',
          }}>
            <div style={{
              width: `${Math.max(2, percentVisited)}%`, height: '100%',
              background: 'linear-gradient(90deg, #1e5c82 0%, #2d7d8a 100%)',
              borderRadius: 999, transition: 'width .5s ease',
            }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 12, color: 'var(--txt2, rgba(0,0,0,0.6))' }}>
            <span>{percentVisited}% av Stockholms skärgård</span>
            <span>{savedSlugs.size} sparade vill jag besöka</span>
          </div>

          {/* Närmaste oupptäckta */}
          {nearestIsland && (
            <Link
              href={`/o/${nearestIsland.slug}`}
              style={{
                display: 'flex', alignItems: 'center', gap: 14,
                marginTop: 18, padding: 14,
                background: 'rgba(201,110,42,0.08)',
                border: '1px solid rgba(201,110,42,0.18)',
                borderRadius: 12, textDecoration: 'none',
              }}
            >
              <div style={{ fontSize: 28 }}>{nearestIsland.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, color: '#c96e2a', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>
                  Närmaste oupptäckta
                </div>
                <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--txt, #1a2530)' }}>
                  {nearestIsland.name}
                </div>
                <div style={{ fontSize: 12, color: 'var(--txt2, rgba(0,0,0,0.6))' }}>
                  {nearestUnvisited!.distance.toFixed(0)} km från Stockholm — {nearestIsland.tagline}
                </div>
              </div>
              <span style={{ color: '#c96e2a', fontSize: 18 }}>→</span>
            </Link>
          )}
        </section>

        {/* ACHIEVEMENTS */}
        <section style={{
          background: 'var(--surface-1, #fff)',
          border: '1px solid var(--border, rgba(0,0,0,0.08))',
          borderRadius: 18, padding: '20px 22px',
          marginBottom: 20,
        }}>
          <h2 style={{ fontSize: 17, fontWeight: 700, margin: '0 0 14px', color: 'var(--txt, #1a2530)' }}>
            Märken
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: 10 }}>
            {ACHIEVEMENTS.map(a => {
              const got = visitedCount >= a.threshold
              return (
                <div key={a.label} style={{
                  padding: '14px 10px', textAlign: 'center', borderRadius: 12,
                  background: got ? 'rgba(30,92,130,0.08)' : 'rgba(0,0,0,0.03)',
                  border: got ? '1px solid rgba(30,92,130,0.18)' : '1px solid transparent',
                  opacity: got ? 1 : 0.4,
                }}>
                  <div style={{ fontSize: 24, marginBottom: 4 }}>{a.emoji}</div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: got ? 'var(--sea, #1e5c82)' : 'var(--txt2)' }}>
                    {a.label}
                  </div>
                  <div style={{ fontSize: 10, color: 'var(--txt2, rgba(0,0,0,0.55))', marginTop: 2 }}>
                    {a.threshold} öar
                  </div>
                </div>
              )
            })}
          </div>
          {next && (
            <div style={{ marginTop: 12, fontSize: 12, color: 'var(--txt2, rgba(0,0,0,0.6))', textAlign: 'center' }}>
              {next.threshold - visitedCount} öar till "{next.label}"
            </div>
          )}
        </section>

        {/* SPARADE ÖAR */}
        <section style={{
          background: 'var(--surface-1, #fff)',
          border: '1px solid var(--border, rgba(0,0,0,0.08))',
          borderRadius: 18, padding: '20px 22px', marginBottom: 20,
        }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 14 }}>
            <h2 style={{ fontSize: 17, fontWeight: 700, margin: 0, color: 'var(--txt, #1a2530)' }}>
              Sparade öar
            </h2>
            <span style={{ fontSize: 13, color: 'var(--txt2)' }}>{savedSlugs.size}</span>
          </div>
          {savedSlugs.size === 0 ? (
            <p style={{ fontSize: 14, color: 'var(--txt2)', margin: '8px 0 0' }}>
              Inga sparade öar än. Klicka <em>Spara ön</em> på en ösida för att lägga till.{' '}
              <Link href="/rutter?vy=oar" style={{ color: 'var(--sea)' }}>Bläddra alla öar →</Link>
            </p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 10 }}>
              {Array.from(savedSlugs).map(slug => {
                const i = getIsland(slug)
                if (!i) return null
                return (
                  <Link key={slug} href={`/o/${slug}`} style={{
                    padding: 12, borderRadius: 10,
                    background: 'rgba(0,0,0,0.03)', textDecoration: 'none',
                    display: 'flex', alignItems: 'center', gap: 8,
                  }}>
                    <span style={{ fontSize: 22 }}>{i.emoji}</span>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--txt)' }}>{i.name}</div>
                      <div style={{ fontSize: 11, color: 'var(--txt2)' }}>{i.regionLabel}</div>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </section>

        {/* BESÖKTA ÖAR */}
        <section style={{
          background: 'var(--surface-1, #fff)',
          border: '1px solid var(--border, rgba(0,0,0,0.08))',
          borderRadius: 18, padding: '20px 22px',
        }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 14 }}>
            <h2 style={{ fontSize: 17, fontWeight: 700, margin: 0, color: 'var(--txt, #1a2530)' }}>
              Besökta öar
            </h2>
            <span style={{ fontSize: 13, color: 'var(--txt2)' }}>{visitedCount}</span>
          </div>
          {visitedCount === 0 ? (
            <p style={{ fontSize: 14, color: 'var(--txt2)', margin: '8px 0 0' }}>
              Logga din första tur i appen så dyker de besökta öarna upp här.
            </p>
          ) : (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {Array.from(visitedSlugs).map(slug => {
                const i = getIsland(slug)
                if (!i) return null
                return (
                  <Link key={slug} href={`/o/${slug}`} style={{
                    padding: '6px 12px', borderRadius: 999,
                    background: 'rgba(46,160,90,0.10)', color: '#2a6e50',
                    fontSize: 12, fontWeight: 700, textDecoration: 'none',
                    display: 'inline-flex', alignItems: 'center', gap: 4,
                  }}>
                    <span>✓</span>{i.name}
                  </Link>
                )
              })}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}
