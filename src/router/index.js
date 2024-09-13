import { createRouter, createWebHistory } from 'vue-router'
import RoundView from '../views/RoundView.vue'
import MainPageView from '@/views/MainPageView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: MainPageView
  },
  {
    path: '/about',
    name: 'about',
    component: RoundView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
