/**
 * PlaceFactsSection — strukturerade fakta i pill-format.
 *
 * Inspirerad av thatsup.se's "Egenskaper"-sektion. Ger användaren möjlighet
 * att SCANNA fakta på sekunder istället för att läsa beskrivningar.
 *
 * Renderar bara grupper som har data — så en bastu med bara facilities visas
 * inte med tomma "Kök"-rubriker.
 *
 * Server Component.
 */
interface FactGroup {
  label: string
  values: string[]
}

interface Props {
  // Strukturerade fält från restaurants-tabellen
  type?: string | null                 // restaurant, cafe, marina, ...
  categories?: string[] | null         // ["cocktailbar", "brunch", ...]
  bestFor?: string[] | null            // ["family", "couples", ...]
  facilities?: string[] | null         // ["wifi", "outdoor_seating", ...]
  seasonality?: string | null          // "summer_only", "year_round", ...
}

// ─── Etiketter på svenska ───────────────────────────────────────────────────

const TYPE_LABEL: Record<string, string> = {
  restaurant: 'Restaurang',
  cafe: 'Kafé',
  bar: 'Bar',
  marina: 'Gästhamn',
  harbor: 'Hamn',
  anchorage: 'Naturhamn',
  nature_harbor: 'Naturhamn',
  fuel: 'Bränsle',
  fuel_station: 'Bränsle',
  beach: 'Bad',
  sauna: 'Bastu',
  shop: 'Butik',
  hotel: 'Hotell',
  nature: 'Naturplats',
}

const CATEGORY_LABEL: Record<string, string> = {
  cocktailbar: 'Cocktailbar',
  bar: 'Bar',
  restaurant: 'Restaurang',
  cafe: 'Kafé',
  brunch: 'Brunch',
  lunch_stop: 'Lunchstopp',
  dinner_stop: 'Middag',
  coffee: 'Kaffe',
  fika: 'Fika',
  fine_dining: 'Fine dining',
  guest_harbor: 'Gästhamn',
  harbor_stop: 'Hamnstopp',
  marina: 'Marina',
  nature_harbor: 'Naturhamn',
  anchorage: 'Ankarplats',
  ytterhamn: 'Ytterskärgården',
  hidden_gem: 'Dold pärla',
  sunset_stop: 'Solnedgång',
  authentic: 'Autentiskt',
  family_stop: 'Familjevänligt',
  shop: 'Butik',
  provisions: 'Proviant',
  fuel: 'Bränsle',
  bransle: 'Bränsle',
  service_point: 'Service',
  sauna: 'Bastu',
  bastu: 'Bastu',
}

const BEST_FOR_LABEL: Record<string, string> = {
  boaters: 'Båtfolk',
  family: 'Familjer',
  couples: 'Par',
  nature_lovers: 'Naturälskare',
  photographers: 'Fotografer',
  friends: 'Vängäng',
  tourists: 'Turister',
  day_trip: 'Dagsturer',
  groups: 'Stora grupper',
  romantic: 'Romantik',
}

const FACILITY_LABEL: Record<string, string> = {
  electricity: 'El på bryggan',
  water: 'Färskvatten',
  shower: 'Dusch',
  toilet: 'Toalett',
  fuel: 'Bränsle',
  diesel: 'Diesel',
  petrol: 'Bensin',
  wifi: 'WiFi',
  restaurant: 'Restaurang',
  guest_dock: 'Gästbrygga',
  pump_out: 'Pump-out',
  provisions: 'Proviant',
  parking: 'Parkering',
  cafe: 'Kafé',
  bar: 'Bar',
  sauna: 'Bastu',
  anchorage: 'Ankring',
  laundry: 'Tvätt',
  shop: 'Butik',
  outdoor_seating: 'Uteservering',
  pet_friendly: 'Hundvänligt',
  accessible: 'Tillgängligt',
}

const SEASONALITY_LABEL: Record<string, string> = {
  year_round: 'Året runt',
  summer_only: 'Endast sommar',
  spring_summer: 'Vår–sommar',
  summer_autumn: 'Sommar–höst',
  weekends_only: 'Endast helger',
}

// ─── Komponent ──────────────────────────────────────────────────────────────

export default function PlaceFactsSection({
  type, categories, bestFor, facilities, seasonality,
}: Props) {
  const groups: FactGroup[] = []

  const typeLabel = type ? TYPE_LABEL[type] : null
  if (typeLabel) groups.push({ label: 'Typ', values: [typeLabel] })

  const cats = (categories ?? [])
    .map(c => CATEGORY_LABEL[c] ?? capitalize(c))
    .filter((v, i, arr) => v && arr.indexOf(v) === i)            // unique
  // Filtrera bort kategorin som redan visas som "Typ"
  const filteredCats = typeLabel ? cats.filter(c => c !== typeLabel) : cats
  if (filteredCats.length > 0) groups.push({ label: 'Kategorier', values: filteredCats })

  const bf = (bestFor ?? [])
    .map(b => BEST_FOR_LABEL[b] ?? capitalize(b))
    .filter(Boolean)
  if (bf.length > 0) groups.push({ label: 'Passar för', values: bf })

  const fac = (facilities ?? [])
    .map(f => FACILITY_LABEL[f] ?? capitalize(f))
    .filter(Boolean)
  if (fac.length > 0) groups.push({ label: 'Faciliteter', values: fac })

  const seas = seasonality ? SEASONALITY_LABEL[seasonality] : null
  if (seas) groups.push({ label: 'Säsong', values: [seas] })

  if (groups.length === 0) return null

  return (
    <section style={{
      background: 'var(--white)',
      borderRadius: 16,
      padding: '20px 22px',
      marginBottom: 14,
      boxShadow: '0 1px 6px rgba(0,45,60,0.06)',
      border: '1px solid rgba(10, 123, 140, 0.06)',
    }}>
      <div style={{
        fontSize: 11,
        fontWeight: 700,
        color: 'var(--txt3)',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        marginBottom: 14,
      }}>
        Egenskaper
      </div>

      <div style={{ display: 'grid', gap: 14 }}>
        {groups.map(g => (
          <FactGroupRow key={g.label} label={g.label} values={g.values} />
        ))}
      </div>
    </section>
  )
}

function FactGroupRow({ label, values }: { label: string; values: string[] }) {
  return (
    <div>
      <div style={{
        fontSize: 11,
        color: 'var(--txt3)',
        fontWeight: 600,
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
        marginBottom: 6,
      }}>
        {label}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {values.map(v => (
          <span key={v} style={{
            padding: '5px 11px',
            borderRadius: 999,
            background: 'rgba(10, 123, 140, 0.06)',
            border: '1px solid rgba(10, 123, 140, 0.12)',
            fontSize: 12.5,
            fontWeight: 600,
            color: 'var(--txt2)',
          }}>
            {v}
          </span>
        ))}
      </div>
    </div>
  )
}

function capitalize(s: string): string {
  if (!s) return ''
  return s.charAt(0).toUpperCase() + s.slice(1).replace(/_/g, ' ')
}
