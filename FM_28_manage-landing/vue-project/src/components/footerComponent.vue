<script setup>
import { ref } from 'vue'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { useToast } from 'primevue/usetoast'
import { z } from 'zod'

const toast = useToast()
const formRef = ref(null)
const initialValues = ref({
  email: '',
})

const resolver = ref(
  zodResolver(
    z.object({
      email: z
        .string()
        .min(1, { message: 'Email is required.' })
        .email({ message: 'Please insert a valid email' }),
    }),
  ),
)

const onFormSubmit = ({ valid }) => {
  if (valid) {
    toast.add({ severity: 'success', summary: 'Email sent. Thanks!', life: 4000 })
    formRef.value.reset()
  }
}
</script>

<template>
  <section class="section footer">
    <div class="container footer__container">
      <div class="footer__wrapper">
        <div class="footer__link-block">
          <div class="footer__contact">
            <a class="footer__logo" href="#"
              ><img src="/assets/images/logo-light.svg" alt="Manage light logo"
            /></a>
            <ul class="footer__social-list">
              <li class="footer__social-item">
                <a href="#"
                  ><img src="/assets/images/icon-facebook.svg" alt="Facebook social link"
                /></a>
              </li>
              <li class="footer__social-item">
                <a href="#"
                  ><img src="/assets/images/icon-youtube.svg" alt="Youtube social link"
                /></a>
              </li>
              <li class="footer__social-item">
                <a href="#"
                  ><img src="/assets/images/icon-twitter.svg" alt="Twitter social link"
                /></a>
              </li>
              <li class="footer__social-item">
                <a href="#"
                  ><img src="/assets/images/icon-pinterest.svg" alt="Pinterest social link"
                /></a>
              </li>
              <li class="footer__social-item">
                <a href="#"
                  ><img src="/assets/images/icon-instagram.svg" alt="Instagram social link"
                /></a>
              </li>
            </ul>
          </div>
          <div class="footer__menu">
            <ul class="footer__list">
              <li class="footer__item"><a href="#">Home</a></li>
              <li class="footer__item"><a href="#">Pricing</a></li>
              <li class="footer__item"><a href="#">Products</a></li>
              <li class="footer__item"><a href="#">About Us</a></li>
            </ul>
            <ul class="footer__list">
              <li class="footer__item"><a href="#">Careers</a></li>
              <li class="footer__item"><a href="#">Community</a></li>
              <li class="footer__item"><a href="#">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div class="footer__subscribe-block">
          <Form
            v-slot="$form"
            ref="formRef"
            :resolver="resolver"
            :initialValues="initialValues"
            @submit="onFormSubmit"
            class="footer__form"
          >
            <div class="footer__input-block">
              <InputText
                class="footer__input"
                name="email"
                type="text"
                placeholder="Updates in your inbox..."
                fluid
              />
              <Message
                class="footer__input-message"
                v-if="$form.email?.invalid"
                severity="error"
                size="small"
                variant="simple"
                >{{ $form.email.error?.message }}</Message
              >
            </div>
            <Button class="footer__btn" type="submit" label="Go" />
          </Form>
          <span class="footer__copy">Copyright 2020. All Rights Reserved</span>
        </div>
        <!-- <h2 class="footer__title">Simplify how your team works today.</h2>
        <Button class="main-btn footer__btn" label="Get Started" /> -->
      </div>
    </div>
    <Toast />
  </section>
</template>

<style lang="scss" scoped>
.footer {
  padding: 0;
  &__container {
    max-width: 100%;
    padding: 63px 0;
    background-color: var(--very-dark-blue);
  }
  &__wrapper {
    display: flex;
    max-width: 1440px;
    margin: auto;
    padding-left: 171px;
    padding-right: 166px;
    gap: 60px;
    align-items: center;
    justify-content: space-between;
  }
  &__link-block {
    display: flex;
    width: 660px;
    gap: 80px;
    // flex-grow: 1;
    justify-content: space-between;
  }
  &__contact {
    min-width: 155px;
  }
  &__logo {
    display: block;
    margin-bottom: 84px;
  }
  &__social-list {
    display: flex;
    gap: 13px;
  }
  &__social-item {
    &:hover {
      filter: brightness(0) saturate(100%) invert(56%) sepia(28%) saturate(6790%) hue-rotate(337deg)
        brightness(96%) contrast(97%);
    }
  }
  &__menu {
    display: flex;
    width: 100%;
    max-width: 380px;
    min-width: 210px;
    justify-content: space-between;
  }
  &__list {
    display: flex;
    flex-direction: column;
    gap: 19px;
  }
  &__item {
    font-size: 0.77rem;
    color: var(--very-light-gray);
    transition: color ease-in-out 0.2s;
    &:hover {
      color: var(--bright-red);
    }
  }
  &__subscribe-block {
    display: flex;
    flex-direction: column;
    gap: 64px;
    align-self: flex-start;
  }
  &__form {
    display: flex;
    gap: 9px;
  }
  &__input-block {
    position: relative;
    width: 200px;
    border-radius: 20px;
  }
  &__input {
    &::placeholder {
      font-size: 0.7rem;
      color: var(--dark-grayish-blue);
    }
  }
  &__input-message {
    position: absolute;
    left: 10px;
    bottom: -23px;
  }
  &__btn {
    width: 62px;
    height: 45px;
  }
  &__copy {
    font-size: 0.67rem;
    text-align: end;
  }
}
</style>
