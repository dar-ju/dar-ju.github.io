<script setup>
import { useCartStore } from '@/stores/cartStore'

const cartStore = useCartStore()

const formatData = (value) => {
  return new Intl.NumberFormat('en', { style: 'currency', currency: 'USD' }).format(value)
}

const totalSumm = () => {
  const total = cartStore.cart
    ?.map((item) => item.quant * item.price)
    .reduce((acc, val) => acc + val, 0)
  return total ? total : ''
}

const confirmOrder = () => {
  cartStore.orderedToggle()
  cartStore.postCart()
}
</script>

<template>
  <div class="cart">
    <h2 class="cart__title">Your Cart ({{ cartStore.totalInCart() }})</h2>
    <Transition name="fade" mode="out-in">
      <div v-show="!cartStore.cart?.length" class="cart__empty-block">
        <img src="/assets/images/illustration-empty-cart.svg" alt="" />
        <p class="cart__empty-text">Your added items will appear here</p>
      </div>
    </Transition>
    <Transition name="fade">
      <div v-show="cartStore.cart?.length">
        <TransitionGroup name="list" tag="ul" class="cart__ordered-list">
          <li class="cart__ordered-item" v-for="item in cartStore.cart" :key="item.product">
            <div>
              <span class="cart__ordered-name">{{ item.product }}</span>
              <div class="cart__ordered-cost">
                <span class="cart__ordered-quant">{{ item.quant }}x</span>
                <span class="cart__ordered-price">&#64; {{ formatData(item.price) }}</span>
                <span class="cart__ordered-summ">{{ formatData(item.quant * item.price) }}</span>
              </div>
            </div>
            <button
              @click="cartStore.postCart(item.product, 0)"
              class="cart__ordered-del"
              aria-label="remove product"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="10"
                fill="none"
                viewBox="0 0 10 10"
              >
                <path
                  fill="#CAAFA7"
                  d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"
                />
              </svg>
            </button>
          </li>
        </TransitionGroup>
        <div class="cart__total-block">
          <span class="cart__total-text">Order Total</span>
          <span class="cart__total-summ">{{ formatData(totalSumm()) }}</span>
        </div>
        <div class="cart__delivery-block">
          <img src="/assets/images/icon-carbon-neutral.svg" alt="" />
          <p class="cart__delivery-text">This is <strong>carbon-neutral</strong> delivery</p>
        </div>
        <button @click="confirmOrder()" class="cart__order-btn">Confirm Order</button>
      </div>
    </Transition>
  </div>
</template>

<style scope>
.cart {
  position: sticky;
  width: 31%;
  min-height: 298px;
  padding: 26px 23px;
  padding-bottom: 42px;
  top: 32px;
  flex-grow: 1;
  align-self: flex-start;
  border-radius: 10px;
  background-color: var(--white);
}
.cart__title {
  margin-bottom: 27px;
  color: var(--red);
}
.cart__empty-block {
  left: 50%;
  top: 176px;
  transform: translate(-50%, -50%);
  min-width: 240px;
  display: flex;
  position: absolute;
  gap: 18px;
  flex-direction: column;
  align-items: center;
}
.cart__empty-text {
  font-size: 0.87rem;
  font-weight: 600;
  text-align: center;
}
.cart__ordered-list {
  display: flex;
  margin-bottom: 35px;
  flex-direction: column;
  gap: 17px;
}
.cart__ordered-item {
  display: flex;
  padding-bottom: 19px;
  gap: 10px;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--rose100);
}
.cart__ordered-name {
  display: block;
  margin-bottom: 10px;
  font-size: 0.84rem;
  font-weight: 700;
  color: var(--rose900);
}
.cart__ordered-cost {
  font-size: 0.9rem;
}
.cart__ordered-quant {
  display: inline-block;
  width: 30px;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--red);
}
.cart__ordered-price {
  margin-right: 6px;
}
.cart__ordered-summ {
  font-weight: 600;
}
.cart__ordered-del {
  display: flex;
  width: 16px;
  height: 16px;
  align-items: center;
  justify-content: center;
  outline: 1px solid var(--rose500);
  border-radius: 50%;
  transition: outline ease-in-out 0.3s;
}
.cart__ordered-del svg path {
  transition: fill ease-in-out 0.3s;
}
.cart__ordered-del:hover {
  outline: 1px solid var(--rose900);
}
.cart__ordered-del:hover svg path {
  fill: var(--rose900);
}
.cart__total-block {
  display: flex;
  margin-bottom: 26px;
  align-items: center;
  justify-content: space-between;
  color: var(--rose900);
}
.cart__total-text {
  font-size: 0.85rem;
  font-weight: 600;
}
.cart__total-summ {
  font-size: 1.5rem;
  font-weight: 700;
}
.cart__delivery-block {
  display: flex;
  margin-bottom: 24px;
  padding: 16px;
  gap: 6px;
  align-items: center;
  justify-content: center;
  font-size: 0.93rem;
  text-align: center;
  color: var(--rose900);
  background-color: var(--rose50);
  border-radius: 10px;
}
.cart__delivery-text {
  max-width: 90%;
}
.cart__delivery-text strong {
  font-weight: 600;
}
.cart__order-btn {
  width: 100%;
  padding: 17px;
  border-radius: 30px;
  font-weight: 600;
  color: var(--white);
  background-color: var(--red);
  transition: all ease-in-out 0.3s;
}
.cart__order-btn:hover {
  background-color: var(--brown);
}
.cart__order-btn:focus,
.cart__ordered-del:focus {
  outline: 2px solid var(--rose900);
}

@media (max-width: 920px) {
  .cart {
    width: 100%;
  }
  .cart__order-btn {
    display: block;
    max-width: 300px;
    margin: auto;
  }
}

@media (max-width: 576px) {
  .cart {
    min-height: 305px;
    padding: 30px 23px;
  }
}
</style>
