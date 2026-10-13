/**
 * Besökarens IP för rate limiting i route handlers.
 *
 * Vercel sätter `x-forwarded-for` till "klient, proxy1, proxy2". Bara första
 * värdet är besökaren; hela strängen som nyckel ger en ny räknare per
 * proxykedja och gör gränsen verkningslös.
 */
export function klientIp(req: Request): string {
  const xff = req.headers.get('x-forwarded-for')
  const forsta = xff?.split(',')[0]?.trim()
  return forsta || req.headers.get('x-real-ip') || 'okand'
}
