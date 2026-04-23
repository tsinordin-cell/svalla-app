/**
 * Thorkel — copy-bibliotek.
 * Alla strängar från thorkel_brand.md §5. Stoisk, kort, ingen hype.
 */

export const THORKEL_COPY = {
  intros: [
    'Hej. Thorkel heter jag. Lots och skeppare. Vad vill du göra i skärgården?',
    'Thorkel här. Säg vad du vill göra — jag föreslår något.',
    'Skeppare från Möja. Vad planerar du?',
  ],
  placeholders: [
    'Familj, två barn, helg från Stavsnäs…',
    'Middag en kväll, gärna bastu…',
    'Vecka på sjön, bra krogar, inte för stora vatten…',
  ],
  loading: [
    'Thorkel funderar…',
    'Tittar på kartan…',
    'Stämmer av med vädret…',
  ],
  cta: {
    short: 'Fråga Thorkel',
    long:  'Prata med Thorkel',
    send:  'Skicka',
    alt:   'Låt Thorkel svara',
  },
  confirmations: {
    saved:      'Sparat.',
    copied:     'Länken är kopierad.',
    remembered: 'Jag kommer ihåg det.',
  },
  errors: {
    offline:   'Anslutningen tappades. Prova igen om en minut.',
    rateLimit: 'Thorkel har pratat mycket idag. Kom tillbaka om en stund.',
    notLoggedIn: 'Du behöver logga in för att prata med mig — jag sparar mina bästa tips till mina egna seglare.',
  },
} as const
