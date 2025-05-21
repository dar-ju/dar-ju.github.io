<script setup>
import { useCartStore } from '@/stores/cart'
import { useFormatPrice } from '@/composables/useFormatPrice'

const cartStore = useCartStore()

const getQuantityFromCart = (item) => {
  const found = cartStore.cart.find((element) => element.slug === item)
  return found ? found.quantity : 0
}

const removeCart = () => {
  cartStore.cart = []
}
</script>

<template>
  <Transition name="fade">
    <div class="cart" v-if="cartStore.isCartOpened" @click="cartStore.toggleCart">
      <div class="container cart__container" @click.stop>
        <div class="cart__window">
          <div class="cart__header" v-show="cartStore.cart.length">
            <h2 class="cart__title">Cart ({{ cartStore.cart.length }})</h2>
            <button class="cart__remove-all" @click="removeCart()">Remove all</button>
          </div>
          <div class="cart__empty-header" v-show="!cartStore.cart.length">
            <h2 class="cart__empty-title">Cart</h2>
            <p class="cart__empty-text">Your cart is empty</p>
          </div>
          <div class="cart__block" v-show="cartStore.cart.length">
            <ul class="cart__list">
              <li class="cart__item" v-for="item in cartStore.cart" :key="item.slug">
                <div class="cart__item-wrapper">
                  <img :src="item.image" alt="" class="cart__item-img" />
                  <div class="cart__item-block">
                    <h3 class="cart__item-name">{{ item.name }}</h3>
                    <span class="cart__item-price">&dollar; {{ useFormatPrice(item.price) }}</span>
                  </div>
                </div>
                <QuantityInput
                  class="cart__input"
                  :quantity="getQuantityFromCart(item.slug)"
                  @update="(val) => cartStore.changeQuantity(item.slug, val)"
                />
              </li>
            </ul>
            <div class="cart__total-block">
              <span class="cart__total">Total</span>
              <span class="cart__total-summ"
                >&dollar; {{ useFormatPrice(cartStore.getCartSumm()) }}</span
              >
            </div>
            <Button class="btn cart__btn" label="Checkout" />
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
.cart {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding-top: 130px;
  z-index: 100;
  background-color: var(--black40);
  &__container {
    position: relative;
    display: flex;
    justify-content: flex-end;
  }
  &__window {
    position: absolute;
    width: 377px;
    padding: 31px 33px;
    background-color: var(--white);
  }
  &__header {
    display: flex;
    margin-bottom: 32px;
    align-items: center;
    justify-content: space-between;
  }
  &__empty-header {
    display: flex;
    gap: 20px;
    flex-direction: column;
  }
  &__title {
    font-size: 1.2;
    text-transform: uppercase;
  }
  &__remove-all {
    color: var(--black50);
    text-decoration: underline;
  }
  &__list {
    display: flex;
    margin-bottom: 32px;
    gap: 24px;
    flex-direction: column;
  }
  &__item {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &__item-wrapper {
    display: flex;
    gap: 16px;
    align-items: center;
  }
  &__item-img {
    width: 64px;
    height: 64px;
    border-radius: 8px;
  }
  &__item-block {
  }
  &__item-name {
    margin-bottom: 7px;
    font-size: 1rem;
  }
  &__item-price {
    color: var(--black50);
    font-weight: 700;
  }
  &__input {
    max-width: 96px;
    max-height: 32px;
    &:deep(.p-inputtext) {
      font-size: 0.867rem;
    }
  }
  &__total-block {
    display: flex;
    margin-bottom: 24px;
    align-items: center;
    justify-content: space-between;
  }
  &__total {
    color: var(--black50);
    text-transform: uppercase;
  }
  &__total-summ {
    font-size: 1.2rem;
    font-weight: 700;
  }
  &__btn {
    width: 100%;
    max-width: 100%;
    font-size: 0.867rem;
    letter-spacing: 0.1rem;
  }
}
</style>
