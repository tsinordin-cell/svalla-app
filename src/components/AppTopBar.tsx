import type { ReactNode } from 'react'
import Link from 'next/link'
import SvallaLogo from '@/components/SvallaLogo'
import MessageBell from '@/components/MessageBell'
import NotificationBell from '@/components/NotificationBell'
import SilentBoundary from '@/components/SilentBoundary'
import Icon from '@/components/Icon'
import { TOPPKNAPP_STIL } from '@/components/toppradStil'

/**
 * Appens topprad, samma på huvudsidorna (menyförslaget, Toms ja 2026-11-23).
 *
 * Före: Flöde, Profil, Rutter och Topplista hade var sin header. Planera och
 * Utforska saknade meddelanden och notiser, och ett hus ledde till
 * marknadssajten på Flöde och Profil.
 *
 * Till vänster: loggan (till Flöde) på Flöde, annars sidans namn.
 * Till höger: sök, meddelanden och notiser. På Profil byts sök mot kugghjulet.
 *
 * Från 1024 px finns sök, meddelanden och notiser i sidomenyn, så knapparna
 * döljs där (klassen app-topbar-atgarder i globals.css). Kugghjulet syns alltid.
 */
export default function AppTopBar({
  titel,
  undertitel,
  variant = 'standard',
  hoger,
  doljPaDesktop = false,
  sticky = true,
  bakgrund,
}: {
  /** Sidans namn. Utan titel visas loggan som länk till Flöde. */
  titel?: ReactNode
  undertitel?: ReactNode
  /** 'profil' byter sök mot kugghjulet till inställningarna. */
  variant?: 'standard' | 'profil'
  /** Extra innehåll längst till höger, efter knapparna (t.ex. Thorkel på Rutter). */
  hoger?: ReactNode
  /** Döljer hela raden från 1024 px, där sidomenyn redan har allt (Flöde, Utforska). */
  doljPaDesktop?: boolean
  sticky?: boolean
  /** Bakgrund om sidan har en egen ton bakom raden (Flödets gradient). */
  bakgrund?: string
}) {
  return (
    <header
      className={`app-topbar${doljPaDesktop ? ' app-topbar--dold-desktop' : ''}`}
      style={{
        display: 'flex', alignItems: 'center', gap: 10,
        minHeight: 60,
        padding: '8px 12px 8px 16px',
        background: bakgrund ?? 'var(--header-bg)',
        backdropFilter: 'saturate(1.4) blur(16px)', WebkitBackdropFilter: 'saturate(1.4) blur(16px)',
        borderBottom: '1px solid rgba(10,123,140,0.10)',
        position: sticky ? 'sticky' : 'relative', top: 0, zIndex: 50,
      }}
    >
      <div style={{ minWidth: 0, flex: 1 }}>
        {titel ? (
          <>
            <h1 className="app-topbar-titel" style={{
              fontSize: 20, fontWeight: 700, color: 'var(--sea)', margin: 0,
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}>
              {titel}
            </h1>
            {undertitel && (
              <p style={{ fontSize: 12, color: 'var(--txt3)', margin: '2px 0 0', fontWeight: 500 }}>{undertitel}</p>
            )}
          </>
        ) : (
          <Link href="/feed" aria-label="Svalla, till flödet" className="app-topbar-logga" style={{ display: 'inline-flex', alignItems: 'center', minHeight: 44 }}>
            <SvallaLogo height={26} color="var(--sea)" />
          </Link>
        )}
      </div>
      <TopBarAtgarder variant={variant} />
      {hoger}
    </header>
  )
}

/**
 * Knapparna till höger i toppraden. Används också på sidor som behåller sin
 * egen header (Rutter, Meddelanden), så att knapparna ser lika ut överallt.
 */
export function TopBarAtgarder({ variant = 'standard', utanMeddelanden = false }: { variant?: 'standard' | 'profil'; utanMeddelanden?: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
      <div className="app-topbar-atgarder" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        {variant === 'standard' && (
          <Link href="/sok" aria-label="Sök" className="press-feedback" style={{ ...TOPPKNAPP_STIL, textDecoration: 'none' }}>
            <Icon name="search" size={20} stroke={2} />
          </Link>
        )}
        {!utanMeddelanden && <SilentBoundary><MessageBell /></SilentBoundary>}
        <SilentBoundary><NotificationBell /></SilentBoundary>
      </div>
      {variant === 'profil' && (
        <Link href="/profil/installningar" aria-label="Inställningar" className="press-feedback" style={{ ...TOPPKNAPP_STIL, textDecoration: 'none' }}>
          <Icon name="settings" size={20} stroke={2} />
        </Link>
      )}
    </div>
  )
}
