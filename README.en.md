<div align="center">
<img src="icon.svg" width="88" height="88" alt="MHVwork logo">

# 🍺 MHVwork

### The schedule for MHV's clubhouse bar — built by and for the volunteers

**No app-store roster app. No subscription. No more WhatsApp chaos.**

<br>

[🇳🇱 Nederlands](./README.md) · **🇬🇧 English**

<br>

[![PWA](https://img.shields.io/badge/PWA-installable-1A3BB5?style=for-the-badge)](#-installing)
[![Hosting](https://img.shields.io/badge/hosting-GitHub%20Pages-181717?style=for-the-badge&logo=github)](#-technology)
[![Database](https://img.shields.io/badge/database-Firebase%20Firestore-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](#-technology)
[![License](https://img.shields.io/badge/license-internal%20use-lightgrey?style=for-the-badge)](#-license)

<br>

[🌐 Open the app](https://adminmossel.github.io/MHVwork/) ·
[📖 Setup guide](./HANDLEIDING.md) ·
[📝 Changelog](./CHANGELOG.md) ·
[🎨 Promo page](./promo.html)

</div>

---

One free, purpose-built app that does exactly what a volunteer-run clubhouse bar needs — and
nothing else. No more scattered WhatsApp group where the latest roster gets buried, no
spreadsheet that only lives on one laptop: everyone sees their own shifts, submits their
availability and swaps with a colleague. The admin approves, pays out, and always has an
up-to-date overview.

> This is a translation of the Dutch original. If anything here ever reads differently from
> [README.md](./README.md), the Dutch version is the source of truth.

## 📋 Contents

- [What can MHVwork do?](#-what-can-mhvwork-do)
- [Roles & permissions](#-roles--permissions)
- [Technology](#-technology)
- [Installing as an app](#-installing)
- [Getting started](#-getting-started)
- [Project structure](#-project-structure)
- [Security](#-security)
- [Thanks to](#-thanks-to)
- [Libraries & licenses used](#-libraries--licenses-used)
- [License](#-license)

---

## ✨ What can MHVwork do?

<table>
<tr>
<td width="50%" valign="top">

### 📅 Schedule & shifts
- Create shifts — even without assigning someone right away
- A "Close" end time for shifts with an unknown closing time, only counted once the staff
  member reports the actual time worked
- Confirm a shift, or report a different time actually worked
- Note + photo per shift
- Live progress bar and countdown on Home while a shift is in progress
- Export to your own calendar (`.ics`) or to Excel

</td>
<td width="50%" valign="top">

### 🔄 Shift swaps
- A staff member posts a swap request in the group chat
- Colleagues show interest
- The admin approves it
- The shift is reassigned automatically, both people get a notification

</td>
</tr>
<tr>
<td valign="top">

### 💬 Group chat & DMs
- `@name`, `@everyone`, `@admin`, `@dev` — triggers an instant push notification
- Photos, compressed automatically
- Pin or delete messages
- Direct messages between a staff member and an admin/dev

</td>
<td valign="top">

### 📢 Announcements
- Only the title shows on Home — the full text opens on its own page
- Basic formatting (bold, tabs, line breaks) when writing one
- Special announcements get their own colour and an instant in-app pop-up

</td>
</tr>
<tr>
<td valign="top">

### 💶 Payouts
- Confirmed → approved → paid out
- A separate view of what's still waiting for approval
- Export to bookkeeping: clean ledger lines per staff member, per shift

</td>
<td valign="top">

### 🔔 Notifications
- In-app, e-mail and browser push
- A day ahead, an hour ahead, right after a shift ends
- A follow-up reminder if a shift is still unconfirmed after a while

</td>
</tr>
<tr>
<td valign="top">

### 🍺 Serving certification
- Track per staff member whether they're certified to serve alcohol (IVA certificate)
- Visible to everyone under "Other users" in Profile

</td>
<td valign="top">

### 📺 Idle mode
- A kiosk view for a tablet behind the bar
- Today's schedule with a live time bar per shift
- Starts with a self-chosen 4-digit code, never stored anywhere

</td>
</tr>
</table>

### 🎨 Look & feel
A floating, glass-style navigation bar, or the classic full-width bar — a per-account choice.
Light, dark, or a hidden NASA-APOD theme, independent of the system setting. A password
strength meter when creating or changing a password.

---

## 👤 Roles & permissions

| Role | Access |
|---|---|
| 👤 **Staff member** | Own schedule, availability, chat, profile, calendar export, shift swaps |
| 🛠️ **Admin** | Everything a staff member has, plus: manage schedules, invite staff, payouts, announcements, disabling a feature for a single profile — unless dev has revoked a specific permission |
| 💻 **Dev** | Own area: account management, per-admin permissions, disabling features app-wide, announcements, audit log, hard reset — **no access to financial data** |

Permissions are fine-grained, not all-or-nothing:

- **Dev can revoke specific permissions from an admin account** (adding staff, creating/
  deleting/approving shifts, paying out, posting announcements, managing staff, disabling
  features on a profile) without suspending the whole account — enforced in both the app and
  the database rules, and visible to the affected admin in their own profile
- **An admin can never delete an announcement posted by dev**, and can't disable a feature
  app-wide (like turning off chat for everyone) — that stays reserved for dev. An admin *can*
  still disable a feature for a single profile, for example during onboarding
- **Hard reset (dev only)**: wipes every shift, chat message, notification and payment record
  at once, with double confirmation — accounts and the audit log are always kept

---

## 🛠 Technology

| Component | Technology |
|---|---|
| Hosting | GitHub Pages (free) |
| Database | Firebase Firestore (Spark plan, free tier) |
| Authentication | Firebase Authentication |
| E-mail | EmailJS (optional: Gmail SMTP via Cloud Functions, see `index.js`) |
| Push | Browser Notification API + Service Worker |
| PWA | Web App Manifest + Service Worker |
| Calendar export | `.ics` file (iPhone, Android, Windows, Mac) |
| Excel export | [SheetJS](https://sheetjs.com) (client-side, no server needed) |

No build step, no framework — plain HTML/CSS/JavaScript, readable and editable as-is.

---

## 📲 Installing

MHVwork is a **Progressive Web App**: no app store required.

<details>
<summary><strong>🍎 iPhone / iPad</strong></summary>

1. Open MHVwork in Safari
2. Tap **Share**
3. Choose **Add to Home Screen**

</details>

<details>
<summary><strong>🤖 Android</strong></summary>

1. Open MHVwork in Chrome
2. Open the browser menu
3. Choose **Install app** or **Add to Home screen**

</details>

<details>
<summary><strong>💻 Desktop</strong></summary>

Use Chrome or Edge and click the install icon in the address bar.

</details>

---

## 🚀 Getting started

Full installation and update guide: see **[HANDLEIDING.md](./HANDLEIDING.md)** (Dutch).
Overview of every change per version: see **[CHANGELOG.md](./CHANGELOG.md)** (Dutch).

In short:
1. Fork or clone this repository
2. Create your own [Firebase](https://console.firebase.google.com) project (the Spark plan is enough)
3. Fill in your Firebase config at the top of `app.html`, `index.html`, `register.html` and `reset-pw.html`
4. Publish `firestore.rules` in the Firebase Console
5. Turn on GitHub Pages for this repository

---

## 📁 Project structure

```
├── index.html          Login page
├── register.html        Account registration (via invite link)
├── reset-pw.html         Password reset
├── app.html              The full application (all roles)
├── voorwaarden.html       Terms of use & privacy policy (Dutch)
├── promo.html             "What is MHVwork?" presentation
├── firestore.rules        Firestore security rules
├── manifest.json          PWA manifest
├── sw.js                  Service worker
├── index.js               Optional Cloud Functions (Gmail SMTP, account management)
├── icon.svg / icon-*.png  App icons
├── HANDLEIDING.md         Installation & update guide (Dutch)
└── CHANGELOG.md           Changelog (Dutch)
```

---

## 🔐 Security

- All database access goes through Firestore Security Rules — staff members can only edit their
  own data, admins manage schedules/payouts within their granted permissions, and the dev role
  has no access to financial data
- Only a dev account can assign or revoke the dev role, and only dev can revoke a specific
  permission from an admin — or disable a feature app-wide — both enforced in the app and in the
  database rules, not just on screen
- Password resets go through Firebase's own, secure flow
- Suspended accounts are rejected immediately at login

> ⚠️ Always check the current `firestore.rules` before deploying to a production environment.

---

## 🙏 Thanks to

For their help testing and shaping the app:

- R. Massalt
- I. Massalt
- C. Koning
- J. v Heun (dev)
- You, if you pitch in!

---

## 📦 Libraries & licenses used

MHVwork is hand-written without a framework, but relies on the following services and libraries:

| Library / service | Purpose | License |
|---|---|---|
| [Firebase](https://firebase.google.com) (Firestore, Auth, Cloud Functions) | Database, login, optional mail server | [Google APIs Terms of Service](https://developers.google.com/terms) |
| [EmailJS](https://www.emailjs.com) | Sending e-mail from the browser | Own terms of service ([emailjs.com/legal](https://www.emailjs.com/legal/terms-of-service/)) |
| [SheetJS (xlsx)](https://sheetjs.com) | Excel export in the browser | [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0) |
| [Nodemailer](https://nodemailer.com) | Gmail SMTP sending (optional, `index.js`) | MIT License |
| [Outfit](https://fonts.google.com/specimen/Outfit) (Google Fonts) | Typeface | [SIL Open Font License 1.1](https://openfontlicense.org) |

---

## 📄 License

This application was built for, and is for the internal use of, **MHV**. The source code may be
freely viewed, adapted and reused by similar volunteer organisations; use it at your own risk and
without any warranty. The external services and libraries listed above are governed by their own
license terms (see the table above) — check those yourself before deploying or extending this app
elsewhere.

<div align="center">
<br>

### 🍺 MHVwork

**One roster. One team. One place.**

Built for **MHV**.

<sub>Questions, bugs or support: h.mhvwork@gmail.com</sub>

</div>
