<script setup lang="ts">
import StatTrends from '@/components/dashboard/StatTrends.vue'
import StatAverageMood from '@/components/dashboard/StatAverageMood.vue'
import StatAverageSleep from '@/components/dashboard/StatAverageSleep.vue'
</script>

<template>
  <section class="section stat">
    <div class="container stat__container">
      <div class="stat__average">
        <StatAverageMood />
        <StatAverageSleep />
      </div>
      <StatTrends />
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/breakpoints' as *;

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

  /* Media */
  @include media-query-l {
    &__container {
      flex-direction: column;
    }
    &__average {
      max-width: initial;
    }
  }
}
</style>
