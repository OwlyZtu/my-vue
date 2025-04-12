import { defineStore } from 'pinia';

export const useLanguageStore = defineStore('language', {
  state: () => ({
    locale: 'ua',
  }),
  actions: {
    setLanguage(lang) {
      this.locale = lang;
    },
  },
});
