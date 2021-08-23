import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "@/views/Home.vue";
import About from "@/views/About.vue";
import Login from "@/views/Login.vue";
import Wrapper from "@/views/Wrapper.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "",
    name: "Wrapper",
    component: Wrapper,
    children: [
      { path: "", name: "Home", component: Home, meta: { requiresAuth: true } },
      { path: "/about", name: "About", component: About, meta: { requiresAuth: true } },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    // if (!auth.loggedIn()) {
    //   next({
    //     path: '/login',
    //     query: { redirect: to.fullPath }
    //   })
    // } else {
    //   next()
    // }
    console.log("route requires auth");
    next();
  } else {
    next(); // make sure to always call next()!
  }
});

export default router;
