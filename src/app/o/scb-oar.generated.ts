// GENERERAD av scripts/hamta-scb-oar.mjs 2026-09-29 — ändra inte för hand.
// KÄLLA: https://www.statistikdatabasen.scb.se/pxweb/sv/ssd/START__MI__MI0812__MI0812A/OarEjBro01/ — SCB, "Befolkning och bebyggelse på öar utan fastlandsförbindelse med bro, per ö", referenstid 31 december 2020 (hämtad 2026-09-29)

export type ScbO = {
  /** SCB:s namn på ön, när det skiljer sig från ösidans (t.ex. Sandön för Sandhamn). */
  scbNamn: string
  kommun: string
  /** null = SCB redovisar ingen siffra för ön (".." i tabellen). */
  folkbokforda: number | null
  byggnader: number | null
  bostadsbyggnader: number | null
}

export const SCB_OAR_KALLA = {
  url: 'https://www.statistikdatabasen.scb.se/pxweb/sv/ssd/START__MI__MI0812__MI0812A/OarEjBro01/',
  tabell: 'Befolkning och bebyggelse på öar utan fastlandsförbindelse med bro, per ö',
  referens: '31 december 2020',
  hamtad: '2026-09-29',
} as const

export const SCB_OAR: Record<string, ScbO> = {
  "arholma": {
    "scbNamn": "Arholma",
    "kommun": "Norrtälje",
    "folkbokforda": 40,
    "byggnader": 538,
    "bostadsbyggnader": 198
  },
  "asperon": {
    "scbNamn": "Asperö",
    "kommun": "Göteborg",
    "folkbokforda": 421,
    "byggnader": 518,
    "bostadsbyggnader": 208
  },
  "aspo-blekinge": {
    "scbNamn": "Aspö",
    "kommun": "Karlskrona",
    "folkbokforda": 556,
    "byggnader": 2014,
    "bostadsbyggnader": 597
  },
  "astol": {
    "scbNamn": "Åstol",
    "kommun": "Tjörn",
    "folkbokforda": 169,
    "byggnader": 512,
    "bostadsbyggnader": 184
  },
  "birka": {
    "scbNamn": "Björkö",
    "kommun": "Ekerö",
    "folkbokforda": 10,
    "byggnader": 92,
    "bostadsbyggnader": 26
  },
  "blido": {
    "scbNamn": "Blidö",
    "kommun": "Norrtälje",
    "folkbokforda": 597,
    "byggnader": 4726,
    "bostadsbyggnader": 2114
  },
  "branno": {
    "scbNamn": "Brännö och Galterö",
    "kommun": "Göteborg",
    "folkbokforda": 940,
    "byggnader": 1810,
    "bostadsbyggnader": 712
  },
  "donso": {
    "scbNamn": "Donsö",
    "kommun": "Göteborg",
    "folkbokforda": 1551,
    "byggnader": 1242,
    "bostadsbyggnader": 606
  },
  "dyron": {
    "scbNamn": "Stora Dyrön",
    "kommun": "Tjörn",
    "folkbokforda": 194,
    "byggnader": 601,
    "bostadsbyggnader": 203
  },
  "faro": {
    "scbNamn": "Fårö",
    "kommun": "Gotland",
    "folkbokforda": 495,
    "byggnader": 4152,
    "bostadsbyggnader": 1425
  },
  "fejan": {
    "scbNamn": "Fejan",
    "kommun": "Norrtälje",
    "folkbokforda": null,
    "byggnader": null,
    "bostadsbyggnader": null
  },
  "gallno": {
    "scbNamn": "Gällnö",
    "kommun": "Värmdö",
    "folkbokforda": 28,
    "byggnader": 388,
    "bostadsbyggnader": 188
  },
  "gotland": {
    "scbNamn": "Gotland",
    "kommun": "Gotland",
    "folkbokforda": 59625,
    "byggnader": 87832,
    "bostadsbyggnader": 30133
  },
  "graskar": {
    "scbNamn": "Gräskö",
    "kommun": "Norrtälje",
    "folkbokforda": 24,
    "byggnader": 373,
    "bostadsbyggnader": 153
  },
  "grinda": {
    "scbNamn": "Grinda",
    "kommun": "Värmdö",
    "folkbokforda": null,
    "byggnader": null,
    "bostadsbyggnader": null
  },
  "gullholmen": {
    "scbNamn": "Gullholmen",
    "kommun": "Orust",
    "folkbokforda": 17,
    "byggnader": 261,
    "bostadsbyggnader": 136
  },
  "hano": {
    "scbNamn": "Hanö",
    "kommun": "Sölvesborg",
    "folkbokforda": 11,
    "byggnader": 272,
    "bostadsbyggnader": 96
  },
  "hemson": {
    "scbNamn": "Hemsön",
    "kommun": "Härnösand",
    "folkbokforda": 134,
    "byggnader": 947,
    "bostadsbyggnader": 373
  },
  "holmon": {
    "scbNamn": "Holmön",
    "kommun": "Umeå",
    "folkbokforda": 63,
    "byggnader": 877,
    "bostadsbyggnader": 239
  },
  "hono": {
    "scbNamn": "Hönö",
    "kommun": "Öckerö",
    "folkbokforda": 5555,
    "byggnader": 3806,
    "bostadsbyggnader": 1863
  },
  "husaro": {
    "scbNamn": "Husarö",
    "kommun": "Österåker",
    "folkbokforda": 27,
    "byggnader": 409,
    "bostadsbyggnader": 146
  },
  "ingmarso": {
    "scbNamn": "Ingmarsö",
    "kommun": "Österåker",
    "folkbokforda": 163,
    "byggnader": 844,
    "bostadsbyggnader": 340
  },
  "karingon": {
    "scbNamn": "Käringön",
    "kommun": "Orust",
    "folkbokforda": 80,
    "byggnader": 621,
    "bostadsbyggnader": 242
  },
  "kymmendo": {
    "scbNamn": "Kymmendö",
    "kommun": "Haninge",
    "folkbokforda": 30,
    "byggnader": 80,
    "bostadsbyggnader": 23
  },
  "landsort": {
    "scbNamn": "Öja (Landsort)",
    "kommun": "Nynäshamn",
    "folkbokforda": 27,
    "byggnader": 239,
    "bostadsbyggnader": 78
  },
  "ljustero": {
    "scbNamn": "Ljusterö",
    "kommun": "Österåker",
    "folkbokforda": 1663,
    "byggnader": 8008,
    "bostadsbyggnader": 2793
  },
  "marstrand": {
    "scbNamn": "Marstrandsön",
    "kommun": "Kungälv",
    "folkbokforda": 379,
    "byggnader": 381,
    "bostadsbyggnader": 299
  },
  "moja": {
    "scbNamn": "Möja",
    "kommun": "Värmdö",
    "folkbokforda": 203,
    "byggnader": 1474,
    "bostadsbyggnader": 612
  },
  "namdo": {
    "scbNamn": "Nämdö",
    "kommun": "Värmdö",
    "folkbokforda": 28,
    "byggnader": 661,
    "bostadsbyggnader": 288
  },
  "norrora": {
    "scbNamn": "Norröra",
    "kommun": "Norrtälje",
    "folkbokforda": null,
    "byggnader": null,
    "bostadsbyggnader": null
  },
  "ockero": {
    "scbNamn": "Öckerö",
    "kommun": "Öckerö",
    "folkbokforda": 3570,
    "byggnader": 2442,
    "bostadsbyggnader": 1150
  },
  "orno": {
    "scbNamn": "Ornö",
    "kommun": "Haninge",
    "folkbokforda": 235,
    "byggnader": 2061,
    "bostadsbyggnader": 941
  },
  "rindo": {
    "scbNamn": "Rindö",
    "kommun": "Vaxholm",
    "folkbokforda": 1522,
    "byggnader": 1998,
    "bostadsbyggnader": 543
  },
  "roro": {
    "scbNamn": "Rörö",
    "kommun": "Öckerö",
    "folkbokforda": 250,
    "byggnader": 536,
    "bostadsbyggnader": 234
  },
  "runmaro": {
    "scbNamn": "Runmarö",
    "kommun": "Värmdö",
    "folkbokforda": 263,
    "byggnader": 1773,
    "bostadsbyggnader": 836
  },
  "sandhamn": {
    "scbNamn": "Sandön",
    "kommun": "Värmdö",
    "folkbokforda": 118,
    "byggnader": 865,
    "bostadsbyggnader": 458
  },
  "storholmen": {
    "scbNamn": "Storholmen och Tallholmen",
    "kommun": "Lidingö",
    "folkbokforda": 231,
    "byggnader": 746,
    "bostadsbyggnader": 245
  },
  "styrso": {
    "scbNamn": "Styrsö",
    "kommun": "Göteborg",
    "folkbokforda": 1341,
    "byggnader": 1892,
    "bostadsbyggnader": 759
  },
  "svartso": {
    "scbNamn": "Svartsö",
    "kommun": "Värmdö",
    "folkbokforda": 66,
    "byggnader": 677,
    "bostadsbyggnader": 302
  },
  "tynningo": {
    "scbNamn": "Tynningö",
    "kommun": "Vaxholm",
    "folkbokforda": 353,
    "byggnader": 2502,
    "bostadsbyggnader": 659
  },
  "ulvon": {
    "scbNamn": "Norra Ulvön",
    "kommun": "Örnsköldsvik",
    "folkbokforda": 36,
    "byggnader": 494,
    "bostadsbyggnader": 192
  },
  "uto": {
    "scbNamn": "Utö",
    "kommun": "Haninge",
    "folkbokforda": 191,
    "byggnader": 1286,
    "bostadsbyggnader": 485
  },
  "ven": {
    "scbNamn": "Ven",
    "kommun": "Landskrona",
    "folkbokforda": 372,
    "byggnader": 1354,
    "bostadsbyggnader": 479
  },
  "visingo": {
    "scbNamn": "Visingsö",
    "kommun": "Jönköping",
    "folkbokforda": 716,
    "byggnader": 2069,
    "bostadsbyggnader": 602
  },
  "vrango": {
    "scbNamn": "Vrångö",
    "kommun": "Göteborg",
    "folkbokforda": 377,
    "byggnader": 696,
    "bostadsbyggnader": 237
  },
  "yxlan": {
    "scbNamn": "Yxlan",
    "kommun": "Norrtälje",
    "folkbokforda": 357,
    "byggnader": 2898,
    "bostadsbyggnader": 1358
  }
}
