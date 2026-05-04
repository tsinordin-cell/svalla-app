/**
 * /loppis/sparat — användarens wishlist av Loppis-annonser.
 *
 * Visar grid av sparade annonser i samma stil som /forum/loppis. Klick på
 * hjärtat på själva annons-vyn lägger till/tar bort härifrån.
 */
import Link from 'next/link'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { formatForumDate } from '@/lib/forum-utils'
import type { ListingData } from '@/lib/forum'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sparade annonser — Svalla Loppis',
  description: 'Dina sparade annonser från Svalla Loppis & köp/sälj.',
  robots: { index: false, follow: false },
}

export const revalidate = 0 // alltid färska data

type SavedRow = {
  thread_id: string
  saved_at: string
  forum_threads: {
    id: string
    title: string
    created_at: string
    listing_data: ListingData | null
  } | null
}

function formatPrice(price?: number): string {
  if (typeof price !== 'number' || !Number.isFinite(price)) return 'Pris på förfrågan'
  if (price === 0) return 'Skänkes'
  return `${new Intl.NumberFormat('sv-SE').format(price)} kr`
}

export default async function SavedListingsPage() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/logga-in?returnTo=/loppis/sparat')

  const { data: rows } = await supabase
    .from('loppis_saves')
    .select('thread_id, saved_at, forum_threads(id, title, created_at, listing_data)')
    .eq('user_id', user.id)
    .order('saved_at', { ascending: false })

  const saves = (rows ?? []) as unknown as SavedRow[]
  // Filtrera bort eventuella raderade trådar (forum_threads kan vara null)
  const valid = saves.filter(r => r.forum_threads)

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
        <div>
          <div style={{ fontSize: 11, opacity: 0.75, letterSpacing: '0.6px', textTransform: 'uppercase', fontWeight: 700 }}>Loppis</div>
          <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0, letterSpacing: '-0.2px' }}>Sparade annonser</h1>
        </div>
      </div>

      <div style={{ padding: '16px', maxWidth: 760, margin: '0 auto' }}>
        {valid.length === 0 ? (
          <div style={{
            textAlign: 'center', padding: '48px 24px',
            background: 'var(--card-bg, #fff)', borderRadius: 16,
            border: '1px solid var(--border, rgba(10,123,140,0.10))',
          }}>
            <div style={{ marginBottom: 14, display: 'flex', justifyContent: 'center' }}>
              <svg width={42} height={42} viewBox="0 0 24 24" fill="none" stroke="rgba(10,123,140,0.4)" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </div>
            <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--txt)', marginBottom: 6 }}>
              Du har inga sparade annonser ännu
            </div>
            <p style={{ fontSize: 13, color: 'var(--txt3)', margin: '0 0 18px', lineHeight: 1.5 }}>
              Tryck på hjärtat på en annons så hamnar den här. Bra för att jämföra eller komma tillbaka senare.
            </p>
            <Link href="/forum/loppis" style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '10px 18px',
              background: 'var(--sea)', color: '#fff',
              borderRadius: 12, textDecoration: 'none',
              fontSize: 14, fontWeight: 700,
            }}>
              Gå till Loppis
            </Link>
          </div>
        ) : (
          <>
            <div style={{ fontSize: 13, color: 'var(--txt3)', marginBottom: 12 }}>
              {valid.length} sparad{valid.length === 1 ? '' : 'e'} annons{valid.length === 1 ? '' : 'er'}
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
              gap: 12,
            }}>
              {valid.map(r => {
                const t = r.forum_threads!
                const ld = t.listing_data
                const status = ld?.status ?? 'aktiv'
                const isSold = status === 'sald'
                const heroImg = ld?.images?.[0]
                return (
                  <Link
                    key={t.id}
                    href={`/forum/loppis/${t.id}`}
                    style={{
                      display: 'block',
                      borderRadius: 14,
                      overflow: 'hidden',
                      background: 'var(--card-bg, #fff)',
                      border: '1px solid var(--border, rgba(10,123,140,0.10))',
                      boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                      textDecoration: 'none',
                      color: 'inherit',
                      opacity: isSold ? 0.6 : 1,
                    }}
                  >
                    <div style={{ position: 'relative', width: '100%', aspectRatio: '4 / 3', background: '#0a1e2c' }}>
                      {heroImg ? (
                        <Image src={heroImg} alt={t.title} fill sizes="200px" style={{ objectFit: 'cover' }} />
                      ) : (
                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#456', fontSize: 12 }}>
                          Ingen bild
                        </div>
                      )}
                      {status !== 'aktiv' && (
                        <div style={{
                          position: 'absolute', top: 8, right: 8,
                          background: isSold ? 'rgba(0,0,0,0.78)' : 'rgba(40,40,40,0.72)',
                          color: '#fff',
                          padding: '3px 8px', borderRadius: 12,
                          fontSize: 10, fontWeight: 700, letterSpacing: '0.4px', textTransform: 'uppercase',
                          backdropFilter: 'blur(6px)',
                        }}>{isSold ? 'Såld' : 'Reserverad'}</div>
                      )}
                    </div>
                    <div style={{ padding: '10px 12px 12px' }}>
                      <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--acc, #c96e2a)', letterSpacing: '-0.2px', marginBottom: 2 }}>
                        {formatPrice(ld?.price)}
                      </div>
                      <div style={{
                        fontSize: 13, fontWeight: 600, color: 'var(--txt)',
                        lineHeight: 1.3, marginBottom: 4,
                        overflow: 'hidden', display: '-webkit-box',
                        WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
                      }}>{t.title}</div>
                      <div style={{ fontSize: 11, color: 'var(--txt3)', display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
                        {ld?.location && <><span>{ld.location}</span><span>·</span></>}
                        <span>Sparad {formatForumDate(r.saved_at)}</span>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </>
        )}
      </div>
    </main>
  )
}
