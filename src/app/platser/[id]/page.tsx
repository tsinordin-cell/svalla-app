/**
 * Plats-detaljsida har flyttats till /upptack/[id].
 *
 * Behåller filen som permanent redirect så delningar, sökindex, sociala
 * länkar och bookmarks fortfarande fungerar. Next.js skickar 308.
 *
 * Den faktiska sidan finns nu i src/app/upptack/[id]/page.tsx.
 */
import { redirect, permanentRedirect } from 'next/navigation'

export default async function PlatserIdRedirect({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  if (!id) redirect('/upptack')
  permanentRedirect(`/upptack/${id}`)
}
