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
          // Privata användarsidor — kräver inloggning
          '/bjud-in',
          '/meddelanden',
          '/importera',
          // Privata Loppis-sidor
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
