<script setup>
import { useLanguageStore } from '../stores/languages.js';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
const languageStore = useLanguageStore();
const { locale } = useI18n();

const switchLanguage = (language) => {
  locale.value = language;
  languageStore.setLanguage(language);
};

computed(() => languageStore.locale);
</script>

<template>
  <div class="flex gap-1">
    <button @click="switchLanguage('en')" :class="{ underline: locale === 'en' }">EN</button> |
    <button @click="switchLanguage('ua')" :class="{ underline: locale === 'ua' }">UA</button>
  </div>
</template>
