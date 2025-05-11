<template>
  <div class="container mx-auto max-w-2xl px-4 text-center">
    <div class="flex justify-end mt-4 mb-2">
      <button @click="switchLanguage"
        class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
        {{ currentLanguage === 'en' ? 'UA' : 'EN' }}
      </button>
    </div>

    <h1 class="text-3xl font-bold mb-8 mt-6">{{ $t('title') }}</h1>
    <div v-if="showUserForm">
      <UserForm @submit="handleUserFormSubmit" />
    </div>
    <div v-else>
      <QuestionForm />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import UserForm from './components/UserForm.vue';
import QuestionForm from './components/TestForm.vue';

const { locale } = useI18n();
const currentLanguage = ref(locale.value);

const showUserForm = ref(true);

const switchLanguage = () => {
  locale.value = locale.value === 'en' ? 'uk' : 'en';
  currentLanguage.value = locale.value;
};

const handleUserFormSubmit = () => {
  showUserForm.value = false;
};
</script>
