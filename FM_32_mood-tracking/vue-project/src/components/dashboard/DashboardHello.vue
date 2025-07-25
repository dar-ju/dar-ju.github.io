<script setup lang="ts">
import { useFormatDate } from '@/composables/useDateFormat.ts'
import { useModalStore } from '@/stores/modalStore'
import { useDataStore } from '@/stores/moodStore'
import { useUserStore } from '@/stores/userStore'

const modalStore = useModalStore()
const moodStore = useDataStore()
const userStore = useUserStore()

const today: Date = new Date()
</script>

<template>
  <section class="section mood">
    <div class="container mood__container">
      <div class="mood__wrapper">
        <span class="mood__hello">{{
          `Hello, ${userStore.user?.username?.split(' ')[0] || ''}!`
        }}</span>
        <h1 class="title mood__title">How are you feeling today?</h1>
        <time :datetime="new Date().toJSON().slice(0, 10)" class="mood__date">{{
          useFormatDate(today)
        }}</time>
      </div>
      <button
        v-if="!moodStore.isTodayLogged"
        @click="[(modalStore.isLogModalActive = true), (modalStore.isWarnVisible = false)]"
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
    text-align: center;
  }
  &__date {
    @include text-preset(preset6);
    color: var(--neutral-600);
  }
  &__btn {
    margin-bottom: 16px;
    padding: 16px 32px;
  }

  /* Media */
  @include media-query-l {
    &__container {
      gap: 48px;
    }
  }
  @include media-query-sm {
    padding-bottom: 24px;
    &__wrapper {
      gap: 16px;
    }
    &__hello {
      @include text-preset(preset3mob);
    }
    &__title {
      @include text-preset(preset1mob);
    }
  }
}
</style>
