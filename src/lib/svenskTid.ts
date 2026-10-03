/**
 * Klockslaget (0–23) i Sverige, oavsett vilken tidszon servern kör i.
 *
 * revision 2026-10-02: Vercel kör i UTC, så `new Date().getHours()` i en
 * serverkomponent låg en timme fel vintertid och två timmar fel sommartid.
 * Hälsningen på /feed ("God morgon" osv.) räknades därför i UTC.
 */
export function timmeIStockholm(nu: Date = new Date()): number {
  const timme = new Intl.DateTimeFormat('sv-SE', {
    timeZone: 'Europe/Stockholm', hour: '2-digit', hourCycle: 'h23',
  }).formatToParts(nu).find(d => d.type === 'hour')?.value
  const h = Number(timme)
  return Number.isInteger(h) && h >= 0 && h <= 23 ? h : nu.getHours()
}
