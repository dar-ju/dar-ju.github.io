<script setup></script>

<template>
  <section class="section action">
    <div class="container action__container">
      <svg
        class="action__bg action__bg_1"
        xmlns="http://www.w3.org/2000/svg"
        width="814"
        height="814"
      >
        <rect
          width="436"
          height="970"
          x="774"
          y="-62"
          fill="#FFF0EC"
          fill-rule="evenodd"
          rx="218"
          transform="rotate(45 718.814 -291.157)"
        />
      </svg>
      <div class="action__wrapper">
        <h2 class="action__title">Simplify how your team works today.</h2>
        <Button class="main-btn action__btn" severity="secondary" label="Get Started" />
      </div>
      <svg
        class="action__bg action__bg_2"
        xmlns="http://www.w3.org/2000/svg"
        width="814"
        height="814"
      >
        <rect
          width="436"
          height="970"
          x="774"
          y="-62"
          fill="#FFF0EC"
          fill-rule="evenodd"
          rx="218"
          transform="rotate(45 718.814 -291.157)"
        />
      </svg>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.action {
  padding-top: 87px;
  padding-bottom: 0;
  &__container {
    position: relative;
    max-width: 100%;
    padding: 68px 0;
    background-color: var(--bright-red);
    overflow: hidden;
  }
  &__wrapper {
    display: flex;
    max-width: 1440px;
    margin: auto;
    align-items: center;
    justify-content: space-between;
    padding-left: 165px;
    padding-right: 161px;
  }
  &__title {
    width: 450px;
    font-size: 2.06rem;
    color: var(--very-light-gray);
  }
  &__btn {
    max-height: 48px;
    background-color: var(--very-light-gray);
    color: var(--bright-red);
    z-index: 1;
    &:hover {
      background-color: var(--very-light-gray) !important;
      color: var(--bright-red-light) !important;
    }
    // &:active {
    //   background-color: var(--very-light-gray);
    //   color: var(--bright-red-light);
    // }
  }
  &__bg {
    position: absolute;
    opacity: 0.06;
    scale: 0.7;
    overflow: hidden;
    &_1 {
      top: -167px;
      left: 47px;
    }
    &_2 {
      top: -548px;
      right: -466px;
    }
  }
}
</style>
