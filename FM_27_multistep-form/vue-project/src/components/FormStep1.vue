<script setup>
import { onBeforeMount, ref, defineEmits, onMounted } from 'vue'
import { zodResolver } from '@primevue/forms/resolvers/zod'
// import { useToast } from "primevue/usetoast";
import { z } from 'zod'

const emit = defineEmits('')

const props = defineProps({
  formData: {},
})

// const toast = useToast();
const initialValues = ref({
  username: '',
  email: '',
  phone: '',
})

const resolver = ref(
  zodResolver(
    z.object({
      username: z.string().min(1, { message: 'This field is required' }),
      email: z
        .string()
        .min(1, { message: 'Email is required' })
        .email({ message: 'Invalid email address' }),
      phone: z.string().min(1, { message: 'This field is required' }),
    }),
  ),
)

const onFormSubmit = ({ valid }) => {
  if (valid) {
    emit(
      'data',
      {
        name: username.value,
        email: email.value,
        phone: phone.value,
      },
      'next',
      'step1',
    )
  }
}

onBeforeMount(() => {
  initialValues.value.username = props.formData.step1.name || ''
  initialValues.value.email = props.formData.step1.email || ''
  initialValues.value.phone = props.formData.step1.phone || ''
})
// onBeforeMount(() => {
//   const local = JSON.parse(localStorage.getItem('multiForm') || '{}')
//   initialValues.value.username = local.step1?.name || ''
//   initialValues.value.email = local.step1?.email || ''
//   initialValues.value.phone = local.step1?.phone || ''
// })
</script>

<template>
  <section class="step">
    <h2 class="step__title">Personal info</h2>
    <p class="step__descr">Please provide your name, email address, and phone number.</p>
    <Form
      v-slot="$form"
      :initialValues="initialValues"
      :resolver="resolver"
      @submit="onFormSubmit"
      class="step1-form"
    >
      <div class="step1-form__fields">
        <div class="step1-form__item">
          <div class="step1-form__wrapper">
            <label class="step1-form__label" for="username">Name</label>
            <Message
              v-if="$form.username?.invalid"
              severity="error"
              size="small"
              variant="simple"
              >{{ $form.username.error?.message }}</Message
            >
          </div>
          <InputText
            class="step1-form__input"
            id="username"
            name="username"
            type="text"
            placeholder="e.g. Stephen King"
          />
        </div>
        <div class="step1-form__item">
          <div class="step1-form__wrapper">
            <label class="step1-form__label" for="email">Email Address</label>
            <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">{{
              $form.email.error?.message
            }}</Message>
          </div>
          <InputText
            class="step1-form__input"
            id="email"
            name="email"
            type="text"
            placeholder="e.g. stephenking@lorem.com"
          />
        </div>
        <div class="step1-form__item">
          <div class="step1-form__wrapper">
            <label class="step1-form__label" for="phone">Phone Number</label>
            <Message v-if="$form.phone?.invalid" severity="error" size="small" variant="simple">{{
              $form.phone.error?.message
            }}</Message>
          </div>
          <InputMask
            class="step1-form__input"
            id="phone"
            name="phone"
            mask="+9 999 999 999"
            placeholder="e.g. +1 234 567 890"
          />
        </div>
      </div>
      <Button class="submit-btn" type="submit" label="Next Step" />
    </Form>
  </section>
</template>

<style lang="scss" scoped>
.step1-form {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
  &__fields {
    display: flex;
    // height: 100%;
    flex-direction: column;
    gap: 23px;
  }
  &__item {
    display: flex;
    gap: 9px;
    flex-direction: column;
  }
  &__wrapper {
    display: flex;
    justify-content: space-between;
  }
  &__label {
    font-size: 0.87rem;
    color: var(--marine-blue);
  }
  &__input {
    min-height: 48px;
    &::placeholder {
      font-size: 1.05rem;
      color: var(--cool-gray);
    }
  }
  &__submit-btn {
    // min-width: 124px;
    // height: 50px;
    // justify-self: flex-end;
    // align-self: flex-end;
    // color: var(--white);
    // background-color: var(--marine-blue);
  }
}
</style>
