<script setup>
import { useCartStore } from '@/stores/cartStore'

const cartStore = useCartStore()

const props = defineProps({
  product: {
    type: Object,
    required: false,
  },
})

const formatData = (value) => {
  return new Intl.NumberFormat('en', { style: 'currency', currency: 'USD' }).format(value)
}
</script>

<template>
  <li class="product__card">
    <div class="product__image-wrapper">
      <picture>
        <source media="(max-width: 576px)" :srcset="product.image.mobile" />
        <source media="(max-width: 920px)" :srcset="product.image.tablet" />
        <img
          class="product__image"
          :class="{ product__image_outline: cartStore.findInCart(product.name) }"
          :src="product.image.desktop"
          :alt="`${product.name} image`"
          width="300"
          height="200"
        />
      </picture>
      <button
        @click="cartStore.postCart(product.name, 1, product.price, product.image.thumbnail)"
        v-show="!cartStore.findInCart(product.name)"
        class="product__btn product__btn_to-add"
      >
        <span class="product__btn-text">Add to Cart</span>
      </button>
      <div v-if="cartStore.findInCart(product.name)" class="product__btn product__btn_added">
        <button
          @click="cartStore.postCart(product.name, -1, product.price, product.image.thumbnail)"
          class="product__btn-update"
          aria-label="decrease quantity"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="2"
            fill="none"
            viewBox="0 0 10 2"
          >
            <path fill="#fff" d="M0 .375h10v1.25H0V.375Z" />
          </svg>
        </button>
        <span class="product__ordered">{{ cartStore.findInCart(product.name) }}</span>
        <button
          @click="cartStore.postCart(product.name, 1, product.price, product.image.thumbnail)"
          class="product__btn-update"
          aria-label="increase quantity"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="10"
            fill="none"
            viewBox="0 0 10 10"
          >
            <path
              fill="#fff"
              d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"
            />
          </svg>
        </button>
      </div>
    </div>
    <span class="product__category">{{ product.category }}</span>
    <strong class="product__name">{{ product.name }}</strong>
    <span class="product__price">{{ formatData(product.price) }}</span>
  </li>
</template>

<style scope>
.product__card {
  display: flex;
  max-width: calc((100% - var(--gap) * (var(--columns) - 1)) / var(--columns));
  min-width: 150px;
  flex-direction: column;
}
.product__image {
  border-radius: 8px;
  transition: outline ease-in-out 0.1s;
}
.product__image_outline {
  outline: 2px solid var(--red);
}
.product__image-wrapper {
  display: flex;
  position: relative;
  margin-bottom: 40px;
  justify-content: center;
  align-items: flex-end;
}
.product__btn {
  position: absolute;
  min-width: 158px;
  padding: 13px;
  bottom: -21px;
  background-color: var(--white);
  border-radius: 25px;
  outline: 1px solid var(--rose400);
  font-size: 0.9rem;
  font-weight: 600;
  transition: outline ease-in-out 0.3s;
}
.product__btn:hover {
  outline: 1px solid var(--red);
}
.product__btn:hover .product__btn-text {
  color: var(--red);
}
.product__btn:focus,
.product__btn-update:focus {
  outline: 2px solid var(--rose900);
}
.product__btn-text {
  padding-left: 28px;
  color: var(--rose900);
  background: url('/assets/images/icon-add-to-cart.svg') no-repeat;
  transition: color ease-in-out 0.3s;
}
.product__btn_to-add {
  z-index: 2;
}
.product__btn_added {
  display: flex;
  justify-content: space-between;
  background-color: var(--red);
}
.product__btn-update {
  width: 16px;
  height: 16px;
  line-height: 0;
  outline: 1px solid var(--rose50);
  border-radius: 50%;
  transition: all ease-in-out 0.3s;
}
.product__btn-update svg {
  vertical-align: middle;
}
.product__btn-update:hover {
  background-color: var(--white);
}
.product__btn-update:hover svg path {
  fill: var(--red);
}
.product__ordered {
  color: var(--rose50);
}
.product__category {
  margin-bottom: 8px;
  font-size: 0.82rem;
}
.product__name {
  margin-bottom: 7px;
  font-size: 0.94rem;
  color: var(--rose900);
}
.product__price {
  font-weight: 600;
  color: var(--red);
}
</style>
