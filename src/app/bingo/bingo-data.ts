/**
 * Skärgårdsbingo — 25 utmaningar att bocka av över en sommar.
 * Mixar öar, aktiviteter, klassiker och svårare utmaningar.
 */

export type BingoItem = {
  id: string
  text: string
  category: 'ö' | 'aktivitet' | 'mat' | 'utmaning' | 'natur'
  hint?: string
}

export const BINGO_ITEMS: BingoItem[] = [
  // Öar att besöka — klassiker
  { id: 'sandhamn',     text: 'Besök Sandhamn',                      category: 'ö',         hint: '2,5 h med Waxholmsbåt från Strömkajen' },
  { id: 'grinda',       text: 'Ta båten till Grinda',                category: 'ö',         hint: 'Klassisk sommarö 1,5 h från Stockholm' },
  { id: 'uto',          text: 'Cykla runt Utö',                      category: 'ö',         hint: 'Hyr cykel direkt vid hamnen' },
  { id: 'finnhamn',     text: 'Övernatta på Finnhamn',               category: 'ö',         hint: 'STF Vandrarhem eller egen tältplats' },
  { id: 'vaxholm',      text: 'Promenera runt Vaxholms fästning',    category: 'ö',         hint: 'Året runt — fina fika i hamnen' },

  // Mat & krogar
  { id: 'rakor',        text: 'Ät räkor på en bryggrestaurang',       category: 'mat',       hint: 'Sandhamns Värdshus, Grinda Värdshus, Utö Värdshus' },
  { id: 'glass',        text: 'Köp en glass i en hamnboden',          category: 'mat',       hint: 'Klassiker: kola-glass + sjösalt' },
  { id: 'krog',         text: 'Boka middag på en skärgårdskrog',      category: 'mat',       hint: 'Boka 4–6 v i förväg sommartid' },
  { id: 'fika',         text: 'Fika med havsutsikt',                  category: 'mat' },
  { id: 'havsbastu',    text: 'Basta + hoppa i havet',                category: 'aktivitet', hint: 'Utö, Sandhamn, Möja har havsbastu' },

  // Aktiviteter — klassiska
  { id: 'segla',        text: 'Segla en tur',                         category: 'aktivitet' },
  { id: 'simma',        text: 'Bada från en klippa',                  category: 'aktivitet' },
  { id: 'sandstrand',   text: 'Hitta en sandstrand i skärgården',     category: 'aktivitet', hint: 'Trouville (Sandhamn), Skärlöva (Utö)' },
  { id: 'paddla',       text: 'Paddla kajak eller SUP',               category: 'aktivitet' },
  { id: 'fiska',        text: 'Få napp på fiskeresan',                category: 'aktivitet' },

  // Natur & upplevelser
  { id: 'solnedgang',   text: 'Se en solnedgång över havet',          category: 'natur' },
  { id: 'fyr',          text: 'Besök en fyr',                         category: 'natur',     hint: 'Landsort, Söderarm, Almagrundet' },
  { id: 'sal',          text: 'Spotta en säl',                        category: 'natur',     hint: 'Vanligast i ytterskärgården' },
  { id: 'havsorn',      text: 'Se en havsörn flyga över',             category: 'natur',     hint: 'Sett ofta över ytterskärgården maj–sep' },
  { id: 'fyrverkeri',   text: 'Se midsommareld från en hamn',         category: 'natur',     hint: 'Midsommarafton — många öar har firande' },

  // Utmaningar
  { id: 'natttur',      text: 'Övernatta på en obebodd ö',            category: 'utmaning',  hint: 'Allemansrätten — välj en mindre ö' },
  { id: 'tre-oar',      text: 'Besök 3 öar på samma dag',             category: 'utmaning' },
  { id: 'yttre',        text: 'Åk till en ö i ytterskärgården',       category: 'utmaning',  hint: 'Huvudskär, Söderarm, Bullerö' },
  { id: 'vinter',       text: 'Gör en vintertur till en ö',           category: 'utmaning',  hint: 'Gå på isen eller åk SL-båt' },
  { id: 'logga',        text: 'Logga din första tur i Svalla',        category: 'utmaning',  hint: '/logga — det tar 30 sekunder' },
]

export const TOTAL_BINGO = BINGO_ITEMS.length
