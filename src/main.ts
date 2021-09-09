import { createApp } from 'vue';
import App from './App.vue';
import { store } from '@/store/index';
import { routerWithStore } from './router';

const app = createApp(App);
const router = routerWithStore(store);
app.use(router);
app.use(store);

app.mount('#app');
