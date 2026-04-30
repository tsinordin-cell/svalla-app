/**
 * postRelated.ts — hjälpfunktioner för internal linking i bloggen.
 *
 * SEO-konsekvens: ju fler länkar mellan blogg-poster och från startsidan
 * till bloggen, desto snabbare hittar Google "Discovered, not crawled"-sidor.
 */

import { POSTS_META, type PostMeta } from '@/app/blogg/posts-data'

/** Returnera de N senaste blog-posterna sorterade efter datum (nyast först). */
export function getLatestPosts(count = 3): PostMeta[] {
  return [...POSTS_META]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, count)
}

/**
 * Returnera N relaterade poster baserat på shared tags + samma kategori.
 * Egen post (currentSlug) exkluderas.
 *
 * Algorithm:
 * 1. Räkna shared tags med varje annan post
 * 2. Bonus för samma kategori
 * 3. Bonus för senare datum (fräscht innehåll)
 * 4. Returnera top N
 */
export function getRelatedPosts(currentSlug: string, count = 3): PostMeta[] {
  const current = POSTS_META.find(p => p.slug === currentSlug)
  if (!current) return []

  const currentTags = new Set(current.tags.map(t => t.toLowerCase()))
  const currentDate = new Date(current.date).getTime()

  const scored = POSTS_META
    .filter(p => p.slug !== currentSlug)
    .map(p => {
      const sharedTags = p.tags.filter(t => currentTags.has(t.toLowerCase())).length
      const sameCategory = p.category === current.category ? 1 : 0
      const ageDiff = Math.abs(currentDate - new Date(p.date).getTime()) / (1000 * 60 * 60 * 24)
      const ageBonus = Math.max(0, 1 - ageDiff / 365)  // poster inom 1 år får bonus
      const score = sharedTags * 3 + sameCategory * 2 + ageBonus
      return { post: p, score }
    })
    .sort((a, b) => b.score - a.score)

  return scored.slice(0, count).map(s => s.post)
}
