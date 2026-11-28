# Fas 3, batch 00 del B: trafiksidorna och komma-dit-mallen (läst 2026-11-28)

Omfång: /farjor (med seed-rutterna i src/lib/ferries.ts som korten och JSON-LD byggs av), /vintertidtabeller, /ta-dig-till, mallarna /ta-dig-till/[ö] och /o/[ö]/komma-dit. Register: register/f3-00/b.tsv, 139 rader. Rättelser: ut/b.edits.json, 42 poster. Källor sparade i scratchpad fas3/b/kallor/ (169 filer, alla Waxholmsbolagets h-, w- och s-tabeller som pdf och text).

## Tabellbyte (vintersäsong)
- Waxholmsbolagets vintertabeller är publicerade: 28 av 30 w-tabeller "GÄLLER 13 DECEMBER 2026 – 11 APRIL 2027"; w12 har egna perioder (isfri period 7/1 till 24/3); w7:s rubrik går inte att läsa ur pdf:en. Höstens h-tabeller gäller till 12 december.
- Styrsöbolaget: vinter L 281 till 284 20261213 till 20270606. Västtrafik linje 899: 2026-12-13 till 2027-05-15.
- Cinderellabåtarna: "ÅTER APRIL 2027", säsong 30 apr till 26 sep 2027, nya priser 2027.

## P0 (ut/b-p0.md)
- Lidö (f300b-0062): /farjor visade Räfsnäs till Lidö som vanlig tur. Alla turer dit är beställningsturer i h31 och w31 (och alla utom en i s31). Rättat.

## Fel som rättats
- Seed-rutterna (f300b-0011 till 0023): Vaxholmskortet hade Ramsö och Tynningö före Vaxholm (Ramsö ligger efter Vaxholm, linje 4); Möjakortet hade Svartsö, som linje 14 inte angör; Finnhamnskortet gick via Ljusterö och Husarö, vilket inte gäller från 13 december (w12 slutar vid Norra Ingmarsö, w13 går via Boda); Grindaetiketten slutade 12 december; Cinderellas stopplista saknade Nacka strand, Gåshaga, Eknö och Telegrafholmen. Rättningen slår också igenom på /rutter, som använder samma data.
- /farjor: Vaxholmsleden (Trafikverket) stod som Waxholmsbolagets linje 941; JSON-LD sameAs påstod att Waxholmsbolaget är SL; "Live"/"uppdateras löpande" lovade realtid (ResRobot: tidtabellsdata, uppdateras högst en gång per dygn); Cinderellapriserna 2026 (255/235/235) är nu 265/245/245 för 2027; "ca 50 min" Stavsnäs till Sandhamn (MÄTT w16: 54 till 70); "hundratals bryggor med SL-kort" (299 bryggor sommartid, SL-biljett mellan 44); "ett sextiotal andra öar" (53); obelagda jämförelser och värdeord i FAQ:n.
- /vintertidtabeller: allt som sa "inte publicerad än" var inaktuellt; Kosterbåtarna sades sakna egen tabell (Västtrafik har en, nu länkad); passerade datum för linje 24, 26, 27 strukna; "Kontrollerat" satt till 28 november.
- /ta-dig-till: 68 av 144 öar (Göteborgs skärgård, Övriga Sverige) syntes inte fast ingressen räknade dem; "längs hela kusten" (Visingsö och Asunden ligger i sjöar); "Komplett guide"; "alla skärgårdsöar"; ItemList pekade på 308-adresser; "Live tidtabell" på kort som länkar till komma-dit, som saknar avgångsrutan.
- komma-dit: "Tidtabell och biljettinformation →" stod på 40 länkar till Länsstyrelsens reservatssidor, en kontaktsida och en kommunal nyhet. Nu "Mer hos <domän> →". Beställningstipset har fått en KÄLLA-rad för vintertabellen.

## Mallen prövad (MÄTT på svalla.se 2026-11-28)
Lidö och Fejan (Waxholmsbolaget), Storholmen (SL pendelbåt), Styrsö (Västtrafik), Fårö och Rindö (Trafikverkets vägfärjor), Öckerö (buss och vägfärja), Svenska Högarna (ingen kollektivtrafik), Sandhamn. Rätt tips och rätt Nej-mening för alla. Två svagheter, inte rättade eftersom logiken ligger i src/lib och delas med andra mallar:
- f300b-0115: "Bil" räknas som trafik i "Nej, inte när trafiken går: … Bil från Göteborg" (Öckerö). Förslag: lägg /^bil\b/i till egenBat-liknande filter för kollektiva.
- f300b-0116: Öckerö får frågan "Hur lång tid tar båten" fast svaret är buss; harBat räknar "vägfärja" som båtlinje.

## Inte avgjort, eller till Tom
- f300b-0081, 0082 (TOM): anmälningsrutan på /vintertidtabeller lovar ett mejl "när" tabellerna publicerats. De är publicerade. Om rutan ska stå kvar, och med vilket löfte, är ett produktbeslut.
- f300b-0035, 0036, 0126: SL:s lågsäsongssida säger att periodbiljetter på 30 dagar eller mer gäller i "hela Waxholmsbolagets trafik"; Waxholmsbolaget skriver att SL-biljetter inte gäller på linje 17, 18 och 19 utan att säga om det också gäller lågsäsong. Texten återger båda; frågan bör ställas till Waxholmsbolagets kundtjänst.
- f300b-0028 EJ NÅBAR: cinderellabatarna.com (JSON-LD sameAs) svarade 502 i curl och Chromium. Står kvar.
- f300b-0107 till 0111: /ta-dig-till/[ö] renderas inte (308 till komma-dit sedan 2026-09-23). Mallen har reservtexter som vore fel utanför Stockholm. Förslag: ta bort filen.
- f300b-0139: scripts/tips-content/farjor-skargard.md är inte publicerad (/tips/farjor-skargard 404). Den säger bland annat att M/S Cinderella I går till Möja (Strömma: Möja finns inte bland bryggorna), har 2023 års priser och hänvisar till stockholms-skargard.se. seed-tips-articles.mjs skulle publicera den som den står; granska före en ny seedning.
- Den gamla KÄLLA-raden för beställningstipset (h10, läst 2026-10-29) står kvar oförändrad; dess citat går inte att hitta i ett stycke i pdftotext-utdata eftersom tabellen är spaltsatt. Den nya raden för w10 håller.
- Restid i hösttabellen h16 (Stavsnäs till Sandhamn) mättes inte säkert ur spalterna; därför anger kortet bara vintertabellens 54 till 70 min.

## Kontroller
- Torrkörning mot /home/claude/svalla-f3main: 42 ersättningar ok, 0 fel. Main-kopian orörd.
- Egen kopia: applicera ok; generera-kallor ok (144 av 144 öar, 1943 källor); prebuild ok; tsc: 2 fel, båda i testfiler som också felar på ren main (dmBilderRensning.test.ts, kontoRadering.test.ts), inga i ändrade filer; vitest src/lib: 119 filer, 1043 tester, alla gröna. Kopian borttagen.
- Citat: 275 av 276 par (register och edits) står ordagrant i de sparade källorna (skript, blanktecken normaliserade för pdf). Undantaget är den gamla h10-raden ovan.
- Inga tankstreck i ny publicerad text (skript).
