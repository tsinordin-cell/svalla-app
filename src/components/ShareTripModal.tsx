'use client'
/**
 * ShareTripModal — välj en konversation att skicka en tur till som DM.
 * Öppnas från TripCard via "Skicka som meddelande"-knappen.
 */
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { findOrCreateDM } from '@/lib/dm'
import { avatarGradient, initialsOf } from '@/lib/utils'
import { toast } from '@/components/Toast'
import type { Trip } from '@/lib/supabase'

type ConvOption = {
  id: string
  is_group: boolean
  title: string | null
  other_username?: string
  other_avatar?: string | null
  other_id?: string
  last_message_at: string
}

type Props = {
  trip: Trip
  onClose: () => void
}

export default function ShareTripModal({ trip, onClose }: Props) {
  const router = useRouter()
  const supabase = useRef(createClient()).current
  const [me, setMe] = useState<string | null>(null)
  const [convs, setConvs] = useState<ConvOption[]>([])
  const [follows, setFollows] = useState<{ id: string; username: string; avatar: string | null; mutual: boolean }[]>([])
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState<string | null>(null)
  const [tab, setTab] = useState<'chatt' | 'ny'>('chatt')

  useEffect(() => {
    let cancel = false
    async function boot() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user || cancel) return
      setMe(user.id)

      // Befintliga aktiva konversationer
      const { data: parts } = await supabase
        .from('conversation_participants')
        .select('conversation_id')
        .eq('user_id', user.id)
      const ids = (parts ?? []).map(p => p.conversation_id as string)
      if (ids.length > 0) {
        const { data: cs } = await supabase
          .from('conversations')
          .select('id, is_group, title, last_message_at')
          .in('id', ids)
          .eq('status', 'active')
          .order('last_message_at', { ascending: false })
          .limit(20)

        const oneToOneIds = (cs ?? []).filter(c => !c.is_group).map(c => c.id)
        const otherMap: Record<string, { id: string; username: string; avatar: string | null }> = {}
        if (oneToOneIds.length > 0) {
          const { data: others } = await supabase
            .from('conversation_participants')
            .select('conversation_id, user_id')
            .in('conversation_id', oneToOneIds)
            .neq('user_id', user.id)
          const otherIds = [...new Set((others ?? []).map(o => o.user_id as string))]
          if (otherIds.length > 0) {
            const { data: users } = await supabase.from('users').select('id, username, avatar').in('id', otherIds)
            const byId: Record<string, { id: string; username: string; avatar: string | null }> = {}
            for (const u of users ?? []) byId[u.id] = { id: u.id, username: u.username, avatar: u.avatar ?? null }
            for (const o of others ?? []) {
              const u = byId[o.user_id as string]
              if (u) otherMap[o.conversation_id as string] = u
            }
          }
        }

        if (!cancel) setConvs((cs ?? []).map(c => ({
          ...c,
          last_message_at: c.last_message_at as string,
          other_username: otherMap[c.id]?.username,
          other_avatar: otherMap[c.id]?.avatar ?? null,
          other_id: otherMap[c.id]?.id,
        })))
      }

      // Följare för "Ny konversation"-fliken
      const { data: iFollow } = await supabase
        .from('follows').select('following_id').eq('follower_id', user.id)
      const followIds = (iFollow ?? []).map(r => r.following_id as string)
      if (followIds.length > 0) {
        const { data: followMe } = await supabase
          .from('follows').select('follower_id').eq('following_id', user.id).in('follower_id', followIds)
        const mutualSet = new Set((followMe ?? []).map(r => r.follower_id as string))
        const { data: users } = await supabase.from('users').select('id, username, avatar').in('id', followIds)
        if (!cancel) setFollows((users ?? []).map(u => ({
          id: u.id as string, username: u.username as string,
          avatar: (u.avatar as string | null) ?? null,
          mutual: mutualSet.has(u.id as string),
        })).sort((a, b) => a.mutual === b.mutual ? a.username.localeCompare(b.username, 'sv') : a.mutual ? -1 : 1))
      }

      if (!cancel) setLoading(false)
    }
    boot()
    return () => { cancel = true }
  }, [supabase])

  async function sendToConv(convId: string) {
    if (!me) return
    setSending(convId)
    const meta: Record<string, unknown> = {
      trip_id: trip.id,
      location_name: trip.location_name ?? null,
      distance: trip.distance ?? null,
      image: trip.image ?? null,
    }
    const { error } = await supabase.from('messages').insert({
      conversation_id: convId, user_id: me,
      content: null, attachment_type: 'trip',
      attachment_url: `https://svalla.se/tur/${trip.id}`,
      attachment_meta: meta,
    })
    setSending(null)
    if (error) { toast('Kunde inte skicka. Försök igen.', 'error'); return }
    toast('Tur skickad! ⛵', 'success')
    onClose()
    router.push(`/meddelanden/${convId}`)
  }

  async function sendToUser(otherId: string) {
    if (!me) return
    setSending(otherId)
    const res = await findOrCreateDM(supabase, me, otherId)
    if (!res) { toast('Kunde inte starta konversation.', 'error'); setSending(null); return }
    await sendToConv(res.id)
  }

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 300 }}
      />
      {/* Sheet */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 301,
        background: 'var(--white)', borderRadius: '20px 20px 0 0',
        maxHeight: '75vh', display: 'flex', flexDirection: 'column',
        boxShadow: '0 -4px 32px rgba(0,30,50,0.20)',
      }}>
        {/* Handle */}
        <div style={{ width: 36, height: 4, borderRadius: 2, background: 'rgba(0,0,0,0.12)', margin: '12px auto 0' }} />

        {/* Header */}
        <div style={{ padding: '12px 16px 8px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid rgba(10,123,140,0.08)' }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--txt)' }}>Skicka som meddelande</div>
            <div style={{ fontSize: 12, color: 'var(--txt3)', marginTop: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              ⛵ {trip.location_name ?? 'Tur'}
            </div>
          </div>
          <button onClick={onClose} style={{
            width: 32, height: 32, borderRadius: '50%', border: 'none',
            background: 'rgba(10,123,140,0.07)', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 16, color: 'var(--txt3)',
          }}>✕</button>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid rgba(10,123,140,0.08)' }}>
          {(['chatt', 'ny'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              flex: 1, padding: '10px', border: 'none', background: 'transparent',
              fontSize: 13, fontWeight: tab === t ? 800 : 600,
              color: tab === t ? 'var(--sea)' : 'var(--txt3)',
              borderBottom: tab === t ? '2px solid var(--sea)' : '2px solid transparent',
              cursor: 'pointer',
            }}>
              {t === 'chatt' ? 'Befintlig chatt' : 'Ny konversation'}
            </button>
          ))}
        </div>

        {/* List */}
        <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 'env(safe-area-inset-bottom, 16px)' }}>
          {loading && (
            <div style={{ padding: 40, textAlign: 'center' }}>
              <div style={{ width: 22, height: 22, borderRadius: '50%', border: '2px solid #1e5c82', borderTopColor: 'transparent', animation: 'spin .7s linear infinite', display: 'inline-block' }} />
            </div>
          )}

          {!loading && tab === 'chatt' && (
            convs.length === 0
              ? <div style={{ padding: '32px 20px', textAlign: 'center', color: 'var(--txt3)', fontSize: 13 }}>Inga aktiva konversationer ännu.</div>
              : convs.map(c => {
                  const display = c.is_group ? (c.title ?? 'Grupp') : (c.other_username ?? 'Seglare')
                  const grad = avatarGradient(display)
                  const busy = sending === c.id
                  return (
                    <button key={c.id} onClick={() => sendToConv(c.id)} disabled={!!sending} style={{
                      display: 'flex', alignItems: 'center', gap: 12, width: '100%',
                      padding: '11px 16px', border: 'none', borderBottom: '1px solid rgba(10,123,140,0.06)',
                      background: 'transparent', cursor: sending ? 'default' : 'pointer',
                      opacity: (sending && !busy) ? 0.5 : 1,
                      WebkitTapHighlightColor: 'transparent',
                    }}>
                      <div style={{
                        width: 42, height: 42, borderRadius: '50%', flexShrink: 0,
                        background: grad, color: '#fff', fontWeight: 600, fontSize: 14,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        overflow: 'hidden', position: 'relative',
                      }}>
                        {c.other_avatar
                          // eslint-disable-next-line @next/next/no-img-element
                          ? <img src={c.other_avatar} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                          : initialsOf(display)}
                      </div>
                      <div style={{ flex: 1, textAlign: 'left' }}>
                        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--txt)' }}>{display}</div>
                      </div>
                      {busy
                        ? <div style={{ width: 18, height: 18, borderRadius: '50%', border: '2px solid #1e5c82', borderTopColor: 'transparent', animation: 'spin .7s linear infinite' }} />
                        : <svg viewBox="0 0 24 24" fill="none" stroke="var(--txt3)" strokeWidth={2.5} style={{ width: 16, height: 16, flexShrink: 0 }}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                      }
                    </button>
                  )
                })
          )}

          {!loading && tab === 'ny' && (
            follows.length === 0
              ? <div style={{ padding: '32px 20px', textAlign: 'center', color: 'var(--txt3)', fontSize: 13 }}>Följ seglare för att skicka turer till dem.</div>
              : follows.map(f => {
                  const grad = avatarGradient(f.username)
                  const busy = sending === f.id
                  return (
                    <button key={f.id} onClick={() => sendToUser(f.id)} disabled={!!sending} style={{
                      display: 'flex', alignItems: 'center', gap: 12, width: '100%',
                      padding: '11px 16px', border: 'none', borderBottom: '1px solid rgba(10,123,140,0.06)',
                      background: 'transparent', cursor: sending ? 'default' : 'pointer',
                      opacity: (sending && !busy) ? 0.5 : 1,
                      WebkitTapHighlightColor: 'transparent',
                    }}>
                      <div style={{
                        width: 42, height: 42, borderRadius: '50%', flexShrink: 0,
                        background: grad, color: '#fff', fontWeight: 600, fontSize: 14,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        overflow: 'hidden', position: 'relative',
                      }}>
                        {f.avatar
                          // eslint-disable-next-line @next/next/no-img-element
                          ? <img src={f.avatar} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                          : initialsOf(f.username)}
                      </div>
                      <div style={{ flex: 1, textAlign: 'left' }}>
                        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--txt)' }}>{f.username}</div>
                        {!f.mutual && <div style={{ fontSize: 11, color: '#c96e2a', fontWeight: 600 }}>Skickas som förfrågan</div>}
                      </div>
                      {busy
                        ? <div style={{ width: 18, height: 18, borderRadius: '50%', border: '2px solid #1e5c82', borderTopColor: 'transparent', animation: 'spin .7s linear infinite' }} />
                        : <svg viewBox="0 0 24 24" fill="none" stroke="var(--txt3)" strokeWidth={2.5} style={{ width: 16, height: 16, flexShrink: 0 }}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                      }
                    </button>
                  )
                })
          )}
        </div>
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </>
  )
}
