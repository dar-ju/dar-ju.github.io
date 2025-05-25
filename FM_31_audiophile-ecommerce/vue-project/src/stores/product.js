import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getProductFullDataApi, getProductAlsoDataApi } from '@/api/products'

export const useProductStore = defineStore('product', () => {
  const product = ref(null)
  const alsoProduct = ref(null)
  const loading = ref(true)

  const getData = async (getProduct) => {
    const productData = await getProductFullDataApi(getProduct)
    loading.value = false
    product.value = productData[0]
  }

  const getAlsoData = async () => {
    const productData = await getProductAlsoDataApi()
    alsoProduct.value = productData
  }

  return { product, loading, alsoProduct, getData, getAlsoData }
})
