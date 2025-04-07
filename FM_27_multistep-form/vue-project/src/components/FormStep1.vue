<script setup>
import { onMounted, ref, defineEmits } from 'vue'
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
      username: z.string().min(1, { message: 'This field is required.' }),
      email: z
        .string()
        .min(1, { message: 'Email is required.' })
        .email({ message: 'Invalid email address.' }),
      phone: z.string().min(1, { message: 'This field is required.' }),
    })
  )
)

const onFormSubmit = ({ valid }) => {
  if (valid) {
    const step1 = {
      name: username.value,
      email: email.value,
      phone: phone.value,
    }
    localStorage.setItem('multiForm', JSON.stringify(step1))
    emit('formStep1Done')
    // toast.add({ severity: 'success', summary: 'Form is submitted.', life: 3000 });
  }
}

onMounted(() => {
  if (localStorage.getItem('multiForm')) {
    username.value = JSON.parse(localStorage.getItem('multiForm')).name
    email.value = JSON.parse(localStorage.getItem('multiForm')).email
    phone.value = JSON.parse(localStorage.getItem('multiForm')).phone
  }
})
</script>

<template>
  <section class="step1">
    <h2 class="step1__title">Personal info</h2>
    <p class="step1__descr">Please provide your name, email address, and phone number.</p>
    <Form
      v-slot="$form"
      :resolver="resolver"
      :initialValues="initialValues"
      @submit="onFormSubmit"
      class="step1__form"
    >
      <div class="step1__form-item">
        <div class="step1__form-wrapper">
          <label class="step1__form-label" for="username">Name</label>
          <Message v-if="$form.username?.invalid" severity="error" size="small" variant="simple">{{
            $form.username.error?.message
          }}</Message>
        </div>
        <InputText
          class="step1__form-input"
          id="username"
          name="username"
          type="text"
          placeholder="e.g. Stephen King"
          fluid
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
          fluid
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
      <Button type="submit" severity="secondary" label="Next Step" />
    </Form>
  </section>
</template>

<style lang="scss" scoped>
.step1 {
  width: 450px;
  padding: 40px 0;
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
    width: 100%;
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
}
</style>
