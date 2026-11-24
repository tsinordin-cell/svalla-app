/**
 * /sparade — användarens lista över sparade platser.
 *
 * Server-renderad, läser via RLS (auth.uid() = user_id).
 * Tomma listor och ej-inloggad-tillstånd hanteras explicit.
 *
 * TVÅ TABELLER (2026-11-20, bugg från granskningen 19 nov): spara-knappen på
 * platssidan /upptack/[id] och ruttsidan /rutter/[id] (BookmarkButton) skriver
 * till `bookmarks`, men sidan läste bara `place_saves`, som bara skrivs av
 * /plats/[slug]. En sparad plats syntes därför aldrig här. Nu läses båda;
 * sparade rutter (bookmarks.route_id → tours) visas i en egen lista.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import Icon from '@/components/Icon'

export const metadata: Metadata = {
  title: 'Sparade platser',
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

type Bokmarke = {
  id: string
  created_at: string
  restaurant: { name: string; slug: string | null; type: string | null; island: string | null; image_url: string | null } | null
  tour: { id: string; title: string; start_location: string | null; destination: string | null } | null
}

/** restaurants.type → nycklarna i TYPE_LABELS/TYPE_COLORS. */
const PLATSTYP: Record<string, string> = {
  restaurant: 'krog', cafe: 'krog', bar: 'krog',
  marina: 'brygga', harbor: 'brygga', anchorage: 'naturhamn', nature_harbor: 'naturhamn',
  sauna: 'bastu', fuel: 'bensin', fuel_station: 'bensin',
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

  const { data: bokData, error: bokFel } = await supabase
    .from('bookmarks')
    .select('id, created_at, restaurant:restaurants(name, slug, type, island, image_url), tour:tours(id, title, start_location, destination)')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
  const bokmarken = (bokData ?? []) as unknown as Bokmarke[]

  // Platser från bokmärken i samma form som place_saves, så att listan nedan
  // kan rita båda. Stockbilder visas inte (samma regel som platssidan).
  const franBokmarken: (Save & { href: string })[] = bokmarken
    .filter(b => b.restaurant)
    .map(b => ({
      id: `b-${b.id}`,
      place_slug: b.restaurant!.slug,
      place_name: b.restaurant!.name,
      place_type: PLATSTYP[b.restaurant!.type ?? ''] ?? b.restaurant!.type,
      lat: 0, lng: 0,
      image_url: b.restaurant!.image_url && !b.restaurant!.image_url.includes('images.unsplash.com') ? b.restaurant!.image_url : null,
      island: b.restaurant!.island,
      notes: null,
      created_at: b.created_at,
      href: b.restaurant!.slug ? `/upptack/${b.restaurant!.slug}` : '/upptack',
    }))
  const saves: (Save & { href: string })[] = [
    ...franBokmarken,
    ...((data ?? []) as Save[]).map(s => ({ ...s, href: s.place_slug ? `/plats/${s.place_slug}` : '/upptack' })),
  ].sort((a, b) => b.created_at.localeCompare(a.created_at))
  const rutter = bokmarken.filter(b => b.tour)
  const fel = error || bokFel

  // Egen bakgrund: utan den syntes body-färgen (blågrå #f2f8fa) i stället för
  // appens krämvita var(--bg) som övriga sidor har (granskningen 2026-11-23).
  return (
    <div style={{ minHeight: '100dvh', background: 'var(--bg)' }}>
    <div style={{
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
      {saves.length === 0 && rutter.length === 0 && !fel && (
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
      {fel && (
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
                href={s.href}
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

      {/* Sparade rutter (bokmärket på /rutter/[id]) */}
      {rutter.length > 0 && (
        <section style={{ marginTop: 32 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--txt)', margin: '0 0 12px' }}>Sparade rutter</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {rutter.map(r => (
              <Link key={r.id} href={`/rutter/${r.tour!.id}`} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                background: 'var(--white)', borderRadius: 14, padding: '12px 14px',
                border: '1px solid rgba(10,123,140,0.10)', textDecoration: 'none', color: 'inherit',
              }}>
                <span style={{ color: 'var(--sea)', flexShrink: 0 }} aria-hidden><Icon name="navigation" size={20} stroke={1.9} /></span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--txt)' }}>{r.tour!.title}</div>
                  {r.tour!.start_location && r.tour!.destination ? (
                    <div style={{ fontSize: 13, color: 'var(--txt3)' }}>{`${r.tour!.start_location} → ${r.tour!.destination}`}</div>
                  ) : null}
                </div>
                <div style={{ fontSize: 12, color: 'var(--txt3)', flexShrink: 0 }}>Sparad {fmtTime(r.created_at)}</div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
    </div>
  )
}
