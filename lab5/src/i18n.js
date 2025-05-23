import { createI18n } from "vue-i18n";
import en from "./locales/en.json";
import uk from "./locales/uk.json";

const messages = {
  en,
  uk,
};

const i18n = createI18n({
  locale: "uk",
  fallbackLocale: "en",
  messages,
});

export default i18n;