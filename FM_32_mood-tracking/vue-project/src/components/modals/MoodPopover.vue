<script setup lang="ts">
import { useMoodMap } from '@/composables/useMoodMap'
const { moodMap, sleepMap } = useMoodMap()

const props = defineProps({
  style: Object,
  item: Object,
})
</script>

<template>
  <div class="mood-popover" :style="style">
    <div class="mood-popover__wrapper">
      <h3 class="title mood-popover__title">Mood</h3>
      <div class="mood-popover__mood-wrapper">
        <img
          class="current__img"
          :src="moodMap[props.item.mood].imgColor"
          alt=""
          width="16"
          height="16"
        />
        <span class="mood-popover__text-primary">{{ moodMap[props.item.mood].title }}</span>
      </div>
    </div>
    <div class="mood-popover__wrapper">
      <h3 class="title mood-popover__title">Sleep</h3>
      <span class="mood-popover__text-primary">{{ sleepMap[props.item.sleepHours].title }}</span>
    </div>
    <div class="mood-popover__wrapper">
      <h3 class="title mood-popover__title">Reflection</h3>
      <span class="mood-popover__text-secondary">{{ props.item.journalEntry }}</span>
    </div>
    <div class="mood-popover__wrapper">
      <h3 class="title mood-popover__title">Tags</h3>
      <span class="mood-popover__text-secondary">{{ props.item.feelings.join(', ') }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/breakpoints' as *;
@use '@/assets/styles/_typography' as *;
.mood-popover {
  display: flex;
  position: absolute;
  width: 175px;
  padding: 12px;
  gap: 12px;
  top: 0;
  right: 45px;
  flex-direction: column;
  border-radius: 8px;
  background-color: var(--neutral-0);
  box-shadow: 0px 4px 9px 6px var(--shadow);
  stroke: 1px solid var(--blue-100);
  z-index: 1000;
  &::after {
    content: '';
    position: absolute;
    top: 27px;
    right: -10px;
    width: 16px;
    height: 16px;
    background: var(--neutral-0);
    clip-path: polygon(50% 0%, 0% 50%, 100% 100%);
    border-radius: 10px;
    transform: rotate(-46deg);
  }
  &__wrapper {
    display: flex;
    gap: 8px;
    flex-direction: column;
  }
  &__mood-wrapper {
    display: flex;
    gap: 6px;
  }
  &__img {
  }
  &__title {
    @include text-preset(preset8);
  }
  &__text-primary {
    @include text-preset(preset7);
    color: var(--neutral-900);
  }
  &__text-secondary {
    @include text-preset(preset9);
    color: var(--neutral-900);
  }
}
</style>
