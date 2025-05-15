<template>
    <div class="hero">
      <div class="background-svg">
        <svg xmlns="http://www.w3.org/2000/svg"><defs><pattern id="a" width="120" height="90" patternTransform="rotate(110)scale(4)" patternUnits="userSpaceOnUse"><rect width="100%" height="100%" fill="#d8f3dc"/><path fill="none" stroke="#b8e5c8" d="M-50.129 12.685C-33.346 12.358-16.786 4.918 0 5c16.787.082 43.213 10 60 10s43.213-9.918 60-10 33.346 7.358 50.129 7.685"/><path fill="none" stroke="#95d5b2" d="M-50.129 32.685C-33.346 32.358-16.786 24.918 0 25c16.787.082 43.213 10 60 10s43.213-9.918 60-10 33.346 7.358 50.129 7.685"/><path fill="none" stroke="#75c79e" d="M-50.129 52.685C-33.346 52.358-16.786 44.918 0 45c16.787.082 43.213 10 60 10s43.213-9.918 60-10 33.346 7.358 50.129 7.685"/><path fill="none" stroke="#52b788" d="M-50.129 72.685C-33.346 72.358-16.786 64.918 0 65c16.787.082 43.213 10 60 10s43.213-9.918 60-10 33.346 7.358 50.129 7.685"/></pattern></defs><rect width="800%" height="800%" fill="url(#a)" transform="translate(-632 -432)"/></svg>      </div>
      <v-container>
        <v-row class="text-center d-flex align-center text-dark shadow-box">
          <v-col cols="4" class="text-center">
            <h1 class="">Соня та що Сонна</h1>
            <h2><i>"Let's spill the tea"</i></h2>
            <v-btn class="btn text-dark" @click="scrollToNext">
              <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" class="bi bi-chevron-double-down" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M1.646 6.646a.5.5 0 0 1 .708 0L8 12.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
                <path fill-rule="evenodd" d="M1.646 2.646a.5.5 0 0 1 .708 0L8 8.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
              </svg>
            </v-btn>
          </v-col>
          <v-col cols="8" class="d-flex justify-end">
            <img src="/photo_2025-05-15_14-29-16.jpg" class="hero-image">
          </v-col>
        </v-row>
      </v-container>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      scrollToNext() {
        window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
      },
    },
  };
  </script>
  
  <style scoped>
  .hero {
    min-height: 100vh;
    display: flex;
    align-items: center;
    position: relative;
  }
  
  .background-svg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    overflow: hidden;
  }
  
  .background-svg svg {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .hero-image {
    max-width: 80vh;
    height: auto;
  }
  

  .btn {
    width: 80px;
    height: 500px;
    background-color: transparent;
    border-width: 0;
    box-shadow: none;
  }
  </style>
  