'use client'
/**
 * Svalla Wrapped — personliga insights.
 * Scope: hela tiden / specifikt år (default innevarande år).
 * Renderar hero-stats, top-tur, båtfördelning, platser, månad/streak
 * samt en "share"-knapp som kopierar en sammanfattningstext.
 */
import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase'
import { computeInsights, type Insights } from '@/lib/insights'

type Scope = 'all' | number

export default function InsikterPage() {
 const supabase = useRef(createClient()).current
 const [userId, setUserId] = useState<string | null>(null)
 const [username, setUsername] = useState<string | null>(null)
 const [avatar, setAvatar] = useState<string | null>(null)
 const [scope, setScope] = useState<Scope>(new Date().getFullYear())
 const [insights, setInsights] = useState<Insights | null>(null)
 const [loading, setLoading] = useState(true)
 const [shared, setShared] = useState(false)

 useEffect(() => {
 let cancelled = false
 ;(async () => {
 setLoading(true)
 const { data: { user } } = await supabase.auth.getUser()
 if (!user) { if (!cancelled) setLoading(false); return }
 setUserId(user.id)
 const { data: me } = await supabase
 .from('users').select('username, avatar').eq('id', user.id).maybeSingle()
 if (me) { setUsername(me.username); setAvatar(me.avatar) }
 const i = await computeInsights(
 supabase,
 user.id,
 scope === 'all' ? 'all' : 'year',
 scope === 'all' ? undefined : scope,
 )
 if (!cancelled) { setInsights(i); setLoading(false) }
 })()
 return () => { cancelled = true }
 }, [supabase, scope])

 const thisYear = new Date().getFullYear()
 const yearChoices = useMemo(() => [thisYear, thisYear - 1, thisYear - 2], [thisYear])

 async function share() {
 if (!insights) return
 const label = scope === 'all' ? 'hela mitt äventyr' : `${scope}`
 const txt =
 `Min Svalla Wrapped (${label}):\n` +
 `${insights.total_trips} turer · ${Math.round(insights.total_nm)} NM · ⏱ ${insights.total_hours.toFixed(1)} h\n` +
 `🏆 ${insights.magic_count} magiska turer · 🚀 Topp ${insights.top_speed.toFixed(1)} kn\n` +
 (insights.most_active_month ? `📅 Mest aktiv: ${insights.most_active_month.label}\n` : '') +
 `→ svalla.se${username ? `/u/${username}` : ''}`
 try {
 if (navigator.share) {
 await navigator.share({ title: 'Min Svalla Wrapped', text: txt })
 } else {
 await navigator.clipboard.writeText(txt)
 }
 setShared(true)
 setTimeout(() => setShared(false), 2000)
 } catch { /* avbruten */ }
 }

 return (
 <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: 120 }}>
 {/* Header */}
 <div style={{
 background: 'var(--header-bg, var(--glass-96))',
 backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
 borderBottom: '1px solid rgba(10,123,140,0.10)',
 padding: '12px 16px',
 position: 'sticky', top: 0, zIndex: 50,
 }}>
 <div style={{ display: 'flex', alignItems: 'center', gap: 10, maxWidth: 560, margin: '0 auto' }}>
 <Link href="/profil" style={{
 width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
 background: 'rgba(10,123,140,0.07)',
 display: 'flex', alignItems: 'center', justifyContent: 'center',
 }}>
 <svg viewBox="0 0 24 24" fill="none" stroke="var(--sea)" strokeWidth={2.5} style={{ width: 17, height: 17 }}>
 <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
 </svg>
 </Link>
 <div style={{ flex: 1, minWidth: 0 }}>
 <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--acc)', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
 Svalla Wrapped
 </div>
 <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--txt)' }}>
 Dina insights
 </div>
 </div>
 <button
 onClick={share}
 disabled={!insights || insights.total_trips === 0}
 style={{
 padding: '8px 14px', borderRadius: 20, border: 'none', cursor: 'pointer',
 background: shared ? '#228c38' : 'var(--grad-acc)',
 color: '#fff', fontSize: 12, fontWeight: 600,
 opacity: !insights || insights.total_trips === 0 ? 0.5 : 1,
 WebkitTapHighlightColor: 'transparent',
 }}
 >
 {shared ? '✓ Delad' : 'Dela'}
 </button>
 </div>

 {/* Scope-toggle */}
 <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingTop: 10, maxWidth: 560, margin: '0 auto', scrollbarWidth: 'none' }}>
 {[...yearChoices, 'all' as const].map(v => {
 const active = scope === v
 const label = v === 'all' ? 'Hela tiden' : String(v)
 return (
 <button
 key={String(v)}
 onClick={() => setScope(v)}
 style={{
 flexShrink: 0, padding: '6px 14px', borderRadius: 20, border: 'none', cursor: 'pointer',
 background: active ? 'var(--sea)' : 'rgba(10,123,140,0.07)',
 color: active ? '#fff' : '#3a6a80',
 fontSize: 12, fontWeight: 700,
 WebkitTapHighlightColor: 'transparent',
 }}
 >
 {label}
 </button>
 )
 })}
 </div>
 </div>

 <div style={{ maxWidth: 560, margin: '0 auto', padding: '16px 14px' }}>
 {loading && (
 <div style={{ display: 'flex', justifyContent: 'center', padding: '60px 0' }}>
 <div style={{ width: 26, height: 26, borderRadius: '50%', border: '2.5px solid #1e5c82', borderTopColor: 'transparent', animation: 'spin .8s linear infinite' }} />
 </div>
 )}

 {!loading && !userId && (
 <div style={{ textAlign: 'center', padding: '60px 20px' }}>
 <div style={{ fontSize: 48, marginBottom: 12 }}>🔒</div>
 <p style={{ fontSize: 14, color: 'var(--txt3)', marginBottom: 16 }}>Logga in för att se dina insights.</p>
 <Link href="/logga-in" style={{
 display: 'inline-block', padding: '10px 22px', borderRadius: 14,
 background: 'var(--grad-sea)',
 color: '#fff', fontSize: 13, fontWeight: 600, textDecoration: 'none',
 }}>
 Logga in
 </Link>
 </div>
 )}

 {!loading && insights && insights.total_trips === 0 && (
 <div style={{ textAlign: 'center', padding: '60px 20px' }}>
 <div style={{ fontSize: 48, marginBottom: 12 }}> </div>
 <p style={{ fontSize: 14, color: 'var(--txt3)', marginBottom: 16 }}>
 {scope === 'all' ? 'Inga turer än — logga din första och kom tillbaka!' : `Inga turer loggade under ${scope}.`}
 </p>
 <Link href="/logga" style={{
 display: 'inline-block', padding: '10px 22px', borderRadius: 14,
 background: 'var(--grad-acc)',
 color: '#fff', fontSize: 13, fontWeight: 600, textDecoration: 'none',
 }}>
 Logga tur →
 </Link>
 </div>
 )}

 {!loading && insights && insights.total_trips > 0 && (
 <>
 {/* Hero-kort */}
 <div style={{
 position: 'relative', overflow: 'hidden', borderRadius: 24, padding: '24px 20px',
 background: 'linear-gradient(135deg, #0a3a5a 0%, #1e5c82 45%, #2d7d8a 100%)',
 color: '#fff', marginBottom: 18,
 boxShadow: '0 8px 32px rgba(10,60,90,0.25)',
 }}>
 <div aria-hidden style={{
 position: 'absolute', inset: 0, pointerEvents: 'none',
 background: 'radial-gradient(circle at 80% -10%, rgba(201,110,42,0.35) 0%, transparent 55%)',
 }} />
 <div style={{ position: 'relative', zIndex: 1 }}>
 <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
 <div style={{
 width: 44, height: 44, borderRadius: '50%', overflow: 'hidden',
 background: 'rgba(255,255,255,0.15)',
 display: 'flex', alignItems: 'center', justifyContent: 'center',
 fontSize: 18, fontWeight: 700,
 }}>
 {avatar
 ? <Image src={avatar} alt="" width={44} height={44} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
 : username?.[0]?.toUpperCase() ?? ''
 }
 </div>
 <div>
 <div style={{ fontSize: 11, fontWeight: 600, opacity: 0.75, textTransform: 'uppercase', letterSpacing: '0.8px' }}>
 {scope === 'all' ? 'Hela ditt äventyr' : `Ditt år ${scope}`}
 </div>
 <div style={{ fontSize: 16, fontWeight: 700 }}>
 {username ? `@${username}` : 'Din sammanfattning'}
 </div>
 </div>
 </div>

 <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
 <HeroStat label="Turer" value={String(insights.total_trips)} />
 <HeroStat label="Nautiska mil" value={Math.round(insights.total_nm).toLocaleString('sv-SE')} />
 <HeroStat label="Timmar" value={insights.total_hours.toFixed(1)} />
 </div>
 </div>
 </div>

 {/* Top-tur */}
 {insights.top_nm_trip && (
 <SectionTitle emoji="🏅" text="Längsta tur" />
 )}
 {insights.top_nm_trip && (
 <Link href={`/tur/${insights.top_nm_trip.id}`} style={{ textDecoration: 'none' }}>
 <div style={{
 background: 'var(--white)', borderRadius: 18, padding: '14px 16px',
 border: '1px solid rgba(10,123,140,0.10)', boxShadow: '0 2px 10px rgba(0,45,60,0.06)',
 display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18,
 WebkitTapHighlightColor: 'transparent',
 }}>
 <div style={{
 width: 52, height: 52, borderRadius: 14,
 background: 'var(--grad-acc)',
 display: 'flex', alignItems: 'center', justifyContent: 'center',
 color: '#fff', fontSize: 22, flexShrink: 0,
 }}> </div>
 <div style={{ flex: 1, minWidth: 0 }}>
 <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--txt)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
 {insights.top_nm_trip.location_name ?? 'Okänd plats'}
 </div>
 <div style={{ fontSize: 12, color: 'var(--txt3)', marginTop: 2 }}>
 {(insights.top_nm_trip.distance ?? 0).toFixed(1)} NM · {Math.round((insights.top_nm_trip.duration ?? 0) / 60)} h
 {insights.top_nm_trip.max_speed_knots ? ` · topp ${insights.top_nm_trip.max_speed_knots.toFixed(1)} kn` : ''}
 </div>
 </div>
 <svg viewBox="0 0 24 24" fill="none" stroke="#c0d4dc" strokeWidth={2} style={{ width: 14, height: 14, flexShrink: 0 }}>
 <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
 </svg>
 </div>
 </Link>
 )}

 {/* Nyckelstats-grid */}
 <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10, marginBottom: 18 }}>
 <SmallStat emoji="🚀" label="Topphastighet" value={`${insights.top_speed.toFixed(1)} kn`} />
 <SmallStat emoji="✨" label="Magiska turer" value={String(insights.magic_count)} />
 <SmallStat emoji="📅" label="Aktiva dagar" value={String(insights.active_days)} />
 <SmallStat emoji="" label="Längsta streak" value={`${insights.longest_streak_weeks} v`} />
 <SmallStat emoji="" label="Gryningsturer" value={String(insights.sunrise_trips)} />
 <SmallStat emoji="🌙" label="Kvällsturer" value={String(insights.sunset_trips)} />
 </div>

 {/* Mest aktiv månad */}
 {insights.most_active_month && (
 <>
 <SectionTitle emoji="📈" text="Mest aktiv månad" />
 <div style={{
 background: 'linear-gradient(135deg, rgba(30,92,130,0.06), rgba(201,110,42,0.08))',
 border: '1px solid rgba(10,123,140,0.12)',
 borderRadius: 18, padding: '14px 16px', marginBottom: 18,
 display: 'flex', alignItems: 'center', gap: 14,
 }}>
 <div style={{
 width: 52, height: 52, borderRadius: 14, flexShrink: 0,
 background: 'var(--white)',
 display: 'flex', alignItems: 'center', justifyContent: 'center',
 fontSize: 26,
 }}>📆</div>
 <div style={{ flex: 1, minWidth: 0 }}>
 <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--txt)', textTransform: 'capitalize' }}>
 {insights.most_active_month.label}
 </div>
 <div style={{ fontSize: 12, color: 'var(--txt3)', marginTop: 2 }}>
 {insights.most_active_month.count} {insights.most_active_month.count === 1 ? 'tur' : 'turer'}
 </div>
 </div>
 </div>
 </>
 )}

 {/* Boat breakdown */}
 {insights.boat_breakdown.length > 0 && (
 <>
 <SectionTitle emoji="" text={`Båtfördelning · ${insights.unique_boat_types} typer`} />
 <div style={{
 background: 'var(--white)', borderRadius: 18, padding: '14px 16px',
 border: '1px solid rgba(10,123,140,0.09)', boxShadow: '0 1px 4px rgba(0,45,60,0.05)',
 marginBottom: 18,
 }}>
 <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
 {insights.boat_breakdown.slice(0, 5).map(b => (
 <div key={b.type}>
 <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
 <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--txt)' }}>{b.type}</span>
 <span style={{ fontSize: 11, color: 'var(--txt3)', fontWeight: 600 }}>
 {b.count} · {Math.round(b.share * 100)}%
 </span>
 </div>
 <div style={{ height: 8, borderRadius: 8, background: 'rgba(10,123,140,0.09)', overflow: 'hidden' }}>
 <div style={{
 width: `${Math.max(4, b.share * 100)}%`, height: '100%',
 background: 'var(--grad-sea)',
 borderRadius: 8,
 }} />
 </div>
 </div>
 ))}
 </div>
 </div>
 </>
 )}

 {/* Top places */}
 {insights.top_places.length > 0 && (
 <>
 <SectionTitle emoji="" text="Dina favoritplatser" />
 <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 18 }}>
 {insights.top_places.map((p, idx) => (
 <div key={p.name} style={{
 display: 'flex', alignItems: 'center', gap: 12,
 background: 'var(--white)', borderRadius: 14, padding: '10px 14px',
 border: '1px solid rgba(10,123,140,0.09)',
 }}>
 <div style={{
 width: 28, height: 28, borderRadius: '50%',
 background: idx === 0 ? 'var(--grad-acc)' : 'rgba(10,123,140,0.08)',
 color: idx === 0 ? '#fff' : 'var(--sea)',
 display: 'flex', alignItems: 'center', justifyContent: 'center',
 fontSize: 13, fontWeight: 700, flexShrink: 0,
 }}>{idx + 1}</div>
 <div style={{ flex: 1, minWidth: 0, fontSize: 14, fontWeight: 700, color: 'var(--txt)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
 {p.name}
 </div>
 <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--txt3)' }}>
 {p.count}×
 </div>
 </div>
 ))}
 </div>
 </>
 )}

 {/* Social / achievements */}
 <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10, marginBottom: 20 }}>
 <SmallStat emoji="👥" label="Följare" value={String(insights.total_followers)} />
 <SmallStat emoji="🏆" label="Märken" value={String(insights.total_achievements)} />
 </div>

 {/* Share-CTA */}
 <button
 onClick={share}
 style={{
 width: '100%', padding: 14, borderRadius: 16, border: 'none', cursor: 'pointer',
 background: shared ? '#228c38' : 'var(--grad-acc)',
 color: '#fff', fontSize: 14, fontWeight: 700,
 boxShadow: '0 4px 14px rgba(201,110,42,0.28)',
 WebkitTapHighlightColor: 'transparent',
 }}
 >
 {shared ? '✓ Sammanfattning kopierad!' : 'Dela din Wrapped ↗'}
 </button>

 <p style={{ fontSize: 11, color: 'var(--txt3)', textAlign: 'center', marginTop: 14 }}>
 Statistiken räknas om live från dina loggade turer.
 </p>
 </>
 )}
 </div>

 <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
 </div>
 )
}

function HeroStat({ label, value }: { label: string; value: string }) {
 return (
 <div style={{
 background: 'rgba(255,255,255,0.10)', borderRadius: 12, padding: '10px 8px',
 textAlign: 'center', backdropFilter: 'blur(4px)',
 }}>
 <div style={{ fontSize: 22, fontWeight: 700, lineHeight: 1.1 }}>{value}</div>
 <div style={{ fontSize: 10, fontWeight: 700, opacity: 0.78, textTransform: 'uppercase', letterSpacing: '0.6px', marginTop: 3 }}>
 {label}
 </div>
 </div>
 )
}

function SmallStat({ emoji, label, value }: { emoji: string; label: string; value: string }) {
 return (
 <div style={{
 background: 'var(--white)', borderRadius: 14, padding: '12px 14px',
 border: '1px solid rgba(10,123,140,0.09)', boxShadow: '0 1px 4px rgba(0,45,60,0.04)',
 display: 'flex', alignItems: 'center', gap: 10,
 }}>
 <div style={{ fontSize: 22, flexShrink: 0 }}>{emoji}</div>
 <div style={{ flex: 1, minWidth: 0 }}>
 <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--txt)', lineHeight: 1.1 }}>{value}</div>
 <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: '0.4px', marginTop: 2 }}>
 {label}
 </div>
 </div>
 </div>
 )
}

function SectionTitle({ emoji, text }: { emoji: string; text: string }) {
 return (
 <div style={{
 fontSize: 11, fontWeight: 600, color: 'var(--txt3)',
 textTransform: 'uppercase', letterSpacing: '0.6px',
 margin: '2px 2px 10px',
 }}>
 {emoji} {text}
 </div>
 )
}
