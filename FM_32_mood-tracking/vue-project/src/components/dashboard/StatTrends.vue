<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useDataStore } from '@/stores/moodData'
import { useMoodMap } from '@/composables/useMoodMap'
const { moodMap, sleepMap } = useMoodMap()

const mood = useDataStore()

const BARS = 11
const limitData = ref({})
const scrollRef = ref(null)

const scrollToEnd = () => {
  const el = scrollRef.value
  if (!el) return
  const target = el.scrollWidth - el.clientWidth
  el.scrollLeft = target
  if (el.scrollLeft !== target) {
    setTimeout(scrollToEnd, 100)
  }
}

onMounted(async () => {
  limitData.value = mood.data?.moodEntries.slice(-BARS)
  if (limitData.value.length < BARS) {
    const lastDate = new Date(limitData.value[0].createdAt)
    for (let i = limitData.value.length; i < BARS; i++) {
      lastDate.setUTCDate(lastDate.getUTCDate() - 1)
      const result = lastDate.toISOString().split('.')[0] + 'Z'
      // originalDate.setUTCDate(originalDate.getUTCDate() - 1)
      limitData.value.unshift({
        createdAt: result,
        sleepHours: 0,
      })
    }
    console.log(limitData.value)
  }

  setTimeout(scrollToEnd, 100)
})

function getDate(dateStr) {
  const date = new Date(dateStr)
  const day = date.getUTCDate()
  const month = date.toLocaleString('en-EN', { month: 'long' })
  return { day: day, month: month }
}
</script>

<template>
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
      <ul ref="scrollRef" class="stat__trends-bars">
        <li v-for="item in limitData" :key="item.createdAt" class="stat__trends-bar">
          <div
            class="stat__trends-bar-column"
            :style="{
              backgroundColor: moodMap[item.mood]?.color,
              height: sleepMap[item.sleepHours].height,
            }"
          >
            <img
              v-if="moodMap[item.mood]?.img"
              class="stat__trends-bar-img"
              :src="moodMap[item.mood].img"
              alt=""
              width="30"
              height="30"
            />
          </div>
          <div class="stat__trends-bar-date">
            <span class="stat__trends-bar-month">{{ getDate(item.createdAt).month }}</span>
            <span class="stat__trends-bar-number">{{ getDate(item.createdAt).day }}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/breakpoints' as *;
@use '@/assets/styles/_typography' as *;

.stat {
  &__trends {
    display: flex;
    max-width: 768px;
    width: 100%;
    padding: 26px;
    gap: 32px;
    border-radius: 16px;
    background-color: var(--neutral-0);
    outline: 1px solid var(--blue-100);
    flex-direction: column;
  }
  &__trends-title {
    margin: 0;
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
    height: 100%;
    max-height: 314px;
    max-width: 626px;
    width: calc(100% - 84px);
    margin: 0;
    gap: 17px;
    right: 0;
    bottom: 0;
    overflow-x: auto;
    overflow-y: hidden;
    margin-left: auto;
  }
  &__trends-bar {
    display: flex;
    min-width: 40px;
    gap: 11px;
    flex-direction: column;
    justify-content: flex-end;
  }
  &__trends-bar-column {
    position: relative;
    width: 100%;
    height: 0;
    background-color: var(--other-amber-300);
    border-radius: 40px;
    transition: height 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
    // overflow: hidden;
    animation: increaseHeight 0.6s forwards;
    animation-delay: var(--delay, 0ms);
  }
  &__trends-bar-img {
    position: absolute;
    top: 5px;
    left: 50%;
    transform: translateX(-50%);
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
