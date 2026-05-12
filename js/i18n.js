'use strict';

async function initI18n() {
  await i18next
    .use(i18nextHttpBackend)
    .use(i18nextBrowserLanguageDetector)
    .init({
      fallbackLng: 'de',
      supportedLngs: ['de', 'en'],
      backend: { loadPath: 'locales/{{lng}}.json' },
      detection: { order: ['localStorage', 'navigator'], caches: ['localStorage'] },
    });
  applyTranslations();
}

function applyTranslations() {
  const lang = i18next.resolvedLanguage || i18next.language.substring(0, 2);

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const raw = el.dataset.i18n;
    if (raw.startsWith('[')) {
      // Attribute form: [attr]key — supports multiple via semicolon
      raw.split(';').forEach((part) => {
        const m = part.match(/^\[(\w[\w-]*)\](.+)$/);
        if (m) el.setAttribute(m[1], i18next.t(m[2]));
      });
    } else {
      el.textContent = i18next.t(raw);
    }
  });

  document.documentElement.lang = lang;

  document.querySelectorAll('.lang-switch').forEach((btn) => {
    btn.classList.toggle('lang-switch--active', btn.dataset.lang === lang);
  });
}

document.querySelectorAll('.lang-switch').forEach((btn) => {
  btn.addEventListener('click', () => {
    i18next.changeLanguage(btn.dataset.lang).then(applyTranslations);
  });
});

initI18n();
