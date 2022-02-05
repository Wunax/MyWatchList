import { localize } from 'vee-validate/dist/vee-validate.full.esm';
import fr from 'vee-validate/dist/locale/fr.json';
import en from 'vee-validate/dist/locale/en.json';

export default function ({ app }) {
  let localStorageLang = localStorage.getItem('lang');
  if (!localStorageLang) {
    localStorage.setItem('lang', app.i18n.defaultLocale);
    localStorageLang = app.i18n.defaultLocale;
  }
  const availableLocales = app.i18n.locales.map((locale) => locale.code);
  if (!availableLocales.includes(localStorageLang)) {
    localStorage.setItem('lang', app.i18n.defaultLocale);
    localStorageLang = app.i18n.defaultLocale;
  }
  app.i18n.setLocale(localStorageLang);
  const localesVeeValidate = { 'fr-FR': fr, 'en-US': en };
  localize(localStorageLang, localesVeeValidate[localStorageLang]);
}
