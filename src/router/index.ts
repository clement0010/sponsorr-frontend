import { Role } from '@/types/enum';
import Home from '@/views/Home.vue';
import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
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
    meta: { requiresAuth: false },
    beforeEnter: authGuard,
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/Login.vue'),
    meta: { requiresAuth: false },
    beforeEnter: authGuard,
  },
  {
    path: '/profile/:id',
    name: 'Profile',
    component: () => import(/* webpackChunkName: "profile" */ '@/views/Profile.vue'),
    meta: { requiresAuth: true },
    beforeEnter: authGuard,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import(/* webpackChunkName: "dashboard" */ '@/views/Dashboard.vue'),
    // To be enabled
    meta: { requiresAuth: true, authorize: [Role.Organiser] },
    beforeEnter: authGuard,
  },
  {
    path: '/marketplace',
    name: 'Marketplace',
    component: () => import(/* webpackChunkName: "marketplace" */ '@/views/Marketplace.vue'),
    meta: { requiresAuth: true, authorize: [Role.Sponsor] },
    beforeEnter: authGuard,
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import(/* webpackChunkName: "settings" */ '@/views/Settings.vue'),
    meta: { requiresAuth: true, authorize: [Role.Sponsor] },
    beforeEnter: authGuard,
  },
  {
    path: '/new-event',
    name: 'NewEvent',
    component: () => import(/* webpackChunkName: "newEvent" */ '@/views/NewEvent.vue'),
    // To be enabled
    meta: { requiresAuth: true, authorize: [Role.Organiser] },
    beforeEnter: authGuard,
  },
  {
    path: '/matches',
    name: 'Matches',
    component: () => import(/* webpackChunkName: "matches" */ '@/views/Matches.vue'),
    meta: { requiresAuth: true, authorize: [Role.Sponsor] },
    beforeEnter: authGuard,
  },
  {
    path: '/event-matches',
    name: 'EventMatches',
    component: () => import(/* webpackChunkName: "evennt-matches" */ '@/views/EventMatches.vue'),
    meta: { requiresAuth: true, authorise: [Role.Organiser] },
    beforeEnter: authGuard,
  },
  {
    path: '/event/:id',
    name: 'Event',
    component: () => import(/* webpackChunkName: "event" */ '@/views/Event.vue'),
    // To be enabled
    meta: { requiresAuth: true, authorize: [Role.Organiser, Role.Sponsor] },
    beforeEnter: authGuard,
  },
  {
    path: '/analytics',
    name: 'Analytics',
    component: () => import(/* webpackChunkName: "analytics" */ '@/views/Analytics.vue'),
    meta: { requiresAuth: true },
    beforeEnter: authGuard,
  },
  {
    path: '/playground',
    name: 'Playground',
    component: () => import(/* webpackChunkName: "playground" */ '@/views/Playground.vue'),
  },
  {
    path: '*',
    name: '404',
    component: () => import(/* webpackChunkName: "404" */ '@/views/404.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes,
});

export default router;
