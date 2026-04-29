'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { ReactNode, CSSProperties, MouseEvent } from 'react'
import { createClient } from '@/lib/supabase'

/**
 * AppGateLink — länk som kontrollerar auth innan navigering.
 *
 * Inloggad användare → navigerar direkt till `href`.
 * Icke-inloggad användare → skickas till /logga-in?returnTo=<href>.
 *
 * Används på publika landningssidor för länkar som går in i appens
 * filtrerade vyer (/platser?kategori=X, /rutter?vy=X osv). Så att
 * besökare inte dumpas in i app-känslan utan att förstå att de
 * behöver skapa konto.
 */
export default function AppGateLink({
  href,
  children,
  style,
  className,
  ariaLabel,
}: {
  href: string
  children: ReactNode
  style?: CSSProperties
  className?: string
  ariaLabel?: string
}) {
  const router = useRouter()

  async function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    // Låt standard-beteende fortsätta om användare håller meta/ctrl/shift
    // (öppna i ny flik eller fönster)
    if (e.metaKey || e.ctrlKey || e.shiftKey) return
    e.preventDefault()
    const supabase = createClient()
    const { data: { session } } = await supabase.auth.getSession()
    if (session) {
      router.push(href)
    } else {
      router.push(`/logga-in?mode=ny&returnTo=${encodeURIComponent(href)}`)
    }
  }

  return (
    <Link
      href={href}
      onClick={handleClick}
      style={style}
      className={className}
      aria-label={ariaLabel}
    >
      {children}
    </Link>
  )
}
