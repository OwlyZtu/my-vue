<template>
    <v-container class="block text-dark">
      <h2>Мої проекти</h2>
      <v-row>
        <v-col
          v-for="project in projects"
          :key="project.title"
          cols="12"
          md="6"
        >
          <v-card class="shadow-box">
            <v-img :src="project.image" height="500px" />
            <v-card-title>{{ project.title }}</v-card-title>
            <v-card-text>{{ project.description }}</v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        projects: [
          {
            title: 'Прокрастинація',
            image: '/procrastination.png',
            description: '23 серпня 2023р.',
          },
          {
            title: 'Голос',
            image: '/вскритись.png',
            description: '27 листопада 2022р.',
          },
          {
            title: 'Втома',
            image: '/втома2.png',
            description: '10 січня 2024р.',
          },
          {
            title: 'Сон',
            image: '/мертвий воїн.png',
            description: '23 березня 2024р.',
          },
          {
            title: 'В профіль',
            image: '/профіль.png',
            description: '23 вересня 2022р.',
          },
        ],
      };
    },
  };
  </script>
  