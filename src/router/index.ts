import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '@/views/Home.vue';
import About from '@/views/About.vue';
import Login from '@/views/Login.vue';
import Wrapper from '@/views/Wrapper.vue';
import Customers from '@/views/Customers.vue';
import NewCustomer from '@/views/NewCustomer.vue';
import EditC from '@/views/EditC.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
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
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    // await apiClient.get('/auth/me').then((response) => {
    //   if (response.status < 400) {
    //     next();
    //   }
    // });
    // me()
    //   .then((res) => {
    //     console.log('response', res);
    //     return next();
    //   })
    //   .catch((err) => {
    //     console.log('response', err);
    //     return next('/login');
    //   });
    return next();
  }
  return next();
});

export default router;
