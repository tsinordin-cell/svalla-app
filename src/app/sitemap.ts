import { MetadataRoute } from 'next'
import { ISLANDS } from './o/island-data'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://svalla.se'
  const now = new Date()

  const staticPages = [
    { url: base, priority: 1.0, changeFrequency: 'daily' as const },
    { url: `${base}/platser`, priority: 0.9, changeFrequency: 'daily' as const },
    { url: `${base}/rutter`, priority: 0.9, changeFrequency: 'weekly' as const },
    { url: `${base}/oar`, priority: 0.9, changeFrequency: 'weekly' as const },
    { url: `${base}/blogg`, priority: 0.7, changeFrequency: 'weekly' as const },
    { url: `${base}/om`, priority: 0.5, changeFrequency: 'monthly' as const },
    { url: `${base}/faq`, priority: 0.5, changeFrequency: 'monthly' as const },
    { url: `${base}/guide`, priority: 0.6, changeFrequency: 'monthly' as const },
  ].map(p => ({ ...p, lastModified: now }))

  const islandPages = ISLANDS.map(island => ({
    url: `${base}/o/${island.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [...staticPages, ...islandPages]
}
