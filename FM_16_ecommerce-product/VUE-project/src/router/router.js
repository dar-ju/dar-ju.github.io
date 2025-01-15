import { createRouter } from 'vue-router'
import ProductPage from '@/views/ProductPage.vue'

const router = createRouter({
  routes: [
    {
      name: 'main',
      path: '/',
      component: ProductPage,
    }
  ],
})

export default router
