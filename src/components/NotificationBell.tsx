'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import { createClient } from '@/lib/supabase'
import Link from 'next/link'
import { timeAgoShort } from '@/lib/utils'
import Icon, { type IconName } from '@/components/Icon'

type Notif = {
 id: string
 type: 'like' | 'comment' | 'follow' | 'tag' | 'mention' | 'forum_reply' | 'forum_like' | 'forum_mention' | 'forum_best_answer' | 'friend_visit' | string
 read: boolean
 created_at: string
 trip_id: string | null
 reference_id: string | null
 related_island_slug: string | null
 actor_username?: string
 actor_avatar?: string | null
}

const TYPE_LABEL: Record<string, string> = {
 like: 'gillade din tur',
 comment: 'kommenterade din tur',
 follow: 'börjar följa dig',
 tag: 'taggade dig i en tur',
 mention: 'nämnde dig',
 forum_reply: 'svarade i din forumtråd',
 forum_like: 'gillade ditt foruminlägg',
 forum_mention: 'taggade dig i forumet',
 forum_best_answer: 'markerade ditt svar som bäst',
 friend_visit: 'besökte en ö du varit på',
}

// SVG-ikon per notif-typ — kompletterar avatar med visuell typing-cue
const TYPE_ICON: Record<string, IconName> = {
 like: 'heart',
 comment: 'mail',
 follow: 'user',
 tag: 'users',
 mention: 'atSign',
 forum_reply: 'reply',
 forum_like: 'heart',
 forum_mention: 'atSign',
 forum_best_answer: 'check',
 friend_visit: 'pin',
}

// Bakgrundsfärg på ikon-badge per typ
const TYPE_COLOR: Record<string, string> = {
 like: '#dc2626',          // röd
 comment: 'var(--sea)',
 follow: 'var(--sea)',
 tag: 'var(--accent)',
 mention: 'var(--accent)',
 forum_reply: 'var(--sea)',
 forum_like: '#dc2626',
 forum_mention: 'var(--accent)',
 forum_best_answer: '#16a34a',
 friend_visit: 'var(--sea)',
}

export default function NotificationBell() {
 const supabase = useRef(createClient()).current
 const [notifs, setNotifs] = useState<Notif[]>([])
 const [open, setOpen] = useState(false)
 const [userId, setUserId] = useState<string | null>(null)
 const ref = useRef<HTMLDivElement>(null)

 const unread = notifs.filter(n => !n.read).length

 const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null)

 const load = useCallback(async (uid: string) => {
 const { data } = await supabase
 .from('notifications')
 .select('id, type, read, created_at, trip_id, reference_id, related_island_slug, actor_id')
 .eq('user_id', uid)
 .order('created_at', { ascending: false })
 .limit(20)

 const rows = (data ?? []) as (Notif & { actor_id: string })[]
 const actorIds = [...new Set(rows.map(r => r.actor_id).filter(Boolean))]
 const { data: uRows } = actorIds.length
 ? await supabase.from('users').select('id, username, avatar').in('id', actorIds)
 : { data: [] }
 const umap: Record<string, { username: string; avatar: string | null }> = {}
 for (const u of (uRows ?? []) as { id: string; username: string; avatar: string | null }[]) {
   umap[u.id] = { username: u.username, avatar: u.avatar }
 }

 setNotifs(rows.map(r => ({
   ...r,
   actor_username: umap[r.actor_id]?.username ?? 'Någon',
   actor_avatar: umap[r.actor_id]?.avatar ?? null,
 })))
 }, [supabase])

 useEffect(() => {
 let mounted = true

 // Clean up any stale channel before creating a new one
 if (channelRef.current) {
 supabase.removeChannel(channelRef.current)
 channelRef.current = null
 }

 supabase.auth.getUser().then(({ data: { user } }) => {
 if (!mounted || !user) return
 const uid = user.id
 setUserId(uid)
 load(uid)

 // Guard: don't create a channel if already cleaned up
 if (!mounted) return

 // Realtime: ny notis → ladda om listan
 const ch = supabase
 .channel(`notifications:${uid}:${Date.now()}`)
 .on(
 'postgres_changes',
 { event: 'INSERT', schema: 'public', table: 'notifications', filter: `user_id=eq.${uid}` },
 () => { if (mounted) load(uid) },
 )
 .subscribe()
 channelRef.current = ch
 })

 return () => {
 mounted = false
 if (channelRef.current) {
 supabase.removeChannel(channelRef.current)
 channelRef.current = null
 }
 }
 }, [load, supabase])



 async function markAllRead() {
 if (!userId || unread === 0) return
 await supabase.from('notifications').update({ read: true }).eq('user_id', userId).eq('read', false)
 setNotifs(prev => prev.map(n => ({ ...n, read: true })))
 }

 // Stäng vid klick utanför
 useEffect(() => {
 function handleClick(e: MouseEvent) {
 if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
 }
 document.addEventListener('mousedown', handleClick)
 return () => document.removeEventListener('mousedown', handleClick)
 }, [])

 if (!userId) return null

 return (
 <div ref={ref} style={{ position: 'relative' }}>
 <button
 onClick={() => { setOpen(o => !o); if (!open && unread > 0) markAllRead() }}
 aria-label={unread > 0 ? `${unread} olästa notiser` : 'Notiser'}
 aria-expanded={open}
 className="press-feedback"
 style={{
 width: 38, height: 38, borderRadius: '50%',
 background: 'rgba(10,123,140,0.08)',
 border: 'none', cursor: 'pointer',
 display: 'flex', alignItems: 'center', justifyContent: 'center',
 position: 'relative', flexShrink: 0,
 }}
 >
 <svg viewBox="0 0 24 24" fill="none" stroke="var(--sea)" strokeWidth={2} style={{ width: 18, height: 18 }}>
 <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
 </svg>
 {unread > 0 && (
 <div style={{
 position: 'absolute', top: 4, right: 4,
 width: 16, height: 16, borderRadius: '50%',
 background: 'var(--acc)', border: '2px solid var(--bg)',
 display: 'flex', alignItems: 'center', justifyContent: 'center',
 fontSize: 9, fontWeight: 600, color: '#fff', lineHeight: 1,
 }}>
 {unread > 9 ? '9+' : unread}
 </div>
 )}
 </button>

 {open && (
 <div style={{
 position: 'absolute', top: 46, right: 0, zIndex: 200,
 width: 300, maxHeight: 420, overflowY: 'auto',
 background: 'var(--white)', borderRadius: 18,
 boxShadow: '0 8px 40px rgba(0,30,50,0.18)',
 border: '1px solid rgba(10,123,140,0.10)',
 }}>
 <div style={{ padding: '14px 16px 10px', borderBottom: '1px solid rgba(10,123,140,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
 <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--txt)' }}>Notiser</span>
 <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
 {unread > 0 && (
 <button onClick={markAllRead} className="press-feedback" style={{ fontSize: 11, color: 'var(--txt3)', background: 'none', border: 'none', cursor: 'pointer' }}>
 Markera lästa
 </button>
 )}
 <Link href="/notiser" onClick={() => setOpen(false)} style={{ fontSize: 11, fontWeight: 700, color: 'var(--sea)', textDecoration: 'none' }}>
 Visa alla →
 </Link>
 </div>
 </div>

 {notifs.length === 0 ? (
 <div style={{ padding: '28px 18px 24px', textAlign: 'center' }}>
   <div style={{
     width: 44, height: 44, borderRadius: '50%',
     background: 'rgba(10,123,140,0.06)',
     display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
     marginBottom: 10, color: 'var(--sea)',
   }}>
     <Icon name="bell" size={20} stroke={1.8} />
   </div>
   <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--txt)', marginBottom: 4 }}>
     Inga notiser ännu
   </div>
   <div style={{ fontSize: 12, color: 'var(--txt3)', lineHeight: 1.5, marginBottom: 14 }}>
     När någon följer dig, gillar din tur eller svarar i forumet dyker det upp här.
   </div>
   <Link
     href="/upptack"
     onClick={() => setOpen(false)}
     style={{
       display: 'inline-block',
       padding: '8px 16px',
       borderRadius: 10,
       background: 'var(--grad-sea, var(--sea))',
       color: '#fff',
       fontSize: 12, fontWeight: 700,
       textDecoration: 'none',
       letterSpacing: '0.02em',
     }}
   >
     Hitta seglare att följa
   </Link>
 </div>
 ) : (
 notifs.map(n => {
   const iconName = TYPE_ICON[n.type] ?? 'bell'
   const iconColor = TYPE_COLOR[n.type] ?? 'var(--sea)'
   return (
 <Link
 key={n.id}
 href={
 (n.type === 'forum_reply' || n.type === 'forum_like' || n.type === 'forum_mention' || n.type === 'forum_best_answer') && n.reference_id
 ? `/forum/t/${n.reference_id}`
 : n.type === 'follow' && n.actor_username
 ? `/u/${n.actor_username}`
 : n.type === 'friend_visit' && n.related_island_slug
 ? `/o/${n.related_island_slug}`
 : n.trip_id
 ? `/tur/${n.trip_id}`
 : '#'
 }
 onClick={() => setOpen(false)}
 style={{
 display: 'flex', alignItems: 'flex-start', gap: 10,
 padding: '11px 16px',
 background: n.read ? 'transparent' : 'rgba(10,123,140,0.04)',
 borderBottom: '1px solid rgba(10,123,140,0.06)',
 textDecoration: 'none',
 transition: 'background 120ms ease',
 }}
 onMouseEnter={e => { e.currentTarget.style.background = 'rgba(10,123,140,0.07)' }}
 onMouseLeave={e => { e.currentTarget.style.background = n.read ? 'transparent' : 'rgba(10,123,140,0.04)' }}
 >
 <div style={{ position: 'relative', flexShrink: 0 }}>
   {n.actor_avatar ? (
     <img
       src={n.actor_avatar}
       alt=""
       width={36}
       height={36}
       style={{ width: 36, height: 36, aspectRatio: '1 / 1', borderRadius: '50%', objectFit: 'cover', display: 'block' }}
     />
   ) : (
     <div style={{
       width: 36, height: 36, aspectRatio: '1 / 1', borderRadius: '50%',
       background: 'var(--grad-sea)',
       display: 'flex', alignItems: 'center', justifyContent: 'center',
       fontSize: 13, fontWeight: 700, color: '#fff',
     }}>
       {n.actor_username?.[0]?.toUpperCase() ?? '?'}
     </div>
   )}
   {/* Liten typ-ikon i hörnet */}
   <div style={{
     position: 'absolute', bottom: -2, right: -2,
     width: 18, height: 18, borderRadius: '50%',
     background: iconColor,
     border: '2px solid var(--white, #fff)',
     display: 'flex', alignItems: 'center', justifyContent: 'center',
     color: '#fff',
   }}>
     <Icon name={iconName} size={9} stroke={2.5} />
   </div>
 </div>
 <div style={{ flex: 1, minWidth: 0 }}>
 <span style={{ fontSize: 13, color: 'var(--txt)', lineHeight: 1.4 }}>
 <strong>{n.actor_username}</strong> {TYPE_LABEL[n.type] ?? 'gjorde något'}
 </span>
 <div style={{ fontSize: 11, color: 'var(--txt3)', marginTop: 2 }}>{timeAgoShort(n.created_at)}</div>
 </div>
 {!n.read && (
 <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--sea)', flexShrink: 0, marginTop: 5 }} />
 )}
 </Link>
   )
 })
 )}
 </div>
 )}
 </div>
 )
}
