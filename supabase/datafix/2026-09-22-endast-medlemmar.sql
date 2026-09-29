-- 2026-09-22: 11 klubb- och föreningshamnar märkta endast_medlemmar.
--
-- Underlag (lästa 2026-09-22):
--   bromskar — bromskar.se: samfällighetsförening, "Medlemmar"; alla platser sålda, inga gästplatser anges.
--   kryssarklubbens-uthamn — sxk.se: "nio uthamnar ... bojar som du som medlem kan förtöja".
--   resaro-batklubb — resarobatklubb.se: ideell förening, "Ansök om medlemskap"; inga gästplatser anges.
--   dalaro-batklubb — dalarobatklubb.se: "ANSÖK OM MEDLEMSKAP OCH BÅTPLATS".
--   galo-batklubb — gbk70.se: "Bli medlem", "Medlemsinformation".
--   skalakers-batklubb — skalakersbatklubb.se: "Medlemskap", "Vi välkomnar nya medlemmar!".
--   oaxens-batklubb — oaxensbk.se: båtklubb med egen hamn och klubbholme.
--   lacka-nynashamns-segelsallskap — Nynäshamns Segelsällskaps klubbholme (sidan svarade 503).
--   blynasvikens-batklubb, guldbadans-batklubb, nasselvikens-batklubb — båtklubbar;
--     sidorna gick inte att läsa (tom sida, 502, ingen webbplats).
--
-- Märkningen säger bara att platserna är för medlemmar och uppmanar besökare att
-- kontakta föreningen. Den påstår inte att gäster är förbjudna.

update restaurants set endast_medlemmar = true, updated_at = now()
where slug in ('blynasvikens-batklubb','bromskar','dalaro-batklubb','galo-batklubb','guldbadans-batklubb',
  'kryssarklubbens-uthamn','lacka-nynashamns-segelsallskap','nasselvikens-batklubb','oaxens-batklubb',
  'resaro-batklubb','skalakers-batklubb')
  and hidden_at is null;
