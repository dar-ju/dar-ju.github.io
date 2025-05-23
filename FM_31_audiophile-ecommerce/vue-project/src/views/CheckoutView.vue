<script setup>
import { useCartStore } from '@/stores/cart'
import { useFormatPrice } from '@/composables/useFormatPrice'
import { ref, watch } from 'vue'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { z } from 'zod'
import CartContain from '@/components/common/CartContain.vue'
import { postOrderApi } from '@/api/order.js'
import { useToast } from 'primevue/usetoast'

const toast = useToast()

const cartStore = useCartStore()

const iseMoney = ref(true)
const isCash = ref(false)
const paymentType = ref('eMoney-radio')
const buttonLabel = ref('Continue & Pay')

const resolver = zodResolver(
  z
    .object({
      username: z.string().min(1, { message: 'Name is required.' }),
      email: z
        .string()
        .min(1, { message: 'This field is required' })
        .email({ message: 'Wrong format' }),
      phone: z.string().min(1, { message: 'Phone number is required.' }),
    })
    .passthrough(),
)

const onFormSubmit = async ({ valid, values }) => {
  if (valid) {
    try {
      const hiddenFields = {
        _wpcf7: '6',
        _wpcf7_unit_tag: 'wpcf7-f6-p85-o1',
        _wpcf7_container_post: '85',
      }
      const dataToSend = {
        ...values,
        payment: paymentType.value,
        order: cartStore.cart
          .map(
            (item) =>
              `${item.name} — ${item.quantity}x × ${item.price}$ = ${item.quantity * item.price}$`,
          )
          .join('\n'),
        ...hiddenFields,
      }
      await postOrderApi(dataToSend)
      // cartStore.toggleOrdered()
      // console.log(dataToSend)
    } catch (err) {
      toast.add({ severity: 'error', summary: 'Ошибка', detail: err.message, life: 4000 })
    }
  }
}

watch(
  () => paymentType.value,
  async (newVal, oldVal) => {
    iseMoney.value = newVal === 'eMoney-radio' ? true : false
    isCash.value = newVal === 'cash-radio' ? true : false
    buttonLabel.value = newVal === 'eMoney-radio' ? 'Continue & Pay' : 'Continue'
  },
  { immediate: true },
)
</script>

<template>
  <section class="checkout">
    <div class="container checkout__container">
      <a href="#" @click.prevent="goBack()" class="checkout__back">Go Back</a>
      <Form :resolver @submit="onFormSubmit" class="checkout__wrapper">
        <div class="checkout__block checkout__block--checkout">
          <h1 class="checkout__title">Checkout</h1>
          <div v-show="!cartStore.cart.length" class="checkout__empty-block">
            <p class="checkout__empty-info">You don't have any items in your cart yet.</p>
            <router-link to="/" class="checkout__empty-link">Go to shopping</router-link>
          </div>
          <div v-show="cartStore.cart.length" class="card flex justify-center">
            <fieldset class="checkout__fieldset checkout__fieldset--billing">
              <legend class="checkout__fieldset-title">Billing Details</legend>
              <FormField
                v-slot="$field"
                as="section"
                name="username"
                initialValue=""
                class="checkout__field-block"
              >
                <label for="username" class="checkout__label">Name</label>
                <InputText
                  type="text"
                  id="username"
                  placeholder="Alexei Ward"
                  class="checkout__input"
                />
                <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{
                  $field.error?.message
                }}</Message>
              </FormField>
              <FormField
                v-slot="$field"
                as="section"
                name="email"
                initialValue=""
                class="checkout__field-block"
              >
                <label for="email" class="checkout__label">Email Address</label>
                <InputText
                  type="text"
                  id="email"
                  placeholder="alexei@mail.com"
                  class="checkout__input"
                />
                <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{
                  $field.error?.message
                }}</Message>
              </FormField>

              <FormField
                v-slot="$field"
                as="section"
                name="phone"
                initialValue=""
                class="checkout__field-block"
              >
                <label for="phone" class="checkout__label">Phone Number</label>
                <InputMask
                  id="phone"
                  name="phone"
                  mask="+9 999-999-9999"
                  placeholder="+1 202-555-0136"
                  class="checkout__input"
                />
                <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{
                  $field.error?.message
                }}</Message>
              </FormField>
            </fieldset>

            <fieldset class="checkout__fieldset checkout__fieldset--shipping">
              <legend class="checkout__fieldset-title">Shipping Info</legend>
              <FormField
                v-slot="$field"
                as="section"
                name="address"
                initialValue=""
                class="checkout__field-block checkout__field-block--address"
              >
                <label for="address" class="checkout__label">Address</label>
                <InputText
                  type="text"
                  id="address"
                  placeholder="1137 Williams Avenue"
                  class="checkout__input"
                />
                <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{
                  $field.error?.message
                }}</Message>
              </FormField>
              <FormField
                v-slot="$field"
                as="section"
                name="zip"
                initialValue=""
                class="checkout__field-block"
              >
                <label for="zip" class="checkout__label">ZIP Code</label>
                <InputMask
                  id="zip"
                  name="zip"
                  mask="99999"
                  placeholder="10001"
                  class="checkout__input"
                />
                <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{
                  $field.error?.message
                }}</Message>
              </FormField>
              <FormField
                v-slot="$field"
                as="section"
                name="city"
                initialValue=""
                class="checkout__field-block"
              >
                <label for="city" class="checkout__label">City</label>
                <InputText type="text" id="city" placeholder="New York" class="checkout__input" />
                <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{
                  $field.error?.message
                }}</Message>
              </FormField>
              <FormField
                v-slot="$field"
                as="section"
                name="country"
                initialValue=""
                class="checkout__field-block"
              >
                <label for="country" class="checkout__label">Country</label>
                <InputText
                  type="text"
                  id="country"
                  placeholder="United States"
                  class="checkout__input"
                />
                <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{
                  $field.error?.message
                }}</Message>
              </FormField>
            </fieldset>

            <fieldset class="checkout__fieldset">
              <legend class="checkout__fieldset-title">Payment Details</legend>
              <fieldset class="checkout__fieldset checkout__fieldset--payment">
                <legend class="checkout__label checkout__label--payment">Payment Method</legend>
                <div class="checkout__radio-wrapper">
                  <div class="checkout__radio">
                    <RadioButton
                      v-model="paymentType"
                      inputId="eMoney-radio"
                      name="payment"
                      value="eMoney-radio"
                    />
                    <label class="checkout__radio-label" for="eMoney-radio">e-Money</label>
                  </div>
                  <div class="checkout__radio">
                    <RadioButton
                      v-model="paymentType"
                      inputId="cash-radio"
                      name="payment"
                      value="cash-radio"
                    />
                    <label class="checkout__radio-label" for="cash-radio">Cash on Delivery</label>
                  </div>
                </div>
              </fieldset>
              <FormField
                v-slot="$field"
                as="section"
                name="eMoney"
                initialValue=""
                v-if="iseMoney"
                class="checkout__field-block"
              >
                <label for="eMoney" class="checkout__label">e-Money Number</label>
                <InputMask
                  id="eMoney"
                  name="eMoney"
                  mask="999999999"
                  placeholder="238521993"
                  class="checkout__input"
                />
                <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{
                  $field.error?.message
                }}</Message>
              </FormField>
              <FormField
                v-slot="$field"
                as="section"
                name="eMoneyPin"
                initialValue=""
                v-if="iseMoney"
                class="checkout__field-block"
              >
                <label for="eMoneyPin" class="checkout__label">e-Money PIN</label>
                <InputMask
                  id="eMoneyPin"
                  name="eMoneyPin"
                  mask="9999"
                  placeholder="6891"
                  class="checkout__input"
                />
                <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{
                  $field.error?.message
                }}</Message>
              </FormField>
              <div v-show="isCash" class="checkout__cash-warning-block">
                <img
                  class="checkout__cash-warning-img"
                  src="/assets/images/checkout/icon-cash-on-delivery.svg"
                  alt=""
                />
                <p class="checkout__cash-warning">
                  The ‘Cash on Delivery’ option enables you to pay in cash when our delivery courier
                  arrives at your residence. Just make sure your address is correct so that your
                  order will not be cancelled.
                </p>
              </div>
            </fieldset>
          </div>
        </div>
        <div v-show="cartStore.cart.length" class="checkout__block summary">
          <h2 class="summary__title">Summary</h2>
          <CartContain :isFirstEl="false" />
          <ul class="summary__total-list">
            <li class="summary__total-item">
              <span class="summary__total-name">Total</span>
              <span class="summary__total"
                >&dollar; {{ useFormatPrice(cartStore.getCartSumm()) }}</span
              >
            </li>
            <li class="summary__total-item">
              <span class="summary__total-name">Shipping</span>
              <span class="summary__total">&dollar; {{ useFormatPrice(cartStore.SHIPPING) }}</span>
            </li>
            <li class="summary__total-item">
              <span class="summary__total-name">VAT (included)</span>
              <span class="summary__total">&dollar; {{ useFormatPrice(cartStore.getVat()) }}</span>
            </li>
          </ul>
          <div class="summary__total-item summary__total-item--grand">
            <span class="summary__total-name">Grand Total</span>
            <span class="summary__total summary__total--grand"
              >&dollar; {{ useFormatPrice(cartStore.getGrandTotal()) }}</span
            >
          </div>
          <Button class="btn checkout__btn" type="submit" :label="buttonLabel" />
        </div>
      </Form>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.checkout {
  padding-top: 83px;
  padding-bottom: 83px;
  background-color: var(--grey);
  &__container {
  }
  &__back {
    display: block;
    margin-bottom: 43px;
    color: var(--black50);
  }
  &__wrapper {
    display: flex;
    gap: 30px;
    // min-height: 500px;
  }
  &__block {
    background-color: var(--white);
    border-radius: 8px;
    &--checkout {
      width: 66%;
      padding: 54px 48px;
    }
  }
  &__title {
    margin-bottom: 45px;
    font-size: 2.133rem;
    text-transform: uppercase;
    letter-spacing: 0.08rem;
  }
  &__empty-info {
    margin-bottom: 20px;
  }
  &__empty-link {
    color: var(--orange);
    font-weight: 700;
  }
  &__field-block {
    display: flex;
    gap: 10px;
    flex-direction: column;
    &--address {
      grid-column: 1 / 3;
    }
  }
  &__label {
    font-size: 0.8rem;
    font-weight: 700;
    &--payment {
      position: absolute;
      // margin-bottom: 20px;
      left: 0;
    }
  }
  &__input {
    height: 56px;
    padding-left: 23px;
  }
  &__fieldset {
    display: grid;
    margin: 0;
    padding: 0;
    grid-template-columns: auto auto;
    gap: 26px 16px;
    border: 0;
    &--billing {
      margin-bottom: 57px;
    }
    &--shipping {
      margin-bottom: 65px;
    }
    &--payment {
      display: flex;
      position: relative;
      grid-column: 1 / 3;
      justify-content: flex-end;
    }
  }
  &__fieldset-title {
    margin-bottom: 22px;
    color: var(--orange);
    font-size: 0.867rem;
    font-weight: 700;
    letter-spacing: 0.06rem;
    text-transform: uppercase;
  }
  &__radio-wrapper {
    display: flex;
    width: 49%;
    gap: 18px;
    // grid-column: 2 / 3;
    flex-direction: column;
  }
  &__radio {
    display: flex;
    padding-left: 18px;
    align-items: center;
    border: 1px solid var(--grey-medium);
    border-radius: 8px;
    transition:
      border ease-in-out 0.3s,
      background-color ease-in-out 0.3s;
    cursor: pointer;
    // &_active {
    // background-color: var(--magnolia);
    // border: 1px solid var(--purple);
    // }
    // &:hover {
    // border: 1px solid var(--purple);
    // }
  }
  &__radio-label {
    width: 100%;
    padding: 18px;
    cursor: pointer;
    font-size: 0.933rem;
    font-weight: 700;
  }
  &__cash-warning-block {
    display: flex;
    min-height: 80px;
    gap: 32px;
    align-items: center;
    grid-column: 1 / 3;
  }
  &__cash-warning-img {
  }
  &__cash-warning {
    line-height: 1.667rem;
    color: var(--black50);
  }
  &__btn {
    width: 100%;
    max-width: 100%;
  }
}

.summary {
  width: 350px;
  height: fit-content;
  padding: 32px;
  &__title {
    margin-bottom: 31px;
    font-size: 1.3rem;
    text-transform: uppercase;
  }
  &__cart-list {
    display: flex;
    margin-bottom: 40px;
    gap: 24px;
    flex-direction: column;
  }
  &__cart-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &__cart-item-block {
    display: flex;
    width: 100%;
    gap: 16px;
    align-items: center;
  }
  &__item-img {
    width: 64px;
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
  &__item-quantity {
    font-weight: 700;
    color: var(--black50);
  }
  &__total-list {
    display: flex;
    margin-bottom: 24px;
    gap: 12px;
    flex-direction: column;
  }
  &__total-item {
    display: flex;
    justify-content: space-between;
    &--grand {
      margin-bottom: 35px;
    }
  }
  &__total-name {
    color: var(--black50);
    text-transform: uppercase;
  }
  &__total {
    font-size: 1.2rem;
    font-weight: 700;
    &--grand {
      color: var(--orange);
    }
  }
}
</style>
