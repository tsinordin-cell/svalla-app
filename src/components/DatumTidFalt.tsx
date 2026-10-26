'use client'
/**
 * Datum och tid på svenska oavsett webbläsarens språk (2026-10-26).
 *
 * <input type="datetime-local"> visar sitt värde i webbläsarens format: i en
 * engelsk Chrome "10/25/2026, 05:11 PM", på en svensk iPhone "2026-10-25 17:11".
 * Här visas alltid "lör 25 okt · 17:11" på svenska, och den riktiga inmatningen
 * ligger genomskinlig ovanpå så att ett tryck öppnar enhetens egen väljare.
 */
import type { CSSProperties } from 'react'
import { formateraDatumTid } from '@/lib/datumtid'

export default function DatumTidFalt({ id, value, onChange, style }: {
  id?: string
  value: string
  onChange: (v: string) => void
  style?: CSSProperties
}) {
  return (
    <div style={{ position: 'relative', ...style }}>
      <div aria-hidden style={{
        width: '100%', padding: '10px 10px', borderRadius: 12,
        border: '1.5px solid rgba(10,123,140,0.15)',
        background: 'var(--white)', fontSize: 13, color: 'var(--txt)',
        boxSizing: 'border-box', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
      }}>
        {formateraDatumTid(value)}
      </div>
      <input
        id={id}
        type="datetime-local"
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }}
      />
    </div>
  )
}
