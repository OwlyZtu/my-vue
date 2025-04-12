import { createApp } from 'vue';
import App from './App.vue';
import i18n from './i18n/index';
import { createPinia } from 'pinia';
import router from './router/index';
import './assets/tailwind.css';

const app = createApp(App);
app.use(i18n).use(createPinia()).use(router).mount('#app');
