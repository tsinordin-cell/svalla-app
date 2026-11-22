'use client'
import { useEffect, useState } from 'react'
import { paLedig, slappRuta, taRuta, type RutNamn } from '@/lib/forstaRutor'

/**
 * Bestämmer om en självdykande ruta får synas just nu. Se forstaRutor.ts.
 *
 * `redo`: rutans egna villkor är uppfyllda (cookieval gjort, tiden gått, osv).
 * `paRattSida`: rutan hör hemma på den sida som visas.
 * Returnerar om rutan syns och en funktion som lämnar platsen när den stängs.
 */
export function useForstaRuta(namn: RutNamn, redo: boolean, paRattSida: boolean): [boolean, () => void] {
  const [syns, setSyns] = useState(false)
  const [ledigVarv, setLedigVarv] = useState(0)

  useEffect(() => paLedig(() => setLedigVarv(v => v + 1)), [])

  useEffect(() => {
    if (!redo || !paRattSida) {
      if (syns) { setSyns(false); slappRuta(namn) }
      return
    }
    if (!syns && taRuta(namn)) setSyns(true)
  }, [namn, redo, paRattSida, syns, ledigVarv])

  // Lämna platsen om komponenten försvinner medan rutan syns.
  useEffect(() => () => slappRuta(namn), [namn])

  const lamna = () => { setSyns(false); slappRuta(namn) }
  return [syns, lamna]
}
