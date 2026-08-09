/**
 * MHVwork — Cloud Functions
 * ==========================
 * Dit bestand is OPTIONEEL. Het is er alleen omdat je vroeg om "de gratis Google SMTP service"
 * i.p.v. EmailJS. GitHub Pages kan zelf geen e-mail versturen (het is pure statische hosting,
 * zonder server), dus moet dat ergens anders vandaan komen. Dit draait op Firebase Cloud
 * Functions — Google's eigen server-infrastructuur — en verstuurt mail via een gewoon
 * Gmail-account (SMTP), volledig gratis binnen het normale Gmail-verzendlimiet (~500 mails/dag).
 *
 * BELANGRIJK — dit vereist wél het "Blaze"-plan van Firebase (pay-as-you-go i.p.v. gratis
 * Spark-plan), omdat Cloud Functions alleen op Blaze naar het internet mogen praten (nodig om
 * bij Gmail's SMTP-server te komen). Voor dit gebruik (een handjevol mails per dag) blijf je
 * ruim binnen het gratis quotum van Blaze, dus in de praktijk betaal je niets — maar het is
 * geen 100%-gratis plan meer zoals het Spark-plan dat de rest van de app gebruikt.
 *
 * De app werkt VOLLEDIG zonder dit bestand — EmailJS blijft gewoon actief als je dit niet
 * deployt. Zie HANDLEIDING.md voor de volledige deploy-instructies.
 */

const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

admin.initializeApp();

// Deze twee "secrets" stel je zelf in via de Firebase CLI, zie HANDLEIDING.md.
// GMAIL_USER = het volledige Gmail-adres waar de mail vandaan komt (bv. h.mhvwork@gmail.com)
// GMAIL_APP_PASSWORD = een 16-tekens "app-wachtwoord" (NIET je normale Gmail-wachtwoord!)
const GMAIL_USER = defineSecret("GMAIL_USER");
const GMAIL_APP_PASSWORD = defineSecret("GMAIL_APP_PASSWORD");

function buildTransport(user, pass) {
  return nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });
}

// Eigen "template" per soort mail — pas de teksten hieronder gerust aan naar jullie huisstijl.
const TEMPLATES = {
  general:  (t, b) => ({ subject: t, html: `<div style="font-family:sans-serif;padding:20px"><h2 style="color:#1D3FBB">${t}</h2><p style="white-space:pre-wrap">${b}</p><hr><p style="color:#999;font-size:12px">MHVwork — MHV 1931</p></div>` }),
  tag:      (t, b) => ({ subject: t, html: `<div style="font-family:sans-serif;padding:20px"><h2 style="color:#1D3FBB">💬 Nieuw bericht in de chat</h2><p>${b}</p></div>` }),
  announce: (t, b) => ({ subject: "📢 " + t, html: `<div style="font-family:sans-serif;padding:20px;background:#FFF8E1"><h2 style="color:#F5C800">📢 ${t}</h2><p>${b}</p></div>` }),
  swap:     (t, b) => ({ subject: t, html: `<div style="font-family:sans-serif;padding:20px"><h2 style="color:#1D3FBB">🔄 ${t}</h2><p>${b}</p></div>` }),
  payment:  (t, b) => ({ subject: t, html: `<div style="font-family:sans-serif;padding:20px;background:#E8F5E9"><h2 style="color:#2E7D32">💶 ${t}</h2><p>${b}</p></div>` }),
  message:  (t, b) => ({ subject: t, html: `<div style="font-family:sans-serif;padding:20px"><h2 style="color:#1D3FBB">✉️ ${t}</h2><p>${b}</p></div>` }),
};

/**
 * Callable function — roep je aan vanuit de app i.p.v. EmailJS.
 * Voorbeeld (in app.html, ter vervanging van emailjs.send(...)):
 *
 *   import { getFunctions, httpsCallable } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-functions.js";
 *   const functions = getFunctions(app, "europe-west1");
 *   const sendMail = httpsCallable(functions, "sendMail");
 *   await sendMail({ to: 'iemand@gmail.com', toName: 'Piet', title: '...', body: '...', type: 'general' });
 */
exports.sendMail = onCall(
  { secrets: [GMAIL_USER, GMAIL_APP_PASSWORD], region: "europe-west1" },
  async (request) => {
    if (!request.auth) {
      throw new HttpsError("unauthenticated", "Je moet ingelogd zijn.");
    }
    const { to, toName, title, body, type } = request.data || {};
    if (!to || !title) {
      throw new HttpsError("invalid-argument", "'to' en 'title' zijn verplicht.");
    }
    const tpl = TEMPLATES[type] || TEMPLATES.general;
    const { subject, html } = tpl(title, body || "");
    const transport = buildTransport(GMAIL_USER.value(), GMAIL_APP_PASSWORD.value());
    await transport.sendMail({
      from: `"MHVwork" <${GMAIL_USER.value()}>`,
      to: toName ? `"${toName}" <${to}>` : to,
      subject,
      html,
    });
    return { ok: true };
  }
);

/**
 * Automatisch een mail sturen zodra er een nieuwe notificatie in Firestore verschijnt.
 * Dit is een ALTERNATIEF voor het rechtstreeks aanroepen van sendMail() vanuit de app —
 * kies er één van (of gebruik geen van beide en blijf gewoon bij EmailJS).
 */
exports.onNotificationCreated = onDocumentCreated(
  { document: "notifications/{id}", secrets: [GMAIL_USER, GMAIL_APP_PASSWORD], region: "europe-west1" },
  async (event) => {
    const data = event.data?.data();
    if (!data || !data.to || !data.to.length) return;
    // @tag-meldingen NOOIT mailen — dat moet alleen een pushmelding zijn
    if (data.notifType === "tag") return;
    const db = admin.firestore();
    const transport = buildTransport(GMAIL_USER.value(), GMAIL_APP_PASSWORD.value());
    const tpl = TEMPLATES[data.notifType] || TEMPLATES.general;
    const { subject, html } = tpl(data.title, data.body || "");
    for (const uid of data.to) {
      if (uid === data.from) continue;
      const userSnap = await db.collection("users").doc(uid).get();
      const user = userSnap.data();
      if (!user || !user.email) continue;
      try {
        await transport.sendMail({
          from: `"MHVwork" <${GMAIL_USER.value()}>`,
          to: `"${user.name || ""}" <${user.email}>`,
          subject,
          html,
        });
      } catch (e) {
        console.error("Mail versturen mislukt voor", user.email, e);
      }
    }
  }
);
