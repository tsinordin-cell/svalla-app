/**
 * När får en tur synas för andra än ägaren (2026-11-19).
 *
 * Samma villkor som databasens regel trips_select_visible: turen är klar,
 * publik och inte raderad. Funktionen finns för serverkod som har läst turen
 * som ägaren eller med tjänstenyckeln (och alltså ser även privata turer) och
 * ska avgöra om något om turen får skickas vidare till andra, i första hand
 * pushen i /api/trips/[id]/highlight.
 *
 * Besöksnotiserna (/api/notifications/social-visits) har samma villkor
 * inskrivet i sin fråga sedan #606.
 */
export type TurSynlighet = {
  visibility: string | null
  status: string | null
  deleted_at: string | null
}

/** Sann när turen får visas för andra än ägaren. */
export function turArPublik(t: TurSynlighet | null | undefined): boolean {
  return !!t && t.visibility === 'public' && t.status === 'done' && !t.deleted_at
}
