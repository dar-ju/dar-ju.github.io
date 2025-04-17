<script setup>
import { ref, onBeforeMount, watch } from 'vue'

const emit = defineEmits('')

const props = defineProps({
  formData: {},
})

const periodCheck = ref(false)

const plan = ref('')
const period = ref('')
const selectPlan = (value) => {
  plan.value = value
}

watch(periodCheck, (newVal) => {
  period.value = newVal ? 'yearly' : 'monthly'
})

const billingSet = (item) => {
  if (period.value === 'monthly') return `$${props.formData.billing.monthly[item]}/mo`
  if (period.value === 'yearly') return `$${props.formData.billing.yearly[item]}/yr`
}

// send data to app
const submit = (direction) => {
  emit(
    'data',
    {
      plan: plan.value,
      period: period.value,
    },
    direction,
    'step2',
  )
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onBeforeMount(() => {
  plan.value = props.formData.step2.plan || 'arcade'
  period.value = props.formData.step2.period || 'monthly'
  periodCheck.value = props.formData.step2.period === 'yearly' // toggle set
})
</script>

<template>
  <section v-if="props" class="step step2">
    <Form class="step-form step2-form">
      <div class="step-form__fields">
        <h2 class="step__title">Select your plan</h2>
        <p class="step__descr">You have the option of monthly or yearly billing.</p>
        <div class="step2-form__wrapper">
          <ul class="step2-form__plan-list">
            <li
              class="step2-form__plan-item step2-form__plan-item_arcade"
              :class="{ 'step2-form__plan-item_selected': plan === 'arcade' }"
              :style="minHeight"
              @click="selectPlan('arcade')"
            >
              <div class="step2-form__plan-block">
                <h3 class="step2-form__plan-title">Arcade</h3>
                <span class="step2-form__plan-price">{{ billingSet('arcade') }}</span>
                <span class="step2-form__plan-period-free" v-show="periodCheck">2 months free</span>
              </div>
            </li>
            <li
              class="step2-form__plan-item step2-form__plan-item_advanced"
              :class="{ 'step2-form__plan-item_selected': plan === 'advanced' }"
              @click="selectPlan('advanced')"
            >
              <div class="step2-form__plan-block">
                <h3 class="step2-form__plan-title">Advanced</h3>
                <span class="step2-form__plan-price">{{ billingSet('advanced') }}</span>
                <span class="step2-form__plan-period-free" v-show="periodCheck">2 months free</span>
              </div>
            </li>
            <li
              class="step2-form__plan-item step2-form__plan-item_pro"
              @click="selectPlan('pro')"
              :class="{ 'step2-form__plan-item_selected': plan === 'pro' }"
            >
              <div class="step2-form__plan-block">
                <h3 class="step2-form__plan-title">Pro</h3>
                <span class="step2-form__plan-price">{{ billingSet('pro') }}</span>
                <span class="step2-form__plan-period-free" v-show="periodCheck">2 months free</span>
              </div>
            </li>
          </ul>
          <div class="step2-form__toggle-wrapper">
            <span
              class="step2-form__period"
              :class="{ 'step2-form__period-selected': period === 'monthly' }"
              >Monthly</span
            >
            <ToggleSwitch class="step2-form__toggle" v-model="periodCheck" />
            <span
              class="step2-form__period"
              :class="{ 'step2-form__period-selected': period === 'yearly' }"
              >Yearly</span
            >
          </div>
        </div>
      </div>
      <div class="btn-wrapper step2-form__btn-wrapper">
        <a class="cancel-btn" type="button" @click="submit('prev')">Go Back</a>
        <Button class="submit-btn" type="button" label="Next Step" @click="submit('next')" />
      </div>
    </Form>
  </section>
</template>

<style lang="scss" scope>
.step2 {
  max-width: 524px;
  padding: 40px 29px 15px 45px;
}
.step2-form {
  height: 100%;
  justify-content: space-between;
  &__plan-list {
    display: flex;
    margin-bottom: 30px;
    gap: 20px;
  }
  &__plan-item {
    display: flex;
    width: calc((100% - 33px) / 3);
    min-height: 162px;
    padding: 17px 15px;
    border: 1px solid var(--cool-gray);
    border-radius: 10px;
    background-repeat: no-repeat;
    background-position: top 20px left 16px;
    transition:
      border ease-in-out 0.3s,
      background-color ease-in-out 0.3s;
    cursor: pointer;
    &_arcade {
      background-image: url('/assets/images/icon-arcade.svg');
    }
    &_advanced {
      background-image: url('/assets/images/icon-advanced.svg');
    }
    &_pro {
      background-image: url('/assets/images/icon-pro.svg');
    }
    &_selected {
      background-color: var(--alabaster);
      border: 1px solid var(--purple);
    }
    &:hover {
      border: 1px solid var(--purple);
    }
  }
  &__plan-block {
    display: flex;
    padding-top: 87px;
    gap: 6px;
    flex-direction: column;
  }
  &__plan-title {
    font-size: 1rem;
    color: var(--marine-blue);
  }
  &__plan-price {
    display: block;
    font-size: 0.85rem;
    color: var(--cool-gray);
  }
  &__plan-period-free {
    display: block;
    font-size: 0.75rem;
    color: var(--marine-blue);
    font-weight: 500;
  }
  &__period {
    font-size: 0.9rem;
  }
  &__toggle-wrapper {
    display: flex;
    padding: 15px 0;
    gap: 20px;
    align-items: center;
    justify-content: center;
    color: var(--cool-gray);
    font-weight: 500;
    background-color: var(--magnolia);
    border-radius: 10px;
  }
  &__toggle .p-toggleswitch-slider {
    background-color: var(--marine-blue) !important;
  }
  &__period-selected {
    color: var(--marine-blue);
    transition: color ease-in-out 0.3s;
  }
}

@media (max-width: 768px) {
  .step2 {
    padding: 0;
  }
  .step2-form {
    gap: 22px;
    align-items: center;
    &__plan-list {
      margin-bottom: 23px;
      gap: 11px;
      flex-direction: column;
    }
    &__plan-item {
      min-height: 78px;
      width: 100%;
      background-position: top 17px left 14px;
    }
    &__plan-block {
      padding-top: 0;
      padding-left: 53px;
      justify-content: flex-start;
    }
    &__toggle-wrapper {
      gap: 24px;
    }
    &__period {
      font-size: 0.85rem;
    }
    &__btn-wrapper {
      justify-content: space-between;
    }
  }
}
</style>
