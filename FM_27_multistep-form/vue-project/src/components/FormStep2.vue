<script setup>
import { ref } from 'vue'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { z } from 'zod'

const initialValues = ref({
  activation: false,
})
// const resolver = ref(
//   zodResolver(
//     z.object({
//       activation: z.boolean().refine((val) => val === true, { message: 'Activation is required.' }),
//     })
//   )
// )
</script>

<template>
  <section class="step step2">
    <h2 class="step__title">Select your plan</h2>
    <p class="step__descr">You have the option of monthly or early billing.</p>
    <Form
      :resolver="resolver"
      :initialValues="initialValues"
      @submit="onFormSubmit"
      class="step2-form"
    >
      <ul class="step2-form__plan-list">
        <li class="step2-form__plan-item">
          <div class="step2-form__plan-block">
            <h3 class="step2-form__plan-title">Arcade</h3>
            <span class="step2-form__plan-price">$9/mo</span>
            <span class="step2-form__plan-period-free">2 months free</span>
          </div>
        </li>
      </ul>
      <div class="flex flex-col items-center gap-2">
        <ToggleSwitch name="activation" />
        <!-- <Message v-if="$form.activation?.invalid" severity="error" size="small" variant="simple">{{
          $form.activation.error?.message
        }}</Message> -->
      </div>
      <Button type="submit" severity="secondary" label="Submit" />
    </Form>
  </section>
</template>

<style lang="scss" scope>
.step2 {
  padding: 40px 50px 16px;
}
.step2-form {
  &__plan-list {
    display: flex;
    margin-bottom: 30px;
    gap: 20px;
  }
  &__plan-item {
    display: flex;
    min-height: 162px;
    padding: 15px 18px;
    border: 1px solid var(--cool-gray);
    border-radius: 10px;
    background: url('./src/assets/images/icon-arcade.svg') no-repeat top 20px left 16px;
  }
  &__plan-block {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }
  &__plan-title {
  }
  &__plan-price {
    display: block;
  }
  &__plan-period-free {
    display: block;
  }
}
</style>
