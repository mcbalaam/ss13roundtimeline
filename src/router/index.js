import { createRouter, createWebHistory } from 'vue-router'
import RoundView from '../views/RoundView.vue'
import RoundPicker from '@/components/RoundPicker.vue'
import MainPageView from '@/views/MainPageView.vue'

const routes = [
  {
    path: '/',
    name: 'main',
    component: MainPageView,
    meta: { title: 'Главная - Ark Station 13' }
  },
  {
    path: '/rounds',
    name: 'rounds',
    component: RoundPicker,
    meta: { title: 'Раунды - Ark Station 13' }
  },
  {
    path: `/rounds/:roundNumber`,
    name: 'roundid',
    component: RoundView,
    meta: { title: (route) => `Раунд #${route.params.roundNumber} - Ark Station 13`}
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const title = to.meta.title;
  if (typeof title === 'function') {
    document.title = title(to);
  } else {
    document.title = title || 'Заголовок по умолчанию';
  }
  next();
});

export default router