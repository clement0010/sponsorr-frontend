import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/signup',
    name: 'Sign Up',
    component: () => import(
      /* webpackChunkName: "signup" */ '@/views/SignUp.vue'
    ),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(
      /* webpackChunkName: "signup" */ '@/views/Login.vue'
    ),
  },
];

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes,
});

export default router;
