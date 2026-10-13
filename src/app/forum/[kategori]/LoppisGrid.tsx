'use client'
/**
 * Annonsrutnätet på /forum/loppis, med filter.
 *
 * Varför klientkomponent (rester efter revisionen, 2026-10-07): filtret
 * (?cat=, ?priceMin=, ?priceMax=, ?location=) styr bara vad som SYNS, inte
 * vilken resurs som visas. Så länge servern läste query-strängen tvingades
 * hela kategorisidan att renderas om vid varje besök (uppmätt: x-vercel-cache
 * MISS, private/no-store). Nu renderar servern alla annonser i HTML:en och
 * den här komponenten filtrerar dem. Samma mönster som ProfileTabs.tsx
 * (CLAUDE.md p27): utgångsläget är "inget filter" på både server och klient,
 * URL:en läses en gång efter montering, och hålls sedan i synk med
 * history.replaceState så att ett filter går att dela och bokmärka.
 */
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { ListingData } from '@/lib/forum'
import LoppisFilters, { TOMT_FILTER, type LoppisFilter } from '@/components/LoppisFilters'

export type ThreadWithListing = {
  id: string
  title: string
  body: string
  created_at: string
  /** "3 dagar sedan" m.m., formaterat på servern så att klienten aldrig
   *  behöver klockan under renderingen (ingen hydreringsskillnad). */
  skapadText: string
  /** Boostad vid sidans generering (servern jämför boosted_until med klockan). */
  boostad: boolean
  listing_data?: ListingData | null
  author?: { username: string; avatar: string | null } | null
}

function formatPrice(price?: number): string {
  if (typeof price !== 'number' || !Number.isFinite(price)) return 'Pris på förfrågan'
  if (price === 0) return 'Skänkes'
  return `${new Intl.NumberFormat('sv-SE').format(price)} kr`
}

function filterFranUrl(search: string): LoppisFilter {
  const sp = new URLSearchParams(search)
  const tal = (v: string | null) => {
    if (!v) return null
    const n = Number(v.replace(/[^0-9]/g, ''))
    return Number.isFinite(n) && v.replace(/[^0-9]/g, '') !== '' ? n : null
  }
  const cat = sp.get('cat')
  const location = sp.get('location')?.trim()
  return {
    cat: cat && cat !== 'Alla' ? cat : null,
    priceMin: tal(sp.get('priceMin')),
    priceMax: tal(sp.get('priceMax')),
    location: location ? location : null,
  }
}

function urlFranFilter(filter: LoppisFilter): string {
  const sp = new URLSearchParams()
  if (filter.cat) sp.set('cat', filter.cat)
  if (filter.priceMin !== null) sp.set('priceMin', String(filter.priceMin))
  if (filter.priceMax !== null) sp.set('priceMax', String(filter.priceMax))
  if (filter.location) sp.set('location', filter.location)
  const qs = sp.toString()
  return qs ? `/forum/loppis?${qs}` : '/forum/loppis'
}

export default function LoppisGrid({ threads }: { threads: ThreadWithListing[] }) {
  // Utgångsläget måste vara samma på server och klient, annars blir det
  // hydreringsfel. Därför alltid "inget filter" först; URL:en läses efter mount.
  const [filter, setFilter] = useState<LoppisFilter>(TOMT_FILTER)

  useEffect(() => {
    setFilter(filterFranUrl(window.location.search))
  }, [])

  function byt(next: LoppisFilter) {
    setFilter(next)
    window.history.replaceState(null, '', urlFranFilter(next))
  }

  // Bara annonser med listing_data (gamla forum-trådar utan visas inte i grid)
  const allAds = threads.filter(t => !!t.listing_data)
  const legacyThreads = threads.filter(t => !t.listing_data)

  const filtered = allAds.filter(t => {
    const ld = t.listing_data!
    if (filter.cat && ld.category !== filter.cat) return false
    if (filter.priceMin !== null) {
      if (typeof ld.price !== 'number' || ld.price < filter.priceMin) return false
    }
    if (filter.priceMax !== null) {
      if (typeof ld.price !== 'number' || ld.price > filter.priceMax) return false
    }
    if (filter.location && !ld.location?.toLowerCase().includes(filter.location.toLowerCase())) return false
    return true
  })

  // Boostade annonser sorteras först. Inom varje grupp behålls den ursprungliga
  // ordningen (senast last_reply_at från Supabase).
  const ads = [
    ...filtered.filter(t => t.boostad),
    ...filtered.filter(t => !t.boostad),
  ]

  return (
    <>
      {/* Filter-rad (alltid synlig om det finns annonser totalt) */}
      {allAds.length > 0 && (
        <LoppisFilters filter={filter} onChange={byt} totalCount={allAds.length} filteredCount={ads.length} />
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
            const boosted = t.boostad
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
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9fb3bf', fontSize: 12 }}>
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
                      <svg width={9} height={9} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26"/></svg>
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
                    fontSize: 16, fontWeight: 800, color: 'var(--acc-text, #a8501a)',
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
                    {ld.location && <span aria-hidden="true">·</span>}
                    <span>{t.skapadText}</span>
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
                  {t.author?.username ?? 'Okänd'} · {t.skapadText}
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </>
  )
}
