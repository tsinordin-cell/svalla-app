import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getCategoryById, getThreadsByCategory, formatForumDate } from '@/lib/forum'
import type { Metadata } from 'next'
import type { ListingData } from '@/lib/forum'
import Icon, { type IconName } from '@/components/Icon'
import LoppisFilters from '@/components/LoppisFilters'

function CategoryIcon({ iconName }: { iconName: IconName }) {
 return <Icon name={iconName} size={18} stroke={1.85} />
}

export const revalidate = 60

interface Props {
 params: Promise<{ kategori: string }>
 searchParams?: Promise<{ cat?: string; priceMin?: string; priceMax?: string; location?: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
 const { kategori } = await params
 const cat = await getCategoryById(kategori)
 if (!cat) return { title: 'Forum — Svalla' }
 return {
 title: `${cat.name} — Svalla Forum`,
 description: cat.description ?? undefined,
 }
}

export default async function ForumKategoriPage({ params, searchParams }: Props) {
 const { kategori } = await params
 const sp = (await searchParams) ?? {}
 const [cat, threads] = await Promise.all([
 getCategoryById(kategori),
 getThreadsByCategory(kategori),
 ])

 if (!cat) notFound()

 // Loppis-filter (URL searchParams). Tillämpas nedan i LoppisGrid.
 const loppisFilter = kategori === 'loppis' ? {
 cat:       sp.cat       && sp.cat !== 'Alla' ? sp.cat : null,
 priceMin:  sp.priceMin   ? Number(sp.priceMin)  : null,
 priceMax:  sp.priceMax   ? Number(sp.priceMax)  : null,
 location:  sp.location  ? sp.location.trim().toLowerCase() : null,
 } : null

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
 <main style={{
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
 background: 'var(--acc, #c96e2a)',
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
 background: 'var(--sea)',
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
 <LoppisGrid threads={threads} filter={loppisFilter} />
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
 </main>
 )
}

// ── Loppis grid ───────────────────────────────────────────────────────────
type ThreadWithListing = {
 id: string
 title: string
 body: string
 created_at: string
 listing_data?: ListingData | null
 author?: { username: string; avatar: string | null } | null
}

function formatPrice(price?: number): string {
 if (typeof price !== 'number' || !Number.isFinite(price)) return 'Pris på förfrågan'
 if (price === 0) return 'Skänkes'
 return `${new Intl.NumberFormat('sv-SE').format(price)} kr`
}

type LoppisFilter = {
 cat: string | null
 priceMin: number | null
 priceMax: number | null
 location: string | null
} | null

function LoppisGrid({ threads, filter }: { threads: ThreadWithListing[]; filter: LoppisFilter }) {
 // Bara annonser med listing_data (gamla forum-trådar utan visas inte i grid)
 const allAds = threads.filter(t => !!t.listing_data)
 const legacyThreads = threads.filter(t => !t.listing_data)

 const filtered = !filter ? allAds : allAds.filter(t => {
 const ld = t.listing_data!
 if (filter.cat && ld.category !== filter.cat) return false
 if (filter.priceMin !== null && Number.isFinite(filter.priceMin)) {
 if (typeof ld.price !== 'number' || ld.price < filter.priceMin) return false
 }
 if (filter.priceMax !== null && Number.isFinite(filter.priceMax)) {
 if (typeof ld.price !== 'number' || ld.price > filter.priceMax) return false
 }
 if (filter.location && !ld.location?.toLowerCase().includes(filter.location)) return false
 return true
 })

 // Boostade annonser sorteras först. Inom varje grupp behålls den ursprungliga
 // ordningen (senast last_reply_at från Supabase).
 const now = Date.now()
 const isBoosted = (t: ThreadWithListing) => {
 const b = t.listing_data?.boosted_until
 return typeof b === 'string' && new Date(b).getTime() > now
 }
 const ads = [
 ...filtered.filter(isBoosted),
 ...filtered.filter(t => !isBoosted(t)),
 ]

 return (
 <>
 {/* Filter-rad (alltid synlig om det finns annonser totalt) */}
 {allAds.length > 0 && (
 <LoppisFilters totalCount={allAds.length} filteredCount={ads.length} />
 )}

 {/* Inga matchande efter filter */}
 {allAds.length > 0 && ads.length === 0 && (
 <div style={{
 textAlign: 'center', padding: '40px 20px',
 background: 'var(--card-bg, #fff)', borderRadius: 14,
 border: '1px solid var(--border, rgba(10,123,140,0.10))',
 marginBottom: legacyThreads.length > 0 ? 24 : 0,
 }}>
 <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--txt)', marginBottom: 4 }}>
 Inga annonser matchar filtret
 </div>
 <div style={{ fontSize: 12, color: 'var(--txt3)' }}>
 Prova att rensa filtren eller bredda priset.
 </div>
 </div>
 )}

 {ads.length > 0 && (
 <div style={{
 display: 'grid',
 // 2 kolumner på mobil (≥320px), responsivt fler på större skärmar
 gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
 gap: 12,
 marginBottom: legacyThreads.length > 0 ? 24 : 0,
 }}>
 {ads.map(t => {
 const ld = t.listing_data!
 const status = ld.status ?? 'aktiv'
 const isSold = status === 'sald'
 const boosted = typeof ld.boosted_until === 'string' && new Date(ld.boosted_until).getTime() > Date.now()
 const heroImg = (ld.images && ld.images.length > 0) ? ld.images[0] : null
 return (
 <Link
 key={t.id}
 href={`/forum/loppis/${t.id}`}
 style={{
 display: 'block',
 borderRadius: 14,
 overflow: 'hidden',
 background: 'var(--card-bg, #fff)',
 border: '1px solid var(--border, rgba(10,123,140,0.10))',
 boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
 textDecoration: 'none',
 color: 'inherit',
 opacity: isSold ? 0.6 : 1,
 }}
 >
 <div style={{ position: 'relative', width: '100%', aspectRatio: '4 / 3', background: '#0a1e2c' }}>
 {heroImg ? (
 <Image src={heroImg} alt={t.title} fill sizes="(max-width: 480px) 50vw, (max-width: 760px) 33vw, 180px" style={{ objectFit: 'cover' }} loading="lazy" />
 ) : (
 <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#456', fontSize: 12 }}>
 Ingen bild
 </div>
 )}
 {boosted && (
 <div style={{
 position: 'absolute', top: 8, left: 8,
 background: 'linear-gradient(135deg, #c96e2a, #e08742)',
 color: '#fff',
 padding: '3px 9px', borderRadius: 12,
 fontSize: 9, fontWeight: 800, letterSpacing: '0.5px', textTransform: 'uppercase',
 boxShadow: '0 2px 6px rgba(201,110,42,0.35)',
 display: 'inline-flex', alignItems: 'center', gap: 3,
 }}>
 <svg width={9} height={9} viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26"/></svg>
 Boostad
 </div>
 )}
 {status !== 'aktiv' && (
 <div style={{
 position: 'absolute', top: 8, right: 8,
 background: status === 'sald' ? 'rgba(0,0,0,0.78)' : 'rgba(40,40,40,0.72)',
 color: '#fff',
 padding: '3px 8px', borderRadius: 12,
 fontSize: 10, fontWeight: 700, letterSpacing: '0.4px', textTransform: 'uppercase',
 backdropFilter: 'blur(6px)',
 }}>
 {status === 'sald' ? 'Såld' : 'Reserverad'}
 </div>
 )}
 </div>
 <div style={{ padding: '10px 12px 12px' }}>
 <div style={{
 fontSize: 16, fontWeight: 800, color: 'var(--acc, #c96e2a)',
 letterSpacing: '-0.2px', marginBottom: 2,
 }}>
 {formatPrice(ld.price)}
 </div>
 <div style={{
 fontSize: 13, fontWeight: 600, color: 'var(--txt)',
 lineHeight: 1.3, marginBottom: 4,
 overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
 }}>
 {t.title}
 </div>
 <div style={{
 fontSize: 11, color: 'var(--txt3)',
 display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap',
 }}>
 {ld.location && <span>{ld.location}</span>}
 {ld.location && <span>·</span>}
 <span>{formatForumDate(t.created_at)}</span>
 </div>
 </div>
 </Link>
 )
 })}
 </div>
 )}
 {legacyThreads.length > 0 && (
 <>
 <div style={{
 fontSize: 11, fontWeight: 700, color: 'var(--txt3)', letterSpacing: '0.6px',
 textTransform: 'uppercase', margin: '4px 0 10px',
 }}>
 Diskussionstrådar
 </div>
 <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
 {legacyThreads.map(t => (
 <Link key={t.id} href={`/forum/loppis/${t.id}`} style={{
 display: 'block', padding: '14px 16px',
 background: 'var(--card-bg, #fff)', borderRadius: 14,
 border: '1px solid var(--border, rgba(10,123,140,0.1))',
 textDecoration: 'none', color: 'inherit',
 boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
 }}>
 <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--txt)', marginBottom: 4 }}>
 {t.title}
 </div>
 <div style={{ fontSize: 12, color: 'var(--txt3)' }}>
 {t.author?.username ?? 'Okänd'} · {formatForumDate(t.created_at)}
 </div>
 </Link>
 ))}
 </div>
 </>
 )}
 </>
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
