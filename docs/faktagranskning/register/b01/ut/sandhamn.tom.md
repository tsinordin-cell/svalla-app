# Sandhamn – det som kräver Tom (faktagranskning b01, 2026-10-29, omarbetad 2026-11-03 och 2026-11-09)

## 1. Café Strindbergsgården: ska posten döljas tills någon bekräftar den? (ny fråga 2026-11-09)
- **Läget:** posten `cafe-strindbergsgarden` (rad 0428–0435) har bara en källa, kaféets Facebooksida. Redaktören läste den i din Chrome 2026-11-09, och sidan visar bara "Det här innehållet är inte tillgängligt just nu" (avskrift i kallcache/facebook-2026-11-09.txt). Sidan belägger alltså ingenting.
- **Sökt 2026-11-09 utan träff:** egen webbplats, Instagram med inlägg från de senaste 12 månaderna och Värmdö kommuns sidor. Namnet "Café Strindbergsgården" finns bara hos restaurangguider och bloggar, som inte är tillåtna källor. OpenStreetMap har inget kafé med det namnet.
- **Det som finns i Strindbergsgården i dag:** Strindberg's Champagne Club, med egen webbplats (strindbergs.se, läst 2026-11-09): "Champagnebar, restaurang och medlemsklubb", "Strindbergsgården, där restaurangen och klubben har sitt säte", adress "Strindbergsgården, Sandhamn 111, Sandhamn". Restaurangen har stängt efter sommarsäsongen 2026. Om det är samma ställe som kaféet går inte att avgöra härifrån; kaféets adress i posten är Sandhamn 109.
- **Posten är inte ändrad.** Namn, nål och texten "Café Strindbergsgården är ett kafé i Sandhamn, på adressen Sandhamn 109." står kvar utan belägg.
- **Ja, dölj:** posten döljs på samma sätt som PUB Alma och Sandhamns Glassigaste Ställe, till exempel med `update restaurants set hidden_at = now(), hidden_reason = 'Ingen tillåten källa bekräftar att kaféet finns (Toms beslut, faktagranskning b01)' where slug = 'cafe-strindbergsgarden' and hidden_at is null;`
- **Ja, ersätt:** posten görs om till Strindberg's Champagne Club med text ur klubbens egen sida och en nål uppmätt i OpenStreetMap. Det ändrar vilken verksamhet posten gäller, som Isbolaget på Styrsö (beslut 7).
- **Nej:** posten står kvar som den är tills någon på ön bekräftar den.

## 2. Beslutat 2026-11-08 (beslut 6) – gjort i sandhamn.sql
- **Stora Trouvillestranden och Lilla Trouville Stranden** döljs som dubbletter av Trouville. Satsen står i slutet av sandhamn.sql och är samma som den förberedda i supabase/datafix/2026-10-19-filmoarna.sql rad 182–183. Posternas sidor och raden "Stora Trouvillestranden" i badplatslistan på /o/sandhamn/med-barn försvinner när satsen körs.
- **PUB Alma och Sandhamns Glassigaste Ställe:** ingen tillåten källa hittad 2026-11-09 heller. Satserna för att dölja dem står bortkommenterade i sandhamn.sql och körs bara om ingen har bekräftat posterna före batch 01:s PR. Redaktören avgör.

## 3. Beslutat 2026-11-08 (beslut 2) – regionetiketten
Etiketten "Mellersta skärgården" står kvar som Svallas egen indelning. Texten nämner Länsstyrelsens indelning med källa: taglinen säger "i ytterskärgården" och description[3] "Stockholms yttre skärgård" (Länsstyrelsens fiskeguide: "I Stockholms yttre skärgård från Sandhamn och söderut.").

## 4. Till kännedom (inget beslut behövs)
- **Bistro Sands** heter "Sands Hotells restaurang" i sandhamn.sql. Hotellets sida nämner ingen bistro och säger inte om restaurangen är öppen för andra än hotell- och konferensgäster.
- **Västerudde strand** heter "Stranden vid Västerudden" i sandhamn.sql.
