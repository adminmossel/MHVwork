<div align="center">

# 🍺 MHVwork

### Modern workforce & shift management voor MHV 1931

**Plan. Werk. Communiceer. Beheer. — alles vanuit één platform.**

<br>

🇳🇱 **Nederlands** · [🇬🇧 English](./README.en.md)

<br><br>

[![Version](https://img.shields.io/github/package-json/v/adminmossel/MHVwork?style=for-the-badge)](https://github.com/adminmossel/MHVwork)
[![License](https://img.shields.io/github/license/adminmossel/MHVwork?style=for-the-badge)](https://github.com/adminmossel/MHVwork)
[![Issues](https://img.shields.io/github/issues/adminmossel/MHVwork?style=for-the-badge)](https://github.com/adminmossel/MHVwork/issues)
[![Stars](https://img.shields.io/github/stars/adminmossel/MHVwork?style=for-the-badge)](https://github.com/adminmossel/MHVwork/stargazers)

<br>

[🌐 Live applicatie](https://adminmossel.github.io/MHVwork/) ·
[📖 Handleiding](./HANDLEIDING.md) ·
[📝 Changelog](./CHANGELOG.md) ·
[🐛 Issues](https://github.com/adminmossel/MHVwork/issues)

</div>

---

## 📖 Over MHVwork

**MHVwork** is een moderne Progressive Web App voor het organiseren van vrijwillige barhulp bij **MHV 1931**.

De applicatie brengt planning, medewerkers, dienstwissels, communicatie, notificaties en uitbetalingen samen in één centrale omgeving.

Het doel is eenvoudig:

> **Minder administratie. Minder losse berichten. Meer overzicht.**

MHVwork is ontworpen met de dagelijkse praktijk van een vereniging als uitgangspunt: snel, overzichtelijk en toegankelijk op telefoon, tablet en desktop.

---

## ✨ Functies

<table>
<tr>
<td width="50%">

### 📅 Roosterbeheer

- Diensten aanmaken en plannen
- Medewerkers koppelen aan diensten
- Beschikbaarheid beheren
- Dag-, week- en maandweergave
- Dienstbevestigingen
- Afwijkende werktijden
- Agenda-export via `.ics`

</td>
<td width="50%">

### 🔄 Dienstwissels

- Diensten beschikbaar stellen
- Interesse tonen
- Overname aanvragen
- Goedkeuring door beheerder
- Automatische roosterupdates
- Notificaties voor betrokken medewerkers

</td>
</tr>

<tr>
<td>

### 💬 Communicatie

- Centrale groepschat
- `@medewerker` mentions
- `@iedereen` meldingen
- `@dev` communicatie
- Afbeeldingen versturen
- Automatische afbeeldingscompressie
- Berichten beheren

</td>
<td>

### 💶 Uitbetalingen

- Uren bijhouden
- Verwachte inkomsten
- Goedgekeurde bedragen
- Uitbetalingen registreren
- Persoonlijke financiële overzichten
- Maandoverzichten

</td>
</tr>

<tr>
<td>

### 🔔 Notificaties

- In-app notificaties
- Notificatiebadge
- Browser notifications
- Push notifications
- E-mailmeldingen
- Meldingen bij dienstwissels

</td>
<td>

### 📱 Progressive Web App

- Installeerbaar op mobiel
- Installeerbaar op desktop
- Service Worker
- Offline caching
- App manifest
- Native-like ervaring

</td>
</tr>
</table>

---

## 👥 Rollen & rechten

MHVwork gebruikt verschillende rollen om functionaliteit en gegevens te scheiden.

| Rol | Beschrijving |
|---|---|
| 👤 **Medewerker** | Eigen rooster, beschikbaarheid, diensten, chat en financiële gegevens |
| 🛠️ **Beheerder** | Volledig beheer van medewerkers, roosters, diensten, uitbetalingen en communicatie |
| 💻 **Developer** | Technische functies en development-gerelateerde communicatie |

Toegang wordt gecontroleerd via **Firebase Authentication** en **Firestore Security Rules**.

---

## 🧭 Snel navigeren

<details>
<summary><strong>📚 Documentatie</strong></summary>

- [Installatie](#-installatie)
- [Configuratie](#-configuratie)
- [Architectuur](#️-architectuur)
- [Security](#-security)
- [PWA](#-progressive-web-app)
- [Roadmap](#️-roadmap)
- [Contributing](#-contributing)
- [License](#-license)

</details>

---

## 📱 Progressive Web App

MHVwork is gebouwd als een **Progressive Web App (PWA)**.

Dat betekent dat gebruikers de applicatie kunnen installeren zonder een aparte mobiele applicatie uit een app store te downloaden.

<details>
<summary><strong>🍎 iPhone / iPad</strong></summary>

1. Open MHVwork in Safari.
2. Tik op **Delen**.
3. Kies **Zet op beginscherm**.
4. Open MHVwork vanaf het beginscherm.

</details>

<details>
<summary><strong>🤖 Android</strong></summary>

1. Open MHVwork in Chrome.
2. Open het browsermenu.
3. Kies **App installeren** of **Toevoegen aan startscherm**.
4. Open de geïnstalleerde applicatie.

</details>

<details>
<summary><strong>💻 Desktop</strong></summary>

Gebruik Chrome of Edge en selecteer het installatie-icoon in de adresbalk wanneer dit beschikbaar is.

</details>

---

## 🏗️ Architectuur

```text
                           ┌─────────────────────┐
                           │      MHVwork PWA    │
                           │   HTML / CSS / JS   │
                           └──────────┬──────────┘
                                      │
                ┌─────────────────────┼─────────────────────┐
                │                     │                     │
                ▼                     ▼                     ▼
        ┌──────────────┐      ┌──────────────┐      ┌──────────────┐
        │    Firebase  │      │   EmailJS    │      │    Browser   │
        │     Auth     │      │    Email     │      │ Notifications│
        └──────┬───────┘      └──────────────┘      └──────────────┘
               │
               ▼
        ┌──────────────┐
        │   Firestore  │
        │   Database   │
        └──────────────┘
```

### Technologie

| Onderdeel | Technologie |
|---|---|
| Frontend | HTML5 / CSS3 / JavaScript |
| Application model | Progressive Web App |
| Database | Firebase Firestore |
| Authentication | Firebase Authentication |
| E-mail | EmailJS |
| Notifications | Web Notification API |
| Offline support | Service Worker |
| Hosting | GitHub Pages |
| Agenda | `.ics` |

---

## 🔐 Security

Security is een belangrijk onderdeel van MHVwork.

### Authentication

Gebruikers worden geauthenticeerd via Firebase Authentication.

### Authorization

Firestore Security Rules bepalen welke gegevens gebruikers mogen lezen en wijzigen.

### Rollen

Functies worden beperkt op basis van de gebruikersrol.

### Secrets

Gevoelige gegevens zoals:

- wachtwoorden;
- private keys;
- API secrets;
- service credentials;

mogen **nooit** rechtstreeks in de repository worden opgeslagen.

> ⚠️ Controleer altijd de actuele `firestore.rules` voordat je een productieomgeving publiceert.

---

## 📂 Projectstructuur

<details>
<summary><strong>Bekijk de projectstructuur</strong></summary>

```text
MHVwork/
│
├── 📄 index.html
├── 📄 app.html
├── 📄 index.js
│
├── 🔐 firestore.rules
│
├── 📱 manifest.json
├── ⚙️ sw.js
│
├── 👤 register.html
├── 🔑 reset-pw.html
├── 🛠️ seed-admin.html
│
├── 📖 HANDLEIDING.md
├── 📝 CHANGELOG.md
├── 📜 LICENSE
│
├── 🎨 promo.html
├── 📄 voorwaarden.html
│
└── 🖼️ assets
```

</details>

---

## ⚙️ Installatie

### Vereisten

- Een moderne webbrowser
- Een Firebase-project
- Firebase Authentication
- Firebase Firestore
- Eventueel een EmailJS-account

### Repository clonen

```bash
git clone https://github.com/adminmossel/MHVwork.git
cd MHVwork
```

### Lokale server

Start bijvoorbeeld een eenvoudige lokale server:

```bash
python -m http.server 8000
```

Open daarna:

```text
http://localhost:8000
```

> Zie [`HANDLEIDING.md`](./HANDLEIDING.md) voor de volledige installatie- en configuratie-instructies.

---

## 🔧 Configuratie

MHVwork gebruikt externe services voor bepaalde onderdelen van de applicatie.

### Firebase

Configureer:

- Authentication
- Firestore
- Security Rules

### EmailJS

Configureer EmailJS wanneer e-mailnotificaties worden gebruikt.

### Production

Voor productie wordt aanbevolen om:

- security rules te controleren;
- secrets buiten de repository te houden;
- gebruikersrollen te controleren;
- Firebase usage te monitoren;
- notificaties te testen;
- PWA-installatie te testen.

---

## 📊 Projectstatus

| Onderdeel | Status |
|---|---|
| 🔐 Authentication | ✅ Beschikbaar |
| 📅 Roosterbeheer | ✅ Beschikbaar |
| 🔄 Dienstwissels | ✅ Beschikbaar |
| 💬 Groepschat | ✅ Beschikbaar |
| 💶 Uitbetalingen | ✅ Beschikbaar |
| 🔔 Notificaties | ✅ Beschikbaar |
| 📱 PWA | ✅ Beschikbaar |
| 📆 Agenda-export | ✅ Beschikbaar |
| 🛠️ Verdere ontwikkeling | 🚧 Actief |

---

## 🗺️ Roadmap

<details>
<summary><strong>✅ Afgerond</strong></summary>

- [x] Basis roosterbeheer
- [x] Firebase Authentication
- [x] Firestore integratie
- [x] Dienstwissels
- [x] Groepschat
- [x] Uitbetalingen
- [x] Push notifications
- [x] E-mail notifications
- [x] PWA support
- [x] Agenda-export

</details>

<details>
<summary><strong>🚧 In ontwikkeling</strong></summary>

- [ ] Performance-optimalisaties
- [ ] Verbeterde mobiele UX
- [ ] Uitgebreidere rapportages
- [ ] Verbeterde notificatie-instellingen

</details>

<details>
<summary><strong>💡 Toekomst</strong></summary>

- [ ] Automatische roosterplanning
- [ ] Geavanceerde statistieken
- [ ] Audit logs
- [ ] Meer administratieve automatisering
- [ ] Uitgebreidere analytics

</details>

---

## 📝 Changelog

Alle belangrijke wijzigingen worden bijgehouden in:

**[`CHANGELOG.md`](./CHANGELOG.md)**

De actuele versie wordt weergegeven via de GitHub release/version badge bovenaan deze README.

---

## 🤝 Contributing

Bijdragen zijn welkom wanneer dit project daarvoor wordt opengesteld.

### Workflow

```text
Fork
  │
  ▼
Branch
  │
  ▼
Development
  │
  ▼
Testing
  │
  ▼
Pull Request
  │
  ▼
Review
  │
  ▼
Merge
```

### Pull Requests

Een goede Pull Request bevat:

- duidelijke omschrijving;
- reden voor de wijziging;
- relevante screenshots indien nodig;
- testinformatie;
- geen secrets;
- alleen relevante wijzigingen.

Voor grotere wijzigingen wordt aangeraden eerst een issue te openen.

---

## 🐛 Bugs & feature requests

Een probleem gevonden?

[Open een issue](https://github.com/adminmossel/MHVwork/issues/new)

Vermeld bij voorkeur:

- browser;
- apparaat;
- applicatieversie;
- stappen om het probleem te reproduceren;
- verwacht gedrag;
- daadwerkelijk gedrag;
- screenshots indien relevant.

---

## 📜 License

### ⚠️ Licentiebeleid

De licentie van MHVwork moet overeenkomen met het daadwerkelijke `LICENSE`-bestand in deze repository.

**Gebruik onderstaande MIT-sectie alleen wanneer de repository daadwerkelijk onder MIT wordt uitgebracht.**

### MIT License

Copyright © MHVwork / MHV 1931

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files, to deal in the Software without restriction, subject to the conditions of the MIT License.

De volledige juridische tekst staat in:

**[`LICENSE`](./LICENSE)**

> Als MHVwork niet bedoeld is voor vrij hergebruik, vervang deze sectie dan door de daadwerkelijk gekozen proprietary/non-commercial licentie.

---

## 🌐 Taal

| Taal | Document |
|---|---|
| 🇳🇱 Nederlands | **Huidige pagina** |
| 🇬🇧 English | [README.en.md](./README.en.md) |

---

## 📞 Contact

**MHVwork**

Voor technische vragen, bugs of ondersteuning:

📧 **h.mhvwork@gmail.com**

---

<div align="center">

### 🍺 MHVwork

**One roster. One team. One place.**

Built for **MHV 1931**.

<br>

[🌐 Live App](https://adminmossel.github.io/MHVwork/) ·
[💻 GitHub](https://github.com/adminmossel/MHVwork)

<br><br>

<sub>© MHVwork — MHV 1931</sub>

</div>