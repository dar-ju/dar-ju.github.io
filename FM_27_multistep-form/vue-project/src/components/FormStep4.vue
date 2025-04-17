<script setup>
const emit = defineEmits('')

const props = defineProps({
  formData: {},
})

const submit = (direction) => {
  emit('data', {}, direction, 'step4')
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const billingSet = (item) => {
  if (props.formData.step2.period === 'monthly')
    return `$${props.formData.billing.monthly[item]}/mo`
  if (props.formData.step2.period === 'yearly') return `$${props.formData.billing.yearly[item]}/yr`
}

const addOnsSet = (item) => {
  if (props.formData.step2.period === 'monthly')
    return `+$${props.formData.addOns.monthly[item]}/mo`
  if (props.formData.step2.period === 'yearly') return `+$${props.formData.addOns.yearly[item]}/yr`
}

const periodTransform = () => {
  if (props.formData.step2.period === 'monthly') return 'month'
  if (props.formData.step2.period === 'yearly') return 'year'
}

const total = () => {
  const period = props.formData.step2.period
  const plan = props.formData.step2.plan
  const planBilling = props.formData.billing[period][plan]
  const addOns = props.formData.step3.options
  const addOnsBilling = addOns.reduce((acc, val) => acc + props.formData.addOns[period][val], 0)
  const summ = planBilling + addOnsBilling
  if (period === 'monthly') return `$${summ}/mo`
  if (period === 'yearly') return `$${summ}/yr`
}

const capitalLetter = (val) => {
  return val[0].toUpperCase() + val.slice(1)
}
</script>

<template>
  <section class="step step4">
    <div class="step-form__fields step4-form__fields">
      <h2 class="step__title">Finishing up</h2>
      <p class="step__descr">Double-check everything looks OK before confirming.</p>
      <div class="step4-form__summary">
        <div class="step4-form__plan-total">
          <div class="step4-form__plan-wrap">
            <h3 class="step4-form__title">
              {{
                `${capitalLetter(props.formData.step2.plan)} (${capitalLetter(props.formData.step2.period)})`
              }}
            </h3>
            <a class="step4-form__change" @click="submit('change')">Change</a>
          </div>
          <span class="step4-form__cost">{{ billingSet(props.formData.step2.plan) }}</span>
        </div>
        <ul class="step4-form__list">
          <li class="step4-form__item" v-for="item in props.formData.step3.options" :key="item">
            <span class="step4-form__item-name">{{ item }}</span>
            <span class="step4-form__item-cost">{{ addOnsSet(item) }}</span>
          </li>
        </ul>
      </div>
      <div class="step4-form__total">
        <span class="step4-form__total-name">{{ `Total (per ${periodTransform()})` }}</span>
        <span class="step4-form__total-cost">{{ total() }}</span>
      </div>
    </div>
    <div class="btn-wrapper step4-form__btn-wrapper">
      <a class="cancel-btn" type="button" @click="submit('prev')">Go Back</a>
      <Button
        class="submit-btn step4-form__submit-btn"
        type="button"
        label="Confirm"
        @click="submit('next')"
      />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.step4 {
  max-width: 524px;
  padding: 40px 29px 15px 45px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.step4-form {
  &__summary {
    margin-bottom: 4px;
    padding: 20px 25px;
    background-color: var(--alabaster);
    border-radius: 10px;
  }
  &__plan-total {
    display: flex;
    padding-bottom: 25px;
    margin-bottom: 18px;
    border-bottom: 1px solid var(--light-gray);
    align-items: center;
    justify-content: space-between;
  }
  &__title {
    margin-bottom: 4px;
    font-size: 0.99rem;
    font-weight: 500;
    color: var(--marine-blue);
  }
  &__change {
    font-size: 0.85rem;
    text-decoration: underline;
    color: var(--cool-gray);
    cursor: pointer;
  }
  &__cost {
    font-weight: 500;
    color: var(--marine-blue);
  }
  &__list {
    display: flex;
    margin-bottom: 7px;
    gap: 20px;
    flex-direction: column;
  }
  &__item {
    display: flex;
    justify-content: space-between;
    font-size: 0.86rem;
    color: var(--cool-gray);
  }
  &__item-cost {
    color: var(--marine-blue);
  }
  &__total {
    display: flex;
    padding: 20px 25px;
    align-items: center;
    justify-content: space-between;
  }
  &__total-name {
    font-size: 0.86rem;
    color: var(--cool-gray);
  }
  &__total-cost {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--purplish-blue);
  }
  &__submit-btn {
    background-color: var(--purplish-blue);
  }
}

@media (max-width: 768px) {
  .step4 {
    padding: 0;
    gap: 159px;
  }
  .step4-form {
    &__fields {
      padding-bottom: 13px;
    }
    &__summary {
      padding: 20px 15px;
    }
    &__plan-total {
      margin-bottom: 15px;
      padding-bottom: 13px;
    }
    &__title {
      margin-bottom: 0;
      font-size: 0.87rem;
    }
    &__cost {
      font-size: 0.88rem;
    }
    &__list {
      margin-bottom: 0px;
      gap: 16px;
    }
    &__total {
      padding: 19px 15px;
    }
    &__total-name {
      font-size: 0.89rem;
    }
    &__total-cost {
      font-size: 1rem;
    }
    &__btn-wrapper {
      justify-content: space-between;
    }
  }
}
</style>
