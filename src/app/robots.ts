import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        // '/planera/' (med slash) är längre än Disallow '/planera' och vinner
        // därför enligt longest-match: publicerade, delbara rutter blir
        // indexerbara medan själva planeringsverktyget /planera förblir blockerat.
        //
        // '/api/og/' är tillåten med flit. Sidorna under den svarar med
        // X-Robots-Tag: noindex (se next.config), och Googlebot måste få
        // crawla dem för att se den headern.
        allow: ['/', '/planera-tur', '/planera/', '/api/og/'],

        // OBS — robots.txt hindrar CRAWL, inte INDEXERING. En blockerad sida
        // som andra länkar till kan hamna i indexet ändå ("Indexed, though
        // blocked by robots.txt", 31 sidor i GSC 2026-07-28). Vill man ha bort
        // en sida ur indexet måste Google få crawla den och se ett noindex.
        //
        // Därför ligger INTE följande kvar här längre — de har noindex via
        // sin layout.tsx i stället, vilket faktiskt tar bort dem:
        //   /logga-in, /logga, /check-in, /onboarding, /glomt-losenord
        //
        // Listan nedan är sidor som varken ska crawlas eller riskerar att
        // länkas in utifrån.
        disallow: [
          '/api/',
          '/profil',
          '/spara',
          '/feed',
          '/notiser',
          '/u/',
          '/bjud-in',
          '/meddelanden',
          '/importera',
          '/hero-preview',
          '/loppis/sparat',
          '/loppis/mina-annonser',
          '/forum/loppis/*/redigera',
          '/forum/loppis/ny-annons',
          '/sparade',
          '/min-skargard',
          '/planera',
          '/admin',
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

