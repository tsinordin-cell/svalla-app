import Icon from '@/components/Icon'
import { KALLOR_PER_O, type Kalla } from '@/app/o/kallor.generated'

/**
 * Källorna bakom en ösida, synliga för besökaren.
 *
 * Varför det här finns: fram till september 2026 låg all källbeläggning i
 * kodkommentarer. Ingen utanför repot kunde kontrollera den — och eftersom
 * ingen läste den höll 29 procent av källraderna inte vid granskning.
 *
 * En källa som syns blir läst. Listan gör tre saker samtidigt: den ger
 * besökaren ett skäl att lita på sidan, den gör våra fel hittbara av andra
 * än oss själva, och den ger KÄLLA-kommentarerna en konsument så att de
 * underhålls i stället för att ruttna.
 *
 * Listan genereras av scripts/generera-kallor.mjs. Saknar en ö källor här
 * betyder det att dess KÄLLA-rader inte har öppningsbara adresser ännu —
 * inte att sidan saknar underlag.
 */

type Grupp = { org: string; myndighet: boolean; sidor: Kalla[] }

/** En organisation kan ha flera sidor. Visa den en gång, med sidorna under. */
function gruppera(kallor: Kalla[]): Grupp[] {
  const perOrg = new Map<string, Grupp>()
  for (const k of kallor) {
    const nyckel = k.org.toLocaleLowerCase('sv')
    const fanns = perOrg.get(nyckel)
    if (fanns) {
      fanns.sidor.push(k)
      if (k.myndighet) fanns.myndighet = true
    } else {
      perOrg.set(nyckel, { org: k.org, myndighet: k.myndighet, sidor: [k] })
    }
  }
  return [...perOrg.values()].sort((a, b) => {
    if (a.myndighet !== b.myndighet) return a.myndighet ? -1 : 1
    return a.org.localeCompare(b.org, 'sv')
  })
}

function Kort({ grupp, visaDatum }: { grupp: Grupp; visaDatum: boolean }) {
  const { org, myndighet, sidor } = grupp
  return (
    <li
      style={{
        listStyle: 'none',
        marginBottom: 8,
        padding: '11px 13px',
        borderRadius: 10,
        background: 'var(--white)',
        border: '1px solid var(--surface-3)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: sidor.length ? 5 : 0 }}>
        <span aria-hidden style={{ flexShrink: 0, display: 'flex', color: myndighet ? 'var(--sea)' : 'var(--txt3)' }}>
          <Icon name={myndighet ? 'check' : 'link'} size={14} stroke={2} />
        </span>
        <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--txt)', lineHeight: 1.3 }}>{org}</span>
        {myndighet && (
          <span style={{ fontSize: 9.5, fontWeight: 700, color: 'var(--sea)', letterSpacing: 0.4, textTransform: 'uppercase' }}>
            Myndighet
          </span>
        )}
      </div>

      <ul style={{ margin: 0, padding: 0 }}>
        {sidor.map(s => (
          <li key={s.url} style={{ listStyle: 'none', marginTop: 4, paddingLeft: 22 }}>
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer nofollow"
              /*
                overflowWrap: en källa utan `vad` visas som sin egen adress, och
                en adress är ett enda obrutet ord. Utan brytning sköt
                varmdo.se/varmdohamnar/parkera.4.6e5e3cc318a8… ut 59 px utanför
                skärmen på mobil och gav hela ösidan horisontell scroll.
                `anywhere` bryter bara när ordet inte får plats.
              */
              style={{
                fontSize: 12, color: 'var(--txt2)', lineHeight: 1.45, textDecoration: 'none',
                display: 'inline-block', maxWidth: '100%', overflowWrap: 'anywhere',
              }}
            >
              {s.vad || s.url.replace(/^https?:\/\/(www\.)?/, '')}
              <span aria-hidden style={{ color: 'var(--txt3)', marginLeft: 5, fontSize: 11 }}>&#8599;</span>
              {visaDatum && s.last && (
                <span style={{ display: 'block', fontSize: 10.5, color: 'var(--txt3)', marginTop: 1 }}>
                  Läst {s.last}
                </span>
              )}
            </a>
          </li>
        ))}
      </ul>
    </li>
  )
}

export default function IslandKallor({ slug, islandName }: { slug: string; islandName: string }) {
  const kallor = KALLOR_PER_O[slug]
  if (!kallor || kallor.length === 0) return null

  const grupper = gruppera(kallor)
  const myndigheter = grupper.filter(g => g.myndighet).length

  // Lästes allt samma dag står datumet en gång i ingressen i stället för under
  // varje rad. Skiljer datumen sig åt hör de hemma vid respektive sida.
  const datum = [...new Set(kallor.map(k => k.last).filter(Boolean))]
  const gemensamtDatum = datum.length === 1 ? datum[0] : null

  /** Tre källor öppet, resten i ett scrollfönster. */
  const SYNLIGA = 3
  const forsta = grupper.slice(0, SYNLIGA)
  const resten = grupper.slice(SYNLIGA)

  return (
    // marginTop: källorna är fotnoter och ska inte klistra i "Besök också".
    <section style={{ marginTop: 44, marginBottom: 36 }} aria-labelledby={`kallor-${slug}`}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 6 }}>
        <span aria-hidden style={{ color: 'var(--sea)', display: 'flex' }}>
          <Icon name="clipboard" size={18} stroke={2} />
        </span>
        <h2 id={`kallor-${slug}`} style={{ fontSize: 18, fontWeight: 700, color: 'var(--txt)', margin: 0 }}>
          Källor för {islandName}
        </h2>
      </div>

      <p style={{ fontSize: 12.5, color: 'var(--txt2)', lineHeight: 1.5, margin: '0 0 14px' }}>
        {kallor.length} {kallor.length === 1 ? 'sida' : 'sidor'} hos {grupper.length}{' '}
        {grupper.length === 1 ? 'källa' : 'källor'}
        {myndigheter > 0 && `, varav ${myndigheter} myndighet eller kommun`}. Vi skriver
        inga öppettider, avgångstider eller priser utan publicerad prislista, och inget
        om årtal, areal eller service utan att någon läst källan.
        {gemensamtDatum && ` Samtliga lästa ${gemensamtDatum}.`} Hittar du något som
        inte stämmer — hör av dig, vi rättar det.
      </p>

      <ul style={{ margin: 0, padding: 0 }}>
        {forsta.map(g => (
          <Kort key={g.org} grupp={g} visaDatum={!gemensamtDatum} />
        ))}
      </ul>

      {/* Resten hopfällt. <details> och inte ett scrollfält: ett scrollområde
          inuti en sida som redan scrollar fångar hjulet på fel element och är
          svårt att träffa på mobil.

          Och inte en knapp som hämtar innehållet vid klick — då hade källorna
          saknats i HTML:en och sökmotorerna aldrig sett beläggningen. Här
          ligger varje länk i sidan från början, bara visuellt hopfälld. */}
      {resten.length > 0 && (
        <details className="kallor-detaljer" style={{ marginTop: 10 }}>
          <summary
            style={{
              cursor: 'pointer', listStyle: 'none',
              display: 'inline-flex', alignItems: 'center', gap: 7,
              padding: '9px 15px', borderRadius: 999,
              background: 'var(--white)', border: '1px solid var(--surface-3)',
              fontSize: 13, fontWeight: 600, color: 'var(--sea-d, var(--txt2))',
              WebkitTapHighlightColor: 'transparent',
            }}
          >
            Visa fler källor ({resten.length})
            <span aria-hidden style={{ fontSize: 11, color: 'var(--txt3)' }}>&#9662;</span>
          </summary>
          {/* Safari ritar en egen triangel framför summary trots listStyle:none. */}
          <style>{`.kallor-detaljer summary::-webkit-details-marker { display: none; }`}</style>
          <ul style={{ margin: '10px 0 0', padding: 0 }}>
            {resten.map(g => (
              <Kort key={g.org} grupp={g} visaDatum={!gemensamtDatum} />
            ))}
          </ul>
        </details>
      )}
    </section>
  )
}
