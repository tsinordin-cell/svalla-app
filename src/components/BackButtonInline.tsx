'use client'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { IconChevronLeft } from '@/components/ui/icons'
import Icon from '@/components/Icon'

/**
 * `ljus`: vit pil på genomskinlig platta, för mörka sidhuvuden (t.ex. /nyhetsbrev).
 * `flytande`: rund knapp som ligger fast uppe till vänster när man skrollar, med
 * mörk halvgenomskinlig platta så att den syns både över mörk yta och ljust innehåll.
 * Läget och utseendet ligger i klassen .flytande-tillbaka i globals.css
 * (2026-11-25, Tom: profilsidan /u/[namn] utan raden överst).
 *
 * 2026-11-27 (Tom: "samma ikoner ... och utan ringar runt ikonen"): så länge
 * knappen ligger över profilens mörka yta (.u-profil-hero) är den bara en vit
 * pil, utan platta och ring, som ikonerna i den egna profilens topprad. När man
 * skrollat förbi ytan kommer plattan tillbaka, annars syns inte den vita pilen
 * mot det ljusa innehållet.
 */
export default function BackButtonInline({ fallback = '/feed', ljus = false, flytande = false }: { fallback?: string; ljus?: boolean; flytande?: boolean }) {
  const router = useRouter()
  const knappRef = useRef<HTMLButtonElement>(null)
  // Sidan laddas nästan alltid överst, över den mörka ytan: börja utan platta.
  const [overMork, setOverMork] = useState(true)

  useEffect(() => {
    if (!flytande) return
    const uppdatera = () => {
      const yta = document.querySelector<HTMLElement>('.u-profil-hero')
      const knapp = knappRef.current
      if (!yta || !knapp) { setOverMork(false); return }
      // 32 px: den ljusa bågen längst ner i ytan.
      setOverMork(yta.getBoundingClientRect().bottom - 32 > knapp.getBoundingClientRect().bottom)
    }
    uppdatera()
    window.addEventListener('scroll', uppdatera, { passive: true })
    window.addEventListener('resize', uppdatera)
    return () => {
      window.removeEventListener('scroll', uppdatera)
      window.removeEventListener('resize', uppdatera)
    }
  }, [flytande])

  function goBack() {
    if (window.history.length > 1) {
      router.back()
    } else {
      router.push(fallback)
    }
  }

  return (
    <button
      ref={knappRef}
      onClick={goBack}
      aria-label="Gå tillbaka"
      className={flytande ? `press-feedback flytande-tillbaka${overMork ? ' flytande-tillbaka--over-mork' : ''}` : 'press-feedback'}
      style={flytande ? undefined : {
        width: 36, height: 36, borderRadius: '50%',
        background: ljus ? 'rgba(255,255,255,0.14)' : 'rgba(10,123,140,0.08)',
        border: 'none', cursor: 'pointer', flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        WebkitTapHighlightColor: 'transparent',
      }}
    >
      {flytande
        ? <span style={{ color: '#ffffff', display: 'flex' }}><Icon name="chevronLeft" size={22} stroke={2} /></span>
        : <IconChevronLeft size={18} stroke={2.5} color={ljus ? '#ffffff' : 'var(--sea)'} />}
    </button>
  )
}
