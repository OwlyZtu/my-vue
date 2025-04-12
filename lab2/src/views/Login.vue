<script setup>
import LoginForm from '../components/LoginForm.vue';
import { useAuthStore } from '../stores/auth';

const authStore = useAuthStore();
</script>

<template>
  <div class="w-full h-full flex justify-center items-center p-5">
    <div v-if="!authStore.user">
      <LoginForm />
    </div>
    <div v-if="authStore.user">
      <p>{{ $t('user.authenticated') }}</p>
    </div>
  </div>
</template>
