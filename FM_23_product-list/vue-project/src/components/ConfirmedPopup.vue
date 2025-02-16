<script setup>
import { useCartStore } from '@/stores/cartStore'

const cartStore = useCartStore()

const formatData = (value) => {
  return new Intl.NumberFormat('en', { style: 'currency', currency: 'USD' }).format(value)
}

const totalSumm = () => {
  return cartStore.ordered
    ?.map((item) => item.quant * item.price)
    .reduce((acc, val) => acc + val, 0)
}

const orderConfirmed = () => {
  cartStore.orderedToggle()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <Transition name="fade">
    <div
      v-if="cartStore.isOrdered"
      @click="cartStore.orderedToggle()"
      class="confirmed"
      aria-modal="true"
    >
      <div @click.stop class="confirmed__wrapper">
        <img class="confirmed__img" src="/assets/images/icon-order-confirmed.svg" alt="" />
        <h1 class="confirmed__title">Order Confirmed</h1>
        <p class="confirmed__text">We hope you enjoy your food!</p>
        <div class="confirmed__block">
          <ul class="confirmed__list">
            <li class="confirmed__item" v-for="item in cartStore.ordered" :key="item.product">
              <div class="confirmed__img-wrapper">
                <img
                  class="confirmed__product-img"
                  :src="item.img"
                  :alt="`${item.product} thumbnail`"
                />
                <div class="confirmed__product-wrapper">
                  <strong class="confirmed__name">{{ item.product }}</strong>
                  <div class="confirmed__price-wrapper">
                    <span class="confirmed__quant">{{ item.quant }}x</span>
                    <span class="confirmed__price">&#64; {{ formatData(item.price) }}</span>
                  </div>
                </div>
              </div>
              <span class="confirmed__summ">{{ formatData(item.quant * item.price) }}</span>
            </li>
          </ul>
          <div class="confirmed__total-block">
            <span class="confirmed__total-text">Order Total</span>
            <strong class="confirmed__total-summ">{{ formatData(totalSumm()) }}</strong>
          </div>
        </div>
        <button @click="orderConfirmed()" class="confirmed__order-btn">Start New Order</button>
      </div>
    </div>
  </Transition>
</template>

<style scope>
.confirmed {
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: #00000059;
  z-index: 10;
}
.confirmed__wrapper {
  position: fixed;
  width: 592px;
  max-height: 100vh;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 40px;
  padding-bottom: 42px;
  flex-grow: 1;
  align-self: flex-start;
  border-radius: 10px;
  background-color: var(--white);
  overflow-y: auto;
}
.confirmed__img {
  margin-bottom: 25px;
}
.confirmed__title {
  margin-bottom: 10px;
  font-size: 2.5rem;
  color: var(--rose900);
}
.confirmed__text {
  margin-bottom: 34px;
}
.confirmed__block {
  margin-bottom: 33px;
  padding: 24px;
  background-color: var(--rose50);
  border-radius: 10px;
}
.confirmed__list {
  display: flex;
  margin-bottom: 33px;
  gap: 18px;
  flex-direction: column;
}
.confirmed__item {
  display: flex;
  padding-bottom: 17px;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--rose100);
}
.confirmed__img-wrapper {
  display: flex;
  gap: 15px;
  justify-content: space-between;
}
.confirmed__product-img {
  width: 48px;
}
.confirmed__name {
  display: block;
  margin-bottom: 10px;
  font-size: 0.84rem;
  color: var(--rose900);
}
.confirmed__quant {
  margin-right: 15px;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--red);
}
.confirmed__summ {
  color: var(--rose900);
  font-weight: 600;
}
.confirmed__price {
  margin-right: 6px;
}
.confirmed__total-block {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--rose900);
}
.confirmed__total-text {
  font-size: 0.85rem;
  font-weight: 600;
}
.confirmed__total-summ {
  font-size: 1.5rem;
}
.confirmed__order-btn {
  width: 100%;
  padding: 17px;
  border-radius: 30px;
  font-weight: 600;
  color: var(--white);
  background-color: var(--red);
  transition: background-color ease-in-out 0.3s;
}
.confirmed__order-btn:hover {
  background-color: var(--brown);
}

@media (max-width: 920px) {
  .confirmed__wrapper {
    width: 526px;
  }
}

@media (max-width: 576px) {
  .confirmed__wrapper {
    width: 375px;
    padding: 44px 23px;
  }
}
</style>
