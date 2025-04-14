<script setup lang="ts"></script>

<template>
  <section class="step thank">
    <img class="thank__image" src="../assets/images/icon-thank-you.svg" alt="" />
    <h2 class="thank__title">Thank you!</h2>
    <p class="thank__descr">
      Thanks for confirming your subscription! We&nbsp;hope you have fun using our platform.
      If&nbsp;you ever need support, please feel free to&nbsp;email&nbsp;us at&nbsp;<a
        href="mailto:support@loremgaming.com"
        >support@loremgaming.com</a
      >.
    </p>
  </section>
</template>

<style lang="scss" scoped>
.thank {
  margin: auto;
  padding: 0 39px 0 50px;
  align-items: center;
  &__image {
    margin-bottom: 30px;
  }
  &__title {
    margin-bottom: 15px;
    font-size: 2rem;
    color: var(--marine-blue);
  }
  &__descr {
    text-align: center;
    line-height: 1.5rem;
    color: var(--cool-gray);
  }
}
</style>
