'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase'
import {
  listTagsForTrip,
  addTripTag,
  removeTripTag,
  searchUsersForTag,
  type TripTag,
} from '@/lib/tripTags'
import { avatarGradient, initialsOf } from '@/lib/utils'

type UserLite = { id: string; username: string; avatar: string | null }

export default function TripTagger({
  tripId,
  tripOwnerId,
  currentUserId,
}: {
  tripId: string
  tripOwnerId: string
  currentUserId: string | null
}) {
  const supabase = useRef(createClient()).current
  const [tags, setTags] = useState<TripTag[]>([])
  const [loading, setLoading] = useState(true)
  const [picking, setPicking] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<UserLite[]>([])
  const [searching, setSearching] = useState(false)
  const [tagError, setTagError] = useState<string | null>(null)

  const isOwner = currentUserId === tripOwnerId

  useEffect(() => {
    let cancelled = false
    async function go() {
      const ts = await listTagsForTrip(supabase, tripId)
      if (!cancelled) { setTags(ts); setLoading(false) }
    }
    go()
    return () => { cancelled = true }
  }, [supabase, tripId])

  useEffect(() => {
    if (!picking) { setResults([]); return }
    if (query.trim().length === 0) { setResults([]); return }
    const t = setTimeout(async () => {
      setSearching(true)
      const excludeIds = [tripOwnerId, ...tags.map(t => t.tagged_user_id)]
      const r = await searchUsersForTag(supabase, query.trim(), excludeIds)
      setResults(r)
      setSearching(false)
    }, 220)
    return () => clearTimeout(t)
  }, [query, picking, supabase, tags, tripOwnerId])

  async function addTag(u: UserLite) {
    if (!currentUserId) return
    setTagError(null)
    const { ok, errorMessage } = await addTripTag(supabase, currentUserId, tripId, u.id)
    if (!ok) {
      setTagError(errorMessage ?? 'Kunde inte tagga användaren')
      return
    }
    setTags(prev => [...prev, {
      trip_id: tripId,
      tagged_user_id: u.id,
      tagged_by_user_id: currentUserId,
      confirmed: false,
      created_at: new Date().toISOString(),
      username: u.username,
      avatar: u.avatar,
    }])
    setQuery('')
  }

  async function removeTag(uid: string) {
    const ok = await removeTripTag(supabase, tripId, uid)
    if (ok) setTags(prev => prev.filter(t => t.tagged_user_id !== uid))
  }

  if (loading) return null
  if (tags.length === 0 && !isOwner) return null

  return (
    <div style={{ padding: '14px 16px', borderTop: '1px solid rgba(10,123,140,0.08)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
        <h3 style={{ fontSize: 13, fontWeight: 600, color: 'var(--txt)', margin: 0, textTransform: 'uppercase', letterSpacing: 0.5 }}>
          Medseglare
        </h3>
        {isOwner && (
          <button onClick={() => setPicking(p => !p)}
            style={{ border: 'none', background: 'transparent', color: 'var(--acc)', fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>
            {picking ? 'Klar' : '+ Tagga'}
          </button>
        )}
      </div>

      {tags.length === 0 && (
        <p style={{ fontSize: 12, color: 'var(--txt3)', fontStyle: 'italic', margin: 0 }}>
          Tagga medseglare så syns turen på deras profil också.
        </p>
      )}

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {tags.map(t => (
          <div key={t.tagged_user_id} style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '4px 10px 4px 4px', borderRadius: 20,
            background: 'rgba(10,123,140,0.06)',
          }}>
            <Link href={`/u/${t.username}`} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{
                width: 24, height: 24, borderRadius: '50%', overflow: 'hidden', position: 'relative',
                background: avatarGradient(t.username ?? t.tagged_user_id),
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontWeight: 600, fontSize: 10,
              }}>
                {t.avatar ? (
                  <Image src={t.avatar} alt="" fill sizes="24px" style={{ objectFit: 'cover' }} />
                ) : initialsOf(t.username ?? '?')}
              </div>
              <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--txt)' }}>
                {t.username ?? 'okänd'}
              </span>
            </Link>
            {(isOwner || t.tagged_user_id === currentUserId) && (
              <button onClick={() => removeTag(t.tagged_user_id)} aria-label="Ta bort tagg"
                style={{ border: 'none', background: 'transparent', color: 'var(--txt3)', cursor: 'pointer', fontSize: 12, padding: 0, marginLeft: 2 }}>
                ✕
              </button>
            )}
          </div>
        ))}
      </div>

      {picking && isOwner && (
        <div style={{ marginTop: 10 }}>
          <input value={query} onChange={e => setQuery(e.target.value)} autoFocus
            placeholder="Sök användarnamn…"
            style={{ width: '100%', padding: 10, borderRadius: 10, border: '1px solid rgba(10,123,140,0.20)', fontSize: 13, background: 'var(--bg)', color: 'var(--txt)' }} />
          {tagError && <div style={{ fontSize: 11, color: '#dc2626', marginTop: 6 }}>{tagError}</div>}
          {searching && <div style={{ fontSize: 11, color: 'var(--txt3)', marginTop: 6 }}>Söker…</div>}
          {results.length > 0 && (
            <div style={{ marginTop: 8, border: '1px solid rgba(10,123,140,0.10)', borderRadius: 10, overflow: 'hidden' }}>
              {results.map(u => (
                <button key={u.id} onClick={() => addTag(u)}
                  style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: 10, border: 'none', background: 'var(--white)', cursor: 'pointer', borderBottom: '1px solid rgba(10,123,140,0.06)', textAlign: 'left' }}>
                  <div style={{
                    width: 30, height: 30, borderRadius: '50%', overflow: 'hidden', position: 'relative',
                    background: avatarGradient(u.username),
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff', fontWeight: 600, fontSize: 11,
                  }}>
                    {u.avatar ? (
                      <Image src={u.avatar} alt="" fill sizes="30px" style={{ objectFit: 'cover' }} />
                    ) : initialsOf(u.username)}
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--txt)' }}>{u.username}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
