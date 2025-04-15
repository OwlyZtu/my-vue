import { createApp } from 'vue';
import App from './App.vue';
import './assets/tailwind.css';
import { toDoManager } from './composables/TodoState';

const app = createApp(App);
app.provide('taskManager', toDoManager());
app.mount('#app');
