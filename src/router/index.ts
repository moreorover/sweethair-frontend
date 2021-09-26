import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import About from '@/views/About.vue';
import Login from '@/views/Login.vue';
import Wrapper from '@/views/Wrapper.vue';
import Customers from '@/views/customers/Customers.vue';
import NewCustomer from '@/views/customers/NewCustomer.vue';
import Customer from '@/views/customers/Customer.vue';
import EditCustomer from '@/views/customers/EditCustomer.vue';
import Appointments from '@/views/appointments/Appointments.vue';
import NewAppointment from '@/views/appointments/NewAppointment.vue';
import Appointment from '@/views/appointments/Appointment.vue';
import EditAppointment from '@/views/appointments/EditAppointment.vue';
import { useLoggedInUserStore } from '@/store/loggedInUser

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
        // store.getAuth().logout();
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
        { path: '/customers/:id', name: 'Customer', component: Customer, meta: { requiresAuth: true } },
        { path: '/customers/:id/edit', name: 'Edit Customer', component: EditCustomer, meta: { requiresAuth: true } },
        { path: '/customers/new', name: 'New Customer', component: NewCustomer, meta: { requiresAuth: true } },
        { path: '/customers', name: 'Customers', component: Customers, meta: { requiresAuth: true } },

        { path: '/appointments/:id', name: 'Appointment', component: Appointment, meta: { requiresAuth: true } },
        {
          path: '/appointments/:id/edit',
          name: 'Edit Appointment',
          component: EditAppointment,
          meta: { requiresAuth: true },
        },
        {
          path: '/appointments/new',
          name: 'New Appointment',
          component: NewAppointment,
          meta: { requiresAuth: true },
        },
        { path: '/appointments', name: 'Appointments', component: Appointments, meta: { requiresAuth: true } },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  const store = useLoggedInUserStore();

  if (!to.meta.requiresAuth) {
    next();
    return;
  }

  if (to.meta.requiresAuth && store.isLoggedIn) {
    return next();
  } else {
    return next({
      path: '/login',
    });
  }

  // if (to.meta.requiresAuth && user) {
  //   next();
  // } else {
  //   next({
  //     path: '/login',
  //   });
  // }
});

export default router;
