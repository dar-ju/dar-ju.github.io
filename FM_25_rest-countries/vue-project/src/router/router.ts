import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:id?',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/:region/:country',
      name: 'country',
      component: () => import('../views/CountryView.vue'),
    },
  ],
})

export default router
