<script setup>
import { onBeforeMount, ref } from 'vue'

const emit = defineEmits('')

const props = defineProps({
  formData: {},
})

const selected = ref([])

const billingSet = (item) => {
  if (props.formData.step2.period === 'monthly')
    return `+$${props.formData.addOns.monthly[item]}/mo`
  if (props.formData.step2.period === 'yearly') return `+$${props.formData.addOns.yearly[item]}/yr`
}

const submit = (direction) => {
  emit(
    'data',
    {
      options: selected.value,
    },
    direction,
    'step3',
  )
}

onBeforeMount(() => {
  // const local = JSON.parse(localStorage.getItem('multiForm') || '{}')
  selected.value = props.formData.step3.options || ''
})
</script>

<template>
  <section class="step step3">
    <h2 class="step__title">Pick add-ons</h2>
    <p class="step__descr">Add-ons help enhance your gaming experience.</p>
    <Form class="step3-form">
      <CheckboxGroup v-model="selected" name="options" class="step3-form__wrapper">
        <label
          :class="{ 'step3-form__item_active': selected.includes('sevice') }"
          class="step3-form__item"
          for="sevice"
        >
          <Checkbox class="step3-form__check" inputId="sevice" value="sevice" />
          <div class="step3-form__label">
            <div class="step3-form__wrap">
              <h3 class="step3-form__name">Online service</h3>
              <span class="step3-form__descr">Access to multiplayer games</span>
            </div>
            <span class="step3-form__cost">{{ billingSet('service') }}</span>
          </div>
        </label>
        <label
          class="step3-form__item"
          :class="{ 'step3-form__item_active': selected.includes('storage') }"
          for="storage"
        >
          <Checkbox class="step3-form__check" inputId="storage" value="storage" />
          <div class="step3-form__label">
            <div class="step3-form__wrap">
              <h3 class="step3-form__name">Larger storage</h3>
              <span class="step3-form__descr">Extra 1TB of cloud save</span>
            </div>
            <span class="step3-form__cost">{{ billingSet('storage') }}</span>
          </div>
        </label>
        <label
          class="step3-form__item"
          :class="{ 'step3-form__item_active': selected.includes('profile') }"
          for="profile"
        >
          <Checkbox class="step3-form__check" inputId="profile" value="profile" />
          <div class="step3-form__label">
            <div class="step3-form__wrap">
              <h3 class="step3-form__name">Customizable Profile</h3>
              <span class="step3-form__descr">Custom theme on your profile</span>
            </div>
            <span class="step3-form__cost">{{ billingSet('profile') }}</span>
          </div>
        </label>
      </CheckboxGroup>
      <div class="step2-form__btn-wrapper">
        <a class="cancel-btn" type="button" @click="submit('prev')">Go Back</a>
        <Button
          class="submit-btn step2-form__submit-btn"
          type="button"
          label="Next Step"
          @click="submit('next')"
        />
      </div>
    </Form>
  </section>
</template>

<style lang="scss" scope>
.step3 {
  padding: 40px 32px 16px 47px;
}

.step3-form {
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  &__wrapper {
    display: flex;
    gap: 13px;
    flex-direction: column;
  }
  &__item {
    display: flex;
    padding: 21px 24px;
    align-items: center;
    border: 1px solid var(--cool-gray);
    border-radius: 10px;
    transition:
      border ease-in-out 0.3s,
      background-color ease-in-out 0.3s;
    cursor: pointer;
    &_active {
      background-color: var(--magnolia);
      border: 1px solid var(--purple);
    }
    &:hover {
      border: 1px solid var(--purple);
    }
  }
  &__check {
    margin-right: 24px;
  }
  &__label {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
  }
  &__name {
    margin-bottom: 3px;
    font-size: 0.99rem;
    font-weight: 500;
    color: var(--marine-blue);
  }
  &__descr {
    font-size: 0.88rem;
    color: var(--cool-gray);
  }
  &__cost {
    font-size: 0.86rem;
    font-weight: 500;
    color: var(--purplish-blue);
  }
}
</style>
