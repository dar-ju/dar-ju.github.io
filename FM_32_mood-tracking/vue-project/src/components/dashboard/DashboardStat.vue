<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useDataStore } from '@/stores/moodData'
import StatTrends from '@/components/dashboard/StatTrends.vue'
import StatAverageMood from '@/components/dashboard/StatAverageMood.vue'
import StatAverageSleep from '@/components/dashboard/StatAverageSleep.vue'

const mood = useDataStore()

onMounted(async () => {
  await mood.getdata()
  console.log(mood.data)
})
</script>

<template>
  <section class="section stat">
    <div class="container stat__container">
      <div class="stat__average">
        <StatAverageMood />
        <StatAverageSleep />
      </div>
      <StatTrends v-if="mood.data?.moodEntries?.length" />
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/breakpoints' as *;
@use '@/assets/styles/_typography' as *;

.stat {
  padding-top: 16px;
  padding-bottom: 80px;
  &__container {
    display: flex;
    gap: 32px;
    justify-content: center;
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
    padding: 28px 20px;
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
}
</style>
