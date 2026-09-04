<div align="center">

<img src="icon.svg" width="88" height="88" alt="MHVwork logo">

# 🍺 MHVwork

**Roosterbeheer voor MHV 1931 — gebouwd vóór en dóór de barhulp**

[![PWA](https://img.shields.io/badge/PWA-installeerbaar-1A3BB5?style=flat-square)](#-installeren)
[![Hosting](https://img.shields.io/badge/hosting-GitHub%20Pages-181717?style=flat-square&logo=github)](#-technologie)
[![Database](https://img.shields.io/badge/database-Firebase%20Firestore-FFCA28?style=flat-square&logo=firebase&logoColor=black)](#-technologie)
[![License](https://img.shields.io/badge/licentie-intern%20gebruik-lightgrey?style=flat-square)](#-licentie)

Geen rooster-appje uit de store, geen abonnement, geen WhatsApp-chaos meer. Eén gratis, op maat
gebouwde app die precies doet wat een bar met vrijwilligers nodig heeft — en niks anders.

</div>

---

## 📋 Inhoud

- [Wat kan MHVwork?](#-wat-kan-mhvwork)
- [Rollen](#-rollen)
- [Technologie](#-technologie)
- [Aan de slag](#-aan-de-slag)
- [Projectstructuur](#-projectstructuur)
- [Beveiliging](#-beveiliging)
- [Gebruikte bibliotheken & licenties](#-gebruikte-bibliotheken--licenties)
- [Licentie](#-licentie)

---

## ✨ Wat kan MHVwork?

### 📅 Rooster & diensten
- Diensten aanmaken (ook zónder direct iemand toe te wijzen), medewerkers toewijzen
- Eindtijd "Sluit" voor diensten met een onbekende sluitingstijd — telt pas mee zodra de
  medewerker de werkelijke tijd doorgeeft
- Medewerkers bevestigen hun diensten of melden een afwijkende gewerkte tijd
- Notities + foto per dienst
- Live voortgangsbalk + countdown op Home zodra een dienst daadwerkelijk bezig is
- Automatische pushmeldingen: een dag van tevoren, een uur van tevoren, direct na afloop, en een
  vervolgherinnering als een dienst na een instelbaar aantal uren nog niet bevestigd is
- Diensten exporteren naar de eigen telefoonagenda (`.ics`) of Excel (medewerkers × datums)

### 🍺 Sociale hygiëne
- Per medewerker bij te houden of iemand mag schenken (IVA-certificaat), zichtbaar voor
  iedereen via "Andere gebruikers" bij Profiel

### 📺 Idle-modus
- Kiosk-weergave voor op een tablet achter de bar: rooster van vandaag, live tijdbalk per
  dienst, losse blokken als er meerdere diensten tegelijk lopen
- Start met een zelfgekozen 4-cijferige code, alleen geldig voor die sessie — nergens opgeslagen

### 🔄 Dienst ruilen
- Medewerker plaatst een ruilverzoek via de groepschat, collega's tonen interesse, beheerder
  keurt goed → dienst wordt automatisch overgezet, beide partijen krijgen een melding

### 💬 Groepschat & privéberichten
- Eén groepschat met `@naam`, `@iedereen`, `@beheerder`, `@dev`, foto's (automatisch
  gecomprimeerd), berichten vastpinnen of verwijderen
- Privéberichten (DM) tussen medewerker en beheerder/dev, met dagscheiding en tijdstempels

### 📢 Aankondigingen
- Op Home alleen de titel — pas bij aantikken zie je de volledige aankondiging (afbeelding,
  opgemaakte tekst, bijlages) op een eigen pagina
- Basisopmaak bij het aanmaken (vet, tabs, witregels blijven gewoon staan)
- Speciale aankondigingen met eigen kleur en directe in-app pop-up

### 💶 Uitbetalingen
- Bevestigd → goedgekeurd → uitbetaald, met een apart overzicht van wat nog goedgekeurd moet
  worden zodat niks stil blijft hangen
- Export naar boekhouding: nette grootboekregels per medewerker per dienst, los van de
  matrix-vormige planningsexport

### 🔒 Rollen & bevoegdheden
- Dev kan een beheerder-account specifieke bevoegdheden ontnemen (medewerkers toevoegen,
  diensten aanmaken/verwijderen/goedkeuren, uitbetalen, aankondigingen plaatsen, medewerkers
  beheren) zonder het hele account te schorsen — afgedwongen in zowel de app als de
  databaseregels zelf, en zichtbaar voor de betrokken beheerder in het eigen profiel
- Harde reset (alleen dev): wist in één keer alle diensten, chat, meldingen en betaalhistorie,
  met dubbele bevestiging — accounts en logboek blijven altijd staan

### 🎨 Weergave
- Zwevende, glazen navigatie — of de klassieke volle-breedte-balk, naar keuze per account
- Licht/donker thema, los van de systeeminstelling, plus een verborgen NASA-APOD-thema
- Wachtwoord-sterktemeter bij aanmaken én wijzigen

---

## 👤 Rollen

| Rol | Toegang |
|---|---|
| **Medewerker** | Eigen rooster, beschikbaarheid, chat, profiel, agenda-export, dienst ruilen |
| **Beheerder** | Alles van medewerker + roosters beheren, medewerkers uitnodigen, uitbetalingen, aankondigingen — tenzij dev specifieke bevoegdheden heeft ingetrokken |
| **Dev** | Eigen omgeving: accountbeheer, bevoegdheden per beheerder, aankondigingen, logboek, harde reset — géén toegang tot financiële gegevens |

---

## 🛠 Technologie

| Onderdeel | Technologie |
|---|---|
| Hosting | GitHub Pages (gratis) |
| Database | Firebase Firestore (Spark-plan, gratis tier) |
| Authenticatie | Firebase Authentication |
| E-mail | EmailJS (optioneel: Gmail SMTP via Cloud Functions, zie `index.js`) |
| Push | Browser Notification API + Service Worker |
| PWA | Web App Manifest + Service Worker |
| Agenda-export | `.ics`-bestand (iPhone, Android, Windows, Mac) |
| Excel-export | [SheetJS](https://sheetjs.com) (client-side, geen server nodig) |

Geen build-stap, geen framework — puur HTML/CSS/JavaScript, direct leesbaar en aanpasbaar.

---

## 🚀 Aan de slag

Volledige installatie- en updatehandleiding: zie **[HANDLEIDING.md](./HANDLEIDING.md)**.
Overzicht van alle wijzigingen per versie: zie **[CHANGELOG.md](./CHANGELOG.md)**.

In het kort:
1. Fork of clone deze repository
2. Maak een eigen [Firebase](https://console.firebase.google.com)-project aan (Spark-plan volstaat)
3. Vul je Firebase-configuratie in bovenaan `app.html`, `index.html`, `register.html` en `reset-pw.html`
4. Publiceer de `firestore.rules` in de Firebase Console
5. Zet GitHub Pages aan voor deze repository

---

## 📁 Projectstructuur

```
├── index.html          Inlogpagina
├── register.html        Accountregistratie (via uitnodigingslink)
├── reset-pw.html         Wachtwoord opnieuw instellen
├── app.html              De volledige applicatie (alle rollen)
├── voorwaarden.html       Gebruiksvoorwaarden & privacyverklaring
├── promo.html             Uitlegpagina "Wat is MHVwork?"
├── firestore.rules        Firestore security rules
├── manifest.json          PWA-manifest
├── sw.js                  Service worker
├── index.js               Optionele Cloud Functions (Gmail SMTP, accountbeheer)
├── icon.svg / icon-*.png  App-iconen
├── HANDLEIDING.md         Installatie- en updatehandleiding
└── CHANGELOG.md           Overzicht van alle wijzigingen
```

---

## 🔒 Beveiliging

- Alle databasetoegang loopt via Firestore Security Rules — medewerkers kunnen alleen hun eigen
  gegevens aanpassen, beheerders beheren roosters/uitbetalingen, en de dev-rol heeft geen toegang
  tot financiële gegevens
- Alleen een dev-account kan de dev-rol toewijzen of intrekken, en alleen dev kan een beheerder
  specifieke bevoegdheden ontnemen — allebei afgedwongen in zowel de app als de databaseregels
- Wachtwoord-reset verloopt via Firebase's eigen, beveiligde flow
- Geschorste accounts worden bij inloggen direct geweigerd

---

## 📦 Gebruikte bibliotheken & licenties

MHVwork is zelf geschreven zonder framework, maar leunt op de volgende diensten en bibliotheken:

| Bibliotheek / dienst | Doel | Licentie |
|---|---|---|
| [Firebase](https://firebase.google.com) (Firestore, Auth, Cloud Functions) | Database, login, optionele mailserver | [Google APIs Terms of Service](https://developers.google.com/terms) |
| [EmailJS](https://www.emailjs.com) | E-mailverzending vanuit de browser | Eigen servicevoorwaarden ([emailjs.com/legal](https://www.emailjs.com/legal/terms-of-service/)) |
| [SheetJS (xlsx)](https://sheetjs.com) | Excel-export in de browser | [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0) |
| [Nodemailer](https://nodemailer.com) | Gmail SMTP-verzending (optioneel, `index.js`) | MIT License |
| [Outfit](https://fonts.google.com/specimen/Outfit) (Google Fonts) | Lettertype | [SIL Open Font License 1.1](https://openfontlicense.org) |

---

## 📄 Licentie

Deze applicatie is gebouwd voor en het interne gebruik van **MHV 1931**. De broncode mag vrij
bekeken, aangepast en hergebruikt worden voor gelijksoortige vrijwilligersorganisaties; gebruik
op eigen risico en zonder enige garantie. Bovenstaande externe diensten en bibliotheken vallen
onder hún eigen licentievoorwaarden (zie tabel hierboven) — check die zelf even als je deze app
elders wil inzetten of doorontwikkelen.
