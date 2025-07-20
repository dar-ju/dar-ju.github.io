<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useDataStore } from '@/stores/moodData'
import { useMoodMap } from '@/composables/useMoodMap'
const { moodMap, sleepMap } = useMoodMap()

const mood = useDataStore()
</script>

<template>
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
</template>

<style lang="scss" scoped>
@use '@/assets/styles/breakpoints' as *;
@use '@/assets/styles/_typography' as *;
</style>
