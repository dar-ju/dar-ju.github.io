<script setup>
import { useCartStore } from '@/stores/cart'
import { useFormatPrice } from '@/composables/useFormatPrice'

const props = defineProps({
  isFirstEl: Boolean,
  isCompact: Boolean,
})

const cartStore = useCartStore()

const getQuantityFromCart = (item) => {
  const found = cartStore.cart.find((element) => element.slug === item)
  return found ? found.quantity : 0
}

const cartData = () => {
  if (props.isFirstEl) {
    return [cartStore.cart[0]]
  } else return cartStore.cart
}
</script>

<template>
  <ul class="cart">
    <li class="cart__item" v-for="item in cartData()" :key="item.slug">
      <div class="cart__item-block">
        <img
          :src="item.image"
          class="cart__item-img"
          :class="{ 'cart__item-img--compact': isCompact }"
          alt=""
        />
        <div class="cart__item-product-block">
          <div class="cart__item-name-block">
            <h3 class="cart__item-name">{{ item.name }}</h3>
            <span class="cart__item-quantity">x{{ getQuantityFromCart(item.slug) }}</span>
          </div>
          <span class="cart__item-price">&dollar; {{ useFormatPrice(item.price) }}</span>
        </div>
      </div>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.cart {
  display: flex;
  margin-bottom: 40px;
  gap: 24px;
  flex-direction: column;
  &__item {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &__item-block {
    display: flex;
    width: 100%;
    gap: 16px;
    align-items: center;
  }
  &__item-img {
    width: 64px;
    &--compact {
      width: 50px;
    }
  }
  &__item-product-block {
    width: 100%;
  }
  &__item-name-block {
    display: flex;
    justify-content: space-between;
  }
  &__item-name {
    margin-bottom: 6px;
    font-size: 1rem;
  }
  &__item-price {
    font-size: 0.933rem;
    font-weight: 700;
    color: var(--black50);
  }
}
</style>
