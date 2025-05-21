import { ref } from 'vue'
import { defineStore } from 'pinia'
// import { getProductFullDataApi } from '@/api/product'

export const useCartStore = defineStore('cart', () => {
  const cart = ref([])
  const isCartOpened = ref(false)
  const currentQuantity = ref(0)
  // const loading = ref(true)

  const addToCart = (product, name, image, price, quantity) => {
    const index = cart.value.findIndex(el => el.slug === product)
    if (index >= 0) {
      cart.value[index].quantity += quantity
    }
    else cart.value.push({ slug: product, name: name, image: image, price: price, quantity: quantity })
    console.log(cart.value);
  }

  const toggleCart = () => {
    isCartOpened.value = !isCartOpened.value
  }

  const changeQuantity = (product, quantity) => {
    const index = cart.value.findIndex(el => el.slug === product)
    console.log(quantity);

    if (quantity === 0) {
      cart.value.splice(index, 1)
      return
    }
    if (index >= 0) {
      cart.value[index].quantity = quantity
    }
  }

  const getCartSumm = () => {
    if (cart.value.length) {
      return cart.value.reduce((acc, val) => acc + Number(val.price) * val.quantity, 0)
    }
  }

  return { cart, isCartOpened, currentQuantity, addToCart, toggleCart, changeQuantity, getCartSumm }
})
