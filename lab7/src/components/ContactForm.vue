<template>
    <v-container class="block shadow-box contact">
      <h2 class="text-center mb-6">Зв'яжіться зі мною</h2>
      <v-form ref="form" v-model="valid" @submit.prevent="submitForm">
        <v-row>
          <v-col cols="12" md="5" class="field">
            <v-text-field
              v-model="formData.name"
              :rules="nameRules"
              label="Ім'я"
              required
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="5"  class="field">
            <v-text-field
              v-model="formData.email"
              :rules="emailRules"
              label="Email"
              required
              outlined
              type="email"
            ></v-text-field>
          </v-col>
          <v-col cols="12" class="field">
            <v-text-field
              v-model="formData.subject"
              :rules="subjectRules"
              label="Тема"
              required
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12" class="field">
            <v-textarea
              v-model="formData.message"
              :rules="messageRules"
              label="Повідомлення"
              required
              outlined
              rows="4"
            ></v-textarea>
          </v-col>
          <v-col cols="12" class="text-center field">
            <v-btn
              type="submit"
              color="primary"
              :disabled="!valid"
              x-large
            >
              Надіслати
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
      
      <v-snackbar
        v-model="snackbar"
        :color="snackbarColor"
        timeout="3000"
      >
        {{ snackbarText }}
      </v-snackbar>
    </v-container>
  </template>
  
  <script>
  export default {
    name: 'ContactForm',
    data: () => ({
      valid: false,
      formData: {
        name: '',
        email: '',
        subject: '',
        message: ''
      },
      nameRules: [
        v => !!v || "Ім'я обов'язкове",
        v => v.length >= 2 || "Ім'я має містити мінімум 2 символи"
      ],
      emailRules: [
        v => !!v || "Email обов'язковий",
        v => /.+@.+\..+/.test(v) || "Email має бути валідним"
      ],
      subjectRules: [
        v => !!v || "Тема обов'язкова",
        v => v.length >= 3 || "Тема має містити мінімум 3 символи"
      ],
      messageRules: [
        v => !!v || "Повідомлення обов'язкове",
        v => v.length >= 10 || "Повідомлення має містити мінімум 10 символів"
      ],
      snackbar: false,
      snackbarText: '',
      snackbarColor: 'success'
    }),
    methods: {
      async submitForm() {
        if (this.$refs.form.validate()) {
          try {
            console.log('Форма відправлена:', this.formData);
            
            this.snackbarText = 'Повідомлення успішно надіслано!';
            this.snackbarColor = 'success';
            this.snackbar = true;
            
            this.$refs.form.reset();
            Object.keys(this.formData).forEach(key => {
              this.formData[key] = '';
            });
          } catch (error) {
            this.snackbarText = 'Помилка при відправці повідомлення';
            this.snackbarColor = 'error';
            this.snackbar = true;
          }
        }
      }
    }
  };
  </script>
  
  <style scoped>
    .block {
    padding: 4rem 0;
  }
  .field {
    padding-right: 4rem;
    padding-left: 4rem;
  }
  </style>