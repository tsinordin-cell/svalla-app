import { ritaOgKort } from '@/app/api/og/_mall/kort'

export const runtime = 'nodejs'
export const dynamic = 'force-static'
export const alt = 'Svalla | Planera din skärgårdsvistelse'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/**
 * Standardbilden för länkar till svalla.se och för alla sidor utan egen bild.
 * Gemensam mall (src/app/api/og/_mall/kort.tsx), 2026-11-19. Den tidigare
 * illustrationen (ö, färja, fiskar) ligger kvar i git-historiken.
 */
export default async function OGImage() {
  return ritaOgKort({
    rubrik: 'Planera din skärgårdsvistelse',
    ingress: 'Öar, krogar, badplatser och båttider, samlat på ett ställe.',
  })
}
