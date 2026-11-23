'use client'
import { useEffect, useRef, useState } from 'react'

/**
 * Toppbilden på /plats/[slug] med reserv.
 *
 * Bakgrund (mätt 2026-11-23): Google nekar fotonyckeln (403 PERMISSION_DENIED,
 * places.googleapis.com) och 574 av 699 platser har Google-foto som förstaval.
 * <img> saknade reserv, så toppen visade en trasig bildikon och alt-texten.
 * Alla 574 har en egen bild (images/image_url), så nu provas källorna i tur
 * och ordning och nästa visas när en inte går att ladda. Går ingen att ladda
 * visas ingen bild alls, bara havsfärgen bakom.
 *
 * Ett fel som inträffar innan React tagit över sidan fångas inte av onError,
 * därför kontrolleras bilden också när komponenten monteras.
 */
export default function PlatsHeroBild({ kallor, alt }: { kallor: string[]; alt: string }) {
  const [index, setIndex] = useState(0)
  const ref = useRef<HTMLImageElement>(null)
  const src = kallor[index]

  useEffect(() => {
    const img = ref.current
    if (img && img.complete && img.naturalWidth === 0) setIndex(i => i + 1)
  }, [index])

  if (!src) return null
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={ref}
      key={src}
      src={src}
      alt={alt}
      onError={() => setIndex(i => i + 1)}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
    />
  )
}
