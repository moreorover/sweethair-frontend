import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import { useLoggedInUserStore } from '@/store/loggedInUser';

import Dashboard from './views/Dashboard.vue';
import Forms from './views/Forms.vue';
import Tables from './views/Tables.vue';
import UIElements from './views/UIElements.vue';
import Login from './views/Login.vue';
import Modal from './views/Modal.vue';
import Card from './views/Card.vue';
import Blank from './views/Blank.vue';

import ShowCustomers from './views/customers/ShowCustomers.vue';
import ShowCustomer from './views/customers/ShowCustomer.vue';
import ShowAppointments from './views/appointments/ShowAppointments.vue';
import ShowAppointment from './views/appointments/ShowAppointment.vue';
import Transactions from './views/transactions/Transactions.vue';
import Transaction from './views/transactions/Transaction.vue';

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
    component: Transactions,
    meta: { requiresAuth: true },
  },
  {
    path: '/transactions/:id',
    name: 'Transaction',
    component: Transaction,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

router.beforeEach(async (to, from, next) => {
  const store = useLoggedInUserStore();

  await store.me();

  if (!to.meta.requiresAuth) {
    next();
    return;
  }

  if (to.meta.requiresAuth && store.getIsLoggedIn) {
    return next();
  } else {
    return next({
      path: '/',
    });
  }
});

export default router;
