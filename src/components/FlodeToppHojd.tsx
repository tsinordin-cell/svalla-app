'use client'
import { useEffect, useRef } from 'react'

/**
 * Flödet (2026-11-25): mäter toppraden och flikraden ovanför den beige toningen och
 * sätter --flode-topp-h på sidan, så att toningen går upp bakom båda raderna
 * (.flode-topp + .feed-ambient-top i globals.css). Renderas inuti .flode-topp;
 * toppraden är elementet strax före. Från 1024 px är toppraden dold och räknas
 * då som 0.
 */
export default function FlodeToppHojd() {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const block = ref.current?.closest<HTMLElement>('.flode-topp')
    const sida = block?.parentElement
    if (!block || !sida) return
    const topprad = block.previousElementSibling as HTMLElement | null

    const mat = () => {
      const h = block.offsetHeight + (topprad?.offsetHeight ?? 0)
      sida.style.setProperty('--flode-topp-h', `${h}px`)
    }
    mat()
    let ro: ResizeObserver | undefined
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(mat)
      ro.observe(block)
      if (topprad) ro.observe(topprad)
    }
    return () => ro?.disconnect()
  }, [])

  return <span ref={ref} hidden />
}
