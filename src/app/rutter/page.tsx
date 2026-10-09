import { createPublicSupabaseClient } from '@/lib/supabase-server'
import type { Tour } from '@/lib/supabase'
import Link from 'next/link'
import type { Metadata } from 'next'
import { ISLANDS } from '@/app/o/island-data'
import { SEED_FERRY_ROUTES, fetchDeparturesResult, operatorWebbplats, type FerryRoute } from '@/lib/ferries'
import RutterVyer from './RutterVyer'

// ── Öar-sektioner (matchar /oar) ──────────────────────────────────────────
const ISLAND_SECTIONS = [
  {
    id: 'inner',
    label: 'Innerskärgården',
    color: 'var(--sea)',
    bg: 'rgba(30,92,130,0.07)',
    description: 'De närmaste öarna — lätta att nå, perfekta för en dag.',
    slugs: ['fjaderholmarna', 'vaxholm', 'grinda', 'finnhamn', 'rindo', 'resaro'],
  },
  {
    id: 'mellersta',
    label: 'Mellersta skärgården',
    color: 'var(--sea)',
    bg: 'rgba(10,123,140,0.07)',
    description: 'Det klassiska skärgårdslivet — Sandhamn, Möja och öarna däremellan.',
    slugs: [
      'sandhamn', 'moja', 'ljustero', 'gallno', 'ingmarso', 'namdo', 'svartso',
      'runmaro', 'husaro', 'kymmendo', 'bullero', 'vindo', 'ingaro', 'hasselo',
      'svenska-hogarna', 'huvudskar', 'ekno', 'ormsko', 'norrpada',
      'storholmen', 'storskar',
      'bjorko', 'adelsjo'],
  },
  {
    id: 'södra',
    label: 'Södra skärgården',
    color: '#2a6e50',
    bg: 'rgba(42,110,80,0.07)',
    description: 'Vilda klippor, öppet hav och Utö — den dramatiska södra skärgården.',
    slugs: [
      'uto', 'dalaro', 'orno', 'landsort', 'nattaro', 'asko', 'galo', 'toro',
      'fjardlang', 'smaadalaro', 'morko', 'musko', 'langviksskaret'],
  },
  {
    id: 'norra',
    label: 'Norra skärgården',
    color: '#7a4e2d',
    bg: 'rgba(122,78,45,0.07)',
    description: 'Orörda öar, höga klippor och en av Europas ovanligaste mötesplatser.',
    slugs: [
      'arholma', 'furusund', 'blido', 'norrora', 'fejan', 'rodloga', 'singo',
      'lido', 'graddo', 'vaddo', 'yxlan', 'graskar',
      'langskar'],
  }]

const islandBySlug = Object.fromEntries(ISLANDS.map(i => [i.slug, i]))

export const metadata: Metadata = {
  title: 'Rutter',
  description: 'Utforska kurerade skärgårdsrutter för motorbåt, segelbåt, kajak och mer. Hitta rätt rutt för din tur.',
  alternates: { canonical: 'https://svalla.se/rutter' },
  openGraph: {
    title: 'Rutter – Svalla',
    description: 'Kurerade skärgårdsrutter med restauranger, tips och svårighetsgrad.',
    url: 'https://svalla.se/rutter',
  },
}

// CACHEBAR (rester efter revisionen, 2026-10-07). Sidan var "ärligt dynamisk"
// sedan 2026-08-02: den läste searchParams (?vy=, ?for=, ?tid=) och cookies
// (auth-klienten) fast allt innehåll är publikt. Nu hämtar servern alla turer
// (13 st, 16 kB) med den cookie-fria klienten och renderar Öar- och
// Färjor-vyerna; vyval och filter ligger i klienten (RutterVyer.tsx, mönstret
// från ProfileTabs.tsx, CLAUDE.md p27). Samma intervall som /farjor, så att
// färjeavgångarna i Färjor-vyn är högst tio minuter gamla. Uppmätt före:
// MISS och private/no-store på varje besök, 0,5–2 s TTFB.
export const revalidate = 600

export default async function RutterPage() {
  const supabase = createPublicSupabaseClient()
  const { data: tours, error } = await supabase
    .from('tours')
    .select('id, slug, title, start_location, destination, transport_types, duration_label, best_for, highlights, usp, category, food_stops, tone_tags, hamn_profil, bad_profil')
    .order('title', { ascending: true })
    .limit(200)
  // Kasta i stället för att rendera en tom sida: en förnyelse som misslyckas
  // behåller då den gamla sidan i cachen (samma mönster som #450).
  if (error) throw new Error(`Kunde inte läsa turer: ${error.message}`)

  return (
    <RutterVyer
      tours={(tours ?? []) as Tour[]}
      antalOar={ISLANDS.length}
      antalFarjelinjer={SEED_FERRY_ROUTES.length}
      oar={<IslandsView />}
      farjor={<FerriesView />}
    />
  )
}

/**
 * Visar tid som "17:00" om avgången är idag, annars "i morgon 07:45" eller
 * "tors 07:45". Utan detta listades en avgång 07:45 dagen efter rakt under
 * en 17:00 idag, som om båten gick om tio timmar bakåt i tiden.
 *
 * Jämför på datumsträng i Europe/Stockholm i stället för att konvertera
 * Date-objekt: tiderna från ResRobot är redan lokala klockslag utan zon, och
 * en konvertering på en UTC-server hade flyttat dem.
 */
function departureLabel(iso: string): string {
  const [datum, klocka = ''] = iso.split('T')
  const hhmm = klocka.slice(0, 5)
  const nu = new Date()
  const idag = nu.toLocaleDateString('sv-SE', { timeZone: 'Europe/Stockholm' })
  if (datum === idag) return hhmm
  const imorgon = new Date(nu.getTime() + 86400000).toLocaleDateString('sv-SE', { timeZone: 'Europe/Stockholm' })
  if (datum === imorgon) return `i morgon ${hhmm}`
  const dag = new Date(`${datum}T12:00:00`).toLocaleDateString('sv-SE', { weekday: 'short' })
  return `${dag} ${hhmm}`
}

async function FerriesView() {
  // revision 2026-10-02: `fel` skiljer "kunde inte hämtas" från "inga avgångar".
  const routesWithDeps = await Promise.all(
    SEED_FERRY_ROUTES.map(async (r: FerryRoute) => {
      const { departures, fel } = await fetchDeparturesResult(r, 3)
      return { route: r, deps: departures, fel }
    }),
  )
  const anyLive = routesWithDeps.some(r => r.deps.length > 0)
  const allaFel = routesWithDeps.every(r => r.fel !== null)

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '16px 16px 100px' }}>
      {anyLive ? (
        <div style={{
          background: 'rgba(30,92,130,0.08)',
          border: '1px solid rgba(30,92,130,0.22)',
          borderRadius: 12,
          padding: '10px 14px',
          fontSize: 12.5,
          color: 'var(--txt2)',
          lineHeight: 1.5,
          marginBottom: 14,
        }}>
          <strong style={{ color: 'var(--txt)' }}>Live.</strong> Avgångar hämtas från Trafiklab. Dubbelkolla alltid mot operatören inför avgång.
        </div>
      ) : (
        <div style={{
          background: 'rgba(201,110,42,0.08)',
          border: '1px solid rgba(201,110,42,0.25)',
          borderRadius: 12,
          padding: '10px 14px',
          fontSize: 12.5,
          color: 'var(--txt2)',
          lineHeight: 1.5,
          marginBottom: 14,
        }}>
          {/* revision 2026-10-02: när ingen rutt kunde hämtas säger vi det, i stället för "inga avgångar".
              Ingen orsak och inget "just nu": orsaken kan vara en saknad nyckel. */}
          {allaFel ? (
            <>
              <strong style={{ color: 'var(--txt)' }}>Avgångarna kunde inte hämtas.</strong> Vi visar bara tider vi kan hämta från Trafiklab — följ länken till operatören för tidtabell.
            </>
          ) : (
            <>
              <strong style={{ color: 'var(--txt)' }}>Inga live-avgångar.</strong> Vi visar bara tider vi kan hämta från Trafiklab — följ länken till operatören för tidtabell.
            </>
          )}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 14 }}>
        {routesWithDeps.map(({ route: r, deps, fel }) => {
          const isLive = deps.length > 0
          const opColor = r.operator === 'Waxholmsbolaget' ? '#1e5c82' : r.operator === 'Cinderella' ? '#c96e2a' : '#2e7d32'
          const opBg = r.operator === 'Waxholmsbolaget' ? 'rgba(30,92,130,0.08)' : r.operator === 'Cinderella' ? 'rgba(201,110,42,0.1)' : 'rgba(46,125,50,0.08)'
          return (
            <article key={r.id} style={{
              background: 'var(--white)', borderRadius: 14,
              padding: '16px 18px',
              border: '1.5px solid rgba(10,123,140,0.10)',
              boxShadow: '0 1px 4px rgba(0,45,60,0.06)',
              display: 'flex', flexDirection: 'column',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <span style={{
                  fontSize: 10, fontWeight: 700, color: opColor, background: opBg,
                  padding: '3px 9px', borderRadius: 20,
                  textTransform: 'uppercase', letterSpacing: 0.4,
                }}>{r.operator}</span>
                <span style={{ fontSize: 11, color: 'var(--txt3)' }}>{r.season}</span>
                {isLive && (
                  <span style={{
                    marginLeft: 'auto', fontSize: 10, fontWeight: 700, color: '#fff',
                    background: '#2e7d32', padding: '2px 8px', borderRadius: 20,
                    letterSpacing: 0.3, display: 'inline-flex', alignItems: 'center', gap: 4,
                  }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff' }} />
                    LIVE
                  </span>
                )}
              </div>
              <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--txt)', margin: '0 0 4px' }}>{r.name}</h2>
              <p style={{ fontSize: 12, color: 'var(--txt2)', margin: '0 0 12px', lineHeight: 1.5 }}>
                {r.stops.join(' → ')}
              </p>
              <div style={{ borderTop: '1px solid rgba(10,123,140,0.10)', paddingTop: 10, marginBottom: 10 }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6 }}>
                  Kommande avgångar
                </div>
                {deps.length === 0 ? (
                  <div style={{ fontSize: 12, color: 'var(--txt2)', lineHeight: 1.5, padding: '2px 0' }}>
                    {/* revision 2026-10-02: ett hämtfel får inte se ut som "inga båtar" */}
                    {fel
                      ? <>Avgångarna kunde inte hämtas — se {operatorWebbplats(r)}.</>
                      : <>Ingen båtavgång hittad — se operatörens tidtabell.</>}
                  </div>
                ) : deps.map((d, i) => (
                  <div key={i} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8,
                    padding: '6px 0',
                    borderBottom: i === deps.length - 1 ? 'none' : '1px solid rgba(10,123,140,0.08)',
                  }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--txt)', whiteSpace: 'nowrap' }}>
                      {departureLabel(d.time)}
                      {d.arrival && <span style={{ fontWeight: 400, color: 'var(--txt3)' }}>{'\u2013'}{d.arrival}</span>}
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--txt2)', textAlign: 'right' }}>
                      {d.to}
                      {d.changes ? <span style={{ color: 'var(--txt3)' }}> · {d.changes} byte{d.changes > 1 ? 'n' : ''}</span> : null}
                    </div>
                  </div>
                ))}
              </div>
              <a href={r.infoUrl} target="_blank" rel="noopener noreferrer" style={{
                marginTop: 'auto', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                height: 36, borderRadius: 10,
                background: 'var(--sea)', color: '#fff',
                fontSize: 12, fontWeight: 600, textDecoration: 'none',
              }}>
                Öppna tidtabell hos {r.operator} →
              </a>
            </article>
          )
        })}
      </div>
    </div>
  )
}

function IslandsView() {
  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '12px 16px 100px' }}>
      {ISLAND_SECTIONS.map(section => {
        const islands = section.slugs.map(s => islandBySlug[s]).filter((x): x is NonNullable<typeof x> => !!x)
        if (!islands.length) return null
        return (
          <section key={section.id} style={{ paddingTop: 20 }}>
            <div style={{
              display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
              gap: 12, marginBottom: 14,
              paddingBottom: 10,
              borderBottom: `1.5px solid ${section.color}22`,
            }}>
              <div style={{ minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                  <h2 style={{ fontSize: 17, fontWeight: 700, color: section.color, margin: 0 }}>
                    {section.label}
                  </h2>
                  <span style={{
                    fontSize: 10, fontWeight: 700, padding: '2px 7px', borderRadius: 10,
                    background: section.bg, color: section.color,
                  }}>
                    {islands.length} öar
                  </span>
                </div>
                <p style={{ fontSize: 12, color: 'var(--txt2)', margin: 0, lineHeight: 1.4 }}>
                  {section.description}
                </p>
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: 10,
            }}>
              {islands.map(island => (
                <Link key={island.slug} href={`/o/${island.slug}`}
                  className="rutter-island-card"
                  style={{
                    textDecoration: 'none',
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '12px 14px',
                    background: 'var(--white)',
                    borderRadius: 14,
                    border: '1px solid rgba(10,123,140,0.08)',
                    boxShadow: '0 1px 3px rgba(0,45,60,0.05)',
                  }}>
                  <div style={{
                    flexShrink: 0, width: 40, height: 40,
                    background: section.bg, borderRadius: 10,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: section.color,
                  }}>
                    <svg viewBox="0 0 24 24" width={22} height={22} fill="none"
                      stroke="currentColor" strokeWidth={1.8}
                      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontSize: 14, fontWeight: 700, color: 'var(--txt)',
                      marginBottom: 2, whiteSpace: 'nowrap',
                      overflow: 'hidden', textOverflow: 'ellipsis',
                    }}>
                      {island.name}
                    </div>
                    <div style={{
                      fontSize: 11, color: 'var(--txt2)', lineHeight: 1.35,
                      display: '-webkit-box', WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical', overflow: 'hidden',
                    }}>
                      {island.tagline}
                    </div>
                  </div>
                  <svg viewBox="0 0 24 24" width={16} height={16} fill="none"
                    stroke="var(--txt3)" strokeWidth={2}
                    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
                    style={{ flexShrink: 0 }}>
                    <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                  </svg>
                </Link>
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}
