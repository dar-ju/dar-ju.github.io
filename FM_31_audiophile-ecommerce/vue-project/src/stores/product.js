import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getProductFullDataApi } from '@/api/product'

export const useProductStore = defineStore('product', () => {
  const product = ref(null)
  const loading = ref(true)

  const getData = async (getProduct) => {
    const productData = await getProductFullDataApi(getProduct)
    loading.value = false
    product.value = productData[0]
  }
  return { product, loading, getData }
})
