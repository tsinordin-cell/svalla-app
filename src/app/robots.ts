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
          // Privata/utility-sidor
          '/bjud-in',
          '/meddelanden',
          '/importera',
          '/glomt-losenord',
          '/hero-preview',
          // Privata Loppis-sidor
          '/loppis/sparat',
          '/loppis/mina-annonser',
          // Redigera-flöden
          '/forum/loppis/*/redigera',
          '/forum/loppis/ny-annons',
        ],
      },
    ],
    sitemap: 'https://svalla.se/sitemap.xml',
  }
}
