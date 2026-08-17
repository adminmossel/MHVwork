# CHANGELOG — MHVwork

Volledig overzicht van alle doorgevoerde wijzigingen, gegroepeerd per onderwerp.

## 🐛 Kritieke bugs (opgelost)
- **Roosterpagina medewerkers volledig onklikbaar** — twee afzonderlijke oorzaken gevonden:
  1. Verderop in het bestand stonden kapotte duplicaten van `window.calNav`, `window.selCalDay` en `window.setRTab` die de werkende functies overschreven met verwijzingen naar niet-bestaande functies.
  2. Een oude, losstaande click-listener op het hele document verwees naar een `#notif-panel`-element dat niet meer bestaat (sinds Meldingen een volledige pagina werd) en gooide daardoor bij **elke klik, waar dan ook in de app**, een onopgevangen fout.
  Beide verwijderd/gefixt.
- **Announcement-knop "insufficient permissions"** — de `announcements`-collectie had geen Firestore-regel.
- **Wachtwoord-reset link ongeldig** — volledig vervangen door Firebase's eigen, beveiligde reset-flow (was: een zelfgebouwd systeem dat nooit een geldig tijdelijk wachtwoord aanmaakte).
- **Rooster opende niet standaard op "Alles"** — twee tab-sets deelden per ongeluk dezelfde variabele.
- **`employees()`-functie gaf ook dev-accounts terug** — daardoor was een dev inroosterbaar en verscheen die in beschikbaarheidslijsten.
- **Beheerders konden geen dev-rol toewijzen** — het rol-veld werd nooit opgeslagen bij het aanmaken van een uitnodiging.
- **Ruil-bug**: "Goedkeuren/Afwijzen" verscheen al vóórdat iemand interesse had getoond.
- **Export-agendaknop werkte niet op mobiel/PWA** — iOS/Android blokkeren soms stille blob-downloads; nu eerst een poging via de Deel-functie (Web Share API), met download als fallback.
- **Pin-bug in chat** — het vastgepinde bericht stond bovenin de scrollende lijst en verdween dus bij scrollen.
- **Nieuwe/verwijderde diensten stuurden geen push of e-mail**, alleen een onzichtbare in-app entry.
- **Beheerder kreeg een pushmelding bij élk chatbericht**, ook zonder getagd te zijn — nu alleen bij een echte @tag.
- **apple-touch-icon was een SVG** — iOS ondersteunt dat niet, dus verscheen er een leeg icoon op het beginscherm na installatie.

## ✨ Nieuwe features
- **Privéberichten (DM)** tussen medewerker en beheerder/dev, los van de groepschat.
- **Meldingen als volledige pagina** i.p.v. een dropdown-paneeltje, met tabs "Systeem" en "Berichten".
- **Bevestigingsreminder-systeem**: melding na afloop van een onbevestigde dienst, tweede herinnering na instelbaar aantal uren (standaard 30, aanpasbaar), daarna kan de beheerder de oorspronkelijke tijd niet meer wijzigen — status toont "Geweest, onbevestigd".
- **Dashboard medewerker**: "Goedgekeurd" en "Uitbetaald" apart zichtbaar, plus lid-sinds/totaal-verdiend/aantal-diensten-statistieken.
- **PWA-installatiepopup** direct na account aanmaken, met **aparte, visuele iOS-uitleg** (Deel-icoon → "Zet op beginscherm") i.p.v. generieke tekst, en een vinkje bij Profiel zodra de app echt geïnstalleerd is.
- **Dev: speciale aankondigingen** — eigen kleur, in-app pop-up, homepage-banner, en meteen push + mail naar de doelgroep.
- **Dienstnotities met foto** — nu zowel bij het aanmaken áls bewerken van een dienst, zichtbaar voor medewerkers in hun rooster (push-only, geen mail).
- **Afwezigheid als periode** doorgeven (van/t/m-datum) i.p.v. losse dagen, plus notitie achteraf bewerkbaar.
- **App-tour**: automatisch bij de allereerste login ooit, en herstartbaar via een knop bij Profiel.
- **Login/logout-logboek** (alleen zichtbaar voor dev): per gebeurtenis tijd, apparaat/browser en (best-effort, niet-blokkerend) IP-adres.
- **Dev-paneel volledig herbouwd**: medewerkers uitnodigen/verwijderen/tijdelijk schorsen (met daadwerkelijke inlog-blokkade), rollen wijzigen, geverifieerd-vinkje bij dev-accounts, MHVwork-logo als vaste dev-profielfoto.
- **Dark/light mode-toggle** (licht/donker/systeem), volledig los van de systeeminstelling, geen flikkering bij opstarten. Lichte modus met aangescherpte contrasten.
- **Wachtwoordsterktemeter + tonen/verbergen** bij account aanmaken.
- **Gebruiksvoorwaarden & privacyverklaring**: eigen pagina, link op de inlogpagina, verplicht akkoord bij registratie (met vastgelegd tijdstip).
- **iOS-optimalisaties**: correcte PNG-app-iconen, `viewport-fit=cover` + safe-area's boven/onder, invoervelden op 16px (voorkomt ongewenst inzoomen bij een tikveld), getemperd bounce-scrollgedrag.

## 🔒 Beveiliging
- Alleen een dev-account kan nog de dev-rol toewijzen of intrekken — afgedwongen in zowel de app als de Firestore-regels (registratie-flow blijft wel gewoon werken).
- Uitnodigingen kunnen niet meer door willekeurige bezoekers herschreven worden vóór registratie.
- Geschorste accounts worden ook echt geweigerd bij het inloggen (niet alleen visueel gemarkeerd).

## 🔧 Optioneel, vereist eigen actie (zie HANDLEIDING.md)
- Eigen e-mailtemplate per soort mail (structuur staat klaar, EmailJS-template-ID's zelf invullen).
- Gmail SMTP i.p.v. EmailJS — code staat klaar in `functions/`, vereist Firebase Blaze-plan en handmatige deploy.
