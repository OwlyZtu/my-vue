<template>
    <v-container class="block text-dark">
      <h2>Освіта</h2>
      <v-timeline>
        <v-timeline-item
          v-for="education in educationList"
          :key="education.title"
          :title="education.title"
          :subtitle="education.period"
        >
          <v-timeline-content>
            <v-card class="px-4 shadow-box">
              <v-card-title>
                <h3>{{ education.title }}</h3>
              </v-card-title>
              <v-card-text>
                <p>
                  {{ education.description }}
                </p>
                <p>
                  <i>
                    {{ education.period }}
                  </i>
                </p>
              </v-card-text>
            </v-card>
          </v-timeline-content>
        </v-timeline-item>
      </v-timeline>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        educationList: [
          {
            title: 'Хмельницький ліцей-інтернат',
            period: '2019-2021',
            description: 'Повна середня освіта',
          },
          {
            title: 'Житомирська політехніка',
            period: '2021-2025',
            description: 'Бакалавр',
          },
          {
            title: 'Хмельницький обласний психоневрологічний диспансер',
            period: '2023-...',
            description: 'Довели бляха',
          },
        ],
      };
    },
  };
  </script>
  