'use client'

import { arBlockerad, BLOCKERAD_TEXT } from '@/lib/blocks'
import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase'
import { findOrCreateDM } from '@/lib/dm'
import { avatarGradient, initialsOf } from '@/lib/utils'
import { toast } from '@/components/Toast'
import { etikettFor, samtalPerPerson, type BefintligtSamtal, type Etikett } from '@/lib/nyttSamtal'

type Candidate = {
 id: string
 username: string
 avatar: string | null
 mutual: boolean // true = båda följer varandra
 etikett: Etikett // texten under namnet, se lib/nyttSamtal
}

export default function NyKonversationPage() {
 return (
 <Suspense fallback={null}>
 <NyKonversationInner />
 </Suspense>
 )
}

function NyKonversationInner() {
 const router = useRouter()
 const search = useSearchParams()
 const autoTo = search?.get('to') ?? null
 // Loppis-flöde: när någon trycker Kontakta på en annons skickas
 // ?to=<säljarId>&about=<threadId>&title=<annons-titel>. Vi pre-fyller
 // då meddelandet med en intro så ägaren direkt ser vad det handlar om.
 const aboutThreadId  = search?.get('about') ?? null
 const aboutTitle     = search?.get('title') ?? null
 const supabase = useRef(createClient()).current

 const [me, setMe] = useState<string | null>(null)
 const [candidates, setCandidates] = useState<Candidate[]>([])
 const [loading, setLoading] = useState(true)
 const [query, setQuery] = useState('')
 const [starting, setStarting] = useState<string | null>(null) // user id som är under skapande

 // Bootstrap
 useEffect(() => {
 let cancel = false
 async function boot() {
 const { data: { user } } = await supabase.auth.getUser()
 if (cancel) return
 if (!user) { router.push('/logga-in'); return }
 setMe(user.id)

 // 1. Alla jag följer
 const { data: iFollow } = await supabase
 .from('follows')
 .select('following_id')
 .eq('follower_id', user.id)

 const followIds = (iFollow ?? []).map(r => r.following_id as string)
 if (followIds.length === 0) { setCandidates([]); setLoading(false); return }

 // 2. De som följer mig — för mutual-flag
 const { data: followMe } = await supabase
 .from('follows')
 .select('follower_id')
 .eq('following_id', user.id)
 .in('follower_id', followIds)
 const mutualSet = new Set((followMe ?? []).map(r => r.follower_id as string))

 // 3. Användardata
 const { data: users } = await supabase
 .from('users')
 .select('id, username, avatar')
 .in('id', followIds)

 // 4. Befintliga 1:1-samtal med dem. starta_dm öppnar ett sådant samtal i
 //    stället för att skicka en ny förfrågan, så texten under namnet ska
 //    utgå från det (rättat 2026-11-26).
 const { data: minaDelar } = await supabase
 .from('conversation_participants')
 .select('conversation_id')
 .eq('user_id', user.id)
 const minaIds = (minaDelar ?? []).map(r => r.conversation_id as string)
 let samtalMed = new Map<string, BefintligtSamtal>()
 if (minaIds.length > 0) {
 const [{ data: deras }, { data: samtal }] = await Promise.all([
 supabase.from('conversation_participants')
 .select('conversation_id, user_id')
 .in('conversation_id', minaIds)
 .in('user_id', followIds),
 supabase.from('conversations')
 .select('id, status, created_by, last_message_at')
 .in('id', minaIds)
 .eq('is_group', false),
 ])
 samtalMed = samtalPerPerson(
 (deras ?? []) as { conversation_id: string; user_id: string }[],
 (samtal ?? []) as { id: string; status: string | null; created_by: string | null; last_message_at: string | null }[],
 user.id,
 )
 }

 const list: Candidate[] = (users ?? [])
 .map(u => {
 const mutual = mutualSet.has(u.id as string)
 return {
 id: u.id as string,
 username: u.username as string,
 avatar: (u.avatar as string | null) ?? null,
 mutual,
 etikett: etikettFor(samtalMed.get(u.id as string), mutual, user.id),
 }
 })
 .sort((a, b) => {
 // Vänner först, sen alfabetiskt
 if (a.mutual !== b.mutual) return a.mutual ? -1 : 1
 return a.username.localeCompare(b.username, 'sv')
 })

 if (cancel) return
 setCandidates(list)
 setLoading(false)

 // Auto-start om ?to=… givet
 if (autoTo && !cancel) {
 startDM(user.id, autoTo)
 }
 }
 boot()
 return () => { cancel = true }
 // eslint-disable-next-line react-hooks/exhaustive-deps
 }, [])

 async function startDM(myId: string, otherId: string) {
 if (myId === otherId) return
 setStarting(otherId)
 const res = await findOrCreateDM(supabase, myId, otherId)
 if (!res) {
 toast((await arBlockerad(supabase, myId, otherId)) ? BLOCKERAD_TEXT : 'Kunde inte starta konversation. Försök igen.', 'error')
 setStarting(null)
 return
 }
 // Loppis-pre-fill: spara intro-text i sessionStorage så
 // /meddelanden/[id]-sidan kan plocka upp den och förlada textarea.
 if (aboutThreadId && aboutTitle && typeof window !== 'undefined') {
 const intro = `Hej! Jag är intresserad av din annons "${aboutTitle}", finns den fortfarande?\n\nhttps://svalla.se/forum/loppis/${aboutThreadId}`
 try {
 sessionStorage.setItem(`dm-prefill:${res.id}`, intro)
 } catch { /* ignore */ }
 }
 router.push(`/meddelanden/${res.id}`)
 }

 const filtered = useMemo(() => {
 const q = query.trim().toLowerCase()
 if (!q) return candidates
 return candidates.filter(c => c.username.toLowerCase().includes(q))
 }, [candidates, query])

 const mutuals = filtered.filter(c => c.mutual)
 const requests = filtered.filter(c => !c.mutual)

 return (
 <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: 40 }}>
 {/* Header */}
 {/* Samma glas och linje som inkorgen och samtalen. Förut --header-bg, som
     fortfarande är den gamla kalla vita och stack ut mot den varma sanden. */}
 <header style={{
 position: 'sticky', top: 0, zIndex: 50,
 background: 'var(--md-glas)',
 backdropFilter: 'saturate(1.6) blur(16px)', WebkitBackdropFilter: 'saturate(1.6) blur(16px)',
 borderBottom: '1px solid var(--md-linje)',
 }}>
 <div style={{ maxWidth: 520, margin: '0 auto', padding: 'calc(12px + env(safe-area-inset-top, 0px)) 16px 10px' }}>
 <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
 <Link href="/meddelanden" aria-label="Tillbaka" style={{
 width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
 background: 'var(--md-vald)',
 display: 'flex', alignItems: 'center', justifyContent: 'center',
 }}>
 <svg viewBox="0 0 24 24" fill="none" stroke="var(--sea)" strokeWidth={2.5} style={{ width: 17, height: 17 }}>
 <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
 </svg>
 </Link>
 <h1 style={{ flex: 1, fontSize: 18, fontWeight: 600, color: 'var(--txt)', margin: 0 }}>
 Ny konversation
 </h1>
 </div>

 {/* Sökfält */}
 <div style={{ marginTop: 10, position: 'relative' }}>
 <svg viewBox="0 0 24 24" fill="none" stroke="var(--txt3)" strokeWidth={2}
 style={{ width: 16, height: 16, position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }}>
 <circle cx="11" cy="11" r="8" /><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35" />
 </svg>
 <input
 type="text"
 placeholder="Sök bland personer du följer…"
 value={query}
 onChange={(e) => setQuery(e.target.value)}
 style={{
 width: '100%', boxSizing: 'border-box',
 padding: '11px 14px 11px 38px', borderRadius: 12,
 border: 0,
 background: 'var(--bg)', color: 'var(--txt)',
 // 16 px: mindre text får iPhone att zooma in sidan när fältet får fokus.
 fontSize: 16, fontWeight: 400,
 outline: 'none',
 }}
 />
 </div>
 </div>
 </header>

 <div style={{ maxWidth: 520, margin: '0 auto', padding: '8px 0' }}>
 {loading && (
 <div style={{ padding: 40, textAlign: 'center' }}>
 <div style={{
 width: 24, height: 24, borderRadius: '50%',
 border: '2.5px solid #1e5c82', borderTopColor: 'transparent',
 animation: 'spin .7s linear infinite', display: 'inline-block',
 }} />
 </div>
 )}

 {!loading && candidates.length === 0 && (
 <div style={{ padding: '60px 20px', textAlign: 'center' }}>
 <div style={{ fontSize: 48, marginBottom: 12 }}> </div>
 <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--sea)', marginBottom: 6 }}>
 Du följer inte någon ännu
 </h2>
 <p style={{ fontSize: 13, color: 'var(--txt3)', marginBottom: 18, lineHeight: 1.5 }}>
 Hitta folk att följa i flödet, sen kan du skriva till dem.
 </p>
 <Link href="/feed" style={{
 display: 'inline-block', padding: '10px 22px', borderRadius: 14,
 background: 'var(--grad-sea)',
 color: '#fff', fontWeight: 700, fontSize: 13, textDecoration: 'none',
 }}>
 Till flödet →
 </Link>
 </div>
 )}

 {!loading && candidates.length > 0 && filtered.length === 0 && (
 <div style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--txt3)', fontSize: 14 }}>
 Inga träffar för &quot;{query}&quot;
 </div>
 )}

 {!loading && mutuals.length > 0 && (
 <Section title="Vänner" subtitle="Ni följer varandra">
 {mutuals.map(c => (
 <Row key={c.id} c={c} starting={starting === c.id} onClick={() => me && startDM(me, c.id)} />
 ))}
 </Section>
 )}

 {!loading && requests.length > 0 && (
 <Section
 title="Du följer"
 subtitle="De följer inte dig. Ett nytt samtal blir en förfrågan."
 >
 {requests.map(c => (
 <Row key={c.id} c={c} starting={starting === c.id} onClick={() => me && startDM(me, c.id)} />
 ))}
 </Section>
 )}
 </div>

 <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
 </div>
 )
}

function Section({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
 return (
 <section style={{ marginTop: 8 }}>
 <div style={{ padding: '14px 16px 6px' }}>
 <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: 0.6 }}>
 {title}
 </div>
 {subtitle && (
 <div style={{ fontSize: 12, color: 'var(--txt3)', marginTop: 2 }}>{subtitle}</div>
 )}
 </div>
 <div>{children}</div>
 </section>
 )
}

function Row({ c, starting, onClick }: {
 c: Candidate
 starting: boolean
 onClick: () => void
}) {
 const grad = avatarGradient(c.username)
 const initials = initialsOf(c.username)
 return (
 <button
 onClick={onClick}
 disabled={starting}
 style={{
 display: 'flex', alignItems: 'center', gap: 12,
 width: '100%', textAlign: 'left',
 padding: '11px 16px',
 border: 'none', borderBottom: '1px solid var(--md-linje)',
 background: 'transparent', cursor: starting ? 'default' : 'pointer',
 WebkitTapHighlightColor: 'transparent',
 opacity: starting ? 0.6 : 1,
 }}
 >
 <div style={{
 width: 44, height: 44, borderRadius: '50%', flexShrink: 0,
 background: grad,
 display: 'flex', alignItems: 'center', justifyContent: 'center',
 color: '#fff', fontWeight: 600, fontSize: 15, overflow: 'hidden',
 position: 'relative',
 }}>
 {c.avatar ? (
 <Image src={c.avatar} alt="" fill sizes="44px" style={{ objectFit: 'cover' }} />
 ) : initials}
 </div>
 <div style={{ flex: 1, minWidth: 0 }}>
 <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--txt)' }}>{c.username}</div>
 {c.etikett && (
 <div style={{
 fontSize: 12, fontWeight: 600, marginTop: 2,
 color: c.etikett.ton === 'acc' ? 'var(--acc-text, var(--acc))' : 'var(--txt3)',
 }}>
 {c.etikett.text}
 </div>
 )}
 </div>
 {starting ? (
 <div style={{
 width: 16, height: 16, borderRadius: '50%',
 border: '2px solid #1e5c82', borderTopColor: 'transparent',
 animation: 'spin .7s linear infinite', flexShrink: 0,
 }} />
 ) : (
 <svg viewBox="0 0 24 24" fill="none" stroke="var(--txt3)" strokeWidth={2.5} style={{ width: 16, height: 16, flexShrink: 0 }}>
 <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
 </svg>
 )}
 </button>
 )
}
