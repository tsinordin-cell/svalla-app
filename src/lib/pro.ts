import type { SupabaseClient } from '@supabase/supabase-js'

const PRO_ENABLED = process.env.NEXT_PUBLIC_PRO_ENABLED === 'true'

/**
 * Returnerar true om användaren har aktiv Pro-prenumeration.
 * Returnerar alltid false när NEXT_PUBLIC_PRO_ENABLED !== 'true'.
 */
export async function isPro(
  supabase: SupabaseClient,
  userId: string,
): Promise<boolean> {
  if (!PRO_ENABLED) return false

  const { data } = await supabase
    .from('subscriptions')
    .select('status, current_period_end')
    .eq('user_id', userId)
    .in('status', ['active', 'trialing'])
    .maybeSingle()

  if (!data) return false
  return new Date(data.current_period_end) > new Date()
}

export function isProEnabled(): boolean {
  return PRO_ENABLED
}
