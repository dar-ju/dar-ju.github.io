<script setup lang="ts"></script>

<template>
  <section class="step thank">
    <div class="step-form__fields step5-form__fields">
      <img class="thank__image" src="/assets/images/icon-thank-you.svg" alt="" />
      <h2 class="thank__title">Thank you!</h2>
      <p class="thank__descr">
        Thanks for confirming your subscription! We&nbsp;hope you have fun using our platform.
        If&nbsp;you ever need support, please feel free to&nbsp;email&nbsp;us at
        <a href="mailto:support@loremgaming.com">support@loremgaming.com</a>.
      </p>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.thank {
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

.step5-form {
  &__fields {
    margin: auto;
    padding: 80px 20px;
    align-items: center;
  }
}

@media (max-width: 768px) {
  .thank {
    padding: 0 15px;
    &__image {
      width: 55px;
      margin-bottom: 23px;
    }
    &__title {
      margin-bottom: 12px;
      font-size: 1.5rem;
    }
    &__descr {
      line-height: 1.55rem;
    }
  }
}
</style>
