import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import VueChartkick from 'vue-chartkick';
import 'chartkick/chart.js';
import PrimeVue from 'primevue/config';

import 'primeflex/primeflex.css';
// import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/themes/md-light-deeppurple/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

import Button from 'primevue/button';

const app = createApp(App);
app.use(PrimeVue, { ripple: true });
app.use(VueChartkick);
app.use(createPinia());
app.use(router);

app.component('Button', Button);

app.mount('#app');
