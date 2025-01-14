import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getProductApi } from '@/api/products'

export const useProductStore = defineStore('product', () => {
  const product = ref({})
  const activeImage = ref(0)
  const showLightbox = ref(false)
  const stockLeft = ref(product.value.quantity)
  const getProduct = async (productId) => {
    const response = await getProductApi(productId);
    product.value = response;
  };

  return { product, getProduct, showLightbox, activeImage, stockLeft }
})
