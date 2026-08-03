import { notFound } from 'next/navigation'
import Link from 'next/link'
import { createPublicSupabaseClient } from '@/lib/supabase-server'
import { getAdminClient } from '@/lib/supabase-admin'
import { ForumViewerProvider } from './ForumViewer'
import ForumPostList, { PostHeader } from './ForumPostList'
import ViewerGate from '@/components/ViewerGate'
import { getThreadById, getPostsByThread, getCategoryById, formatForumDate } from '@/lib/forum'
import ForumReplyForm from './ForumReplyForm'
import ForumPostActions from './ForumPostActions'
import ForumSubscribeButton from './ForumSubscribeButton'
import ForumShareButton from './ForumShareButton'
import LoppisSaveButton from '@/components/LoppisSaveButton'
import ForumQuoteButton from './ForumQuoteButton'
import ForumRealtimeListener from './ForumRealtimeListener'
import Icon from '@/components/Icon'
import { renderForumBody } from '@/lib/forum-render'
import LoppisListingCard from '@/components/LoppisListingCard'
import LoppisSimilarAds from '@/components/LoppisSimilarAds'
import type { Metadata } from 'next'

/**
 * revalidate = 30 deklarerades för länge sedan men var verkningslös tills
 * 2026-08-02: auth.getUser() (cookies) och searchParams (?sort=) tvingade
 * dynamisk rendering. Nu är båda flyttade till klienten och ISR gäller på
 * riktigt. 30 s är medvetet kort — nya svar ska synas snabbt.
 * generateStaticParams saknas avsiktligt: trådar är många och långsvansade,
 * on-demand-rendering + cache räcker (dynamicParams är på som standard).
 * Kontroll: cache-control ska vara public och andra anropet HIT — mät live,
 * lita inte på byggsymbolen (CLAUDE.md p27).
 */
export const revalidate = 30

interface Props {
  params: Promise<{ kategori: string; trad: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { trad, kategori } = await params
  const thread = await getThreadById(trad, true)
  if (!thread) return { title: { absolute: 'Forum — Svalla' } }

  // Loppis-annons → optimerade SEO-tags för Google-indexering.
  // Title: "Modell från ÅR — Pris kr i Plats" (long-tail keywords).
  // Description: pris + skick + plats + första bodyn.
  // Canonical + OG hero-bild + Product JSON-LD (renderas separat).
  const ld = thread.listing_data
  const canonicalUrl = `https://svalla.se/forum/${kategori}/${trad}`
  if (kategori === 'loppis' && ld) {
    const hero = Array.isArray(ld.images) && ld.images.length > 0 ? ld.images[0] : null
    const priceStr = typeof ld.price === 'number' && Number.isFinite(ld.price)
      ? `${new Intl.NumberFormat('sv-SE').format(ld.price)} kr`
      : 'Pris på förfrågan'

    // Long-tail title: trådens egen titel innehåller redan modell+år oftast,
    // vi kompletterar med "— Pris i Plats | Svalla Loppis"
    const titleParts = [thread.title]
    if (ld.location && !thread.title.toLowerCase().includes(ld.location.toLowerCase())) {
      titleParts.push(`${priceStr} i ${ld.location}`)
    } else {
      titleParts.push(priceStr)
    }
    const title = `${titleParts.join(' — ')} | Svalla Loppis`

    // SEO-description med relevanta sök-termer
    const descParts: string[] = [`Säljes på Svalla Loppis: ${priceStr}`]
    if (ld.location) descParts.push(ld.location)
    if (ld.condition) descParts.push(`skick ${ld.condition.toLowerCase()}`)
    if (ld.category) descParts.push(ld.category)
    descParts.push(thread.body.replace(/\*\*/g, '').replace(/\n+/g, ' ').slice(0, 100))
    const description = descParts.join(' · ').slice(0, 200)

    // Sökord-keywords (Google ignorerar dem mest, men strukturerar OG)
    const keywords: string[] = ['svalla loppis', 'köp sälj båt']
    if (ld.location) keywords.push(`båt till salu ${ld.location.toLowerCase()}`)
    const modelSpec = ld.specs?.find(s => s.label.toLowerCase() === 'modell')?.value
    const yearSpec = ld.specs?.find(s => s.label.toLowerCase().includes('årsmodell'))?.value
    if (modelSpec) keywords.push(`${modelSpec} till salu`)
    if (modelSpec && yearSpec) keywords.push(`${modelSpec} ${yearSpec}`)
    if (ld.category) keywords.push(`${ld.category.toLowerCase()} svalla`)

    return {
      title: { absolute: title },
      description,
      keywords,
      alternates: { canonical: canonicalUrl },
      openGraph: {
        title, description,
        siteName: 'Svalla',
        type: 'article',
        url: canonicalUrl,
        images: hero ? [{ url: hero, alt: thread.title }] : undefined,
      },
      twitter: {
        card: 'summary_large_image',
        title, description,
        images: hero ? [hero] : undefined,
      },
    }
  }

  const description = thread.body.slice(0, 160)
  const ogImage = `/api/og/forum/${trad}`
  return {
    title: { absolute: `${thread.title} — Svalla Forum` },
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: `${thread.title} — Svalla Forum`,
      description,
      url: canonicalUrl,
      images: [{ url: ogImage, width: 1200, height: 630, alt: thread.title }],
      type: 'article',
    },
    twitter: { card: 'summary_large_image', title: `${thread.title} — Svalla Forum`, description, images: [ogImage] },
  }
}

export default async function ForumTradPage({ params }: Props) {
  const { kategori, trad } = await params
  // Ingen auth och inga searchParams på servern (2026-08-02): båda tvingar
  // dynamisk rendering och satte revalidate = 30 ur spel — varje forumtråd
  // renderades om för varje besökare (619–683 ms MISS, uppmätt). Vem som
  // tittar hämtas i klienten av ForumViewerProvider (EN batchfråga för hela
  // trådens likes/bevakning/sparning), och ?sort= sköts av ForumPostList
  // som ordnar om lokalt. Se ForumViewer.tsx och ForumPostList.tsx.
  const supabase = createPublicSupabaseClient()

  const thread = await getThreadById(trad, true)
  const cat = await getCategoryById(kategori, true)
  if (!thread || !cat) notFound()

  // Servern renderar alltid äldst-först — samma HTML för alla.
  const [posts, saveCountRow] = await Promise.all([
    getPostsByThread(trad, null, { sort: 'aldst', bestPostId: thread.best_post_id ?? null }, true),
    // Ägarstatistiken (antal som sparat annonsen) är en opersonlig aggregat.
    // Den hämtas med admin-klienten eftersom loppis_saves-rader inte är
    // anon-läsbara, och gate:as i klienten (LoppisListingCard visar den bara
    // för ägaren). Ingen cookie-läsning — sidan förblir cachebar.
    kategori === 'loppis'
      ? getAdminClient().from('loppis_saves').select('user_id', { count: 'exact', head: true }).eq('thread_id', trad)
      : Promise.resolve({ count: null }),
  ])
  const saveCount = (saveCountRow as { count: number | null }).count ?? 0
  const viewCount = thread.view_count ?? 0

  // Loppis-extras: säljarens trovärdighet (medlem-sedan + trip-count) + liknande annonser
  type SellerMeta = { memberSince: string | null; tripCount: number }
  type SimilarAd = { id: string; title: string; image: string | null; price: number | null; location: string | null; status: string }
  let sellerMeta: SellerMeta | null = null
  let similarAds: SimilarAd[] = []
  if (kategori === 'loppis' && thread.listing_data) {
    const ld = thread.listing_data
    const [{ data: sellerRow }, { count: tripCount }, { data: similar }] = await Promise.all([
      supabase.from('users').select('created_at').eq('id', thread.user_id).maybeSingle(),
      supabase.from('trips').select('id', { count: 'exact', head: true }).eq('user_id', thread.user_id).is('deleted_at', null),
      supabase
        .from('forum_threads')
        .select('id, title, listing_data, last_reply_at')
        .eq('category_id', 'loppis')
        .eq('in_spam_queue', false)
        .neq('id', trad)
        .order('last_reply_at', { ascending: false })
        .limit(40),
    ])
    sellerMeta = {
      memberSince: (sellerRow?.created_at as string | undefined) ?? null,
      tripCount: tripCount ?? 0,
    }
    // Filtrera till samma kategori om den finns, annars ta senaste 4 — sortera på pris-närhet om vi har pris
    const sameCat = ((similar ?? []) as Array<{ id: string; title: string; listing_data: typeof ld; last_reply_at: string }>)
      .filter(t => !!t.listing_data)
      .filter(t => !ld.category || t.listing_data?.category === ld.category)
      .filter(t => (t.listing_data?.status ?? 'aktiv') !== 'sald')
    if (typeof ld.price === 'number') {
      sameCat.sort((a, b) => {
        const pa = typeof a.listing_data?.price === 'number' ? Math.abs(a.listing_data.price - ld.price!) : Infinity
        const pb = typeof b.listing_data?.price === 'number' ? Math.abs(b.listing_data.price - ld.price!) : Infinity
        return pa - pb
      })
    }
    similarAds = sameCat.slice(0, 4).map(t => ({
      id: t.id,
      title: t.title,
      image: t.listing_data?.images?.[0] ?? null,
      price: typeof t.listing_data?.price === 'number' ? t.listing_data.price : null,
      location: t.listing_data?.location ?? null,
      status: t.listing_data?.status ?? 'aktiv',
    }))
  }

  const jsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'DiscussionForumPosting',
    headline: thread.title,
    text: thread.body.slice(0, 500),
    datePublished: thread.created_at,
    url: `https://svalla.se/forum/${kategori}/${trad}`,
    inLanguage: 'sv',
    author: thread.author?.username
      ? { '@type': 'Person', name: thread.author.username }
      : undefined,
    interactionStatistic: {
      '@type': 'InteractionCounter',
      interactionType: 'https://schema.org/ReplyAction',
      userInteractionCount: posts.length,
    },
    isPartOf: {
      '@type': 'DiscussionForum',
      name: `${cat.name} — Svalla Forum`,
      url: `https://svalla.se/forum/${kategori}`,
    },
  }

  // Loppis-annonser får dessutom Product-schema → indexeras som varor
  // av Google Shopping/Search, dyker upp i rich-result-cards med pris.
  let productJsonLd: Record<string, unknown> | null = null
  if (kategori === 'loppis' && thread.listing_data) {
    const ld = thread.listing_data
    const availabilityMap = {
      aktiv:      'https://schema.org/InStock',
      reserverad: 'https://schema.org/LimitedAvailability',
      sald:       'https://schema.org/SoldOut',
    } as const
    const status = (ld.status ?? 'aktiv') as keyof typeof availabilityMap
    productJsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: thread.title,
      description: thread.body.replace(/\*\*/g, '').slice(0, 300),
      sku: thread.id,
      url: `https://svalla.se/forum/${kategori}/${trad}`,
      image: Array.isArray(ld.images) && ld.images.length > 0 ? ld.images : undefined,
      category: ld.category ?? 'Båt',
      brand: ld.specs?.find(s => s.label.toLowerCase() === 'modell')?.value ?? undefined,
      offers: typeof ld.price === 'number' ? {
        '@type': 'Offer',
        price: ld.price,
        priceCurrency: ld.currency ?? 'SEK',
        availability: availabilityMap[status],
        itemCondition: ld.condition === 'Nyskick'
          ? 'https://schema.org/NewCondition'
          : 'https://schema.org/UsedCondition',
        seller: thread.author?.username ? {
          '@type': 'Person',
          name: thread.author.username,
          url: `https://svalla.se/u/${thread.author.username}`,
        } : undefined,
        availableAtOrFrom: ld.location ? {
          '@type': 'Place',
          name: ld.location,
        } : undefined,
        url: `https://svalla.se/forum/${kategori}/${trad}`,
      } : undefined,
    }
  }

  return (
    <ForumViewerProvider
      threadId={trad}
      threadOwnerId={thread.user_id}
      postIds={posts.map(p => p.id)}
      isLoppis={kategori === 'loppis'}
    >
    <main style={{
      minHeight: '100vh',
      background: 'var(--bg)',
      paddingBottom: 'calc(var(--nav-h) + env(safe-area-inset-bottom, 0px) + 32px)',
    }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {productJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
      )}

      {/* ── Header ── */}
      <div style={{
        background: 'linear-gradient(160deg, var(--sea) 0%, #0d8fa3 100%)',
        padding: 'calc(env(safe-area-inset-top, 0px) + 14px) 16px 22px',
        color: '#fff',
      }}>
        {/* Breadcrumb + back button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <Link href={`/forum/${cat.id}`} style={{
            display: 'inline-flex', alignItems: 'center', gap: 5,
            padding: '5px 12px 5px 8px',
            borderRadius: 20,
            background: 'rgba(255,255,255,0.15)',
            border: '1px solid rgba(255,255,255,0.25)',
            color: '#fff', textDecoration: 'none',
            fontSize: 12, fontWeight: 600,
          }}>
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 5.5L8.5 12L15 18.5" />
            </svg>
            <Icon name={cat.iconName} size={14} stroke={2} />
            {cat.name}
          </Link>
          <Link href="/forum" style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>
            Forum
          </Link>
        </div>

        <h1 style={{ fontSize: 19, fontWeight: 700, margin: '0 0 14px', lineHeight: 1.3, letterSpacing: '-0.2px', display: 'flex', alignItems: 'flex-start', gap: 8, flexWrap: 'wrap' }}>
          <span style={{ flex: 1 }}>{thread.title}</span>
          {thread.is_solved && (
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 4,
              fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
              padding: '4px 10px', borderRadius: 6,
              background: 'rgba(34,197,94,0.18)',
              color: '#bbf7d0',
              border: '1px solid rgba(187,247,208,0.35)',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}>
              <svg width={11} height={11} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              Löst
            </span>
          )}
        </h1>

        {/* Thread meta — author + stats + subscribe */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          {thread.author?.username ? (
            <Link
              href={`/u/${encodeURIComponent(thread.author.username)}`}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                textDecoration: 'none',
                padding: '2px 8px 2px 2px', borderRadius: 999,
                transition: 'background 0.12s',
              }}
              className="forum-thread-author-link"
            >
              {thread.author.avatar ? (
                <img
                  src={thread.author.avatar}
                  alt=""
                  width={26}
                  height={26}
                  style={{
                    width: 26, height: 26,
                    aspectRatio: '1 / 1',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    display: 'block',
                    flexShrink: 0,
                    border: '1.5px solid rgba(255,255,255,0.4)',
                  }}
                />
              ) : (
                <div style={{
                  width: 26, height: 26,
                  aspectRatio: '1 / 1',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.22)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, fontWeight: 700, color: '#fff',
                  flexShrink: 0,
                  border: '1.5px solid rgba(255,255,255,0.3)',
                }}>
                  {thread.author.username[0]?.toUpperCase()}
                </div>
              )}
              <span style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.95)' }}>
                {thread.author.username}
              </span>
            </Link>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{
                width: 26, height: 26, borderRadius: '50%',
                background: 'rgba(255,255,255,0.22)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, fontWeight: 700, color: '#fff',
                border: '1.5px solid rgba(255,255,255,0.3)',
              }}>?</div>
              <span style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.9)' }}>Okänd</span>
            </div>
          )}
          <span style={{ opacity: 0.4, fontSize: 12 }}>·</span>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>{formatForumDate(thread.created_at)}</span>
          {posts.length > 0 && (
            <>
              <span style={{ opacity: 0.4, fontSize: 12 }}>·</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>
                <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H11.5L7.5 19.8a.6.6 0 0 1-1-.5V16H6a2 2 0 0 1-2-2Z" />
                </svg>
                {posts.length} svar
              </span>
            </>
          )}
          {/* Spacer + dela + spara (loppis) + bevaka */}
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
            <ForumShareButton
              url={`https://svalla.se/forum/${kategori}/${trad}`}
              title={kategori === 'loppis' && thread.listing_data
                ? `Säljes: ${thread.title}`
                : thread.title}
              text={kategori === 'loppis' && thread.listing_data?.price
                ? `${new Intl.NumberFormat('sv-SE').format(thread.listing_data.price)} kr · ${thread.listing_data.location ?? 'Sverige'}`
                : `${cat.name} på Svalla`}
            />
            {kategori === 'loppis' && <LoppisSaveButton threadId={trad} />}
            <ForumSubscribeButton threadId={trad} />
          </div>
        </div>
      </div>

      <div style={{ padding: '16px 0 0', maxWidth: 760, margin: '0 auto' }}>

        {/* ── OP-kort: Loppis-annons eller vanlig forum-tråd ── */}
        {kategori === 'loppis' && thread.listing_data ? (
          <>
            <LoppisListingCard
              threadId={thread.id}
              title={thread.title}
              body={thread.body}
              createdAt={thread.created_at}
              listing={thread.listing_data}
              author={thread.author ? {
                id: thread.user_id,
                username: thread.author.username,
                avatar: thread.author.avatar,
              } : null}
              ownerStats={{
                viewCount,
                saveCount,
                replyCount: posts.length,
              }}
              sellerTrust={sellerMeta ?? undefined}
            />
            {similarAds.length > 0 && (
              <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 16px' }}>
                <LoppisSimilarAds ads={similarAds} />
              </div>
            )}
            {/* Ägar-actions för annonsen (redigera/radera) */}
            <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 16px 16px', display: 'flex', alignItems: 'center', gap: 4 }}>
              <ForumQuoteButton username={thread.author?.username ?? 'Okänd'} body={thread.body} />
              <ForumPostActions
                postId={thread.id}
                threadId={thread.id}
                authorId={thread.user_id}
                initialBody={thread.body}
                initialTitle={thread.title}
                isThread
                categoryId={kategori}
              />
            </div>
          </>
        ) : (
          <div style={{
            padding: '18px 18px 14px',
            margin: '0 16px 16px',
            background: 'var(--card-bg, #fff)',
            borderRadius: 16,
            border: '1px solid var(--border, rgba(10,123,140,0.1))',
            borderLeft: '3px solid var(--sea)',
            boxShadow: '0 2px 12px rgba(10,123,140,0.07)',
          }}>
            <PostHeader
              username={thread.author?.username ?? 'Okänd'}
              avatar={thread.author?.avatar ?? null}
              date={thread.created_at}
              isOP
            />
            <div style={{
              fontSize: 15,
              color: 'var(--txt)',
              lineHeight: 1.65,
              marginTop: 12,
              wordBreak: 'break-word',
            }}>
              {renderForumBody(thread.body)}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 8 }}>
              <ForumQuoteButton username={thread.author?.username ?? 'Okänd'} body={thread.body} />
              <ForumPostActions
                postId={thread.id}
                threadId={thread.id}
                authorId={thread.user_id}
                initialBody={thread.body}
                initialTitle={thread.title}
                isThread
                categoryId={kategori}
              />
            </div>
          </div>
        )}

        <div style={{ padding: '0 16px' }}>

        {/* ── Svar — klientlista med lokal sortering, se ForumPostList.tsx ── */}
        <ForumPostList
          posts={posts.map(p => ({
            id: p.id,
            user_id: p.user_id,
            body: p.body,
            created_at: p.created_at,
            like_count: p.like_count ?? 0,
            author: p.author ?? null,
          }))}
          threadId={trad}
          bestPostId={thread.best_post_id ?? null}
        />

        {/* ── Empty state — inga svar än ── */}
        {posts.length === 0 && !thread.is_locked && (
          <div style={{
            textAlign: 'center',
            padding: '20px 16px 24px',
            color: 'var(--txt3)',
            fontSize: 14,
          }}>
            <div style={{ marginBottom: 4 }}>
              <svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="rgba(10,123,140,0.3)" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H11.5L7.5 19.8a.6.6 0 0 1-1-.5V16H6a2 2 0 0 1-2-2Z" />
              </svg>
            </div>
            Inga svar ännu — var den första att svara!
          </div>
        )}

        {/* ── Svarsformulär / låst / inte inloggad ── */}
        {thread.is_locked ? (
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            padding: '16px',
            background: 'rgba(10,123,140,0.05)',
            borderRadius: 14,
            border: '1px solid rgba(10,123,140,0.1)',
            fontSize: 14,
            color: 'var(--txt3)',
          }}>
            <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="var(--txt3)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            Den här tråden är låst för nya svar.
          </div>
        ) : (
          /* Vem som tittar avgörs i klienten (ViewerGate) så att HTML:en är
             densamma för alla — login-CTA:n respektive svarsformuläret dyker
             upp när svaret kommit. Formuläret är rent klient-UI ändå. */
          <ViewerGate
            utloggad={

          <div style={{
            padding: '20px 18px',
            background: 'linear-gradient(180deg, rgba(10,123,140,0.06) 0%, rgba(201,110,42,0.08) 100%)',
            borderRadius: 14,
            border: '1px solid rgba(10,123,140,0.18)',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--txt)', marginBottom: 6 }}>
              {kategori === 'loppis' ? 'Vill du kontakta säljaren?' : 'Vill du svara på tråden?'}
            </div>
            <div style={{ fontSize: 13, color: 'var(--txt2)', marginBottom: 14, lineHeight: 1.5 }}>
              {kategori === 'loppis'
                ? 'Skapa konto eller logga in för att skicka meddelande och kommentera annonser.'
                : 'Du behöver vara inloggad för att svara och delta i diskussionerna.'}
            </div>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link
                href={`/logga-in?returnTo=/forum/${kategori}/${thread.id}`}
                style={{
                  padding: '10px 20px',
                  background: 'var(--acc, #c96e2a)',
                  color: '#fff',
                  borderRadius: 10,
                  textDecoration: 'none',
                  fontSize: 14, fontWeight: 700,
                  boxShadow: '0 3px 10px rgba(201,110,42,0.25)',
                }}
              >
                Logga in
              </Link>
              <Link
                href={`/logga-in?mode=ny&returnTo=/forum/${kategori}/${thread.id}`}
                style={{
                  padding: '10px 20px',
                  background: 'transparent',
                  color: 'var(--sea)',
                  borderRadius: 10,
                  textDecoration: 'none',
                  fontSize: 14, fontWeight: 700,
                  border: '1.5px solid var(--sea)',
                }}
              >
                Skapa konto
              </Link>
            </div>
          </div>
            }
            inloggad={<ForumReplyForm threadId={thread.id} categoryId={kategori} />}
          />
        )}
        </div>
      </div>

      {/* Realtime: lyssnar på nya posts och visar pill om någon annan postar */}
      <ForumRealtimeListener threadId={thread.id} initialCount={posts.length} />
    </main>
    </ForumViewerProvider>
  )
}
