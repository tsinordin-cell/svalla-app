'use client'
import { arRegelstopp, BLOCKERAD_TEXT } from '@/lib/blocks'
import { useState, useEffect, useRef } from 'react'
import { createClient } from '@/lib/supabase'
import { toast } from '@/components/Toast'
import { track } from '@/lib/analytics-events'

// platt (2026-11-27, förslagskorten i flödet): knappen över hela bredden, raka
// hörn (8 px), ingen skugga och inget antal följare.
export default function FollowButton({ targetUserId, darkBg = false, hideCount = false, stacked = false, platt = false }: { targetUserId: string; darkBg?: boolean; hideCount?: boolean; stacked?: boolean; platt?: boolean }) {
 const supabase = useRef(createClient()).current
 const [myId, setMyId] = useState<string | null>(null)
 const [following, setFollowing] = useState(false)
 const [count, setCount] = useState(0)
 const [loading, setLoading] = useState(false)

 useEffect(() => {
 let cancelled = false
 async function load() {
 const { data: { user } } = await supabase.auth.getUser()
 if (cancelled) return
 setMyId(user?.id ?? null)

 const { count: fc } = await supabase
 .from('follows').select('*', { count: 'exact', head: true })
 .eq('following_id', targetUserId)
 if (cancelled) return
 setCount(fc ?? 0)

 if (user && user.id !== targetUserId) {
 const { data } = await supabase.from('follows')
 .select('id').eq('follower_id', user.id).eq('following_id', targetUserId).maybeSingle()
 if (cancelled) return
 // Ingen rad är inte ett fel: då följer man inte.
 setFollowing(data != null)
 }
 }
 load()
 return () => { cancelled = true }
 }, [targetUserId]) // eslint-disable-line

 async function toggle() {
 if (!myId || loading || myId === targetUserId) return
 setLoading(true)
 if (following) {
 const { error } = await supabase.from('follows').delete()
 .eq('follower_id', myId).eq('following_id', targetUserId)
 if (error) { toast('Kunde inte avfölja. Försök igen.', 'error'); setLoading(false); return }
 setFollowing(false); setCount(c => Math.max(0, c - 1))
 toast('Du följer inte längre den här seglaren')
 } else {
 const { error } = await supabase.from('follows').insert({ follower_id: myId, following_id: targetUserId })
 if (error) { toast(arRegelstopp(error) ? BLOCKERAD_TEXT : 'Kunde inte följa. Försök igen.', 'error'); setLoading(false); return }
 setFollowing(true); setCount(c => c + 1)
 track('follow_added', { followed_user_id: targetUserId })
 toast('Du följer nu den här seglaren ')
 // Notis till den som följs. Servern kontrollerar följningen och skickar
 // pushen själv (src/lib/notisRegler.ts).
 fetch('/api/notifications/insert', {
 method: 'POST', headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify({ targetUserId, type: 'follow' }),
 }).catch(() => {})
 }
 setLoading(false)
 }

 // Dölj om det är din egen profil
 if (myId === targetUserId) return null

 return (
 // stacked: knappen över hela bredden och antalet under, för smala kort där
 // "1 följare" annars bröts på två rader bredvid knappen (granskningen 2026-11-23).
 <div style={platt
 ? { width: '100%' }
 : stacked
 ? { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, width: '100%' }
 : { display: 'flex', alignItems: 'center', gap: 10 }}>
 <button
 onClick={toggle}
 disabled={loading || !myId}
 aria-label={following ? 'Sluta följa' : 'Följ'}
 aria-pressed={following}
 className="press-feedback"
 style={platt ? {
 padding: '7px 0', borderRadius: 8, cursor: myId ? 'pointer' : 'default',
 width: '100%', fontSize: 14, fontWeight: 700, transition: 'all .15s',
 ...(following
 ? { background: 'rgba(10,123,140,0.08)', border: '1.5px solid rgba(10,123,140,0.20)', color: 'var(--sea)', boxShadow: 'none' }
 : { background: 'var(--sea-knapp)', border: '1.5px solid transparent', color: '#fff', boxShadow: 'none' }
 ),
 } : {
 padding: stacked ? '8px 12px' : '10px 24px', borderRadius: 20, cursor: myId ? 'pointer' : 'default',
 width: stacked ? '100%' : undefined,
 fontSize: 13, fontWeight: 700, transition: 'all .15s',
 ...(following
 ? darkBg
 ? { background: 'rgba(255,255,255,0.18)', border: '1.5px solid rgba(255,255,255,0.35)', color: '#fff', boxShadow: 'none' }
 : { background: 'rgba(10,123,140,0.08)', border: '1.5px solid rgba(10,123,140,0.20)', color: 'var(--sea)', boxShadow: 'none' }
 : { background: 'var(--grad-sea)', border: '1.5px solid transparent', color: '#fff', boxShadow: '0 2px 10px rgba(30,92,130,0.3)' }
 ),
 }}
 >
 {loading ? 'Laddar...' : following ? 'Följer' : 'Följ'}
 </button>
 {count > 0 && !hideCount && !platt && (
 <span style={{
 fontSize: stacked ? 11 : 12, fontWeight: 600, whiteSpace: 'nowrap',
 color: darkBg ? 'rgba(255,255,255,0.75)' : 'var(--txt3)',
 }}>
 {count} följare
 </span>
 )}
 </div>
 )
}
