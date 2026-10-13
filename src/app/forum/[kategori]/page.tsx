import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getCategoryById, getThreadsByCategory, formatForumDate } from '@/lib/forum'
import type { Metadata } from 'next'
import Icon, { type IconName } from '@/components/Icon'
import { STATIC_CATEGORIES } from '@/lib/forum-categories'
import LoppisGrid, { type ThreadWithListing } from './LoppisGrid'

function CategoryIcon({ iconName }: { iconName: IconName }) {
 return <Icon name={iconName} size={18} stroke={1.85} />
}

// CACHEBAR (rester efter revisionen, 2026-10-07). Sidan var "ärligt dynamisk"
// sedan 2026-08-02 eftersom den läste searchParams (loppisfiltret) och
// cookies (auth-klienten). Nu läser servern varken det ena eller det andra:
// trådarna hämtas med den cookie-fria klienten (samma publika läspolicy), och
// loppisfiltret ligger i klienten (LoppisGrid.tsx, mönstret från
// ProfileTabs.tsx). Samma intervall som /forum. Uppmätt före: MISS och
// private/no-store på varje besök. Cache-guarden (scripts/guard-cache-regler.mjs)
// vaktar att inget dynamiskt smyger in igen (CLAUDE.md p27).
export const revalidate = 300

/**
 * Utan generateStaticParams hamnar en dynamisk route aldrig i CDN-cachen,
 * även med revalidate satt (CLAUDE.md p18, samma som /forum/[kategori]/[trad]
 * och /upptack/[id]). Kategorierna är kända i koden (STATIC_CATEGORIES); en
 * kategori som bara finns i databasen renderas vid första besöket och cachas
 * sedan (dynamicParams är på som standard).
 */
export function generateStaticParams() {
 return STATIC_CATEGORIES.map(c => ({ kategori: c.id }))
}

interface Props {
 params: Promise<{ kategori: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
 const { kategori } = await params
 const cat = await getCategoryById(kategori, true)
 // SOFT-404-SKYDD: notFound() måste kastas HÄR, inte bara i sidkroppen.
  // loading.tsx gör att svaret streamas — 200-statusen flushas med skalet
  // innan sidkroppen hunnit köra, så ett notFound() där ger 404-INNEHÅLL
  // med STATUS 200 (soft 404, uppmätt live 2026-08-12 på samtliga rutter
  // med loading.tsx). generateMetadata körs före headers och är därför
  // enda stället som kan sätta riktig 404-status.
 if (!cat) notFound()
 const canonicalUrl = `https://svalla.se/forum/${kategori}`
 return {
  title: { absolute: `${cat.name} – Svalla Forum` },
  description: cat.description ?? undefined,
  alternates: { canonical: canonicalUrl },
  openGraph: {
   title: `${cat.name} – Svalla Forum`,
   description: cat.description ?? undefined,
   url: canonicalUrl,
   type: 'website',
  },
 }
}

export default async function ForumKategoriPage({ params }: Props) {
 const { kategori } = await params
 const [cat, threads] = await Promise.all([
 getCategoryById(kategori, true),
 getThreadsByCategory(kategori, 0, true),
 ])

 if (!cat) notFound()

 // Loppis: datum och boost räknas här, vid sidans generering, så att
 // klientkomponenten aldrig behöver klockan (se LoppisGrid.tsx).
 const nu = Date.now()
 const annonser: ThreadWithListing[] = cat.id === 'loppis'
 ? threads.map(t => ({
 id: t.id, title: t.title, body: t.body, created_at: t.created_at,
 skapadText: formatForumDate(t.created_at),
 boostad: typeof t.listing_data?.boosted_until === 'string' && new Date(t.listing_data.boosted_until).getTime() > nu,
 listing_data: t.listing_data ?? null,
 author: t.author ?? null,
 }))
 : []

 const jsonLd = {
 '@context': 'https://schema.org',
 '@type': 'DiscussionForum',
 name: `${cat.name} — Svalla Forum`,
 url: `https://svalla.se/forum/${cat.id}`,
 description: cat.description ?? undefined,
 inLanguage: 'sv',
 numberOfItems: threads.length,
 }

 return (
 <div style={{
 minHeight: '100vh',
 background: 'var(--bg)',
 paddingBottom: 'calc(var(--nav-h) + env(safe-area-inset-bottom, 0px) + 24px)',
 }}>
 <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
 {/* Header */}
 <div style={{
 background: 'linear-gradient(160deg, var(--sea) 0%, #0d8fa3 100%)',
 padding: 'calc(env(safe-area-inset-top, 0px) + 16px) 20px 24px',
 color: '#fff',
 display: 'flex',
 alignItems: 'center',
 gap: 12,
 }}>
 <Link href="/forum" style={{ color: 'rgba(255,255,255,0.75)', textDecoration: 'none', fontSize: 14, display: 'flex', alignItems: 'center', gap: 4 }}>
 <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
 <path d="M15 5.5L8.5 12L15 18.5" />
 </svg>
 Forum
 </Link>
 <span style={{ opacity: 0.4 }}>·</span>
 <span style={{
 width: 36, height: 36,
 borderRadius: 10,
 background: 'rgba(255,255,255,0.18)',
 color: '#fff',
 display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
 flexShrink: 0,
 }}>
 <CategoryIcon iconName={cat.iconName} />
 </span>
 <div>
 <h1 style={{ fontSize: 20, fontWeight: 700, margin: 0, letterSpacing: '-0.3px' }}>{cat.name}</h1>
 {cat.description && (
 <p style={{ fontSize: 13, opacity: 0.8, margin: '2px 0 0' }}>{cat.description}</p>
 )}
 </div>
 </div>

 {/* CTA — Loppis får annons-knapp, övriga får tråd-knapp */}
 <div style={{ padding: '14px 16px 0' }}>
 {cat.id === 'loppis' ? (
 <Link href="/forum/loppis/ny-annons" style={{
 display: 'flex', alignItems: 'center', gap: 8,
 padding: '13px 16px',
 background: 'var(--acc-knapp, #b5591a)',
 color: '#fff',
 borderRadius: 12,
 textDecoration: 'none',
 fontSize: 14, fontWeight: 700, letterSpacing: '0.2px',
 boxShadow: '0 3px 10px rgba(201,110,42,0.25)',
 }}>
 <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
 <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
 <circle cx="8.5" cy="8.5" r="1.5" />
 <polyline points="21 15 16 10 5 21" />
 </svg>
 Lägg upp annons
 </Link>
 ) : (
 <Link href={`/forum/ny-trad?kategori=${cat.id}`} style={{
 display: 'flex',
 alignItems: 'center',
 gap: 8,
 padding: '11px 16px',
 background: 'var(--sea-knapp)',
 color: '#fff',
 borderRadius: 12,
 textDecoration: 'none',
 fontSize: 14,
 fontWeight: 600,
 }}>
 <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
 <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
 <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5Z" />
 </svg>
 Ny tråd i {cat.name}
 </Link>
 )}
 </div>

 {/* Trådlista — Loppis får annons-grid, övriga vanlig lista */}
 <div style={{ padding: '16px 16px 0' }}>
 {threads.length === 0 ? (
 <EmptyThreads categoryName={cat.name} categoryId={cat.id} />
 ) : cat.id === 'loppis' ? (
 <LoppisGrid threads={annonser} />
 ) : (
 <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
 {threads.map(thread => (
 <Link
 key={thread.id}
 href={`/forum/${cat.id}/${thread.id}`}
 style={{
 display: 'block',
 padding: '14px 16px',
 background: 'var(--card-bg, #fff)',
 borderRadius: 14,
 border: '1px solid var(--border, rgba(10,123,140,0.1))',
 textDecoration: 'none',
 color: 'inherit',
 boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
 }}
 >
 {thread.is_pinned && (
 <span style={{
 display: 'inline-block',
 fontSize: 11,
 fontWeight: 600,
 color: 'var(--sea)',
 background: 'var(--teal-08, rgba(10,123,140,0.08))',
 padding: '1px 7px',
 borderRadius: 6,
 marginBottom: 6,
 }}>
 <svg width={10} height={10} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline', verticalAlign: 'middle', marginRight: 3 }}>
 <line x1="12" y1="17" x2="12" y2="22" />
 <path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24Z" />
 </svg>
 Fäst
 </span>
 )}
 <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--txt)', marginBottom: 4, lineHeight: 1.3 }}>
 {thread.title}
 </div>
 <div style={{ fontSize: 13, color: 'var(--txt3)', marginBottom: 8, lineHeight: 1.4, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
 {thread.body}
 </div>
 <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 12, color: 'var(--txt3)', flexWrap: 'wrap' }}>
 {thread.author && (
 <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
 <AvatarMini username={thread.author.username} avatar={thread.author.avatar} />
 {thread.author.username}
 </span>
 )}
 <span>·</span>
 <span>{formatForumDate(thread.created_at)}</span>
 {thread.reply_count > 0 && (
 <>
 <span>·</span>
 <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
 <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
 <path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H11.5L7.5 19.8a.6.6 0 0 1-1-.5V16H6a2 2 0 0 1-2-2Z" />
 </svg>
 {thread.reply_count}
 </span>
 {thread.last_reply_author && (
 <span style={{ color: 'var(--txt3)', fontStyle: 'italic' }}>
 av {thread.last_reply_author.username}
 </span>
 )}
 </>
 )}
 {thread.is_locked && (
 <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="var(--txt3)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
 <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
 <path d="M7 11V7a5 5 0 0 1 10 0v4" />
 </svg>
 )}
 </div>
 </Link>
 ))}
 </div>
 )}
 </div>
 </div>
 )
}

function AvatarMini({ username, avatar }: { username: string; avatar: string | null }) {
 if (avatar) {
 return (
 <img
 src={avatar}
 alt=""
 width={18}
 height={18}
 style={{
 width: 18, height: 18,
 aspectRatio: '1 / 1',
 borderRadius: '50%',
 objectFit: 'cover',
 display: 'inline-block',
 flexShrink: 0,
 verticalAlign: 'middle',
 }}
 />
 )
 }
 return (
 <span style={{
 width: 18, height: 18,
 aspectRatio: '1 / 1',
 borderRadius: '50%',
 flexShrink: 0,
 background: 'var(--teal-15, rgba(10,123,140,0.15))',
 color: 'var(--sea)',
 fontSize: 10, fontWeight: 700,
 display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
 }}>
 {username[0]?.toUpperCase()}
 </span>
 )
}

function EmptyThreads({ categoryName, categoryId }: { categoryName: string; categoryId: string }) {
 return (
 <div style={{
 textAlign: 'center',
 padding: '48px 24px',
 background: 'var(--card-bg, #fff)',
 borderRadius: 16,
 border: '1px solid var(--border, rgba(10,123,140,0.1))',
 }}>
 <div style={{ fontSize: 48, marginBottom: 12 }}> </div>
 <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--txt)', margin: '0 0 8px' }}>
 Inga trådar ännu
 </h3>
 <p style={{ fontSize: 14, color: 'var(--txt3)', margin: '0 0 20px', lineHeight: 1.5 }}>
 Bli den första att starta en diskussion om {categoryName}.
 </p>
 <Link href={`/forum/ny-trad?kategori=${categoryId}`} style={{
 display: 'inline-block',
 padding: '12px 24px',
 background: 'var(--grad-sea)',
 color: '#fff',
 borderRadius: 12,
 textDecoration: 'none',
 fontSize: 14,
 fontWeight: 600,
 }}>
 Starta första tråden
 </Link>
 </div>
 )
}
