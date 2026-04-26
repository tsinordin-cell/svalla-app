import { ImageResponse } from 'next/og'
import { createServerSupabaseClient as createClient } from '@/lib/supabase-server'

export const runtime = 'nodejs'
export const revalidate = 3600

const W = 1200, H = 630

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const supabase = await createClient()

  const { data: thread } = await supabase
    .from('forum_threads')
    .select('title, body, reply_count, category_id, user_id')
    .eq('id', id)
    .single()

  const [{ data: cat }, { data: author }] = await Promise.all([
    thread
      ? supabase.from('forum_categories').select('name, icon').eq('id', thread.category_id).single()
      : { data: null },
    thread
      ? supabase.from('users').select('username').eq('id', thread.user_id).single()
      : { data: null },
  ])

  const title      = thread?.title ?? 'Forum — Svalla'
  const body       = thread?.body ?? ''
  const excerpt    = body.length > 150 ? body.slice(0, 150) + '…' : body
  const catName    = cat?.name ?? 'Forum'
  const catIcon    = cat?.icon ?? '💬'
  const replies    = thread?.reply_count ?? 0
  const username   = author?.username ?? 'Svalla-användare'

  const titleSize  = title.length > 65 ? 38 : title.length > 45 ? 46 : title.length > 30 ? 54 : 60

  return new ImageResponse(
    (
      <div style={{
        width: W, height: H,
        display: 'flex', flexDirection: 'column',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        background: 'linear-gradient(155deg, #060e18 0%, #0a2235 45%, #0c3045 75%, #071420 100%)',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Ambient glow */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 65% 50% at 40% 55%, rgba(10,130,150,0.18) 0%, transparent 70%)',
          display: 'flex',
        }} />

        {/* Decorative circles */}
        <div style={{
          position: 'absolute', right: -120, top: -120,
          width: 500, height: 500, borderRadius: '50%',
          background: 'rgba(10,123,140,0.06)',
          display: 'flex',
        }} />
        <div style={{
          position: 'absolute', right: -60, top: -60,
          width: 300, height: 300, borderRadius: '50%',
          border: '1px solid rgba(10,200,220,0.08)',
          display: 'flex',
        }} />

        {/* Top bar */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '48px 64px 0', position: 'relative', zIndex: 2,
        }}>
          {/* Category badge */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10,
            background: 'rgba(10,123,140,0.25)',
            border: '1px solid rgba(10,200,220,0.20)',
            borderRadius: 40, padding: '10px 20px',
          }}>
            <span style={{ fontSize: 22 }}>{catIcon}</span>
            <span style={{ fontSize: 17, fontWeight: 700, color: 'rgba(140,220,240,0.90)', letterSpacing: '0.2px' }}>
              {catName}
            </span>
          </div>

          {/* Svalla logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <svg viewBox="0 0 20 22" width={26} height={26} style={{ display: 'flex' }}>
              <line x1="9" y1="20" x2="9" y2="2" stroke="rgba(255,255,255,0.45)" strokeWidth="1.6" strokeLinecap="round"/>
              <path d="M9,3 L18,18 L9,18 Z" fill="rgba(255,255,255,0.45)"/>
              <path d="M9,7 L1,17 L9,17 Z" fill="rgba(255,255,255,0.25)"/>
              <path d="M1,20 Q5,17.5 9,20 Q13,17.5 17,20" stroke="rgba(255,255,255,0.35)" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
            </svg>
            <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: '5px', color: 'rgba(255,255,255,0.40)' }}>
              SVALLA
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center',
          padding: '0 64px', position: 'relative', zIndex: 2,
        }}>
          {/* Thread icon */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18,
          }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="rgba(100,200,220,0.55)" strokeWidth={1.8} style={{ width: 20, height: 20, display: 'flex' }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span style={{ fontSize: 14, fontWeight: 600, color: 'rgba(100,200,220,0.55)', letterSpacing: '0.3px' }}>
              FORUMTRÅD
            </span>
          </div>

          {/* Title */}
          <div style={{
            fontSize: titleSize, fontWeight: 800, color: '#fff',
            letterSpacing: '-1.5px', lineHeight: 1.1,
            textShadow: '0 2px 20px rgba(0,0,0,0.5)',
          }}>
            {title}
          </div>

          {/* Excerpt */}
          {excerpt && (
            <div style={{
              fontSize: 18, color: 'rgba(255,255,255,0.42)', lineHeight: 1.5,
              marginTop: 16, fontWeight: 400,
              overflow: 'hidden',
            }}>
              {excerpt}
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 64px 48px', position: 'relative', zIndex: 2,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            {/* Author */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{
                width: 34, height: 34, borderRadius: '50%',
                background: 'rgba(10,100,130,0.60)',
                border: '1.5px solid rgba(255,255,255,0.18)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 14, fontWeight: 800, color: '#fff',
              }}>
                {username[0]?.toUpperCase() ?? 'S'}
              </div>
              <span style={{ fontSize: 15, fontWeight: 600, color: 'rgba(255,255,255,0.60)' }}>
                @{username}
              </span>
            </div>

            {/* Separator */}
            <div style={{ width: 3, height: 3, borderRadius: '50%', background: 'rgba(255,255,255,0.20)', display: 'flex' }} />

            {/* Reply count */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth={1.8} style={{ width: 15, height: 15, display: 'flex' }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
              </svg>
              <span style={{ fontSize: 15, fontWeight: 600, color: 'rgba(255,255,255,0.45)' }}>
                {replies} {replies === 1 ? 'svar' : 'svar'}
              </span>
            </div>
          </div>

          <div style={{ fontSize: 14, fontWeight: 600, color: 'rgba(180,220,255,0.35)', letterSpacing: '0.3px' }}>
            svalla.se/forum
          </div>
        </div>
      </div>
    ),
    { width: W, height: H }
  )
}
