<script setup>
import Navbar from '../components/Navbar.vue';
import Footer from '../components/Footer.vue';
</script>

<template>
  <div class="flex flex-col w-full min-h-screen">
    <Navbar />
    <div class="h-max mt-9 p-1">
      <router-view />
    </div>
    <Footer />
  </div>
</template>
