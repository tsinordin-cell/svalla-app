import { redirect } from 'next/navigation'

/**
 * /dag — pausad feature.
 *
 * Featuren "Min dag" byggdes som MVP men avskaffades efter intern review:
 * algoritmiska förslag gav inte tillräckligt värde över befintlig /upptack-karta.
 *
 * Koden ligger kvar (DagClient.tsx, dagPlanner.ts, /api/dag/save) som
 * branchpunkt om vi vill återkomma med kuration (manuellt designade dagsplaner)
 * istället för algoritm.
 *
 * Tills vidare: redirect till /upptack där användaren själv kan välja platser.
 */
export default function DagPage() {
  redirect('/upptack')
}
