import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const cart = ref({})
  const isOrdered = ref(false)
  const ordered = ref({})
  cart.value = JSON.parse(localStorage.getItem('Desserts'))
  const getCart = () => {
    return cart.value
  }
  const postCart = (name, quant, price, img) => {
    if (!name) {
      localStorage.setItem('Desserts', JSON.stringify([]))
      cart.value = null
      return
    }
    const local = JSON.parse(localStorage.getItem('Desserts'))
    const index = local.findIndex((item) => item.product == name)
    if (index >= 0) {
      local[index].quant += quant
      if (local[index].quant === 0) local.splice(index, 1)
    } else {
      const data = { product: name, quant: quant, price: price, img: img }
      local.push(data)
    }
    if (quant === 0) local.splice(index, 1)
    localStorage.setItem('Desserts', JSON.stringify(local))
    cart.value = JSON.parse(localStorage.getItem('Desserts'))
  }
  const findInCart = (name) => {
    if (cart.value) {
      const index = cart.value.findIndex((item) => item.product === name)
      return cart.value[index]?.quant
    }
  }
  const totalInCart = () => {
    const total = cart.value?.map((item) => item.quant).reduce((acc, val) => acc + val, 0)
    return total ? total : 0
  }
  const orderedToggle = () => {
    isOrdered.value = !isOrdered.value
    ordered.value = cart.value
  }
  return { cart, ordered, isOrdered, getCart, postCart, findInCart, totalInCart, orderedToggle }
});
