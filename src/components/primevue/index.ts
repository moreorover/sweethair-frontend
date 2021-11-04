import { App } from 'vue';
import PrimeVue from 'primevue/config';
import StyleClass from 'primevue/styleclass';

import Button from 'primevue/button';
import Dialog from 'primevue/dialog';

const register = (app: App<Element>): void => {
  app.use(PrimeVue, { ripple: true });
  app.directive('styleclass', StyleClass);
  app.component('Button', Button);
  app.component('Dialog', Dialog);
};

export default {
  register,
};
