'use client'

import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { behoverGuiden, guidenFarVisasPa, tillGuiden } from '@/lib/guidenForst'

/** Satt när kontot har sett aktuell guide; då frågar vi inte databasen igen i fliken. */
export const GUIDE_OK_NYCKEL = 'svalla-guide-ok'
/** Satt när guiden har visats i fliken: den tar inte över en gång till samma session. */
const GUIDE_VISAD_NYCKEL = 'svalla-guide-visad'

/**
 * Inloggade konton som inte har sett aktuell onboarding skickas dit, en gång,
 * och sedan tillbaka till sidan de var på (Toms beslut 2026-11-28: alla
 * tidigare konton ska se den nya guiden). De flesta loggar inte in på nytt
 * (sessionen ligger kvar; 12 inloggningar på 30 dagar, mätt 28 nov), så
 * kontrollen görs när Svalla öppnas, inte bara vid inloggning.
 *
 * Kostnad: ingen för utloggade (sessionen läses lokalt). Inloggade: en liten
 * fråga per flik och session, sedan ingen.
 */
export default function GuideKontroll() {
  const sokvag = usePathname() ?? '/'
  const router = useRouter()

  useEffect(() => {
    if (!guidenFarVisasPa(sokvag)) return
    // En gång per session (2026-11-28): ett befintligt konto öppnade guiden två gånger på sex
    // sekunder utan att trycka på något (mätt i analytics_events). Den som lämnar guiden
    // ska få vara ifred resten av besöket; guiden kommer igen nästa besök.
    try {
      if (sessionStorage.getItem(GUIDE_OK_NYCKEL) === '1' || sessionStorage.getItem(GUIDE_VISAD_NYCKEL) === '1') return
    } catch { return /* ingen lagring: ta inte över, risken för upprepning är större än nyttan */ }
    let avbruten = false
    ;(async () => {
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()
      const id = session?.user?.id
      if (!id || avbruten) return
      const { data, error } = await supabase.from('users').select('guide_version').eq('id', id).maybeSingle<{ guide_version: number | null }>()
      // Fel eller ingen rad: släpp igenom, guiden får inte låsa någon ute.
      if (error || !data || avbruten) return
      if (behoverGuiden(data.guide_version)) {
        try { sessionStorage.setItem(GUIDE_VISAD_NYCKEL, '1') } catch { /* ignoreras */ }
        router.replace(tillGuiden(sokvag + window.location.search))
      } else {
        try { sessionStorage.setItem(GUIDE_OK_NYCKEL, '1') } catch { /* ignoreras */ }
      }
    })()
    return () => { avbruten = true }
  }, [sokvag, router])

  return null
}
