/**
 * PlaceFAQSection — vanliga frågor om platsen.
 *
 * SEO-värde: Google FAQPage rich-snippet om vi sätter JSON-LD. Ger oss
 * specialträffar i sökresultat samt fyller plats-sidan med relevant text
 * för long-tail söksökningar (t.ex. "kan man förtöja vid Möja").
 *
 * Frågorna byggs dynamiskt baserat på vad vi vet om platsen — tomma fält
 * skippar tillhörande FAQ. Vi hårdkodar fråga-mall + fyller in fakta.
 *
 * Innehåller native <details>/<summary> för progressiv expansion utan JS.
 */
interface Props {
  name: string
  type?: string | null                          // restaurant, marina, anchorage, ...
  island?: string | null
  region?: string | null
  formattedAddress?: string | null
  phone?: string | null
  websiteUrl?: string | null
  bookingUrl?: string | null
  openingHours?: string | null
  facilities?: string[] | null                  // för "vad finns här"-fråga
  bestFor?: string[] | null
  hasGuestHarbor?: boolean                      // true om gästhamn-faciliteter finns
  approachNotes?: string | null                 // anflygnings-info, om vi har
}

export default function PlaceFAQSection({
  name, type, island, region,
  formattedAddress, phone, websiteUrl, bookingUrl,
  openingHours, facilities, bestFor,
  hasGuestHarbor, approachNotes,
}: Props) {
  const faqs: Array<{ q: string; a: string }> = []

  // ── 1. Var ligger platsen? ──
  if (formattedAddress || island || region) {
    const parts = [formattedAddress, island, region].filter(Boolean) as string[]
    faqs.push({
      q: `Var ligger ${name}?`,
      a: `${name} ligger ${parts.length > 1 ? 'på ' : ''}${parts.join(', ')}. Använd "Visa i Google Maps"-länken högre upp på sidan för exakta vägbeskrivningar.`,
    })
  }

  // ── 2. Hur kommer man hit (med båt)? ── (specialiserat för seglar-publik)
  if (type === 'marina' || type === 'harbor' || type === 'anchorage' || type === 'nature_harbor' || hasGuestHarbor) {
    let ans = `${name} nås enklast med båt. `
    if (approachNotes) {
      ans += approachNotes
    } else {
      ans += 'Kontrollera djup, ankarförhållanden och vindskydd i sjökortet innan du går in. Använd "Planera en tur hit"-funktionen för att få en rutt från din plats.'
    }
    faqs.push({ q: `Hur kommer man till ${name} med båt?`, a: ans })
  }

  // ── 3. Vilka faciliteter finns? ──
  if (facilities && facilities.length > 0) {
    const fmt = facilities.map(f => readableFacility(f)).filter(Boolean).join(', ')
    faqs.push({
      q: `Vilka faciliteter finns på ${name}?`,
      a: `Här finns: ${fmt}.`,
    })
  }

  // ── 4. Behövs bokning? ──
  if (type === 'restaurant' || type === 'cafe' || type === 'bar') {
    if (bookingUrl) {
      faqs.push({
        q: `Behöver man boka bord på ${name}?`,
        a: `Bokning rekommenderas, särskilt under sommarsäsongen. Boka via länken högre upp på sidan eller ring direkt om du föredrar det.`,
      })
    } else if (phone) {
      faqs.push({
        q: `Behöver man boka bord på ${name}?`,
        a: `Det finns ingen online-bokning, men du kan ringa direkt på ${phone} för att reservera bord.`,
      })
    }
  }

  // ── 5. När har de öppet? ──
  if (openingHours) {
    faqs.push({
      q: `När har ${name} öppet?`,
      a: `Aktuella öppettider: ${openingHours}. Kontrollera alltid ${websiteUrl ? 'hemsidan' : 'med platsen'} för säsongsavvikelser.`,
    })
  }

  // ── 6. Passar platsen för vem? ──
  if (bestFor && bestFor.length > 0) {
    const fmt = bestFor.map(b => readableBestFor(b)).filter(Boolean).join(', ')
    faqs.push({
      q: `Passar ${name} för mig?`,
      a: `${name} passar särskilt bra för: ${fmt}.`,
    })
  }

  if (faqs.length === 0) return null

  // ── JSON-LD för Google rich snippets ──
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return (
    <section style={{
      background: 'var(--white)',
      borderRadius: 16,
      padding: '20px 22px',
      marginBottom: 14,
      boxShadow: '0 1px 6px rgba(0,45,60,0.06)',
      border: '1px solid rgba(10, 123, 140, 0.06)',
    }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div style={{
        fontSize: 11,
        fontWeight: 700,
        color: 'var(--txt3)',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        marginBottom: 14,
      }}>
        Vanliga frågor
      </div>

      <div style={{ display: 'grid', gap: 10 }}>
        {faqs.map((f, i) => (
          <details key={i} style={{
            borderBottom: i < faqs.length - 1 ? '1px solid rgba(10, 123, 140, 0.08)' : 'none',
            paddingBottom: 10,
          }}>
            <summary style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 12,
              padding: '8px 0',
              cursor: 'pointer',
              listStyle: 'none',
              fontSize: 14.5,
              fontWeight: 700,
              color: 'var(--txt)',
            }}>
              <span style={{ flex: 1 }}>{f.q}</span>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none"
                stroke="var(--txt3)" strokeWidth={2.4}
                strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </summary>
            <p style={{
              margin: '8px 0 0',
              fontSize: 14,
              color: 'var(--txt2)',
              lineHeight: 1.6,
            }}>
              {f.a}
            </p>
          </details>
        ))}
      </div>
    </section>
  )
}

// ─── Hjälpare ───────────────────────────────────────────────────────────────

function readableFacility(f: string): string {
  const map: Record<string, string> = {
    electricity: 'el på bryggan',
    water: 'färskvatten',
    shower: 'dusch',
    toilet: 'toalett',
    fuel: 'bränsle',
    diesel: 'diesel',
    petrol: 'bensin',
    wifi: 'WiFi',
    restaurant: 'restaurang',
    guest_dock: 'gästbrygga',
    pump_out: 'pump-out',
    provisions: 'proviant',
    parking: 'parkering',
    cafe: 'kafé',
    bar: 'bar',
    sauna: 'bastu',
    anchorage: 'ankring',
    laundry: 'tvätt',
    shop: 'butik',
    outdoor_seating: 'uteservering',
    pet_friendly: 'hundvänligt',
  }
  return map[f] ?? f.replace(/_/g, ' ')
}

function readableBestFor(b: string): string {
  const map: Record<string, string> = {
    boaters: 'båtfolk',
    family: 'familjer',
    couples: 'par',
    nature_lovers: 'naturälskare',
    photographers: 'fotografer',
    friends: 'vängäng',
    tourists: 'turister',
    day_trip: 'dagsturer',
    groups: 'större sällskap',
    romantic: 'romantik',
  }
  return map[b] ?? b.replace(/_/g, ' ')
}
