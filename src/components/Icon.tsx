/**
 * Icon — gemensam SVG-ikon-komponent (Lucide-stil).
 * Används av nya sidor istället för emoji-dekorationer.
 *
 * Använder currentColor så ikonen ärver färg från parent.
 */

const PATHS = {
  // Spara/hjärta
  bookmark: '<path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>',
  heart:    '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>',

  // Navigation/handling
  compass:  '<circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>',
  map:      '<polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/>',
  pin:      '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
  navigation:'<polygon points="3 11 22 2 13 21 11 13 3 11"/>',
  arrowRight:'<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>',

  // Skärgård-relevanta
  anchor:   '<circle cx="12" cy="5" r="2"/><path d="M12 7v13"/><path d="M5 15a7 7 0 0 0 14 0"/><line x1="8" y1="11" x2="16" y2="11"/>',
  sailboat: '<path d="M3 18c2 1 4 1.5 9 1.5s7-.5 9-1.5"/><path d="M12 3v15"/><path d="M12 5l6 10H6z"/>',
  ship:     '<path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1 .6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M19.38 20A11.6 11.6 0 0 0 21 14l-9-4-9 4c0 2.9.94 5.34 2.81 7.76"/><path d="M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6"/><path d="M12 10v4"/><path d="M12 2v3"/>',
  fish:     '<path d="M6.5 12c.94-3.46 4.94-6 8.5-6 3.56 0 6.06 2.54 7 6-.94 3.47-3.44 6-7 6s-7.56-2.53-8.5-6Z"/><path d="M18 12v.5"/><path d="M16 17.93a9.77 9.77 0 0 1 0-11.86"/><path d="M7 10.67C7 8 5.58 5.97 2.73 5.5c-1 1.5-1 5 .23 6.5-1.24 1.5-1.24 5-.23 6.5C5.58 18.03 7 16 7 13.33"/><path d="M10.46 7.26C10.2 5.88 9.17 4.24 8 3h5.8a2 2 0 0 1 1.98 1.67l.23 1.4"/><path d="m16.01 17.93-.23 1.4A2 2 0 0 1 13.8 21H9.5a5.96 5.96 0 0 0 1.49-3.98"/>',
  mountain: '<path d="m8 3 4 8 5-5 5 15H2L8 3z"/>',
  palmtree: '<path d="M13 8c0-2.76-2.46-5-5.5-5S2 5.24 2 8h2l1-1 1 1h4"/><path d="M13 7.14A5.82 5.82 0 0 1 16.5 6c3.04 0 5.5 2.24 5.5 5h-3l-1-1-1 1h-3"/><path d="M5.89 9.71c-2.15 2.15-2.3 5.47-.35 7.43l4.24-4.25.7-.7.71-.71 2.12-2.12c-1.95-1.96-5.27-1.8-7.42.35z"/><path d="M11 15.5c.5 2.5-.17 4.5-1 6.5h4c2-5.5-.5-12-1-14"/>',
  paddle:   '<path d="M16 4 L20 8"/><path d="M14 6 L18 10 Q22 14 16 18 L11 13 Q7 9 11 5 Z"/><line x1="11" y1="13" x2="3" y2="21"/><path d="M3 21l-1 1 1-3z"/>',
  wrench:   '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
  waves:    '<path d="M2 6c2 0 2 2 4 2s2-2 4-2 2 2 4 2 2-2 4-2 2 2 4 2"/><path d="M2 12c2 0 2 2 4 2s2-2 4-2 2 2 4 2 2-2 4-2 2 2 4 2"/><path d="M2 18c2 0 2 2 4 2s2-2 4-2 2 2 4 2 2-2 4-2 2 2 4 2"/>',
  wind:     '<path d="M9.59 4.59A2 2 0 1 1 11 8H2"/><path d="M17.73 18.27A2.5 2.5 0 1 1 19.5 14H2"/><path d="M9.59 19.41A2 2 0 1 0 11 16H2"/>',

  // Service & info
  utensils: '<path d="M3 2v7c0 1.1.9 2 2 2h0a2 2 0 0 0 2-2V2"/><line x1="5" y1="11" x2="5" y2="22"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/>',
  bed:      '<path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/>',
  fuel:     '<line x1="3" y1="22" x2="15" y2="22"/><line x1="4" y1="9" x2="14" y2="9"/><path d="M14 22V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v18"/><path d="M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 2 2a2 2 0 0 0 2-2V9.83a2 2 0 0 0-.59-1.42L18 5"/>',
  building: '<rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/>',

  // Weather
  cloud:    '<path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>',
  rain:     '<line x1="6" y1="9" x2="6" y2="21"/><line x1="12" y1="9" x2="12" y2="21"/><line x1="18" y1="9" x2="18" y2="21"/><path d="M6 6a6 6 0 0 1 12 0c0-1 .656-2 1.775-2 1.656 0 2.965 1.28 2.965 2.881C22 9.5 21.727 12 18 13.5c-4 1.5-9 1-9 1"/>',
  snow:     '<path d="M20.5 9.5l1.41-1.41M12 2v2M2.5 9.5L1.09 8.09M2 12h2M20 12h2M4.22 19.78l1.41-1.41M19.78 4.22l-1.41 1.41"/><polygon points="12 6 15 11 12 16 9 11 12 6"/>',
  fog:      '<line x1="4" y1="9" x2="20" y2="9"/><line x1="3" y1="13" x2="21" y2="13"/><line x1="4" y1="17" x2="20" y2="17"/>',
  moon:     '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>',
  water:    '<path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>',
  shower:   '<path d="M8.5 2a2.5 2.5 0 0 1 5 0M8 9v8M10 9v8M12 9v8M14 9v8"/><path d="M4 15c0 2.21 1.79 4 4 4h8c2.21 0 4-1.79 4-4"/>',
  toilet:   '<rect x="6" y="4" width="12" height="16" rx="1"/><circle cx="12" cy="8" r="1.5"/><path d="M8 20h8"/>',
  parking:  '<circle cx="12" cy="12" r="10"/><path d="M9 8h6a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-1v3h-4v-6a2 2 0 0 1 2-2z" fill="none"/>',
  phone:    '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
  calendar: '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
  clock:    '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
  globe:    '<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
  warning:  '<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3.05h16.94a2 2 0 0 0 1.71-3.05L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
  coffee:   '<path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h12a4 4 0 0 1 4 4v4H2V8z"/><path d="M6 21h8"/><path d="M6 18h8"/>',
  shoppingBag:'<circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>',
  info:     '<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>',

  // Användning
  user:     '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  users:    '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  trendingUp:'<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>',
  target:   '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
  handshake:'<path d="m11 17 2 2a1 1 0 1 0 3-3"/><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"/><path d="m21 3 1 11h-2"/><path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3"/><path d="M3 4h8"/>',

  // Status
  check:    '<polyline points="20 6 9 17 4 12"/>',
  star:     '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
  award:    '<circle cx="12" cy="8" r="6"/><path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"/>',
  trophy:   '<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>',

  // Special
  sun:      '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>',
  leaf:     '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19.2 2.96c1.4 9.3-3.8 15.04-8.2 17.04Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6"/>',
  camera:   '<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>',
  mail:     '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>',

  // Forum / actions
  reply:    '<polyline points="9 17 4 12 9 7"/><path d="M20 18v-2a4 4 0 0 0-4-4H4"/>',
  // Ersätter 💬. Lades till 2026-08-10: fyra av Max byggen låg nere på
  // `Type '"messageCircle"' is not assignable` — den PR som skulle lägga in
  // ikonen föll på ett ORELATERAT fel (cache-guarden), så ikonen landade
  // aldrig, och varje senare gren som använde den ärvde felet.
  messageCircle: '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>',
  edit:     '<path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4z"/>',
  trash:    '<polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/>',
  image:    '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>',
  link:     '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
  atSign:   '<circle cx="12" cy="12" r="4"/><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94"/>',
  send:     '<line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>',
  more:     '<circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>',
  x:        '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
  quote:    '<path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/>',
  bell:     '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>',
  flag:     '<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/>',
  // === Tillagda 2026-08-17: en ikon per begrepp ===
  // Uppsattningen gick fran 64 till 110 ikoner. Innan detta pekade 144
  // emoji-mappningar pa bara 42 ikoner - leaf tackte 20 olika begrepp,
  // building 13, star 7. Kajaken pa /teambuilding var en segelbat.
  backpack:    '<path d="M6 21a2 2 0 0 1-2-2v-8a5 5 0 0 1 5-5h6a5 5 0 0 1 5 5v8a2 2 0 0 1-2 2z"/><path d="M9 6V4.5a3 3 0 0 1 6 0V6"/><path d="M9 13h6"/><path d="M9 21v-4h6v4"/>',
  barChart:    '<path d="M3 21h18"/><path d="M6 21v-8"/><path d="M12 21V7"/><path d="M18 21v-5"/>',
  bathtub:     '<path d="M3 12h18v3a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4z"/><path d="M6 12V6a2 2 0 0 1 4 0"/><path d="m5.5 19-1 2.5"/><path d="m18.5 19 1 2.5"/>',
  beach:       '<path d="M12 4v17"/><path d="M4 12a8 8 0 0 1 16 0z"/><path d="M2 21c2 0 2-1.4 4-1.4S8 21 10 21s2-1.4 4-1.4S16 21 18 21s2-1.4 4-1.4"/>',
  beer:        '<path d="M5 7.5h11V20a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1z"/><path d="M16 9.5h2a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-2"/><path d="M8.5 11v6"/><path d="M12.5 11v6"/><path d="M5 7.5C5 5.6 7.5 4.5 10.5 4.5S16 5.6 16 7.5"/>',
  bike:        '<circle cx="18.5" cy="17.5" r="3.5"/><circle cx="5.5" cy="17.5" r="3.5"/><circle cx="15" cy="5" r="1"/><path d="M12 17.5V14l-3-3 4-3 2 3h2"/>',
  binoculars:  '<path d="M7 21a3 3 0 0 1-3-3V9.5L6 3h3v6h6V3h3l2 6.5V18a3 3 0 0 1-6 0v-6H10v6a3 3 0 0 1-3 3z"/><path d="M9 9h6"/>',
  bird:        '<path d="M21 5c-1.8 0-3.4 1-4.2 2.5L7 16.5c-1 1-2.7.9-3.6-.3"/><circle cx="18.5" cy="4.5" r="1"/><path d="m13 10 1.5 6"/><path d="M22 3.5 20 5"/>',
  book:        '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/><path d="M9 7h8"/>',
  bridge:      '<path d="M2 18h20"/><path d="M4.5 18V8"/><path d="M19.5 18V8"/><path d="M4.5 12.5c4.5-4.5 10.5-4.5 15 0"/><path d="M9.5 18v-4"/><path d="M14.5 18v-4"/>',
  bus:         '<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M3 10h18"/><path d="M8 4v6"/><path d="M16 4v6"/><circle cx="7.5" cy="20" r="1.5"/><circle cx="16.5" cy="20" r="1.5"/>',
  car:         '<path d="M5 17H3v-4l2-5h14l2 5v4h-2"/><path d="M4 13h16"/><circle cx="7.5" cy="17" r="2"/><circle cx="16.5" cy="17" r="2"/><path d="M9.5 17h5"/>',
  castle:      '<path d="M3 21V10l2.5-2L8 10V7l4-2.5L16 7v3l2.5-2L21 10v11z"/><path d="M10 21v-5a2 2 0 1 1 4 0v5"/><path d="M3 21h18"/>',
  child:       '<circle cx="12" cy="8" r="4"/><path d="M10.4 7.4h.01"/><path d="M13.6 7.4h.01"/><path d="M10.6 10c.7.6 2.1.6 2.8 0"/><path d="M6 21v-1.5A3.5 3.5 0 0 1 9.5 16h5a3.5 3.5 0 0 1 3.5 3.5V21"/>',
  church:      '<path d="M12 2v6"/><path d="M10 4.5h4"/><path d="m5 12.5 7-4.5 7 4.5V21H5z"/><path d="M10 21v-4a2 2 0 1 1 4 0v4"/>',
  clipboard:   '<rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M9 12h6"/><path d="M9 16h4"/>',
  crown:       '<path d="m3 7.5 4 3.5L12 4l5 7 4-3.5L19 20H5z"/><path d="M5 20h14"/>',
  diving:      '<path d="M4 9h11a1 1 0 0 1 1 1v2a3 3 0 0 1-3 3h-1l-2-2H9l-2 2H6a3 3 0 0 1-3-3v-2a1 1 0 0 1 1-1z"/><path d="M16 10V6a2 2 0 0 1 2-2h2"/>',
  dog:         '<path d="M4.5 5.5 3 4v5.5l1.8 1.8V20a1 1 0 0 0 1 1h12.4a1 1 0 0 0 1-1v-8.7L21 9.5V4l-1.5 1.5"/><path d="M4.5 5.5C6 4 8.8 3 12 3s6 1 7.5 2.5"/><circle cx="9.5" cy="11.5" r=".7"/><circle cx="14.5" cy="11.5" r=".7"/><path d="M12 14v1.6"/>',
  fire:        '<path d="M12 3c3 4 6 6 6 10a6 6 0 0 1-12 0c0-2.2 1-3.8 2.2-5.2.5 1.6 1.6 2.2 2.6 2.2 0-3 .4-5 1.2-7z"/>',
  fishing:     '<path d="M3 3c6.5 1.2 11.5 5.5 13.5 11.5"/><path d="M3 3v4.5"/><path d="M16.5 14.5V18a3 3 0 0 1-6 0"/>',
  home:        '<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"/><path d="M9 21v-7h6v7"/>',
  island:      '<path d="M11 21V11"/><path d="M11 11c0-3 2.2-5 5-4.6"/><path d="M11 11c0-3-2.2-5-5-4.6"/><path d="M11 11c1.2-2.2 3.4-3 5.6-2"/><path d="M2 21h20"/>',
  key:         '<circle cx="7.5" cy="15.5" r="3.5"/><path d="m10 13 9-9"/><path d="m17 6 2 2"/><path d="m14 9 2 2"/>',
  lightbulb:   '<path d="M9 18h6"/><path d="M10 21h4"/><path d="M12 3a6 6 0 0 0-3.6 10.8c.5.4.9 1 1 1.7l.1.5h5l.1-.5c.1-.7.5-1.3 1-1.7A6 6 0 0 0 12 3z"/>',
  lock:        '<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
  money:       '<circle cx="12" cy="12" r="9"/><path d="M12 6v12"/><path d="M15 9.4c0-1.3-1.3-2.4-3-2.4s-3 1.1-3 2.4S10.3 12 12 12s3 1.2 3 2.6-1.3 2.4-3 2.4-3-1.1-3-2.4"/>',
  museum:      '<path d="m12 3 9 5H3z"/><path d="M3 21h18"/><path d="M5.5 21V10"/><path d="M9.5 21V10"/><path d="M14.5 21V10"/><path d="M18.5 21V10"/>',
  music:       '<circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/><path d="M9 18V5l12-2v13"/>',
  palette:     '<path d="M12 2.5c-5.5 0-10 4.3-10 9.5s4.5 9.5 10 9.5c.9 0 1.6-.7 1.6-1.6 0-.4-.2-.8-.5-1.1-.3-.3-.4-.6-.4-1 0-.9.7-1.6 1.6-1.6H16c3.3 0 6-2.7 6-6 0-4.8-4.5-7.7-10-7.7z"/><circle cx="8.5" cy="8" r=".9"/><circle cx="13.5" cy="6.5" r=".9"/><circle cx="17" cy="10" r=".9"/><circle cx="6.5" cy="13" r=".9"/>',
  pickaxe:     '<path d="M14 4c2.5-1 5.5-.5 7 1.5-2.5 1-4 3-4 5.5"/><path d="M10 4C7.5 3 4.5 3.5 3 5.5c2.5 1 4 3 4 5.5"/><path d="M12 11 4 21"/><path d="M7 11h10"/>',
  rocket:      '<path d="M12 2c3 2.5 5 6.5 5 11l-2 3H9l-2-3c0-4.5 2-8.5 5-11z"/><circle cx="12" cy="10" r="2"/><path d="m9 16-3 5 4-1"/><path d="m15 16 3 5-4-1"/>',
  salad:       '<path d="M3 12.5h18a9 9 0 0 1-18 0z"/><path d="M12 12.5c0-3 2.2-5 5-4.6"/><path d="M12 12.5c-1-2.2-3.2-3-5.4-2"/><path d="M7 21h10"/><path d="M8.5 17.5h7"/>',
  scale:       '<path d="M12 3v18"/><path d="M8 21h8"/><path d="M12 6H7L4 12h6z"/><path d="M4 12c0 1.7 1.3 3 3 3s3-1.3 3-3"/><path d="M12 6h5l3 6h-6z"/><path d="M14 12c0 1.7 1.3 3 3 3s3-1.3 3-3"/>',
  shellfish:   '<path d="M12 4.5c4.4 0 8 3.4 8 7.5H4c0-4.1 3.6-7.5 8-7.5z"/><path d="M12 4.5V12"/><path d="M8.4 5.6 10 12"/><path d="M15.6 5.6 14 12"/><path d="M4 12c0 3 3.6 5.5 8 5.5s8-2.5 8-5.5"/>',
  sparkles:    '<path d="m12 3 1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/><path d="m19 15 .8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z"/>',
  sunrise:     '<path d="M12 2v5"/><path d="m5.5 8.5 1.5 1.5"/><path d="M18.5 8.5 17 10"/><path d="M6 17a6 6 0 0 1 12 0"/><path d="M2 17h20"/><path d="M2 21h20"/>',
  surf:        '<path d="M8 20c-3 0-5-2-5-5 0-7 6-13 12-13 4 0 6 2 6 6 0 6-6 12-13 12z"/><path d="M6.5 14.5C10 13 14 9 15.5 5"/>',
  swim:        '<circle cx="18" cy="6" r="1.8"/><path d="m4 12.5 4-2.5 4 2.5 3-1.5"/><path d="M12 12.5 15.5 8"/><path d="M2 18c1.6 0 1.6 1.5 3.2 1.5S6.8 18 8.4 18s1.6 1.5 3.2 1.5S13.2 18 14.8 18s1.6 1.5 3.2 1.5S19.6 18 21.2 18"/>',
  swords:      '<path d="M14.5 17.5 21 11l-2-2-6.5 6.5"/><path d="m3 3 6 6"/><path d="M9.5 17.5 3 11l2-2 6.5 6.5"/><path d="m21 3-6 6"/><path d="m5 19 2 2"/><path d="m19 19-2 2"/>',
  tent:        '<path d="M12 4 3 20h18z"/><path d="M12 4v16"/><path d="M8.5 20 12 13l3.5 7"/>',
  ticket:      '<path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4z"/><path d="M13 6v2"/><path d="M13 11v2"/><path d="M13 16v2"/>',
  tower:       '<path d="M9.5 21 12 3l2.5 18"/><path d="M8 13h8"/><path d="M6 21h12"/>',
  tree:        '<path d="M12 2 5 12h4l-4 6h14l-4-6h4z"/><path d="M12 18v4"/>',
  walk:        '<circle cx="13" cy="4" r="2"/><path d="m9.5 21 2.5-6 1-3-1-4"/><path d="m12 12 3 2 1.5 4"/><path d="m8 11 4-3"/><path d="M15 21h-2"/>',
  wheat:       '<path d="M12 22V8"/><path d="M12 12c-2.2-.8-3.2-2.8-2.2-4.8 2.2.2 3.4 2 2.2 4.8z"/><path d="M12 12c2.2-.8 3.2-2.8 2.2-4.8-2.2.2-3.4 2-2.2 4.8z"/><path d="M12 17c-2.2-.8-3.2-2.8-2.2-4.8 2.2.2 3.4 2 2.2 4.8z"/><path d="M12 17c2.2-.8 3.2-2.8 2.2-4.8-2.2.2-3.4 2-2.2 4.8z"/>',
  // Tillagda 2026-08-17: teambuilding-aktiviteterna
  pan:          '<path d="M3 11h13v3a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5z"/><path d="M16 11h3a2.5 2.5 0 0 0 0-5h-1.5"/><path d="m6.5 8 1-2.2"/><path d="m10.5 8 1-2.2"/>',
  climb:        '<circle cx="14" cy="4" r="2"/><path d="M5 21v-5l4-3 1-4"/><path d="m10 9 4 2 1 4"/><path d="M14 15v6"/><path d="m10 9-4 1"/><path d="M15 11h4"/>',
  toast:        '<path d="M5 3h6l-1.2 6a2 2 0 0 1-3.6 0z"/><path d="M8 12v8"/><path d="M5.5 20h5"/><path d="M13 3h6l-1.2 6a2 2 0 0 1-3.6 0z"/><path d="M16 12v8"/><path d="M13.5 20h5"/>',
  // Tillagda 2026-08-18: begrepp som foll tillbaka pa kompassen
  bread:        '<path d="M5 9.5C5 6.5 8 5 12 5s7 1.5 7 4.5c0 1.3-.9 2-2 2v6.5a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-6.5c-1.1 0-2-.7-2-2z"/><path d="M10 11.5v7"/><path d="M14 11.5v7"/>',
  droplet:      '<path d="M12 2.7 6.8 8.5a7.2 7.2 0 1 0 10.4 0z"/>',
  iceCream:     '<path d="M8 10a4 4 0 0 1 8 0z"/><path d="M7.5 10h9L12 21z"/><path d="M6.5 13.5h11"/>',
  iceCube:      '<path d="M12 2.5 21 7v10l-9 4.5L3 17V7z"/><path d="M12 2.5V21.5"/><path d="M3 7l9 4.7L21 7"/>',
  lifebuoy:     '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3.6"/><path d="m5.6 5.6 3.9 3.9"/><path d="m14.5 14.5 3.9 3.9"/><path d="m18.4 5.6-3.9 3.9"/><path d="m9.5 14.5-3.9 3.9"/>',
  plane:        '<path d="M17.8 19.2 16 11l3.5-3.5a2.1 2.1 0 0 0-3-3L13 8 4.8 6.2a1 1 0 0 0-1 1.6l5.4 4-2.4 3.2-2.6-.6a.8.8 0 0 0-.8 1.3l2.6 2.6a.8.8 0 0 0 1.3-.2l.6-2.6 3.2-2.4 4 5.4a1 1 0 0 0 1.6-1z"/>',
  train:        '<rect x="4" y="3" width="16" height="13" rx="2"/><path d="M4 10h16"/><circle cx="8.5" cy="13" r=".8"/><circle cx="15.5" cy="13" r=".8"/><path d="m6 21 2-3"/><path d="m18 21-2-3"/><path d="M7 21h10"/>',
  wine:         '<path d="M8 3h8l-.7 6.2a3.4 3.4 0 0 1-6.6 0z"/><path d="M12 12.6V20"/><path d="M8.5 20h7"/>',
} as const

export type IconName = keyof typeof PATHS

/** Alla giltiga ikonnamn i runtime — emojiToIcon använder den för att känna
 *  igen datafält som redan innehåller ett ikonnamn istället för en emoji. */
export const ICON_NAMES = new Set(Object.keys(PATHS))

interface Props {
  name: IconName
  size?: number
  stroke?: number
  className?: string
  style?: React.CSSProperties
  'aria-label'?: string
}

export default function Icon({
  name,
  size = 16,
  stroke = 1.8,
  className,
  style,
  'aria-label': ariaLabel,
}: Props) {
  // Defensiv lookup: om name inte finns i PATHS (t.ex. runtime-string från
  // databas eller content-fil som inte typchecks), fall back till tom path.
  // Annars kraschar React build med "props.dangerouslySetInnerHTML must be
  // in the form {__html: ...}" när __html är undefined.
  const path = (PATHS as Record<string, string>)[name] ?? ''
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={{ flexShrink: 0, ...style }}
      role={ariaLabel ? 'img' : 'presentation'}
      aria-label={ariaLabel}
      aria-hidden={!ariaLabel}
      dangerouslySetInnerHTML={{ __html: path }}
    />
  )
}
