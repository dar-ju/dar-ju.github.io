<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useDataStore } from '@/stores/moodData'
import { useMoodMap } from '@/composables/useMoodMap'
const { moodMap, sleepMap } = useMoodMap()

const mood = useDataStore()

const lastLoggedDay = ref(mood.data.moodEntries[Object.keys(mood.data?.moodEntries).length - 1])

// onMounted(async () => {
//   await mood.getdata()
//   console.log(mood.data)
// })
</script>

<template>
  <div class="section current">
    <div class="container current__container">
      <div class="current__block current__feeling-block">
        <div>
          <span class="current__text">I’m feeling</span>
          <h2 class="current__title">{{ moodMap[lastLoggedDay.mood].title }}</h2>
        </div>
        <img
          class="current__img"
          :src="moodMap[lastLoggedDay.mood].imgColor"
          :alt="`Feeling is ${moodMap[lastLoggedDay.mood].title}`"
          width="320"
          height="320"
        />
        <div>
          <img
            class="current__quote-img"
            src="/assets/images/icon-quote.svg"
            alt=""
            width="24"
            height="24"
          />
          <p class="current__quote">“When your heart is full, share your light with the world.”</p>
        </div>
      </div>
      <div class="current__additional-block">
        <div class="current__block current__sleep-block">
          <div class="current__sleep-text-block">
            <img
              class="current__sleep-img"
              src="/assets/images/icon-sleep.svg"
              alt=""
              width="22"
              height="22"
            />
            <span class="current__sleep-text">Sleep</span>
          </div>
          <h3 class="current__sleep-title">{{ sleepMap[lastLoggedDay.sleepHours].title }}</h3>
        </div>
        <div class="current__block current__reflection-block"></div>
      </div>

      <!-- <div class="current__average">
        <StatAverageMood />
        <StatAverageSleep />
      </div>
      <StatTrends v-if="mood.data?.moodEntries?.length" /> -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/breakpoints' as *;
@use '@/assets/styles/_typography' as *;

.current {
  padding-top: 16px;
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
    min-height: 340px;
    padding: 32px;
    justify-content: space-between;
    overflow: hidden;
  }
  &__text {
    @include text-preset(preset3);
    color: rgba(var(--neutral-900), 0.5);
  }
  &__title {
    margin: 0;
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
    max-width: 468px;
    width: 100%;
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
  &__sleep-img {
    // margin-bottom: 12px;
  }
  &__sleep-text {
    @include text-preset(preset6);
    color: var(--neutral-600);
  }
  &__sleep-title {
    @include text-preset(preset3);
    color: var(--neutral-900);
  }

  &__reflection-block {
  }
}
</style>
