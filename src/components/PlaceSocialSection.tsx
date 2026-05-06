'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase'
import Icon from '@/components/Icon'
import {
 listCheckInsForPlace, listPlaceVisitors, listReviewsForPlace,
 upsertReview, deleteReview,
 type PlaceCheckIn, type PlaceReview, type PlaceType, type PlaceVisitor,
} from '@/lib/placeSocial'

function timeAgo(iso: string): string {
 const ms = Date.now() - new Date(iso).getTime()
 const min = Math.floor(ms / 60_000)
 if (min < 1) return 'nyss'
 if (min < 60) return `${min} min sen`
 const h = Math.floor(min / 60)
 if (h < 24) return `${h} h sen`
 const d = Math.floor(h / 24)
 if (d < 7) return `${d} d sen`
 return new Date(iso).toLocaleDateString('sv-SE', { day: 'numeric', month: 'short' })
}

function avatarUrl(initial: string, seed: string): string {
 // deterministisk fallback (samma seed ger samma färg)
 let h = 0
 for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) | 0
 const hue = Math.abs(h) % 360
 return `linear-gradient(135deg, hsl(${hue} 60% 50%), hsl(${(hue + 50) % 360} 60% 40%))`
}

function Avatar({ src, name, size = 32 }: { src: string | null | undefined; name: string; size?: number }) {
 const initial = (name?.[0] ?? '?').toUpperCase()
 if (src) {
 return (
 <div style={{ width: size, height: size, borderRadius: '50%', overflow: 'hidden', position: 'relative', flexShrink: 0 }}>
 <Image src={src} alt={name} fill sizes={`${size}px`} style={{ objectFit: 'cover' }} />
 </div>
 )
 }
 return (
 <div style={{
 width: size, height: size, borderRadius: '50%',
 background: avatarUrl(initial, name),
 display: 'flex', alignItems: 'center', justifyContent: 'center',
 color: '#fff', fontSize: size * 0.42, fontWeight: 600, flexShrink: 0,
 }}>{initial}</div>
 )
}

export default function PlaceSocialSection({
 placeId, placeType, placeName,
}: {
 placeId: string
 placeType: PlaceType
 placeName: string
}) {
 const supabase = useRef(createClient()).current
 const [me, setMe] = useState<string | null>(null)
 const [checkIns, setCheckIns] = useState<PlaceCheckIn[]>([])
 const [visitors, setVisitors] = useState<PlaceVisitor[]>([])
 const [reviews, setReviews] = useState<PlaceReview[]>([])
 const [loading, setLoading] = useState(true)
 const [showReviewModal, setShowReviewModal] = useState(false)
 const [myRating, setMyRating] = useState(0)
 const [myBody, setMyBody] = useState('')
 const [saving, setSaving] = useState(false)

 useEffect(() => {
 let cancelled = false
 async function load() {
 const { data: { user } } = await supabase.auth.getUser()
 if (!cancelled) setMe(user?.id ?? null)

 const [c, v, r] = await Promise.all([
 listCheckInsForPlace(supabase, placeId, 12),
 listPlaceVisitors(supabase, placeId, placeType, 24),
 listReviewsForPlace(supabase, placeId, placeType, 20),
 ])
 if (cancelled) return
 setCheckIns(c)
 setVisitors(v)
 setReviews(r)
 // pre-fill review modal med ev. eget existerande omdöme
 if (user) {
 const mine = r.find(rv => rv.user_id === user.id)
 if (mine) {
 setMyRating(mine.rating)
 setMyBody(mine.body ?? '')
 }
 }
 setLoading(false)
 }
 load()
 return () => { cancelled = true }
 }, [supabase, placeId, placeType])

 async function submitReview() {
 if (!me || myRating < 1) return
 setSaving(true)
 const res = await upsertReview(supabase, me, placeId, placeType, myRating, myBody.trim() || null)
 setSaving(false)
 if (!res) return
 // optimistisk uppdatering
 setReviews(prev => {
 const existing = prev.find(p => p.user_id === me)
 if (existing) return prev.map(p => p.id === existing.id ? { ...res, username: existing.username, avatar: existing.avatar } : p)
 return [{ ...res, username: 'Du', avatar: null }, ...prev]
 })
 setShowReviewModal(false)
 }

 async function removeMyReview() {
 if (!me) return
 if (!confirm('Ta bort ditt omdöme?')) return
 const ok = await deleteReview(supabase, me, placeId, placeType)
 if (ok) {
 setReviews(prev => prev.filter(r => r.user_id !== me))
 setMyRating(0); setMyBody('')
 setShowReviewModal(false)
 }
 }

 const myReview = me ? reviews.find(r => r.user_id === me) : null
 const checkInUrl = `/check-in?place_id=${encodeURIComponent(placeId)}&place_name=${encodeURIComponent(placeName)}&return_to=${encodeURIComponent(`/upptack/${placeId}`)}`

 return (
 <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 14 }}>
 {/* CTA: snabb-checkin */}
 <Link
 href={checkInUrl}
 style={{
 display: 'flex', alignItems: 'center', gap: 12,
 background: 'var(--white)',
 border: '1.5px solid rgba(30,92,130,0.18)',
 borderRadius: 18, padding: '14px 18px', textDecoration: 'none',
 boxShadow: '0 2px 10px rgba(0,45,60,0.06)',
 }}
 >
 <Icon name="pin" style={{ width: 24, height: 24, color: 'var(--sea)' }} />
 <div style={{ flex: 1 }}>
 <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--txt)' }}>Checka in här</div>
 <div style={{ fontSize: 12, color: 'var(--txt3)', marginTop: 1 }}>
 Snabbt &quot;jag är här&quot; — utan full turlogg
 </div>
 </div>
 <svg viewBox="0 0 24 24" fill="none" stroke="var(--sea)" strokeWidth={2.5} style={{ width: 18, height: 18 }}>
 <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
 </svg>
 </Link>

 {/* Besökare */}
 {!loading && visitors.length > 0 && (
 <div>
 <h2 style={{ fontSize: 11, fontWeight: 600, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 10 }}>
 👥 {visitors.length} {visitors.length === 1 ? 'seglare har varit här' : 'seglare har varit här'}
 </h2>
 <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
 {visitors.slice(0, 12).map(v => (
 <Link key={v.user_id} href={`/u/${v.username}`} style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', width: 56 }}>
 <Avatar src={v.avatar} name={v.username} size={48} />
 <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--txt)', marginTop: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 56 }}>
 @{v.username}
 </div>
 {v.visit_count > 1 && (
 <div style={{ fontSize: 9, color: 'var(--txt3)' }}>{v.visit_count}×</div>
 )}
 </Link>
 ))}
 </div>
 </div>
 )}

 {/* Senaste check-ins */}
 {!loading && checkIns.length > 0 && (
 <div>
 <h2 style={{ fontSize: 11, fontWeight: 600, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 10 }}>
 Senaste check-ins
 </h2>
 <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
 {checkIns.map(c => (
 <div key={c.id} style={{
 background: 'var(--white)', borderRadius: 16, padding: 14,
 boxShadow: '0 2px 10px rgba(0,45,60,0.06)',
 display: 'flex', gap: 12,
 }}>
 <Link href={`/u/${c.username ?? ''}`} style={{ flexShrink: 0 }}>
 <Avatar src={c.avatar} name={c.username ?? '?'} size={40} />
 </Link>
 <div style={{ flex: 1, minWidth: 0 }}>
 <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
 <Link href={`/u/${c.username ?? ''}`} style={{ fontSize: 13, fontWeight: 600, color: 'var(--txt)', textDecoration: 'none' }}>
 @{c.username ?? 'okänd'}
 </Link>
 <span style={{ fontSize: 11, color: 'var(--txt3)' }}>· {timeAgo(c.created_at)}</span>
 </div>
 {c.message && (
 <p style={{ fontSize: 13, color: 'var(--txt2)', margin: '4px 0 0', lineHeight: 1.45, whiteSpace: 'pre-wrap' }}>
 {c.message}
 </p>
 )}
 {c.image && (
 <div style={{ position: 'relative', width: '100%', height: 220, borderRadius: 12, overflow: 'hidden', marginTop: 8 }}>
 <Image src={c.image} alt="" fill sizes="(max-width: 640px) 100vw, 480px" style={{ objectFit: 'cover' }} />
 </div>
 )}
 </div>
 </div>
 ))}
 </div>
 </div>
 )}

 {/* Omdömen */}
 <div>
 <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
 <h2 style={{ fontSize: 11, fontWeight: 600, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: '0.6px', margin: 0 }}>
 Omdömen ({reviews.length})
 </h2>
 {me && (
 <button onClick={() => setShowReviewModal(true)}
 style={{
 padding: '6px 12px', borderRadius: 10, border: '1px solid rgba(30,92,130,0.20)',
 background: myReview ? 'rgba(30,92,130,0.08)' : 'var(--white)',
 fontSize: 12, fontWeight: 700, color: 'var(--sea)', cursor: 'pointer',
 }}>
 {myReview ? 'Ändra ditt omdöme' : '+ Skriv omdöme'}
 </button>
 )}
 </div>

 {!loading && reviews.length === 0 && (
 <div style={{
 padding: '20px 16px', borderRadius: 14, border: '1px dashed rgba(10,123,140,0.20)',
 background: 'rgba(10,123,140,0.03)', textAlign: 'center',
 fontSize: 13, color: 'var(--txt3)',
 }}>
 Bli först med att lämna ett omdöme.
 </div>
 )}

 <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
 {reviews.map(r => (
 <div key={r.id} style={{
 background: 'var(--white)', borderRadius: 16, padding: 14,
 boxShadow: '0 2px 10px rgba(0,45,60,0.06)',
 display: 'flex', gap: 12,
 }}>
 <Link href={`/u/${r.username ?? ''}`} style={{ flexShrink: 0 }}>
 <Avatar src={r.avatar} name={r.username ?? '?'} size={40} />
 </Link>
 <div style={{ flex: 1, minWidth: 0 }}>
 <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
 <Link href={`/u/${r.username ?? ''}`} style={{ fontSize: 13, fontWeight: 600, color: 'var(--txt)', textDecoration: 'none' }}>
 @{r.username ?? 'okänd'}
 </Link>
 <span style={{ fontSize: 11, color: 'var(--txt3)' }}>· {timeAgo(r.created_at)}</span>
 </div>
 <div style={{ display: 'flex', gap: 1, marginTop: 4 }}>
 {[1,2,3,4,5].map(i => (
 <span key={i} style={{ fontSize: 12, color: r.rating >= i ? '#e8a020' : 'rgba(10,123,140,0.20)' }}> </span>
 ))}
 </div>
 {r.body && (
 <p style={{ fontSize: 13, color: 'var(--txt2)', margin: '6px 0 0', lineHeight: 1.45, whiteSpace: 'pre-wrap' }}>
 {r.body}
 </p>
 )}
 </div>
 </div>
 ))}
 </div>
 </div>

 {/* Review modal */}
 {showReviewModal && (
 <div style={{
 position: 'fixed', inset: 0, zIndex: 100,
 background: 'rgba(0,0,0,0.5)',
 display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
 }} onClick={() => setShowReviewModal(false)}>
 <div onClick={e => e.stopPropagation()} style={{
 width: '100%', maxWidth: 520, background: 'var(--white)',
 borderRadius: '20px 20px 0 0', padding: 20, paddingBottom: 30,
 }}>
 <div style={{ width: 40, height: 4, background: 'rgba(10,123,140,0.20)', borderRadius: 2, margin: '0 auto 16px' }} />
 <h2 style={{ fontSize: 18, fontWeight: 600, color: 'var(--txt)', margin: '0 0 4px' }}>
 {myReview ? 'Ändra ditt omdöme' : 'Skriv omdöme'}
 </h2>
 <p style={{ fontSize: 12, color: 'var(--txt3)', margin: '0 0 16px' }}>
 {placeName}
 </p>

 <div style={{ display: 'flex', justifyContent: 'center', gap: 6, padding: '8px 0 16px' }}>
 {[1,2,3,4,5].map(i => (
 <button key={i} onClick={() => setMyRating(i)} aria-label={`${i} av 5`}
 style={{
 background: 'transparent', border: 'none', cursor: 'pointer',
 fontSize: 36, padding: 4, lineHeight: 1,
 color: myRating >= i ? '#e8a020' : 'rgba(10,123,140,0.25)',
 transition: 'transform 0.1s',
 }}>
 </button>
 ))}
 </div>

 <textarea value={myBody} onChange={e => setMyBody(e.target.value)}
 placeholder="Vad var bra eller mindre bra? (valfritt)"
 maxLength={1000} rows={4}
 style={{ width: '100%', padding: 12, borderRadius: 12, border: '1px solid rgba(10,123,140,0.20)', fontSize: 14, marginBottom: 6, background: 'var(--bg)', color: 'var(--txt)', resize: 'vertical', fontFamily: 'inherit' }} />
 <div style={{ fontSize: 11, color: 'var(--txt3)', textAlign: 'right', marginBottom: 14 }}>
 {myBody.length}/1000
 </div>

 <div style={{ display: 'flex', gap: 8 }}>
 {myReview && (
 <button onClick={removeMyReview} disabled={saving}
 style={{ padding: 12, borderRadius: 12, border: '1px solid rgba(200,30,30,0.30)', background: 'transparent', fontWeight: 700, fontSize: 14, color: 'var(--red)', cursor: 'pointer' }}>
 Ta bort
 </button>
 )}
 <button onClick={() => setShowReviewModal(false)} disabled={saving}
 style={{ flex: 1, padding: 12, borderRadius: 12, border: '1px solid rgba(10,123,140,0.20)', background: 'transparent', fontWeight: 700, fontSize: 14, color: 'var(--txt)', cursor: 'pointer' }}>
 Avbryt
 </button>
 <button onClick={submitReview} disabled={saving || myRating < 1}
 style={{ flex: 2, padding: 12, borderRadius: 12, border: 'none', background: 'var(--grad-sea)', color: '#fff', fontWeight: 600, fontSize: 14, cursor: (saving || myRating < 1) ? 'not-allowed' : 'pointer', opacity: (saving || myRating < 1) ? 0.6 : 1 }}>
 {saving ? 'Sparar…' : (myReview ? 'Spara ändring' : 'Posta omdöme')}
 </button>
 </div>
 </div>
 </div>
 )}
 </div>
 )
}
