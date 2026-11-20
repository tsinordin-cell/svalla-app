/**
 * Hur många sidor ett bygge förbygger (2026-11-20).
 *
 * Varje bygge förbygger databassidorna (platser, forumtrådar, rutter) och gör
 * då cirka 4 000 anrop mot Supabase. Mätt 19–20 nov: 126 byggen på ett dygn,
 * varav tre av fyra var förhandsvisningar som ingen besökare ser. Det drev
 * Supabase över kvoten för loggar och utgående trafik.
 *
 * I en förhandsvisning förbyggs därför bara några få sidor per sidtyp, så att
 * ett renderingsfel fortfarande fäller bygget före merge. Övriga sidor byggs
 * när någon öppnar dem (kräver att routen har dynamicParams på, vilket är
 * standard). Produktion och lokala byggen förbygger allt som förut.
 *
 * Använd INTE på routes med dynamicParams = false: där blir allt utanför
 * urvalet 404 i förhandsvisningen.
 */
export const FORBYGG_I_FORHANDSVISNING = 3

export function forbyggUrval<T>(params: readonly T[], miljo: string | undefined = process.env.VERCEL_ENV): T[] {
  return miljo === 'preview' ? params.slice(0, FORBYGG_I_FORHANDSVISNING) : [...params]
}
