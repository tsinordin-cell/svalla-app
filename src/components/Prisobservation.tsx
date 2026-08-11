import Icon from '@/components/Icon'

/**
 * Prisobservation — märkning för prisspann som är AVLÄSTA i öppna annonser.
 *
 * Skillnaden mot Prisuppskattning är hela poängen: här pekar varje siffra
 * på en verklig annons hos en namngiven källa. Använd bara när det är sant.
 * Antal, källor och datum ska följa datafilens KÄLLA-kommentar.
 */
export default function Prisobservation({
  antal,
  kallor,
  hamtad,
}: {
  /** Antal annonser spannen bygger på. */
  antal: number
  /** Källorna, t.ex. "Ship O'Hoi och Click&Boat". */
  kallor: string
  /** När annonserna avlästes, t.ex. '10 augusti 2026'. */
  hamtad: string
}) {
  return (
    <aside
      role="note"
      aria-label="Om prisuppgifterna"
      style={{
        background: 'rgba(10,123,140,0.05)',
        border: '1px solid rgba(10,123,140,0.20)',
        borderLeft: '4px solid rgba(10,123,140,0.65)',
        borderRadius: 12,
        padding: '12px 14px',
        marginBottom: 14,
        display: 'flex', alignItems: 'flex-start', gap: 10,
        fontSize: 12, lineHeight: 1.55, color: 'var(--txt)',
      }}
    >
      <span style={{ flexShrink: 0, color: 'var(--sea, #0a7b8c)', marginTop: 1 }}>
        <Icon name="check" size={18} stroke={2} />
      </span>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 700, marginBottom: 3, color: 'var(--sea, #0a7b8c)' }}>
          Spannen är avlästa i {antal} öppna annonser
        </div>
        <p style={{ margin: 0 }}>
          Priserna kommer från annonser hos {kallor}, avlästa {hamtad}. Samma
          båtstorlek kan kosta flera gånger mer hos en förmedlare än en annan —
          jämför alltid innan du bokar. Bränsle tillkommer nästan alltid.
        </p>
      </div>
    </aside>
  )
}
