/** Shared utility functions for Svalla */

/** Human-readable relative time. Works in both server and client components. */
export function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const m = Math.floor(diff / 60000)
  if (m < 1) return 'Just nu'
  if (m < 60) return `${m} min sedan`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h sedan`
  const d = Math.floor(h / 24)
  if (d === 1) return 'Igår'
  if (d < 7) return `${d} dagar sedan`
  return new Date(dateStr).toLocaleDateString('sv-SE', { day: 'numeric', month: 'short' })
}

/** Short version used in notification bell and comments (m / h / d) */
export function timeAgoShort(dateStr: string): string {
  const m = Math.floor((Date.now() - new Date(dateStr).getTime()) / 60000)
  if (m < 1) return 'Just nu'
  if (m < 60) return `${m}m`
  if (m < 1440) return `${Math.floor(m / 60)}h`
  return `${Math.floor(m / 1440)}d`
}

/** Absolut datum i svensk lokal — för title-attribut vid hover. */
export function absoluteDate(dateStr: string): string {
  const d = new Date(dateStr)
  return d.toLocaleString('sv-SE', {
    year: 'numeric', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

/** Deterministisk gradient-fallback för avatar baserat på username/id. */
export function avatarGradient(seed: string | null | undefined): string {
  const s = (seed ?? 'svalla').toLowerCase()
  let h = 0
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0
  const hue1 = h % 360
  const hue2 = (hue1 + 40 + (h >> 8) % 80) % 360
  return `linear-gradient(135deg, hsl(${hue1}, 55%, 42%) 0%, hsl(${hue2}, 60%, 32%) 100%)`
}

/** Initialer från username — max 2 tecken. */
export function initialsOf(name: string | null | undefined): string {
  const n = (name ?? '?').trim()
  if (!n) return '?'
  const parts = n.split(/\s+/)
  if (parts.length >= 2) return (parts[0]![0]! + parts[1]![0]!).toUpperCase()
  return n.slice(0, 2).toUpperCase()
}
