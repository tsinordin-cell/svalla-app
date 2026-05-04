/**
 * /loppis/mina-annonser — säljarens egna aktiva, reserverade och sålda annonser.
 *
 * För varje annons: status-chip, hero-thumbnail, pris, visningar, sparningar,
 * svar. Snabb-länk till annonsen för att redigera/markera såld.
 */
import Link from 'next/link'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { formatForumDate } from '@/lib/forum-utils'
import type { ListingData } from '@/lib/forum'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mina annonser — Svalla Loppis',
  description: 'Dina aktiva och tidigare annonser på Svalla Loppis.',
  robots: { index: false, follow: false },
}

export const revalidate = 0

type ThreadRow = {
  id: string
  title: string
  body: string
  created_at: string
  view_count: number
  reply_count: number
  listing_data: ListingData | null
}

function formatPrice(price?: number): string {
  if (typeof price !== 'number' || !Number.isFinite(price)) return 'Pris på förfrågan'
  if (price === 0) return 'Skänkes'
  return `${new Intl.NumberFormat('sv-SE').format(price)} kr`
}

function statusBadgeStyle(status: string | undefined): { label: string; bg: string; color: string } {
  switch (status) {
    case 'sald':       return { label: 'Såld',       bg: 'rgba(82,82,82,0.12)',  color: '#1f2937' }
    case 'reserverad': return { label: 'Reserverad', bg: 'rgba(245,158,11,0.14)', color: '#b45309' }
    default:           return { label: 'Aktiv',      bg: 'rgba(34,197,94,0.14)',  color: '#15803d' }
  }
}

export default async function MyListingsPage() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/logga-in?returnTo=/loppis/mina-annonser')

  const { data: rawThreads } = await supabase
    .from('forum_threads')
    .select('id, title, body, created_at, view_count, reply_count, listing_data')
    .eq('user_id', user.id)
    .eq('category_id', 'loppis')
    .eq('in_spam_queue', false)
    .order('created_at', { ascending: false })

  const threads = (rawThreads ?? []) as ThreadRow[]

  // Räkna sparningar per annons (men bara om vi har annonser)
  let saveCounts = new Map<string, number>()
  if (threads.length > 0) {
    const ids = threads.map(t => t.id)
    const { data: saves } = await supabase
      .from('loppis_saves')
      .select('thread_id')
      .in('thread_id', ids)
    for (const r of (saves ?? []) as Array<{ thread_id: string }>) {
      saveCounts.set(r.thread_id, (saveCounts.get(r.thread_id) ?? 0) + 1)
    }
  }

  // Gruppera: Aktiva + Reserverade överst, Sålda nedanför
  const liveThreads = threads.filter(t => (t.listing_data?.status ?? 'aktiv') !== 'sald')
  const soldThreads = threads.filter(t => t.listing_data?.status === 'sald')

  return (
    <main style={{
      minHeight: '100vh',
      background: 'var(--bg)',
      paddingBottom: 'calc(var(--nav-h) + env(safe-area-inset-bottom, 0px) + 32px)',
    }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(160deg, var(--sea) 0%, #0d8fa3 100%)',
        padding: 'calc(env(safe-area-inset-top, 0px) + 16px) 20px 24px',
        color: '#fff',
        display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <Link href="/forum/loppis" style={{
          color: 'rgba(255,255,255,0.85)', textDecoration: 'none',
          width: 36, height: 36, borderRadius: '50%',
          background: 'rgba(255,255,255,0.15)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, opacity: 0.75, letterSpacing: '0.6px', textTransform: 'uppercase', fontWeight: 700 }}>Loppis</div>
          <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0, letterSpacing: '-0.2px' }}>Mina annonser</h1>
        </div>
        <Link
          href="/forum/loppis/ny-annons"
          aria-label="Lägg upp ny annons"
          style={{
            padding: '9px 14px',
            background: 'var(--acc, #c96e2a)',
            color: '#fff',
            borderRadius: 12,
            textDecoration: 'none',
            fontSize: 13, fontWeight: 700,
            display: 'inline-flex', alignItems: 'center', gap: 6,
            boxShadow: '0 3px 10px rgba(201,110,42,0.3)',
            whiteSpace: 'nowrap',
          }}
        >
          <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
          Ny
        </Link>
      </div>

      <div style={{ padding: '16px', maxWidth: 760, margin: '0 auto' }}>
        {threads.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            {liveThreads.length > 0 && (
              <Section heading="Aktiva och reserverade">
                {liveThreads.map(t => (
                  <ListingRow
                    key={t.id}
                    thread={t}
                    saveCount={saveCounts.get(t.id) ?? 0}
                  />
                ))}
              </Section>
            )}
            {soldThreads.length > 0 && (
              <Section heading={`Sålda · ${soldThreads.length}`} dim>
                {soldThreads.map(t => (
                  <ListingRow
                    key={t.id}
                    thread={t}
                    saveCount={saveCounts.get(t.id) ?? 0}
                  />
                ))}
              </Section>
            )}
          </>
        )}
      </div>
    </main>
  )
}

function Section({ heading, dim, children }: { heading: string; dim?: boolean; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 22, opacity: dim ? 0.78 : 1 }}>
      <h2 style={{
        fontSize: 11, fontWeight: 700, color: 'var(--txt3)',
        letterSpacing: '0.6px', textTransform: 'uppercase',
        margin: '0 0 10px',
      }}>{heading}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {children}
      </div>
    </section>
  )
}

function ListingRow({ thread, saveCount }: { thread: ThreadRow; saveCount: number }) {
  const ld = thread.listing_data
  const status = ld?.status ?? 'aktiv'
  const sb = statusBadgeStyle(status)
  const heroImg = ld?.images?.[0]

  return (
    <Link
      href={`/forum/loppis/${thread.id}`}
      style={{
        display: 'flex', gap: 12,
        padding: 12,
        background: 'var(--card-bg, #fff)',
        border: '1px solid var(--border, rgba(10,123,140,0.10))',
        borderRadius: 14,
        textDecoration: 'none',
        color: 'inherit',
        boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
      }}
    >
      <div style={{
        position: 'relative',
        width: 96, height: 72, flexShrink: 0,
        borderRadius: 10, overflow: 'hidden',
        background: '#0a1e2c',
      }}>
        {heroImg ? (
          <Image src={heroImg} alt={thread.title} fill sizes="96px" style={{ objectFit: 'cover' }} />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#456', fontSize: 11 }}>
            Ingen bild
          </div>
        )}
      </div>
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 8 }}>
          <span style={{
            fontSize: 16, fontWeight: 800, color: 'var(--acc, #c96e2a)',
            letterSpacing: '-0.2px',
          }}>
            {formatPrice(ld?.price)}
          </span>
          <span style={{
            fontSize: 10, fontWeight: 700, letterSpacing: '0.4px', textTransform: 'uppercase',
            padding: '3px 8px', borderRadius: 999,
            background: sb.bg, color: sb.color,
            whiteSpace: 'nowrap',
          }}>{sb.label}</span>
        </div>
        <div style={{
          fontSize: 13, fontWeight: 600, color: 'var(--txt)',
          lineHeight: 1.3,
          overflow: 'hidden', display: '-webkit-box',
          WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
        }}>{thread.title}</div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12,
          fontSize: 11, color: 'var(--txt3)', marginTop: 2,
        }}>
          <Stat label="visn." value={thread.view_count ?? 0} />
          <Stat label="sparn." value={saveCount} />
          <Stat label="svar" value={thread.reply_count ?? 0} />
          <span style={{ marginLeft: 'auto' }}>{formatForumDate(thread.created_at)}</span>
        </div>
      </div>
    </Link>
  )
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <span>
      <strong style={{ color: 'var(--txt)', fontWeight: 700 }}>
        {new Intl.NumberFormat('sv-SE').format(value)}
      </strong>{' '}
      <span style={{ opacity: 0.85 }}>{label}</span>
    </span>
  )
}

function EmptyState() {
  return (
    <div style={{
      textAlign: 'center', padding: '48px 24px',
      background: 'var(--card-bg, #fff)', borderRadius: 16,
      border: '1px solid var(--border, rgba(10,123,140,0.10))',
    }}>
      <div style={{ marginBottom: 14, display: 'flex', justifyContent: 'center' }}>
        <svg width={42} height={42} viewBox="0 0 24 24" fill="none" stroke="rgba(10,123,140,0.4)" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
      </div>
      <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--txt)', marginBottom: 6 }}>
        Du har inga annonser ännu
      </div>
      <p style={{ fontSize: 13, color: 'var(--txt3)', margin: '0 0 18px', lineHeight: 1.5 }}>
        Lägg upp en annons med pris, bilder och plats. Klart på två minuter.
      </p>
      <Link href="/forum/loppis/ny-annons" style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        padding: '11px 20px',
        background: 'var(--acc, #c96e2a)',
        color: '#fff',
        borderRadius: 12, textDecoration: 'none',
        fontSize: 14, fontWeight: 700,
        boxShadow: '0 3px 10px rgba(201,110,42,0.25)',
      }}>
        Lägg upp första annonsen
      </Link>
    </div>
  )
}
