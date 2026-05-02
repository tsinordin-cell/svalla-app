/**
 * /sparade — användarens lista över sparade platser.
 *
 * Server-renderad, querar place_saves via RLS (auth.uid() = user_id).
 * Tomma listor och ej-inloggad-tillstånd hanteras explicit.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import Icon from '@/components/Icon'

export const metadata: Metadata = {
  title: 'Sparade platser — Svalla',
  description: 'Dina sparade krogar, bryggor och hamnar i skärgården.',
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

type Save = {
  id: string
  place_slug: string | null
  place_name: string
  place_type: string | null
  lat: number
  lng: number
  image_url: string | null
  island: string | null
  notes: string | null
  created_at: string
}

const TYPE_LABELS: Record<string, string> = {
  krog: 'Krog', krogar: 'Krog',
  brygga: 'Gästbrygga', bryggor: 'Gästbrygga',
  bastu: 'Bastu',
  bensin: 'Bensin',
  naturhamn: 'Naturhamn', naturhamnar: 'Naturhamn',
}

const TYPE_COLORS: Record<string, string> = {
  krog: '#c96e2a', krogar: '#c96e2a',
  brygga: '#1e5c82', bryggor: '#1e5c82',
  bastu: '#7a4f2e',
  bensin: '#a8381e',
  naturhamn: '#4a7a2e', naturhamnar: '#4a7a2e',
}

function fmtTime(iso: string) {
  const d = new Date(iso)
  const now = new Date()
  const days = Math.floor((now.getTime() - d.getTime()) / 86_400_000)
  if (days === 0) return 'Idag'
  if (days === 1) return 'Igår'
  if (days < 7) return `${days} dagar sen`
  return d.toLocaleDateString('sv-SE', { day: 'numeric', month: 'short' })
}

export default async function SparadePage() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/logga-in?returnTo=/sparade')

  const { data, error } = await supabase
    .from('place_saves')
    .select('id, place_slug, place_name, place_type, lat, lng, image_url, island, notes, created_at')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  const saves: Save[] = (data ?? []) as Save[]

  return (
    <main style={{
      maxWidth: 720, margin: '0 auto',
      padding: '32px 16px calc(var(--nav-h, 64px) + env(safe-area-inset-bottom, 0px) + 32px)',
      fontFamily: 'inherit',
      minHeight: '100dvh',
    }}>
      {/* Header */}
      <header style={{ marginBottom: 24 }}>
        <Link href="/upptack" style={{ fontSize: 13, color: 'var(--sea)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
          ← Utforska
        </Link>
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 32, fontWeight: 800, color: 'var(--txt)',
          margin: '10px 0 6px', letterSpacing: '-0.5px',
        }}>
          Sparade platser
        </h1>
        <p style={{ fontSize: 14, color: 'var(--txt2)', margin: 0, lineHeight: 1.5 }}>
          {saves.length === 0
            ? 'Du har inga sparade platser än.'
            : `${saves.length} ${saves.length === 1 ? 'plats' : 'platser'} att besöka.`}
        </p>
      </header>

      {/* Empty state */}
      {saves.length === 0 && !error && (
        <div style={{
          textAlign: 'center', padding: '40px 20px',
          background: 'var(--white)', borderRadius: 18,
          border: '1px solid rgba(10,123,140,0.10)',
        }}>
          <div style={{
            width: 56, height: 56, borderRadius: '50%',
            background: 'rgba(10,123,140,0.08)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px',
            color: 'var(--sea)',
          }}>
            <Icon name="heart" size={26} stroke={1.8} />
          </div>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--txt)', margin: '0 0 8px' }}>
            Spara platser för senare
          </h2>
          <p style={{ fontSize: 14, color: 'var(--txt2)', lineHeight: 1.55, margin: '0 0 20px', maxWidth: 360, marginLeft: 'auto', marginRight: 'auto' }}>
            Klicka på <strong>Spara</strong> i en plats-detaljvy så hamnar den här. Bygg din egen lista över krogar, bryggor och bastur du vill besöka.
          </p>
          <Link href="/upptack" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '10px 20px', borderRadius: 22,
            background: 'var(--grad-sea, #1e5c82)',
            color: '#fff', fontSize: 14, fontWeight: 600, textDecoration: 'none',
          }}>
            <Icon name="compass" size={16} stroke={2} />
            Utforska kartan
          </Link>
        </div>
      )}

      {/* Error */}
      {error && (
        <div style={{
          padding: 20, background: 'rgba(220,53,69,0.08)',
          border: '1px solid rgba(220,53,69,0.22)',
          borderRadius: 14, color: '#c0392b', fontSize: 14,
        }}>
          Kunde inte hämta dina sparade platser. Ladda om sidan.
        </div>
      )}

      {/* List */}
      {saves.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {saves.map(s => {
            const typeKey = (s.place_type ?? '').toLowerCase()
            const typeLabel = TYPE_LABELS[typeKey] ?? 'Plats'
            const typeColor = TYPE_COLORS[typeKey] ?? 'var(--sea)'
            return (
              <Link
                key={s.id}
                href={s.place_slug ? `/plats/${s.place_slug}` : `/upptack`}
                style={{
                  display: 'flex', gap: 14,
                  background: 'var(--white)',
                  borderRadius: 16, padding: 12,
                  border: '1px solid rgba(10,123,140,0.10)',
                  textDecoration: 'none',
                  color: 'inherit',
                }}>
                {s.image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={s.image_url}
                    alt={s.place_name}
                    style={{
                      width: 88, height: 88, aspectRatio: '1 / 1',
                      objectFit: 'cover', borderRadius: 12,
                      flexShrink: 0,
                    }}/>
                ) : (
                  <div style={{
                    width: 88, height: 88, borderRadius: 12,
                    background: `${typeColor}18`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: typeColor,
                    flexShrink: 0,
                  }}>
                    <Icon name="pin" size={28} stroke={1.8} />
                  </div>
                )}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    display: 'inline-block',
                    fontSize: 10, fontWeight: 700,
                    color: typeColor,
                    background: `${typeColor}15`,
                    padding: '2px 8px', borderRadius: 6,
                    textTransform: 'uppercase', letterSpacing: '0.05em',
                    marginBottom: 6,
                  }}>{typeLabel}</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--txt)', lineHeight: 1.25, marginBottom: 4 }}>
                    {s.place_name}
                  </div>
                  {s.island && (
                    <div style={{ fontSize: 13, color: 'var(--txt3)', display: 'flex', alignItems: 'center', gap: 4, marginBottom: 4 }}>
                      <Icon name="pin" size={12} />
                      {s.island}
                    </div>
                  )}
                  <div style={{ fontSize: 12, color: 'var(--txt3)' }}>
                    Sparad {fmtTime(s.created_at)}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </main>
  )
}
