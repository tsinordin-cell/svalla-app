import { OBILDER } from '@/app/o/obilder.generated'

/**
 * Fotograf och licens för Commons-bilder som visas utan egen bildtext
 * (miniatyrer i listor). CC BY och CC BY-SA kräver att upphovsperson och
 * licens anges på ett rimligt sätt; en samlad lista på sidan uppfyller det.
 */
export default function Bildkallor({ slugs, namn }: { slugs: string[]; namn: Record<string, string> }) {
  const rader = slugs.flatMap(s => { const b = OBILDER[s]; return b ? [{ s, b }] : [] })
  if (rader.length === 0) return null
  return (
    <details style={{ fontSize: 12, color: 'var(--txt3)', lineHeight: 1.7, margin: '8px 0 0' }}>
      <summary style={{ cursor: 'pointer', fontWeight: 600 }}>Bildkällor (Wikimedia Commons)</summary>
      <p style={{ margin: '8px 0 0' }}>
        {rader.map(({ s, b }, i) => {
          return (
            <span key={s}>
              {i > 0 && ' · '}
              {namn[s] ?? s}: <a href={b.kalla} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>{b.fotograf}</a>,{' '}
              {b.licensUrl ? <a href={b.licensUrl} target="_blank" rel="noopener noreferrer license" style={{ color: 'inherit' }}>{b.licens}</a> : b.licens}
            </span>
          )
        })}
      </p>
    </details>
  )
}
