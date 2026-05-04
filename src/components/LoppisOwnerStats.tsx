/**
 * LoppisOwnerStats — visar visningar + sparningar för annonsens ägare.
 * Server component (statistiska siffror, ingen interaktion).
 */
interface Props {
  viewCount: number
  saveCount: number
  replyCount: number
}

export default function LoppisOwnerStats({ viewCount, saveCount, replyCount }: Props) {
  const items = [
    {
      label: 'Visningar',
      value: viewCount,
      icon: (
        <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
      ),
    },
    {
      label: saveCount === 1 ? 'Sparning' : 'Sparningar',
      value: saveCount,
      icon: (
        <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
      ),
    },
    {
      label: replyCount === 1 ? 'Svar' : 'Svar',
      value: replyCount,
      icon: (
        <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H11.5L7.5 19.8a.6.6 0 0 1-1-.5V16H6a2 2 0 0 1-2-2Z"/>
        </svg>
      ),
    },
  ]

  return (
    <div style={{
      background: 'var(--card-bg, #fff)',
      border: '1px solid var(--border, rgba(10,123,140,0.10))',
      borderRadius: 14,
      padding: 14,
      marginBottom: 16,
    }}>
      <div style={{
        fontSize: 11, fontWeight: 700, color: 'var(--txt3)',
        letterSpacing: '0.6px', textTransform: 'uppercase',
        marginBottom: 12,
      }}>
        Annons-stats
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 8,
      }}>
        {items.map(it => (
          <div key={it.label} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
            padding: '12px 6px',
            background: 'rgba(10,123,140,0.04)',
            borderRadius: 10,
          }}>
            <span style={{ color: 'var(--sea)' }}>{it.icon}</span>
            <span style={{ fontSize: 22, fontWeight: 700, color: 'var(--txt)', lineHeight: 1, letterSpacing: '-0.5px' }}>
              {new Intl.NumberFormat('sv-SE').format(it.value)}
            </span>
            <span style={{ fontSize: 11, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: '0.4px', fontWeight: 600 }}>
              {it.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
