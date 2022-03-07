import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import Dashboard from './views/Dashboard.vue';
import Forms from './views/Forms.vue';
import Tables from './views/Tables.vue';
import UIElements from './views/UIElements.vue';
import Login from './views/Login.vue';
import Modal from './views/Modal.vue';
import Card from './views/Card.vue';
import Blank from './views/Blank.vue';

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
    component: () => import('./views/customers/ShowCustomers.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/customers/:id',
    name: 'Customer',
    component: () => import('./views/customers/ShowCustomer.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/appointments',
    name: 'Appointments',
    component: () => import('./views/appointments/ShowAppointments.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/appointments/:id',
    name: 'Appointment',
    component: () => import('./views/appointments/ShowAppointment.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/invoices',
    name: 'Invoices',
    component: () => import('./views/invoices/ShowInvoices.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/invoices/:id',
    name: 'Invoice',
    component: () => import('./views/invoices/ShowInvoice.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/purchases/new',
    name: 'New Purchase',
    component: () => import('./views/purchases/NewPurchase.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/purchases/:id/edit',
    name: 'Edit Purchase',
    component: () => import('./views/purchases/ShowEditPurchase.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/purchases',
    name: 'Purchases',
    component: () => import('./views/purchases/ShowPurchases.vue'),
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
