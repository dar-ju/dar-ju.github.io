<script setup>
import { useCartStore } from '@/stores/cart'
import { useFormatPrice } from '@/composables/useFormatPrice'
import { ref } from 'vue'
import router from '@/router'

const cartStore = useCartStore()

const isCollapsed = ref(true)

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value
}

const goHome = () => {
  router.push('/')
  cartStore.cart = []
  cartStore.isOrderedOpened = false
}
</script>

<template>
  <Transition name="fade">
    <div v-if="cartStore.isOrderedOpened" class="modal ordered">
      <div class="container modal__container ordered__container" @click.stop>
        <div class="ordered__window">
          <img
            class="ordered__img"
            src="/assets/images/checkout/icon-order-confirmation.svg"
            alt=""
          />
          <h2 class="ordered__title">Thank you for&nbsp;your order</h2>
          <p class="ordered__message">You will receive an email confirmation shortly.</p>
          <div class="ordered__block">
            <div class="ordered__products">
              <div v-show="isCollapsed" class="ordered__one-item">
                <CartContain :isFirstEl="true" :isCompact="true" class="ordered__list" />
                <a
                  href="#"
                  v-show="cartStore.cart.length > 1"
                  @click.prevent="toggleCollapse()"
                  class="ordered__expand"
                  >{{ `and ${cartStore.cart.length - 1} other item(s)` }}</a
                >
              </div>
              <div v-show="!isCollapsed" class="ordered__more-items">
                <CartContain :isCompact="true" class="ordered__list" />
                <a href="#" @click.prevent="toggleCollapse()" class="ordered__expand">View less</a>
              </div>
            </div>
            <div class="ordered__total">
              <h3 class="ordered__total-title">Grand total</h3>
              <span class="ordered__summ"
                >&dollar; {{ useFormatPrice(cartStore.getGrandTotal()) }}</span
              >
            </div>
          </div>
          <Button
            @click="goHome()"
            label="Back to home"
            class="btn ordered__btn"
            aria-role="link"
          />
        </div>
      </div>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/breakpoints';
.ordered {
  &__container {
    padding-top: 92px;
  }
  &__window {
    position: absolute;
    width: 540px;
    padding: 48px;
    left: 50%;
    transform: translate(-50%);
    background-color: var(--white);
    border-radius: 8px;
  }
  &__img {
    margin-bottom: 33px;
  }
  &__title {
    max-width: 300px;
    margin-bottom: 27px;
    font-size: 2.11rem;
    line-height: 2.4rem;
    letter-spacing: 0.09rem;
    text-transform: uppercase;
  }
  &__message {
    margin-bottom: 37px;
    color: var(--black50);
  }
  &__block {
    display: flex;
    margin-bottom: 45px;
    border-radius: 8px;
    overflow: hidden;
  }
  &__products {
    width: 100%;
    padding: 24px;
    background-color: var(--grey);
  }
  &__list {
    margin-bottom: 13px;
    padding-bottom: 13px;
    border-bottom: 1px solid var(--grey-medium-line);
  }
  &__expand {
    display: block;
    text-align: center;
    color: var(--black50);
    font-size: 0.8rem;
    font-weight: 700;
  }
  &__total {
    display: flex;
    padding: 44px 32px;
    flex-direction: column;
    justify-content: flex-end;
    background-color: var(--black);
  }
  &__total-title {
    min-width: 134px;
    margin-bottom: 15px;
    color: var(--white50);
    font-size: 1rem;
    font-weight: 500;
    text-transform: uppercase;
  }
  &__summ {
    font-size: 1.2rem;
    font-weight: 700;
    color: var(--white);
  }
  &__btn {
    width: 100%;
    max-width: 100%;
  }

  //MEDIA QUERIES
  @include media-query-sm {
    &__window {
      width: 88%;
      max-width: 327px;
      padding: 32px;
    }
    &__img {
      margin-bottom: 23px;
    }
    &__block {
      margin-bottom: 23px;
      flex-direction: column;
    }
    &__title {
      margin-bottom: 17px;
      font-size: 1.55rem;
      line-height: 2rem;
    }
    &__message {
      margin-bottom: 26px;
      line-height: 1.5rem;
    }
    &__total {
      padding: 20px 24px;
    }
  }
}
</style>
