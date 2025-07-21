<script setup lang="ts">
import { useFormatDate } from '@/composables/useDateFormat.ts'
import { useModalStore } from '@/stores/modals'

const modal = useModalStore()

const today: Date = new Date()
</script>

<template>
  <section class="section mood">
    <div class="container mood__container">
      <span class="mood__hello">Hello, Lisa!</span>
      <h1 class="mood__title">How are you feeling today?</h1>
      <span class="mood__date">{{ useFormatDate(today) }}</span>
      <button
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
  padding-bottom: 48px;
  &__container {
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
    margin-bottom: 64px;
    @include text-preset(preset6);
    color: var(--neutral-600);
  }
  &__btn {
    padding: 16px 32px;
  }
}
</style>
