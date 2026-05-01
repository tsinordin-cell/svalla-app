/**
 * forum-utils.ts — klient-säkra hjälpfunktioner för forum.
 * Importera hit i stället för '@/lib/forum' från 'use client'-komponenter
 * för att undvika att dra in next/headers via supabase-server.
 */

export function formatForumDate(iso: string): string {
  const d = new Date(iso)
  const now = new Date()
  const diffMs = now.getTime() - d.getTime()
  const diffMin = Math.floor(diffMs / 60000)
  if (diffMin < 2)   return 'just nu'
  if (diffMin < 60)  return `${diffMin} min sedan`
  const diffH = Math.floor(diffMin / 60)
  if (diffH < 24)    return `${diffH} tim sedan`
  const diffD = Math.floor(diffH / 24)
  if (diffD < 7)     return `${diffD} dag${diffD > 1 ? 'ar' : ''} sedan`
  return d.toLocaleDateString('sv-SE', { day: 'numeric', month: 'short' })
}
