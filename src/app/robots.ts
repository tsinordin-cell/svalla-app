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
          '/bjud-in',
          '/meddelanden',
          '/importera',
          '/glomt-losenord',
          '/hero-preview',
          '/loppis/sparat',
          '/loppis/mina-annonser',
          '/forum/loppis/*/redigera',
          '/forum/loppis/ny-annons',
          '/sparade',
          '/min-skargard',
          '/onboarding',
          '/check-in',
          '/planera',
          '/admin',
        ],
      },
    ],
    sitemap: 'https://svalla.se/sitemap.xml',
  }
}
