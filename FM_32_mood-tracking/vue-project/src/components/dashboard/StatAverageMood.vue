<script setup lang="ts">
import { ref, watch } from 'vue'
import { useDataStore } from '@/stores/moodStore'
import type { MoodValue, MoodAverageData } from '@/types/mood'
import { useMoodMap } from '@/composables/useMoodMap'
const { moodMap } = useMoodMap()

const mood = useDataStore()

const CHECKINS = 5

const averageData = ref<MoodAverageData>({
  titleImg: null,
  title: 'Keep tracking!',
  arrowImg: null,
  descr: `Log ${CHECKINS} check-ins to see your average mood.`,
  bckgColor: 'var(--blue-100)',
})

watch(
  () => mood.data,
  () => {
    const moods = mood.data?.moods?.map((item) => item.mood) ?? []
    if (moods.length >= CHECKINS) {
      const lastNMoods = moods.slice(-CHECKINS)
      const average = Math.round(
        lastNMoods.reduce((acc: number, val: MoodValue) => acc + Number(val), 0) / CHECKINS,
      )
      const averageMood = average as MoodValue
      averageData.value.title = moodMap[averageMood].title
      averageData.value.titleImg = moodMap[averageMood].img
      averageData.value.bckgColor = moodMap[averageMood].color
      if (moods.length >= CHECKINS && moods.length < CHECKINS * 2) {
        averageData.value.descr = `Log another ${CHECKINS} check‑ins to see your progress mood.`
      } else {
        const lastPrevNMoods = moods.slice(-CHECKINS * 2, -CHECKINS)
        const averagePrev = Math.round(
          lastPrevNMoods.reduce((acc: number, val: MoodValue) => acc + val, 0) / CHECKINS,
        )
        if (average > averagePrev) {
          averageData.value.descr = `Increase from the previous ${CHECKINS} check‑ins`
          averageData.value.arrowImg = '/assets/images/icon-trend-increase.svg'
        }
        if (average < averagePrev) {
          averageData.value.descr = `Decrease from the previous ${CHECKINS} check‑ins`
          averageData.value.arrowImg = '/assets/images/icon-trend-decrease.svg'
        }
        if (average === averagePrev) {
          averageData.value.descr = `Same as the previous ${CHECKINS} check‑ins`
          averageData.value.arrowImg = '/assets/images/icon-trend-same.svg'
        }
      }
    }
  },
)
</script>

<template>
  <div class="stat__average-wrapper stat__average-mood">
    <div class="stat__average-title-block">
      <h2 class="stat__average-title">Average Mood</h2>
      <span class="stat__average-note">{{ `(Last ${CHECKINS} Check-ins)` }}</span>
    </div>
    <div class="stat__average-block" :style="{ backgroundColor: averageData.bckgColor }">
      <div class="stat__average-title-block">
        <img
          v-if="averageData.titleImg"
          class="stat__average-img"
          :src="averageData.titleImg"
          alt=""
          width="24"
          height="24"
        />
        <h3 class="stat__average-info-title">{{ averageData.title }}</h3>
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
        <p class="stat__average-info-descr" :style="{ color: 'var(--neutral-900)' }">
          {{ averageData.descr }}
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
