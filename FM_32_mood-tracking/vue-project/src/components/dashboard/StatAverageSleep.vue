<script setup lang="ts">
import { ref, watch } from 'vue'
import { useDataStore } from '@/stores/moodData'

const mood = useDataStore()

const CHECKINS = 5

const averageData = ref<{
  titleImg: string | null
  title: string
  arrowImg: string | null
  descr: string
  bckgColor: string
}>({
  titleImg: null,
  title: 'Keep tracking!',
  arrowImg: null,
  descr: `Log ${CHECKINS} check-ins to see your average mood.`,
  bckgColor: 'var(--blue-100)',
})

watch(
  () => mood.data,
  () => {
    const moods = mood.data?.moodEntries?.map((item) => item.sleepHours) ?? []
    if (moods.length >= CHECKINS) {
      const lastNMoods = moods.slice(-CHECKINS)
      const average = Math.round(lastNMoods.reduce((acc, val) => acc + val, 0) / CHECKINS)
      averageData.value.titleImg = 'ok'
      averageData.value.bckgColor = 'var(--blue-600)'
      if (average >= 9) averageData.value.title = '9+ hours'
      else if (average >= 7 && average < 9) averageData.value.title = '7-8 hours'
      else if (average >= 5 && average < 7) averageData.value.title = '5-6 hours'
      else if (average >= 3 && average < 5) averageData.value.title = '3-4 hours'
      else if (average >= 0 && average < 3) averageData.value.title = '0-2 hours'

      if (moods.length >= CHECKINS && moods.length < CHECKINS * 2) {
        averageData.value.descr = `Log another ${CHECKINS} check‑ins to see your progress sleep.`
      } else {
        const lastPrevNMoods = moods.slice(-CHECKINS * 2, -CHECKINS)
        const averagePrev = Math.round(lastPrevNMoods.reduce((acc, val) => acc + val, 0) / CHECKINS)

        if (average > averagePrev) {
          averageData.value.descr = `Increase from the previous ${CHECKINS} check‑ins`
          averageData.value.arrowImg = '/assets/images/icon-trend-increase-light.svg'
        }
        if (average < averagePrev) {
          averageData.value.descr = `Decrease from the previous ${CHECKINS} check‑ins`
          averageData.value.arrowImg = '/assets/images/icon-trend-decrease-light.svg'
        }
        if (average === averagePrev) {
          averageData.value.descr = `Same as the previous ${CHECKINS} check‑ins`
          averageData.value.arrowImg = '/assets/images/icon-trend-same-light.svg'
        }
      }
    }
  },
)
</script>

<template>
  <div class="stat__average-wrapper stat__average-mood">
    <div class="stat__average-title-block">
      <h2 class="stat__average-title">Average Sleep</h2>
      <span class="stat__average-note">{{ `(Last ${CHECKINS} Check-ins)` }}</span>
    </div>
    <div class="stat__average-block" :style="{ backgroundColor: averageData.bckgColor }">
      <div class="stat__average-title-block">
        <svg
          v-if="averageData.titleImg"
          class="stat__average-img"
          width="22"
          height="25"
          viewBox="0 0 22 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14 2.10938C13.9531 2.4375 13.8125 2.90625 13.625 3.14062L9.73438 7.5H12.5C12.875 7.5 13.25 7.875 13.25 8.25V9C13.25 9.42188 12.875 9.75 12.5 9.75H7.25C6.82812 9.75 6.5 9.42188 6.5 9V8.39062C6.5 8.10938 6.64062 7.64062 6.82812 7.40625L10.7188 3H8C7.57812 3 7.25 2.67188 7.25 2.25V1.5C7.25 1.125 7.57812 0.75 8 0.75H13.25C13.625 0.75 14 1.125 14 1.5V2.10938ZM9.875 12.75C10.4844 12.75 11 13.2656 11 13.875V15.0938C10.9531 15.4219 10.7656 15.8906 10.5312 16.125L4.8125 21.75H10.25C10.625 21.75 11 22.125 11 22.5V24C11 24.4219 10.625 24.75 10.25 24.75H1.625C0.96875 24.75 0.5 24.2812 0.5 23.625V22.4531C0.5 22.125 0.6875 21.6562 0.921875 21.4219L6.64062 15.75H2C1.57812 15.75 1.25 15.4219 1.25 15V13.5C1.25 13.125 1.57812 12.75 2 12.75H9.875ZM20.75 11.25C21.125 11.25 21.5 11.625 21.5 12V12.6094C21.4531 12.9375 21.3125 13.4062 21.125 13.6406L17.2344 18H20C20.375 18 20.75 18.375 20.75 18.75V19.5C20.75 19.9219 20.375 20.25 20 20.25H14.75C14.3281 20.25 14 19.9219 14 19.5V18.8906C14 18.6094 14.1406 18.1406 14.3281 17.9062L18.2188 13.5H15.5C15.0781 13.5 14.75 13.1719 14.75 12.75V12C14.75 11.625 15.0781 11.25 15.5 11.25H20.75Z"
            fill="var(--neutral-200)"
          />
        </svg>
        <h3
          class="stat__average-info-title"
          :style="{ color: averageData.arrowImg ? 'var(--neutral-0)' : 'var(--neutral-900)' }"
        >
          {{ averageData.title }}
        </h3>
      </div>
      <div class="stat__average-descr-block">
        <img
          v-if="averageData.arrowImg"
          class="stat__average-arrow"
          :src="averageData.arrowImg"
          alt=""
          width="15"
          height="16"
        />
        <p
          class="stat__average-info-descr"
          :style="{ color: averageData.arrowImg ? 'var(--neutral-200)' : 'var(--neutral-900)' }"
        >
          {{ averageData.descr }}
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
