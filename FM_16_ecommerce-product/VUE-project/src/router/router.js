import { createRouter, createWebHistory } from 'vue-router'
import ProductPage from '@/views/ProductPage.vue'

const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      name: 'main',
      path: '/',
      component: ProductPage,
    }
  ],
})

export default router
