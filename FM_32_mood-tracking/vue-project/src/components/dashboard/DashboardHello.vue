<script setup lang="ts">
import { useFormatDate } from '@/composables/useDateFormat.ts'
import { useModalStore } from '@/stores/modals'
import { useDataStore } from '@/stores/moodData'

const modal = useModalStore()
const mood = useDataStore()

const today: Date = new Date()
</script>

<template>
  <section class="section mood">
    <div class="container mood__container">
      <div class="mood__wrapper">
        <span class="mood__hello">Hello, Lisa!</span>
        <h1 class="title mood__title">How are you feeling today?</h1>
        <span class="mood__date">{{ useFormatDate(today) }}</span>
      </div>
      <button
        v-if="!mood.isTodayLogged"
        @click="modal.isLogModalActive = true"
        type="button"
        class="btn btn-primary mood__btn"
      >
        Log today's mood
      </button>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/breakpoints' as *;
@use '@/assets/styles/_typography' as *;
.mood {
  padding-top: 24px;
  padding-bottom: 32px;
  &__container {
    display: flex;
    gap: 64px;
    flex-direction: column;
    align-items: center;
  }
  &__wrapper {
    display: flex;
    gap: 10px;
    flex-direction: column;
    align-items: center;
  }
  &__hello {
    @include text-preset(preset3);
    color: var(--blue-600);
  }
  &__title {
    @include text-preset(preset1);
    color: var(--neutral-900);
  }
  &__date {
    @include text-preset(preset6);
    color: var(--neutral-600);
  }
  &__btn {
    margin-bottom: 16px;
    padding: 16px 32px;
  }
}
</style>
