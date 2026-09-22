/*
 * MHVwork — eigen icoonset (geen externe library, geen emoji).
 * Lijnstijl-iconen, zelfde stijl als het bestaande WAVE_ICON in app.html:
 * 24x24 viewBox, stroke=currentColor, ronde lijnen. Schaalt mee met font-size (1em).
 * Gebruik: <span class="ic" data-icon="calendar"></span> — wordt automatisch gevuld.
 * Of in JS direct: ICON.calendar (geeft de volledige <svg>-string terug).
 */
(function(){
  var ICON = {
    'calendar': '<svg class="ic-svg" viewBox="0 0 24 24"><rect x="3" y="4.5" width="18" height="16" rx="2.5"/><path d="M3 9.5h18M8 2.5v4M16 2.5v4"/></svg>',
    'edit': '<svg class="ic-svg" viewBox="0 0 24 24"><path d="M4 20l.9-4.2L15.6 5.1a1.6 1.6 0 0 1 2.3 0l1 1a1.6 1.6 0 0 1 0 2.3L8.2 19.1 4 20z"/><path d="M14 6.7l3.3 3.3"/></svg>',
    'check-circle': '<svg class="ic-svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M8 12.3l2.6 2.6L16.2 9"/></svg>',
    'check': '<svg class="ic-svg" viewBox="0 0 24 24"><path d="M4.5 12.5l5 5 10-11"/></svg>',
    'megaphone': '<svg class="ic-svg" viewBox="0 0 24 24"><path d="M3 10.5v3a1.5 1.5 0 0 0 1.5 1.5H6l1.3 4.4a1 1 0 0 0 1.9-.3L9 15h1l8 4V5l-8 4H4.5A1.5 1.5 0 0 0 3 10.5z"/><path d="M18 9.3a4 4 0 0 1 0 5.4"/></svg>',
    'chat': '<svg class="ic-svg" viewBox="0 0 24 24"><path d="M4 5.5h16a1 1 0 0 1 1 1V16a1 1 0 0 1-1 1H9l-4.4 3.3a.6.6 0 0 1-1-.5V17H4a1 1 0 0 1-1-1V6.5a1 1 0 0 1 1-1z"/></svg>',
    'lock': '<svg class="ic-svg" viewBox="0 0 24 24"><rect x="4.5" y="10.5" width="15" height="10" rx="2"/><path d="M7.5 10.5V7a4.5 4.5 0 0 1 9 0v3.5"/><circle cx="12" cy="15.3" r="1.4"/></svg>',
    'tools': '<svg class="ic-svg" viewBox="0 0 24 24"><path d="M14.7 6.3a4 4 0 0 0-5.4 5.3L3 18l3 3 6.4-6.3a4 4 0 0 0 5.3-5.4l-3 3-2.6-.4-.4-2.6z"/></svg>',
    'forbidden': '<svg class="ic-svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M6 6l12 12"/></svg>',
    'euro': '<svg class="ic-svg" viewBox="0 0 24 24"><path d="M18 6.5a7.5 7.5 0 1 0 0 11"/><path d="M4.5 10h9M4.5 14h8"/></svg>',
    'bell': '<svg class="ic-svg" viewBox="0 0 24 24"><path d="M6 10.5a6 6 0 0 1 12 0c0 4 1.5 5.5 1.5 5.5h-15S6 14.5 6 10.5z"/><path d="M10 19a2 2 0 0 0 4 0"/></svg>',
    'bell-off': '<svg class="ic-svg" viewBox="0 0 24 24"><path d="M4 4l16 16"/><path d="M7.4 7.4A6 6 0 0 0 6 10.5c0 4-1.5 5.5-1.5 5.5H15"/><path d="M9.3 5.1A6 6 0 0 1 18 10.5c0 2.6.6 4 1 4.8"/><path d="M10 19a2 2 0 0 0 4 0"/></svg>',
    'note': '<svg class="ic-svg" viewBox="0 0 24 24"><rect x="4" y="3.5" width="16" height="17" rx="2"/><path d="M8 8.5h8M8 12.5h8M8 16.5h5"/></svg>',
    'trash': '<svg class="ic-svg" viewBox="0 0 24 24"><path d="M5 7h14"/><path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/><path d="M6.5 7l1 12.2A2 2 0 0 0 9.5 21h5a2 2 0 0 0 2-1.8L17.5 7"/><path d="M10 11v6M14 11v6"/></svg>',
    'crown': '<svg class="ic-svg" viewBox="0 0 24 24"><path d="M4 8l3.5 3L12 5l4.5 6L20 8l-1.6 9.5a1 1 0 0 1-1 .8H6.6a1 1 0 0 1-1-.8L4 8z"/><path d="M6.5 20.5h11"/></svg>',
    'mail': '<svg class="ic-svg" viewBox="0 0 24 24"><rect x="3" y="5.5" width="18" height="13" rx="2"/><path d="M3.5 6.5L12 13l8.5-6.5"/></svg>',
    'galaxy': '<svg class="ic-svg" viewBox="0 0 24 24"><path d="M12 3l1.9 6.1L20 11l-6.1 1.9L12 19l-1.9-6.1L4 11l6.1-1.9z" stroke-linejoin="round"/></svg>',
    'pin': '<svg class="ic-svg" viewBox="0 0 24 24"><path d="M12 21s6-5.4 6-10.5a6 6 0 0 0-12 0C6 15.6 12 21 12 21z"/><circle cx="12" cy="10.5" r="2.2"/></svg>',
    'party': '<svg class="ic-svg" viewBox="0 0 24 24"><path d="M5 19.5l2.7-7.8L16 15z" stroke-linejoin="round"/><circle cx="16.5" cy="5" r="1.1" fill="currentColor" stroke="none"/><circle cx="20" cy="9" r="1.1" fill="currentColor" stroke="none"/><circle cx="12.5" cy="4" r="1.1" fill="currentColor" stroke="none"/><path d="M19.5 13.5l1.8 1.8" stroke-linecap="round"/></svg>',
    'mobile-down': '<svg class="ic-svg" viewBox="0 0 24 24"><rect x="7" y="2.5" width="10" height="16.5" rx="2"/><path d="M12 19v2.5M9.5 20.3l2.5 1.7 2.5-1.7"/></svg>',
    'siren': '<svg class="ic-svg" viewBox="0 0 24 24"><path d="M4 21l1.2-7a6.8 6.8 0 0 1 13.6 0l1.2 7z"/><path d="M12 3.5v2.3M6.5 6l1.4 1.6M17.5 6l-1.4 1.6" stroke-linecap="round"/><path d="M2.5 21h19"/></svg>',
    'clipboard': '<svg class="ic-svg" viewBox="0 0 24 24"><rect x="5" y="4.5" width="14" height="16.5" rx="2"/><rect x="9" y="2.5" width="6" height="3.5" rx="1"/><path d="M8.5 11h7M8.5 15h7"/></svg>',
    'user': '<svg class="ic-svg" viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.6"/><path d="M4.5 20.5a7.5 7.5 0 0 1 15 0"/></svg>',
    'users': '<svg class="ic-svg" viewBox="0 0 24 24"><circle cx="9" cy="8.3" r="3.3"/><path d="M2.8 20a6.4 6.4 0 0 1 12.4 0"/><path d="M15.5 5.3a3.3 3.3 0 0 1 0 6.4"/><path d="M16.8 14.2a6.4 6.4 0 0 1 4.4 5.8"/></svg>',
    'camera': '<svg class="ic-svg" viewBox="0 0 24 24"><path d="M4 8.5A1.5 1.5 0 0 1 5.5 7h2.3l1-1.8A1 1 0 0 1 9.7 4.7h4.6a1 1 0 0 1 .9.5l1 1.8h2.3A1.5 1.5 0 0 1 20 8.5V18a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18z"/><circle cx="12" cy="12.7" r="3.6"/></svg>',
    'paperclip': '<svg class="ic-svg" viewBox="0 0 24 24"><path d="M17 8.5l-7.8 7.8a3 3 0 0 1-4.2-4.2L13.4 3.7a2 2 0 0 1 2.8 2.8L8.3 14.4a1 1 0 0 1-1.4-1.4l6.7-6.7"/></svg>',
    'chart': '<svg class="ic-svg" viewBox="0 0 24 24"><path d="M4 20V10M10.5 20V4M17 20v-7"/><path d="M3 20.5h18"/></svg>',
    'warning': '<svg class="ic-svg" viewBox="0 0 24 24"><path d="M12 3.8l9.2 16a1 1 0 0 1-.9 1.5H3.7a1 1 0 0 1-.9-1.5z"/><path d="M12 9.7v4.3"/><circle cx="12" cy="17" r=".2" fill="currentColor" stroke-width="2.4"/></svg>',
    'eye': '<svg class="ic-svg" viewBox="0 0 24 24"><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3.2"/></svg>',
    'eye-off': '<svg class="ic-svg" viewBox="0 0 24 24"><path d="M3 3l18 18"/><path d="M10.6 5.7A10.6 10.6 0 0 1 12 5.5c6 0 9.5 6.5 9.5 6.5a15.6 15.6 0 0 1-3.2 3.9M7 6.9C4.2 8.7 2.5 12 2.5 12S6 18.5 12 18.5a9.6 9.6 0 0 0 3.1-.5"/><path d="M9.6 10.2a3.2 3.2 0 0 0 4.3 4.3"/></svg>',
    'key': '<svg class="ic-svg" viewBox="0 0 24 24"><circle cx="8" cy="15.5" r="4"/><path d="M11 12.5L18.5 5M16.5 7l2 2M14 9.5l1.6 1.6"/></svg>',
    'bubbles': '<svg class="ic-svg" viewBox="0 0 24 24"><circle cx="9" cy="9.5" r="5.3"/><circle cx="15.5" cy="15" r="5.3"/></svg>',
    'dot': '<svg class="ic-svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="6" fill="currentColor" stroke="none"/></svg>',
    'tree': '<svg class="ic-svg" viewBox="0 0 24 24"><path d="M12 3l4 6h-2.5l3.7 5.5H14L17 19H7l3-4.5H7.3L11 9H8.5z"/><path d="M12 19v2.5"/></svg>',
    'egg': '<svg class="ic-svg" viewBox="0 0 24 24"><path d="M12 21.5c4 0 6.5-3.4 6.5-8 0-5-3-11-6.5-11s-6.5 6-6.5 11c0 4.6 2.5 8 6.5 8z"/><path d="M6.6 12.3c2 .7 3.7.7 5.4 0s3.4-.7 5.4 0" stroke-width="1.4"/></svg>',
    'exclaim': '<svg class="ic-svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v6"/><circle cx="12" cy="16.5" r=".2" fill="currentColor" stroke-width="2.4"/></svg>',
    'beer': '<svg class="ic-svg" viewBox="0 0 24 24"><path d="M6 9.5h9v9.5a1.5 1.5 0 0 1-1.5 1.5H7.5A1.5 1.5 0 0 1 6 19z"/><path d="M15 11h1.5a2.5 2.5 0 0 1 0 5H15"/><path d="M6 9.5c0-3.5 1.3-6 4.5-6 1.1 0 1.5.8 2.4.8.9 0 1.1-.8 2-.4 1 .4 1 1.7.2 2.2" stroke-width="1.4"/></svg>',
    'home': '<svg class="ic-svg" viewBox="0 0 24 24"><path d="M4 11.5L12 4l8 7.5"/><path d="M6 10v9.5a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V10"/><path d="M10 20.5V15h4v5.5"/></svg>',
    'compass': '<svg class="ic-svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/></svg>',
    'tv': '<svg class="ic-svg" viewBox="0 0 24 24"><rect x="3" y="5.5" width="18" height="12.5" rx="2"/><path d="M8.5 21h7"/></svg>',
    'x-circle': '<svg class="ic-svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M9 9l6 6M15 9l-6 6"/></svg>',
    'mobile': '<svg class="ic-svg" viewBox="0 0 24 24"><rect x="7" y="2.5" width="10" height="19" rx="2"/><path d="M11 19h2"/></svg>',
    'fireworks': '<svg class="ic-svg" viewBox="0 0 24 24"><path d="M12 3v4M4.5 7l3 2.5M19.5 7l-3 2.5M4 15l3.5-1.5M20 15l-3.5-1.5M8 21l1.5-4M16 21l-1.5-4" stroke-linecap="round"/><circle cx="12" cy="13" r="2.6"/></svg>',
    'heart': '<svg class="ic-svg" viewBox="0 0 24 24"><path d="M12 20.5S3.5 15.4 3.5 9.4A4.9 4.9 0 0 1 12 6a4.9 4.9 0 0 1 8.5 3.4c0 6-8.5 11.1-8.5 11.1z"/></svg>',
    'pumpkin': '<svg class="ic-svg" viewBox="0 0 24 24"><path d="M12 4.5V2.2M12 4.5c1.7-1.4 3-1 3-1" stroke-linecap="round"/><ellipse cx="12" cy="14" rx="8" ry="7"/><path d="M12 7v14M8 8.3c-1.4 1.7-1.4 12-.3 13.5M16 8.3c1.4 1.7 1.4 12 .3 13.5" stroke-width="1.4"/></svg>',
    'ghost': '<svg class="ic-svg" viewBox="0 0 24 24"><path d="M5 20V11a7 7 0 0 1 14 0v9l-2.3-2-2.2 2-2.5-2-2.5 2-2.2-2z"/><circle cx="9.5" cy="11.5" r=".2" fill="currentColor" stroke-width="2.6"/><circle cx="14.5" cy="11.5" r=".2" fill="currentColor" stroke-width="2.6"/></svg>',
    'hockey': '<svg class="ic-svg" viewBox="0 0 24 24"><path d="M14.5 3.5L6.5 18.7a2 2 0 0 0 3.6 1.8L18 5.3"/><circle cx="18.5" cy="19" r="2.1"/></svg>',
    'inbox': '<svg class="ic-svg" viewBox="0 0 24 24"><path d="M4 12.5h4.2l1.3 2.5h5l1.3-2.5H20"/><path d="M6 5.5h12l1.5 7v6a1.5 1.5 0 0 1-1.5 1.5H6A1.5 1.5 0 0 1 4.5 18.5v-6z"/></svg>',
    'contrast': '<svg class="ic-svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor" stroke="none"/></svg>',
    'settings': '<svg class="ic-svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M12 3.5v2.3M12 18.2v2.3M20.5 12h-2.3M5.8 12H3.5M17.8 6.2l-1.6 1.6M7.8 16.2l-1.6 1.6M17.8 17.8l-1.6-1.6M7.8 7.8L6.2 6.2"/></svg>',
    'sun': '<svg class="ic-svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4.2"/><path d="M12 3.5v2M12 18.5v2M20.5 12h-2M5.5 12h-2M17.7 6.3l-1.4 1.4M7.7 16.3l-1.4 1.4M17.7 17.7l-1.4-1.4M7.7 7.7L6.3 6.3"/></svg>',
    'moon': '<svg class="ic-svg" viewBox="0 0 24 24"><path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5z"/></svg>',
    'island': '<svg class="ic-svg" viewBox="0 0 24 24"><rect x="4" y="7" width="16" height="8" rx="4"/><ellipse cx="12" cy="19" rx="6.5" ry="1.4" opacity=".4" stroke-width="1.4"/></svg>',
    'bar': '<svg class="ic-svg" viewBox="0 0 24 24"><rect x="3" y="10" width="18" height="4.5" rx="1.2"/></svg>',
    'pause': '<svg class="ic-svg" viewBox="0 0 24 24"><rect x="6.5" y="5" width="4" height="14" rx="1"/><rect x="13.5" y="5" width="4" height="14" rx="1"/></svg>',
    'clock': '<svg class="ic-svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/></svg>',
    'hourglass': '<svg class="ic-svg" viewBox="0 0 24 24"><path d="M6 3.5h12M6 20.5h12"/><path d="M7 3.5v3.3a5 5 0 0 0 2.2 4.2l1.3.9-1.3.9A5 5 0 0 0 7 17V20.5"/><path d="M17 3.5v3.3a5 5 0 0 1-2.2 4.2l-1.3.9 1.3.9a5 5 0 0 1 2.2 4.2V20.5"/></svg>',
    'bulb': '<svg class="ic-svg" viewBox="0 0 24 24"><path d="M9 18.5h6"/><path d="M9.3 21h5.4"/><path d="M7 10.5A5 5 0 1 1 15.8 14c-.7.8-1.3 1.6-1.3 2.7H9.5c0-1.1-.6-1.9-1.3-2.7A5 5 0 0 1 7 10.5z"/><path d="M12 3v1.5"/></svg>',
    'thumbsup': '<svg class="ic-svg" viewBox="0 0 24 24"><path d="M7 11v9H4v-9zM7 11l3.5-7a1.8 1.8 0 0 1 3.3 1.4L12.5 9H18a2 2 0 0 1 1.9 2.7l-2.2 6.3A2 2 0 0 1 15.8 19.5H7v-8.5z" stroke-linejoin="round"/></svg>',
    'more': '<svg class="ic-svg" viewBox="0 0 24 24"><circle cx="5" cy="12" r="1.6" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none"/><circle cx="19" cy="12" r="1.6" fill="currentColor" stroke="none"/></svg>',
    'swap': '<svg class="ic-svg" viewBox="0 0 24 24"><path d="M4 8h12.5l-3-3M20 16H7.5l3 3" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  };
  window.ICON = ICON;

  var STYLE = '.ic-svg{width:1em;height:1em;vertical-align:-0.15em;display:inline-block;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}.ic{display:inline-flex;align-items:center}'; 
  var styleEl = document.createElement('style');
  styleEl.textContent = STYLE;
  document.head.appendChild(styleEl);

  function renderIcons(root){
    (root||document).querySelectorAll('[data-icon]:not([data-icon-done])').forEach(function(el){
      var key = el.getAttribute('data-icon');
      if(ICON[key]){
        el.innerHTML = ICON[key];
        el.setAttribute('data-icon-done','');
        el.classList.add('ic');
      }
    });
  }
  window.renderIcons = renderIcons;

  function start(){
    renderIcons();
    var mo = new MutationObserver(function(){ renderIcons(); });
    mo.observe(document.body, {childList:true, subtree:true});
  }
  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded', start);
  } else { start(); }
})();