import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import VueChartkick from 'vue-chartkick';
import 'chartkick/chart.js';
import PrimeVue from 'primevue/config';

import 'primevue/resources/primevue.min.css';
import 'primevue/resources/themes/saga-purple/theme.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

import StyleClass from 'primevue/styleclass';

import Badge from 'primevue/badge';
import Button from 'primevue/button';
import Card from 'primevue/card';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';
import DataTable from 'primevue/datatable';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';

const app = createApp(App);
app.use(PrimeVue, { ripple: true });
app.use(VueChartkick);
app.use(createPinia());
app.use(router);

app.directive('styleclass', StyleClass);

app.component('Badge', Badge);
app.component('Button', Button);
app.component('Card', Card);
app.component('Column', Column);
app.component('ColumnGroup', ColumnGroup);
app.component('DataTable', DataTable);
app.component('Dialog', Dialog);
app.component('InputText', InputText);

app.mount('#app');
