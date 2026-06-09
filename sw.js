// MHVwork Service Worker — Push Notifications
const CACHE = 'mhvwork-v1';

self.addEventListener('install', e => {
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(clients.claim());
});

// Push event — toont notificatie
self.addEventListener('push', e => {
  let data = { title: 'MHVwork', body: 'Je hebt een nieuw bericht.' };
  try { data = e.data.json(); } catch(err) {}
  e.waitUntil(
    self.registration.showNotification(data.title || 'MHVwork', {
      body: data.body || '',
      icon: '/MHVwork/icon.svg',
      badge: '/MHVwork/icon.svg',
      vibrate: [200, 100, 200],
      data: { url: data.url || '/MHVwork/app.html' },
      actions: [
        { action: 'open', title: 'Openen' },
        { action: 'close', title: 'Sluiten' }
      ]
    })
  );
});

// Klik op notificatie — open app
self.addEventListener('notificationclick', e => {
  e.notification.close();
  if (e.action === 'close') return;
  const url = (e.notification.data && e.notification.data.url) || '/MHVwork/app.html';
  e.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
      for (const c of list) {
        if (c.url.includes('MHVwork') && 'focus' in c) return c.focus();
      }
      return clients.openWindow(url);
    })
  );
});
