import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';
import './index.css';
import router from './router';

import DashboardLayout from './components/DashboardLayout.vue';
import EmptyLayout from './components/EmptyLayout.vue';

import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import 'primevue/resources/primevue.min.css';
import 'primevue/resources/themes/saga-purple/theme.css';
import PrimeVue from './utils/primevue';

const app = createApp(App);

app.component('default-layout', DashboardLayout);
app.component('empty-layout', EmptyLayout);

PrimeVue.register(app);
app.use(router);
app.use(createPinia());
app.mount('#app');
