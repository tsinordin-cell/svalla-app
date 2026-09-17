// GENERERAD AV scripts/hamta-obilder.mjs — REDIGERA INTE FÖR HAND.
//
// Ett representativt foto per ö från Wikimedia Commons, valt via Wikidatas
// P18 ("bild") där den finns och Commons-kategorin annars. Fritextsökning
// används inte: den ger fel motiv, och ett foto av fel sak är sämre än inget.
//
// Alla bilder har fri licens och namngiven fotograf. Bägge MÅSTE visas vid
// bilden — det är villkoret för att vi får använda den.

export type Obild = {
  url: string
  bredd: number
  hojd: number
  /** Fotoår enligt Commons, när det finns. Arkivbilder undviks. */
  ar: number | null
  /** Fotografens namn. Ska visas. Licensvillkor, inte artighet. */
  fotograf: string
  /** T.ex. "CC BY-SA 4.0". Ska visas. */
  licens: string
  licensUrl: string | null
  /** Bildens sida på Wikimedia Commons */
  kalla: string
}

export const OBILDER: Record<string, Obild> = {
  "sandhamn": {
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/81/Sandhamn_Island_-_typical_street_view_with_a_midsommarst%C3%A5ng_or_Midsummer_Pole..jpg/1280px-Sandhamn_Island_-_typical_street_view_with_a_midsommarst%C3%A5ng_or_Midsummer_Pole..jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "bredd": 1200,
    "hojd": 900,
    "ar": 2011,
    "fotograf": "Rosser1954",
    "licens": "CC BY-SA 3.0",
    "licensUrl": "https://creativecommons.org/licenses/by-sa/3.0",
    "kalla": "https://commons.wikimedia.org/wiki/File:Sandhamn_Island_-_typical_street_view_with_a_midsommarst%C3%A5ng_or_Midsummer_Pole..jpg"
  },
  "uto": {
    "url": "https://upload.wikimedia.org/wikipedia/commons/a/ac/SPM_A0857.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled",
    "bredd": 1200,
    "hojd": 1600,
    "ar": 2009,
    "fotograf": "Pewee",
    "licens": "Public domain",
    "licensUrl": null,
    "kalla": "https://commons.wikimedia.org/wiki/File:SPM_A0857.jpg"
  },
  "vaxholm": {
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/cb/Vaxholm_february_2013.jpg/1280px-Vaxholm_february_2013.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "bredd": 1200,
    "hojd": 684,
    "ar": 2013,
    "fotograf": "Arild Vågen",
    "licens": "CC BY-SA 3.0",
    "licensUrl": "https://creativecommons.org/licenses/by-sa/3.0",
    "kalla": "https://commons.wikimedia.org/wiki/File:Vaxholm_february_2013.jpg"
  },
  "grinda": {
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d1/Grinda_V%C3%A4rdshuset.jpg/1280px-Grinda_V%C3%A4rdshuset.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "bredd": 1200,
    "hojd": 753,
    "ar": 2006,
    "fotograf": "Brion VIBBER",
    "licens": "CC BY 2.5",
    "licensUrl": "https://creativecommons.org/licenses/by/2.5",
    "kalla": "https://commons.wikimedia.org/wiki/File:Grinda_V%C3%A4rdshuset.jpg"
  },
  "finnhamn": {
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4d/Finnhamn_July_2015_02.jpg/1280px-Finnhamn_July_2015_02.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "bredd": 1200,
    "hojd": 801,
    "ar": 2015,
    "fotograf": "Arild Vågen",
    "licens": "CC BY-SA 4.0",
    "licensUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "kalla": "https://commons.wikimedia.org/wiki/File:Finnhamn_July_2015_02.jpg"
  },
  "moja": {
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/dc/Hamnen_vid_L%C3%B6ka_p%C3%A5_M%C3%B6ja.jpg/1280px-Hamnen_vid_L%C3%B6ka_p%C3%A5_M%C3%B6ja.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "bredd": 1200,
    "hojd": 804,
    "ar": 2009,
    "fotograf": "Dick Rochester",
    "licens": "CC BY-SA 2.0",
    "licensUrl": "https://creativecommons.org/licenses/by-sa/2.0",
    "kalla": "https://commons.wikimedia.org/wiki/File:Hamnen_vid_L%C3%B6ka_p%C3%A5_M%C3%B6ja.jpg"
  },
  "fjaderholmarna": {
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a3/Fjaderholmen_2007.jpg/1280px-Fjaderholmen_2007.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "bredd": 1200,
    "hojd": 712,
    "ar": 2007,
    "fotograf": "Holger Ellgaard",
    "licens": "CC BY-SA 3.0",
    "licensUrl": "https://creativecommons.org/licenses/by-sa/3.0",
    "kalla": "https://commons.wikimedia.org/wiki/File:Fjaderholmen_2007.jpg"
  },
  "ljustero": {
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/bc/0218_Vaxholm-M%C3%B6ja-G%C3%A4lln%C3%B6_round_trip_August_2014_-_panoramio.jpg/1280px-0218_Vaxholm-M%C3%B6ja-G%C3%A4lln%C3%B6_round_trip_August_2014_-_panoramio.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "bredd": 1200,
    "hojd": 600,
    "ar": 2014,
    "fotograf": "Bengt Nyman",
    "licens": "CC BY 3.0",
    "licensUrl": "https://creativecommons.org/licenses/by/3.0",
    "kalla": "https://commons.wikimedia.org/wiki/File:0218_Vaxholm-M%C3%B6ja-G%C3%A4lln%C3%B6_round_trip_August_2014_-_panoramio.jpg"
  },
  "dalaro": {
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a3/Dalar%C3%B6.jpg/1280px-Dalar%C3%B6.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "bredd": 1200,
    "hojd": 703,
    "ar": 2008,
    "fotograf": "Markus Bernet",
    "licens": "CC BY-SA 2.5",
    "licensUrl": "https://creativecommons.org/licenses/by-sa/2.5",
    "kalla": "https://commons.wikimedia.org/wiki/File:Dalar%C3%B6.jpg"
  },
  "arholma": {
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/28/Batteri_Arholma_topp_panorama.jpg/1280px-Batteri_Arholma_topp_panorama.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "bredd": 1200,
    "hojd": 315,
    "ar": 2010,
    "fotograf": "Arvid Rudling",
    "licens": "CC BY-SA 3.0",
    "licensUrl": "https://creativecommons.org/licenses/by-sa/3.0",
    "kalla": "https://commons.wikimedia.org/wiki/File:Batteri_Arholma_topp_panorama.jpg"
  },
  "orno": {
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e8/Orn%C3%B6_kyrka.jpg/1280px-Orn%C3%B6_kyrka.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "bredd": 1200,
    "hojd": 803,
    "ar": 2008,
    "fotograf": "Dick Rochester",
    "licens": "CC BY-SA 2.0",
    "licensUrl": "https://creativecommons.org/licenses/by-sa/2.0",
    "kalla": "https://commons.wikimedia.org/wiki/File:Orn%C3%B6_kyrka.jpg"
  },
  "landsort": {
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/54/Landsort_2012d.jpg/1280px-Landsort_2012d.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "bredd": 1200,
    "hojd": 1028,
    "ar": 2012,
    "fotograf": "Arild Vågen",
    "licens": "CC BY-SA 3.0",
    "licensUrl": "https://creativecommons.org/licenses/by-sa/3.0",
    "kalla": "https://commons.wikimedia.org/wiki/File:Landsort_2012d.jpg"
  },
  "furusund": {
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3f/Furusunds_v%C3%A4rdshus.jpg/1280px-Furusunds_v%C3%A4rdshus.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "bredd": 1200,
    "hojd": 863,
    "ar": 2010,
    "fotograf": "Udo Schröter",
    "licens": "CC BY-SA 3.0",
    "licensUrl": "https://creativecommons.org/licenses/by-sa/3.0",
    "kalla": "https://commons.wikimedia.org/wiki/File:Furusunds_v%C3%A4rdshus.jpg"
  },
  "blido": {
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/03/106_Bruket_Blid%C3%B6.jpg/1280px-106_Bruket_Blid%C3%B6.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "bredd": 1200,
    "hojd": 900,
    "ar": 2011,
    "fotograf": "LittleGun",
    "licens": "CC BY-SA 3.0",
    "licensUrl": "https://creativecommons.org/licenses/by-sa/3.0",
    "kalla": "https://commons.wikimedia.org/wiki/File:106_Bruket_Blid%C3%B6.jpg"
  },
  "gallno": {
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/be/G%C3%A4lln%C3%B6_July_2017_05.jpg/1280px-G%C3%A4lln%C3%B6_July_2017_05.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "bredd": 1200,
    "hojd": 801,
    "ar": 2017,
    "fotograf": "Arild Vågen",
    "licens": "CC BY-SA 4.0",
    "licensUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "kalla": "https://commons.wikimedia.org/wiki/File:G%C3%A4lln%C3%B6_July_2017_05.jpg"
  },
  "norrora": {
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e9/Snickarg%C3%A5rden%2C_Norr%C3%B6ra.JPG/1280px-Snickarg%C3%A5rden%2C_Norr%C3%B6ra.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "bredd": 1200,
    "hojd": 900,
    "ar": 2011,
    "fotograf": "Sune Hamrin",
    "licens": "CC0",
    "licensUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
    "kalla": "https://commons.wikimedia.org/wiki/File:Snickarg%C3%A5rden,_Norr%C3%B6ra.JPG"
  },
  "nattaro": {
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e9/%C3%96stra_N%C3%A5ttar%C3%B6_juli_2009.png/1280px-%C3%96stra_N%C3%A5ttar%C3%B6_juli_2009.png?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "bredd": 1200,
    "hojd": 900,
    "ar": 2009,
    "fotograf": "M0aslu1001",
    "licens": "CC BY-SA 3.0",
    "licensUrl": "https://creativecommons.org/licenses/by-sa/3.0",
    "kalla": "https://commons.wikimedia.org/wiki/File:%C3%96stra_N%C3%A5ttar%C3%B6_juli_2009.png"
  },
  "ingmarso": {
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ab/S%C3%B6draIngmars%C3%B62010.JPG/1280px-S%C3%B6draIngmars%C3%B62010.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "bredd": 1200,
    "hojd": 900,
    "ar": 2010,
    "fotograf": "Ankara",
    "licens": "CC BY-SA 3.0",
    "licensUrl": "https://creativecommons.org/licenses/by-sa/3.0",
    "kalla": "https://commons.wikimedia.org/wiki/File:S%C3%B6draIngmars%C3%B62010.JPG"
  },
  "namdo": {
    "url": "https://upload.wikimedia.org/wikipedia/commons/7/79/Wikipedia_namdobote.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled",
    "bredd": 1200,
    "hojd": 900,
    "ar": 2006,
    "fotograf": "Unsound at Swedish Wikipedia",
    "licens": "CC BY-SA 3.0",
    "licensUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
    "kalla": "https://commons.wikimedia.org/wiki/File:Wikipedia_namdobote.jpg"
  },
  "svartso": {
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/de/Svarts%C3%B6_Alsvik.jpg/1280px-Svarts%C3%B6_Alsvik.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "bredd": 1200,
    "hojd": 900,
    "ar": 2009,
    "fotograf": "Lidingo",
    "licens": "CC BY-SA 3.0",
    "licensUrl": "https://creativecommons.org/licenses/by-sa/3.0",
    "kalla": "https://commons.wikimedia.org/wiki/File:Svarts%C3%B6_Alsvik.jpg"
  },
  "runmaro": {
    "url": "https://upload.wikimedia.org/wikipedia/commons/7/7f/Runmar%C3%B6_-_KMB_-_16001000453864.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled",
    "bredd": 1200,
    "hojd": 801,
    "ar": 2010,
    "fotograf": "Jan Augustsson",
    "licens": "CC BY 2.5",
    "licensUrl": "https://creativecommons.org/licenses/by/2.5",
    "kalla": "https://commons.wikimedia.org/wiki/File:Runmar%C3%B6_-_KMB_-_16001000453864.jpg"
  },
  "resaro": {
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/93/Resaro_waterfront_%287410383928%29.jpg/1280px-Resaro_waterfront_%287410383928%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "bredd": 1200,
    "hojd": 418,
    "ar": 2012,
    "fotograf": "Bengt Nyman from Vaxholm, Sweden",
    "licens": "CC BY 2.0",
    "licensUrl": "https://creativecommons.org/licenses/by/2.0",
    "kalla": "https://commons.wikimedia.org/wiki/File:Resaro_waterfront_(7410383928).jpg"
  },
  "husaro": {
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/de/Husar%C3%B6_harbour_01.jpg/1280px-Husar%C3%B6_harbour_01.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "bredd": 1200,
    "hojd": 435,
    "ar": 2024,
    "fotograf": "Sinikka Halme",
    "licens": "CC BY-SA 4.0",
    "licensUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "kalla": "https://commons.wikimedia.org/wiki/File:Husar%C3%B6_harbour_01.jpg"
  },
  "fejan": {
    "url": "https://upload.wikimedia.org/wikipedia/commons/a/a2/Kongohuset.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled",
    "bredd": 1200,
    "hojd": 1600,
    "ar": 2008,
    "fotograf": "Niklas Jakobsen",
    "licens": "Public domain",
    "licensUrl": null,
    "kalla": "https://commons.wikimedia.org/wiki/File:Kongohuset.JPG"
  },
  "rodloga": {
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b8/D810_0351_%2814725125812%29.jpg/1280px-D810_0351_%2814725125812%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "bredd": 1200,
    "hojd": 801,
    "ar": 2014,
    "fotograf": "Bengt Nyman from Vaxholm, Sweden",
    "licens": "CC BY 2.0",
    "licensUrl": "https://creativecommons.org/licenses/by/2.0",
    "kalla": "https://commons.wikimedia.org/wiki/File:D810_0351_(14725125812).jpg"
  },
  "singo": {
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/52/Dalviken_December_2012.JPG/1280px-Dalviken_December_2012.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "bredd": 1200,
    "hojd": 900,
    "ar": 2012,
    "fotograf": "Djursholmsbladet123",
    "licens": "CC BY-SA 4.0",
    "licensUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "kalla": "https://commons.wikimedia.org/wiki/File:Dalviken_December_2012.JPG"
  },
  "lido": {
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8d/Lid%C3%B6_kvarn.JPG/1280px-Lid%C3%B6_kvarn.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "bredd": 1200,
    "hojd": 1361,
    "ar": 2012,
    "fotograf": "Einarspetz",
    "licens": "CC BY-SA 3.0",
    "licensUrl": "https://creativecommons.org/licenses/by-sa/3.0",
    "kalla": "https://commons.wikimedia.org/wiki/File:Lid%C3%B6_kvarn.JPG"
  },
  "graddo": {
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/46/Fejan%2C_Gr%C3%A4dd%C3%B6%2C_Sweden_%28Unsplash%29.jpg/1280px-Fejan%2C_Gr%C3%A4dd%C3%B6%2C_Sweden_%28Unsplash%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "bredd": 1200,
    "hojd": 801,
    "ar": 2016,
    "fotograf": "Niklas Veenhuis niklasveenhuis",
    "licens": "CC0",
    "licensUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
    "kalla": "https://commons.wikimedia.org/wiki/File:Fejan,_Gr%C3%A4dd%C3%B6,_Sweden_(Unsplash).jpg"
  },
  "vaddo": {
    "url": "https://upload.wikimedia.org/wikipedia/commons/0/02/V%C3%A4dd%C3%B6_och_H%C3%A4ver%C3%B6_skeppslag.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled",
    "bredd": 1200,
    "hojd": 1896,
    "ar": 2009,
    "fotograf": "Daniel Bjelke",
    "licens": "Public domain",
    "licensUrl": null,
    "kalla": "https://commons.wikimedia.org/wiki/File:V%C3%A4dd%C3%B6_och_H%C3%A4ver%C3%B6_skeppslag.jpg"
  },
  "asko": {
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/84/Ask%C3%B6_Laboratory.jpg/1280px-Ask%C3%B6_Laboratory.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "bredd": 1200,
    "hojd": 899,
    "ar": 2009,
    "fotograf": "Hans Hillewaert",
    "licens": "CC BY-SA 3.0",
    "licensUrl": "https://creativecommons.org/licenses/by-sa/3.0",
    "kalla": "https://commons.wikimedia.org/wiki/File:Ask%C3%B6_Laboratory.jpg"
  },
  "galo": {
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ec/DSC_9652_hus.jpg/1280px-DSC_9652_hus.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "bredd": 1200,
    "hojd": 800,
    "ar": 2021,
    "fotograf": "Per W",
    "licens": "CC BY-SA 4.0",
    "licensUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "kalla": "https://commons.wikimedia.org/wiki/File:DSC_9652_hus.jpg"
  },
  "toro": {
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/50/Tor%C3%B6_kyrka_2015b.jpg/1280px-Tor%C3%B6_kyrka_2015b.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "bredd": 1200,
    "hojd": 886,
    "ar": 2015,
    "fotograf": "Holger.Ellgaard",
    "licens": "CC BY-SA 4.0",
    "licensUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "kalla": "https://commons.wikimedia.org/wiki/File:Tor%C3%B6_kyrka_2015b.jpg"
  },
  "fjardlang": {
    "url": "https://upload.wikimedia.org/wikipedia/commons/6/65/Fjardlang_P9230090_%2852103910%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled",
    "bredd": 1200,
    "hojd": 900,
    "ar": 2000,
    "fotograf": "oskar karlin",
    "licens": "CC BY-SA 2.0",
    "licensUrl": "https://creativecommons.org/licenses/by-sa/2.0",
    "kalla": "https://commons.wikimedia.org/wiki/File:Fjardlang_P9230090_(52103910).jpg"
  },
  "rindo": {
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/dd/Rind%C3%B6_redutt_2011d.jpg/1280px-Rind%C3%B6_redutt_2011d.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "bredd": 1200,
    "hojd": 900,
    "ar": 2011,
    "fotograf": "Holger.Ellgaard",
    "licens": "CC BY-SA 3.0",
    "licensUrl": "https://creativecommons.org/licenses/by-sa/3.0",
    "kalla": "https://commons.wikimedia.org/wiki/File:Rind%C3%B6_redutt_2011d.jpg"
  },
  "yxlan": {
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ae/108_Duvn%C3%A4s_brygga_Yxlan.jpg/1280px-108_Duvn%C3%A4s_brygga_Yxlan.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "bredd": 1200,
    "hojd": 745,
    "ar": 2011,
    "fotograf": "LittleGun",
    "licens": "CC BY-SA 3.0",
    "licensUrl": "https://creativecommons.org/licenses/by-sa/3.0",
    "kalla": "https://commons.wikimedia.org/wiki/File:108_Duvn%C3%A4s_brygga_Yxlan.jpg"
  },
  "kymmendo": {
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a6/Kymmend%C3%B62010c.jpg/1280px-Kymmend%C3%B62010c.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "bredd": 1200,
    "hojd": 900,
    "ar": 2010,
    "fotograf": "Ankara",
    "licens": "CC BY 3.0",
    "licensUrl": "https://creativecommons.org/licenses/by/3.0",
    "kalla": "https://commons.wikimedia.org/wiki/File:Kymmend%C3%B62010c.jpg"
  },
  "bullero": {
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6c/Bulleron_house.jpg/1280px-Bulleron_house.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "bredd": 1200,
    "hojd": 750,
    "ar": 2016,
    "fotograf": "Esquilo",
    "licens": "CC BY-SA 3.0",
    "licensUrl": "https://creativecommons.org/licenses/by-sa/3.0",
    "kalla": "https://commons.wikimedia.org/wiki/File:Bulleron_house.jpg"
  },
  "vindo": {
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a4/Vind%C3%B6_hamn_01.jpg/1280px-Vind%C3%B6_hamn_01.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "bredd": 1200,
    "hojd": 718,
    "ar": 2021,
    "fotograf": "Bengt Oberger",
    "licens": "CC BY-SA 4.0",
    "licensUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "kalla": "https://commons.wikimedia.org/wiki/File:Vind%C3%B6_hamn_01.jpg"
  },
  "smaadalaro": {
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a9/Sm%C3%A5dalar%C3%B6_2016.jpg/1280px-Sm%C3%A5dalar%C3%B6_2016.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "bredd": 1200,
    "hojd": 872,
    "ar": 2016,
    "fotograf": "Holger.Ellgaard",
    "licens": "CC BY-SA 4.0",
    "licensUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "kalla": "https://commons.wikimedia.org/wiki/File:Sm%C3%A5dalar%C3%B6_2016.jpg"
  },
  "morko": {
    "url": "https://upload.wikimedia.org/wikipedia/commons/2/2e/M%C3%B6rk%C3%B6_location.png?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled",
    "bredd": 1200,
    "hojd": 1400,
    "ar": 2011,
    "fotograf": "Esquilo",
    "licens": "CC BY-SA 3.0",
    "licensUrl": "https://creativecommons.org/licenses/by-sa/3.0",
    "kalla": "https://commons.wikimedia.org/wiki/File:M%C3%B6rk%C3%B6_location.png"
  },
  "musko": {
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/83/Arbottna%2C_Bruksholmen%2C_2017.jpg/1280px-Arbottna%2C_Bruksholmen%2C_2017.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "bredd": 1200,
    "hojd": 853,
    "ar": 2017,
    "fotograf": "Holger.Ellgaard",
    "licens": "CC BY-SA 4.0",
    "licensUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "kalla": "https://commons.wikimedia.org/wiki/File:Arbottna,_Bruksholmen,_2017.jpg"
  },
  "adelsjo": {
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/bd/Kungsh%C3%B6garna_Adels%C3%B6_48_4_September_2013_04.jpg/1280px-Kungsh%C3%B6garna_Adels%C3%B6_48_4_September_2013_04.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "bredd": 1200,
    "hojd": 801,
    "ar": 2013,
    "fotograf": "Arild Vågen",
    "licens": "CC BY-SA 3.0",
    "licensUrl": "https://creativecommons.org/licenses/by-sa/3.0",
    "kalla": "https://commons.wikimedia.org/wiki/File:Kungsh%C3%B6garna_Adels%C3%B6_48_4_September_2013_04.jpg"
  },
  "ingaro": {
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/78/Bj%C3%B6rkvik_Ingar%C3%B6_Stockholm_archipelago.JPG/1280px-Bj%C3%B6rkvik_Ingar%C3%B6_Stockholm_archipelago.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "bredd": 1200,
    "hojd": 838,
    "ar": 2009,
    "fotograf": "Pererikjohan",
    "licens": "Public domain",
    "licensUrl": null,
    "kalla": "https://commons.wikimedia.org/wiki/File:Bj%C3%B6rkvik_Ingar%C3%B6_Stockholm_archipelago.JPG"
  },
  "svenska-hogarna": {
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/93/Svenska_H%C3%B6garna_June_2014_03.jpg/1280px-Svenska_H%C3%B6garna_June_2014_03.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "bredd": 1200,
    "hojd": 801,
    "ar": 2014,
    "fotograf": "Arild Vågen",
    "licens": "CC BY-SA 3.0",
    "licensUrl": "https://creativecommons.org/licenses/by-sa/3.0",
    "kalla": "https://commons.wikimedia.org/wiki/File:Svenska_H%C3%B6garna_June_2014_03.jpg"
  },
  "huvudskar": {
    "url": "https://upload.wikimedia.org/wikipedia/commons/9/9b/Huvudskar_fyr.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled",
    "bredd": 1200,
    "hojd": 900,
    "ar": 2003,
    "fotograf": "E94flu",
    "licens": "CC BY 2.5",
    "licensUrl": "https://creativecommons.org/licenses/by/2.5",
    "kalla": "https://commons.wikimedia.org/wiki/File:Huvudskar_fyr.JPG"
  },
  "hasselo": {
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a9/DIMG_9996_%285891696241%29.jpg/1280px-DIMG_9996_%285891696241%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "bredd": 1200,
    "hojd": 795,
    "ar": 2010,
    "fotograf": "Bengt Nyman from Vaxholm, Sweden",
    "licens": "CC BY 2.0",
    "licensUrl": "https://creativecommons.org/licenses/by/2.0",
    "kalla": "https://commons.wikimedia.org/wiki/File:DIMG_9996_(5891696241).jpg"
  },
  "ormsko": {
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4e/Ormsk%C3%A4rs_kummel.jpg/1280px-Ormsk%C3%A4rs_kummel.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "bredd": 1200,
    "hojd": 900,
    "ar": 2016,
    "fotograf": "Gotogo",
    "licens": "CC BY-SA 4.0",
    "licensUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "kalla": "https://commons.wikimedia.org/wiki/File:Ormsk%C3%A4rs_kummel.jpg"
  },
  "norrpada": {
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e3/Norrpada_pelarorden_4.jpg/1280px-Norrpada_pelarorden_4.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "bredd": 1200,
    "hojd": 900,
    "ar": 2018,
    "fotograf": "LittleGun",
    "licens": "CC BY-SA 4.0",
    "licensUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "kalla": "https://commons.wikimedia.org/wiki/File:Norrpada_pelarorden_4.jpg"
  },
  "graskar": {
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/08/Gr%C3%A4sk%C3%B6huset.jpg/1280px-Gr%C3%A4sk%C3%B6huset.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "bredd": 1200,
    "hojd": 798,
    "ar": 2009,
    "fotograf": "Christopher Björk",
    "licens": "CC0",
    "licensUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
    "kalla": "https://commons.wikimedia.org/wiki/File:Gr%C3%A4sk%C3%B6huset.jpg"
  },
  "storholmen": {
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8c/Linje_80%2C_Storholmen_from_the_south.jpg/1280px-Linje_80%2C_Storholmen_from_the_south.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "bredd": 1200,
    "hojd": 900,
    "ar": 2023,
    "fotograf": "Gerda Arendt",
    "licens": "CC BY-SA 4.0",
    "licensUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "kalla": "https://commons.wikimedia.org/wiki/File:Linje_80,_Storholmen_from_the_south.jpg"
  },
  "langskar": {
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4c/D810_0321_%2814725116702%29.jpg/1280px-D810_0321_%2814725116702%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "bredd": 1200,
    "hojd": 600,
    "ar": 2014,
    "fotograf": "Bengt Nyman from Vaxholm, Sweden",
    "licens": "CC BY 2.0",
    "licensUrl": "https://creativecommons.org/licenses/by/2.0",
    "kalla": "https://commons.wikimedia.org/wiki/File:D810_0321_(14725116702).jpg"
  },
  "storskar": {
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4c/D810_0321_%2814725116702%29.jpg/1280px-D810_0321_%2814725116702%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "bredd": 1200,
    "hojd": 600,
    "ar": 2014,
    "fotograf": "Bengt Nyman from Vaxholm, Sweden",
    "licens": "CC BY 2.0",
    "licensUrl": "https://creativecommons.org/licenses/by/2.0",
    "kalla": "https://commons.wikimedia.org/wiki/File:D810_0321_(14725116702).jpg"
  },
  "ulvon": {
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/33/09A_Sandvikens_forna_fiskel%C3%A4ge_p%C3%A5_norra_Ulv%C3%B6n.jpg/1280px-09A_Sandvikens_forna_fiskel%C3%A4ge_p%C3%A5_norra_Ulv%C3%B6n.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "bredd": 1200,
    "hojd": 800,
    "ar": 2010,
    "fotograf": "Geological Survey of Sweden SGU from Sweden",
    "licens": "CC BY 2.0",
    "licensUrl": "https://creativecommons.org/licenses/by/2.0",
    "kalla": "https://commons.wikimedia.org/wiki/File:09A_Sandvikens_forna_fiskel%C3%A4ge_p%C3%A5_norra_Ulv%C3%B6n.jpg"
  },
  "gotland": {
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5b/Helgumannen_%282%29_hq.JPG/1280px-Helgumannen_%282%29_hq.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "bredd": 1200,
    "hojd": 800,
    "ar": 2010,
    "fotograf": "Schorle",
    "licens": "CC BY-SA 3.0",
    "licensUrl": "https://creativecommons.org/licenses/by-sa/3.0",
    "kalla": "https://commons.wikimedia.org/wiki/File:Helgumannen_(2)_hq.JPG"
  },
  "oland": {
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fc/Resmo%2CKvarnar_vid_Gynge_h%C3%B6g_01.jpg/1280px-Resmo%2CKvarnar_vid_Gynge_h%C3%B6g_01.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "bredd": 1200,
    "hojd": 801,
    "ar": 2017,
    "fotograf": "Bernt Fransson,Lindås",
    "licens": "CC BY-SA 4.0",
    "licensUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "kalla": "https://commons.wikimedia.org/wiki/File:Resmo,Kvarnar_vid_Gynge_h%C3%B6g_01.jpg"
  },
  "branno": {
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/08/Br%C3%A4nn%C3%B6_%2C_husIMG_7236_%2B.JPG/1280px-Br%C3%A4nn%C3%B6_%2C_husIMG_7236_%2B.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "bredd": 1200,
    "hojd": 800,
    "ar": 2015,
    "fotograf": "Semin",
    "licens": "CC BY-SA 4.0",
    "licensUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "kalla": "https://commons.wikimedia.org/wiki/File:Br%C3%A4nn%C3%B6_,_husIMG_7236_%2B.JPG"
  },
  "styrso": {
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0a/The_Island_Styrs%C3%B6.jpg/1280px-The_Island_Styrs%C3%B6.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "bredd": 1200,
    "hojd": 803,
    "ar": 2011,
    "fotograf": "Nathan Meijer",
    "licens": "CC BY 2.0",
    "licensUrl": "https://creativecommons.org/licenses/by/2.0",
    "kalla": "https://commons.wikimedia.org/wiki/File:The_Island_Styrs%C3%B6.jpg"
  },
  "vrango": {
    "url": "https://upload.wikimedia.org/wikipedia/commons/3/3a/Vrango.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled",
    "bredd": 1200,
    "hojd": 797,
    "ar": 2005,
    "fotograf": "Gamborg",
    "licens": "CC BY-SA 3.0",
    "licensUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
    "kalla": "https://commons.wikimedia.org/wiki/File:Vrango.JPG"
  },
  "donso": {
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c4/Dons%C3%B6_July_2024_02.jpg/1280px-Dons%C3%B6_July_2024_02.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "bredd": 1200,
    "hojd": 801,
    "ar": 2024,
    "fotograf": "ArildV",
    "licens": "CC BY-SA 4.0",
    "licensUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "kalla": "https://commons.wikimedia.org/wiki/File:Dons%C3%B6_July_2024_02.jpg"
  },
  "tynningo": {
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c6/Cable_ferry_Linea_on_Tynning%C3%B6leden_by_Tynning%C3%B6_ferry_slip_01.jpg/1280px-Cable_ferry_Linea_on_Tynning%C3%B6leden_by_Tynning%C3%B6_ferry_slip_01.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "bredd": 1200,
    "hojd": 854,
    "ar": 2022,
    "fotograf": "Sinikka Halme",
    "licens": "CC BY-SA 4.0",
    "licensUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "kalla": "https://commons.wikimedia.org/wiki/File:Cable_ferry_Linea_on_Tynning%C3%B6leden_by_Tynning%C3%B6_ferry_slip_01.jpg"
  },
  "birka": {
    "url": "https://upload.wikimedia.org/wikipedia/commons/a/ac/BirkaExcavation1.png?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled",
    "bredd": 1200,
    "hojd": 788,
    "ar": 2004,
    "fotograf": "Alex Peterson",
    "licens": "CC BY-SA 3.0",
    "licensUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
    "kalla": "https://commons.wikimedia.org/wiki/File:BirkaExcavation1.png"
  },
  "lilla-karlso": {
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7b/Lilla_Karls%C3%B6-1.jpg/1280px-Lilla_Karls%C3%B6-1.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "bredd": 1200,
    "hojd": 463,
    "ar": 2009,
    "fotograf": "This image was produced by me, David Castor (user:dcastor). The pictures I submit to the Wikipedia Project are released to the public domain. This gives you the right to use them in any way you like, without any kind of notification. This said, I would still appreciate to be mentioned as the originator whenever you think it complies well with your use of the picture. A message to me about how it has been used would also be welcome. You are obviously not required to respond to these wishes of mine, just in a friendly manner encouraged to. (All my photos are placed in Category:Images by David Castor or a subcategory thereof.)",
    "licens": "Public domain",
    "licensUrl": null,
    "kalla": "https://commons.wikimedia.org/wiki/File:Lilla_Karls%C3%B6-1.jpg"
  },
  "hemson": {
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/05/Hems%C3%B6_f%C3%A4stning_01.jpg/1280px-Hems%C3%B6_f%C3%A4stning_01.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "bredd": 1200,
    "hojd": 900,
    "ar": 2003,
    "fotograf": "Hans Lindqvist",
    "licens": "CC BY-SA 3.0",
    "licensUrl": "https://creativecommons.org/licenses/by-sa/3.0",
    "kalla": "https://commons.wikimedia.org/wiki/File:Hems%C3%B6_f%C3%A4stning_01.jpg"
  },
  "faro": {
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/ff/Rauks_%283881539849%29.jpg/1280px-Rauks_%283881539849%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "bredd": 1200,
    "hojd": 803,
    "ar": 2009,
    "fotograf": "allen watkin from London, UK",
    "licens": "CC BY-SA 2.0",
    "licensUrl": "https://creativecommons.org/licenses/by-sa/2.0",
    "kalla": "https://commons.wikimedia.org/wiki/File:Rauks_(3881539849).jpg"
  },
  "trysunda": {
    "url": "https://upload.wikimedia.org/wikipedia/commons/7/7c/Trysunda1.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled",
    "bredd": 1200,
    "hojd": 875,
    "ar": 2006,
    "fotograf": "Skogsfrun",
    "licens": "CC BY-SA 3.0",
    "licensUrl": "https://creativecommons.org/licenses/by-sa/3.0",
    "kalla": "https://commons.wikimedia.org/wiki/File:Trysunda1.jpg"
  },
  "hano": {
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f9/HanoFyr20150724-10.JPG/1280px-HanoFyr20150724-10.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "bredd": 1200,
    "hojd": 800,
    "ar": 2015,
    "fotograf": "Patrik Nylin",
    "licens": "CC BY-SA 4.0",
    "licensUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "kalla": "https://commons.wikimedia.org/wiki/File:HanoFyr20150724-10.JPG"
  },
  "svartloga": {
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d3/Svartl%C3%B6ga%2C_sj%C3%B6bodar.jpg/1280px-Svartl%C3%B6ga%2C_sj%C3%B6bodar.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "bredd": 1200,
    "hojd": 750,
    "ar": 2013,
    "fotograf": "Esquilo",
    "licens": "CC BY-SA 3.0",
    "licensUrl": "https://creativecommons.org/licenses/by-sa/3.0",
    "kalla": "https://commons.wikimedia.org/wiki/File:Svartl%C3%B6ga,_sj%C3%B6bodar.jpg"
  },
  "visingo": {
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3f/Brahekyrkan_view01.jpg/1280px-Brahekyrkan_view01.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "bredd": 1200,
    "hojd": 1037,
    "ar": 2006,
    "fotograf": "Håkan Svensson (Xauxa)",
    "licens": "CC BY 2.5",
    "licensUrl": "https://creativecommons.org/licenses/by/2.5",
    "kalla": "https://commons.wikimedia.org/wiki/File:Brahekyrkan_view01.jpg"
  },
  "ven": {
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2b/Ven-from-east.jpg/1280px-Ven-from-east.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "bredd": 1200,
    "hojd": 659,
    "ar": 2018,
    "fotograf": "Bjørn Christian Tørrissen",
    "licens": "CC BY-SA 4.0",
    "licensUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "kalla": "https://commons.wikimedia.org/wiki/File:Ven-from-east.jpg"
  },
  "tjaro": {
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f4/Tjaro20110725-34.JPG/1280px-Tjaro20110725-34.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "bredd": 1200,
    "hojd": 800,
    "ar": 2011,
    "fotograf": "Patrik Nylin",
    "licens": "CC BY-SA 4.0",
    "licensUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "kalla": "https://commons.wikimedia.org/wiki/File:Tjaro20110725-34.JPG"
  },
  "ockero": {
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/00/Northern_Archipelago%2C_Gothenburg_-_panoramio.jpg/1280px-Northern_Archipelago%2C_Gothenburg_-_panoramio.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "bredd": 1200,
    "hojd": 800,
    "ar": 2016,
    "fotograf": "Alexey Komarov",
    "licens": "CC BY 3.0",
    "licensUrl": "https://creativecommons.org/licenses/by/3.0",
    "kalla": "https://commons.wikimedia.org/wiki/File:Northern_Archipelago,_Gothenburg_-_panoramio.jpg"
  },
  "roro": {
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7d/Klappersten.jpg/1280px-Klappersten.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "bredd": 1200,
    "hojd": 800,
    "ar": 2008,
    "fotograf": "Björn J.",
    "licens": "CC BY 3.0",
    "licensUrl": "https://creativecommons.org/licenses/by/3.0",
    "kalla": "https://commons.wikimedia.org/wiki/File:Klappersten.jpg"
  },
  "holmon": {
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/34/Holm%C3%B6n_01.JPG/1280px-Holm%C3%B6n_01.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "bredd": 1200,
    "hojd": 803,
    "ar": 2011,
    "fotograf": "Jopparn",
    "licens": "CC BY-SA 3.0",
    "licensUrl": "https://creativecommons.org/licenses/by-sa/3.0",
    "kalla": "https://commons.wikimedia.org/wiki/File:Holm%C3%B6n_01.JPG"
  },
  "marstrand": {
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6f/Ankaret_p%C3%A5_Marstrand.jpg/1280px-Ankaret_p%C3%A5_Marstrand.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "bredd": 1200,
    "hojd": 799,
    "ar": 2014,
    "fotograf": "Averater",
    "licens": "CC BY-SA 3.0",
    "licensUrl": "https://creativecommons.org/licenses/by-sa/3.0",
    "kalla": "https://commons.wikimedia.org/wiki/File:Ankaret_p%C3%A5_Marstrand.jpg"
  },
  "smogen": {
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3e/Sm%C3%B6genbryggan_2016.jpg/1280px-Sm%C3%B6genbryggan_2016.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "bredd": 1200,
    "hojd": 800,
    "ar": 2017,
    "fotograf": "Kuriosatempel",
    "licens": "CC BY-SA 4.0",
    "licensUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "kalla": "https://commons.wikimedia.org/wiki/File:Sm%C3%B6genbryggan_2016.jpg"
  },
  "lysekil": {
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d9/S%C3%B6dra_hamnen_och_Landsv%C3%A4gsgatan_i_Lysekil.jpg/1280px-S%C3%B6dra_hamnen_och_Landsv%C3%A4gsgatan_i_Lysekil.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "bredd": 1200,
    "hojd": 881,
    "ar": 2016,
    "fotograf": "W.carter",
    "licens": "CC BY-SA 4.0",
    "licensUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "kalla": "https://commons.wikimedia.org/wiki/File:S%C3%B6dra_hamnen_och_Landsv%C3%A4gsgatan_i_Lysekil.jpg"
  },
  "kosterhavet": {
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2d/Gangar.jpg/1280px-Gangar.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "bredd": 1200,
    "hojd": 1197,
    "ar": 2009,
    "fotograf": "Svante Hultengren",
    "licens": "CC BY 2.0",
    "licensUrl": "https://creativecommons.org/licenses/by/2.0",
    "kalla": "https://commons.wikimedia.org/wiki/File:Gangar.jpg"
  },
  "grebbestad": {
    "url": "https://upload.wikimedia.org/wikipedia/commons/3/30/Grebbestad_2007_feb_24.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled",
    "bredd": 1200,
    "hojd": 900,
    "ar": 2007,
    "fotograf": "Ingth",
    "licens": "Public domain",
    "licensUrl": null,
    "kalla": "https://commons.wikimedia.org/wiki/File:Grebbestad_2007_feb_24.jpg"
  },
  "fjallbacka": {
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2e/Fj%C3%A4llbacka_von_oben.jpg/1280px-Fj%C3%A4llbacka_von_oben.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "bredd": 1200,
    "hojd": 442,
    "ar": 2008,
    "fotograf": "F.A.E.",
    "licens": "CC BY-SA 3.0",
    "licensUrl": "https://creativecommons.org/licenses/by-sa/3.0",
    "kalla": "https://commons.wikimedia.org/wiki/File:Fj%C3%A4llbacka_von_oben.jpg"
  },
  "grundsund": {
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e7/Grundsund_2015%2C_4.JPG/1280px-Grundsund_2015%2C_4.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "bredd": 1200,
    "hojd": 800,
    "ar": 2015,
    "fotograf": "I99pema",
    "licens": "CC BY-SA 4.0",
    "licensUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "kalla": "https://commons.wikimedia.org/wiki/File:Grundsund_2015,_4.JPG"
  },
  "hamburgsund": {
    "url": "https://upload.wikimedia.org/wikipedia/commons/8/87/Hamburgsund_sundet.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled",
    "bredd": 1200,
    "hojd": 900,
    "ar": 2007,
    "fotograf": "Ingmar Thoresson",
    "licens": "CC BY-SA 3.0",
    "licensUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
    "kalla": "https://commons.wikimedia.org/wiki/File:Hamburgsund_sundet.jpg"
  },
  "karingon": {
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/43/K%C3%A4ring%C3%B6n_01.jpg/1280px-K%C3%A4ring%C3%B6n_01.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "bredd": 1200,
    "hojd": 900,
    "ar": 2006,
    "fotograf": "Greverod (sv.wikipedia)",
    "licens": "CC BY-SA 3.0",
    "licensUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
    "kalla": "https://commons.wikimedia.org/wiki/File:K%C3%A4ring%C3%B6n_01.jpg"
  },
  "orust": {
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/91/Hen%C3%A5n%2C_den_18_aug_2006%2C_bild_1.JPG/1280px-Hen%C3%A5n%2C_den_18_aug_2006%2C_bild_1.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "bredd": 1200,
    "hojd": 900,
    "ar": 2006,
    "fotograf": "Västgöten (Harri Blomberg)",
    "licens": "CC BY-SA 3.0",
    "licensUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
    "kalla": "https://commons.wikimedia.org/wiki/File:Hen%C3%A5n,_den_18_aug_2006,_bild_1.JPG"
  },
  "tjorn": {
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/af/Berga_Strand_marina_on_Tj%C3%B6rn.jpg/1280px-Berga_Strand_marina_on_Tj%C3%B6rn.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "bredd": 1200,
    "hojd": 677,
    "ar": 2016,
    "fotograf": "Ingwik",
    "licens": "CC BY-SA 4.0",
    "licensUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "kalla": "https://commons.wikimedia.org/wiki/File:Berga_Strand_marina_on_Tj%C3%B6rn.jpg"
  },
  "kungshamn": {
    "url": "https://upload.wikimedia.org/wikipedia/commons/0/0b/Kungshamn_sm%C3%B6gen.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled",
    "bredd": 1200,
    "hojd": 808,
    "ar": 2005,
    "fotograf": "Matthias Prinke",
    "licens": "CC BY-SA 2.5",
    "licensUrl": "https://creativecommons.org/licenses/by-sa/2.5",
    "kalla": "https://commons.wikimedia.org/wiki/File:Kungshamn_sm%C3%B6gen.jpg"
  },
  "pater-noster": {
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3c/Pater_Noster.jpg/1280px-Pater_Noster.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "bredd": 1200,
    "hojd": 900,
    "ar": 2012,
    "fotograf": "Ingwik",
    "licens": "CC BY-SA 3.0",
    "licensUrl": "https://creativecommons.org/licenses/by-sa/3.0",
    "kalla": "https://commons.wikimedia.org/wiki/File:Pater_Noster.jpg"
  },
  "vinga": {
    "url": "https://upload.wikimedia.org/wikipedia/commons/5/5b/Vinga.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled",
    "bredd": 1200,
    "hojd": 800,
    "ar": 2007,
    "fotograf": "9or Svensson",
    "licens": "CC BY-SA 3.0",
    "licensUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
    "kalla": "https://commons.wikimedia.org/wiki/File:Vinga.jpg"
  },
  "hono": {
    "url": "https://upload.wikimedia.org/wikipedia/commons/3/35/H%C3%B6n%C3%B6_kyrka.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled",
    "bredd": 1200,
    "hojd": 900,
    "ar": 2006,
    "fotograf": "Tor Svensson",
    "licens": "CC BY-SA 3.0",
    "licensUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
    "kalla": "https://commons.wikimedia.org/wiki/File:H%C3%B6n%C3%B6_kyrka.jpg"
  },
  "gullholmen": {
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/29/Gullholmen.JPG/1280px-Gullholmen.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "bredd": 1200,
    "hojd": 904,
    "ar": 2007,
    "fotograf": "Tommy Karlsson",
    "licens": "Public domain",
    "licensUrl": null,
    "kalla": "https://commons.wikimedia.org/wiki/File:Gullholmen.JPG"
  },
  "kladesholmen": {
    "url": "https://upload.wikimedia.org/wikipedia/commons/9/96/Kl%C3%A4desholmen1.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled",
    "bredd": 1200,
    "hojd": 678,
    "ar": 2011,
    "fotograf": "Jonipoon",
    "licens": "CC BY-SA 3.0",
    "licensUrl": "https://creativecommons.org/licenses/by-sa/3.0",
    "kalla": "https://commons.wikimedia.org/wiki/File:Kl%C3%A4desholmen1.jpg"
  },
  "astol": {
    "url": "https://upload.wikimedia.org/wikipedia/commons/6/60/%C3%85stol_-_KMB_-_16001000041804.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled",
    "bredd": 1200,
    "hojd": 794,
    "ar": null,
    "fotograf": "Pål-Nils Nilsson",
    "licens": "Public domain",
    "licensUrl": null,
    "kalla": "https://commons.wikimedia.org/wiki/File:%C3%85stol_-_KMB_-_16001000041804.jpg"
  }
}

/** Öar med ett publicerbart foto. */
export const OAR_MED_BILD = 91
