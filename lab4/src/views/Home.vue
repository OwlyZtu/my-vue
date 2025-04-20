<script setup>
import { ref } from 'vue';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import Login from '../views/Login.vue';
import Items from './Items.vue';

const auth = getAuth();
const isAuthenticated = ref(false);

onAuthStateChanged(auth, (user) => {
  isAuthenticated.value = !!user;
});
</script>

<template>
  <Login v-if="!isAuthenticated" />
  <a v-else href="/items">You are already logged in. Manage your items</a>
</template>
