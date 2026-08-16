'use client'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { createClient, getViewer } from '@/lib/supabase'

/**
 * Visar server-renderade slots beroende på vem som tittar — utan att sidan
 * som använder den behöver läsa cookies på servern.
 *
 * VARFÖR (2026-08-02): serverns `auth.getUser()` läser cookies, vilket gör
 * hela sidan dynamisk och sätter `revalidate` ur spel (CLAUDE.md p18/p26,
 * samt /u/[username] där exakt samma sak var uppmätt). På /tur/[id] användes
 * inloggningen enbart till UI-villkor: visa höjdpunkts-prompten för ägaren,
 * dölj annonssektionen för ägaren, visa signup-bannern för utloggade.
 *
 * Regeln: en serversida får inte fråga vem du är för att bestämma vad som
 * SYNS. Sådana val görs här, i klienten, medan innehållet i varje gren
 * fortfarande renderas på servern och skickas in färdigt som slots.
 *
 * Renderar null tills svaret finns — hellre att ett ägar-element dyker upp
 * strax efter laddning än att fel persons UI blinkar förbi.
 */
export default function ViewerGate({
  ownerId,
  agare,
  ejAgare,
  inloggad,
  utloggad,
}: {
  /** user_id som äger resursen — krävs för agare/ejAgare-slots. */
  ownerId?: string
  /** Visas bara för resursens ägare. */
  agare?: ReactNode
  /** Visas för alla som INTE är ägaren, inklusive utloggade. */
  ejAgare?: ReactNode
  /** Visas för alla inloggade. */
  inloggad?: ReactNode
  /** Visas bara för utloggade besökare. */
  utloggad?: ReactNode
}) {
  const supabase = useRef(createClient()).current
  const [uid, setUid] = useState<string | null | undefined>(undefined) // undefined = vet inte än

  useEffect(() => {
    let avbruten = false
    getViewer(supabase).then(({ data: { user } }) => {
      if (!avbruten) setUid(user?.id ?? null)
    })
    return () => { avbruten = true }
  }, [supabase])

  if (uid === undefined) return null

  return (
    <>
      {ownerId !== undefined && uid === ownerId && agare}
      {ownerId !== undefined && uid !== ownerId && ejAgare}
      {uid !== null && inloggad}
      {uid === null && utloggad}
    </>
  )
}
