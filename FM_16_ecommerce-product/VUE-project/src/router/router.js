import { createRouter, createWebHashHistory } from 'vue-router'
import ProductPage from '@/views/ProductPage.vue'

const router = createRouter({
  history: createWebHashHistory('/'),
  routes: [
    {
      name: 'main',
      path: '/',
      component: ProductPage,
    }
  ],
})

export default router
