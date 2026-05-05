/**
 * <TripGearAffiliate>
 *
 * Diskret "Utrustning på turen"-sektion på tur-detaljvyn.
 * Visar 2-3 curated affiliate-rekommendationer relevanta för turen.
 *
 * REGLER:
 *   - Visas ALDRIG för ägaren av turen (den behöver inte se annonser för sin egen utrustning)
 *   - Visas BARA om turen har en distans (rena landtrips med 0 NM får ingen sektion)
 *   - Max 3 produkter — fler dödar premium-känslan
 *   - "Annons"-badge per kort, plus en sektion-disclosure högst upp
 *
 * MVP-strategin är curated default-set per båttyp. Senare kan vi göra smart
 * matching baserat på väder, distans, klockslag, gps-rutt etc. — men vi
 * börjar enkelt och iterativt så datadrivet. Aldrig "klart men fult".
 */
import AffiliateLink from './AffiliateLink'
import { PROGRAMS, type ProgramId } from '@/lib/affiliate'

type Pick = {
  program: ProgramId
  linkId: string
  title: string
  subtitle: string
  deepLink: string
  /** Lucide-stil-ikon: vest, map, tool, jacket. Renderas som inline SVG. */
  iconKind: 'vest' | 'map' | 'tool' | 'jacket'
}

// ── Curated picks ────────────────────────────────────────────────────────
// Vi börjar med ett gemensamt set som funkar på alla båtturer — sjökläder,
// navigation, säkerhet. Detta är de tre högst-konverterande kategorierna i
// båt-affiliate (källa: branschbenchmarks). Vi iterar baserat på data från
// affiliate_clicks-tabellen efter 4-6 veckor.

const DEFAULT_PICKS: readonly [Pick, Pick, Pick] = [
  {
    program: 'helly_hansen',
    linkId: 'hh-rider-vest',
    title: 'Helly Hansen Rider Vest',
    subtitle: 'Flytväst för dagsturer',
    deepLink: 'https://www.hellyhansen.com/sv_se/rider-vest',
    iconKind: 'vest',
  },
  {
    program: 'navigationsbutiken',
    linkId: 'sjokort-skargard',
    title: 'Sjökort Skärgården',
    subtitle: 'Båtsportkort 6, 7 & 8',
    deepLink: 'https://navigationsbutiken.se/sjokort/batsportkort-skargarden',
    iconKind: 'map',
  },
  {
    program: 'watski',
    linkId: 'watski-multitool',
    title: 'Leatherman Wave Plus',
    subtitle: 'Klassiskt multi-tool för ombord',
    deepLink: 'https://watski.se/verktyg/leatherman-wave-plus',
    iconKind: 'tool',
  },
]

const SEGELBAT_EXTRA: Pick = {
  program: 'watski',
  linkId: 'watski-skotjacka',
  title: 'Helly Hansen Skagen Offshore',
  subtitle: 'Skötjacka för bredare skärgårdsväder',
  deepLink: 'https://watski.se/klader/helly-hansen-skagen-offshore',
  iconKind: 'jacket',
}

// Diskret monoton-ikon per kategori. Inga emojis (repo-policy).
function PickIcon({ kind }: { kind: Pick['iconKind'] }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'var(--sea, #1e5c82)',
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }
  switch (kind) {
    case 'vest':
      return (
        <svg {...common} aria-hidden>
          <path d="M8 3l-4 3v4l3 1v10h10V11l3-1V6l-4-3" />
          <path d="M9 3v18M15 3v18" />
        </svg>
      )
    case 'map':
      return (
        <svg {...common} aria-hidden>
          <path d="M9 3l-6 2v16l6-2 6 2 6-2V3l-6 2-6-2z" />
          <path d="M9 3v16M15 5v16" />
        </svg>
      )
    case 'tool':
      return (
        <svg {...common} aria-hidden>
          <path d="M14.7 6.3a4 4 0 00-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 005.4-5.4l-2.5 2.5-2.5-2.5 2.5-2.5z" />
        </svg>
      )
    case 'jacket':
      return (
        <svg {...common} aria-hidden>
          <path d="M6 4l-3 4 2 3v9h14v-9l2-3-3-4" />
          <path d="M9 4l3 3 3-3M12 7v14" />
        </svg>
      )
  }
}

function pickGearForTrip(boatType: string | null, distanceNm: number | null): readonly Pick[] {
  const isSailboat = boatType?.toLowerCase().includes('segel')
  const isLongTrip = distanceNm != null && distanceNm > 15

  // För segelbåtar på längre turer — byt ut multi-tool mot skötjacka
  if (isSailboat && isLongTrip) {
    return [DEFAULT_PICKS[0], DEFAULT_PICKS[1], SEGELBAT_EXTRA] as const
  }
  return DEFAULT_PICKS
}

type Props = {
  boatType: string | null
  distanceNm: number | null
  isOwner: boolean
  /** Trip-ID — används som UTM-content för per-trip-attribuering */
  tripId: string
}

export default function TripGearAffiliate({ boatType, distanceNm, isOwner, tripId }: Props) {
  // Visa inte för ägaren — de behöver inte se annonser för sin egen utrustning
  if (isOwner) return null
  // Visa inte på 0-distans-turer (incheckningar, planning-turer)
  if (distanceNm == null || distanceNm < 0.5) return null

  const picks = pickGearForTrip(boatType, distanceNm)

  return (
    <section style={{ marginTop: 18, marginBottom: 18 }}>
      <div style={{
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        marginBottom: 10,
      }}>
        <h3 style={{
          fontSize: 11,
          fontWeight: 700,
          color: 'var(--txt3)',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          margin: 0,
        }}>
          Utrustning för turen
        </h3>
        <span style={{
          fontSize: 10,
          color: 'var(--txt3)',
          fontWeight: 600,
          letterSpacing: '0.04em',
        }}>
          Annonsörer · oberoende picks
        </span>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
        gap: 10,
      }}>
        {picks.map(pick => {
          const program = PROGRAMS[pick.program]
          if (!program) return null
          return (
            <AffiliateLink
              key={pick.linkId}
              program={pick.program}
              linkId={pick.linkId}
              placement="tur_gear"
              deepLink={pick.deepLink}
              utmCampaign="trip_gear_2026q2"
              utmContent={`trip_${tripId}`}
              variant="card"
              style={{
                background: 'var(--white)',
                borderRadius: 14,
                padding: '14px 14px 12px',
                boxShadow: '0 1px 6px rgba(0,45,60,0.06)',
                border: '1px solid rgba(10,123,140,0.06)',
                minHeight: 124,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform 0.15s ease, box-shadow 0.15s ease',
              }}
            >
              <div>
                <div style={{ marginBottom: 6, lineHeight: 1 }}>
                  <PickIcon kind={pick.iconKind} />
                </div>
                <div style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: 'var(--txt)',
                  lineHeight: 1.25,
                  marginBottom: 3,
                }}>
                  {pick.title}
                </div>
                <div style={{ fontSize: 11, color: 'var(--txt3)', lineHeight: 1.3 }}>
                  {pick.subtitle}
                </div>
              </div>
              <div style={{
                fontSize: 10,
                color: 'var(--sea, #1e5c82)',
                fontWeight: 700,
                marginTop: 8,
                letterSpacing: '0.02em',
              }}>
                {program.brand} →
              </div>
            </AffiliateLink>
          )
        })}
      </div>
    </section>
  )
}
