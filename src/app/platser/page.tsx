/**
 * /platser-lista är borttagen — all upptäckt sker via /upptack (karta + lista).
 *
 * Behåller filen som en redirect så gamla länkar (delningar, sök, externa
 * referenser) inte 404:ar. Next.js skickar 307/308 så användaren landar
 * på /upptack utan att märka det.
 *
 * Notera: /platser/[id] (enskilda restauranger) ligger kvar — det är basURL:en
 * för plats-detaljsidor som linkas från sökresultat, sociala flöden, etc.
 */
import { redirect } from 'next/navigation'

export default function PlatserListaRedirect() {
  redirect('/upptack')
}
