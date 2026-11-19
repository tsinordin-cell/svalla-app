/**
 * Standardbilden för delade länkar till sidor utan egen bild (2026-11-19).
 *
 * Varför: Next.js ersätter hela `openGraph` från layouten när en sida sätter
 * ett eget `openGraph`-objekt. Sidor som satte titel och beskrivning men inte
 * `images` saknade därför og:image helt (mätt 2026-11-19: /karta, /oar,
 * /guider, /om, /krogar-och-mat m.fl.), och WhatsApp, Facebook och iMessage
 * visade länken utan bild. Bilden är src/app/opengraph-image.tsx, i samma
 * mall som alla andra delningsbilder (src/app/api/og/_mall/kort.tsx).
 *
 * Sidor med en egen bild (tur, ö, plats, guide, forum, rutt …) ska inte
 * använda den här.
 */
export const OG_STANDARD = [
  { url: '/opengraph-image', width: 1200, height: 630, alt: 'Svalla | Planera din skärgårdsvistelse' },
]

/** Ösidans bild, för öns undersidor (/o/[slug]/bad, /aktivitet/[typ]/[ö] …). */
export function ogO(slug: string) {
  return [{ url: `https://svalla.se/api/og/island/${encodeURIComponent(slug)}`, width: 1200, height: 630 }]
}
