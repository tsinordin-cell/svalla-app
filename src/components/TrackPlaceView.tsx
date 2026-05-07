'use client'
/**
 * TrackPlaceView — fire-and-forget analytics-pixel för plats-sidor.
 *
 * Plats-sidan (/upptack/[id]) är en server component, så vi kan inte
 * anropa `track()` direkt. Den här komponenten monteras som en osynlig
 * klient-cell och skickar `place_viewed` när användaren faktiskt ser
 * sidan i browsern.
 *
 * Använder en ref för att garantera att vi bara skickar EN gång per
 * mount — React StrictMode kör useEffect två gånger i dev annars.
 */
import { useEffect, useRef } from 'react'
import { track } from '@/lib/analytics-events'

interface Props {
  placeId: string
  /** True om besökaren själv "äger" platsen (relevant för t.ex. tur-vyn,
   *  alltid false för restauranger/hamnar — men vi tar emot för konsistens). */
  isOwn?: boolean
}

export default function TrackPlaceView({ placeId }: Props) {
  const fired = useRef(false)
  useEffect(() => {
    if (fired.current) return
    fired.current = true
    track('place_viewed', { place_id: placeId })
  }, [placeId])
  return null
}
