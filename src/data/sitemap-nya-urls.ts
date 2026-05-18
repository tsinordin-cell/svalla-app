/**
 * sitemap-nya-urls.ts — nya URL:er från guider + äventyrssidor 2026-05-15.
 *
 * VIKTIGT: Jag (Claude) hittade inte var den aktiva sitemap-genereratorn
 * ligger i kodbasen — `/sitemap.xml` returnerar 200 live men jag kunde
 * inte spåra var den genereras från. För att INTE riskera att skriva
 * över din befintliga sitemap och bryta SEO för 700+ sidor, lägger jag
 * dessa URL:er i en separat fil. Importera och spread dem i din existerande
 * sitemap-generator.
 *
 * Exempel:
 *   import { NYA_GUIDER_OCH_AVENTYR_URLS } from '@/data/sitemap-nya-urls'
 *   // i din sitemap-funktion:
 *   return [...existerandeUrls, ...NYA_GUIDER_OCH_AVENTYR_URLS]
 */

import { GUIDER } from './guider'

export interface SitemapEntry {
  url: string
  lastModified: string  // ISO date YYYY-MM-DD
  changeFrequency: 'daily' | 'weekly' | 'monthly' | 'yearly'
  priority: number
}

const TODAY = '2026-05-15'

export const NYA_GUIDER_OCH_AVENTYR_URLS: SitemapEntry[] = [
  // Listsida för guider
  {
    url: 'https://svalla.se/guider',
    lastModified: TODAY,
    changeFrequency: 'weekly',
    priority: 0.9,
  },

  // Varje publicerad guide — midsommar får högst prioritet
  ...GUIDER.map<SitemapEntry>(g => ({
    url: `https://svalla.se/guider/${g.slug}`,
    lastModified: g.datePublished,
    changeFrequency: 'monthly',
    priority: g.editorsChoice ? 0.95 : 0.7,
  })),

  // Tre äventyrssidor
  {
    url: 'https://svalla.se/gotland/aventyr',
    lastModified: TODAY,
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    url: 'https://svalla.se/aland/aventyr',
    lastModified: TODAY,
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    url: 'https://svalla.se/oland/aventyr',
    lastModified: TODAY,
    changeFrequency: 'monthly',
    priority: 0.8,
  },
]
