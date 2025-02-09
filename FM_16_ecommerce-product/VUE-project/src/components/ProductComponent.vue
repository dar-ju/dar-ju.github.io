<script setup>
import { useProductStore } from '@/stores/productStore'
import { useCartStore } from '@/stores/cartStore'
import LightboxComponent from '@/components/LightboxComponent.vue'
import { onMounted, ref } from 'vue'

const productStore = useProductStore()
const cartStore = useCartStore()
const quantityField = ref(0)
const images = ref({})
const thumbnails = ref({})

onMounted(async () => {
  await productStore.getProduct(1)
  images.value = productStore.product.images
  thumbnails.value = productStore.product.thumbnails
  cartStore.price = productStore.product.newPrice
  cartStore.name = productStore.product.name
})

const lightboxOpen = () => {
  if (window.innerWidth < 576) return
  productStore.showLightbox = true
}

const thumbToggle = (index) => {
  if (index >= Object.keys(images.value).length || index < 0) return
  productStore.activeImage = index
}

const percentDiscount = () => {
  const discount = Math.round(100 / (productStore.product.oldPrice / productStore.product.newPrice))
  return discount
}

const quantityIncrease = (type) => {
  type ? quantityField.value++ : quantityField.value--
  if (quantityField.value < 0) quantityField.value = 0
  checkMax()
}

const checkMax = () => {
  if (quantityField.value > productStore.product.stock) {
    quantityField.value = productStore.product.stock
  }
}

const formatPrice = (value) => {
  return new Intl.NumberFormat('en', { style: 'currency', currency: 'USD' }).format(value)
}

const addToCart = () => {
  if (quantityField.value === 0) return
  const index = cartStore.cart.findIndex((el) => el.id === productStore.product.id)
  if (index != -1) {
    const summ = quantityField.value + cartStore.cart[index].quantity
    if (summ > productStore.product.stock) return
    cartStore.cart[index].quantity = summ
    cartStore.totalInCart = summ
    cartStore.cart[index].total = formatPrice(
      productStore.product.newPrice * cartStore.cart[index].quantity,
    )
  } else {
    cartStore.cartAdd({
      id: productStore.product.id,
      image: productStore.product.thumbnails.thumbnailProduct1,
      name: productStore.product.name,
      price: formatPrice(productStore.product.newPrice),
      quantity: quantityField.value,
      total: formatPrice(productStore.product.newPrice * quantityField.value),
    })
  }
  quantityField.value = 0
}
</script>

<template>
  <div class="container product">
    <div class="section product__wrapper">
      <div class="product__images">
        <a
          class="product__link-image"
          @click.prevent="lightboxOpen()"
          href="#"
          aria-haspopup="dialog"
        >
          <img
            class="product__image"
            :src="images[`imageProduct${productStore.activeImage + 1}`]"
            :alt="`${productStore.product.name} main foto`"
          />
        </a>
        <button
          @click="thumbToggle(productStore.activeImage - 1)"
          class="product__image-arrow product__image-arrow_prev"
          aria-label="Previous image"
        >
          <svg class="product__nav-icon" width="12" height="18" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 1 3 9l8 8" stroke-width="3" fill="none" fill-rule="evenodd" />
          </svg>
        </button>
        <button
          @click="thumbToggle(productStore.activeImage + 1)"
          class="product__image-arrow product__image-arrow_next"
          aria-label="Next image"
        >
          <svg class="product__nav-icon" width="13" height="18" xmlns="http://www.w3.org/2000/svg">
            <path d="m2 1 8 8-8 8" stroke-width="3" fill="none" fill-rule="evenodd" />
          </svg>
        </button>
        <ul class="product__thumbnails">
          <li
            class="product__thumbnail"
            v-for="(thumb, index, id) in images"
            :key="id"
            @click="thumbToggle(id)"
            :class="{ selected: productStore.activeImage === id }"
          >
            <button>
              <img
                class="product__thumbnail-image"
                :class="{ 'selected-image': productStore.activeImage === id }"
                :src="thumb"
                :alt="`${productStore.product.name} thumbnail ${id}`"
              />
            </button>
          </li>
        </ul>
      </div>
      <div class="product__info">
        <span class="product__brand">{{ productStore.product.brand }}</span>
        <h1 class="product__title">{{ productStore.product.name }}</h1>
        <p class="product__description">{{ productStore.product.description }}</p>
        <div class="product__price-group">
          <span class="product__new-price">{{ formatPrice(productStore.product.newPrice) }}</span>
          <span class="product__discount">{{ percentDiscount() }}%</span>
          <span class="product__old-price">{{ formatPrice(productStore.product.oldPrice) }}</span>
        </div>
        <form class="product__cart-form">
          <div class="product__cart-input-group">
            <input
              @input="checkMax()"
              @change="quantityField < 0 ? (quantityField = 0) : quantityField"
              v-model="quantityField"
              type="number"
              class="product__cart-input"
              aria-label="Quantity"
            />
            <button
              @click.prevent="quantityIncrease(false)"
              class="product__cart-button product__cart-button_minus"
              aria-label="Decrease product"
            >
              -
            </button>
            <button
              @click.prevent="quantityIncrease(true)"
              class="product__cart-button product__cart-button_plus"
              aria-label="Increase product"
            >
              +
            </button>
          </div>
          <button @click.prevent="addToCart()" class="btn product__cart-add">
            <svg
              class="product__cart-icon"
              width="22"
              height="20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.021-7.243-13.8.81-.57-6.341h15.753l-1.383 5.53Z"
                fill-rule="nonzero"
              />
            </svg>
            Add to cart
          </button>
          <span
            class="product__cart-warning"
            v-show="quantityField > productStore.product.stock - cartStore.totalInCart"
            >{{
              `${productStore.product.stock - cartStore.totalInCart} items available to add to cart`
            }}</span
          >
        </form>
      </div>
    </div>
    <transition>
      <LightboxComponent v-if="productStore.showLightbox" :images="productStore.product" />
    </transition>
  </div>
</template>

<style scope>
.product {
  position: relative;
  padding-left: 212px;
}

.product__wrapper {
  display: flex;
  gap: 50px;
  justify-content: space-between;
}

.product__images {
  max-width: 447px;
}

.product__image {
  margin-bottom: 30px;
  border-radius: 16px;
  cursor: pointer;
}

.product__image-arrow {
  display: none;
}

.product__thumbnails {
  display: flex;
  gap: 29px;
  flex-wrap: wrap;
}

.product__thumbnail {
  width: 90px;
  border-radius: 10px;
  background-color: var(--color-white);
  transition: outline ease-in-out 0.1s;
}

.product__thumbnail:focus .product__thumbnail:active {
  outline: 2px solid var(--color-orange);
}

.product__thumbnail-image {
  border-radius: 8px;
  transition: filter ease-in-out 0.3s;
}

.product__thumbnail-image:hover {
  filter: opacity(30%);
}

.product__info {
  display: flex;
  max-width: 493px;
  padding: 62px 0;
  flex-direction: column;
}

.product__brand {
  display: block;
  margin-bottom: 1.1rem;
  text-transform: uppercase;
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 1px;
}

.product__title {
  margin-bottom: 2.3rem;
  font-size: 2.74rem;
  line-height: 3.05rem;
  color: var(--color-very-dark-blue);
}

.product__description {
  margin-bottom: 1.5rem;
  line-height: 1.6rem;
}

.product__price-group {
  display: flex;
  margin-bottom: 2.15rem;
  gap: 15px;
  flex-wrap: wrap;
  align-items: end;
}

.product__new-price {
  font-size: 1.77rem;
  font-weight: 700;
  color: var(--color-very-dark-blue);
  letter-spacing: 1px;
}

.product__discount {
  padding: 5px 10px;
  background-color: var(--color-very-dark-blue);
  border-radius: 6px;
  font-weight: 700;
  color: var(--color-white);
}

.product__old-price {
  flex: 0 0 100%;
  text-decoration: line-through;
}

.product__cart-form {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.product__cart-input-group {
  display: flex;
  position: relative;
  align-items: center;
}

.product__cart-input {
  width: 157px;
  height: 56px;
  text-align: center;
  color: var(--color-very-dark-blue);
  font-weight: 700;
  background-color: var(--color-light-grayish-blue);
  border-radius: 10px;
}

.product__cart-input::placeholder {
  color: var(--color-very-dark-blue);
}

.product__cart-button {
  position: absolute;
  height: 100%;
  padding: 0px 14px;
  bottom: 3px;
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--color-orange);
  transition: color ease-in-out 0.3s;
}

.product__cart-button_minus {
  left: 0;
}

.product__cart-button_plus {
  right: 0;
}

.product__cart-button:hover {
  color: var(--color-lite-orange);
}

.product__cart-add {
  width: 272px;
}

.product__cart-icon {
  margin-right: 13px;
  fill: var(--color-very-dark-blue);
}

.product__cart-warning {
  color: var(--color-orange);
}

/* ARROWS ON MOBILE */
.product__image-arrow {
  position: absolute;
  width: 40px;
  height: 40px;
  top: 155px;
  background-color: var(--color-white);
  border-radius: 50%;
  stroke: var(--color-very-dark-blue);
  transition: stroke ease-in-out 0.3s;
}

.product__image-arrow:hover {
  stroke: var(--color-orange);
}

.product__image-arrow_prev {
  left: 16px;
}

.product__image-arrow_next {
  right: 16px;
}

.product__nav-icon {
  vertical-align: middle;
  transform: scale(0.8);
}

/* Image select */
.selected {
  background-color: var(--color-white);
  outline: 2px solid var(--color-orange);
}

.selected-image {
  filter: opacity(30%);
}

/* Lightbox animation */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

/* MEDIA */
@media (max-width: 1200px) {
  .product {
    padding-left: 85px;
  }
}

@media (max-width: 992px) {
  .product__wrapper {
    padding: 50px 0;
    flex-direction: column;
  }

  .product__images {
    display: flex;
    gap: 30px;
    min-width: initial;
    max-width: initial;
  }

  .product__link-image {
    pointer-events: none;
  }

  .product__image {
    margin-bottom: 0;
    cursor: initial;
    object-fit: cover;
  }

  .product__thumbnails {
    flex-direction: column;
  }

  .product__info {
    padding: 25px 0;
    max-width: initial;
  }
}

@media (max-width: 768px) {
  .product {
    padding-left: 35px;
  }
}

@media (max-width: 576px) {
  .product {
    padding: 0;
  }

  .product__wrapper {
    padding: 25px 0;
    gap: 25px;
  }

  .product__images {
    display: block;
  }

  .product__image {
    max-height: 300px;
    width: 100%;
    min-width: initial;
    margin-bottom: 0;
    border-radius: 0;
  }

  .product__image-arrow {
    display: block;
  }

  .product__thumbnails {
    display: none;
  }

  .product__info {
    padding: 0 23px;
  }

  .product__brand {
    margin-bottom: 0.7rem;
    font-size: 0.83rem;
  }

  .product__title {
    margin-bottom: 1rem;
    font-size: 1.74rem;
    line-height: 2.05rem;
  }

  .product__description {
    font-size: 0.95rem;
    line-height: 1.55rem;
  }

  .product__price-group {
    margin-bottom: 1.7rem;
    align-items: center;
  }

  .product__old-price {
    flex: initial;
    margin-left: auto;
    font-weight: 700;
  }

  .product__cart-input-group {
    width: 100%;
  }

  .product__cart-input {
    width: 100%;
  }

  .product__cart-button_minus {
    left: 9px;
  }

  .product__cart-button_plus {
    right: 9px;
  }

  .product__cart-add {
    width: 100%;
    box-shadow: 0px 18px 40px -19px var(--color-orange);
  }
}
</style>
