import { defineStore } from 'pinia';
import { ref } from 'vue';
// import { getProductApi } from '@/api/products'

export const useCartStore = defineStore('cart', () => {
  // const name = ref('')
  // const price = ref(0)
  // const cart = ref(0)
  const cart = ref([])
  const totalInCart = ref(0)

  const cartAdd = (item) => {
    cart.value.push(item)
    totalInCart.value = cart.value.map(item => item.quantity).reduce((acc, val) => acc + val)
  }

  const cartDelete = (id) => {
    const index = cart.value.findIndex(el => el.id === id)
    cart.value.splice(index)
    totalInCart.value = 0
  }
  // const activeImage = ref(0)
  // const showLightbox = ref(false)
  // const getPrice = async (productId) => {
  //   const response = await getProductApi(productId);
  //   price.value = response.newPrice;
  // };

  return { cart, cartAdd, cartDelete, totalInCart }
})
