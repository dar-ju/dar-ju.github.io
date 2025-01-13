import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      name: 'main',
      path: '/',
      component: () => import('@/views/ProductPage.vue'),
    }
  ],
})

export default router
