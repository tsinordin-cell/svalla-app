'use client'
/**
 * Lyssnar på länkar som öppnar Svalla-appen (2026-11-22). Just nu bara
 * se.svalla.app://auth/callback, som avslutar Google-inloggningen i appens
 * webbvy. Se lib/appInloggning.ts. Gör ingenting på webben.
 */
import { useEffect } from 'react'
import { arIApp, webbvagForAppLank } from '@/lib/appInloggning'

export default function AppLankLyssnare() {
  useEffect(() => {
    let avbruten = false
    let ta_bort: (() => void) | null = null
    ;(async () => {
      if (!(await arIApp())) return
      try {
        const { App } = await import('@capacitor/app')
        const handtag = await App.addListener('appUrlOpen', ({ url }) => {
          const vag = webbvagForAppLank(url)
          if (vag) window.location.href = `${window.location.origin}${vag}`
        })
        if (avbruten) handtag.remove()
        else ta_bort = () => { handtag.remove() }
      } catch {
        // Pluginet saknas i en äldre appbyggnad: inget att göra.
      }
    })()
    return () => { avbruten = true; ta_bort?.() }
  }, [])
  return null
}
