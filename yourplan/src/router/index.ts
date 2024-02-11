import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/TreneriView',
    name: 'Treneri',
    component: () => import('../views/TreneriView.vue')
  },
  {
    path: '/LoginV',
    name: 'Login',
    component: () => import('../views/LoginV.vue')
  },
  {
    path: '/SignupV',
    name: 'Signup',
    component: () => import('../views/SignupV.vue')
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
