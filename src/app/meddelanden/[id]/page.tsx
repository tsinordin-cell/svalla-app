'use client'
export const dynamic = 'force-dynamic'

import { useEffect, useState, useRef, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import { markConversationRead } from '@/lib/dm'
import { timeAgoShort, absoluteDate, avatarGradient, initialsOf } from '@/lib/utils'
import type { Message, Conversation } from '@/lib/supabase'

type MsgWithMeta = Message & { username?: string; avatar?: string | null; optimistic?: boolean }

export default function ChatPage() {
  const { id } = useParams<{ id: string }>()
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

    // Push-notis till övriga deltagare
    pushToOthers(content.slice(0, 60))
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

  async function pushToOthers(preview: string) {
    if (!me) return
    const { data: parts } = await supabase
      .from('conversation_participants')
      .select('user_id')
      .eq('conversation_id', id)
      .neq('user_id', me)
    const myName = userMapRef.current[me]?.username ?? 'Svalla'
    for (const p of parts ?? []) {
      fetch('/api/push/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetUserId: p.user_id,
          title: `💬 ${myName}`,
          body: preview,
          url: `/meddelanden/${id}`,
        }),
      }).catch(() => {})
      supabase.from('notifications').insert({
        user_id: p.user_id, actor_id: me, type: 'message',
      }).then(() => {})
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

  return (
    <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>
      {/* Header */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'var(--header-bg, var(--glass-96))',
        backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(10,123,140,0.10)',
        padding: '10px 14px',
      }}>
        <div style={{ maxWidth: 520, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 10 }}>
          <Link href="/meddelanden" aria-label="Tillbaka" style={{
            width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
            background: 'rgba(10,123,140,0.07)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#1e5c82" strokeWidth={2.5} style={{ width: 17, height: 17 }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <Link href={otherUsername ? `/u/${otherUsername}` : '#'} style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1, minWidth: 0, textDecoration: 'none' }}>
            <div style={{
              width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
              background: displayGrad, color: '#fff', fontWeight: 800, fontSize: 12,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              overflow: 'hidden', position: 'relative',
            }}>
              {otherAvatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={otherAvatar} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : displayInitials}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--txt)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {otherName}
              </div>
              {conv?.is_group && (
                <div style={{ fontSize: 11, color: 'var(--txt3)' }}>Grupp</div>
              )}
            </div>
          </Link>
        </div>
      </header>

      {/* Messages */}
      <div ref={listRef} style={{
        flex: 1, overflowY: 'auto',
        padding: '16px 12px',
        maxWidth: 520, width: '100%', margin: '0 auto',
        display: 'flex', flexDirection: 'column', gap: 6,
      }}>
        {loading && (
          <div style={{ padding: 40, textAlign: 'center' }}>
            <div style={{ width: 22, height: 22, borderRadius: '50%', border: '2.5px solid #1e5c82', borderTopColor: 'transparent', animation: 'spin .7s linear infinite', display: 'inline-block' }} />
          </div>
        )}

        {!loading && messages.length === 0 && (
          <div style={{ margin: 'auto', textAlign: 'center', color: 'var(--txt3)' }}>
            <div style={{ fontSize: 48, marginBottom: 10 }}>👋</div>
            <p style={{ fontSize: 14 }}>Skriv första meddelandet</p>
          </div>
        )}

        {!loading && messages.map((m, i) => {
          const mine = m.user_id === me
          const prev = messages[i - 1]
          const sameSender = prev && prev.user_id === m.user_id && (new Date(m.created_at).getTime() - new Date(prev.created_at).getTime() < 5 * 60_000)
          const grad = avatarGradient(m.username ?? m.user_id)
          const inits = initialsOf(m.username)

          return (
            <div key={m.id} style={{
              display: 'flex', gap: 8, alignItems: 'flex-end',
              flexDirection: mine ? 'row-reverse' : 'row',
              marginTop: sameSender ? 2 : 10,
              opacity: m.optimistic ? 0.6 : 1,
            }}>
              {!mine && (
                <div style={{
                  width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                  visibility: sameSender ? 'hidden' : 'visible',
                  background: grad, color: '#fff', fontWeight: 800, fontSize: 11,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  overflow: 'hidden', position: 'relative',
                }}>
                  {m.avatar ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={m.avatar} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : inits}
                </div>
              )}
              <div style={{ maxWidth: '75%', display: 'flex', flexDirection: 'column', alignItems: mine ? 'flex-end' : 'flex-start' }}>
                {m.attachment_type === 'image' && m.attachment_url && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <a href={m.attachment_url} target="_blank" rel="noreferrer">
                    <img src={m.attachment_url} alt="" style={{ maxWidth: 240, maxHeight: 240, borderRadius: 14, display: 'block' }} />
                  </a>
                )}
                {m.attachment_type === 'geo' && m.attachment_meta && (
                  <a href={m.attachment_url ?? '#'} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
                    <div style={{
                      padding: '10px 14px', borderRadius: 18,
                      background: mine ? 'linear-gradient(135deg,#1e5c82,#2d7d8a)' : 'rgba(10,40,80,0.06)',
                      color: mine ? '#fff' : 'var(--txt)', fontSize: 13, fontWeight: 700,
                      display: 'flex', alignItems: 'center', gap: 8,
                    }}>
                      <span>📍</span>
                      <span>Delad position</span>
                    </div>
                  </a>
                )}
                {m.content && (
                  <div style={{
                    padding: '8px 14px', borderRadius: 18,
                    background: mine ? 'linear-gradient(135deg,#1e5c82,#2d7d8a)' : 'rgba(10,40,80,0.06)',
                    color: mine ? '#fff' : 'var(--txt)',
                    fontSize: 14, lineHeight: 1.4, wordBreak: 'break-word',
                    boxShadow: mine ? '0 2px 8px rgba(30,92,130,0.22)' : 'none',
                  }}>
                    {m.content}
                  </div>
                )}
                <span title={absoluteDate(m.created_at)} style={{ fontSize: 10, color: 'var(--txt3)', marginTop: 3, padding: '0 4px', cursor: 'help' }}>
                  {m.optimistic ? 'skickar…' : timeAgoShort(m.created_at)}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Input */}
      <form onSubmit={send} style={{
        padding: '10px 12px 14px',
        background: 'var(--white)',
        borderTop: '1px solid rgba(10,123,140,0.10)',
        paddingBottom: 'calc(14px + env(safe-area-inset-bottom))',
      }}>
        <div style={{ maxWidth: 520, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 8 }}>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={onPickImage}
            style={{ display: 'none' }}
          />
          <button type="button" onClick={() => fileRef.current?.click()} aria-label="Bifoga bild" style={{
            width: 40, height: 40, borderRadius: '50%', border: 'none',
            background: 'rgba(10,123,140,0.07)', color: '#1e5c82',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            cursor: 'pointer', WebkitTapHighlightColor: 'transparent',
          }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: 18, height: 18 }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4-4a3 3 0 014 0l4 4m-4-4l2-2a3 3 0 014 0l2 2M4 20h16a2 2 0 002-2V6a2 2 0 00-2-2H4a2 2 0 00-2 2v12a2 2 0 002 2z" />
              <circle cx="9" cy="10" r="1.5" fill="currentColor" />
            </svg>
          </button>
          <button type="button" onClick={shareGeo} disabled={sharingGeo} aria-label="Dela position" style={{
            width: 40, height: 40, borderRadius: '50%', border: 'none',
            background: 'rgba(201,110,42,0.10)', color: '#c96e2a',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            cursor: sharingGeo ? 'default' : 'pointer', opacity: sharingGeo ? 0.5 : 1,
            WebkitTapHighlightColor: 'transparent',
          }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: 18, height: 18 }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
              <circle cx="12" cy="9" r="2.5" />
            </svg>
          </button>
          <input
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Skriv ett meddelande…"
            maxLength={2000}
            style={{
              flex: 1, border: '1.5px solid rgba(10,123,140,0.15)',
              borderRadius: 24, padding: '10px 16px',
              fontSize: 14, outline: 'none', background: 'rgba(10,123,140,0.03)', color: 'var(--txt)',
            }}
          />
          <button type="submit" disabled={!text.trim() || posting} aria-label="Skicka" style={{
            width: 40, height: 40, borderRadius: '50%', border: 'none',
            flexShrink: 0,
            background: text.trim() && !posting
              ? 'linear-gradient(135deg,#1e5c82,#2d7d8a)'
              : 'rgba(10,40,80,0.08)',
            color: text.trim() && !posting ? '#fff' : 'rgba(10,40,80,0.30)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: text.trim() && !posting ? 'pointer' : 'default',
            boxShadow: text.trim() && !posting ? '0 2px 10px rgba(30,92,130,0.3)' : 'none',
            WebkitTapHighlightColor: 'transparent',
          }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} style={{ width: 16, height: 16 }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </form>

      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )
}
