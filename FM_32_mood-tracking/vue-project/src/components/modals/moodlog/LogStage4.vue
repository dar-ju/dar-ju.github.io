<script setup lang="ts">
import { useModalStore } from '@/stores/modals'

const modal = useModalStore()

const sleepList = ['9+ hours', '7-8 hours', '5-6 hours', '3-4 hours', '0-2 hours']
</script>

<template>
  <div v-if="modal.currentLogStage === 4" class="log__sleep-wrapper">
    <h2 class="title log__sleep-title">How many hours did you sleep last night?</h2>
    <ul class="log__sleep-list">
      <li v-for="item in sleepList" :key="item">
        <label
          class="log__sleep-block"
          :for="item"
          :class="{ 'log__sleep-block--selected': modal.sleepLevel === item }"
        >
          <div class="form-check log__sleep">
            <input
              class="form-check-input log__sleep-input"
              type="radio"
              name="sleep"
              :id="item"
              :value="item"
              v-model="modal.sleepLevel"
            />
            <span class="form-check-label log__sleep-label">{{ item }}</span>
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
    background-color: var(--neutral-0);
  }
  &__sleep-block {
    display: flex;
    margin: 0;
    padding: 12px 20px;
    align-items: center;
    justify-content: space-between;
    border-radius: 10px;
    border: 2px solid var(--blue-100);
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
}
</style>
