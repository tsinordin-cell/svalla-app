import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/profil', '/spara', '/logga', '/feed', '/notiser', '/u/'],
      },
    ],
    sitemap: 'https://svalla.se/sitemap.xml',
  }
}
