import Icon from '@/components/Icon'

/**
 * Prisuppskattning — märkning för prisspann som INTE är hämtade per aktör.
 *
 * Visa alltid ovanför en pristabell där siffrorna är Svallas egen
 * marknadsuppskattning. Utan den här rutan läser besökaren ett spann som
 * en prislista, och vi påstår i praktiken något vi inte kontrollerat.
 *
 * Är priset avläst hos en operatör ska den här komponenten INTE användas —
 * då hör källa och avläsningsdatum till posten i stället.
 *
 * Datumet ska följa markörerna i datafilen:
 *   // UPPSKATTNING: ... (åååå-mm)
 * Uppdateras spannen ska både datafilens markör och `uppdaterad` ändras.
 */
export default function Prisuppskattning({
  uppdaterad = 'augusti 2026',
  vad = 'uthyrare',
}: {
  /** Månad och år då spannen senast sattes, t.ex. 'augusti 2026'. */
  uppdaterad?: string
  /** Vilken sorts aktör spannen avser, t.ex. 'uthyrare' eller 'arrangörer'. */
  vad?: string
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
        <Icon name="info" size={18} stroke={2} />
      </span>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 700, marginBottom: 3, color: 'var(--sea, #0a7b8c)' }}>
          Prisspannen är Svallas uppskattning — inte en prislista
        </div>
        <p style={{ margin: 0 }}>
          Vi har inte hämtat priserna från enskilda {vad}. Spannen ska ge dig en
          känsla för vad en dag kostar, senast satta {uppdaterad}. Kontrollera
          alltid aktuellt pris hos {vad === 'arrangörer' ? 'arrangören' : 'uthyraren'} innan du planerar budgeten.
        </p>
      </div>
    </aside>
  )
}
