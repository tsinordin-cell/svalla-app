'use client'

/**
 * Inkorgen i Meddelanden. Ligger i layouten för /meddelanden, så att den på
 * dator (från 1024 px) står kvar bredvid samtalet när man byter samtal.
 * På telefon visas den bara på /meddelanden, som förut.
 *
 * Datahämtningen är densamma som i den tidigare sidan (src/app/meddelanden/page.tsx
 * före 2026-11-26). Nytt: motpartens last_read_at hämtas i samma fråga som
 * deltagarna, så att raden kan visa om ditt senaste meddelande är läst.
 */

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import NotificationBell from '@/components/NotificationBell'
import { createClient, getViewer } from '@/lib/supabase'
import { IKON, Ikon, KonvRad, SkelettRad, TomtLage, type KonvRadData } from './Delar'

type ConvRow = {
  id: string
  is_group: boolean
  title: string | null
  status: 'active' | 'request' | 'declined'
  created_by: string | null
  last_message_at: string
  last_message_preview: string | null
  last_message_user_id: string | null
  other_username?: string
  other_avatar?: string | null
  other_id?: string
  other_read_at?: string | null
  unread?: number
}

type Flik = 'active' | 'requests'

export function tillRad(c: ConvRow, me: string): KonvRadData {
  const namn = c.is_group ? (c.title ?? 'Gruppchatt') : (c.other_username ?? 'Seglare')
  const duSkrev = c.last_message_user_id === me
  let last: boolean | null = null
  if (duSkrev && !c.is_group) {
    last = !!c.other_read_at && !!c.last_message_at &&
      new Date(c.other_read_at).getTime() >= new Date(c.last_message_at).getTime()
  }
  return {
    id: c.id,
    namn,
    nyckel: c.is_group ? (c.title ?? c.id) : (c.other_username ?? c.other_id ?? c.id),
    bild: c.other_avatar ?? null,
    tid: c.last_message_at,
    text: c.last_message_preview,
    duSkrev,
    last,
    olasta: c.unread ?? 0,
    forfragan: c.status === 'request' && c.created_by !== me,
    vantar: c.status === 'request' && c.created_by === me,
  }
}

/** Ren vy, används av inkorgen och av förhandsvisningen. */
export function InkorgVy({ lage, rader, aktivaAntal, forfragningarAntal, flik, setFlik, sok, setSok, valtId, onForsokIgen, hrefFor = id => `/meddelanden/${id}` }: {
  lage: 'laddar' | 'utloggad' | 'fel' | 'klar'
  rader: KonvRadData[]
  aktivaAntal: number
  forfragningarAntal: number
  flik: Flik
  setFlik: (f: Flik) => void
  sok: string
  setSok: (s: string) => void
  valtId: string | null
  onForsokIgen: () => void
  hrefFor?: (id: string) => string
}) {
  const ingaAlls = lage === 'klar' && aktivaAntal + forfragningarAntal === 0
  return (
    <div className="md-inkorg">
      <div className="md-ink-topp">
        <div className="md-ink-rad">
          <h1>Meddelanden</h1>
          {/* Notiserna nås härifrån på telefon. Döljs från 1024 px, där sidomenyn har Notiser. */}
          <div className="app-topbar-atgarder" style={{ display: 'flex' }}><NotificationBell /></div>
          {lage !== 'utloggad' && (
            <Link href="/meddelanden/ny" className="md-rund" aria-label="Nytt meddelande">
              <Ikon d={IKON.penna} s={22} w={1.9} />
            </Link>
          )}
        </div>
        {lage !== 'utloggad' && !ingaAlls && (
          <>
            <label className="md-sok">
              <Ikon d={IKON.sok} s={18} w={1.9} />
              <input type="search" value={sok} onChange={e => setSok(e.target.value)} placeholder="Sök på namn" aria-label="Sök bland meddelanden" />
            </label>
            {lage === 'klar' && (
              <div className="md-flikar" role="group" aria-label="Visa">
                <button type="button" className="md-flik" aria-pressed={flik === 'active'} onClick={() => setFlik('active')}>
                  Meddelanden{aktivaAntal > 0 && <span className="md-flik-tal">{aktivaAntal}</span>}
                </button>
                <button type="button" className="md-flik" aria-pressed={flik === 'requests'} onClick={() => setFlik('requests')}>
                  Förfrågningar{forfragningarAntal > 0 && <span className="md-flik-tal md-flik-tal--acc">{forfragningarAntal > 9 ? '9+' : forfragningarAntal}</span>}
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <div className="md-rader">
        {lage === 'laddar' && [0, 1, 2, 3, 4].map(i => <SkelettRad key={i} />)}

        {lage === 'utloggad' && (
          <TomtLage ikon={IKON.pratbubbla} rubrik="Logga in för att skriva meddelanden" text="Skriv med andra seglare och dela var du ligger.">
            <Link href="/logga-in?returnTo=%2Fmeddelanden" className="md-knapp">Logga in</Link>
          </TomtLage>
        )}

        {lage === 'fel' && (
          <TomtLage ikon={IKON.pratbubbla} rubrik="Meddelandena gick inte att hämta" text="Kontrollera anslutningen och försök igen.">
            <button type="button" className="md-knapp" onClick={onForsokIgen}>Försök igen</button>
          </TomtLage>
        )}

        {ingaAlls && (
          <TomtLage ikon={IKON.pratbubbla} rubrik="Inga meddelanden än" text="Skriv till en seglare du följer.">
            <Link href="/meddelanden/ny" className="md-knapp">Nytt meddelande</Link>
          </TomtLage>
        )}

        {lage === 'klar' && !ingaAlls && rader.length === 0 && (
          <p style={{ padding: '40px 24px', textAlign: 'center', fontSize: 15, color: 'var(--txt3)', margin: 0 }}>
            {sok ? `Inga träffar för "${sok}"` : flik === 'requests' ? 'Inga förfrågningar just nu.' : 'Inga meddelanden än.'}
          </p>
        )}

        {lage === 'klar' && rader.map(r => (
          <KonvRad key={r.id} r={r} vald={r.id === valtId} href={hrefFor(r.id)} />
        ))}
      </div>
    </div>
  )
}

export default function Inkorg() {
  const supabase = useRef(createClient()).current
  const pathname = usePathname()
  const valtId = pathname?.match(/^\/meddelanden\/([^/]+)/)?.[1] ?? null
  const [me, setMe] = useState<string | null>(null)
  const [convs, setConvs] = useState<ConvRow[]>([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState<Flik>('active')
  const [query, setQuery] = useState('')
  const [error, setError] = useState(false)
  const meRef = useRef<string | null>(null)
  const forstaLaddning = useRef(true)

  useEffect(() => {
    getViewer(supabase).then(({ data: { user } }) => {
      if (!user) { setLoading(false); return }
      meRef.current = user.id
      setMe(user.id)
      load(user.id)
    })

    let ch: ReturnType<typeof supabase.channel> | null = null
    try {
      ch = supabase
        .channel('inbox-feed')
        .on('postgres_changes',
          { event: 'INSERT', schema: 'public', table: 'messages' },
          () => { if (meRef.current) load(meRef.current, true) }
        )
        .on('postgres_changes',
          { event: 'UPDATE', schema: 'public', table: 'conversations' },
          (payload) => {
            try {
              const upd = payload.new as Partial<ConvRow>
              setConvs(prev => {
                const updated = prev.map(c =>
                  c.id === upd.id
                    ? {
                        ...c,
                        // Fälten kan bli tomma när det sista meddelandet raderas,
                        // så ett null från databasen ska gälla, inte ignoreras.
                        last_message_preview: 'last_message_preview' in upd ? (upd.last_message_preview ?? null) : c.last_message_preview,
                        last_message_at: upd.last_message_at ?? c.last_message_at,
                        last_message_user_id: 'last_message_user_id' in upd ? (upd.last_message_user_id ?? null) : c.last_message_user_id,
                        status: (upd.status as ConvRow['status']) ?? c.status,
                      }
                    : c
                )
                return [...updated].sort((a, b) => {
                  const ta = a.last_message_at ? new Date(a.last_message_at).getTime() : 0
                  const tb = b.last_message_at ? new Date(b.last_message_at).getTime() : 0
                  return tb - ta
                })
              })
            } catch { /* tyst — låt inte realtime-event krascha sidan */ }
          }
        )
        .subscribe()
    } catch { /* realtime-subscription misslyckades — inbox fungerar ändå statiskt */ }

    return () => { if (ch) supabase.removeChannel(ch) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supabase])

  // Inkorgen ligger kvar när man byter sida inom /meddelanden. Hämta om när man
  // kommer tillbaka eller byter samtal, så att olästa och "Läst" stämmer.
  useEffect(() => {
    if (forstaLaddning.current) { forstaLaddning.current = false; return }
    if (meRef.current) load(meRef.current, true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  async function load(userId: string, tyst = false) {
    try {
      if (!tyst) setLoading(true)
      setError(false)

      const { data: parts, error: partsErr } = await supabase
        .from('conversation_participants')
        .select('conversation_id, last_read_at')
        .eq('user_id', userId)

      if (partsErr) { setConvs([]); setLoading(false); return }
      const ids = (parts ?? []).map(p => p.conversation_id as string)
      if (ids.length === 0) { setConvs([]); setLoading(false); return }

      const lastReadMap: Record<string, string> = {}
      for (const p of parts ?? []) lastReadMap[p.conversation_id as string] = p.last_read_at as string

      const { data: cs, error: csErr } = await supabase
        .from('conversations')
        .select('id, is_group, title, status, created_by, last_message_at, last_message_preview, last_message_user_id')
        .in('id', ids)
        .order('last_message_at', { ascending: false })

      if (csErr || !cs) { setConvs([]); setLoading(false); return }
      const filtered = cs.filter(c => (c as ConvRow).status !== 'declined')

      const oneToOneIds = filtered.filter(c => !c.is_group).map(c => c.id)
      const otherMap: Record<string, { id: string; username: string; avatar: string | null; readAt: string | null }> = {}
      if (oneToOneIds.length > 0) {
        const { data: others } = await supabase
          .from('conversation_participants')
          .select('conversation_id, user_id, last_read_at')
          .in('conversation_id', oneToOneIds)
          .neq('user_id', userId)
        const otherIds = [...new Set((others ?? []).map(o => o.user_id as string))]
        if (otherIds.length > 0) {
          const { data: users } = await supabase
            .from('users').select('id, username, avatar').in('id', otherIds)
          const userById: Record<string, { id: string; username: string; avatar: string | null }> = {}
          for (const u of users ?? []) userById[u.id] = { id: u.id, username: u.username, avatar: u.avatar ?? null }
          for (const o of others ?? []) {
            const u = userById[o.user_id as string]
            if (u) otherMap[o.conversation_id as string] = { ...u, readAt: (o.last_read_at as string | null) ?? null }
          }
        }
      }

      // En enda query för alla olästa meddelanden över alla konversationer.
      const filteredIds = filtered.map(c => c.id as string)
      const allHaveLastRead = filteredIds.every(id => id in lastReadMap)
      const earliestLr = allHaveLastRead
        ? Object.values(lastReadMap).sort()[0]
        : '1970-01-01T00:00:00Z'

      const unreadByConv: Record<string, number> = {}
      if (filteredIds.length > 0) {
        const { data: potentialUnread } = await supabase
          .from('messages')
          .select('conversation_id, created_at')
          .in('conversation_id', filteredIds)
          .neq('user_id', userId)
          .gt('created_at', earliestLr)
        for (const m of potentialUnread ?? []) {
          const convId = m.conversation_id as string
          const lr = lastReadMap[convId] ?? '1970-01-01T00:00:00Z'
          if ((m.created_at as string) > lr) {
            unreadByConv[convId] = (unreadByConv[convId] ?? 0) + 1
          }
        }
      }

      setConvs(filtered.map(c => {
        const o = otherMap[c.id]
        return {
          ...(c as ConvRow),
          other_username: o?.username,
          other_avatar: o?.avatar ?? null,
          other_id: o?.id,
          other_read_at: o?.readAt ?? null,
          unread: unreadByConv[c.id] ?? 0,
        }
      }))
      setLoading(false)
    } catch {
      if (!tyst) setConvs([])
      setError(true)
      setLoading(false)
    }
  }

  const activeConvs = convs.filter(c => c.status === 'active' || (c.status === 'request' && c.created_by === me))
  const requestConvs = convs.filter(c => c.status === 'request' && c.created_by !== me)

  const rader = useMemo(() => {
    if (!me) return []
    const base = tab === 'requests' ? requestConvs : activeConvs
    const q = query.trim().toLowerCase()
    return base
      .filter(c => !q || (c.is_group ? (c.title ?? '') : (c.other_username ?? '')).toLowerCase().includes(q))
      .map(c => tillRad(c, me))
  }, [tab, activeConvs, requestConvs, query, me])

  const lage = loading ? 'laddar' : me === null ? 'utloggad' : error ? 'fel' : 'klar'

  return (
    <InkorgVy
      lage={lage}
      rader={rader}
      aktivaAntal={activeConvs.length}
      forfragningarAntal={requestConvs.length}
      flik={tab}
      setFlik={setTab}
      sok={query}
      setSok={setQuery}
      valtId={valtId}
      onForsokIgen={() => { if (me) load(me) }}
    />
  )
}
