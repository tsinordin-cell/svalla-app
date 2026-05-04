import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/profil',
          '/spara',
          '/logga',
          '/feed',
          '/notiser',
          '/u/',
          // Privata Loppis-sidor — innehåller inloggad användares wishlist/säljarvy
          '/loppis/sparat',
          '/loppis/mina-annonser',
          // Redigera-flöden ska inte indexeras
          '/forum/loppis/*/redigera',
          '/forum/loppis/ny-annons',
        ],
      },
    ],
    sitemap: 'https://svalla.se/sitemap.xml',
  }
}
