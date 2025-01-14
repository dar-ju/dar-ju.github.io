<script setup>
import { useCartStore } from '@/stores/cartStore'
import { ref } from 'vue'

const cartStore = useCartStore()
const cartShow = ref(false)
const isMobileMenuOpened = ref(false)
const isMobileMenuEverOpened = ref(false)

const mobileMenuToggle = () => {
  isMobileMenuEverOpened.value = true
  isMobileMenuOpened.value = !isMobileMenuOpened.value
}

const cartDelete = (item) => {
  cartStore.cartDelete(item)
  if (cartStore.totalInCart === 0) cartShow.value = false
}

const cartToggle = () => {
  cartShow.value = !cartShow.value
}

const cartHover = () => {
  if (window.innerWidth > 992) cartShow.value = true
}
</script>

<template>
  <div class="container header">
    <div class="header__wrapper">
      <a href="#" class="header__logo"
        ><img src="@/assets/images/logo.svg" alt="Sneakers logo"
      /></a>
      <nav class="header__nav">
        <button @click="mobileMenuToggle()" class="header__nav-btn" aria-label="Open mobile menu">
          <svg width="16" height="15" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M16 12v3H0v-3h16Zm0-6v3H0V6h16Zm0-6v3H0V0h16Z"
              fill="#69707D"
              fill-rule="evenodd"
            />
          </svg>
        </button>
        <div
          class="header__menu-wrapper"
          :class="{
            'mobile-menu-open': isMobileMenuOpened,
            'mobile-menu-close': !isMobileMenuOpened && isMobileMenuEverOpened,
          }"
        >
          <button
            @click="mobileMenuToggle()"
            class="header__nav-close-btn"
            aria-label="Close mobile menu"
          >
            <svg width="14" height="15" xmlns="http://www.w3.org/2000/svg">
              <path
                d="m11.596.782 2.122 2.122L9.12 7.499l4.597 4.597-2.122 2.122L7 9.62l-4.595 4.597-2.122-2.122L4.878 7.5.282 2.904 2.404.782l4.595 4.596L11.596.782Z"
                fill="#69707D"
                fill-rule="evenodd"
              />
            </svg>
          </button>
          <ul class="header__menu">
            <li class="header__menu-item"><a href="#" class="header__menu-link">Collections</a></li>
            <li class="header__menu-item"><a href="#" class="header__menu-link">Men</a></li>
            <li class="header__menu-item"><a href="#" class="header__menu-link">Women</a></li>
            <li class="header__menu-item"><a href="#" class="header__menu-link">About</a></li>
            <li class="header__menu-item"><a href="#" class="header__menu-link">Contact</a></li>
          </ul>
        </div>
        <transition>
          <div
            @click="mobileMenuToggle()"
            v-show="isMobileMenuOpened"
            class="header__overlay"
          ></div>
        </transition>
      </nav>
      <div class="header__profile">
        <a
          v-on:mouseenter="cartHover()"
          @click="cartToggle()"
          href="#"
          class="header__cart"
          aria-label="Cart"
        ></a>
        <span v-show="cartStore.totalInCart" class="header__cart-notice">{{
          cartStore.totalInCart
        }}</span>
        <a href="#" class="header__avatar"
          ><img src="@/assets/images/image-avatar.png" alt="User avatar"
        /></a>
        <transition>
          <div v-show="cartShow" v-on:mouseleave="cartShow = false" class="header__cart-block">
            <span class="header__cart-title">Cart</span>
            <div v-if="cartStore.cart.length" class="header__cart-wrapper">
              <ul v-for="(item, index) in cartStore.cart" :key="index" class="header__cart-list">
                <li class="header__cart-item">
                  <img
                    class="header__cart-image"
                    :src="item.image"
                    :alt="`${item.name} thumbnail`"
                  />
                  <div class="header__cart-product">
                    <span class="header__cart-product-name">{{ item.name }}</span>
                    <div>
                      <span class="header__cart-product-data">{{
                        `${item.price} x ${item.quantity}`
                      }}</span>
                      <span class="header__cart-product-total">{{ item.total }}</span>
                    </div>
                  </div>
                  <button
                    @click="cartDelete(item.id)"
                    class="header__cart-delete"
                    aria-label="Delete item from cart"
                  >
                    <svg
                      width="14"
                      height="16"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                    >
                      <defs>
                        <path
                          d="M0 2.625V1.75C0 1.334.334 1 .75 1h3.5l.294-.584A.741.741 0 0 1 5.213 0h3.571a.75.75 0 0 1 .672.416L9.75 1h3.5c.416 0 .75.334.75.75v.875a.376.376 0 0 1-.375.375H.375A.376.376 0 0 1 0 2.625Zm13 1.75V14.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 14.5V4.375C1 4.169 1.169 4 1.375 4h11.25c.206 0 .375.169.375.375ZM4.5 6.5c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Z"
                          id="a"
                        />
                      </defs>
                      <use fill="#C3CAD9" fill-rule="nonzero" xlink:href="#a" />
                    </svg>
                  </button>
                </li>
              </ul>
              <button class="btn header__cart-checkout">Checkout</button>
            </div>
            <div v-else class="header__cart-empty">
              <span class="header__cart-empty-text">Your cart is empty.</span>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<style scope>
.header__wrapper {
  display: flex;
  width: 100%;
  padding-top: 28px;
  padding-bottom: 35px;
  align-items: center;
  border-bottom: 1px solid var(--color-grayish-blue);
}

.header__logo {
  min-width: 120px;
  margin-right: 56px;
  transition: outline ease-in-out 0.1s;
}

.header__logo:focus {
  outline: 1px solid var(--color-orange);
  outline-offset: 2px;
}

.header__nav {
  margin-right: 30px;
}

.header__nav-btn {
  display: none;
  font-size: 0;
}

.header__nav-close-btn {
  display: none;
}

.header__menu {
  display: flex;
  width: 100%;
  gap: 29px;
  justify-content: space-between;
}

.header__menu-item {
  position: relative;
  transition: color ease-in-out 0.3s;
}

.header__menu-item::after {
  content: '';
  position: absolute;
  width: 0;
  height: 4px;
  bottom: -51px;
  left: 0;
  background-color: var(--color-orange);
  transition: width ease-in-out 0.2s;
}

.header__menu-item:hover::after {
  width: 100%;
}

.header__menu-item:hover {
  color: var(--color-very-dark-blue);
}

.header__menu-link {
  transition: color ease-in-out 0.3s;
}

.header__menu-link:focus {
  color: var(--color-orange);
}

.header__overlay {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 1;
}

.header__profile {
  display: flex;
  position: relative;
  margin-left: auto;
  gap: 42px;
  align-self: flex-end;
}

.header__cart {
  width: 30px;
  background-image: url('@/assets/images/icon-cart.svg');
  background-repeat: no-repeat;
  background-position: center;
}

.header__cart-notice {
  display: block;
  position: absolute;
  padding: 0 7px;
  top: 10px;
  left: 11px;
  font-size: 0.7rem;
  color: var(--color-white);
  font-weight: 700;
  background-color: var(--color-orange);
  border-radius: 7px;
  cursor: pointer;
}

.header__avatar {
  width: 50px;
  border-radius: 50%;
  transition: outline ease-in-out 0.1s;
}

.header__avatar:hover,
.header__avatar:focus {
  outline: 2px solid var(--color-orange);
}

.header__cart-block {
  display: flex;
  position: absolute;
  min-width: 360px;
  min-height: 262px;
  left: -163px;
  top: 60px;
  z-index: 5;
  flex-direction: column;
  background-color: var(--color-white);
  border-radius: 10px;
  box-shadow: 0px 18px 50px -15px var(--color-grayish-blue);
}

.header__cart-title {
  display: block;
  padding: 27px 24px;
  color: var(--color-very-dark-blue);
  font-weight: 700;
  border-bottom: 1px solid var(--color-grayish-blue);
}

.header__cart-wrapper {
  padding: 24px;
}

.header__cart-list {
  display: flex;
  margin-bottom: 27px;
  gap: 15px;
  flex-direction: column;
}

.header__cart-item {
  display: flex;
  gap: 16px;
}

.header__cart-image {
  width: 50px;
  border-radius: 5px;
  object-fit: cover;
}

.header__cart-product {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.header__cart-product-name {
  line-height: 1.4rem;
}

.header__cart-product-data {
  margin-right: 10px;
}

.header__cart-product-total {
  color: var(--color-very-dark-blue);
  font-weight: 700;
}

.header__cart-checkout {
  width: 100%;
}

.header__cart-empty {
  display: flex;
  width: 100%;
  flex-grow: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.header__cart-empty-text {
  padding-bottom: 10px;
}

/* Cart animation */
.v-enter-active,
.v-leave-active {
  transition: opacity ease-in-out 0.3s;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

/* Menu animation */
@keyframes menuMobileOpen {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0%);
  }
}

@keyframes menuMobileClose {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-100%);
  }
}

/* MEDIA */
@media (max-width: 992px) {
  .header__wrapper {
    padding-top: 19px;
    gap: 33px;
    flex-wrap: wrap;
  }

  .header__nav {
    width: 100%;
    margin-right: 0;
    order: 2;
  }

  .header__menu-item::after {
    bottom: -35px;
  }
}

@media (max-width: 768px) {
  .header__wrapper {
    gap: 0;
    flex-wrap: nowrap;
  }

  .header__nav {
    order: -1;
    width: initial;
    margin-right: 16px;
  }

  .header__menu-wrapper {
    position: fixed;
    width: 286px;
    height: 100vh;
    padding: 25px;
    top: 0;
    left: -100%;
    background-color: var(--color-white);
    z-index: 20;
  }

  .mobile-menu-open {
    left: 0;
    animation: menuMobileOpen 0.5s ease forwards;
  }

  .mobile-menu-close {
    left: 0;
    animation: menuMobileClose 0.5s ease forwards;
  }

  .header__nav-btn {
    display: block;
  }

  .header__nav-close-btn {
    display: block;
    margin-bottom: 50px;
  }

  .header__menu {
    gap: 25px;
    flex-direction: column;
  }

  .header__menu-item {
    font-size: 1.13rem;
    font-weight: 700;
  }

  .header__menu-item::after {
    bottom: -15px;
  }

  .header__cart-block {
    min-height: 256px;
    top: 57px;
    right: 0;
    left: initial;
  }
}

@media (max-width: 576px) {
  .header__wrapper {
    padding-bottom: 0;
    border-bottom: none;
  }

  .header__logo {
    min-width: 137px;
    margin-right: initial;
  }

  .header__profile {
    gap: 18px;
  }

  .header__avatar {
    width: 24px;
  }

  .header__cart-block {
    min-height: 256px;
    right: -17px;
    top: 57px;
  }

  .header__cart-title {
    padding: 24px;
  }
}
</style>
