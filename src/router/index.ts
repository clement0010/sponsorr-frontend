import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';
import authGuard from './authGuard';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/:role/signup',
    name: 'SignUp',
    component: () => import(/* webpackChunkName: "signup" */ '@/views/SignUp.vue'),
  },
  {
    path: '/:role/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/Login.vue'),
  },
  {
    path: '/recover-account',
    name: 'RecoverAccount',
    component: () => import(/* webpackChunkName: "recoverAccount" */ '@/views/RecoverAccount.vue'),
  },
  {
    path: '/profile/:id',
    name: 'Profile',
    component: () => import(/* webpackChunkName: "profile" */ '@/views/Profile.vue'),
    beforeEnter: (to, from, next) => authGuard(to, from, next),
  },
  {
    path: '/playground',
    name: 'Playground',
    component: () => import(/* webpackChunkName: "playground" */ '@/views/Playground.vue'),
  },
  {
    path: '/makeshiftlogin',
    name: 'Makeshiftlogin',
    component: () => import(/* webpackChunkName: "about" */ '../views/Makeshiftlogin.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes,
});

export default router;
