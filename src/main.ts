import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import VueChartkick from 'vue-chartkick';
import 'chartkick/chart.js';

const app = createApp(App);
app.use(VueChartkick);
app.use(createPinia());
app.use(router);

app.mount('#app');
