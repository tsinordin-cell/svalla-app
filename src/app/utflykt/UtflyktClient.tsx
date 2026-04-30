'use client'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import {
  type Departure,
  approximateTravelMinutes,
  packingForSeason,
  seasonLabel,
} from './utflykt-data'

type IslandData = {
  slug: string
  name: string
  region: string
  regionLabel: string
  tagline: string
  lat?: number
  lng?: number
  travel_time: string
  season: string
  character: string
  best_for: string
  tags: string[]
  tips: string[]
  restaurants: { name: string; type: string; desc: string }[]
  accommodation: { name: string; type: string }[]
  activities: { name: string; desc: string }[]
}

interface Props {
  islands: IslandData[]
  departures: Departure[]
}

const REGION_LABELS: Record<string, string> = {
  norra: 'Norra',
  mellersta: 'Mellersta',
  södra: 'Södra',
  bohuslan: 'Bohuslän',
}

export default function UtflyktClient({ islands, departures }: Props) {
  const [departureSlug, setDepartureSlug] = useState<string>('strömkajen')
  const [islandSlug, setIslandSlug] = useState<string>('')
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [showResult, setShowResult] = useState(false)

  const departure = departures.find(d => d.slug === departureSlug)
  const island = islands.find(i => i.slug === islandSlug)

  // Filtrera öar baserat på sökning
  const filteredIslands = useMemo(() => {
    if (!searchTerm.trim()) return islands
    const q = searchTerm.toLowerCase()
    return islands.filter(i =>
      i.name.toLowerCase().includes(q) ||
      i.regionLabel.toLowerCase().includes(q) ||
      i.tags.some(t => t.toLowerCase().includes(q))
    )
  }, [islands, searchTerm])

  // Gruppera filtrerade öar per region
  const groupedIslands = useMemo(() => {
    const groups: Record<string, IslandData[]> = { norra: [], mellersta: [], södra: [], bohuslan: [] }
    for (const i of filteredIslands) {
      const region = (i.region in groups ? i.region : 'mellersta') as keyof typeof groups
      const bucket = groups[region]
      if (bucket) bucket.push(i)
    }
    return groups
  }, [filteredIslands])

  // Räkna ut restid
  const travelMinutes = departure && island
    ? approximateTravelMinutes(departure.lat, departure.lng, island.lat, island.lng)
    : null

  // Säsong
  const month = new Date().getMonth() + 1
  const packing = packingForSeason(month)
  const season = seasonLabel(month)

  // Restaurang-tips längs vägen — heuristik: visa krogar från ön + från relaterade öar i samma region
  const krogTips = island ? island.restaurants.slice(0, 3) : []

  function planResa() {
    if (!island || !departure) return
    setShowResult(true)
    // Smooth scroll till resultat
    setTimeout(() => {
      document.getElementById('utflykt-result')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 50)
  }

  return (
    <div>
      {/* Steg 1: Startpunkt */}
      <section style={{
        background: 'var(--white)',
        border: '1px solid var(--surface-3)',
        borderRadius: 14,
        padding: '20px 22px',
        marginBottom: 16,
      }}>
        <h2 style={{
          fontSize: 11, fontWeight: 700, color: 'var(--txt3)',
          textTransform: 'uppercase', letterSpacing: 1, margin: '0 0 12px',
        }}>
          1. Var startar resan?
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))',
          gap: 8,
        }}>
          {departures.map(d => {
            const active = d.slug === departureSlug
            return (
              <button
                key={d.slug}
                onClick={() => setDepartureSlug(d.slug)}
                style={{
                  padding: '12px 14px',
                  borderRadius: 10,
                  border: `1.5px solid ${active ? 'var(--sea)' : 'var(--surface-3)'}`,
                  background: active ? 'var(--sea)' : 'var(--bg)',
                  color: active ? '#fff' : 'var(--txt)',
                  cursor: 'pointer',
                  fontSize: 13, fontWeight: 600,
                  textAlign: 'left',
                  transition: 'all .12s',
                }}
              >
                {d.shortName}
              </button>
            )
          })}
        </div>
        {departure && (
          <p style={{ fontSize: 12, color: 'var(--txt2)', marginTop: 12, margin: '12px 0 0', lineHeight: 1.5 }}>
            {departure.description}
          </p>
        )}
      </section>

      {/* Steg 2: Vart? */}
      <section style={{
        background: 'var(--white)',
        border: '1px solid var(--surface-3)',
        borderRadius: 14,
        padding: '20px 22px',
        marginBottom: 16,
      }}>
        <h2 style={{
          fontSize: 11, fontWeight: 700, color: 'var(--txt3)',
          textTransform: 'uppercase', letterSpacing: 1, margin: '0 0 12px',
        }}>
          2. Vart vill du åka?
        </h2>

        <input
          type="search"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Sök ö, region eller tag (t.ex. 'badet', 'cykling')…"
          style={{
            width: '100%',
            padding: '10px 14px',
            borderRadius: 10,
            border: '1px solid var(--surface-3)',
            background: 'var(--bg)',
            color: 'var(--txt)',
            fontSize: 14,
            marginBottom: 14,
            outline: 'none',
          }}
        />

        {departure && (
          <div style={{ marginBottom: 14, fontSize: 12, color: 'var(--txt3)' }}>
            <strong style={{ color: 'var(--sea)' }}>Tips från {departure.shortName}:</strong>{' '}
            {departure.primaryDestinations.slice(0, 4).join(', ')}
          </div>
        )}

        <div style={{ maxHeight: 360, overflowY: 'auto', display: 'grid', gap: 8 }}>
          {(['norra', 'mellersta', 'södra', 'bohuslan'] as const).map(region => {
            const items = groupedIslands[region] ?? []
            if (items.length === 0) return null
            return (
              <div key={region}>
                <h3 style={{
                  fontSize: 10, fontWeight: 700, color: 'var(--txt3)',
                  textTransform: 'uppercase', letterSpacing: 1.2,
                  margin: '8px 0 6px',
                }}>
                  {REGION_LABELS[region]} · {items.length}
                </h3>
                <div style={{ display: 'grid', gap: 4 }}>
                  {items.map(i => {
                    const active = i.slug === islandSlug
                    return (
                      <button
                        key={i.slug}
                        onClick={() => setIslandSlug(i.slug)}
                        style={{
                          width: '100%',
                          padding: '10px 14px',
                          borderRadius: 8,
                          border: `1.5px solid ${active ? 'var(--sea)' : 'transparent'}`,
                          background: active ? 'var(--sea)' : 'var(--bg)',
                          color: active ? '#fff' : 'var(--txt)',
                          cursor: 'pointer',
                          fontSize: 13, fontWeight: 600,
                          textAlign: 'left',
                          transition: 'all .12s',
                          display: 'flex', justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <span>{i.name}</span>
                        <span style={{
                          fontSize: 10, opacity: active ? 0.85 : 0.55, fontWeight: 500,
                        }}>
                          {i.tags.slice(0, 2).join(' · ')}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>
            )
          })}
          {filteredIslands.length === 0 && (
            <p style={{ fontSize: 13, color: 'var(--txt2)', textAlign: 'center', padding: 20 }}>
              Inga öar matchade — prova en annan sökning.
            </p>
          )}
        </div>
      </section>

      {/* Steg 3: Generera */}
      <button
        onClick={planResa}
        disabled={!island || !departure}
        style={{
          width: '100%',
          padding: '14px 20px',
          borderRadius: 12,
          border: 'none',
          background: !island ? 'var(--surface-3)' : 'var(--acc)',
          color: !island ? 'var(--txt3)' : '#fff',
          cursor: !island ? 'not-allowed' : 'pointer',
          fontSize: 15, fontWeight: 700,
          marginBottom: 24,
          transition: 'background .12s',
        }}
      >
        {!island ? 'Välj en ö först' : `Planera utflykten till ${island.name} →`}
      </button>

      {/* Resultat */}
      {showResult && island && departure && (
        <div id="utflykt-result" style={{ scrollMarginTop: 80 }}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(30,92,130,0.08), rgba(45,125,138,0.06))',
            border: '1px solid var(--surface-3)',
            borderRadius: 16,
            padding: '24px',
            marginBottom: 16,
          }}>
            <div style={{ fontSize: 11, opacity: 0.7, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 6 }}>
              Din utflykt
            </div>
            <h2 style={{
              fontSize: 26, fontWeight: 700, color: 'var(--sea)',
              margin: '0 0 6px',
              fontFamily: "'Playfair Display', Georgia, serif",
            }}>
              {departure.shortName} → {island.name}
            </h2>
            <p style={{ fontSize: 14, color: 'var(--txt2)', margin: '0 0 14px', lineHeight: 1.55 }}>
              {island.tagline}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              <span style={{ padding: '4px 12px', borderRadius: 999, background: 'var(--sea)', color: '#fff', fontSize: 12, fontWeight: 700 }}>
                {island.regionLabel}
              </span>
              {travelMinutes !== null && (
                <span style={{ padding: '4px 12px', borderRadius: 999, background: 'var(--surface-2)', color: 'var(--txt)', fontSize: 12, fontWeight: 600 }}>
                  ~{travelMinutes} min med båt (40 km/h)
                </span>
              )}
              <span style={{ padding: '4px 12px', borderRadius: 999, background: 'var(--surface-2)', color: 'var(--txt)', fontSize: 12, fontWeight: 600 }}>
                Säsong: {season.toLowerCase()}
              </span>
            </div>
          </div>

          {/* Restid (tabell) */}
          <Card title="Hur du tar dig dit">
            <div style={{ fontSize: 13, color: 'var(--txt)', lineHeight: 1.65 }}>
              <strong>Officiell restid:</strong> {island.travel_time}
            </div>
            <div style={{ fontSize: 12, color: 'var(--txt3)', marginTop: 6 }}>
              Vår beräkning ovan är grov uppskattning baserat på Haversine-distans och 22 knops snitt — verklig tid kan variera med stoppmönster.
            </div>
          </Card>

          {/* Packlista */}
          <Card title={`Packlista — ${season.toLowerCase()}`}>
            <ul style={{
              margin: 0, padding: 0, listStyle: 'none',
              display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 8,
            }}>
              {packing.map(item => (
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
          </Card>

          {/* Aktiviteter */}
          {island.activities.length > 0 && (
            <Card title={`Vad du kan göra på ${island.name}`}>
              <div style={{ display: 'grid', gap: 10 }}>
                {island.activities.map(a => (
                  <div key={a.name} style={{ paddingBottom: 10, borderBottom: '1px solid var(--surface-3)' }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--txt)', marginBottom: 2 }}>
                      {a.name}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--txt2)', lineHeight: 1.55 }}>{a.desc}</div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Krogar */}
          {krogTips.length > 0 && (
            <Card title="Var du kan äta">
              <div style={{ display: 'grid', gap: 10 }}>
                {krogTips.map(r => (
                  <div key={r.name} style={{ paddingBottom: 10, borderBottom: '1px solid var(--surface-3)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--txt)' }}>{r.name}</div>
                      <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 999, background: 'var(--surface-2)', color: 'var(--txt2)', fontWeight: 700 }}>
                        {r.type}
                      </span>
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--txt2)', lineHeight: 1.55, marginTop: 4 }}>
                      {r.desc}
                    </div>
                  </div>
                ))}
              </div>
              <Link href={`/o/${island.slug}/restauranger`} style={{
                display: 'inline-block', marginTop: 8,
                fontSize: 13, color: 'var(--sea)', textDecoration: 'none', fontWeight: 600,
              }}>
                Alla restauranger på {island.name} →
              </Link>
            </Card>
          )}

          {/* Boende */}
          {island.accommodation.length > 0 && (
            <Card title="Boende">
              <div style={{ display: 'grid', gap: 8 }}>
                {island.accommodation.map(a => (
                  <div key={a.name} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    fontSize: 13, padding: '8px 0', borderBottom: '1px solid var(--surface-3)',
                  }}>
                    <span style={{ color: 'var(--txt)', fontWeight: 600 }}>{a.name}</span>
                    <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 999, background: 'var(--surface-2)', color: 'var(--txt2)', fontWeight: 700 }}>
                      {a.type}
                    </span>
                  </div>
                ))}
              </div>
              <Link href={`/o/${island.slug}/boende`} style={{
                display: 'inline-block', marginTop: 8,
                fontSize: 13, color: 'var(--sea)', textDecoration: 'none', fontWeight: 600,
              }}>
                Alla boenden på {island.name} →
              </Link>
            </Card>
          )}

          {/* Tips */}
          {island.tips.length > 0 && (
            <Card title="Lokala tips">
              <ul style={{ margin: 0, paddingLeft: 18, color: 'var(--txt2)', fontSize: 13, lineHeight: 1.65 }}>
                {island.tips.map((tip, i) => <li key={i} style={{ marginBottom: 6 }}>{tip}</li>)}
              </ul>
            </Card>
          )}

          {/* CTA till hela ön */}
          <div style={{
            background: 'var(--sea)',
            color: '#fff',
            borderRadius: 14,
            padding: '20px 22px',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: 14, opacity: 0.9, marginBottom: 4 }}>Vill du veta mer?</div>
            <Link href={`/o/${island.slug}`} style={{
              display: 'inline-block', marginTop: 6,
              padding: '10px 22px',
              background: '#fff', color: 'var(--sea)',
              borderRadius: 999, textDecoration: 'none',
              fontWeight: 700, fontSize: 14,
            }}>
              Hela guiden till {island.name} →
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{
      background: 'var(--white)',
      border: '1px solid var(--surface-3)',
      borderRadius: 14,
      padding: '18px 22px',
      marginBottom: 14,
    }}>
      <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--txt)', margin: '0 0 12px' }}>
        {title}
      </h3>
      {children}
    </div>
  )
}
