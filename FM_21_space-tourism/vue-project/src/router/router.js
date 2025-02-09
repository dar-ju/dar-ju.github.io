import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
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

router.isReady().then(() => {
  const redirect = sessionStorage.getItem("redirect")
  if (redirect) {
    sessionStorage.removeItem("redirect")
    router.replace(redirect)
  }
});

export default router
