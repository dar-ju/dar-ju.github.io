import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/destination',
      name: 'destination',
      component: () => import('../views/DestinationView.vue'),
    },
    {
      path: '/crew',
      name: 'crew',
      component: () => import('../views/CrewView.vue'),
    },
    {
      path: '/technology',
      name: 'technology',
      component: () => import('../views/TechnologyView.vue'),
    },
  ],
})

export default router
