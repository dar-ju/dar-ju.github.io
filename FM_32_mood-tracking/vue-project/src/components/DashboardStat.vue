<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
  const el = document.querySelector('.stat__trends-bars')
  if (el) {
    el.scrollLeft = el.scrollWidth
  }
})
</script>

<template>
  <div class="section stat">
    <div class="container stat__container">
      <div class="stat__average">
        <div class="stat__average-wrapper stat__average-mood">
          <div class="stat__average-title-block">
            <h2 class="stat__average-title">Average Mood</h2>
            <span class="stat__average-note">(Last 5 Check-ins)</span>
          </div>
          <div class="stat__average-block">
            <h3 class="stat__average-info-title">Keep tracking!</h3>
            <p class="stat__average-info-descr">Log 5 check-ins to see your average mood.</p>
          </div>
        </div>
        <div class="stat__average-wrapper stat__average-sleep">
          <div class="stat__average-title-block">
            <h2 class="stat__average-title">Average Sleep</h2>
            <span class="stat__average-note">(Last 5 Check-ins)</span>
          </div>
          <div class="stat__average-block">
            <h3 class="stat__average-info-title">Not enough data yet!</h3>
            <p class="stat__average-info-descr">Track 5 nights to view average sleep.</p>
          </div>
        </div>
      </div>
      <div class="stat__trends">
        <h2 class="stat__trends-title">Mood and sleep trends</h2>
        <div class="stat__trends-block">
          <ul class="stat__trends-hours">
            <li class="stat__trends-hour">
              <img
                class="stat__trends-hour-icon"
                src="/assets/images/icon-sleep.svg"
                alt=""
                width="16"
                height="16"
              />
              <span class="stat__trends-hour-text">9+ hours</span>
            </li>
            <li class="stat__trends-hour">
              <img
                class="stat__trends-hour-icon"
                src="/assets/images/icon-sleep.svg"
                alt=""
                width="16"
                height="16"
              />
              <span class="stat__trends-hour-text">7-8 hours</span>
            </li>
            <li class="stat__trends-hour">
              <img
                class="stat__trends-hour-icon"
                src="/assets/images/icon-sleep.svg"
                alt=""
                width="16"
                height="16"
              />
              <span class="stat__trends-hour-text">5-6 hours</span>
            </li>
            <li class="stat__trends-hour">
              <img
                class="stat__trends-hour-icon"
                src="/assets/images/icon-sleep.svg"
                alt=""
                width="16"
                height="16"
              />
              <span class="stat__trends-hour-text">3-4 hours</span>
            </li>
            <li class="stat__trends-hour">
              <img
                class="stat__trends-hour-icon"
                src="/assets/images/icon-sleep.svg"
                alt=""
                width="16"
                height="16"
              />
              <span class="stat__trends-hour-text">0-2 hours</span>
            </li>
          </ul>
          <ul class="stat__trends-bars">
            <li v-for="item in 11" :key="item" class="stat__trends-bar">
              <div class="stat__trends-bar-date">
                <span class="stat__trends-bar-month">April</span>
                <span class="stat__trends-bar-number">{{ item }}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/breakpoints' as *;
@use '@/assets/styles/_typography' as *;

.stat {
  padding-top: 40px;
  padding-bottom: 80px;
  &__container {
    display: flex;
    gap: 32px;
  }
  &__average {
    display: flex;
    max-width: 370px;
    width: 100%;
    padding: 24px;
    gap: 24px;
    border-radius: 16px;
    background-color: var(--neutral-0);
    outline: 1px solid var(--blue-100);
    flex-direction: column;
  }
  &__average-wrapper {
    display: flex;
    gap: 12px;
    flex-direction: column;
  }
  &__average-mood {
  }
  &__average-sleep {
  }
  &__average-title-block {
    display: flex;
    gap: 5px;
    align-items: flex-end;
  }
  &__average-title {
    margin-bottom: 0;
    @include text-preset(preset5);
    color: var(--neutral-900);
  }
  &__average-note {
    @include text-preset(preset7);
  }
  &__average-block {
    display: flex;
    padding: 42px 20px;
    gap: 12px;
    flex-direction: column;
    border-radius: 16px;
    background-image: url('/assets/images/bg-pattern-averages.svg');
    background-repeat: no-repeat;
    background-position-x: 260px;
    background-position-y: -70px;
    background-size: 100%;
    background-color: var(--blue-100);
  }
  &__average-info-title {
    @include text-preset(preset4);
    color: var(--neutral-900);
  }
  &__average-info-descr {
    @include text-preset(preset7);
    color: var(--neutral-600);
  }

  &__trends {
    display: flex;
    max-width: 768px;
    width: 100%;
    padding: 32px;
    gap: 32px;
    border-radius: 16px;
    background-color: var(--neutral-0);
    outline: 1px solid var(--blue-100);
    flex-direction: column;
  }
  &__trends-title {
    @include text-preset(preset3);
    color: var(--neutral-900);
  }
  &__trends-block {
    position: relative;
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: space-between;
  }
  &__trends-hours {
    display: flex;
    // max-width: 68px;
    gap: 40px;
    flex-direction: column;
    // background-color: var(--neutral-300);
  }
  &__trends-hour {
    // position: relative;
    display: flex;
    gap: 6px;
    align-items: center;
    &::after {
      content: '';
      // padding-top: 20px;
      // position: absolute;
      width: 100%;
      border-bottom: 1px solid var(--blue-100);
    }
  }
  &__trends-hour-icon {
  }
  &__trends-hour-text {
    min-width: 68px;
    @include text-preset(preset9);
    color: var(--neutral-600);
  }
  &__trends-bars {
    position: absolute;
    display: flex;
    max-width: 626px;
    width: calc(100% - 84px);
    padding-bottom: 10px;
    gap: 18px;
    right: 0;
    bottom: 0;
    overflow-x: auto;
    overflow-y: hidden;
  }
  &__trends-bar {
    display: flex;
    min-width: 40px;
    min-height: 307px;
    flex-direction: column;
    justify-content: flex-end;
  }
  &__trends-bar-date {
    display: flex;
    gap: 6px;
    flex-direction: column;
    align-items: center;
  }
  &__trends-bar-month {
    @include text-preset(preset9);
    color: var(--neutral-600);
  }
  &__trends-bar-number {
    @include text-preset(preset8);
    color: var(--neutral-900);
  }
}
</style>
