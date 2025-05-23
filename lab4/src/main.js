import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import './services/firebaseConfig';
import router from './router/index';

const app = createApp(App);
app.use(router).mount('#app');
