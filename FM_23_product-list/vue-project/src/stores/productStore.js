import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getProductsApi } from '@/api/products'

export const useProductStore = defineStore('product', () => {
  const products = ref({})
  const getProducts = async () => {
    const response = await getProductsApi()
    products.value = response
  }

  return { getProducts, products }
});
