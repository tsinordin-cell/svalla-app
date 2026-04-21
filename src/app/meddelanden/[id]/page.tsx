'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import { markConversationRead, acceptDMRequest, declineDMRequest, deleteMessage, leaveConversation } from '@/lib/dm'
import { blockUser } from '@/lib/blocks'
import { toast } from '@/components/Toast'
import { absoluteDate, avatarGradient, initialsOf } from '@/lib/utils'
import { radius, fontWeight, fontSize, space, shadow, duration, easing } from '@/lib/tokens'
import type { Message, Conversation } from '@/lib/supabase'

type MsgWithMeta = Message & { username?: string; avatar?: string | null; optimistic?: boolean }

/** Format: "nu" / "5m" / "14:23" / "Mån 14:23" / "15 apr 14:23" */
function fmtMsgTime(iso: string): string {
  const d = new Date(iso)
  const now = Date.now()
  const diff = now - d.getTime()
  const mins = Math.floor(diff / 60_000)
  if (mins < 1) return 'nu'
  if (mins < 60) return `${mins}m`
  const hhmm = d.toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' })
  if (mins < 1440) return hhmm
  const days = Math.floor(mins / 1440)
  if (days < 7) return `${d.toLocaleDateString('sv-SE', { weekday: 'short' }).replace('.', '')} ${hhmm}`
  return `${d.getDate()} ${d.toLocaleDateString('sv-SE', { month: 'short' }).replace('.', '')} ${hhmm}`
}

/** Day label for separator */
function dayLabel(iso: string): string {
  const d = new Date(iso)
  const today = new Date(); today.setHours(0,0,0,0)
  const yesterday = new Date(today); yesterday.setDate(today.getDate() - 1)
  const msgDay = new Date(d); msgDay.setHours(0,0,0,0)
  if (msgDay.getTime() === today.getTime()) return 'Idag'
  if (msgDay.getTime() === yesterday.getTime()) return 'Igår'
  const diffDays = Math.floor((today.getTime() - msgDay.getTime()) / 86_400_000)
  if (diffDays < 7) return d.toLocaleDateString('sv-SE', { weekday: 'long' }).replace(/^\w/, c => c.toUpperCase())
  return `${d.getDate()} ${d.toLocaleDateString('sv-SE', { month: 'long' })}`
}

function sameDay(a: string, b: string): boolean {
  const da = new Date(a), db = new Date(b)
  return da.getFullYear() === db.getFullYear() &&
    da.getMonth() === db.getMonth() &&
    da.getDate() === db.getDate()
}

export default function ChatPage() {
  const params = useParams()
  const id = params?.id as string
  const router = useRouter()
  const supabase = useRef(createClient()).current

  const [me, setMe] = useState<string | null>(null)
  const [conv, setConv] = useState<Conversation | null>(null)
  const [otherName, setOtherName] = useState<string>('Chatt')
  const [otherAvatar, setOtherAvatar] = useState<string | null>(null)
  const [otherUsername, setOtherUsername] = useState<string | null>(null)
  const [messages, setMessages] = useState<MsgWithMeta[]>([])
  const [text, setText] = useState('')
  const [posting, setPosting] = useState(false)
  const [loading, setLoading] = useState(true)
  const [sharingGeo, setSharingGeo] = useState(false)
  const [otherId, setOtherId] = useState<string | null>(null)

  // Long-press action sheet
  const [actionSheet, setActionSheet] = useState<{
    msgId: string | null
    isOwn: boolean
    show: boolean
  }>({ msgId: null, isOwn: false, show: false })
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const listRef = useRef<HTMLDivElement>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  const userMapRef = useRef<Record<string, { username: string; avatar: string | null }>>({})

  // Bootstrap
  useEffect(() => {
    let cancel = false
    async function boot() {
      const { data: { user } } = await supabase.auth.getUser()
      if (cancel) return
      if (!user) { router.push('/logga-in'); return }
      setMe(user.id)

      // Konversationsinfo
      const { data: c } = await supabase.from('conversations').select('*').eq('id', id).single()
      if (cancel) return
      if (!c) { router.push('/meddelanden'); return }
      setConv(c as Conversation)

      // Motpart (för 1-till-1) — hämta alla deltagare → visa den andra
      const { data: parts } = await supabase
        .from('conversation_participants')
        .select('user_id')
        .eq('conversation_id', id)
      const otherIds = (parts ?? []).map(p => p.user_id).filter(u => u !== user.id)
      if (otherIds.length > 0) {
        const { data: users } = await supabase.from('users').select('id, username, avatar').in('id', otherIds)
        for (const u of users ?? []) {
          userMapRef.current[u.id] = { username: u.username, avatar: u.avatar ?? null }
        }
        // egen info till cache
        const { data: myU } = await supabase.from('users').select('username, avatar').eq('id', user.id).single()
        if (myU) userMapRef.current[user.id] = { username: myU.username, avatar: myU.avatar ?? null }

        if (!c.is_group && users && users[0]) {
          setOtherName(users[0].username)
          setOtherUsername(users[0].username)
          setOtherAvatar(users[0].avatar ?? null)
          setOtherId(users[0].id)
        } else if (c.is_group) {
          setOtherName(c.title ?? 'Gruppchatt')
        }
      }

      await loadMessages(user.id)
      await markConversationRead(supabase, user.id, id)
      setLoading(false)
    }
    boot()
    return () => { cancel = true }
  }, [id, supabase, router])

  const loadMessages = useCallback(async (userId: string) => {
    const { data } = await supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', id)
      .order('created_at', { ascending: true })
      .limit(200)
    const rows = (data ?? []) as MsgWithMeta[]

    // Se till att alla user_ids finns i cache
    const missing = [...new Set(rows.map(r => r.user_id))].filter(u => !userMapRef.current[u])
    if (missing.length > 0) {
      const { data: users } = await supabase.from('users').select('id, username, avatar').in('id', missing)
      for (const u of users ?? []) userMapRef.current[u.id] = { username: u.username, avatar: u.avatar ?? null }
    }

    setMessages(rows.map(m => ({
      ...m,
      username: userMapRef.current[m.user_id]?.username ?? 'Seglare',
      avatar: userMapRef.current[m.user_id]?.avatar ?? null,
    })))

    // Markera läst igen
    await markConversationRead(supabase, userId, id)
  }, [supabase, id])

  // Realtime
  useEffect(() => {
    if (!me) return
    const ch = supabase
      .channel(`conv:${id}`)
      .on('postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages', filter: `conversation_id=eq.${id}` },
        () => { loadMessages(me) },
      )
      .subscribe()
    return () => { supabase.removeChannel(ch) }
  }, [supabase, id, me, loadMessages])

  // Presence — signalera att jag är aktiv i denna chatt så servern inte pushar hit
  useEffect(() => {
    if (!me) return
    const stamp = () => {
      supabase.from('user_presence').upsert(
        { user_id: me, current_chat_id: id, updated_at: new Date().toISOString() },
        { onConflict: 'user_id' },
      ).then(() => {})
    }
    stamp()
    const hb = setInterval(stamp, 15_000)
    return () => {
      clearInterval(hb)
      supabase.from('user_presence').update({
        current_chat_id: null,
        updated_at: new Date().toISOString(),
      }).eq('user_id', me).then(() => {})
    }
  }, [supabase, me, id])

  // Auto-scroll till botten
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight
    }
  }, [messages.length])

  async function send(e?: React.FormEvent) {
    e?.preventDefault()
    const content = text.trim()
    if (!me || !content || posting) return
    setPosting(true)
    setText('')

    const tempId = `opt-${Date.now()}`
    const nowIso = new Date().toISOString()
    setMessages(prev => [...prev, {
      id: tempId,
      conversation_id: id,
      user_id: me,
      content,
      attachment_type: null, attachment_url: null, attachment_meta: null,
      created_at: nowIso,
      username: userMapRef.current[me]?.username ?? 'Du',
      avatar: userMapRef.current[me]?.avatar ?? null,
      optimistic: true,
    }])

    const { error } = await supabase.from('messages').insert({
      conversation_id: id, user_id: me, content,
    })
    if (error) {
      setMessages(prev => prev.filter(m => m.id !== tempId))
      setText(content)
      setPosting(false)
      return
    }

    await loadMessages(me)
    setPosting(false)

    // Push-notis till övriga deltagare. Om conv är en pending request SKAPAD AV MIG
    // → första meddelandet blir en request-push ("X vill skriva till dig").
    const isPendingFromMe = conv?.status === 'request' && conv?.created_by === me
    pushToOthers(content.slice(0, 60), isPendingFromMe ? 'request' : 'message')
  }

  async function sendAttachment(type: 'image' | 'geo', url: string, meta: Record<string, unknown>) {
    if (!me) return
    const { error } = await supabase.from('messages').insert({
      conversation_id: id, user_id: me,
      content: null, attachment_type: type, attachment_url: url, attachment_meta: meta,
    })
    if (!error) {
      await loadMessages(me)
      pushToOthers(type === 'image' ? '📷 Bild' : '📍 Position')
    }
  }

  async function pushToOthers(preview: string, kind: 'message' | 'request' | 'accept' = 'message') {
    if (!me) return
    // Server avgör vem som faktiskt får push (presence, mute, throttle)
    fetch('/api/push/dm', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ conversationId: id, preview, kind }),
    }).catch(() => {})

    // In-app-notiser i notifications-tabellen — separat kanal
    const { data: parts } = await supabase
      .from('conversation_participants')
      .select('user_id')
      .eq('conversation_id', id)
      .neq('user_id', me)
    for (const p of parts ?? []) {
      supabase.from('notifications').insert({
        user_id: p.user_id, actor_id: me, type: 'message',
      }).then(() => {})
    }
  }

  async function handleAcceptRequest() {
    if (!conv || !me) return
    const ok = await acceptDMRequest(supabase, conv.id)
    if (!ok) { toast('Kunde inte acceptera förfrågan. Försök igen.', 'error'); return }
    setConv({ ...conv, status: 'active' } as Conversation)
    toast('Förfrågan accepterad', 'success')
    // Notifiera avsändaren (push + in-app)
    if (conv.created_by && conv.created_by !== me) {
      pushToOthers('Du kan nu skriva fritt', 'accept')
      supabase.from('notifications').insert({
        user_id: conv.created_by, actor_id: me, type: 'dm_accepted',
        reference_id: conv.id,
      }).then(() => {})
    }
  }

  async function handleDeclineRequest() {
    if (!conv) return
    const ok = await declineDMRequest(supabase, conv.id)
    if (!ok) { toast('Kunde inte avvisa förfrågan. Försök igen.', 'error'); return }
    router.push('/meddelanden')
  }

  async function handleDeleteMessage(msgId: string) {
    setActionSheet({ msgId: null, isOwn: false, show: false })
    if (!confirm('Radera meddelandet?')) return
    const ok = await deleteMessage(supabase, msgId)
    if (ok) {
      setMessages(prev => prev.filter(m => m.id !== msgId))
    } else {
      toast('Kunde inte radera meddelandet.', 'error')
    }
  }

  async function handleLeaveConversation() {
    setActionSheet({ msgId: null, isOwn: false, show: false })
    if (!me || !conv) return
    if (!confirm('Radera konversationen? Den försvinner bara för dig.')) return
    const ok = await leaveConversation(supabase, me, conv.id)
    if (ok) {
      router.push('/meddelanden')
    } else {
      toast('Kunde inte radera konversationen.', 'error')
    }
  }

  async function handleBlockUser() {
    setActionSheet({ msgId: null, isOwn: false, show: false })
    if (!me || !otherId) return
    if (!confirm(`Blockera ${otherName}? Du kan inte DM:a varandra längre.`)) return
    const ok = await blockUser(supabase, me, otherId)
    if (ok) {
      toast(`${otherName} blockerad`, 'success')
      router.push('/meddelanden')
    } else {
      toast('Något gick fel.', 'error')
    }
  }

  function onLongPressStart(msgId: string, isOwn: boolean) {
    longPressTimer.current = setTimeout(() => {
      setActionSheet({ msgId, isOwn, show: true })
    }, 500)
  }

  function onLongPressEnd() {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current)
      longPressTimer.current = null
    }
  }

  async function onPickImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file || !me) return
    const ext = file.name.split('.').pop()?.toLowerCase() ?? 'jpg'
    const path = `dm/${me}/${Date.now()}.${ext}`
    const { data, error } = await supabase.storage.from('trip-images').upload(path, file, { upsert: false })
    if (error || !data) return
    const { data: pub } = supabase.storage.from('trip-images').getPublicUrl(data.path)
    await sendAttachment('image', pub.publicUrl, { name: file.name, size: file.size })
  }

  async function shareGeo() {
    if (!navigator.geolocation || sharingGeo) return
    setSharingGeo(true)
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords
        await sendAttachment('geo',
          `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=15/${latitude}/${longitude}`,
          { lat: latitude, lng: longitude, accuracy: pos.coords.accuracy },
        )
        setSharingGeo(false)
      },
      () => { setSharingGeo(false) },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 },
    )
  }

  const displayGrad = avatarGradient(otherUsername ?? otherName ?? id)
  const displayInitials = initialsOf(otherName)

  // Enrich messages with group metadata (grouping, day separators, tail logic)
  const enriched = messages.map((m, i) => {
    const prev = messages[i - 1]
    const next = messages[i + 1]
    const mine = m.user_id === me
    const sameAsPrev = !!prev && prev.user_id === m.user_id &&
      (new Date(m.created_at).getTime() - new Date(prev.created_at).getTime() < 5 * 60_000)
    const sameAsNext = !!next && next.user_id === m.user_id &&
      (new Date(next.created_at).getTime() - new Date(m.created_at).getTime() < 5 * 60_000)
    const needsDaySep = !prev || !sameDay(prev.created_at, m.created_at)
    const isLastInGroup = !sameAsNext
    return { ...m, mine, sameAsPrev, sameAsNext, needsDaySep, isLastInGroup }
  })

  return (
    <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>

      {/* ── Header ── */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'var(--glass-96)',
        backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(10,123,140,0.10)',
        height: 56,
        display: 'flex', alignItems: 'center',
        padding: '0 14px',
      }}>
        <div style={{ maxWidth: 520, margin: '0 auto', width: '100%', display: 'flex', alignItems: 'center', gap: 10 }}>
          {/* Back — 44×44 touch target, no circle bg */}
          <Link href="/meddelanden" aria-label="Tillbaka" style={{
            width: 44, height: 44, flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            borderRadius: radius.sm,
            WebkitTapHighlightColor: 'transparent',
          }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="var(--sea)" strokeWidth={2.5} style={{ width: 20, height: 20 }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </Link>

          {/* Avatar + name — tappable to profile */}
          <Link href={otherUsername ? `/u/${otherUsername}` : '#'} style={{
            display: 'flex', alignItems: 'center', gap: 10,
            flex: 1, minWidth: 0, textDecoration: 'none',
          }}>
            <div style={{
              width: 32, height: 32, borderRadius: radius.xs, flexShrink: 0,
              background: displayGrad, color: '#fff',
              fontWeight: fontWeight.semibold, fontSize: fontSize.small,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              overflow: 'hidden', position: 'relative',
            }}>
              {otherAvatar
                // eslint-disable-next-line @next/next/no-img-element
                ? <img loading="lazy" decoding="async" src={otherAvatar} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                : displayInitials
              }
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                fontSize: fontSize.bodyEmph, fontWeight: fontWeight.semibold,
                color: 'var(--txt)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
              }}>
                {otherName}
              </div>
            </div>
          </Link>
        </div>
      </header>

      {/* ── Request banner — receiver side ── */}
      {!loading && conv?.status === 'request' && me && conv.created_by !== me && (
        <div style={{ maxWidth: 520, width: '100%', margin: '12px auto 0', padding: '0 16px' }}>
          <div style={{
            padding: '14px 16px', borderRadius: radius.md,
            background: 'linear-gradient(135deg, rgba(201,110,42,0.10), rgba(30,92,130,0.06))',
            border: '1px solid rgba(201,110,42,0.22)',
          }}>
            <div style={{ fontSize: fontSize.small, color: 'var(--txt)', fontWeight: fontWeight.semibold, marginBottom: 4 }}>
              {otherName} vill skriva till dig
            </div>
            <div style={{ fontSize: fontSize.small, color: 'var(--txt3)', lineHeight: 1.5, marginBottom: 12 }}>
              Acceptera för att svara. Avvisar du försvinner konversationen.
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={handleAcceptRequest} style={{
                flex: 1, padding: '10px 14px', borderRadius: radius.sm, border: 'none',
                background: 'linear-gradient(135deg,#1e5c82,#2d7d8a)', color: '#fff',
                fontWeight: fontWeight.semibold, fontSize: fontSize.small,
                cursor: 'pointer', WebkitTapHighlightColor: 'transparent',
              }}>Acceptera</button>
              <button onClick={handleDeclineRequest} style={{
                flex: 1, padding: '10px 14px', borderRadius: radius.sm,
                border: '1px solid rgba(10,123,140,0.18)',
                background: 'var(--white)', color: 'var(--txt)',
                fontWeight: fontWeight.medium, fontSize: fontSize.small,
                cursor: 'pointer', WebkitTapHighlightColor: 'transparent',
              }}>Avvisa</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Pending banner — sender side ── */}
      {!loading && conv?.status === 'request' && me && conv.created_by === me && (
        <div style={{ maxWidth: 520, width: '100%', margin: '12px auto 0', padding: '0 16px' }}>
          <div style={{
            padding: '10px 14px', borderRadius: radius.sm,
            background: 'rgba(122,157,171,0.10)', border: '1px solid rgba(122,157,171,0.22)',
            fontSize: fontSize.small, color: 'var(--txt3)', lineHeight: 1.5,
          }}>
            Förfrågan skickad. {otherName} måste acceptera för att svara.
          </div>
        </div>
      )}

      {/* ── Message list ── */}
      <div ref={listRef} style={{
        flex: 1, overflowY: 'auto',
        padding: `${space[4]}px ${space[3]}px`,
        maxWidth: 520, width: '100%', margin: '0 auto',
        display: 'flex', flexDirection: 'column',
        justifyContent: 'flex-end',
      }}>

        {/* Loading */}
        {loading && (
          <div style={{ padding: 40, textAlign: 'center', margin: 'auto' }}>
            <div style={{
              width: 22, height: 22, borderRadius: '50%',
              border: '2.5px solid var(--sea)', borderTopColor: 'transparent',
              animation: 'spin .7s linear infinite', display: 'inline-block',
            }} />
          </div>
        )}

        {/* Empty state */}
        {!loading && messages.length === 0 && (
          <div style={{ margin: 'auto', textAlign: 'center' }}>
            <div style={{
              width: 64, height: 64, borderRadius: radius.md,
              background: 'rgba(10,123,140,0.08)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 16px',
            }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="var(--sea)" strokeWidth={1.8} style={{ width: 28, height: 28 }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <div style={{ fontSize: fontSize.subtitle, fontWeight: fontWeight.semibold, color: 'var(--txt)', marginBottom: 6 }}>
              Starta samtalet
            </div>
            <div style={{ fontSize: fontSize.body, color: 'var(--txt3)', maxWidth: 240, margin: '0 auto' }}>
              Skriv ett meddelande för att komma igång
            </div>
          </div>
        )}

        {/* Messages */}
        {!loading && enriched.map((m) => {
          const avatarGrad = avatarGradient(m.username ?? m.user_id)
          const inits = initialsOf(m.username)
          // Tail: own = bottom-right r6, other = bottom-left r6 (only last in group)
          const bubbleR = m.mine
            ? (m.isLastInGroup ? '20px 20px 6px 20px' : '20px')
            : (m.isLastInGroup ? '20px 20px 20px 6px' : '20px')

          return (
            <div key={m.id}>
              {/* Day separator */}
              {m.needsDaySep && (
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  margin: `${space[4]}px 0 ${space[3]}px`,
                }}>
                  <div style={{ flex: 1, height: 1, background: 'rgba(10,123,140,0.10)' }} />
                  <span style={{
                    fontSize: fontSize.caption, fontWeight: fontWeight.medium,
                    color: 'var(--txt3)', letterSpacing: '0.3px',
                  }}>
                    {dayLabel(m.created_at)}
                  </span>
                  <div style={{ flex: 1, height: 1, background: 'rgba(10,123,140,0.10)' }} />
                </div>
              )}

              {/* Row */}
              <div
                style={{
                  display: 'flex', gap: 8, alignItems: 'flex-end',
                  flexDirection: m.mine ? 'row-reverse' : 'row',
                  marginTop: m.sameAsPrev ? 2 : 12,
                  opacity: m.optimistic ? 0.6 : 1,
                }}
                onMouseDown={() => onLongPressStart(m.id, m.mine)}
                onMouseUp={onLongPressEnd}
                onMouseLeave={onLongPressEnd}
                onTouchStart={() => onLongPressStart(m.id, m.mine)}
                onTouchEnd={onLongPressEnd}
                onContextMenu={e => { e.preventDefault(); setActionSheet({ msgId: m.id, isOwn: m.mine, show: true }) }}
              >
                {/* Avatar — others only, hidden when not last in group */}
                {!m.mine && (
                  <div style={{
                    width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                    visibility: m.isLastInGroup ? 'visible' : 'hidden',
                    background: avatarGrad, color: '#fff',
                    fontWeight: fontWeight.semibold, fontSize: 11,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    overflow: 'hidden', position: 'relative',
                  }}>
                    {m.avatar
                      // eslint-disable-next-line @next/next/no-img-element
                      ? <img loading="lazy" decoding="async" src={m.avatar} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                      : inits
                    }
                  </div>
                )}

                {/* Bubble column */}
                <div style={{
                  maxWidth: '75%', display: 'flex', flexDirection: 'column',
                  alignItems: m.mine ? 'flex-end' : 'flex-start',
                  gap: 3,
                }}>
                  {/* Image */}
                  {m.attachment_type === 'image' && m.attachment_url && (
                    <a href={m.attachment_url} target="_blank" rel="noreferrer">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img loading="lazy" decoding="async" src={m.attachment_url} alt="" style={{ maxWidth: 240, maxHeight: 240, borderRadius: bubbleR, display: 'block' }} />
                    </a>
                  )}

                  {/* Geo */}
                  {m.attachment_type === 'geo' && m.attachment_meta && (
                    <a href={m.attachment_url ?? '#'} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
                      <div style={{
                        padding: '10px 14px', borderRadius: bubbleR,
                        background: m.mine ? 'linear-gradient(135deg,#1e5c82,#2d7d8a)' : 'rgba(10,40,80,0.06)',
                        color: m.mine ? '#fff' : 'var(--txt)',
                        fontSize: fontSize.body, lineHeight: 1.4,
                        display: 'flex', alignItems: 'center', gap: 8,
                        boxShadow: m.mine ? shadow.sm : 'none',
                      }}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: 16, height: 16, flexShrink: 0 }}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                          <circle cx="12" cy="9" r="2.5" />
                        </svg>
                        <span>Delad position</span>
                      </div>
                    </a>
                  )}

                  {/* Trip card — no IIFE, extracted component */}
                  {m.attachment_type === 'trip' && m.attachment_meta && (
                    <TripBubble meta={m.attachment_meta as TripMeta} />
                  )}

                  {/* Text bubble */}
                  {m.content && (
                    <div style={{
                      padding: '9px 14px', borderRadius: bubbleR,
                      background: m.mine ? 'linear-gradient(135deg,#1e5c82,#2d7d8a)' : 'rgba(10,40,80,0.06)',
                      color: m.mine ? '#fff' : 'var(--txt)',
                      fontSize: fontSize.body, lineHeight: 1.4, wordBreak: 'break-word',
                      boxShadow: m.mine ? shadow.sm : 'none',
                    }}>
                      {m.content}
                    </div>
                  )}

                  {/* Timestamp — last in group only */}
                  {m.isLastInGroup && (
                    <span title={absoluteDate(m.created_at)} style={{
                      fontSize: fontSize.caption, color: 'var(--txt3)',
                      fontWeight: fontWeight.medium, padding: '0 4px',
                    }}>
                      {m.optimistic ? 'skickar…' : fmtMsgTime(m.created_at)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* ── Input bar — hidden for request receiver until accepted ── */}
      {!(conv?.status === 'request' && me && conv.created_by !== me) && (
        <form onSubmit={send} style={{
          background: 'var(--white)',
          borderTop: '1px solid rgba(10,123,140,0.10)',
          paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        }}>
          <div style={{
            maxWidth: 520, margin: '0 auto', height: 56,
            display: 'flex', alignItems: 'center',
            gap: space[2], padding: `0 ${space[3]}px`,
          }}>
            <input ref={fileRef} type="file" accept="image/*" onChange={onPickImage} style={{ display: 'none' }} />

            {/* Image — neutral 36×36 */}
            <button type="button" onClick={() => fileRef.current?.click()} aria-label="Bifoga bild" style={{
              width: 36, height: 36, borderRadius: radius.sm, border: 'none',
              background: 'rgba(10,40,80,0.06)', color: 'var(--txt3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              cursor: 'pointer', WebkitTapHighlightColor: 'transparent',
            }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} style={{ width: 18, height: 18 }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4-4a3 3 0 014 0l4 4m-4-4l2-2a3 3 0 014 0l2 2M4 20h16a2 2 0 002-2V6a2 2 0 00-2-2H4a2 2 0 00-2 2v12a2 2 0 002 2z" />
                <circle cx="9" cy="10" r="1.5" fill="currentColor" />
              </svg>
            </button>

            {/* Geo — neutral 36×36 */}
            <button type="button" onClick={shareGeo} disabled={sharingGeo} aria-label="Dela position" style={{
              width: 36, height: 36, borderRadius: radius.sm, border: 'none',
              background: 'rgba(10,40,80,0.06)', color: 'var(--txt3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              cursor: sharingGeo ? 'default' : 'pointer', opacity: sharingGeo ? 0.5 : 1,
              WebkitTapHighlightColor: 'transparent',
            }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} style={{ width: 18, height: 18 }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                <circle cx="12" cy="9" r="2.5" />
              </svg>
            </button>

            {/* Text field */}
            <input
              value={text}
              onChange={e => setText(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }}
              placeholder="Skriv ett meddelande…"
              maxLength={2000}
              autoComplete="off"
              style={{
                flex: 1, border: '1.5px solid rgba(10,123,140,0.15)',
                borderRadius: radius.full, padding: '9px 16px',
                fontSize: fontSize.body, outline: 'none',
                background: 'rgba(10,123,140,0.03)', color: 'var(--txt)',
                lineHeight: 1.4,
              }}
            />

            {/* Send */}
            <button className="press-feedback" type="submit" disabled={!text.trim() || posting} aria-label="Skicka" style={{
              width: 36, height: 36, borderRadius: '50%', border: 'none', flexShrink: 0,
              background: text.trim() && !posting ? 'linear-gradient(135deg,#1e5c82,#2d7d8a)' : 'rgba(10,40,80,0.08)',
              color: text.trim() && !posting ? '#fff' : 'rgba(10,40,80,0.28)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: text.trim() && !posting ? 'pointer' : 'default',
              boxShadow: text.trim() && !posting ? shadow.sm : 'none',
              WebkitTapHighlightColor: 'transparent',
              transition: `background ${duration.base}ms ${easing}, box-shadow ${duration.base}ms ${easing}`,
            }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} style={{ width: 15, height: 15, transform: 'translateX(1px)' }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </form>
      )}

      {/* ── Action sheet (long-press) ── */}
      {actionSheet.show && (
        <>
          <div
            onClick={() => setActionSheet({ msgId: null, isOwn: false, show: false })}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.35)', zIndex: 200 }}
          />
          <div style={{
            position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 201,
            background: 'var(--white)', borderRadius: `${radius.lg}px ${radius.lg}px 0 0`,
            padding: `8px 0 calc(20px + env(safe-area-inset-bottom))`,
            boxShadow: shadow.md,
          }}>
            <div style={{ width: 36, height: 4, borderRadius: 2, background: 'rgba(0,0,0,0.12)', margin: '4px auto 16px' }} />
            {actionSheet.isOwn && actionSheet.msgId && (
              <ActionSheetItem icon="🗑️" label="Radera meddelande" color="#dc2626"
                onClick={() => handleDeleteMessage(actionSheet.msgId!)} />
            )}
            <ActionSheetItem icon="💬" label="Radera konversation" color="#dc2626"
              onClick={handleLeaveConversation} />
            {!conv?.is_group && otherId && (
              <ActionSheetItem icon="🚫" label={`Blockera ${otherName}`} color="#dc2626"
                onClick={handleBlockUser} />
            )}
            <ActionSheetItem icon="✕" label="Avbryt" color="var(--txt3)"
              onClick={() => setActionSheet({ msgId: null, isOwn: false, show: false })} />
          </div>
        </>
      )}

      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )
}

// ── Trip card bubble ──────────────────────────────────────────────────────────
type TripMeta = { trip_id?: string; location_name?: string; distance?: number; image?: string }

function TripBubble({ meta }: { meta: TripMeta }) {
  return (
    <a href={meta.trip_id ? `/tur/${meta.trip_id}` : '#'} style={{ textDecoration: 'none', display: 'block', maxWidth: 260 }}>
      <div style={{
        borderRadius: radius.sm, overflow: 'hidden',
        border: '1px solid rgba(10,123,140,0.15)',
        background: 'var(--white)', boxShadow: shadow.xs,
      }}>
        {meta.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img loading="lazy" decoding="async" src={meta.image} alt="" style={{ width: '100%', height: 100, objectFit: 'cover', display: 'block' }} />
        )}
        <div style={{ padding: '8px 12px 10px' }}>
          <div style={{ fontSize: fontSize.caption, color: 'var(--txt3)', fontWeight: fontWeight.semibold, marginBottom: 2 }}>⛵ Tur</div>
          <div style={{ fontSize: fontSize.small, fontWeight: fontWeight.semibold, color: 'var(--txt)', lineHeight: 1.3 }}>
            {meta.location_name ?? 'Okänd plats'}
          </div>
          {meta.distance != null && meta.distance > 0 && (
            <div style={{ fontSize: fontSize.caption, color: 'var(--sea)', fontWeight: fontWeight.medium, marginTop: 3 }}>
              {meta.distance.toFixed(1)} NM
            </div>
          )}
        </div>
      </div>
    </a>
  )
}

// ── Action sheet row ──────────────────────────────────────────────────────────
function ActionSheetItem({ icon, label, color, onClick }: {
  icon: string; label: string; color: string; onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', gap: 14,
        width: '100%', padding: '14px 24px',
        border: 'none', background: 'transparent',
        cursor: 'pointer', WebkitTapHighlightColor: 'transparent',
      }}
    >
      <span style={{ fontSize: 20, width: 28, textAlign: 'center' }}>{icon}</span>
      <span style={{ fontSize: fontSize.bodyEmph, fontWeight: fontWeight.semibold, color }}>{label}</span>
    </button>
  )
}
