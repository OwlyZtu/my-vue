import { createI18n } from 'vue-i18n';
import en from './en';
import ua from './ua';

const messages = { en, ua, };

const i18n = createI18n({
  legacy: false,
  locale: 'ua',
  fallbackLocale: 'en',
  globalInjection: true,
  messages,
});

export default i18n;
