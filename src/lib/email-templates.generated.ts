// GENERERAD FIL — ändra inte här.
// Källa: /emails/*.md · Generator: scripts/build-email-templates.mjs (körs i prebuild)
//
// Filerna bakas in eftersom repo-rotens filer inte följer med i Vercels
// serverless-bundle. Vill du ändra texten i ett mail: redigera .md-filen.

import type { EmailTemplate } from './email'

export const MAIL_MALLAR: Record<EmailTemplate, string> = {
  welcome: `---
trigger: user_created
layout: fullt
subject_options:
  - "{{first_name}} — välkommen ombord ⚓"
  - "Fjorton flikar blev en. Välkommen till Svalla."
  - "Din skärgård börjar här"
preheader: Fem öar att börja med — och tre saker som gör dig till proffs direkt.
from: "Team Svalla <hej@mail.svalla.se>"
---

# {{first_name}}, välkommen ombord.

Du vet känslan: fjorton flikar, tre tidtabeller och en gnagande misstanke om att sista båten hem går tidigare än man tror. Det var därför vi byggde Svalla. Guider till öarna, levande färjetider, rutter och en plats att logga dina egna turer — på ett ställe. Inga annonser. Inget "du kanske också gillar". Bara skärgård.

:::panel
### Fem öar, fem humör
Trygg första helg? **Sandhamn** eller **Grinda**. Sugen på det äkta? **Möja** eller **Finnhamn**. Vill du söderut? **Utö**. Samma skärgård — fem helt olika känslor.
:::

:::ruta
### Sandhamn & Grinda — de enkla
Sandhamn är seglarnas huvudstad, Grinda ligger närmare och andas lugnare. Båda är perfekta för en första riktig skärgårdshelg — svårt att misslyckas, lätt att längta tillbaka.

[Sandhamn →](https://svalla.se/o/sandhamn) · [Grinda →](https://svalla.se/o/grinda)
:::

:::ruta
### Möja & Finnhamn — de äkta
Möja är ön dit man åker för att äta räkor på en klippa med utsikt mot ingenting alls. Finnhamn är STF:s vandrarhem mitt i ett naturreservat — enkelt, välskött och svårslaget en stilla kväll.

[Möja →](https://svalla.se/o/moja) · [Finnhamn →](https://svalla.se/o/finnhamn)
:::

## Tre saker som gör dig till proffs direkt

:::kort
### Kom igång på fem minuter
- **Spara öar** — tryck hjärtat på en ö så hamnar den i *Min skärgård*. Din framtida sommar, samlad
- **Logga turer med GPS** — appen ritar rutten på sjökortet och räknar distans, tid och fart. Som Strava, fast med bättre utsikt
- **Hitta krogar och hamnar** — med live-färjetider och väder bredvid kartan, så du slipper gissa
:::

:::knapp
[Öppna din profil](https://svalla.se/min-skargard)
:::

:::signatur
Glad sommar — vi syns på vattnet.
— Team Svalla
*Vi skriver breven själva, med kaffet i handen. Ingen algoritm har valt öarna åt dig.*
:::
`,
  day7: `---
trigger: user_created + 7 days
layout: fullt
subject_options:
  - "{{first_name}}, alla åker till Sandhamn. Du är inte alla."
  - "Fem öar som flyger under radarn 🌊"
  - "Skärgårdens bäst bevarade hemligheter"
preheader: Öarna turistbåtarna missar — och varför det är hela poängen.
from: "Team Svalla <hej@mail.svalla.se>"
---

# {{first_name}}, alla åker till Sandhamn. Du är inte alla.

Samma resa, varje år: Sandhamn, Grinda, Vaxholm. Inget ont om klassikerna — men skärgården är större än så, och de finaste öarna är ofta de som kräver ett byte till och en halvtimme extra på däck. Det är inte ett hinder. Det är entréavgiften.

:::kort
### Fem under radarn
- **Rödlöga** — ingen bilväg, ingen el, bara stigar och klippor. En av skärgårdens mest oförändrade öar
- **Husarö** — bilfri seglarö, ett av Skärgårdsstiftelsens skyddade områden. Lugnet sitter i väggarna
- **Nämdö** — bilfri, lugn och vild. Bäst sent i augusti, när alla andra åkt hem
- **Bullerö** — huvudentré till Nämdöskärgårdens nationalpark och Bruno Liljefors gamla konstnärsö
- **Landsort** — Stockholms sydligaste utpost, med en av Sveriges äldsta fyrar och öppet hav åt tre håll
:::

## Varför just de här?

:::ruta
### Restiden är själva filtret
Öarna längst ut kräver planering — färre avgångar, längre resa. Precis det håller dem lugna. Den som klivit i land på Rödlöga eller Landsort har *valt* att vara där. Det märks på stämningen, och det är den du åker för.
:::

:::ruta
### En helt egen nationalpark
<!-- KÄLLA: src/app/o/island-data.ts (bullero) — Nämdöskärgårdens nationalpark invigd sep 2025, Sveriges 31:a och första marina nationalpark -->
Bullerö blev 2025 huvudentré till Nämdöskärgårdens nationalpark — Sveriges första marina. Konstnären Bruno Liljefors köpte ön 1908, och hans jaktstuga rymmer i dag parkens utställning. Konsthistoria och ytterskärgård på samma klippa.

[Bullerö-guiden →](https://svalla.se/o/bullero)
:::

Tryck hjärtat på dem som lockar, så ligger de samlade i *Min skärgård* den dag du bestämmer dig. Ditt framtida jag säger tack.

:::knapp
[Bläddra bland alla 84 guider](https://svalla.se/oar)
:::

:::signatur
Ses därute — förhoppningsvis inte på Sandhamn.
— Team Svalla
*Filtrera på bilfritt, barnvänligt eller segling, så blir listan kortare direkt.*
:::
`,
  season_open: `---
trigger: cron 1 april kl 09:00
layout: fullt
subject_options:
  - "{{first_name}} — värdshusen vet inte att du kommer än 🌸"
  - "En månad till säsongsstart — tre saker att fixa nu"
  - "Skärgårdssommaren bokar inte sig själv"
preheader: De som planerar i april får de bästa platserna. Resten får restplatserna.
from: "Team Svalla <hej@mail.svalla.se>"
---

# {{first_name}}, värdshusen vet inte att du kommer än.

En månad kvar till säsongen. Just nu är borden lediga, rummen bokningsbara och gästhamnarna tomma. Det varar inte. De som planerar i april får de bästa platserna — resten får det som blev över. Tre saker är värda en kvart av din vecka — redan nu.

:::panel
### Tumregeln
Boka boende och bord tidigt, kolla färjorna sent. Det första tar slut. Det andra ändras in i det sista.
:::

:::ruta
### 1. Boende — börja här
Värdshus och pensionat på Sandhamn, Grinda och Finnhamn fyller juli långt innan juli. Välj helg, boka, klart. Ledigheten känns dubbelt så nära när rummet är säkrat.

[Sandhamn →](https://svalla.se/o/sandhamn) · [Grinda →](https://svalla.se/o/grinda) · [Finnhamn →](https://svalla.se/o/finnhamn)
:::

:::ruta
### 2. Borden
Sandhamns Värdshus och de andra krogarna öppnar normalt bokningarna i april. Ett bokat bord i solnedgången slår varje medhavd matlåda.

[Se öarnas krogar →](https://svalla.se/oar)
:::

:::ruta
### 3. Färjorna — bokmärk nu, kolla sen
Sommartabellen släpps i april. Vår färjesida visar avgångarna live, så du aldrig behöver skärmdumpa en tidtabell igen.

[svalla.se/farjor →](https://svalla.se/farjor)
:::

:::knapp
[Börja planera säsongen](https://svalla.se/oar)
:::

:::signatur
Vi hörs när vädret vänder.
— Team Svalla
*Har du redan en ö i kikaren? Svara på mejlet så hjälper vi dig med resan dit.*
:::
`,
  season_close: `---
trigger: cron 1 oktober kl 09:00
layout: fullt
subject_options:
  - "{{first_name}} — {{visited_count}} öar. Vi har räknat 🍂"
  - "Din skärgårdssommar i siffror"
  - "Tack för i år — här är kvittot"
preheader: Din sommar i siffror — och varför vintern är skärgårdens hemliga säsong.
from: "Team Svalla <hej@mail.svalla.se>"
---

# {{first_name}}: {{visited_count}} öar. Vi har räknat.

Säsongen är slut, båtarna glesar ut och skärgården byter till vinterläge. Innan vi drar in landgången: här är din sommar, svart på vitt. Inga uppskattningar, inga påhitt — bara dina egna loggade turer.

:::panel
### Ditt år på vattnet
**{{visited_count}} öar** besökta · **{{trip_count}} turer** loggade · **{{distance_nm}} distansminuter** i kölvattnet · **{{saved_count}} öar** sparade till nästa år
:::

:::kort
### Hela historien finns kvar
Rutterna på sjökortet, statistiken, dina sparade öar — allt ligger i profilen och nollställs aldrig. I februari, när mörkret är som tätast, är det här du öppnar.

[Öppna Min skärgård →](https://svalla.se/min-skargard)
:::

## Vintern är skärgårdens hemliga säsong

:::ruta
### Vi stänger inte — vi växlar ner
- **Live väder och vind** — för dig som tar varje fönster som ges
- **Vinterhamnar** — vilka som har plats för båten på land
- **Planera nästa år** — spara öar nu, så ligger listan färdig när isarna släpper
:::

Vi hörs i april när säsongen vänder. Tills dess ligger allt kvar precis där du lämnade det.

:::knapp
[Börja spara inför nästa sommar](https://svalla.se/oar)
:::

:::signatur
Tack för i år — det var ett nöje att ha dig ombord.
— Team Svalla
*Känner du någon som borde varit med i somras? Vidarebefordra gärna. Vi lovar att vara lika trevliga mot dem.*
:::
`,
  weather_tip: `---
trigger: cron torsdagar morgon (UTC), maj–september, om helgprognos ≥18°C och ≤40% regn och ≤9 m/s vind
layout: fullt
subject_options:
  - "☀️ {{temp}}° på {{best_day}} — det här är inte en övning"
  - "Skärgårdsväder i helgen: {{temp}}° och nästan ingen vind"
  - "{{first_name}}, här är prognosen du väntat på"
preheader: Sånt här väder kommer inte på beställning. Tre öar, tre humör.
from: "Team Svalla <hej@mail.svalla.se>"
---

# {{first_name}}, släpp vad du har för händer.

Prognosen för **{{best_day}}**: **{{temp}}°** och bara **{{wind}} m/s**. Det är inte väder — det är en inbjudan. Soffan finns kvar på söndag kväll, det här vädret gör det inte. Tre öar, tre olika humör:

:::ruta
### Grinda — den enkla
<!-- KÄLLA: src/app/o/island-data.ts (grinda) — Waxholmsbolagets tabell 11, snabbast 1 tim 35, de flesta ~2 h -->
Naturreservat mitt i skärgården: vandringsleder, klippbad och ett av skärgårdens bästa värdshus. Cirka 2 timmar med Waxholmsbåten från Strömkajen (snabbast 1 tim 35) — och den ingår i SL-kortet. Lägre tröskel finns inte.

[Grinda-guiden →](https://svalla.se/o/grinda)
:::

:::ruta
### Sandhamn — den klassiska
Seglarcentrum med bageri, klippor mot öppet hav och Sandhamns Värdshus. Vill du äta lunch ute: boka bordet innan du kliver på båten, inte efter.

[Sandhamn-guiden →](https://svalla.se/o/sandhamn)
:::

:::ruta
### Finnhamn — den lugna
STF:s vandrarhem och krog i ett naturreservat, med bra kajaktillgång. Lugnt, välskött och sällan trångt — även när prognosen ser ut så här.

[Finnhamn-guiden →](https://svalla.se/o/finnhamn)
:::

:::knapp
[Planera helgturen](https://svalla.se/planera)
:::

:::signatur
Passa på — såna här helger går att räkna på ena handens fingrar.
— Team Svalla
*Osäker på sista båten hem? Fråga Thorkel innan du åker, inte från bryggan.*
:::
`,
  newsletter_welcome: `---
trigger: newsletter_subscribe
layout: fullt
subject_options:
  - "Välkommen — nu har du en insider i skärgården 🌊"
  - "Det som faktiskt händer därute"
  - "Din första öinsider är på väg"
preheader: Det som öppnat, det som ändrats och det ingen karta visar – när det händer.
from: "Team Svalla <hej@mail.svalla.se>"
---

# Nu har du en insider i skärgården.

Vi hör av oss när det händer något: vad som öppnat, vad som ändrats och var det är värt att åka. Inga annonser, ingen utfyllnad, inga "5 tips du INTE får missa". Bara sånt vi själva hade velat veta.

:::kort
### Det här kommer i brevet
- **Öppet just nu** — vad som faktiskt går att besöka den här månaden
- **Hamnar och krogar** — vad som öppnat, stängt eller bytt ägare
- **Väderfönster** — ser vi en riktigt bra helg skickar vi ett extra tips
- **Insidertips** — lägen och timing som inte syns på en karta
:::

## Bra ställen att börja

:::ruta
### Öppet just nu
Vilka öar som är i säsong, vad som har fullservice och vad som drar ner. Uppdateras löpande.

[svalla.se/oppet-nu →](https://svalla.se/oppet-nu)
:::

:::ruta
### Hitta din ö
<!-- KÄLLA: src/app/o/island-data.ts — 84 publicerade öguider (räknat 2026-08) -->
84 öguider. Filtrera på barnvänligt, bilfritt, segling, romantiskt — eller bläddra och låt dig överraskas.

[svalla.se/oar →](https://svalla.se/oar)
:::

:::ruta
### Säsongsguider
Vad som är bäst när. Inklusive de veckor då turisterna åkt hem och öarna är som finast.

[svalla.se/sasong →](https://svalla.se/sasong)
:::

Nästa nummer kommer om två veckor. Undrar du något om en specifik ö innan dess — svara på det här mejlet. Vi läser allt, och vi svarar som folk.

:::knapp
[Se vad som är öppet nu](https://svalla.se/oppet-nu)
:::

:::signatur
Ses därute.
— Team Svalla
*Vi skriver breven själva. Ingen algoritm har valt öarna åt dig.*
:::
`,
  day3_newsletter: `---
trigger: newsletter_subscribe + 3 days
layout: fullt
subject_options:
  - "Har du träffat Thorkel? ⚓"
  - "Ställ en omöjlig skärgårdsfråga. Vi väntar."
  - "Den snabbaste vägen till ett svar"
preheader: Vår guide svarar på skärgårdsfrågor — med riktiga turer och tider.
from: "Team Svalla <hej@mail.svalla.se>"
---

# Har du träffat Thorkel?

Tre dagar sedan du klev ombord — dags att du får träffa besättningens stolthet.

:::panel
### Din skärgårdsguide, dygnet runt
Thorkel är Svallas guide. Ställ en fråga — vart man ska med barn, hur man tar sig ut utan bil, vad som är öppet i september — och du får ett konkret svar.

Han slår upp riktiga turer och tider när frågan handlar om att ta sig någonstans. Finns det ingen förbindelse säger han det, i stället för att hitta på en.
:::

:::ruta
### Prova med en sån här fråga
- *"Vilken ö passar en nybörjare med små barn?"*
- *"Hur tar jag mig till Möja utan egen båt?"*
- *"Vad är öppet i skärgården i oktober?"*
:::

## Varför det är bättre än att googla

En sökmotor ger dig tio blå länkar och lycka till. Thorkel ger dig ett svar att agera på — och länken till guiden om du vill gräva vidare.

:::knapp
[Prata med Thorkel](https://svalla.se/guide)
:::

:::signatur
Ses därute.
— Team Svalla
*Han svarar hellre "det vet jag inte" än gissar. Det tog ett tag att lära honom.*
:::
`,
  day14_newsletter: `---
trigger: newsletter_subscribe + 14 days
layout: fullt
subject_options:
  - "Var det Grinda eller Gällnö som crewet gillade? 🤔"
  - "Tre öar att spara — och stället att spara dem på"
  - "Min skärgård: listan du delar med crewet"
preheader: Spara öarna du vill åka till och dela listan med crewet inför helgen.
from: "Team Svalla <hej@mail.svalla.se>"
---

# Var det Grinda eller Gällnö som var finast?

Det vanligaste problemet i skärgårdsplanering är inte att välja fel ö. Det är att man hade en idé i mars, ett tips från en kollega i maj, en skärmdump någonstans — och i juli är allt borta. Idéer man inte samlar ihop blir aldrig turer.

:::kort
### Min skärgård — din privata lista
Tryck hjärtat på en ö så hamnar den i *Min skärgård*. Dela listan med crewet inför helgen. Inga appar att installera, inga konton för dem att skapa.

[Öppna Min skärgård →](https://svalla.se/min-skargard)
:::

## Tre att lägga in nu

:::ruta
<!-- KÄLLA: src/app/o/island-data.ts (sandhamn) — varmdo.se: "Den långsträckta stranden i Trouville, med sin vita sand, ligger på Sandhamns södra sida." / "Trouville ligger omkring 20 minuters promenad från hamnen."; ksss.se: seglingsverksamhet runt Sandhamn (rättad 2026-09-29) -->
### Sandhamn
Seglarön i ytterskärgården. Den långa sandstranden Trouville ligger på södra sidan, ungefär tjugo minuters promenad från hamnen.

[Guiden →](https://svalla.se/o/sandhamn)
:::

:::ruta
<!-- KÄLLA: src/app/o/island-data.ts (grinda) — grinda.se/en/accommodation/sea-lodge: "sandy beaches, rock pools, saunas for rent directly by the water"; waxholmsbolaget.se: "Grinda har trafik året om". Tidigare stod "klippbad på norra sidan", som inte har källa — baden ligger vid Sea Lodge på södra sidan (rättad 2026-09-29) -->
### Grinda
Sandstränder och klippbad vid Grinda Sea Lodge på öns södra sida, och båt året om. Nära nog för en dagstur, tillräckligt för en helg.

[Guiden →](https://svalla.se/o/grinda)
:::

:::ruta
<!-- KÄLLA: src/app/o/island-data.ts (uto) — skargardsstiftelsen.se/omraden/uto: "I den historiska Gruvbyn finns spår av järnbrytning som påbörjades redan under medeltiden", "Cykla längs grusvägarna", "Ålö Storsand, som nås med båt eller via vandringsled, räknas som en av Stockholms skärgårds mest omtyckta sandstränder." Tidigare stod "broförbundna grannön" och "en av Sveriges finaste sandstränder" (rättad 2026-09-29) -->
### Utö
Järngruvor sedan medeltiden och grusvägar att cykla på. Ålö Storsand, som du når med båt eller via vandringsled, räknas som en av Stockholms skärgårds mest omtyckta sandstränder.

[Guiden →](https://svalla.se/o/uto)
:::

Letar du efter något särskilt — barnvänligt, bilfritt, seglingsvänligt — sök bland [alla öar](https://svalla.se/oar) och spara ett par kandidater. Beslut blir lättare när alternativen ligger bredvid varandra.

:::knapp
[Utforska öarna](https://svalla.se/oar)
:::

:::signatur
Ses därute.
— Team Svalla
*Nästa nummer om två veckor. Svara gärna om du undrar något om en specifik ö.*
:::
`,
  day30_newsletter: `---
trigger: newsletter_subscribe + 30 days
layout: fullt
subject_options:
  - "Ärlig fråga: har du hunnit ut än? 🛥️"
  - "En dagstur, tre steg, noll ursäkter"
  - "Det svåra är att bestämma sig"
preheader: Tre steg till en dagstur. Resten löser sig därute.
from: "Team Svalla <hej@mail.svalla.se>"
---

# En månad ombord — har du hunnit ut än?

Helt okej om inte — kalendrar är fulla och båtar går när de går. Men en sak är värd att skicka vidare:

:::citat
### "Det var enklare än jag trodde."
Det är det vanligaste vi hör från folk som just gjort sin första dagstur. Båten går. Krogen har öppet. Det finns var man badar.

Den svåra biten är att bestämma sig.
:::

## En dagstur, tre steg

:::ruta
### 1. Välj en ö
<!-- KÄLLA: waxholmsbolaget.se/reseplanering/resmal/vaxholm — "Båtresan från Strömkajen tar bara en timme … övrig tid på året går det flera per dag"; resmal/grinda — "Grinda har trafik året om" (läst 2026-09-28). Tidigare föreslogs Fjäderholmarna, som är stängt oktober–mars; mejlet går året runt (rättad 2026-09-29) -->
Vill du testa lätt: [Vaxholm](https://svalla.se/o/vaxholm), en timme från Strömkajen och flera båtar om dagen året runt. Vill du längre ut: [Grinda](https://svalla.se/o/grinda), som har trafik året om.
:::

:::ruta
### 2. Kolla turen — och sista båten hem
Välj startpunkt och dag i [dagsplaneraren](https://svalla.se/utflykt) så ser du båttiderna för varje ö. Titta på hemresan innan du bestämmer dig för utresan.
:::

:::ruta
### 3. Fråga om du fastnar
Hur lång tid tar det, vad finns på ön, hur blir vädret? [Skriv till Thorkel →](https://svalla.se/guide)
:::

:::knapp
[Planera din första tur](https://svalla.se/planera)
:::

Det här var sista påminnelsen. Du ligger kvar i listan och hör av oss när det händer något i skärgården.

:::signatur
Ses därute.
— Team Svalla
*Vi hoppas på ett bra väderfönster åt dig.*
:::
`,
  manadsbrev: `---
trigger: första tisdagen i månaden, oktober–mars (bara om manad stämmer)
manad: 2026-10
layout: fullt
subject_options:
  - "Två timmar på Saltkråkan innan båten slutar gå för året"
preheader: Sista båtarna från stan, höstlovet och hur många som bor kvar på öarna när sommaren är slut.
from: "Team Svalla <hej@mail.svalla.se>"
---

# Oktober vid havet

Sommargästerna har åkt hem, men båtarna går fortfarande. Den 1 november gör några av dem sin sista tur för året, så oktober är sista chansen i år att åka direkt från stan ut till ett par av de yttre öarna.

## Saltkråkan, en sista gång i år

<!-- KÄLLA: https://kund.printhuset-sthlm.se/wa/h26.pdf — Waxholmsbolaget tabell 26, "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 1 NOVEMBER 2026": lördag tur 2651 Strömkajen 08.45 → Norröra 12.15; lördag tur 2652 Norröra 14.40 → Strömkajen 18.15; "Vid jul, nyår, påsk, midsommar samt övriga storhelger förekommer förändringar i trafiken." (läst 2026-09-29) -->
<!-- KÄLLA: https://waxholmsbolaget.se/reseplanering/resmal/norrora-och-soderora — "Saltkråkan är framför allt inspelat på Norröra."; "Det finns varken livsmedelsbutiker eller restauranger på öarna" (läst 2026-09-29) -->
<!-- KÄLLA: https://www.norrora.se/gronomraden/ — "totalt på ön ca 7 km stigar" (läst 2026-09-29) -->
<!-- KÄLLA: alla helgons dag 2026 = lördag 31 oktober, räknas fram i src/lib/arsdatum.ts -->
Norröra är ön där Saltkråkan spelades in. På en lördag i oktober går båten från Strömkajen 08.45 och är framme 12.15. Hem går den 14.40 och är tillbaka i stan 18.15. Det ger dig knappt två och en halv timme och ungefär sju kilometer stigar. Ta med matsäck, för på ön finns varken affär eller restaurang.

Tabellen gäller till och med 1 november. Den sista lördagen, 31 oktober, är alla helgons dag, och vid storhelger kan Waxholmsbolaget ändra turerna. Åk hellre en lördag tidigare, eller kontrollera just den dagen.

[Norröra på Svalla](https://svalla.se/o/norrora)

## Det här ändras nu

<!-- KÄLLA: https://waxholmsbolaget.linjetidtabeller.se/ — "Stockholm - Vaxholm - Norrsund - Rödlöga Gäller:2026-08-17till2026-11-01"; "Stockholm - Vaxholm - Norrsund - Arholma Gäller:2026-08-17till2026-11-01"; "Stockholm - Vaxholm - Blidösundet Gäller:2026-08-17till2026-11-01"; "Stockholm - Vaxholm - Grinda - Boda - Sollenkroka Gäller:2026-08-17till2026-12-12" (läst 2026-09-28) -->
<!-- KÄLLA: https://grinda.se/oppettider/ — "Grinda stugby har öppet med start strax innan månadssskiftet april / maj till 3.e helgen i oktober" (läst 2026-09-28) -->
<!-- KÄLLA: https://www.waxholmsbolaget.se/reseplanering/resmal/grinda — "Grinda har trafik året om" (läst 2026-09-28) -->
<!-- KÄLLA: https://explorearchipelago.se/sv/sthlm/inre-skargarden/fjaderholmarna — "Fjäderholmarna är säsongsöppet mellan april och september." (läst 2026-09-28) -->
<!-- KÄLLA: https://kund.printhuset-sthlm.se/wa/h27.pdf — turerna till Arholma har anmärkning "Går under perioden 2 april - 18 juni."; https://kund.printhuset-sthlm.se/wa/h30.pdf — Simpnäs–Arholma till "12 DECEMBER 2026" (läst 2026-09-30) -->
- Waxholmsbolagets linjer från Stockholm till Rödlöga och Blidösundet går till och med 1 november. Linjen mot Arholma går i höst bara till Gräskö, så till Arholma åker du med passbåten från Simpnäs.
- Linjen från Stockholm via Vaxholm och Grinda till Sollenkroka har höstturer till 12 december.
- Grinda Stugby stänger efter tredje helgen i oktober. Grinda har ändå båttrafik året om.
- Fjäderholmarnas säsong är april till september.

## Höstlovet

<!-- KÄLLA: https://meetingspublic.stockholm.se/welcome-sv/namnder-styrelser/utbildningsnamnden/mote-2022-11-17/agenda/bilaga-1-larotider-2024-2027-gr-o-grsarpdf?downloadMode=open — "Höstlov, vecka 44: 26 - 30 oktober" (läst 2026-09-29) -->
<!-- KÄLLA: https://www.goteborg.com/guider/ta-dig-till-skargarden — "Färjorna går året runt från Saltholmen"; "En Västtrafikbiljett för zon A gäller hela vägen på spårvagn, buss och färja." (läst 2026-09-29) -->
I Stockholms kommunala skolor är höstlovet vecka 44, alltså 26 till 30 oktober. I guiden står vilka båtar som går den veckan och vad som har stängt.

Bor du i Göteborg är den södra skärgården det enklaste lovet: färjorna från Saltholmen går året runt, och en Västtrafikbiljett för zon A gäller hela vägen på spårvagn, buss och färja.

[Höstlov vid havet](https://svalla.se/guider/hostlov-vid-havet)

## Hur många bor kvar?

<!-- KÄLLA: https://www.statistikdatabasen.scb.se/pxweb/sv/ssd/START__MI__MI0812__MI0812A/OarEjBro01/ — SCB, "Befolkning och bebyggelse på öar utan fastlandsförbindelse med bro, per ö", 31 december 2020: Möja 203, Sandön 118, Arholma 40 folkbokförda (hämtad 2026-09-29) -->
När sista sommarbåten har gått är det de fast boende som är kvar. Enligt SCB var 203 personer folkbokförda på Möja, 118 på Sandön där Sandhamn ligger och 40 på Arholma. Siffrorna gäller 31 december 2020, det senaste året i SCB:s statistik per ö.

Nu står de siffrorna på öarnas sidor på Svalla, tillsammans med kommun och antal byggnader.

[Se Möja](https://svalla.se/o/moja)

## Nytt på Svalla

- **Din dag i skärgården.** Välj var du startar och vilken dag du vill åka, så ser du vilka öar du hinner till och när båtarna går just den dagen. [Planera en dag](https://svalla.se/utflykt)
- **Sök bland alla öar.** Listan över öar har fått ett sökfält. [Alla öar](https://svalla.se/oar)

:::knapp
[Planera en dag i oktober](https://svalla.se/utflykt)
:::

:::signatur
Ses därute.
*Nästa brev kommer i november. Svara gärna på det här mejlet om du undrar något om en ö, så svarar vi.*
:::
`,
  day60: `---
trigger: konto + 60 dagar, ingen tur loggad och ingen ö sparad
layout: fullt
subject_options:
  - "Två månader sedan du skapade kontot"
preheader: Välj var du startar och vilken dag, så visar vi öarna du hinner till.
from: "Team Svalla <hej@mail.svalla.se>"
---

# Hej {{first_name}}

Det har gått två månader sedan du skapade ditt konto på Svalla. Har du inte hunnit använda det än är det här det snabbaste sättet att komma igång.

:::ruta
### Din dag i skärgården
Välj var du startar och vilken dag du vill åka. Du ser vilka öar du når därifrån och båttiderna just den dagen.

[Planera en dag →](https://svalla.se/utflykt)
:::

:::ruta
### Spara öar du vill till
Tryck på hjärtat på en ösida så hamnar ön i Min skärgård. Då har du listan när det blir dags.

[Alla öar →](https://svalla.se/oar)
:::

:::knapp
[Planera en dag](https://svalla.se/utflykt)
:::

:::signatur
Ses därute.
*Vi hör av oss en gång till om en månad, sedan inte mer om det här.*
:::
`,
  day90: `---
trigger: konto + 90 dagar, ingen tur loggad och ingen ö sparad
layout: fullt
subject_options:
  - "Båtarna går året runt"
preheader: Fyra öar i Stockholms skärgård har båt hela året.
from: "Team Svalla <hej@mail.svalla.se>"
---

# Hej {{first_name}}

Det här är sista mejlet vi skickar om att komma igång. Skärgården är inte bara sommar. Till de här öarna går båten hela året:

<!-- KÄLLA: https://www.waxholmsbolaget.se/reseplanering/resmal/vaxholm — "Båtresan från Strömkajen tar bara en timme och under sommaren går det turer många gånger om dagen, och övrig tid på året går det flera per dag." (läst 2026-09-28) -->
<!-- KÄLLA: https://www.waxholmsbolaget.se/reseplanering/resmal/grinda — "Grinda har trafik året om" (läst 2026-09-28) -->
<!-- KÄLLA: https://www.waxholmsbolaget.se/reseplanering/resmal/moja — "Båtar går året runt från Boda brygga på Värmdö till flera bryggor på Möja." (läst 2026-09-28) -->
<!-- KÄLLA: https://www.waxholmsbolaget.se/reseplanering/resmal/sandhamn — "Ut till Sandhamn går det turer året runt."; "Du kan åka till Sandhamn med båt från Stavsnäs och då tar resan drygt en timme." (läst 2026-09-28) -->
- **[Vaxholm](https://svalla.se/o/vaxholm):** en timme från Strömkajen, flera turer om dagen.
- **[Grinda](https://svalla.se/o/grinda):** trafik året om.
- **[Möja](https://svalla.se/o/moja):** båt året runt från Boda brygga på Värmdö.
- **[Sandhamn](https://svalla.se/o/sandhamn):** båt året runt från Stavsnäs, drygt en timme.

:::knapp
[Se båttiderna för en dag](https://svalla.se/utflykt)
:::

:::signatur
Ses därute.
*Du får inga fler mejl om att komma igång. Nyhetsbrevet kan du fortfarande prenumerera på.*
:::
`,
  saved_island: `---
trigger: användaren sparade en ö i går (en gång per ö)
layout: fullt
subject_options:
  - "Du sparade {{island_name}}"
preheader: Så tar du dig dit, och vad som står på ösidan.
from: "Team Svalla <hej@mail.svalla.se>"
---

# {{island_name}}

Du sparade {{island_name}} i Min skärgård. {{island_tagline}}

{{fakta_rad}}

:::ruta
### Så tar du dig dit
{{restid_rad}}

[Planera en dag till {{island_name}} →]({{planera_url}})
:::

{{guide_rad}}

:::knapp
[Till ösidan]({{island_url}})
:::

:::signatur
Ses därute.
*Du får det här mejlet en gång per ö du sparar.*
:::
`,
  weekly_island: `---
trigger: tisdagar april–september, en ö per vecka
layout: fullt
subject_options:
  - "Veckans ö: {{island_name}}"
preheader: {{island_tagline}}
from: "Team Svalla <hej@mail.svalla.se>"
---

# Veckans ö: {{island_name}}

{{island_tagline}}

{{fakta_rad}}

:::ruta
### Så tar du dig dit
{{restid_rad}}

[Planera en dag till {{island_name}} →]({{planera_url}})
:::

{{guide_rad}}

:::knapp
[Läs om {{island_name}}]({{island_url}})
:::

:::signatur
Ses därute.
*Allt i mejlet kommer från ösidan, där källan står för varje uppgift.*
:::
`,
}
