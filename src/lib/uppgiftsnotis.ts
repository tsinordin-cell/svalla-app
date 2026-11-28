/**
 * Notis när någon på /team ger en uppgift till någon annan (Toms beslut 2026-11-28:
 * klockan i appen, push och mejl, "Ja till båda").
 *
 * Här finns bara reglerna och texterna, så att de kan testas utan databas.
 * Routen är src/app/api/team/delegera/route.ts.
 */

/** Notistypen i tabellen notifications (migration 20261128000004). */
export const UPPGIFT_NOTIS_TYP = 'task_assigned'

/** Samma uppgift till samma person ger högst en notis inom det här fönstret (minuter),
 *  så att den som klickar fram och tillbaka på avatarerna inte skickar fem mejl. */
export const UPPGIFT_DUBBLETT_MIN = 10

export function uppgiftLank(taskId: string): string {
  return `/team?uppgift=${encodeURIComponent(taskId)}`
}

/** Ska en notis skickas? Aldrig till sig själv, aldrig när uppgiften saknar mottagare. */
export function skaNotifiera(avsandare: string, mottagare: string | null | undefined): boolean {
  return !!mottagare && mottagare !== avsandare
}

/**
 * Gör uppgiftens titel säker att stoppa in i mejlmallen. Mallen tolkas som
 * markdown och blir HTML, så tecken som kan bli taggar, länkar eller fetstil tas
 * bort eller ersätts. Lång text kortas.
 */
export function sakerTitel(titel: string, max = 120): string {
  const ren = titel
    .replace(/[\r\n\t]+/g, ' ')
    .replace(/[<>]/g, '')
    .replace(/[[\]*_`#|{}\\]/g, '')
    .replace(/&/g, 'och')
    .replace(/\s{2,}/g, ' ')
    .trim()
  if (ren.length === 0) return 'Uppgift utan titel'
  return ren.length > max ? `${ren.slice(0, max - 1).trimEnd()}…` : ren
}

/** Texten i pushnotisen. */
export function uppgiftPush(avsandarNamn: string, titel: string, taskId: string) {
  return {
    title: `${avsandarNamn} gav dig en uppgift`,
    body: sakerTitel(titel, 90),
    url: uppgiftLank(taskId),
  }
}
