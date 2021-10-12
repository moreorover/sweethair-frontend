import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import VueChartkick from 'vue-chartkick';
import 'chartkick/chart.js';
import PrimeVue from 'primevue/config';

// import 'primeflex/primeflex.css';
// import 'primevue/resources/themes/saga-purple/theme.css';
// import 'primevue/resources/primevue.min.css';
// import 'primeicons/primeicons.css';

// import 'primevue/resources/primevue.min.css';
import 'primevue/resources/themes/saga-purple/theme.css';
import 'primeicons/primeicons.css';
// import 'primeflex/primeflex.css';

import Badge from 'primevue/badge';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';

const app = createApp(App);
app.use(PrimeVue, { ripple: true });
app.use(VueChartkick);
app.use(createPinia());
app.use(router);

app.component('Badge', Badge);
app.component('Button', Button);
app.component('InputText', InputText);

app.mount('#app');
