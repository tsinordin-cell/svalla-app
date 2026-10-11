// IndexNow-nyckeln, som Bing hämtar för att verifiera att anropen kommer från
// sajtens ägare. Se src/lib/indexnow.ts.
export const dynamic = 'force-dynamic'

export function GET() {
  const key = process.env.INDEXNOW_KEY
  if (!key) return new Response('Not found', { status: 404 })
  return new Response(key, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
