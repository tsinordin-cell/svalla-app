import Icon from '@/components/Icon'
import { SEA_DATA_VERSION, SEA_DATA_SOURCE } from '@/lib/seaWaypoints'

/**
 * RouteDisclaimer — juridisk + säkerhets-markering på rutt-sidor.
 *
 * Visa alltid när vi presenterar en navigerbar rutt. Detta är inte
 * frivilligt — utan tydlig disclaimer riskerar Svalla skadeståndsanspråk
 * om en användare förlitar sig på rutten och kör på grund.
 *
 * Komponenten innehåller även versionsinfo så användaren ser att rutterna
 * uppdateras kontinuerligt.
 */
export default function RouteDisclaimer() {
  return (
    <aside
      role="note"
      aria-label="Säkerhetsinformation om rutten"
      style={{
        background: 'rgba(217,119,6,0.06)',
        border: '1px solid rgba(217,119,6,0.22)',
        borderLeft: '4px solid rgba(217,119,6,0.7)',
        borderRadius: 12,
        padding: '12px 14px',
        marginBottom: 16,
        display: 'flex', alignItems: 'flex-start', gap: 10,
        fontSize: 12, lineHeight: 1.55, color: 'var(--txt)',
      }}
    >
      <span style={{ flexShrink: 0, color: '#c05010', marginTop: 1 }}>
        <Icon name="compass" size={18} stroke={2} />
      </span>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 700, marginBottom: 3, color: '#c05010' }}>
          Rutten är ett förslag — inte en navigationsanvisning
        </div>
        <p style={{ margin: '0 0 4px' }}>
          Använd alltid uppdaterat sjökort, GPS, VHF och kontrollera väder innan
          avgång. Svalla tar inte ansvar för navigationsbeslut. Brohöjder,
          djupförhållanden och farledsändringar kan avvika.
        </p>
        <p style={{ margin: 0, fontSize: 11, color: 'var(--txt3)' }}>
          Sjödata: {SEA_DATA_VERSION} · {SEA_DATA_SOURCE}
        </p>
      </div>
    </aside>
  )
}
