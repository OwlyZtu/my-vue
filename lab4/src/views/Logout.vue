<script setup>
import { getAuth, signOut } from 'firebase/auth';
import { useRouter } from 'vue-router';

const router = useRouter();

const logout = async () => {
  try {
    await signOut(getAuth());
    router.push('/');
  } catch (error) {
    console.error('Logout failed:', error);
  }
};
</script>

<template>
  <button @click="logout">Logout</button>
</template>
