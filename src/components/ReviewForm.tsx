'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'

type Review = {
  id: string
  user_id: string
  rating: number
  text: string | null
  created_at: string
  username?: string
}

const ANCHOR_LABELS: Record<number, string> = {
  1: 'Okej',
  2: 'Bra!',
  3: 'Mycket bra',
  4: 'Utmärkt',
  5: 'Magiskt ⚓',
}

export default function ReviewSection({ restaurantId }: { restaurantId: string }) {
  const supabase = createClient()
  const [reviews,    setReviews]    = useState<Review[]>([])
  const [myReview,   setMyReview]   = useState<Review | null>(null)
  const [userId,     setUserId]     = useState<string | null>(null)
  const [rating,     setRating]     = useState(0)
  const [text,       setText]       = useState('')
  const [loading,    setLoading]    = useState(false)
  const [submitted,  setSubmitted]  = useState(false)
  const [showForm,   setShowForm]   = useState(false)
  const [fetching,   setFetching]   = useState(true)

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      setUserId(user?.id ?? null)

      // Fetch reviews för denna restaurang (utan users-join)
      const { data } = await supabase
        .from('reviews')
        .select('id, user_id, rating, text, created_at')
        .eq('place_id', restaurantId)
        .order('created_at', { ascending: false })

      const rawList = (data ?? []) as Review[]
      // Hämta usernames separat
      const rUids = [...new Set(rawList.map(r => r.user_id).filter(Boolean))]
      const { data: rUserRows } = rUids.length
        ? await supabase.from('users').select('id, username').in('id', rUids)
        : { data: [] }
      const rUmap: Record<string, string> = {}
      for (const u of rUserRows ?? []) rUmap[u.id] = u.username
      const list = rawList.map(r => ({ ...r, username: rUmap[r.user_id] ?? 'Seglare' }))
      setReviews(list)

      if (user) {
        const mine = list.find(r => r.user_id === user.id) ?? null
        setMyReview(mine)
        if (mine) { setRating(mine.rating); setText(mine.text ?? '') }
      }
      setFetching(false)
    }
    load()
  }, [restaurantId]) // eslint-disable-line

  async function handleSubmit() {
    if (!userId || rating === 0 || loading) return
    setLoading(true)

    const payload = {
      user_id:  userId,
      place_id: restaurantId,
      rating,
      text: text.trim() || null,
    }

    if (myReview) {
      await supabase.from('reviews').update(payload).eq('id', myReview.id)
    } else {
      await supabase.from('reviews').insert(payload)
    }

    setLoading(false)
    setSubmitted(true)
    setShowForm(false)
    // Refresh (utan users-join)
    const { data } = await supabase
      .from('reviews')
      .select('id, user_id, rating, text, created_at')
      .eq('place_id', restaurantId)
      .order('created_at', { ascending: false })
    const refreshRaw = (data ?? []) as Review[]
    const refUids = [...new Set(refreshRaw.map(r => r.user_id).filter(Boolean))]
    const { data: refURows } = refUids.length
      ? await supabase.from('users').select('id, username').in('id', refUids)
      : { data: [] }
    const refUmap: Record<string, string> = {}
    for (const u of refURows ?? []) refUmap[u.id] = u.username
    const refreshed = refreshRaw.map(r => ({ ...r, username: refUmap[r.user_id] ?? 'Seglare' }))
    setReviews(refreshed)
    const mine = refreshed.find(r => r.user_id === userId) ?? null
    setMyReview(mine)
  }

  if (fetching) return null

  const avgRating = reviews.length > 0
    ? (reviews.reduce((a, r) => a + r.rating, 0) / reviews.length).toFixed(1)
    : null

  return (
    <div style={{ marginTop: 28 }}>
      {/* ── Section header ── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <div>
          <h2 style={{ fontSize: 12, fontWeight: 600, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: '0.6px', margin: 0 }}>
            Omdömen
          </h2>
          {avgRating && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
              <span style={{ fontSize: 22, fontWeight: 700, color: 'var(--sea)' }}>{avgRating}</span>
              <div style={{ display: 'flex', gap: 2 }}>
                {[1,2,3,4,5].map(i => (
                  <span key={i} style={{ fontSize: 14, color: parseFloat(avgRating) >= i ? '#e8a020' : '#dde8ec' }}>⚓</span>
                ))}
              </div>
              <span style={{ fontSize: 12, color: 'var(--txt3)' }}>({reviews.length})</span>
            </div>
          )}
        </div>
        {userId && !showForm && (
          <button
            onClick={() => setShowForm(true)}
            style={{
              padding: '8px 14px', borderRadius: 12, border: 'none', cursor: 'pointer',
              background: 'rgba(10,123,140,0.08)', color: 'var(--sea)',
              fontSize: 12, fontWeight: 700,
            }}
          >
            {myReview ? 'Ändra' : '+ Recensera'}
          </button>
        )}
        {!userId && (
          <a href="/logga-in" style={{ fontSize: 12, color: 'var(--sea)', fontWeight: 600 }}>
            Logga in för att recensera →
          </a>
        )}
      </div>

      {/* ── Review form ── */}
      {showForm && (
        <div style={{
          background: 'var(--white)', borderRadius: 18, padding: '18px 16px',
          boxShadow: '0 2px 12px rgba(0,45,60,0.08)', marginBottom: 16,
          border: '1.5px solid rgba(10,123,140,0.12)',
        }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--txt)', marginBottom: 12 }}>
            Hur var det?
          </p>
          {/* Rating anchors */}
          <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
            {[1,2,3,4,5].map(v => (
              <button
                key={v}
                type="button"
                onClick={() => setRating(rating === v ? 0 : v)}
                style={{
                  flex: 1, padding: '8px 4px', borderRadius: 12, border: 'none',
                  background: rating >= v ? 'var(--grad-sea)' : 'rgba(10,123,140,0.07)',
                  color: rating >= v ? '#fff' : 'var(--txt3)',
                  fontSize: 16, cursor: 'pointer', transition: 'all 0.15s',
                  boxShadow: rating >= v ? '0 2px 8px rgba(30,92,130,0.25)' : 'none',
                }}
              >
                ⚓
              </button>
            ))}
          </div>
          {rating > 0 && (
            <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--sea)', textAlign: 'center', marginBottom: 12 }}>
              {ANCHOR_LABELS[rating]}
            </p>
          )}

          <textarea
            placeholder="Berätta om upplevelsen… (valfritt)"
            value={text}
            onChange={e => setText(e.target.value)}
            maxLength={500}
            rows={3}
            style={{
              width: '100%', padding: '10px 12px', borderRadius: 12,
              border: '1.5px solid rgba(10,123,140,0.15)',
              background: 'rgba(10,123,140,0.03)', fontSize: 13,
              color: 'var(--txt)', outline: 'none', resize: 'none',
              fontFamily: 'inherit', boxSizing: 'border-box',
            }}
          />
          <div style={{ fontSize: 10, color: 'var(--txt3)', textAlign: 'right', marginBottom: 12 }}>{text.length}/500</div>

          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={() => setShowForm(false)}
              style={{
                flex: 1, padding: '11px 0', borderRadius: 12, border: '1.5px solid rgba(10,123,140,0.15)',
                background: 'none', color: 'var(--txt3)', fontSize: 13, fontWeight: 700, cursor: 'pointer',
              }}
            >
              Avbryt
            </button>
            <button
              onClick={handleSubmit}
              disabled={rating === 0 || loading}
              style={{
                flex: 2, padding: '11px 0', borderRadius: 12, border: 'none',
                background: rating > 0 ? 'var(--grad-sea)' : 'rgba(10,123,140,0.1)',
                color: rating > 0 ? '#fff' : 'var(--txt3)',
                fontSize: 13, fontWeight: 600, cursor: rating > 0 ? 'pointer' : 'default',
                boxShadow: rating > 0 ? '0 2px 10px rgba(30,92,130,0.3)' : 'none',
              }}
            >
              {loading ? 'Sparar…' : submitted ? 'Sparat ✓' : 'Spara omdöme'}
            </button>
          </div>
        </div>
      )}

      {/* ── Reviews list ── */}
      {reviews.length === 0 ? (
        <div style={{
          background: 'var(--white)', borderRadius: 16, padding: '24px',
          textAlign: 'center', color: 'var(--txt3)', fontSize: 13,
          boxShadow: '0 1px 6px rgba(0,45,60,0.05)',
        }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>📝</div>
          Inga omdömen ännu. Var den första!
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {reviews.map(r => (
            <div key={r.id} style={{
              background: 'var(--white)', borderRadius: 16, padding: '14px 16px',
              boxShadow: '0 1px 6px rgba(0,45,60,0.05)',
              border: r.user_id === userId ? '1.5px solid rgba(10,123,140,0.18)' : '1px solid rgba(10,123,140,0.07)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: r.text ? 8 : 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: '50%',
                    background: 'var(--grad-sea)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 11, fontWeight: 600, color: '#fff', flexShrink: 0,
                  }}>
                    {(r.username ?? '?')[0]!.toUpperCase()}
                  </div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--txt)' }}>
                      {r.username ?? 'Seglare'}
                      {r.user_id === userId && <span style={{ fontSize: 10, color: 'var(--txt3)', marginLeft: 6 }}>(du)</span>}
                    </div>
                    <div style={{ fontSize: 10, color: 'var(--txt3)' }}>
                      {new Date(r.created_at).toLocaleDateString('sv-SE', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 2 }}>
                  {[1,2,3,4,5].map(i => (
                    <span key={i} style={{ fontSize: 12, color: r.rating >= i ? '#e8a020' : '#dde8ec' }}>⚓</span>
                  ))}
                </div>
              </div>
              {r.text && (
                <p style={{ fontSize: 13, color: 'var(--txt2)', margin: 0, lineHeight: 1.5 }}>{r.text}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
