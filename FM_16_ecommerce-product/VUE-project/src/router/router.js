import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      name: 'main',
      path: '/',
      component: () => import('@/views/ProductPage.vue'),
    }
  ],
})

export default router
