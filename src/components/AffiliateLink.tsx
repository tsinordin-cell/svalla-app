'use client'
/**
 * <AffiliateLink>
 *
 * En premium-känns-affiliate-länk. Diskret "Annons"-badge, går alltid genom
 * /api/affiliate/click för intern tracking, och har rel="sponsored noopener"
 * enligt Google's policy.
 *
 * Användning:
 *   <AffiliateLink
 *     program="watski"
 *     linkId="watski-flytvast-helly-hansen"
 *     placement="tur_gear"
 *     deepLink="https://watski.se/flytvastar/helly-hansen-rider"
 *     utmCampaign="trip_gear_2026q2"
 *   >
 *     Helly Hansen Rider — 1 295 kr på Watski
 *   </AffiliateLink>
 */
import { useCallback } from 'react'
import {
  buildAffiliateUrl,
  trackingRedirectUrl,
  type ProgramId,
  PROGRAMS,
} from '@/lib/affiliate'

type Props = {
  program: ProgramId
  linkId: string
  placement: 'tur_gear' | 'plats_book' | 'guide_recommend' | 'krog_book' | 'route_gear'
  deepLink: string
  utmCampaign: string
  utmContent?: string
  /** Visuell variant. 'inline' = textlänk, 'card' = hela kort-yta klickbar */
  variant?: 'inline' | 'card'
  className?: string
  style?: React.CSSProperties
  children: React.ReactNode
}

export default function AffiliateLink({
  program,
  linkId,
  placement,
  deepLink,
  utmCampaign,
  utmContent,
  variant = 'inline',
  className,
  style,
  children,
}: Props) {
  const programDef = PROGRAMS[program]

  // Bygg final-URL med UTM. trackingRedirectUrl wrappar den i vår egen
  // /api/affiliate/click så vi loggar klicket innan redirect.
  // Falltillbaka till en safe-default när programDef saknas — vi vill
  // inte krascha hela sidan om en länk har felaktigt program-ID.
  const { href: finalDestination, isLive } = programDef
    ? buildAffiliateUrl(program, deepLink, {
        source: 'svalla',
        medium: 'affiliate',
        campaign: utmCampaign,
        content: utmContent,
      })
    : { href: deepLink, isLive: false }

  const trackedHref = programDef
    ? trackingRedirectUrl({
        programId: program,
        linkId,
        placement,
        destination: finalDestination,
      })
    : deepLink

  // Skicka även PostHog-event vid klick — för att korsmäta med vår egen DB.
  // Hooken måste ligga före tidiga returns för att inte bryta hooks-rules.
  const handleClick = useCallback(() => {
    if (typeof window === 'undefined') return
    type PHWindow = Window & { posthog?: { capture: (event: string, props: Record<string, unknown>) => void } }
    const ph = (window as PHWindow).posthog
    if (ph?.capture) {
      ph.capture('affiliate_click', {
        program,
        link_id: linkId,
        placement,
        is_live: isLive,
      })
    }
  }, [program, linkId, placement, isLive])

  // Safe-bail om program-ID är okänt — efter alla hooks
  if (!programDef) return null

  if (variant === 'card') {
    return (
      <a
        href={trackedHref}
        target="_blank"
        rel="sponsored noopener noreferrer"
        onClick={handleClick}
        className={className}
        style={{
          display: 'block',
          textDecoration: 'none',
          color: 'inherit',
          position: 'relative',
          ...style,
        }}
      >
        {children}
        <AnnonsBadge brand={programDef.brand} />
      </a>
    )
  }

  // inline
  return (
    <a
      href={trackedHref}
      target="_blank"
      rel="sponsored noopener noreferrer"
      onClick={handleClick}
      className={className}
      style={{
        color: 'var(--sea, #1e5c82)',
        textDecoration: 'underline',
        textUnderlineOffset: 2,
        ...style,
      }}
      title={`Annons — ${programDef.brand}`}
    >
      {children}
    </a>
  )
}

function AnnonsBadge({ brand }: { brand: string }) {
  return (
    <span
      style={{
        position: 'absolute',
        top: 8,
        right: 8,
        background: 'rgba(0,0,0,0.55)',
        color: 'rgba(255,255,255,0.92)',
        fontSize: 10,
        fontWeight: 600,
        letterSpacing: '0.4px',
        textTransform: 'uppercase',
        padding: '3px 8px',
        borderRadius: 4,
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        pointerEvents: 'none',
      }}
      aria-label={`Annonsör: ${brand}`}
    >
      Annons · {brand}
    </span>
  )
}
