import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/main.css';
import { createPinia } from 'pinia';

import 'primevue/resources/primevue.min.css';
import 'primevue/resources/themes/saga-purple/theme.css';
import 'primeicons/primeicons.css';

import urql from '@urql/vue';

import DashboardLayout from './components/DashboardLayout.vue';
import EmptyLayout from './components/EmptyLayout.vue';

import BaseComponents from './components/base';
import PrimeVue from '@/components/primevue';

const app = createApp(App);

BaseComponents.register(app);
PrimeVue.register(app);

app.component('default-layout', DashboardLayout);
app.component('empty-layout', EmptyLayout);

app.use(router);
app.use(createPinia());

app.use(urql, {
  url: 'http://localhost:3000/graphql',
  suspense: true,
  fetchOptions: {
    credentials: 'include',
  },
});

app.mount('#app');
