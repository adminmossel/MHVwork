# 🍺 MHVwork

> **Roosterbeheer voor MHV 1931 — gebouwd voor de barhulp**

MHVwork is een volledig gratis Progressive Web App (PWA) waarmee MHV 1931 zijn vrijwillige barhulp eenvoudig beheert. Van roosters en beschikbaarheid tot uitbetalingen, een live groepschat en dienstruilverzoeken — alles in één app.

---

## ✨ Wat kan MHVwork?

### 📅 Roosters
- Beheerders maken diensten aan en wijzen medewerkers toe
- Medewerkers bevestigen hun diensten of melden afwijkingen in tijden
- Overzicht per dag, week of maand via een ingebouwde kalender
- Diensten exporteren naar de telefoonagenda (`.ics`)

### 🔄 Dienst ruilen
- Medewerker plaatst een ruilverzoek via de groepschat
- Collega's reageren door interesse te tonen
- Beheerder keurt het goed → dienst wordt automatisch overgezet
- Beide medewerkers ontvangen een push‑ en e‑mailmelding

### 💬 Groepschat
- Iedereen (beheerders, medewerkers én dev) in één chat
- `@medewerker`, `@iedereen`, `@dev` taggen voor gerichte meldingen
- Beheerders kunnen berichten verwijderen
- Afbeeldingen versturen (automatisch gecomprimeerd)
- Uitbetalingen aankondigen via één knop
- Berichten ouder dan 3 maanden worden automatisch opgeruimd (tenzij vastgepind)

### 📊 Dashboard (medewerker)
- Overzicht van komende diensten
- Verwacht salaris op basis van geplande uren
- Goedgekeurde en uitbetaalde bedragen
- Bevestigingsstatus door de beheerder

### 💶 Uitbetalingen
- Beheerder markeert diensten als uitbetaald
- Medewerker ontvangt automatisch een e‑mailbevestiging
- Overzicht per maand

### 🔔 Meldingen
- In‑app notificaties (badge + inbox)
- E‑mailmeldingen via EmailJS
- Browser‑push notificaties wanneer de app als PWA is geïnstalleerd

### 🔒 Beveiliging
- Alle data‑toegang beveiligd via Firestore Security Rules
- Medewerkers kunnen alleen hun eigen data aanpassen
- Beheerders beheren alles; dev alleen chat en meldingen

---

## 👤 Rollen

| Rol | Toegang |
|-----|---------|
| **Medewerker** | Eigen rooster, beschikbaarheid, chat, profiel, agenda‑export, dienst ruilen |
| **Beheerder** | Alles + roosters beheren, medewerkers uitnodigen, uitbetalingen, berichten sturen |
| **Dev** | Chat, push‑ en e‑mailmeldingen versturen, accounts bekijken |

---

## 🛠 Technologie

| Onderdeel | Technologie |
|-----------|-------------|
| Hosting | GitHub Pages (gratis) |
| Database | Firebase Firestore |
| Authenticatie | Firebase Auth |
| E‑mail | EmailJS |
| Push | Browser Notification API + Service Worker |
| PWA | Web App Manifest + Service Worker |
| Agenda | `.ics` export (werkt op iPhone, Android, Windows, Mac) |

---

## 💰 Kosten

**Volledig gratis** binnen de volgende limieten:

| Service | Gratis limiet | Verwacht gebruik |
|---------|--------------|-----------------|
| Firebase Firestore | 1 GB, 50.000 reads/dag | < 1 MB, < 500/dag ✅ |
| Firebase Auth | Onbeperkt | ~15 gebruikers ✅ |
| EmailJS | 200 e‑mails/maand | < 50/maand ✅ |
| GitHub Pages | Onbeperkt | — ✅ |

---

## 🚀 Setup

Zie **HANDLEIDING.md** voor de volledige stap‑voor‑stap setup.

Kort samengevat:
1. Firebase project aanmaken + Firestore + Auth inschakelen
2. `firestore.rules` uploaden in Firebase console
3. EmailJS account aanmaken + 2 templates maken
4. Bestanden uploaden naar GitHub Pages
5. `seed-admin.html` openen → accounts worden automatisch aangemaakt
6. Inloggen met `h.mhvwork@gmail.com` en gaan!

---

## 📱 App installeren

**iPhone:** Safari → Deel‑icoon → "Zet op beginscherm"  
**Android:** Chrome → Menu → "Toevoegen aan startscherm"  
**Desktop:** Chrome/Edge → installatie‑icoon in adresbalk

---

## 📬 Contact

Vragen of problemen? Mail naar **h.mhvwork@gmail.com**

---

*MHVwork v3.0 — Gebouwd met ❤️ voor MHV 1931*
