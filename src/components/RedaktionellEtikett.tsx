import { REDAKTIONELL_ETIKETT, REDAKTIONELL_FORKLARING } from '@/lib/redaktionellt'

/** Liten etikett efter namnet på forumets startinlägg (lib/redaktionellt.ts). */
export default function RedaktionellEtikett({ ljus = false }: { ljus?: boolean }) {
  return (
    <span
      title={REDAKTIONELL_FORKLARING}
      style={{
        fontSize: 10, fontWeight: 700, letterSpacing: '0.02em',
        padding: '1px 6px', borderRadius: 4, whiteSpace: 'nowrap',
        color: ljus ? '#fff' : 'var(--sea, #0a7b8c)',
        background: ljus ? 'rgba(255,255,255,0.22)' : 'rgba(10,123,140,0.10)',
        border: ljus ? '1px solid rgba(255,255,255,0.35)' : '1px solid rgba(10,123,140,0.25)',
      }}
    >
      {REDAKTIONELL_ETIKETT}
    </span>
  )
}
