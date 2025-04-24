<script setup></script>

<template>
  <section class="section about">
    <div class="container about__container">
      <div class="about__info">
        <h2 class="about__title">What’s different about Manage?</h2>
        <p class="about__descr">
          Manage provides all the functionality your team needs, without the complexity. Our
          software is tailor-made for modern digital product teams.
        </p>
      </div>
      <ul class="about__list">
        <li class="about__item">
          <h3 class="about__item-title about__item-title_1">Track company-wide progress</h3>
          <p class="about__item-descr">
            See how your day-to-day tasks fit into the wider vision. Go from tracking progress at
            the milestone level all the way done to the smallest of details. Never lose sight of the
            bigger picture again.
          </p>
        </li>
        <li class="about__item">
          <h3 class="about__item-title about__item-title_2">Advanced built-in reports</h3>
          <p class="about__item-descr">
            Set internal delivery estimates and track progress toward company goals. Our
            customisable dashboard helps you build out the reports you need to keep key stakeholders
            informed.
          </p>
        </li>
        <li class="about__item">
          <h3 class="about__item-title about__item-title_3">Everything you need in one place</h3>
          <p class="about__item-descr">
            Stop jumping from one service to another to communicate, store files, track tasks and
            share documents. Manage offers an all-in-one team productivity solution.
          </p>
        </li>
      </ul>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.about {
  padding-top: 59px;
  padding-bottom: 59px;
  &__container {
    display: flex;
    padding-right: 171px;
    gap: 110px;
    justify-content: space-between;
  }
  &__info {
    width: 430px;
  }
  &__title {
    margin-bottom: 31px;
    font-size: 2.06rem;
    color: var(--dark-blue);
  }
  &__descr {
    width: 340px;
    font-size: 0.87rem;
    line-height: 1.4rem;
  }
  &__list {
    display: flex;
    gap: 50px;
    flex-direction: column;
  }
  &__item {
    position: relative;
  }
  &__item-title {
    margin-bottom: 25px;
    font-size: 0.81rem;
    color: var(--dark-blue);
    &::before {
      display: flex;
      position: absolute;
      width: 66px;
      height: 40px;
      top: -9px;
      left: -94px;
      align-items: center;
      justify-content: center;
      border-radius: 20px;
      background-color: var(--bright-red);
      font-size: 0.83rem;
      font-weight: 500;
      color: var(--very-light-gray);
    }
    &_1 {
      &::before {
        content: '01';
      }
    }
    &_2 {
      &::before {
        content: '02';
      }
    }
    &_3 {
      &::before {
        content: '03';
      }
    }
  }
  &__item-descr {
    width: 100%;
    max-width: 440px;
    font-size: 0.87rem;
    line-height: 1.4rem;
  }
}

@media (max-width: 1200px) {
  .about {
    &__container {
      padding-right: 80px;
    }
    &__descr {
      width: 300px;
    }
  }
}

@media (max-width: 768px) {
  .about {
    padding-bottom: 35px;
    &__container {
      padding-right: 16px;
      padding-left: 16px;
      max-width: 100%;
      width: 100%;
      gap: 52px;
      align-items: center;
      flex-direction: column;
    }
    &__info {
      width: initial;
      max-width: 500px;
      padding: 0 24px;
    }
    &__title {
      margin-bottom: 12px;
      font-size: 1.57rem;
      line-height: 2.6rem;
      text-align: center;
    }
    &__descr {
      width: initial;
      font-size: 0.77rem;
      line-height: 1.55rem;
      text-align: center;
    }
    &__list {
      gap: 46px;
    }
    &__item-title {
      margin-bottom: 11px;
      padding-left: 81px;
      background-color: var(--very-pale-red);
      line-height: 2.2rem;
      width: 105%;
      border-top-left-radius: 20px;
      border-bottom-left-radius: 20px;
      &::before {
        top: 0;
        left: 0;
      }
    }
    &__item-descr {
      font-size: 0.75rem;
      line-height: 1.52rem;
    }
  }
}
</style>
