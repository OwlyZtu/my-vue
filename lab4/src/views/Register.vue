<script setup>
import { ref } from 'vue';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const email = ref('');
const password = ref('');
const message = ref('');

const register = async () => {
  const auth = getAuth();
  try {
    await createUserWithEmailAndPassword(auth, email.value, password.value);
    message.value = 'Registration successful!';
  } catch (error) {
    message.value = error.message;
  }
};
</script>

<template>
  <div>
    <h2>Register</h2>
    <form @submit.prevent="register">
      <input v-model="email" placeholder="Email" type="email" required />
      <input
        v-model="password"
        placeholder="Password"
        type="password"
        required
      />
      <button type="submit">Register</button>
    </form>
    <p>{{ message }}</p>
    <a href="/login">Log in if you have an account</a>
  </div>
</template>
