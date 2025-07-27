<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useDataStore } from '@/stores/moodStore'
import type { MoodEntry, SleepHoursKey } from '@/types/mood'
import { useMoodMap } from '@/composables/useMoodMap'
const { moodMap, sleepMap } = useMoodMap()

const mood = useDataStore()
const quote = ref<string | null>(null)
const lastLoggedDay = ref<MoodEntry | null>(null)
const sleepKey = computed(() => {
  if (!lastLoggedDay.value) return null
  return String(lastLoggedDay.value.sleepHours) as SleepHoursKey
})

watch(
  () => mood.data ?? null,
  (data) => {
    if (!data) return
    const lastEntry = data.moods[data.moods.length - 1]
    lastLoggedDay.value = lastEntry

    const quotes = moodMap[lastEntry.mood].quotes
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]
    quote.value = randomQuote
  },
  { immediate: true },
)
</script>

<template>
  <section class="section current">
    <div class="container current__container">
      <div class="current__block current__feeling-block">
        <div>
          <span class="current__text">I’m feeling</span>
          <h2 class="title current__title">
            {{ lastLoggedDay ? moodMap[lastLoggedDay.mood].title : '' }}
          </h2>
        </div>
        <img
          class="current__img"
          :src="lastLoggedDay ? moodMap[lastLoggedDay.mood].imgColor : ''"
          :alt="`Feeling is ${lastLoggedDay ? moodMap[lastLoggedDay.mood].title : ''}`"
          width="320"
          height="320"
        />
        <div>
          <img
            class="current__quote-img"
            src="/assets/images/icon-quote.svg"
            alt=""
            aria-hidden="true"
            width="24"
            height="24"
          />
          <blockquote class="current__quote" aria-label="Motivational quote">
            {{ `“${quote}”` }}
          </blockquote>
        </div>
      </div>
      <div class="current__additional-block">
        <div class="current__block current__sleep-block">
          <div class="current__sleep-text-block">
            <img
              class="current__sleep-img"
              src="/assets/images/icon-sleep.svg"
              alt=""
              aria-hidden="true"
              width="22"
              height="22"
            />
            <span class="current__sleep-text">Sleep</span>
          </div>
          <h3 class="title current__sleep-title">
            {{ sleepKey ? sleepMap[sleepKey].title : '' }}
          </h3>
        </div>
        <div class="current__block current__reflection-block">
          <div class="current__reflection-wrapper">
            <div class="current__reflection-title-block">
              <img
                class="current__reflection-img"
                src="/assets/images/icon-reflection.svg"
                alt=""
                aria-hidden="true"
                width="22"
                height="22"
              />
              <span class="current__reflection-title">Reflection of the day</span>
            </div>
            <p class="current__reflection-text">
              {{ lastLoggedDay ? lastLoggedDay.journalEntry : '' }}
            </p>
          </div>
          <ul v-if="lastLoggedDay" class="current__reflection-hash-list">
            <li v-for="item in lastLoggedDay.feelings" :key="item" class="current__reflection-hash">
              {{ `#${item}` }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/breakpoints' as *;
@use '@/assets/styles/_typography' as *;

.current {
  padding-top: 32px;
  padding-bottom: 16px;
  &__container {
    display: flex;
    gap: 32px;
    justify-content: center;
  }
  &__block {
    display: flex;
    border-radius: 16px;
    background-color: var(--neutral-0);
    outline: 1px solid var(--blue-100);
    flex-direction: column;
  }
  &__feeling-block {
    position: relative;
    width: 670px;
    min-width: 600px;
    min-height: 340px;
    padding: 32px;
    justify-content: space-between;
    overflow: hidden;
    & div {
      z-index: 1;
    }
  }
  &__text {
    @include text-preset(preset3);
    color: rgba(var(--neutral-900), 0.5);
  }
  &__title {
    @include text-preset(preset2);
    color: var(--neutral-900);
  }
  &__img {
    position: absolute;
    right: 40px;
    bottom: -30px;
  }
  &__quote-img {
    margin-bottom: 12px;
  }
  &__quote {
    max-width: 246px;
    margin-bottom: 0;
    @include text-preset(preset6it);
    color: var(--neutral-900);
    font-style: italic;
  }
  &__additional-block {
    display: flex;
    max-width: 468px;
    width: 100%;
    gap: 20px;
    flex-direction: column;
  }
  &__sleep-block {
    padding: 20px;
  }
  &__sleep-text-block {
    display: flex;
    margin-bottom: 16px;
    gap: 12px;
    align-items: center;
  }
  &__sleep-text {
    @include text-preset(preset6);
    color: var(--neutral-600);
  }
  &__sleep-title {
    @include text-preset(preset3);
  }

  &__reflection-block {
    min-height: 197px;
    height: 100%;
    padding: 20px;
    justify-content: space-between;
  }
  &__reflection-title-block {
    display: flex;
    margin-bottom: 16px;
    gap: 12px;
  }
  &__reflection-title {
    @include text-preset(preset6);
    color: var(--neutral-600);
  }
  &__reflection-text {
    @include text-preset(preset6);
    color: var(--neutral-900);
  }
  &__reflection-hash-list {
    display: flex;
    margin: 0;
    gap: 12px;
    flex-wrap: wrap;
  }
  &__reflection-hash {
    @include text-preset(preset6it);
    color: var(--neutral-600);
    font-style: italic;
  }

  /* Media */
  @include media-query-lg {
    &__feeling-block {
      min-width: 500px;
    }
    &__img {
      right: -30px;
    }
  }
  @include media-query-l {
    &__container {
      flex-direction: column;
    }
    &__block {
      width: 100%;
    }
    &__img {
      right: 40px;
    }
    &__additional-block {
      max-width: initial;
    }
  }
  @include media-query-md {
    &__img {
      right: -30px;
    }
  }
  @include media-query-sm {
    padding-top: 24px;
    &__feeling-block {
      min-width: initial;
      padding: 32px 16px;
      gap: 32px;
      align-items: center;
      text-align: center;
    }
    &__img {
      position: initial;
      width: 200px;
      height: 200px;
    }
    &__quote-img {
      margin: auto;
      margin-bottom: 16px;
    }
  }
}
</style>
