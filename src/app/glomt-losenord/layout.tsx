import type { Metadata } from 'next'

/**
 * Glömt lösenord är robots-blockerad men Google hade ändå indexerat den — troligen
 * via interna länkar från innan blockeringen. robots.txt hindrar crawl, inte
 * indexering; bara ett noindex-svar gör det. Sidan är en klientkomponent och
 * kan inte exportera metadata själv, därför denna layout.
 */
export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default function GlomtLosenordLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
