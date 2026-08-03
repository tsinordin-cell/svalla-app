/**
 * Skalar ned och komprimerar en bild i webbläsaren innan den laddas upp.
 *
 * BAKGRUND (2026-08-02): tre uppladdningsvägar skickade filen precis som den
 * kom från telefonen — `/profil` (avatar), `/check-in` och `/meddelanden`.
 * Uppmätt på riktiga rader i produktionen: snitt 839 kB per bild, värsta
 * fallet 3024x4032 px / 2,7 MB. En avatar som visas i 32x24 px lagrades
 * alltså som en flera megabyte stor JPEG.
 *
 * Det kostar tre gånger: uppladdningen tar lång tid på mobildata (våra
 * användare är ute på sjön med dålig täckning), lagringen växer i onödan,
 * och varje `next/image`-förfrågan måste hämta hela originalet från Supabase
 * innan den kan skala ned det.
 *
 * `/logga/manuell` och `/spara` gjorde redan precis det här — funktionen låg
 * bara kopierad inne i `/logga/manuell`. Den bor här nu så att alla
 * uppladdningsvägar delar samma beteende.
 *
 * Faller alltid tillbaka på originalfilen om något går fel (trasig fil,
 * canvas som inte kan rita, format webbläsaren inte kan avkoda). En
 * uppladdning ska aldrig misslyckas för att komprimeringen inte gick.
 */

/** Foton: 1920 px räcker för allt vi visar, även lightbox på stor skärm. */
export const FOTO_MAX_PX = 1920
/** Avatarer visas aldrig större än ~200 px — 512 ger marginal för retina. */
export const AVATAR_MAX_PX = 512

export async function komprimeraBild(
  file: File,
  maxPx = FOTO_MAX_PX,
  kvalitet = 0.82,
): Promise<File> {
  // Inte en bild (t.ex. video eller HEIC som webbläsaren inte avkodar) → orörd.
  if (!file.type.startsWith('image/')) return file
  return new Promise((resolve) => {
    const img = new Image()
    const url = URL.createObjectURL(file)
    img.onload = () => {
      URL.revokeObjectURL(url)
      let { width, height } = img
      if (width > maxPx || height > maxPx) {
        if (width >= height) { height = Math.round(height * maxPx / width); width = maxPx }
        else                 { width = Math.round(width * maxPx / height);  height = maxPx }
      }
      const canvas = document.createElement('canvas')
      canvas.width = width; canvas.height = height
      const ctx = canvas.getContext('2d')
      if (!ctx) { resolve(file); return }
      ctx.drawImage(img, 0, 0, width, height)
      canvas.toBlob(
        (blob) => {
          if (!blob) { resolve(file); return }
          // Om komprimeringen inte vann något (redan liten, eller PNG med
          // transparens som blir större som JPEG) — behåll originalet.
          if (blob.size >= file.size) { resolve(file); return }
          resolve(new File([blob], file.name.replace(/\.\w+$/, '.jpg'), { type: 'image/jpeg' }))
        },
        'image/jpeg', kvalitet,
      )
    }
    img.onerror = () => { URL.revokeObjectURL(url); resolve(file) }
    img.src = url
  })
}
