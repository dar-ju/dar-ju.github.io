import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useProductStore } from '@/stores/product'

export const useCartStore = defineStore('cart', () => {
  const cart = ref([])
  const isCartOpened = ref(false)
  const isOrderedOpened = ref(false)
  const isMobileMenuOpened = ref(false)
  const currentQuantity = ref(0)
  const SHIPPING = 50
  const VAT = 20
  const local = JSON.parse(localStorage.getItem('AudiophileCart'))

  const fillCartFromLocalStorage = () => {
    if (local && local.length) {
      const productStore = useProductStore()
      local.forEach(async element => {
        await productStore.getData(element.slug)
        const store = productStore.product
        addToCart(store.slug, store.acf.short_name, store.acf.product_images.desktop_gallery[0].metadata.thumbnail.file_url,
          store.acf.price, element.quantity)
      });
    }
  }
  fillCartFromLocalStorage()

  const updateLocalStorage = () => {
    localStorage.setItem('AudiophileCart', JSON.stringify(cart.value.map(item => ({
      slug: item.slug,
      quantity: item.quantity,
    }))))
  }

  const addToCart = (product, name, image, price, quantity) => {
    const index = cart.value.findIndex(el => el.slug === product)
    if (index >= 0) {
      cart.value[index].quantity += quantity
    }
    else {
      cart.value.push({ slug: product, name: name, image: image, price: price, quantity: quantity })
    }
    updateLocalStorage()
  }

  const toggleCart = () => {
    isCartOpened.value = !isCartOpened.value
  }

  const toggleOrdered = () => {
    isOrderedOpened.value = !isOrderedOpened.value
  }

  const toggleMenu = () => {
    isMobileMenuOpened.value = !isMobileMenuOpened.value
  }

  const changeQuantity = (product, quantity) => {
    const index = cart.value.findIndex(el => el.slug === product)
    if (quantity === 0) {
      cart.value.splice(index, 1)
      updateLocalStorage()
      return
    }
    if (index >= 0) {
      cart.value[index].quantity = quantity
      updateLocalStorage()
    }
  }

  const getCartSumm = () => {
    if (cart.value.length) {
      return cart.value.reduce((acc, val) => acc + Number(val.price) * val.quantity, 0)
    }
  }

  const getVat = () => {
    if (cart.value.length) {
      return Math.round(getCartSumm() / 100 * VAT)
    }
  }

  const getGrandTotal = () => {
    if (cart.value.length) {
      return getCartSumm() + SHIPPING
    }
  }

  return {
    cart,
    isCartOpened,
    isOrderedOpened,
    isMobileMenuOpened,
    currentQuantity,
    SHIPPING,
    addToCart,
    toggleCart,
    toggleOrdered,
    toggleMenu,
    changeQuantity,
    getCartSumm,
    getVat,
    getGrandTotal,
    updateLocalStorage,
  }
})
