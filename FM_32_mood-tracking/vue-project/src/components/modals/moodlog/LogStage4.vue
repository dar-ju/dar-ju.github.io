<script setup lang="ts">
import { useModalStore } from '@/stores/modalStore'
import { useMoodMap } from '@/composables/useMoodMap'
const { sleepMap } = useMoodMap()

const modalStore = useModalStore()

const sleepList = Object.entries(sleepMap).filter(([key]) => key !== '0')
</script>

<template>
  <div v-if="modalStore.currentLogStage === 4" class="log__sleep-wrapper">
    <h2 class="title log__sleep-title">How many hours did you sleep last night?</h2>
    <ul class="log__sleep-list">
      <li v-for="[key, item] in sleepList" :key="key">
        <label
          class="log__sleep-block"
          :for="key"
          :class="{ 'log__sleep-block--selected': modalStore.moodData.sleepHours === key }"
        >
          <div class="form-check log__sleep">
            <input
              class="form-check-input log__sleep-input"
              type="radio"
              name="sleep"
              :id="key"
              :value="key"
              v-model="modalStore.moodData.sleepHours"
            />
            <span class="form-check-label log__sleep-label">{{ item.title }}</span>
          </div>
        </label>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/breakpoints' as *;
@use '@/assets/styles/_typography' as *;

.log {
  &__sleep-wrapper {
    margin-bottom: 32px;
  }
  &__sleep-title {
    margin-bottom: 32px;
    @include text-preset(preset3);
    color: var(--neutral-900);
  }
  &__sleep-list {
    display: flex;
    margin-bottom: 32px;
    gap: 12px;
    flex-direction: column;
  }
  &__sleep-block {
    display: flex;
    margin: 0;
    padding: 12px 20px;
    align-items: center;
    justify-content: space-between;
    border-radius: 10px;
    border: 2px solid var(--blue-100);
    background-color: var(--neutral-0);
    cursor: pointer;
    &--selected {
      border: 2px solid var(--blue-600);
    }
  }
  &__sleep {
    padding-left: 32px;
  }
  &__sleep-input {
    width: 20px;
    height: 20px;
    margin-left: -32px;
    &:focus + label {
      border: 1px solid var(--blue-600);
    }
  }
  &__sleep-label {
    line-height: 1.778rem;
    @include text-preset(preset5);
    color: var(--neutral-900);
  }

  /* Media */
  @include media-query-sm {
    &__sleep-wrapper {
      margin-bottom: 24px;
    }
    &__sleep-title {
      margin-bottom: 24px;
      @include text-preset(preset3mob);
    }
  }
}
</style>
