'use client'

import { useEffect, useState, useRef, useCallback, useMemo } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase'
import { markConversationRead, acceptDMRequest, declineDMRequest, deleteMessage, leaveConversation } from '@/lib/dm'
import { blockUser } from '@/lib/blocks'
import { toast } from '@/components/Toast'
import { absoluteDate, avatarGradient, initialsOf } from '@/lib/utils'
import { radius, fontWeight, fontSize, space, shadow, duration, easing } from '@/lib/tokens'
import { reverseGeocode } from '@/lib/reverse-geocode'
import type { Message, Conversation } from '@/lib/supabase'

type MsgWithMeta = Message & { username?: string; avatar?: string | null; optimistic?: boolean }

/** Format: "nu" / "5m" / "14:23" / "Mån 14:23" / "15 apr 14:23" */
function fmtMsgTime(iso: string | null | undefined): string {
  if (!iso) return ''
  try {
    const d = new Date(iso)
    if (isNaN(d.getTime())) return ''
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
  } catch { return '' }
}

/** Day label for separator */
function dayLabel(iso: string | null | undefined): string {
  if (!iso) return ''
  try {
    const d = new Date(iso)
    if (isNaN(d.getTime())) return ''
    const today = new Date(); today.setHours(0,0,0,0)
    const yesterday = new Date(today); yesterday.setDate(today.getDate() - 1)
    const msgDay = new Date(d); msgDay.setHours(0,0,0,0)
    if (msgDay.getTime() === today.getTime()) return 'Idag'
    if (msgDay.getTime() === yesterday.getTime()) return 'Igår'
    const diffDays = Math.floor((today.getTime() - msgDay.getTime()) / 86_400_000)
    if (diffDays < 7) return d.toLocaleDateString('sv-SE', { weekday: 'long' }).replace(/^\w/, c => c.toUpperCase())
    return `${d.getDate()} ${d.toLocaleDateString('sv-SE', { month: 'long' })}`
  } catch { return '' }
}

function sameDay(a: string, b: string): boolean {
  try {
    const da = new Date(a), db = new Date(b)
    if (isNaN(da.getTime()) || isNaN(db.getTime())) return false
    return da.getFullYear() === db.getFullYear() &&
      da.getMonth() === db.getMonth() &&
      da.getDate() === db.getDate()
  } catch { return false }
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
  const [otherReadAt, setOtherReadAt] = useState<string | null>(null)

  // Long-press action sheet (per meddelande)
  const [actionSheet, setActionSheet] = useState<{
    msgId: string | null
    isOwn: boolean
    show: boolean
  }>({ msgId: null, isOwn: false, show: false })

  // Konversationsmeny (⋯ i headern)
  const [convMenu, setConvMenu] = useState(false)

  // Bekräftelsedialog — ersätter native confirm()
  const [confirmSheet, setConfirmSheet] = useState<{
    title: string; body: string; label: string; onConfirm: () => Promise<void>
  } | null>(null)
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const listRef = useRef<HTMLDivElement>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  const userMapRef = useRef<Record<string, { username: string; avatar: string | null }>>({})
  const longPressDidFire = useRef(false)

  // Bootstrap
  useEffect(() => {
    let cancel = false
    async function boot() {
      try {
        const { data: authData } = await supabase.auth.getUser()
        const user = authData?.user
        if (cancel) return
        if (!user) { router.push('/logga-in'); return }
        setMe(user.id)

        // Konversationsinfo
        const { data: c } = await supabase.from('conversations').select('id, is_group, created_by, status').eq('id', id).single()
        if (cancel) return
        if (!c) { router.push('/meddelanden'); return }
        setConv(c as Conversation)

        // Motpart (för 1-till-1) — hämta alla deltagare → visa den andra
        try {
          const { data: parts } = await supabase
            .from('conversation_participants')
            .select('user_id')
            .eq('conversation_id', id)
          const otherIds = (parts ?? []).map((p: { user_id: string }) => p.user_id).filter(u => u !== user.id)
          if (otherIds.length > 0) {
            const { data: users } = await supabase.from('users').select('id, username, avatar').in('id', otherIds)
            for (const u of users ?? []) {
              userMapRef.current[u.id] = { username: u.username, avatar: u.avatar ?? null }
            }
            // egen info till cache
            const { data: myU } = await supabase.from('users').select('username, avatar').eq('id', user.id).single()
            if (myU) userMapRef.current[user.id] = { username: myU.username, avatar: myU.avatar ?? null }

            if (!c.is_group && users && users[0]) {
              setOtherName(users[0].username ?? 'Seglare')
              setOtherUsername(users[0].username ?? null)
              setOtherAvatar(users[0].avatar ?? null)
              setOtherId(users[0].id)
            } else if (c.is_group) {
              setOtherName((c as Conversation).title ?? 'Gruppchatt')
            }
          }
        } catch { /* icke-kritisk — namninfo saknas men chatt fungerar */ }

        await loadMessages(user.id)
        // Hämta motpartens last_read_at för läskvitens
        try {
          const { data: rp } = await supabase
            .from('conversation_participants')
            .select('last_read_at')
            .eq('conversation_id', id)
            .neq('user_id', user.id)
            .single()
          if (rp?.last_read_at) setOtherReadAt(rp.last_read_at)
        } catch { /* tyst */ }
        try { await markConversationRead(supabase, user.id, id) } catch { /* tyst */ }
        if (!cancel) setLoading(false)
      } catch (err) {
        // Logga felet men låt inte en ohanterad rejection krascha sidan
        console.error('[ChatPage] boot error:', err)
        if (!cancel) setLoading(false)
      }
    }
    boot()
    return () => { cancel = true }
  }, [id, supabase, router])

  const loadMessages = useCallback(async (userId: string) => {
    try {
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
        try {
          const { data: users } = await supabase.from('users').select('id, username, avatar').in('id', missing)
          for (const u of users ?? []) userMapRef.current[u.id] = { username: u.username, avatar: u.avatar ?? null }
        } catch { /* tyst — fallback till 'Seglare' */ }
      }

      setMessages(rows.map(m => ({
        ...m,
        username: userMapRef.current[m.user_id]?.username ?? 'Seglare',
        avatar: userMapRef.current[m.user_id]?.avatar ?? null,
      })))

      // Markera läst
      try { await markConversationRead(supabase, userId, id) } catch { /* tyst */ }
    } catch (err) {
      console.error('[ChatPage] loadMessages error:', err)
    }
  }, [supabase, id])

  // Realtime
  useEffect(() => {
    if (!me) return
    // Wrapped i try-catch: iOS/Safari kastar SecurityError synkront om wss:// saknas i CSP.
    // Det sprider sig annars genom realtime-js (ingen intern try-catch) upp till React och
    // triggar error boundary. Primärfix = wss://*.supabase.co i next.config.ts connect-src.
    let ch: ReturnType<typeof supabase.channel> | null = null
    try {
      ch = supabase
        .channel(`conv:${id}`)
        .on('postgres_changes',
          { event: 'INSERT', schema: 'public', table: 'messages', filter: `conversation_id=eq.${id}` },
          () => { loadMessages(me) },
        )
        .on('postgres_changes',
          { event: 'UPDATE', schema: 'public', table: 'conversation_participants', filter: `conversation_id=eq.${id}` },
          async () => {
            const { data: rp } = await supabase
              .from('conversation_participants')
              .select('last_read_at')
              .eq('conversation_id', id)
              .neq('user_id', me)
              .single()
            if (rp?.last_read_at) setOtherReadAt(rp.last_read_at)
          },
        )
        .subscribe()
    } catch {
      // Realtime-prenumeration misslyckades — chatt fungerar utan realtid (pull-to-refresh)
    }
    return () => { if (ch) supabase.removeChannel(ch) }
  }, [supabase, id, me, loadMessages])

  // Presence — signalera att jag är aktiv i denna chatt så servern inte pushar hit
  useEffect(() => {
    if (!me) return
    const stamp = () => {
      supabase.from('user_presence').upsert(
        { user_id: me, current_chat_id: id, updated_at: new Date().toISOString() },
        { onConflict: 'user_id' },
      ).then(() => {}, () => {})
    }
    stamp()
    const hb = setInterval(stamp, 15_000)
    return () => {
      clearInterval(hb)
      supabase.from('user_presence').update({
        current_chat_id: null,
        updated_at: new Date().toISOString(),
      }).eq('user_id', me).then(() => {}, () => {})
    }
  }, [supabase, me, id])

  // Auto-scroll till botten — beror på BÅDE messages.length och loading.
  // Meddelandena renderas bara när !loading, så vi måste vänta tills
  // loading blir false innan scrollHeight är korrekt.
  useEffect(() => {
    if (loading || !listRef.current) return
    const el = listRef.current
    requestAnimationFrame(() => { el.scrollTop = el.scrollHeight })
  }, [messages.length, loading])

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
    setConfirmSheet({
      title: 'Radera meddelande',
      body: 'Meddelandet tas bort permanent.',
      label: 'Radera',
      onConfirm: async () => {
        const ok = await deleteMessage(supabase, msgId)
        if (ok) {
          setMessages(prev => prev.filter(m => m.id !== msgId))
        } else {
          toast('Kunde inte radera meddelandet.', 'error')
        }
      },
    })
  }

  async function handleLeaveConversation() {
    setActionSheet({ msgId: null, isOwn: false, show: false })
    setConvMenu(false)
    if (!me || !conv) return
    setConfirmSheet({
      title: 'Radera konversation',
      body: 'Konversationen försvinner bara för dig.',
      label: 'Radera',
      onConfirm: async () => {
        const ok = await leaveConversation(supabase, me, conv.id)
        if (ok) {
          router.push('/meddelanden')
        } else {
          toast('Kunde inte radera konversationen.', 'error')
        }
      },
    })
  }

  async function handleBlockUser() {
    setActionSheet({ msgId: null, isOwn: false, show: false })
    setConvMenu(false)
    if (!me || !otherId) return
    setConfirmSheet({
      title: `Blockera ${otherName}`,
      body: 'Du och den här personen kan inte längre skicka meddelanden till varandra.',
      label: 'Blockera',
      onConfirm: async () => {
        const ok = await blockUser(supabase, me, otherId)
        if (ok) {
          toast(`${otherName} blockerad`, 'success')
          router.push('/meddelanden')
        } else {
          toast('Något gick fel.', 'error')
        }
      },
    })
  }

  function onLongPressStart(msgId: string, isOwn: boolean) {
    longPressDidFire.current = false
    longPressTimer.current = setTimeout(() => {
      longPressDidFire.current = true
      setActionSheet({ msgId, isOwn, show: true })
    }, 450)
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
        // Reverse-geocoda i bakgrunden så bubblan visar "Sandhamn" istället för
        // "59.2891°, 18.9134°". Degraderar tyst — bubblan fungerar utan namn.
        const location_name = await reverseGeocode(latitude, longitude)
        await sendAttachment('geo',
          `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=15/${latitude}/${longitude}`,
          { lat: latitude, lng: longitude, accuracy: pos.coords.accuracy, location_name },
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

  const lastReadMsgId = useMemo(() => {
    if (!otherReadAt || !me) return null
    const readTime = new Date(otherReadAt).getTime()
    let result: string | null = null
    for (const m of messages) {
      if (m.user_id === me && !m.optimistic && new Date(m.created_at).getTime() <= readTime) {
        result = m.id
      }
    }
    return result
  }, [otherReadAt, messages, me])

  return (
    <div style={{ height: '100dvh', display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>

      {/* ── Header — iOS-style: avatar ovan, namn under, centrerat ── */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'var(--glass-96)',
        backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(10,123,140,0.10)',
        padding: '6px 8px 10px',
      }}>
        <div style={{
          maxWidth: 520, margin: '0 auto', width: '100%',
          position: 'relative',
          minHeight: 74,
        }}>
          {/* Back — absolut vänster, stör inte centreringen */}
          <Link href="/meddelanden" aria-label="Tillbaka" style={{
            position: 'absolute', left: 0, top: 10,
            width: 40, height: 40,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            borderRadius: radius.sm,
            WebkitTapHighlightColor: 'transparent',
            zIndex: 1,
          }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="var(--sea)" strokeWidth={2.5} style={{ width: 20, height: 20 }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </Link>

          {/* ⋯ — absolut höger, konversationsmeny */}
          <button
            onClick={() => setConvMenu(true)}
            aria-label="Mer"
            style={{
              position: 'absolute', right: 0, top: 10,
              width: 40, height: 40,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              borderRadius: radius.sm, border: 'none', background: 'transparent',
              cursor: 'pointer', WebkitTapHighlightColor: 'transparent',
              zIndex: 1,
            }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 20, height: 20, color: 'var(--sea)' }}>
              <circle cx="5" cy="12" r="2" /><circle cx="12" cy="12" r="2" /><circle cx="19" cy="12" r="2" />
            </svg>
          </button>

          {/* Centrerad avatar + namn — tappable till profil */}
          <Link href={otherUsername ? `/u/${otherUsername}` : '#'} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            gap: 2,
            padding: '4px 48px 0',
            textDecoration: 'none',
          }}>
            <div style={{
              width: 44, height: 44, borderRadius: '50%', flexShrink: 0,
              background: displayGrad, color: '#fff',
              fontWeight: fontWeight.semibold, fontSize: fontSize.body,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              overflow: 'hidden', position: 'relative',
              boxShadow: '0 2px 10px rgba(0,45,60,0.18)',
              border: '2px solid var(--white, #fff)',
            }}>
              {otherAvatar
                ? <Image src={otherAvatar} alt="" fill sizes="44px" style={{ objectFit: 'cover' }} />
                : displayInitials
              }
            </div>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 3,
              maxWidth: '100%',
            }}>
              <span style={{
                fontSize: fontSize.small, fontWeight: fontWeight.semibold,
                color: 'var(--txt)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
              }}>
                {otherName}
              </span>
              <svg viewBox="0 0 24 24" fill="none" stroke="var(--txt3)" strokeWidth={2.25} style={{ width: 11, height: 11, flexShrink: 0 }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
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
                background: 'var(--grad-sea)', color: '#fff',
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
        WebkitOverflowScrolling: 'touch' as never,
        padding: `${space[4]}px ${space[3]}px`,
        maxWidth: 520, width: '100%', margin: '0 auto',
        display: 'flex', flexDirection: 'column',
      }}>
        {/* Spacer — pushes messages to bottom when list is short, collapses when list is long */}
        <div style={{ flex: 1 }} />

        {/* Loading */}
        {loading && (
          <div style={{ padding: 40, textAlign: 'center' }}>
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
                      ? <Image src={m.avatar} alt="" fill sizes="28px" style={{ objectFit: 'cover' }} />
                      : inits
                    }
                  </div>
                )}

                {/* Bubble column — händelsehanterare här så bara bubblan triggar */}
                <div
                  style={{
                    maxWidth: m.attachment_type === 'geo' ? '88%' : '75%',
                    width: m.attachment_type === 'geo' ? '88%' : 'auto',
                    display: 'flex', flexDirection: 'column',
                    alignItems: m.mine ? 'flex-end' : 'flex-start',
                    gap: 3,
                    cursor: m.mine ? 'pointer' : 'default',
                    userSelect: 'none',
                  }}
                  onMouseDown={() => onLongPressStart(m.id, m.mine)}
                  onMouseUp={onLongPressEnd}
                  onMouseLeave={onLongPressEnd}
                  onTouchStart={() => onLongPressStart(m.id, m.mine)}
                  onTouchEnd={onLongPressEnd}
                  onClick={() => { if (m.mine && !longPressDidFire.current) setActionSheet({ msgId: m.id, isOwn: true, show: true }) }}
                  onContextMenu={e => { e.preventDefault(); setActionSheet({ msgId: m.id, isOwn: m.mine, show: true }) }}
                >
                  {/* Image */}
                  {m.attachment_type === 'image' && m.attachment_url && (
                    <a href={m.attachment_url} target="_blank" rel="noopener noreferrer" style={{ display: 'block' }}>
                      <div style={{ position: 'relative', width: 240, height: 240, borderRadius: bubbleR, overflow: 'hidden' }}>
                        <Image src={m.attachment_url} alt="" fill sizes="240px" style={{ objectFit: 'cover' }} />
                      </div>
                    </a>
                  )}

                  {/* Geo */}
                  {m.attachment_type === 'geo' && m.attachment_meta && (
                    <LocationBubble
                      meta={m.attachment_meta as GeoMeta}
                      href={m.attachment_url}
                      mine={m.mine}
                    />
                  )}

                  {/* Trip card — no IIFE, extracted component */}
                  {m.attachment_type === 'trip' && m.attachment_meta && (
                    <TripBubble meta={m.attachment_meta as TripMeta} />
                  )}

                  {/* Text bubble */}
                  {m.content && (
                    <div style={{
                      padding: '10px 15px', borderRadius: bubbleR,
                      background: m.mine
                        ? 'linear-gradient(135deg, #0a7b8c 0%, #085f6e 100%)'
                        : 'rgba(10,123,140,0.09)',
                      border: m.mine ? 'none' : '1px solid rgba(10,123,140,0.12)',
                      color: m.mine ? '#fff' : 'var(--txt)',
                      fontSize: fontSize.body, lineHeight: 1.45, wordBreak: 'break-word',
                      boxShadow: m.mine ? '0 2px 10px rgba(10,123,140,0.30)' : 'none',
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

                  {/* Read receipt — "Sett" under the last read own message */}
                  {m.mine && m.id === lastReadMsgId && (
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: 3,
                      padding: '0 4px',
                    }}>
                      <svg viewBox="0 0 22 10" width={16} height={7} fill="none">
                        <path d="M1 5.5l3 3.5L9 1" stroke="var(--sea)" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M8 5.5l3 3.5L17 1" stroke="var(--sea)" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span style={{ fontSize: 10, color: 'var(--sea)', fontWeight: 600, letterSpacing: '0.2px' }}>Sett</span>
                    </div>
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
          background: 'var(--glass-96)',
          backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
          borderTop: '1px solid rgba(10,123,140,0.10)',
          paddingBottom: 'env(safe-area-inset-bottom, 0px)',
          flexShrink: 0,
        }}>
          <div style={{
            maxWidth: 520, margin: '0 auto', height: 60,
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
              onFocus={() => {
                setTimeout(() => {
                  listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
                }, 350)
              }}
              placeholder={
                conv?.status === 'request' && conv?.created_by === me
                  ? 'Lägg till ett meddelande till förfrågan…'
                  : 'Skriv ett meddelande…'
              }
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
              background: text.trim() && !posting ? 'var(--sea)' : 'var(--surface-2, rgba(10,40,80,0.08))',
              color: text.trim() && !posting ? '#fff' : 'var(--txt3)',
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

      {/* ── Meddelandets action sheet (lång tryckning / tap på eget meddelande) ── */}
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
            <ActionSheetItem icon="✕" label="Avbryt" color="var(--txt3)"
              onClick={() => setActionSheet({ msgId: null, isOwn: false, show: false })} />
          </div>
        </>
      )}

      {/* ── Konversationsmeny (⋯ i headern) ── */}
      {convMenu && (
        <>
          <div
            onClick={() => setConvMenu(false)}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.35)', zIndex: 200 }}
          />
          <div style={{
            position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 201,
            background: 'var(--white)', borderRadius: `${radius.lg}px ${radius.lg}px 0 0`,
            padding: `8px 0 calc(20px + env(safe-area-inset-bottom))`,
            boxShadow: shadow.md,
          }}>
            <div style={{ width: 36, height: 4, borderRadius: 2, background: 'rgba(0,0,0,0.12)', margin: '4px auto 16px' }} />
            <ActionSheetItem icon="🗑️" label="Radera konversation" color="#dc2626"
              onClick={handleLeaveConversation} />
            {!conv?.is_group && otherId && (
              <ActionSheetItem icon="🚫" label={`Blockera ${otherName}`} color="#dc2626"
                onClick={handleBlockUser} />
            )}
            <ActionSheetItem icon="✕" label="Avbryt" color="var(--txt3)"
              onClick={() => setConvMenu(false)} />
          </div>
        </>
      )}

      {/* ── Bekräftelsedialog — ersätter native confirm() ── */}
      {confirmSheet && (
        <>
          <div
            onClick={() => setConfirmSheet(null)}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.40)', zIndex: 210 }}
          />
          <div style={{
            position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 211,
            background: 'var(--white)', borderRadius: `${radius.lg}px ${radius.lg}px 0 0`,
            padding: `20px 24px calc(28px + env(safe-area-inset-bottom))`,
            boxShadow: shadow.md,
          }}>
            <div style={{ width: 36, height: 4, borderRadius: 2, background: 'rgba(0,0,0,0.12)', margin: '0 auto 20px' }} />
            <div style={{ fontSize: fontSize.subtitle, fontWeight: fontWeight.semibold, color: 'var(--txt)', marginBottom: 6 }}>
              {confirmSheet.title}
            </div>
            <div style={{ fontSize: fontSize.body, color: 'var(--txt3)', lineHeight: 1.5, marginBottom: 24 }}>
              {confirmSheet.body}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <button
                onClick={async () => { const s = confirmSheet; setConfirmSheet(null); await s.onConfirm() }}
                style={{
                  padding: '14px', borderRadius: radius.md, border: 'none',
                  background: '#dc2626', color: '#fff',
                  fontSize: fontSize.body, fontWeight: fontWeight.semibold,
                  cursor: 'pointer', WebkitTapHighlightColor: 'transparent',
                }}
              >
                {confirmSheet.label}
              </button>
              <button
                onClick={() => setConfirmSheet(null)}
                style={{
                  padding: '14px', borderRadius: radius.md,
                  border: '1px solid rgba(10,123,140,0.15)',
                  background: 'transparent', color: 'var(--txt)',
                  fontSize: fontSize.body, fontWeight: fontWeight.medium,
                  cursor: 'pointer', WebkitTapHighlightColor: 'transparent',
                }}
              >
                Avbryt
              </button>
            </div>
          </div>
        </>
      )}

      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )
}

// ── Location bubble ──────────────────────────────────────────────────────────
// Inline kartförhandsvisning för delade positioner: OSM-bas + OpenSeaMap-sjömärken
// som overlay. Responsiv bredd (fyller chatkolumnen). Action-knappar under.
type GeoMeta = { lat?: number; lng?: number; accuracy?: number; location_name?: string }

function LocationBubble({ meta, href, mine }: { meta: GeoMeta; href: string | null; mine: boolean }) {
  const lat = typeof meta.lat === 'number' ? meta.lat : null
  const lng = typeof meta.lng === 'number' ? meta.lng : null
  const hasCoords = lat !== null && lng !== null

  const boxRef = useRef<HTMLDivElement>(null)
  const [W, setW] = useState(340)
  const H = 180
  const Z = 14

  useEffect(() => {
    if (!boxRef.current) return
    const ro = new ResizeObserver(entries => {
      const w = entries[0]?.contentRect.width
      if (w && w > 100) setW(Math.floor(w))
    })
    ro.observe(boxRef.current)
    return () => ro.disconnect()
  }, [])

  // Räkna ut tile-koordinater och pin:ens pixelposition inom en 3×3-komposit,
  // så pin:en alltid hamnar i viewport-mitten oavsett bredd.
  let tile0X = 0, tile0Y = 0, compLeft = 0, compTop = 0
  if (hasCoords) {
    const n = Math.pow(2, Z)
    const xf = ((lng + 180) / 360) * n
    const yf = ((1 - Math.log(Math.tan((lat * Math.PI) / 180) + 1 / Math.cos((lat * Math.PI) / 180)) / Math.PI) / 2) * n
    const xi = Math.floor(xf)
    const yi = Math.floor(yf)
    const pinInTileX = (xf - xi) * 256
    const pinInTileY = (yf - yi) * 256
    // 3×3 grid med center-tile = (xi, yi). Pin i kompositen (768×768) = (256+pinInTileX, 256+pinInTileY)
    tile0X = xi - 1
    tile0Y = yi - 1
    compLeft = W / 2 - (256 + pinInTileX)
    compTop  = H / 2 - (256 + pinInTileY)
  }

  async function copyCoords(e: React.MouseEvent) {
    e.preventDefault(); e.stopPropagation()
    if (!hasCoords) return
    try {
      await navigator.clipboard.writeText(`${lat.toFixed(5)}, ${lng.toFixed(5)}`)
      toast('Koordinater kopierade', 'success')
    } catch {
      toast('Kunde inte kopiera', 'error')
    }
  }

  // OpenSeaMap ger faktisk sjökorts-vy (grynnor, fyrar) — mer relevant för seglare än OSM
  const seamarkHref = hasCoords ? `https://map.openseamap.org/?zoom=14&mlat=${lat}&mlon=${lng}&lat=${lat}&lon=${lng}` : null
  const extHref = href

  return (
    <div style={{
      width: '100%',
      display: 'flex', flexDirection: 'column',
      gap: 6,
    }}>
      {/* Map — tappbar öppnar OSM för full navigering */}
      <a
        href={extHref ?? '#'}
        target={extHref ? '_blank' : undefined}
        rel={extHref ? 'noreferrer' : undefined}
        style={{ textDecoration: 'none', display: 'block' }}
      >
        <div ref={boxRef} style={{
          width: '100%',
          height: H,
          borderRadius: 18,
          overflow: 'hidden',
          position: 'relative',
          background: 'rgba(10,40,80,0.06)',
          border: '1px solid rgba(10,123,140,0.14)',
          boxShadow: mine ? shadow.sm : shadow.xs,
        }}>
          {hasCoords ? (
            <>
              {/* OSM base + OpenSeaMap overlay — 3×3 grid */}
              <div style={{
                position: 'absolute',
                left: compLeft, top: compTop,
                width: 768, height: 768,
              }}>
                {[0, 1, 2].map(dy =>
                  [0, 1, 2].map(dx => (
                    <div key={`${dx}_${dy}`} style={{
                      position: 'absolute',
                      left: dx * 256, top: dy * 256,
                      width: 256, height: 256,
                    }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`https://tile.openstreetmap.org/${Z}/${tile0X + dx}/${tile0Y + dy}.png`}
                        alt=""
                        loading="lazy" decoding="async"
                        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }}
                      />
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`https://tiles.openseamap.org/seamark/${Z}/${tile0X + dx}/${tile0Y + dy}.png`}
                        alt=""
                        loading="lazy" decoding="async"
                        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block', pointerEvents: 'none' }}
                      />
                    </div>
                  ))
                )}
              </div>

              {/* Pin */}
              <div style={{
                position: 'absolute', left: '50%', top: '50%',
                transform: 'translate(-50%, -100%)',
                filter: 'drop-shadow(0 3px 8px rgba(0,0,0,0.55))',
                pointerEvents: 'none',
              }}>
                <svg viewBox="0 0 24 32" width={34} height={45} fill="none">
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 8.5 12 20 12 20s12-11.5 12-20C24 5.373 18.627 0 12 0z" fill="var(--sea)" />
                  <circle cx="12" cy="12" r="5" fill="#fff" />
                </svg>
              </div>

              {/* Accuracy chip uppe till höger (om finns) */}
              {typeof meta.accuracy === 'number' && meta.accuracy > 0 && (
                <div style={{
                  position: 'absolute', top: 8, right: 8,
                  padding: '3px 8px', borderRadius: radius.full,
                  background: 'rgba(7,15,24,0.78)', color: '#fff',
                  fontSize: 10, fontWeight: fontWeight.semibold,
                  letterSpacing: 0.2,
                  backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
                }}>
                  ±{Math.round(meta.accuracy)} m
                </div>
              )}

              {/* Label bar längst ner */}
              <div style={{
                position: 'absolute', left: 0, right: 0, bottom: 0,
                padding: '18px 12px 10px',
                background: 'linear-gradient(180deg, rgba(7,15,24,0) 0%, rgba(7,15,24,0.78) 100%)',
                color: '#fff',
                display: 'flex', alignItems: 'center', gap: 7,
              }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: 14, height: 14, flexShrink: 0 }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
                <span style={{
                  fontSize: fontSize.small, fontWeight: fontWeight.semibold,
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                }}>
                  {meta.location_name ?? `${lat.toFixed(4)}°, ${lng.toFixed(4)}°`}
                </span>
              </div>
            </>
          ) : (
            <div style={{
              width: '100%', height: '100%',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              color: 'var(--txt3)',
            }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: 16, height: 16 }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                <circle cx="12" cy="9" r="2.5" />
              </svg>
              <span style={{ fontSize: fontSize.small }}>Delad position</span>
            </div>
          )}
        </div>
      </a>

      {/* Action row */}
      {hasCoords && (
        <div style={{ display: 'flex', gap: 6 }}>
          {seamarkHref && (
            <a href={seamarkHref} target="_blank" rel="noopener noreferrer" style={{
              flex: 1, textAlign: 'center',
              padding: '8px 10px', borderRadius: radius.full,
              background: 'var(--surface-2, rgba(10,123,140,0.08))',
              color: 'var(--sea)',
              fontSize: fontSize.caption, fontWeight: fontWeight.semibold,
              textDecoration: 'none',
              border: '1px solid rgba(10,123,140,0.14)',
            }}>
              Öppna sjökort
            </a>
          )}
          <button onClick={copyCoords} style={{
            flex: 1,
            padding: '8px 10px', borderRadius: radius.full,
            background: 'var(--surface-2, rgba(10,123,140,0.08))',
            color: 'var(--txt)',
            fontSize: fontSize.caption, fontWeight: fontWeight.semibold,
            border: '1px solid rgba(10,123,140,0.14)',
            cursor: 'pointer',
            WebkitTapHighlightColor: 'transparent',
          }}>
            Kopiera koordinater
          </button>
        </div>
      )}
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
          <div style={{ position: 'relative', width: '100%', height: 100 }}>
            <Image src={meta.image} alt="" fill sizes="260px" style={{ objectFit: 'cover' }} />
          </div>
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
