<script setup></script>

<template>
  <section class="section hero">
    <div class="container hero__container">
      <div class="hero__wrapper">
        <h1 class="hero__title">Bring everyone together to build better products.</h1>
        <p class="hero__descr">
          Manage makes it simple for software teams to plan day-to-day tasks while keeping the
          larger team goals in view.
        </p>
        <Button class="main-btn" label="Get Started" />
      </div>
      <picture class="hero__img">
        <img
          src="/assets/images/illustration-intro.svg"
          alt="Manage intro illustration"
          width="579"
          height="524"
        />
      </picture>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.hero {
  padding-top: 53px;
  padding-bottom: 53px;
  &__container {
    display: flex;
    padding-right: 146px;
    gap: 20px;
    justify-content: space-between;
  }
  &__wrapper {
    display: flex;
    max-width: 530px;
    padding: 64px 0;
    flex-direction: column;
  }
  &__title {
    margin-bottom: 28px;
    font-size: 2.85rem;
    line-height: 3.6rem;
    color: var(--dark-blue);
  }
  &__descr {
    margin-bottom: 36px;
    max-width: 340px;
    font-size: 0.87rem;
    line-height: 1.5rem;
  }
  &__img {
    align-self: center;
    min-width: 450px;
  }
}

@media (max-width: 1200px) {
  .hero {
    &__container {
      padding-right: 80px;
    }
    &__img {
      min-width: 400px;
    }
  }
}

@media (max-width: 1024px) {
  .hero {
    &__container {
      flex-direction: column;
      align-items: center;
    }
    &__img {
      order: -1;
    }
    &__wrapper {
      max-width: 750px;
      text-align: center;
      align-items: center;
    }
    &__descr {
      max-width: 500px;
    }
  }
}

@media (max-width: 768px) {
  .hero {
    padding-top: 6px;
    padding-bottom: 33px;
    &__container {
      padding-right: 24px;
      padding-left: 24px;
      gap: 7px;
    }
    &__img {
      min-width: initial;
      width: 341px;
    }
    &__wrapper {
      padding: 0;
    }
    &__title {
      margin-bottom: 5px;
      font-size: 2rem;
      line-height: 2.8rem;
    }
    &__descr {
      margin-bottom: 29px;
    }
  }
}
</style>
