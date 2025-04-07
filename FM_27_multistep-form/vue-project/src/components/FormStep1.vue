<script setup>
import { onBeforeMount, ref, defineEmits } from 'vue'
import { zodResolver } from '@primevue/forms/resolvers/zod'
// import { useToast } from "primevue/usetoast";
import { z } from 'zod'

const emit = defineEmits('')

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
    const step1 = {
      name: username.value,
      email: email.value,
      phone: phone.value,
    }
    localStorage.setItem('multiForm', JSON.stringify(step1))
    emit('formStepDone')
    // toast.add({ severity: 'success', summary: 'Form is submitted.', life: 3000 });
  }
}

onBeforeMount(() => {
  const local = JSON.parse(localStorage.getItem('multiForm') || '{}')
  initialValues.value.username = local.name || ''
  initialValues.value.email = local.email || ''
  initialValues.value.phone = local.phone || ''
})
</script>

<template>
  <section class="step1">
    <h2 class="step1__title">Personal info</h2>
    <p class="step1__descr">Please provide your name, email address, and phone number.</p>
    <Form
      v-slot="$form"
      :initialValues="initialValues"
      :resolver="resolver"
      @submit="onFormSubmit"
      class="step1__form"
    >
      <div class="step1__form-fields">
        <div class="step1__form-item">
          <div class="step1__form-wrapper">
            <label class="step1__form-label" for="username">Name</label>
            <Message
              v-if="$form.username?.invalid"
              severity="error"
              size="small"
              variant="simple"
              >{{ $form.username.error?.message }}</Message
            >
          </div>
          <InputText
            class="step1__form-input"
            id="username"
            name="username"
            type="text"
            placeholder="e.g. Stephen King"
          />
        </div>
        <div class="step1__form-item">
          <div class="step1__form-wrapper">
            <label class="step1__form-label" for="email">Email Address</label>
            <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">{{
              $form.email.error?.message
            }}</Message>
          </div>
          <InputText
            class="step1__form-input"
            id="email"
            name="email"
            type="text"
            placeholder="e.g. stephenking@lorem.com"
          />
        </div>
        <div class="step1__form-item">
          <div class="step1__form-wrapper">
            <label class="step1__form-label" for="phone">Phone Number</label>
            <Message v-if="$form.phone?.invalid" severity="error" size="small" variant="simple">{{
              $form.phone.error?.message
            }}</Message>
          </div>
          <InputMask
            class="step1__form-input"
            id="phone"
            name="phone"
            mask="+9 999 999 999"
            placeholder="e.g. +1 234 567 890"
          />
        </div>
      </div>
      <Button class="step1__form-submit-btn" type="submit" label="Next Step" />
    </Form>
  </section>
</template>

<style lang="scss" scoped>
.step1 {
  display: flex;
  width: 450px;
  padding: 40px 0 16px;
  flex-direction: column;
  &__title {
    margin-bottom: 12px;
    font-size: 2rem;
    color: var(--marine-blue);
  }
  &__descr {
    margin-bottom: 40px;
  }
  &__form {
    display: flex;
    // height: 100%;
    flex-direction: column;
    justify-content: space-between;
    flex-grow: 1;
    // & > div:last-of-type {
    //   margin-bottom: 55px;
    // }
  }
  &__form-fields {
    display: flex;
    // height: 100%;
    flex-direction: column;
    gap: 23px;
  }
  &__form-item {
    display: flex;
    gap: 9px;
    flex-direction: column;
  }
  &__form-wrapper {
    display: flex;
    justify-content: space-between;
  }
  &__form-label {
    font-size: 0.87rem;
    color: var(--marine-blue);
  }
  &__form-input {
    min-height: 48px;
    &::placeholder {
      font-size: 1.05rem;
      color: var(--cool-gray);
    }
  }
  &__form-submit-btn {
    min-width: 124px;
    height: 50px;
    justify-self: flex-end;
    align-self: flex-end;
    // color: var(--white);
    // background-color: var(--marine-blue);
  }
}
</style>
