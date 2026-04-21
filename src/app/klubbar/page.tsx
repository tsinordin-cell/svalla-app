'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { createClub, type ClubBasic } from '@/lib/clubs'
import { avatarGradient, initialsOf } from '@/lib/utils'

type Tab = 'mina' | 'utforska'

export default function KlubbarPage() {
  const supabase = useRef(createClient()).current
  const router = useRouter()
  const [me, setMe] = useState<string | null>(null)
  const [tab, setTab] = useState<Tab>('mina')
  const [myClubs, setMyClubs] = useState<ClubBasic[]>([])
  const [publicClubs, setPublicClubs] = useState<ClubBasic[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreate, setShowCreate] = useState(false)

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) setMe(user.id)
      load(user?.id ?? null)
    })
  }, [supabase])

  async function load(userId: string | null) {
    setLoading(true)

    // Publika klubbar (senaste 30)
    const { data: pub } = await supabase
      .from('clubs')
      .select('id, slug, name, description, image, is_public, region, created_by, created_at')
      .eq('is_public', true)
      .order('created_at', { ascending: false })
      .limit(30)
    const pubList = (pub ?? []) as ClubBasic[]

    // Mina klubbar
    let myList: ClubBasic[] = []
    let mySet = new Set<string>()
    if (userId) {
      const { data: mem } = await supabase
        .from('club_members')
        .select('club_id')
        .eq('user_id', userId)
      const ids = (mem ?? []).map(m => m.club_id as string)
      mySet = new Set(ids)
      if (ids.length > 0) {
        const { data: mine } = await supabase
          .from('clubs')
          .select('id, slug, name, description, image, is_public, region, created_by, created_at')
          .in('id', ids)
          .order('created_at', { ascending: false })
        myList = (mine ?? []) as ClubBasic[]
      }
    }

    // medlemsantal per klubb (batch)
    const allIds = [...new Set([...pubList.map(c => c.id), ...myList.map(c => c.id)])]
    const countMap: Record<string, number> = {}
    if (allIds.length > 0) {
      const { data: counts } = await supabase
        .from('club_members')
        .select('club_id')
        .in('club_id', allIds)
      for (const c of counts ?? []) {
        const k = c.club_id as string
        countMap[k] = (countMap[k] ?? 0) + 1
      }
    }
    const decorate = (c: ClubBasic) => ({
      ...c,
      member_count: countMap[c.id] ?? 0,
      is_member: mySet.has(c.id),
    })

    setMyClubs(myList.map(decorate))
    setPublicClubs(pubList.map(decorate))
    setLoading(false)
  }

  const shown = tab === 'mina' ? myClubs : publicClubs

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: 100 }}>
      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'var(--header-bg, var(--glass-96))',
        backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(10,123,140,0.10)',
        padding: '14px 16px',
      }}>
        <div style={{ maxWidth: 520, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 10 }}>
          <Link href="/feed" aria-label="Tillbaka" style={{
            width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
            background: 'rgba(10,123,140,0.07)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#1e5c82" strokeWidth={2.5} style={{ width: 17, height: 17 }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1 style={{ flex: 1, fontSize: 18, fontWeight: 600, color: 'var(--txt)', margin: 0 }}>Klubbar</h1>
          <button
            onClick={() => me ? setShowCreate(true) : router.push('/logga-in')}
            aria-label="Skapa klubb"
            style={{
              width: 36, height: 36, borderRadius: '50%', flexShrink: 0, border: 'none',
              background: 'linear-gradient(135deg,#1e5c82,#2d7d8a)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff',
              cursor: 'pointer',
            }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} style={{ width: 18, height: 18 }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div style={{ maxWidth: 520, margin: '10px auto 0', display: 'flex', gap: 6 }}>
          {(['mina', 'utforska'] as Tab[]).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                flex: 1, padding: '8px 10px', border: 'none',
                borderRadius: 10,
                background: tab === t ? 'linear-gradient(135deg,#1e5c82,#2d7d8a)' : 'rgba(10,123,140,0.06)',
                color: tab === t ? '#fff' : 'var(--txt)',
                fontWeight: 700, fontSize: 13, cursor: 'pointer',
              }}>
              {t === 'mina' ? 'Mina klubbar' : 'Utforska'}
            </button>
          ))}
        </div>
      </header>

      <div style={{ maxWidth: 520, margin: '0 auto', padding: '12px 16px' }}>
        {loading && (
          <div style={{ padding: 40, textAlign: 'center' }}>
            <div style={{ width: 24, height: 24, borderRadius: '50%', border: '2.5px solid #1e5c82', borderTopColor: 'transparent', animation: 'spin .7s linear infinite', display: 'inline-block' }} />
          </div>
        )}

        {!loading && tab === 'mina' && !me && (
          <EmptyState
            emoji="🔒"
            title="Logga in för dina klubbar"
            body="Klubbar är privata gemenskaper — en för seglarklubben, en för familjen, en för ditt båtmässa-gäng."
            cta={{ href: '/logga-in', label: 'Logga in' }}
          />
        )}

        {!loading && tab === 'mina' && me && shown.length === 0 && (
          <EmptyState
            emoji="⛵"
            title="Inga klubbar än"
            body="Skapa eller gå med i en klubb för att segla tillsammans, samla turer och chatta i grupp."
            cta={{ href: '#', label: 'Utforska publika klubbar →', onClick: () => setTab('utforska') }}
          />
        )}

        {!loading && tab === 'utforska' && shown.length === 0 && (
          <EmptyState
            emoji="🗺️"
            title="Inga publika klubbar ännu"
            body="Bli först. Skapa en klubb för din ö, ditt segelsällskap eller ditt båtmodell-gäng."
            cta={me ? { href: '#', label: 'Skapa klubb', onClick: () => setShowCreate(true) } : undefined}
          />
        )}

        {!loading && shown.map(c => (
          <Link key={c.id} href={`/klubb/${c.slug}`} style={{ textDecoration: 'none' }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: 14, borderRadius: 16,
              background: 'var(--white)',
              border: '1px solid rgba(10,123,140,0.08)',
              marginBottom: 10,
              WebkitTapHighlightColor: 'transparent',
            }}>
              <div style={{
                width: 56, height: 56, borderRadius: 14, flexShrink: 0, position: 'relative',
                background: avatarGradient(c.slug),
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontWeight: 600, fontSize: 18, overflow: 'hidden',
              }}>
                {c.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img loading="lazy" decoding="async" src={c.image} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : initialsOf(c.name)}
                {!c.is_public && (
                  <div style={{ position: 'absolute', top: -4, right: -4, background: '#c96e2a', color: '#fff', fontSize: 9, fontWeight: 600, borderRadius: 8, padding: '2px 5px', border: '2px solid var(--white)' }}>
                    privat
                  </div>
                )}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--txt)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {c.name}
                  </span>
                  {c.is_member && (
                    <span style={{ fontSize: 10, fontWeight: 600, color: '#1e5c82', background: 'rgba(30,92,130,0.10)', borderRadius: 6, padding: '2px 6px', flexShrink: 0 }}>
                      MEDLEM
                    </span>
                  )}
                </div>
                {c.description && (
                  <p style={{ fontSize: 13, color: 'var(--txt3)', margin: '4px 0 0', lineHeight: 1.4,
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {c.description}
                  </p>
                )}
                <div style={{ display: 'flex', gap: 10, marginTop: 6, fontSize: 11, color: 'var(--txt3)' }}>
                  <span>{c.member_count ?? 0} medlemmar</span>
                  {c.region && <span>· {c.region}</span>}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {showCreate && me && (
        <CreateClubModal
          onClose={() => setShowCreate(false)}
          onCreated={(conversationId, slug) => {
            setShowCreate(false)
            if (conversationId) router.push(`/meddelanden/${conversationId}`)
            else router.push(`/klubb/${slug}`)
          }}
          supabase={supabase}
          userId={me}
        />
      )}

      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )
}

function EmptyState({ emoji, title, body, cta }: {
  emoji: string; title: string; body: string
  cta?: { href: string; label: string; onClick?: () => void }
}) {
  return (
    <div style={{ padding: '60px 20px', textAlign: 'center' }}>
      <div style={{ fontSize: 48, marginBottom: 10 }}>{emoji}</div>
      <h2 style={{ fontSize: 16, fontWeight: 600, color: '#1e5c82', marginBottom: 6 }}>{title}</h2>
      <p style={{ fontSize: 13, color: 'var(--txt3)', marginBottom: 18, lineHeight: 1.5 }}>{body}</p>
      {cta && (
        cta.onClick ? (
          <button onClick={cta.onClick} style={{ padding: '10px 22px', borderRadius: 14, background: 'linear-gradient(135deg,#1e5c82,#2d7d8a)', color: '#fff', fontWeight: 700, fontSize: 13, border: 'none', cursor: 'pointer' }}>
            {cta.label}
          </button>
        ) : (
          <Link href={cta.href} style={{ display: 'inline-block', padding: '10px 22px', borderRadius: 14, background: 'linear-gradient(135deg,#1e5c82,#2d7d8a)', color: '#fff', fontWeight: 700, fontSize: 13, textDecoration: 'none' }}>
            {cta.label}
          </Link>
        )
      )}
    </div>
  )
}

function CreateClubModal({
  onClose, onCreated, supabase, userId,
}: {
  onClose: () => void
  onCreated: (conversationId: string, slug: string) => void
  supabase: ReturnType<typeof createClient>
  userId: string
}) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [region, setRegion] = useState('')
  const [isPublic, setIsPublic] = useState(true)
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  async function submit() {
    if (name.trim().length < 2) { setErr('Namnet är för kort.'); return }
    setBusy(true); setErr(null)
    const res = await createClub(supabase, userId, {
      name: name.trim(),
      description: description.trim() || null,
      region: region.trim() || null,
      is_public: isPublic,
    })
    setBusy(false)
    if (!res) { setErr('Kunde inte skapa klubb. Försök igen.'); return }
    onCreated(res.conversationId, res.club.slug)
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 100,
      background: 'rgba(0,0,0,0.5)',
      display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
    }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{
        width: '100%', maxWidth: 520, background: 'var(--white)',
        borderRadius: '20px 20px 0 0', padding: 20, paddingBottom: 30,
      }}>
        <div style={{ width: 40, height: 4, background: 'rgba(10,123,140,0.20)', borderRadius: 2, margin: '0 auto 16px' }} />
        <h2 style={{ fontSize: 18, fontWeight: 600, color: 'var(--txt)', margin: '0 0 14px' }}>Skapa klubb</h2>

        <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--txt2)', marginBottom: 4 }}>Namn</label>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="T.ex. Sandhamns segelsällskap" maxLength={60}
          style={{ width: '100%', padding: 10, borderRadius: 10, border: '1px solid rgba(10,123,140,0.20)', fontSize: 14, marginBottom: 12, background: 'var(--bg)', color: 'var(--txt)' }} />

        <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--txt2)', marginBottom: 4 }}>Beskrivning</label>
        <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Vilka är ni? Vad delar ni?" maxLength={200} rows={2}
          style={{ width: '100%', padding: 10, borderRadius: 10, border: '1px solid rgba(10,123,140,0.20)', fontSize: 14, marginBottom: 12, background: 'var(--bg)', color: 'var(--txt)', resize: 'vertical', fontFamily: 'inherit' }} />

        <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--txt2)', marginBottom: 4 }}>Region (valfritt)</label>
        <input value={region} onChange={e => setRegion(e.target.value)} placeholder="T.ex. Stockholms skärgård" maxLength={40}
          style={{ width: '100%', padding: 10, borderRadius: 10, border: '1px solid rgba(10,123,140,0.20)', fontSize: 14, marginBottom: 12, background: 'var(--bg)', color: 'var(--txt)' }} />

        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          {[{ v: true, label: 'Publik', sub: 'Alla kan se & gå med' }, { v: false, label: 'Privat', sub: 'Bara via inbjudan' }].map(opt => (
            <button key={String(opt.v)} onClick={() => setIsPublic(opt.v)}
              style={{
                flex: 1, padding: '10px 8px', borderRadius: 12,
                border: isPublic === opt.v ? '2px solid #1e5c82' : '2px solid rgba(10,123,140,0.10)',
                background: isPublic === opt.v ? 'rgba(30,92,130,0.06)' : 'var(--bg)',
                cursor: 'pointer', textAlign: 'left',
              }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--txt)' }}>{opt.label}</div>
              <div style={{ fontSize: 11, color: 'var(--txt3)', marginTop: 2 }}>{opt.sub}</div>
            </button>
          ))}
        </div>

        {err && <div style={{ color: '#c03', fontSize: 12, marginBottom: 10 }}>{err}</div>}

        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={onClose} disabled={busy}
            style={{ flex: 1, padding: 12, borderRadius: 12, border: '1px solid rgba(10,123,140,0.20)', background: 'transparent', fontWeight: 700, fontSize: 14, color: 'var(--txt)', cursor: 'pointer' }}>
            Avbryt
          </button>
          <button onClick={submit} disabled={busy || name.trim().length < 2}
            style={{ flex: 2, padding: 12, borderRadius: 12, border: 'none', background: 'linear-gradient(135deg,#1e5c82,#2d7d8a)', color: '#fff', fontWeight: 600, fontSize: 14, cursor: busy ? 'wait' : 'pointer', opacity: busy || name.trim().length < 2 ? 0.6 : 1 }}>
            {busy ? 'Skapar…' : 'Skapa klubb'}
          </button>
        </div>
      </div>
    </div>
  )
}
