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
import NotFound from './views/NotFound.vue';
import Customers from './views/Customers.vue';
import Customer from './views/customers/Customer.vue';

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
    component: Customers,
    meta: { requiresAuth: true },
  },
  {
    path: '/customers/:id',
    name: 'Customer',
    component: Customer,
    meta: { requiresAuth: true },
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

router.beforeEach((to, from, next) => {
  const store = useLoggedInUserStore();

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
