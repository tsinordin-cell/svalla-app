# Fjäderholmarna – beslut till Tom (batch 01, 2026-10-29)

## Regionetiketten "Mellersta skärgården" (rad fjaderholmarna-0010)

Ingen tillåten källa placerar Fjäderholmarna i Mellersta skärgården. Sökt hos Waxholmsbolaget (tidtabeller, resmål), Strömma, Länsstyrelsen, Lidingö stad och Visit Stockholm. Det enda belagda är Lidingö stads indelning:

- https://lidingo.se/stad-politik/om-lidingo/lidingo-skargard/ — "Lidingös skärgård utgörs av spridda holmar och småöar som omger Lidingö från och med Storholmen mot Vaxholm i norr, Duvholmen och Stora Höggarn i öster, samt Fjäderholmarna in mot Stockholm i söder." (läst 2026-10-29)

Varför det kräver ett beslut: `regionLabel` styr inte bara texten i hero, undersidornas överrubrik, JSON-LD och og:description. `src/components/RegionOar.tsx` filtrerar öarna på exakt detta värde. Byts etiketten till "Lidingös skärgård" försvinner Fjäderholmarna ur listorna för Mellersta skärgården. Det är en ändring i sajtens indelning, inte bara en rättelse.

Alternativ:
1. Behåll "Mellersta skärgården" som Svallas egen navigationsindelning. Etiketten är då ingen sakuppgift, men den behöver en källa eller en mening i ARBETSREGLER om att regionerna är Svallas egen indelning.
2. Byt till "Lidingös skärgård" (belagt). Lägg samtidigt till etiketten i de regionlistor där ön ska synas.

Inget av detta ligger i edits.json.
