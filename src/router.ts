import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import Dashboard from './views/Dashboard.vue';
import Forms from './views/Forms.vue';
import Tables from './views/Tables.vue';
import UIElements from './views/UIElements.vue';
import Login from './views/Login.vue';
import Modal from './views/Modal.vue';
import Card from './views/Card.vue';
import Blank from './views/Blank.vue';
import Graphql from './views/Graphql.vue';

import ShowCustomers from './views/customers/ShowCustomers.vue';
import ShowCustomer from './views/customers/ShowCustomer.vue';
import ShowAppointments from './views/appointments/ShowAppointments.vue';
import ShowAppointment from './views/appointments/ShowAppointment.vue';
import ShowTransactions from './views/transactions/ShowTransactions.vue';
import ShowTransaction from './views/transactions/ShowTransaction.vue';
import ShowInvoice from './views/invoices/ShowInvoice.vue';
import ShowInvoices from './views/invoices/ShowInvoices.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta: { layout: 'empty' },
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true },
  },
  {
    path: '/forms',
    name: 'Forms',
    component: Forms,
    meta: { requiresAuth: true },
  },
  {
    path: '/cards',
    name: 'Cards',
    component: Card,
    meta: { requiresAuth: true },
  },
  {
    path: '/tables',
    name: 'Tables',
    component: Tables,
    meta: { requiresAuth: true },
  },
  {
    path: '/ui-elements',
    name: 'UIElements',
    component: UIElements,
    meta: { requiresAuth: true },
  },
  {
    path: '/modal',
    name: 'Modal',
    component: Modal,
    meta: { requiresAuth: true },
  },
  {
    path: '/blank',
    name: 'Blank',
    component: Blank,
    meta: { requiresAuth: true },
  },
  {
    path: '/customers',
    name: 'Customers',
    component: ShowCustomers,
    meta: { requiresAuth: true },
  },
  {
    path: '/customers/:id',
    name: 'Customer',
    component: ShowCustomer,
    meta: { requiresAuth: true },
  },
  {
    path: '/appointments',
    name: 'Appointments',
    component: ShowAppointments,
    meta: { requiresAuth: true },
  },
  {
    path: '/appointments/:id',
    name: 'Appointment',
    component: ShowAppointment,
    meta: { requiresAuth: true },
  },
  {
    path: '/transactions',
    name: 'Transactions',
    component: ShowTransactions,
    meta: { requiresAuth: true },
  },
  {
    path: '/transactions/:id',
    name: 'Transaction',
    component: ShowTransaction,
    meta: { requiresAuth: true },
  },
  {
    path: '/invoices',
    name: 'Invoices',
    component: ShowInvoices,
    meta: { requiresAuth: true },
  },
  {
    path: '/invoices/:id',
    name: 'Invoice',
    component: ShowInvoice,
    meta: { requiresAuth: true },
  },
  {
    path: '/graphql',
    name: 'Graph QL',
    component: Graphql,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

router.beforeEach(async (to, from, next) => {
  next();
  // const store = useLoggedInUserStore();

  // await store.me();

  // if (!to.meta.requiresAuth) {
  //   next();
  //   return;
  // }

  // if (to.meta.requiresAuth && store.getIsLoggedIn) {
  //   return next();
  // } else {
  //   return next({
  //     path: '/',
  //   });
  // }
});

export default router;
