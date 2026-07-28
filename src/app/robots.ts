import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        // '/planera/' (med slash) är längre än Disallow '/planera' och vinner
        // därför enligt longest-match: publicerade, delbara rutter blir
        // indexerbara medan själva planeringsverktyget /planera förblir blockerat.
        allow: ['/', '/planera-tur', '/planera/'],
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
          '/logga-in',
          '/insikter',
          '/sok',
          '/forum/sok',
          '/registrera-krog',
        ],
      },
    ],
    sitemap: 'https://svalla.se/sitemap.xml',
  }
}

