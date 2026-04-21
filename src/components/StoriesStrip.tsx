'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import {
  listActiveStoriesGrouped,
  recordStoryView,
  createStory,
  deleteStory,
  type Story,
} from '@/lib/stories'
import { avatarGradient, initialsOf, timeAgoShort } from '@/lib/utils'

type Group = {
  user_id: string
  username: string
  avatar: string | null
  stories: Story[]
  viewed_all: boolean
}

export default function StoriesStrip() {
  const supabase = useRef(createClient()).current
  const [me, setMe] = useState<string | null>(null)
  const [groups, setGroups] = useState<Group[]>([])
  const [loading, setLoading] = useState(true)
  const [viewerGroup, setViewerGroup] = useState<number | null>(null)
  const [viewerIdx, setViewerIdx] = useState(0)
  const [showUpload, setShowUpload] = useState(false)

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) setMe(user.id)
      load(user?.id ?? null)
    })
  }, [supabase])

  async function load(uid: string | null) {
    setLoading(true)
    const gs = await listActiveStoriesGrouped(supabase, uid)
    setGroups(gs)
    setLoading(false)
  }

  function openViewer(idx: number) {
    setViewerGroup(idx)
    setViewerIdx(0)
    const story = groups[idx]?.stories[0]
    if (story && me) recordStoryView(supabase, me, story.id)
  }
  function closeViewer() { setViewerGroup(null) }
  function nextStory() {
    if (viewerGroup === null) return
    const g = groups[viewerGroup]
    if (viewerIdx + 1 < g.stories.length) {
      const next = g.stories[viewerIdx + 1]
      setViewerIdx(viewerIdx + 1)
      if (me) recordStoryView(supabase, me, next.id)
    } else if (viewerGroup + 1 < groups.length) {
      setViewerGroup(viewerGroup + 1)
      setViewerIdx(0)
      const s = groups[viewerGroup + 1].stories[0]
      if (me) recordStoryView(supabase, me, s.id)
    } else closeViewer()
  }
  function prevStory() {
    if (viewerIdx > 0) setViewerIdx(viewerIdx - 1)
    else if (viewerGroup !== null && viewerGroup > 0) {
      setViewerGroup(viewerGroup - 1)
      setViewerIdx(groups[viewerGroup - 1].stories.length - 1)
    }
  }

  if (loading) return null
  const hasStories = groups.length > 0
  if (!hasStories && !me) return null

  return (
    <>
      <div style={{
        display: 'flex', gap: 12, padding: '12px 16px',
        overflowX: 'auto', overflowY: 'hidden',
        scrollbarWidth: 'none',
      }}>
        {me && (
          <button onClick={() => setShowUpload(true)}
            style={{
              flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
              border: 'none', background: 'transparent', cursor: 'pointer', padding: 0,
            }}>
            <div style={{
              width: 60, height: 60, borderRadius: '50%',
              border: '2px dashed rgba(10,123,140,0.35)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#1e5c82', fontSize: 24, fontWeight: 800,
              background: 'rgba(10,123,140,0.04)',
            }}>+</div>
            <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--txt3)' }}>Din story</span>
          </button>
        )}

        {groups.map((g, idx) => (
          <button key={g.user_id} onClick={() => openViewer(idx)}
            style={{
              flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
              border: 'none', background: 'transparent', cursor: 'pointer', padding: 0, maxWidth: 70,
            }}>
            <div style={{
              width: 64, height: 64, borderRadius: '50%',
              padding: 2.5,
              background: g.viewed_all
                ? 'rgba(10,123,140,0.20)'
                : 'linear-gradient(135deg,#1e5c82 0%,#2d7d8a 50%,#c96e2a 100%)',
            }}>
              <div style={{
                width: '100%', height: '100%', borderRadius: '50%',
                border: '2.5px solid var(--bg)',
                overflow: 'hidden', position: 'relative',
                background: avatarGradient(g.username),
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontWeight: 800, fontSize: 16,
              }}>
                {g.avatar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={g.avatar} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : initialsOf(g.username)}
              </div>
            </div>
            <span style={{
              fontSize: 11, fontWeight: 700, color: g.viewed_all ? 'var(--txt3)' : 'var(--txt)',
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 66,
            }}>
              {g.user_id === me ? 'Du' : g.username}
            </span>
          </button>
        ))}
      </div>

      {viewerGroup !== null && groups[viewerGroup] && (
        <StoryViewer
          group={groups[viewerGroup]}
          storyIdx={viewerIdx}
          onClose={closeViewer}
          onNext={nextStory}
          onPrev={prevStory}
          onDelete={async (id) => {
            await deleteStory(supabase, id)
            closeViewer()
            load(me)
          }}
          meIsOwner={me === groups[viewerGroup].user_id}
        />
      )}

      {showUpload && me && (
        <UploadStory
          onClose={() => setShowUpload(false)}
          onCreated={() => { setShowUpload(false); load(me) }}
          supabase={supabase}
          userId={me}
        />
      )}
    </>
  )
}

function StoryViewer({
  group, storyIdx, onClose, onNext, onPrev, onDelete, meIsOwner,
}: {
  group: Group
  storyIdx: number
  onClose: () => void
  onNext: () => void
  onPrev: () => void
  onDelete: (id: string) => void
  meIsOwner: boolean
}) {
  const story = group.stories[storyIdx]

  // auto-advance efter 5s
  useEffect(() => {
    const t = setTimeout(onNext, 5000)
    return () => clearTimeout(t)
  }, [story.id, onNext])

  if (!story) return null

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1001,
      background: '#000', display: 'flex', flexDirection: 'column',
    }}>
      {/* Progress bars */}
      <div style={{ display: 'flex', gap: 3, padding: '10px 10px 0' }}>
        {group.stories.map((_, i) => (
          <div key={i} style={{ flex: 1, height: 2.5, borderRadius: 2, background: 'rgba(255,255,255,0.3)', overflow: 'hidden' }}>
            <div style={{
              height: '100%',
              background: '#fff',
              width: i < storyIdx ? '100%' : i === storyIdx ? '100%' : '0%',
              animation: i === storyIdx ? 'progress 5s linear' : 'none',
              transformOrigin: 'left',
            }} />
          </div>
        ))}
      </div>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', padding: 12, gap: 10 }}>
        <Link href={`/u/${group.username}`} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 32, height: 32, borderRadius: '50%', overflow: 'hidden', position: 'relative',
            background: avatarGradient(group.username),
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontWeight: 800, fontSize: 12,
          }}>
            {group.avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={group.avatar} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : initialsOf(group.username)}
          </div>
          <span style={{ color: '#fff', fontWeight: 700, fontSize: 13 }}>{group.username}</span>
        </Link>
        <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 11 }}>{timeAgoShort(story.created_at)}</span>
        <div style={{ flex: 1 }} />
        {meIsOwner && (
          <button onClick={() => onDelete(story.id)} aria-label="Ta bort"
            style={{ border: 'none', background: 'transparent', color: '#fff', cursor: 'pointer', fontSize: 14, opacity: 0.8 }}>
            🗑
          </button>
        )}
        <button onClick={onClose} aria-label="Stäng"
          style={{ border: 'none', background: 'transparent', color: '#fff', cursor: 'pointer', fontSize: 22, padding: 0, width: 32, height: 32 }}>
          ✕
        </button>
      </div>

      {/* Content */}
      <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Tap zones */}
        <div onClick={onPrev} style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '30%', zIndex: 2 }} />
        <div onClick={onNext} style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '70%', zIndex: 2 }} />
        {story.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={story.image} alt="" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
        )}
        {story.caption && (
          <div style={{
            position: 'absolute', bottom: 30, left: 20, right: 20,
            padding: 12, borderRadius: 14,
            background: 'rgba(0,0,0,0.55)',
            color: '#fff', fontSize: 14, lineHeight: 1.4, textAlign: 'center',
          }}>
            {story.caption}
          </div>
        )}
        {story.location_name && (
          <div style={{
            position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)',
            padding: '4px 10px', borderRadius: 12, background: 'rgba(0,0,0,0.55)',
            color: '#fff', fontSize: 11, fontWeight: 700,
          }}>
            📍 {story.location_name}
          </div>
        )}
      </div>

      <style>{`
        @keyframes progress { from { transform: scaleX(0) } to { transform: scaleX(1) } }
      `}</style>
    </div>
  )
}

function UploadStory({
  onClose, onCreated, supabase, userId,
}: {
  onClose: () => void
  onCreated: () => void
  supabase: ReturnType<typeof createClient>
  userId: string
}) {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [caption, setCaption] = useState('')
  const [location, setLocation] = useState('')
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]
    if (!f) return
    if (f.size > 8 * 1024 * 1024) { setErr('Max 8 MB.'); return }
    setFile(f); setPreview(URL.createObjectURL(f))
  }

  async function submit() {
    if (!file) { setErr('Välj en bild.'); return }
    setBusy(true); setErr(null)
    const ext = (file.name.split('.').pop() ?? 'jpg').toLowerCase()
    const path = `stories/${userId}/${Date.now()}.${ext}`
    const { error: upErr } = await supabase.storage
      .from('trip-images').upload(path, file, { upsert: false, contentType: file.type })
    if (upErr) { setErr('Uppladdning misslyckades.'); setBusy(false); return }
    const { data: pub } = supabase.storage.from('trip-images').getPublicUrl(path)
    const res = await createStory(supabase, userId, {
      image: pub.publicUrl,
      caption: caption.trim() || null,
      location_name: location.trim() || null,
    })
    setBusy(false)
    if (!res) { setErr('Kunde inte spara story.'); return }
    onCreated()
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1001,
      background: 'rgba(0,0,0,0.6)',
      display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
      overflow: 'hidden',
    }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{
        width: '100%', maxWidth: 520, background: 'var(--white)',
        borderRadius: '20px 20px 0 0', padding: 20,
        paddingBottom: 'max(24px, env(safe-area-inset-bottom, 24px))',
        maxHeight: '88svh', overflowY: 'auto',
        boxSizing: 'border-box',
      }}>
        <div style={{ width: 40, height: 4, background: 'rgba(10,123,140,0.20)', borderRadius: 2, margin: '0 auto 16px' }} />
        <h2 style={{ fontSize: 18, fontWeight: 800, color: 'var(--txt)', margin: '0 0 14px' }}>Dela story</h2>

        {preview ? (
          <div style={{ position: 'relative', marginBottom: 14 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={preview} alt="" style={{ width: '100%', borderRadius: 14, display: 'block', maxHeight: 300, objectFit: 'cover' }} />
            <button onClick={() => { setFile(null); setPreview(null) }}
              style={{ position: 'absolute', top: 8, right: 8, width: 32, height: 32, borderRadius: '50%', border: 'none', background: 'rgba(0,0,0,0.6)', color: '#fff', fontWeight: 800, cursor: 'pointer' }}>
              ✕
            </button>
          </div>
        ) : (
          <label style={{
            display: 'block', padding: '40px 14px', borderRadius: 14,
            border: '2px dashed rgba(10,123,140,0.25)', textAlign: 'center',
            background: 'rgba(10,123,140,0.03)', cursor: 'pointer', marginBottom: 14,
          }}>
            <div style={{ fontSize: 32, marginBottom: 6 }}>📷</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--txt)' }}>Välj bild</div>
            <div style={{ fontSize: 11, color: 'var(--txt3)', marginTop: 2 }}>Försvinner efter 24h</div>
            <input type="file" accept="image/*" onChange={onPick} style={{ display: 'none' }} />
          </label>
        )}

        <input value={caption} onChange={e => setCaption(e.target.value)} placeholder="Text (valfritt)" maxLength={200}
          style={{ width: '100%', padding: 10, borderRadius: 10, border: '1px solid rgba(10,123,140,0.20)', fontSize: 14, marginBottom: 10, background: 'var(--bg)', color: 'var(--txt)' }} />

        <input value={location} onChange={e => setLocation(e.target.value)} placeholder="Plats (valfritt)" maxLength={60}
          style={{ width: '100%', padding: 10, borderRadius: 10, border: '1px solid rgba(10,123,140,0.20)', fontSize: 14, marginBottom: 14, background: 'var(--bg)', color: 'var(--txt)' }} />

        {err && <div style={{ color: '#c03', fontSize: 12, marginBottom: 10 }}>{err}</div>}

        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={onClose} disabled={busy}
            style={{ flex: 1, padding: 12, borderRadius: 12, border: '1px solid rgba(10,123,140,0.20)', background: 'transparent', fontWeight: 700, fontSize: 14, color: 'var(--txt)', cursor: 'pointer' }}>
            Avbryt
          </button>
          <button onClick={submit} disabled={busy || !file}
            style={{ flex: 2, padding: 12, borderRadius: 12, border: 'none', background: 'linear-gradient(135deg,#1e5c82,#2d7d8a)', color: '#fff', fontWeight: 800, fontSize: 14, cursor: busy ? 'wait' : 'pointer', opacity: busy || !file ? 0.6 : 1 }}>
            {busy ? 'Delar…' : 'Dela'}
          </button>
        </div>
      </div>
    </div>
  )
}
