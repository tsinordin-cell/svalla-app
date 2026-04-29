import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { ALL_ISLANDS, getIsland } from '@/app/o/island-data'
import { ISLAND_COORDS } from '@/lib/islandCoords'
import Icon from '@/components/Icon'

export const metadata: Metadata = {
  title: 'Min skärgård | Svalla',
  description: 'Dina sparade öar, dina besökta öar och nästa äventyr — allt på ett ställe.',
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

const TOTAL_ISLANDS = ALL_ISLANDS.length

// ── Verktyg & spel-sektion: card-stilar ───────────────
function toolCardStyle(accentColor: string): React.CSSProperties {
  return {
    display: 'flex', flexDirection: 'column', gap: 6,
    padding: '14px 16px',
    background: 'var(--bg)',
    border: '1px solid var(--surface-3)',
    borderTop: `3px solid ${accentColor}`,
    borderRadius: 12,
    textDecoration: 'none',
    color: 'inherit',
    transition: 'transform .12s, box-shadow .12s',
  }
}
const toolLabelStyle: React.CSSProperties = {
  fontSize: 14, fontWeight: 700, color: 'var(--txt)', marginTop: 2,
}
const toolDescStyle: React.CSSProperties = {
  fontSize: 11, color: 'var(--txt2)', lineHeight: 1.4,
}
function ToolIcon({ name, color }: { name: 'navigation' | 'trophy' | 'compass' | 'map' | 'check' | 'users'; color: string }) {
  return (
    <div style={{
      width: 32, height: 32, borderRadius: 8,
      background: `${color}15`,
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      color, marginBottom: 2,
    }}>
      <Icon name={name} size={18} stroke={1.8} />
    </div>
  )
}

const ACHIEVEMENTS = [
  { threshold: 1,  iconName: 'anchor'    as const, label: 'Första turen',     sub: 'Du har satt foten i skärgården' },
  { threshold: 5,  iconName: 'waves'     as const, label: 'Skärgårds-novis',  sub: '5 öar besökta' },
  { threshold: 10, iconName: 'compass'   as const, label: 'Skärgårdsräv',     sub: '10 öar — börjar vana' },
  { threshold: 20, iconName: 'navigation' as const,label: 'Halvvägs',         sub: '20 öar — sällsynt' },
  { threshold: 35, iconName: 'sailboat'  as const, label: 'Skärgårdsmästare', sub: '35 öar — sällsynt sällskap' },
  { threshold: 60, iconName: 'trophy'    as const, label: 'Skärgårdskung',    sub: 'Få har gjort detta' },
] as const

export default async function MinSkargardPage() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect('/auth?next=/min-skargard')
  }

  const { data: savedRows } = await supabase
    .from('saved_islands')
    .select('island_slug, created_at')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

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
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: 100, color: 'var(--txt)' }}>
      {/* HERO */}
      <header style={{
        background: 'linear-gradient(165deg, var(--sea-l, #1e5c82) 0%, var(--sea, #2d7d8a) 100%)',
        padding: '40px 24px 56px', color: '#fff',
      }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ fontSize: 12, opacity: 0.85, letterSpacing: 1.4, textTransform: 'uppercase', marginBottom: 8 }}>
            Min skärgård
          </div>
          <h1 style={{
            fontSize: 36, fontWeight: 700, margin: '0 0 8px',
            fontFamily: "'Playfair Display', Georgia, serif",
          }}>
            Hej {user.user_metadata?.username || user.email?.split('@')[0] || 'seglare'}
          </h1>
          <p style={{ fontSize: 16, opacity: 0.85, maxWidth: 540, margin: 0 }}>
            Här är din skärgårds-resa. Spara öar du vill besöka. Logga öar du har varit på.
          </p>
        </div>
      </header>

      <main style={{ maxWidth: 900, margin: '-32px auto 0', padding: '0 16px', position: 'relative' }}>
        {/* PROGRESS-CARD */}
        <section style={{
          background: 'var(--white)',
          border: '1px solid var(--surface-3)',
          borderRadius: 18,
          padding: '24px 24px 28px',
          boxShadow: '0 6px 24px rgba(0,0,0,0.06)',
          marginBottom: 20,
        }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 14 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0, color: 'var(--txt)' }}>
              Din skärgård
            </h2>
            <div style={{ fontSize: 32, fontWeight: 800, color: 'var(--sea)', fontFamily: "'Playfair Display', Georgia, serif" }}>
              {visitedCount}<span style={{ fontSize: 18, opacity: 0.5 }}>/{TOTAL_ISLANDS}</span>
            </div>
          </div>
          <div style={{
            background: 'var(--surface-2)', borderRadius: 999, height: 10, overflow: 'hidden',
          }}>
            <div style={{
              width: `${Math.max(2, percentVisited)}%`, height: '100%',
              background: 'linear-gradient(90deg, var(--sea) 0%, var(--sea-d, #2d7d8a) 100%)',
              borderRadius: 999, transition: 'width .5s ease',
            }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 12, color: 'var(--txt2)' }}>
            <span>{percentVisited}% av Norden</span>
            <span>{savedSlugs.size} sparade vill jag besöka</span>
          </div>

          {/* Närmaste oupptäckta */}
          {nearestIsland && (
            <Link
              href={`/o/${nearestIsland.slug}`}
              style={{
                display: 'flex', alignItems: 'center', gap: 14,
                marginTop: 18, padding: 14,
                background: 'var(--acc-l, rgba(201,110,42,0.08))',
                border: '1px solid var(--acc, #c96e2a)',
                borderRadius: 12, textDecoration: 'none',
              }}
            >
              <Icon name="navigation" size={28} stroke={2} style={{ color: 'var(--acc, #c96e2a)' }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, color: 'var(--acc, #c96e2a)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>
                  Närmaste oupptäckta
                </div>
                <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--txt)' }}>
                  {nearestIsland.name}
                </div>
                <div style={{ fontSize: 12, color: 'var(--txt2)' }}>
                  {nearestUnvisited!.distance.toFixed(0)} km från Stockholm — {nearestIsland.tagline}
                </div>
              </div>
              <Icon name="arrowRight" size={18} style={{ color: 'var(--acc, #c96e2a)' }} />
            </Link>
          )}
        </section>

        {/* ACHIEVEMENTS */}
        <section style={{
          background: 'var(--white)',
          border: '1px solid var(--surface-3)',
          borderRadius: 18, padding: '20px 22px',
          marginBottom: 20,
        }}>
          <h2 style={{ fontSize: 17, fontWeight: 700, margin: '0 0 14px', color: 'var(--txt)' }}>
            Märken
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: 10 }}>
            {ACHIEVEMENTS.map(a => {
              const got = visitedCount >= a.threshold
              return (
                <div key={a.label} style={{
                  padding: '14px 10px', textAlign: 'center', borderRadius: 12,
                  background: got ? 'var(--surface-2)' : 'transparent',
                  border: got ? '1px solid var(--surface-3)' : '1px solid var(--surface-2)',
                  opacity: got ? 1 : 0.4,
                  color: got ? 'var(--sea)' : 'var(--txt3)',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 6 }}>
                    <Icon name={a.iconName} size={24} stroke={2} />
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: got ? 'var(--sea)' : 'var(--txt2)' }}>
                    {a.label}
                  </div>
                  <div style={{ fontSize: 10, color: 'var(--txt3)', marginTop: 2 }}>
                    {a.threshold} öar
                  </div>
                </div>
              )
            })}
          </div>
          {next && (
            <div style={{ marginTop: 12, fontSize: 12, color: 'var(--txt2)', textAlign: 'center' }}>
              {next.threshold - visitedCount} öar till "{next.label}"
            </div>
          )}
        </section>

        {/* SPARADE ÖAR */}
        <section style={{
          background: 'var(--white)',
          border: '1px solid var(--surface-3)',
          borderRadius: 18, padding: '20px 22px', marginBottom: 20,
        }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 14 }}>
            <h2 style={{ fontSize: 17, fontWeight: 700, margin: 0, color: 'var(--txt)' }}>
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
                    background: 'var(--surface-2)', textDecoration: 'none',
                    display: 'flex', alignItems: 'center', gap: 8,
                    color: 'var(--txt)',
                  }}>
                    <Icon name="bookmark" size={18} style={{ color: 'var(--acc, #c96e2a)' }} />
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700 }}>{i.name}</div>
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
          background: 'var(--white)',
          border: '1px solid var(--surface-3)',
          borderRadius: 18, padding: '20px 22px',
        }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 14 }}>
            <h2 style={{ fontSize: 17, fontWeight: 700, margin: 0, color: 'var(--txt)' }}>
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
                    background: 'rgba(46,160,90,0.10)', color: 'var(--green, #2a6e50)',
                    fontSize: 12, fontWeight: 700, textDecoration: 'none',
                    display: 'inline-flex', alignItems: 'center', gap: 4,
                  }}>
                    <Icon name="check" size={12} stroke={2.4} />
                    {i.name}
                  </Link>
                )
              })}
            </div>
          )}
        </section>

        {/* ── Verktyg & spel — synliggör nya features ───────────────── */}
        <section style={{
          background: 'var(--white)',
          borderRadius: 16,
          padding: '20px 22px',
          marginBottom: 16,
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        }}>
          <div style={{ marginBottom: 14 }}>
            <h2 style={{
              fontSize: 17, fontWeight: 700, margin: 0,
              color: 'var(--txt)',
              fontFamily: "'Playfair Display', Georgia, serif",
            }}>
              Verktyg & spel
            </h2>
            <p style={{ fontSize: 13, color: 'var(--txt2)', margin: '4px 0 0' }}>
              Planera, jämför och utforska din skärgård
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
            gap: 10,
          }}>
            <Link href="/utflykt" style={toolCardStyle('var(--sea)')}>
              <ToolIcon name="navigation" color="var(--sea)" />
              <div style={toolLabelStyle}>Utflyktsplanerare</div>
              <div style={toolDescStyle}>Restid + packlista + krogar</div>
            </Link>

            <Link href="/bingo" style={toolCardStyle('#7c3aed')}>
              <ToolIcon name="trophy" color="#7c3aed" />
              <div style={toolLabelStyle}>Skärgårdsbingo 2026</div>
              <div style={toolDescStyle}>25 utmaningar att bocka av</div>
            </Link>

            <Link href="/aktivitet" style={toolCardStyle('#0a7b3c')}>
              <ToolIcon name="compass" color="#0a7b3c" />
              <div style={toolLabelStyle}>Aktiviteter</div>
              <div style={toolDescStyle}>Segling, cykling, bad, vandring</div>
            </Link>

            <Link href="/oar" style={toolCardStyle('#0a7b8c')}>
              <ToolIcon name="map" color="#0a7b8c" />
              <div style={toolLabelStyle}>Hitta din ö</div>
              <div style={toolDescStyle}>10 kategorier — barnvänliga, lyx, lugn</div>
            </Link>

            <Link href="/jamfor" style={toolCardStyle('#c96e2a')}>
              <ToolIcon name="check" color="#c96e2a" />
              <div style={toolLabelStyle}>Jämför öar</div>
              <div style={toolDescStyle}>Sandhamn eller Grinda?</div>
            </Link>

            <Link href="/forum" style={toolCardStyle('#1d4ed8')}>
              <ToolIcon name="users" color="#1d4ed8" />
              <div style={toolLabelStyle}>Forum & diskussioner</div>
              <div style={toolDescStyle}>Frågor och svar från community</div>
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}
