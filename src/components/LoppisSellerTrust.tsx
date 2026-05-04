/**
 * LoppisSellerTrust — visar trovärdighets-rad i säljarkortet:
 * "Medlem sedan 2024 · 47 turer". Köpare litar mer på etablerade
 * användare. Server-component (statisk data).
 */
interface Props {
  memberSince: string | null
  tripCount: number
}

function formatMemberSince(iso: string | null): string | null {
  if (!iso) return null
  try {
    const d = new Date(iso)
    const now = new Date()
    const months = (now.getFullYear() - d.getFullYear()) * 12 + (now.getMonth() - d.getMonth())
    if (months < 1) return 'Ny medlem'
    if (months < 12) return `Medlem sedan ${d.toLocaleDateString('sv-SE', { month: 'long', year: 'numeric' })}`
    return `Medlem sedan ${d.getFullYear()}`
  } catch { return null }
}

export default function LoppisSellerTrust({ memberSince, tripCount }: Props) {
  const memberLabel = formatMemberSince(memberSince)
  if (!memberLabel && tripCount === 0) return null

  return (
    <div style={{
      display: 'flex', flexWrap: 'wrap', gap: '4px 10px',
      fontSize: 11, color: 'var(--txt3)',
      marginTop: 4,
    }}>
      {memberLabel && (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
          <svg width={11} height={11} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
          </svg>
          {memberLabel}
        </span>
      )}
      {tripCount > 0 && (
        <>
          {memberLabel && <span aria-hidden="true">·</span>}
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            <svg width={11} height={11} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 22a8 8 0 0 1 8-8h0a8 8 0 0 1 8 8"/>
              <path d="M3 8h18l-2 14H5L3 8z"/>
              <path d="M12 14V2"/>
            </svg>
            {new Intl.NumberFormat('sv-SE').format(tripCount)} {tripCount === 1 ? 'tur' : 'turer'}
          </span>
        </>
      )}
    </div>
  )
}
