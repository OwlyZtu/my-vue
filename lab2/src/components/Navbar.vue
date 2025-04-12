<script setup>
import LanguageSwitcher from './LanguageSwitcher.vue';
import { useAuthStore } from '../stores/auth';

const authStore = useAuthStore();
</script>

<template>
  <nav class="w-full flex gap-5 fixed justify-between px-12 py-2 bg-lime-800 top-0 text-xl text-white">
    <div>
      <router-link to="/" class="hover:underline">{{ $t('navbar.home') }}</router-link>
    </div>
    <div class="flex flex-row gap-5">
      <router-link to="/cart" class="hover:underline relative"
        >{{ $t('navbar.cart') }}
        </router-link
      >
      <div v-if="authStore.user">
        <button @click="authStore.clearUser" class="hover:underline">{{ $t('navbar.exit') }}</button>
      </div>
      <div v-if="!authStore.user">
        <router-link to="/login" class="hover:underline">{{ $t('navbar.user') }}</router-link>
      </div>
      <LanguageSwitcher />
    </div>
  </nav>
</template>
