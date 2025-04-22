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
        <li class="about__item about__item_1">
          <!-- <div class="about__item-block"> -->
          <h3 class="about__item-title">Track company-wide progress</h3>
          <p class="about__item-descr">
            See how your day-to-day tasks fit into the wider vision. Go from tracking progress at
            the milestone level all the way done to the smallest of details. Never lose sight of the
            bigger picture again.
          </p>
          <!-- </div> -->
        </li>
        <li class="about__item about__item_2">
          <!-- <div class="about__item-block"> -->
          <h3 class="about__item-title">Advanced built-in reports</h3>
          <p class="about__item-descr">
            Set internal delivery estimates and track progress toward company goals. Our
            customisable dashboard helps you build out the reports you need to keep key stakeholders
            informed.
          </p>
          <!-- </div> -->
        </li>
        <li class="about__item about__item_3">
          <!-- <div class="about__item-block"> -->
          <h3 class="about__item-title">Everything you need in one place</h3>
          <p class="about__item-descr">
            Stop jumping from one service to another to communicate, store files, track tasks and
            share documents. Manage offers an all-in-one team productivity solution.
          </p>
          <!-- </div> -->
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
    justify-content: space-between;
    gap: 50px;
  }
  &__title {
    width: 430px;
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
    width: 445px;
    display: flex;
    gap: 50px;
    flex-direction: column;
  }
  &__item {
    position: relative;
    &::before {
      // content: '01';
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
  &__item-title {
    margin-bottom: 25px;
    font-size: 0.81rem;
    color: var(--dark-blue);
  }
  &__item-descr {
    width: 440px;
    font-size: 0.87rem;
    line-height: 1.4rem;
  }
}
</style>
