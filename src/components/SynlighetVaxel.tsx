'use client'

/**
 * Växel för turens synlighet: "Synlig för alla" eller "Privat tur".
 *
 * Samma utseende och texter som växeln på /spara (beslut A 2026-08-16: turer
 * är synliga som standard och användaren kan välja privat). Egen komponent
 * sedan 2026-11-19, eftersom snabb-loggen (/logga/manuell) och GPX-importen
 * (/importera) saknade valet: turer därifrån blev alltid publika och gick bara
 * att göra privata i efterhand, så de låg öppna en stund först.
 *
 * Skyddet ligger i databasen (regeln trips_select_visible), inte här: växeln
 * bestämmer bara vilket värde som sparas i trips.visibility.
 */
export default function SynlighetVaxel({
  privat,
  onChange,
  flera = false,
}: {
  privat: boolean
  onChange: (privat: boolean) => void
  /** Sant när valet gäller flera turer på en gång (importen). */
  flera?: boolean
}) {
  const rubrik = privat
    ? (flera ? 'Privata turer' : 'Privat tur')
    : (flera ? 'Synliga för alla' : 'Synlig för alla')
  const forklaring = privat
    ? (flera
        ? 'Bara du ser turerna. De visas inte i flödet eller på din profil för andra.'
        : 'Bara du ser turen. Den visas inte i flödet eller på din profil för andra.')
    : (flera
        ? 'Turerna visas i flödet och på din profil. Växla för att hålla dem privata.'
        : 'Turen visas i flödet och på din profil. Växla för att hålla den privat.')

  return (
    <button
      type="button"
      onClick={() => onChange(!privat)}
      aria-pressed={privat}
      className="w-full rounded-2xl press-feedback"
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: 12, padding: '14px 16px', cursor: 'pointer', textAlign: 'left',
        background: 'var(--white)', border: '1px solid rgba(10,123,140,0.15)',
        boxShadow: '0 1px 6px rgba(0,45,60,0.06)',
      }}
    >
      <span style={{ minWidth: 0 }}>
        <span style={{ display: 'block', fontSize: 14, fontWeight: 700, color: 'var(--txt)' }}>
          {rubrik}
        </span>
        <span style={{ display: 'block', fontSize: 12, color: 'var(--txt3)', marginTop: 2 }}>
          {forklaring}
        </span>
      </span>
      <span
        aria-hidden="true"
        style={{
          flexShrink: 0, width: 46, height: 26, borderRadius: 13, position: 'relative',
          background: privat ? 'var(--sea)' : 'rgba(10,123,140,0.18)',
          transition: 'background 0.15s ease',
        }}
      >
        <span style={{
          position: 'absolute', top: 3, left: privat ? 23 : 3,
          width: 20, height: 20, borderRadius: '50%', background: '#fff',
          boxShadow: '0 1px 3px rgba(0,0,0,0.25)', transition: 'left 0.15s ease',
        }} />
      </span>
    </button>
  )
}
