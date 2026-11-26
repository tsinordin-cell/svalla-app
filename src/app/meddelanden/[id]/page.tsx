'use client'

import { useEffect, useState, useRef, useCallback, useMemo } from 'react'
import { ritaOmBildUtanMetadata } from '@/lib/komprimeraBild'
import { DM_BILD_HINK, DM_BILD_LANK_SEKUNDER, arDmBildSokvag } from '@/lib/dmBilder'
import { useParams, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { markConversationRead, acceptDMRequest, declineDMRequest, deleteMessage, leaveConversation } from '@/lib/dm'
import { blockUser, arRegelstopp, BLOCKERAD_TEXT } from '@/lib/blocks'
import { toast } from '@/components/Toast'
import ReportButton from '@/components/ReportButton'
import {
  Ark, ArkRad, Avatar, BildBubbla, DagAvdelare, IKON, Ikon, MeddelandeRad, SamtalsHuvud, Sjokort, Skrivfalt,
  TextBubbla, TomtLage, TurKort, type GeoMeta, type TripMeta,
} from '@/components/meddelanden/Delar'
import { Citat, MeddelandeMeny, ReaktionsRad, SvarsRad, type Reaktion } from '@/components/meddelanden/Meny'
import { reverseGeocode } from '@/lib/reverse-geocode'
import type { Message, Conversation } from '@/lib/supabase'

type MsgWithMeta = Message & { reply_to_id?: string | null; username?: string; avatar?: string | null; optimistic?: boolean }

type MenyLage = { msgId: string; rect: { top: number; left: number; right: number; height: number } }

/** Kort text för ett meddelande i ett citat eller i svarsraden. */
function kortText(m: MsgWithMeta): string {
  if (m.content) return m.content
  if (m.attachment_type === 'image') return 'Bild'
  if (m.attachment_type === 'geo') return 'Position'
  if (m.attachment_type === 'trip') return 'Tur'
  return 'Meddelande'
}

function saknasIDatabasen(error: { code?: string; message?: string } | null): boolean {
  if (!error) return false
  return ['42P01', '42703', 'PGRST204', 'PGRST205'].includes(error.code ?? '') ||
    /does not exist|Could not find/i.test(error.message ?? '')
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
  const [otherName, setOtherName] = useState<string>('Meddelanden')
  const [otherAvatar, setOtherAvatar] = useState<string | null>(null)
  const [otherUsername, setOtherUsername] = useState<string | null>(null)
  const [messages, setMessages] = useState<MsgWithMeta[]>([])
  const [text, setText] = useState(() => {
    // Loppis-pre-fill: när användaren just kommit hit via "Kontakta säljare"
    // har vi sparat ett intro-meddelande i sessionStorage (sätts i
    // /meddelanden/ny). Plocka och rensa så det bara används en gång.
    if (typeof window === 'undefined') return ''
    try {
      const k = `dm-prefill:${params?.id as string}`
      const v = sessionStorage.getItem(k)
      if (v) {
        sessionStorage.removeItem(k)
        return v
      }
    } catch { /* ignore */ }
    return ''
  })
  const [posting, setPosting] = useState(false)
  const [loading, setLoading] = useState(true)
  const [sharingGeo, setSharingGeo] = useState(false)
  const [uploading, setUploading] = useState(false)
  // Tidsbegränsade länkar till bilder i den privata hinken, per sökväg.
  const [bildLankar, setBildLankar] = useState<Record<string, string>>({})
  const [otherId, setOtherId] = useState<string | null>(null)
  const [otherReadAt, setOtherReadAt] = useState<string | null>(null)

  // Menyn vid långt tryck (per meddelande)
  const [meny, setMeny] = useState<MenyLage | null>(null)

  // Svar och reaktioner. Stödet känns av, så att sidan fungerar både före och
  // efter att databasändringen (20261126000004) är körd.
  const [stod, setStod] = useState<{ reaktioner: boolean; svar: boolean }>({ reaktioner: false, svar: false })
  const [reaktioner, setReaktioner] = useState<Reaktion[]>([])
  const reaktionerRef = useRef<Reaktion[]>([])
  reaktionerRef.current = reaktioner
  const [svarPa, setSvarPa] = useState<string | null>(null)
  const [fokusSignal, setFokusSignal] = useState(0)
  const [markerad, setMarkerad] = useState<string | null>(null)

  // Konversationsmeny (⋯ i headern)
  const [convMenu, setConvMenu] = useState(false)

  // Anmälan av ett meddelande eller av personen i tråden
  const [anmalan, setAnmalan] = useState<{ typ: 'message' | 'conversation'; id: string } | null>(null)

  // Bekräftelsedialog — ersätter native confirm()
  const [confirmSheet, setConfirmSheet] = useState<{
    title: string; body: string; label: string; onConfirm: () => Promise<void>
    /** Vanlig åtgärd (t.ex. dela position) i stället för röd raderingsknapp. */
    vanlig?: boolean
  } | null>(null)
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const listRef = useRef<HTMLDivElement>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  const userMapRef = useRef<Record<string, { username: string; avatar: string | null }>>({})

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
            // Slå ihop egen + motpart i en enda IN-query → sparar 1 round-trip
            // (förut: users + myU = 2 sekventiella queries)
            const allUserIds = Array.from(new Set([user.id, ...otherIds]))
            const { data: allUsers } = await supabase
              .from('users')
              .select('id, username, avatar')
              .in('id', allUserIds)
            for (const u of allUsers ?? []) {
              userMapRef.current[u.id] = { username: u.username, avatar: u.avatar ?? null }
            }
            const otherUsers = (allUsers ?? []).filter(u => u.id !== user.id)

            if (!c.is_group && otherUsers[0]) {
              setOtherName(otherUsers[0].username ?? 'Seglare')
              setOtherUsername(otherUsers[0].username ?? null)
              setOtherAvatar(otherUsers[0].avatar ?? null)
              setOtherId(otherUsers[0].id)
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  // Tidsbegränsade länkar för bilder i den privata hinken. Hämtas för de
  // sökvägar som saknar länk; regeln i databasen släpper bara igenom deltagare.
  useEffect(() => {
    const saknas = [...new Set(messages
      .filter(m => m.attachment_type === 'image' && arDmBildSokvag(m.attachment_url) && !bildLankar[m.attachment_url as string])
      .map(m => m.attachment_url as string))]
    if (saknas.length === 0) return
    let avbruten = false
    supabase.storage.from(DM_BILD_HINK).createSignedUrls(saknas, DM_BILD_LANK_SEKUNDER).then(({ data }) => {
      if (avbruten || !data) return
      const nya: Record<string, string> = {}
      for (const d of data) if (d.path && d.signedUrl) nya[d.path] = d.signedUrl
      if (Object.keys(nya).length > 0) setBildLankar(prev => ({ ...prev, ...nya }))
    }).catch(() => { /* bilden visas som platshållare */ })
    return () => { avbruten = true }
  }, [messages, bildLankar, supabase])

  const loadReaktioner = useCallback(async () => {
    const { data, error } = await supabase
      .from('message_reactions')
      .select('id, message_id, user_id, emoji')
      .eq('conversation_id', id)
      .limit(2000)
    if (error) {
      if (saknasIDatabasen(error)) setStod(s => ({ ...s, reaktioner: false }))
      return
    }
    setStod(s => (s.reaktioner ? s : { ...s, reaktioner: true }))
    setReaktioner((data ?? []) as Reaktion[])
  }, [supabase, id])

  // Känn av om databasen har stöd för svar och reaktioner.
  useEffect(() => {
    if (!me) return
    let avbruten = false
    loadReaktioner()
    supabase.from('messages').select('reply_to_id').eq('conversation_id', id).limit(1).then(({ error }) => {
      if (!avbruten) setStod(s => ({ ...s, svar: !error }))
    }, () => {})
    return () => { avbruten = true }
  }, [supabase, id, me, loadReaktioner])

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
      // Reaktioner lyssnas bara på när tabellen finns, annars kan hela kanalen fallera.
      if (stod.reaktioner) {
        ch = ch
          .on('postgres_changes',
            { event: 'INSERT', schema: 'public', table: 'message_reactions', filter: `conversation_id=eq.${id}` },
            () => { loadReaktioner() },
          )
          .on('postgres_changes',
            { event: 'UPDATE', schema: 'public', table: 'message_reactions', filter: `conversation_id=eq.${id}` },
            () => { loadReaktioner() },
          )
          // Borttagningar går inte att filtrera per samtal. De innehåller bara radens id,
          // så vi läser om bara när det är en reaktion som finns i det här samtalet.
          .on('postgres_changes',
            { event: 'DELETE', schema: 'public', table: 'message_reactions' },
            (p: { old?: { id?: string } }) => {
              const gid = p.old?.id
              if (gid && reaktionerRef.current.some(r => r.id === gid)) loadReaktioner()
            },
          )
      }
      ch.subscribe()
    } catch {
      // Realtime-prenumeration misslyckades — chatt fungerar utan realtid (pull-to-refresh)
    }
    return () => { if (ch) supabase.removeChannel(ch) }
  }, [supabase, id, me, loadMessages, loadReaktioner, stod.reaktioner])

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
    const svar = stod.svar ? svarPa : null
    setSvarPa(null)

    const tempId = `opt-${Date.now()}`
    const nowIso = new Date().toISOString()
    setMessages(prev => [...prev, {
      id: tempId,
      conversation_id: id,
      user_id: me,
      content,
      attachment_type: null, attachment_url: null, attachment_meta: null,
      reply_to_id: svar,
      created_at: nowIso,
      username: userMapRef.current[me]?.username ?? 'Du',
      avatar: userMapRef.current[me]?.avatar ?? null,
      optimistic: true,
    }])

    const { data: inserted, error } = await supabase.from('messages').insert({
      conversation_id: id, user_id: me, content, ...(svar ? { reply_to_id: svar } : {}),
    }).select('id').single()
    if (error || !inserted) {
      setMessages(prev => prev.filter(m => m.id !== tempId))
      setText(content)
      setSvarPa(svar)
      setPosting(false)
      toast(felText(error), 'error')
      return
    }

    await loadMessages(me)
    setPosting(false)

    // Push-notis till övriga deltagare. Servern hämtar själv meddelandet och
    // avgör om det blir en förfrågningspush, en vanlig push eller ingen alls.
    pushToOthers({ messageId: inserted.id as string })
  }

  function felText(error: { code?: string; message?: string } | null): string {
    if (arRegelstopp(error)) return BLOCKERAD_TEXT
    if (error?.message?.includes('För många meddelanden')) return 'Du skickar väldigt många meddelanden. Vänta en minut.'
    return 'Meddelandet kunde inte skickas. Försök igen.'
  }

  async function sendAttachment(type: 'image' | 'geo', url: string, meta: Record<string, unknown>): Promise<boolean> {
    if (!me) return false
    const svar = stod.svar ? svarPa : null
    const { data: inserted, error } = await supabase.from('messages').insert({
      conversation_id: id, user_id: me,
      content: null, attachment_type: type, attachment_url: url, attachment_meta: meta,
      ...(svar ? { reply_to_id: svar } : {}),
    }).select('id').single()
    if (error || !inserted) {
      toast(felText(error), 'error')
      return false
    }
    if (svar) setSvarPa(null)
    await loadMessages(me)
    pushToOthers({ messageId: inserted.id as string })
    return true
  }

  async function pushToOthers(arg: { messageId: string } | { accept: true }) {
    if (!me) return
    // Servern hämtar själv innehållet och avgör vem som faktiskt får push
    // (blockering, status, närvaro, mute, strypning). Klienten skickar bara id.
    const kind = 'accept' in arg ? 'accept' : 'message'
    fetch('/api/push/dm', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify('accept' in arg ? { kind: 'accept', conversationId: id } : { messageId: arg.messageId }),
    }).catch(() => {})

    // In-app-notiser i notifications-tabellen — separat kanal. Vid accept har
    // inget meddelande skrivits; dm_accepted-notisen skapas i handleAcceptRequest.
    if (kind === 'accept') return
    const { data: parts } = await supabase
      .from('conversation_participants')
      .select('user_id')
      .eq('conversation_id', id)
      .neq('user_id', me)
    for (const p of parts ?? []) {
      fetch('/api/notifications/insert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetUserId: p.user_id, type: 'message', conversationId: id }),
      }).catch(() => {})
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
      pushToOthers({ accept: true })
      fetch('/api/notifications/insert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetUserId: conv.created_by, type: 'dm_accepted', conversationId: conv.id, referenceId: conv.id }),
      }).catch(() => {})
    }
  }

  async function handleDeclineRequest() {
    if (!conv) return
    const ok = await declineDMRequest(supabase, conv.id)
    if (!ok) { toast('Kunde inte avvisa förfrågan. Försök igen.', 'error'); return }
    router.push('/meddelanden')
  }

  async function handleDeleteMessage(msgId: string) {
    setMeny(null)
    setConfirmSheet({
      title: 'Radera meddelande',
      body: conv?.is_group ? 'Meddelandet tas bort för alla i gruppen.' : 'Meddelandet tas bort för er båda.',
      label: 'Radera',
      onConfirm: async () => {
        const bild = messages.find(m => m.id === msgId)
        const ok = await deleteMessage(supabase, msgId,
          bild?.attachment_type === 'image' ? bild.attachment_url : null)
        if (ok) {
          setMessages(prev => prev.filter(m => m.id !== msgId))
          setReaktioner(prev => prev.filter(r => r.message_id !== msgId))
          setSvarPa(prev => (prev === msgId ? null : prev))
        } else {
          toast('Kunde inte radera meddelandet.', 'error')
        }
      },
    })
  }

  async function handleLeaveConversation() {
    setMeny(null)
    setConvMenu(false)
    if (!me || !conv) return
    setConfirmSheet({
      title: conv.is_group ? 'Lämna gruppen' : 'Radera meddelandena',
      body: conv.is_group
        ? 'Du lämnar gruppen. Meddelandena finns kvar för de andra.'
        : 'Meddelandena försvinner för dig. När ni båda har raderat dem tas de bort helt, även bilderna.',
      label: conv.is_group ? 'Lämna' : 'Radera',
      onConfirm: async () => {
        const ok = await leaveConversation(conv.id)
        if (ok) {
          router.push('/meddelanden')
        } else {
          toast(conv.is_group ? 'Kunde inte lämna gruppen.' : 'Kunde inte radera meddelandena.', 'error')
        }
      },
    })
  }

  async function handleBlockUser() {
    setMeny(null)
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

  function oppnaMeny(msgId: string, el: Element | null | undefined) {
    if (!el) return
    const r = el.getBoundingClientRect()
    // Tangentbordet på telefonen stängs, så att menyn får plats.
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur()
    try { navigator.vibrate?.(8) } catch { /* stöds inte på iPhone */ }
    setMeny({ msgId, rect: { top: r.top, left: r.left, right: r.right, height: r.height } })
  }

  function onLongPressStart(msgId: string, el: HTMLElement) {
    if (longPressTimer.current) clearTimeout(longPressTimer.current)
    longPressTimer.current = setTimeout(() => {
      longPressTimer.current = null
      oppnaMeny(msgId, el)
    }, 420)
  }

  function svara(msgId: string) {
    setMeny(null)
    setSvarPa(msgId)
    setFokusSignal(n => n + 1)
  }

  function hoppaTill(msgId: string) {
    const el = document.getElementById(`m-${msgId}`)
    if (!el) return
    el.scrollIntoView({ block: 'center', behavior: 'smooth' })
    setMarkerad(msgId)
    setTimeout(() => setMarkerad(prev => (prev === msgId ? null : prev)), 1600)
  }

  async function kopieraText(text: string) {
    try {
      await navigator.clipboard.writeText(text)
      toast('Kopierat', 'success')
    } catch {
      toast('Kunde inte kopiera', 'error')
    }
  }

  function reaktionsFel(error: { code?: string; message?: string } | null): string {
    if (arRegelstopp(error)) return BLOCKERAD_TEXT
    if (error?.message?.includes('För många reaktioner')) return 'Du reagerar väldigt ofta. Vänta en minut.'
    return 'Reaktionen kunde inte sparas. Försök igen.'
  }

  // Samma emoji igen tar bort reaktionen. En annan emoji ersätter den.
  async function reagera(msgId: string, emoji: string) {
    if (!me || !stod.reaktioner) return
    const forra = reaktionerRef.current
    const finns = forra.find(r => r.message_id === msgId && r.user_id === me)
    if (finns && finns.emoji === emoji) {
      setReaktioner(prev => prev.filter(r => r.id !== finns.id))
      const { error } = await supabase.from('message_reactions').delete().eq('id', finns.id)
      if (error) { setReaktioner(forra); toast('Reaktionen kunde inte tas bort. Försök igen.', 'error') }
      return
    }
    const tillfallig: Reaktion = { id: finns?.id ?? `opt-${Date.now()}`, message_id: msgId, user_id: me, emoji }
    setReaktioner(prev => [...prev.filter(r => !(r.message_id === msgId && r.user_id === me)), tillfallig])
    const { data, error } = await supabase
      .from('message_reactions')
      .upsert({ message_id: msgId, user_id: me, emoji }, { onConflict: 'message_id,user_id' })
      .select('id, message_id, user_id, emoji')
      .single()
    if (error || !data) {
      setReaktioner(forra)
      toast(reaktionsFel(error), 'error')
      return
    }
    setReaktioner(prev => [...prev.filter(r => !(r.message_id === msgId && r.user_id === me)), data as Reaktion])
  }

  function onLongPressEnd() {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current)
      longPressTimer.current = null
    }
  }

  async function onPickImage(e: React.ChangeEvent<HTMLInputElement>) {
    const rawFile = e.target.files?.[0]
    e.target.value = ''
    if (!rawFile || !me || uploading) return
    setUploading(true)
    try {
      // Rita om bilden: tar bort platsdata (GPS) och annan metadata ur filen.
      // Går det inte skickas ingenting, hellre än originalet med platsdata.
      let file: File
      try {
        file = await ritaOmBildUtanMetadata(rawFile)
      } catch {
        toast('Bilden kunde inte förberedas. Prova en annan bild (JPEG eller PNG).', 'error')
        return
      }
      // Privat hink: konversation/avsändare/slumpnamn. Bara deltagarna kan läsa.
      const path = `${id}/${me}/${crypto.randomUUID()}.jpg`
      const { error } = await supabase.storage.from(DM_BILD_HINK).upload(path, file, {
        upsert: false, contentType: 'image/jpeg',
      })
      if (error) {
        toast('Bilden kunde inte laddas upp. Försök igen.', 'error')
        return
      }
      // Databasen sparar sökvägen, aldrig en publik länk.
      const ok = await sendAttachment('image', path, { size: file.size })
      if (!ok) await supabase.storage.from(DM_BILD_HINK).remove([path])
    } finally {
      setUploading(false)
    }
  }

  // Positionen är exakt och sparas i samtalet, så den skickas först efter ett ja.
  function confirmShareGeo() {
    if (!navigator.geolocation || sharingGeo) return
    setConfirmSheet({
      title: 'Dela din position?',
      body: 'Alla som är med här ser din exakta position på en karta. Den finns kvar tills du raderar meddelandet.',
      label: 'Dela position',
      vanlig: true,
      onConfirm: async () => { shareGeo() },
    })
  }

  async function shareGeo() {
    if (sharingGeo) return
    if (!navigator.geolocation) {
      toast('Den här webbläsaren kan inte dela position.', 'error')
      return
    }
    setSharingGeo(true)
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords
          // Reverse-geocoda i bakgrunden så bubblan visar "Sandhamn" istället för
          // "59.2891°, 18.9134°". Degraderar tyst — bubblan fungerar utan namn.
          const location_name = await reverseGeocode(latitude, longitude)
          await sendAttachment('geo',
            `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=15/${latitude}/${longitude}`,
            { lat: latitude, lng: longitude, accuracy: pos.coords.accuracy, location_name },
          )
        } finally {
          setSharingGeo(false)
        }
      },
      (err) => {
        setSharingGeo(false)
        // Förut hände ingenting alls när platsen inte gick att hämta. Nu får man veta varför.
        toast(
          err.code === err.PERMISSION_DENIED
            ? 'Svalla får inte se din position. Tillåt platsåtkomst för svalla.se i webbläsarens inställningar och försök igen.'
            : 'Kunde inte hämta din position. Försök igen om en stund.',
          'error',
        )
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 },
    )
  }

  // Grupper, dagavdelare och var tiden ska stå
  const enriched = messages.map((m, i) => {
    const prev = messages[i - 1]
    const next = messages[i + 1]
    const mine = m.user_id === me
    const sameAsPrev = !!prev && prev.user_id === m.user_id &&
      (new Date(m.created_at).getTime() - new Date(prev.created_at).getTime() < 5 * 60_000)
    const sameAsNext = !!next && next.user_id === m.user_id &&
      (new Date(next.created_at).getTime() - new Date(m.created_at).getTime() < 5 * 60_000)
    const needsDaySep = !prev || !sameDay(prev.created_at, m.created_at)
    return { ...m, mine, nyGrupp: !sameAsPrev || needsDaySep, needsDaySep, isLastInGroup: !sameAsNext }
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

  const stangAtgard = useCallback(() => setMeny(null), [])
  const stangMeny = useCallback(() => setConvMenu(false), [])
  const stangBekraftelse = useCallback(() => setConfirmSheet(null), [])
  const arMottagareAvForfragan = conv?.status === 'request' && !!me && conv.created_by !== me
  const arAvsandareAvForfragan = conv?.status === 'request' && !!me && conv.created_by === me

  async function kopiera(text: string) {
    try {
      await navigator.clipboard.writeText(text)
      toast('Koordinaterna är kopierade', 'success')
    } catch {
      toast('Kunde inte kopiera', 'error')
    }
  }

  const reaktionerPer = useMemo(() => {
    const per = new Map<string, Reaktion[]>()
    for (const r of reaktioner) {
      const l = per.get(r.message_id)
      if (l) l.push(r); else per.set(r.message_id, [r])
    }
    return per
  }, [reaktioner])
  const msgById = useMemo(() => new Map(messages.map(m => [m.id, m])), [messages])
  // Den som fått en förfrågan svarar och reagerar först när den är accepterad.
  const kanInteragera = !arMottagareAvForfragan && conv?.status !== 'declined'
  const menyMsg = meny ? msgById.get(meny.msgId) ?? null : null
  const svarMedd = svarPa ? msgById.get(svarPa) ?? null : null

  function vemNamn(m: MsgWithMeta): string {
    return m.user_id === me ? 'Du' : (m.username ?? 'Seglare')
  }

  function bildSrc(url: string): string | undefined {
    // Privat hink: tidsbegränsad länk. Gamla bilder (publika länkar) visas bara från Svallas egen lagring.
    if (arDmBildSokvag(url)) return bildLankar[url]
    return url.startsWith(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/`) ? url : undefined
  }

  /** Innehållet i en bubbla. Används både i flödet och i den upplyfta menyn. */
  function bubblor(m: MsgWithMeta, iMeny = false) {
    const orig = m.reply_to_id ? msgById.get(m.reply_to_id) : undefined
    return (
      <>
        {m.reply_to_id && (orig
          ? <Citat vem={vemNamn(orig)} text={kortText(orig)} onTryck={iMeny ? undefined : () => hoppaTill(orig.id)} />
          : <Citat vem="Svar" text="Ett tidigare meddelande" />)}
        {m.attachment_type === 'image' && m.attachment_url && (() => {
          const url = m.attachment_url as string
          return (
            <BildBubbla src={bildSrc(url)}
              // Länken gäller en timme. Går den ut hämtas en ny.
              onFel={() => { if (arDmBildSokvag(url)) setBildLankar(prev => { const n = { ...prev }; delete n[url]; return n }) }} />
          )
        })()}
        {m.attachment_type === 'geo' && m.attachment_meta && (
          <Sjokort meta={m.attachment_meta as GeoMeta} href={m.attachment_url} onKopiera={kopiera} />
        )}
        {m.attachment_type === 'trip' && m.attachment_meta && (
          <TurKort meta={m.attachment_meta as TripMeta} />
        )}
        {m.content && <TextBubbla text={m.content} />}
      </>
    )
  }

  return (
    <div className="md-samtal md-rot">
      <SamtalsHuvud
        namn={loading && otherName === 'Meddelanden' ? '' : otherName}
        nyckel={otherUsername ?? otherName ?? id}
        bild={otherAvatar}
        profilHref={otherUsername ? `/u/${encodeURIComponent(otherUsername)}` : null}
        under={conv?.is_group ? 'Grupp' : otherUsername ? 'Visa profil' : undefined}
        onMer={() => setConvMenu(true)}
      />

      {/* Förfrågan, mottagarens sida */}
      {!loading && arMottagareAvForfragan && (
        <div className="md-banner">
          <div className="md-banner-ruta">
            <strong>{otherName} vill skriva till dig</strong>
            <p>Acceptera för att svara. Avvisar du försvinner meddelandena.</p>
            <div className="md-banner-knappar">
              <button type="button" className="md-knapp" onClick={handleAcceptRequest}>Acceptera</button>
              <button type="button" className="md-knapp md-knapp--vit" onClick={handleDeclineRequest}>Avvisa</button>
            </div>
          </div>
        </div>
      )}

      {/* Förfrågan, avsändarens sida */}
      {!loading && arAvsandareAvForfragan && (
        <div className="md-banner md-banner--info">
          <div className="md-banner-ruta">Förfrågan skickad. {otherName} måste acceptera innan ni kan skriva till varandra.</div>
        </div>
      )}

      <div ref={listRef} className="md-flode">
        <div className="md-flode-inre">
          {loading && <div className="md-snurra" aria-label="Laddar meddelandena" />}

          {!loading && messages.length === 0 && (
            <TomtLage ikon={IKON.pratbubbla} rubrik="Skriv det första meddelandet" text="Skriv något, skicka en bild eller dela var du ligger." />
          )}

          {!loading && enriched.map(m => (
            <div key={m.id}>
              {m.needsDaySep && <DagAvdelare iso={m.created_at} />}
              <MeddelandeRad
                radId={`m-${m.id}`}
                mine={m.mine}
                nyGrupp={m.nyGrupp}
                sist={m.isLastInGroup}
                skickar={m.optimistic}
                markerad={markerad === m.id}
                tid={m.created_at}
                sett={m.mine && m.id === lastReadMsgId}
                avatar={<Avatar namn={m.username ?? 'Seglare'} nyckel={m.username ?? m.user_id} bild={m.avatar} s={28} />}
                handlers={m.optimistic ? undefined : {
                  onTouchStart: e => onLongPressStart(m.id, e.currentTarget),
                  onTouchEnd: onLongPressEnd,
                  onTouchMove: onLongPressEnd,
                  onTouchCancel: onLongPressEnd,
                  onContextMenu: e => { e.preventDefault(); onLongPressEnd(); oppnaMeny(m.id, e.currentTarget) },
                }}
                under={stod.reaktioner && (
                  <ReaktionsRad lista={reaktionerPer.get(m.id) ?? []} me={me} mine={m.mine}
                    onTryck={e => { if (kanInteragera) reagera(m.id, e) }} />
                )}
                atgarder={m.optimistic ? undefined : (
                  <>
                    {stod.svar && kanInteragera && (
                      <button type="button" className="md-hover-knapp" aria-label="Svara" title="Svara" onClick={() => svara(m.id)}>
                        <Ikon d={IKON.svar} s={17} w={1.9} />
                      </button>
                    )}
                    <button type="button" className="md-hover-knapp" aria-label={stod.reaktioner && kanInteragera ? 'Reagera och fler val' : 'Fler val'}
                      title={stod.reaktioner && kanInteragera ? 'Reagera' : 'Fler val'}
                      onClick={e => oppnaMeny(m.id, e.currentTarget.closest('.md-rad')?.querySelector('.md-kol'))}>
                      <Ikon d={stod.reaktioner && kanInteragera ? IKON.smil : IKON.mer} s={17} w={1.9} />
                    </button>
                  </>
                )}
              >
                {bubblor(m)}
              </MeddelandeRad>
            </div>
          ))}
        </div>
      </div>

      {/* Skrivfältet. Dolt för den som fått en förfrågan, tills den är accepterad. */}
      {!arMottagareAvForfragan && (
        <>
          <input ref={fileRef} type="file" accept="image/*" onChange={onPickImage} style={{ display: 'none' }} />
          <Skrivfalt
            text={text}
            setText={setText}
            onSkicka={() => send()}
            kanSkicka={!!text.trim() && !posting}
            placeholder={arAvsandareAvForfragan ? 'Lägg till ett meddelande till förfrågan…' : 'Skriv ett meddelande…'}
            onBild={() => fileRef.current?.click()}
            onPosition={confirmShareGeo}
            laddarBild={uploading}
            delarPosition={sharingGeo}
            fokusSignal={fokusSignal}
            ovanfor={svarMedd ? (
              <SvarsRad vem={svarMedd.user_id === me ? 'dig själv' : (svarMedd.username ?? 'Seglare')}
                text={kortText(svarMedd)} onAvbryt={() => setSvarPa(null)} />
            ) : null}
            onFokus={() => {
              setTimeout(() => {
                listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
              }, 350)
            }}
          />
        </>
      )}

      {/* Menyn vid långt tryck: meddelandet lyfts fram med reaktioner och val */}
      {meny && menyMsg && (
        <MeddelandeMeny
          key={menyMsg.id}
          rect={meny.rect}
          mine={menyMsg.user_id === me}
          innehall={bubblor(menyMsg, true)}
          reaktioner={stod.reaktioner && kanInteragera}
          minReaktion={reaktioner.find(r => r.message_id === menyMsg.id && r.user_id === me)?.emoji ?? null}
          onReagera={e => { stangAtgard(); reagera(menyMsg.id, e) }}
          onSvara={stod.svar && kanInteragera ? () => svara(menyMsg.id) : undefined}
          onKopiera={menyMsg.content ? () => { stangAtgard(); kopieraText(menyMsg.content as string) } : undefined}
          onRadera={menyMsg.user_id === me ? () => handleDeleteMessage(menyMsg.id) : undefined}
          onAnmal={menyMsg.user_id !== me ? () => { stangAtgard(); setAnmalan({ typ: 'message', id: menyMsg.id }) } : undefined}
          onStang={stangAtgard}
        />
      )}

      {/* Samtalets meny (⋯ uppe till höger) */}
      {convMenu && (
        <Ark onStang={stangMeny} etikett="Fler val">
          <ArkRad ikon={conv?.is_group ? IKON.lamna : IKON.soptunna} label={conv?.is_group ? 'Lämna gruppen' : 'Radera meddelandena'} fara onClick={handleLeaveConversation} />
          {!conv?.is_group && otherId && conv && (
            <ArkRad ikon={IKON.flagga} label={`Anmäl ${otherName}`} fara onClick={() => { setConvMenu(false); setAnmalan({ typ: 'conversation', id: conv.id }) }} />
          )}
          {!conv?.is_group && otherId && (
            <ArkRad ikon={IKON.blockera} label={`Blockera ${otherName}`} fara onClick={handleBlockUser} />
          )}
          <ArkRad ikon={IKON.stang} label="Avbryt" onClick={stangMeny} />
        </Ark>
      )}

      {/* Anmälan (meddelande eller person) */}
      {anmalan && (
        <ReportButton
          targetType={anmalan.typ}
          targetId={anmalan.id}
          open
          onOpenChange={o => { if (!o) setAnmalan(null) }}
          rubrik={anmalan.typ === 'message' ? 'Anmäl meddelande' : `Anmäl ${otherName}`}
          forklaring={anmalan.typ === 'message'
            ? 'Meddelandet och högst 10 meddelanden före det skickas till Svallas moderatorer. Den du anmäler ser inte vem som anmält.'
            : 'De 10 senaste meddelandena i tråden skickas till Svallas moderatorer som underlag. Den du anmäler ser inte vem som anmält.'}
          efterAnmalan={!conv?.is_group && otherId
            ? { label: `Blockera ${otherName}`, onClick: handleBlockUser }
            : undefined}
        />
      )}

      {/* Bekräftelse, i stället för webbläsarens confirm() */}
      {confirmSheet && (
        <Ark onStang={stangBekraftelse} etikett={confirmSheet.title}>
          <div className="md-ark-text">
            <h2>{confirmSheet.title}</h2>
            <p>{confirmSheet.body}</p>
          </div>
          <div className="md-ark-knappar">
            <button type="button" className={`md-ark-ja${confirmSheet.vanlig ? ' md-ark-ja--vanlig' : ''}`}
              onClick={async () => { const s = confirmSheet; setConfirmSheet(null); await s.onConfirm() }}>
              {confirmSheet.label}
            </button>
            <button type="button" className="md-ark-nej" onClick={stangBekraftelse}>Avbryt</button>
          </div>
        </Ark>
      )}
    </div>
  )
}
