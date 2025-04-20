<script setup>
import { ref } from 'vue';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';

const email = ref('');
const password = ref('');
const message = ref('');
const isAuthenticated = ref(false);

const auth = getAuth();

const login = async () => {
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value);
    message.value = 'Login successful!';
    isAuthenticated.value = true;
  } catch (error) {
    message.value = error.message;
  }
};

onAuthStateChanged(auth, (user) => {
  isAuthenticated.value = !!user;
});
</script>

<template>
  <div style="display: flex; flex-direction: column;">
    <h2>Login</h2>
    <form @submit.prevent="login" style="display: flex;">
      <input v-model="email" placeholder="Email" type="email" required />
      <input v-model="password" placeholder="Password" type="password" required />
      <button type="submit">Login</button>
    </form>

    <p>{{ message }}</p>

    <a href="/register">If you don't have an account, Register</a>

    <a v-if="isAuthenticated" href="/items">Manage your items</a>
  </div>
</template>
