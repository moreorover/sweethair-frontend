import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import About from '@/views/About.vue';
import Login from '@/views/Login.vue';
import Wrapper from '@/views/Wrapper.vue';
import Customers from '@/views/Customers.vue';
import NewCustomer from '@/views/NewCustomer.vue';
import EditC from '@/views/EditC.vue';
import { Store } from '@/store';

export function routerWithStore(store: Store) {
  const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes: [
      {
        path: '/login',
        name: 'Login',
        component: Login,
      },
      {
        path: '/logout',
        name: 'Logout',
        component: Login,
        beforeEnter: () => {
          store.getAuth().logout();
          return true;
        },
      },
      {
        path: '',
        name: 'Wrapper',
        component: Wrapper,
        meta: { requiresAuth: true },
        children: [
          { path: '', name: 'Home', component: Home, meta: { requiresAuth: true } },
          { path: '/about', name: 'About', component: About, meta: { requiresAuth: true } },
          { path: '/customers/:id/edit', name: 'Edit Customer', component: EditC, meta: { requiresAuth: true } },
          { path: '/customers/new', name: 'New Customer', component: NewCustomer, meta: { requiresAuth: true } },
          { path: '/customers', name: 'Customers', component: Customers, meta: { requiresAuth: true } },
        ],
      },
    ],
  });

  router.beforeEach(async (to, from, next) => {
    await store.getAuth().me();

    const user = store.getAuth().getState().user;

    if (!to.meta.requiresAuth) {
      next();
      return;
    }

    if (to.meta.requiresAuth && user) {
      next();
    } else {
      next({
        path: '/login',
      });
    }
  });
  return router;
}
