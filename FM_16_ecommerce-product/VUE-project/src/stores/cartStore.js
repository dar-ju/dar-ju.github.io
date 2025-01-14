import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCartStore = defineStore('cart', () => {
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

  return { cart, cartAdd, cartDelete, totalInCart }
})
