'use client'
import { useRouter } from 'next/navigation'
import { IconChevronLeft } from '@/components/ui/icons'

/**
 * `ljus`: vit pil på genomskinlig platta, för mörka sidhuvuden (t.ex. /nyhetsbrev).
 * `flytande`: rund knapp som ligger fast uppe till vänster när man skrollar, med
 * mörk halvgenomskinlig platta så att den syns både över mörk yta och ljust innehåll.
 * Läget och utseendet ligger i klassen .flytande-tillbaka i globals.css
 * (2026-11-25, Tom: profilsidan /u/[namn] utan raden överst).
 */
export default function BackButtonInline({ fallback = '/feed', ljus = false, flytande = false }: { fallback?: string; ljus?: boolean; flytande?: boolean }) {
  const router = useRouter()

  function goBack() {
    if (window.history.length > 1) {
      router.back()
    } else {
      router.push(fallback)
    }
  }

  return (
    <button
      onClick={goBack}
      aria-label="Gå tillbaka"
      className={flytande ? 'press-feedback flytande-tillbaka' : 'press-feedback'}
      style={flytande ? undefined : {
        width: 36, height: 36, borderRadius: '50%',
        background: ljus ? 'rgba(255,255,255,0.14)' : 'rgba(10,123,140,0.08)',
        border: 'none', cursor: 'pointer', flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        WebkitTapHighlightColor: 'transparent',
      }}
    >
      <IconChevronLeft size={flytande ? 20 : 18} stroke={2.5} color={ljus || flytande ? '#ffffff' : 'var(--sea)'} />
    </button>
  )
}
