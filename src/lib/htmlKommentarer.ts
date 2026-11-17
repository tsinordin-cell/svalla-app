/**
 * Tar bort HTML-kommentarer ur guidernas HTML.
 *
 * Källanteckningar (<!-- KÄLLA -->, <!-- OMSKRIVEN -->, <!-- SKRIVEN -->,
 * kort-id och liknande) ska ligga kvar i källfilen, men inte i den HTML
 * eller RSC-payload som skickas till besökaren. Anropas på servern innan
 * innehållet renderas och innan det kan skickas till en klientkomponent.
 */
export function utanHtmlKommentarer(html: string): string {
  return html.replace(/<!--[\s\S]*?-->/g, '')
}
