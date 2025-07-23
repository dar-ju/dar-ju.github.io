<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'
import { useDataStore } from '@/stores/moodData'
import type { MoodValue, MoodEntryPartial, MoodEntry } from '@/types/mood'
import { useMoodMap } from '@/composables/useMoodMap'
import MoodPopover from '@/components/modals/MoodPopover.vue'
const { moodMap, sleepMap } = useMoodMap()

const mood = useDataStore()

const BARS = 11
const limitData: Ref<MoodEntryPartial[]> = ref([])
const scrollRef = ref<HTMLElement | null>(null)

const scrollToEnd = () => {
  const el = scrollRef.value
  if (!el) return
  const target = el.scrollWidth - el.clientWidth
  el.scrollLeft = target
}

onMounted(async () => {
  limitData.value = mood.data?.moodEntries.slice(-BARS) ?? []
  if (limitData.value.length < BARS) {
    const lastDate = new Date(limitData.value[0].createdAt)
    for (let i = limitData.value.length; i < BARS; i++) {
      lastDate.setUTCDate(lastDate.getUTCDate() - 1)
      const result = lastDate.toISOString().split('.')[0] + 'Z'
      limitData.value.unshift({
        createdAt: result,
        sleepHours: 0,
      })
    }
    console.log(limitData.value)
  }

  setTimeout(scrollToEnd, 100)
})

function getDate(dateStr: string): { day: number; month: string } {
  const date = new Date(dateStr)
  const day = date.getUTCDate()
  const month = date.toLocaleString('en-EN', { month: 'long' })
  return { day, month }
}

const hoveredItem = ref<string | null>(null)
const popoverStyle = ref<{ top: string; left: string }>({ top: '0px', left: '0px' })
const dialogSide = ref<boolean>(false)

const showPopover = (el: HTMLElement, item: MoodEntryPartial) => {
  const rect = el.getBoundingClientRect()
  hoveredItem.value = item.createdAt
  let left = rect.left + window.scrollX - 190
  if (left < 0) {
    left = 245 + left
    dialogSide.value = true
  } else dialogSide.value = false
  popoverStyle.value = {
    top: `${rect.top + window.scrollY - 10}px`,
    left: `${left}px`,
  }
}

const hidePopover = () => {
  hoveredItem.value = null
}
</script>

<template>
  <div class="stat__trends">
    <h2 class="stat__trends-title">Mood and sleep trends</h2>
    <div class="stat__trends-block">
      <ul class="stat__trends-hours">
        <li class="stat__trends-hour">
          <img
            class="stat__trends-hour-icon"
            src="/assets/images/icon-sleep.svg"
            alt=""
            width="16"
            height="16"
          />
          <span class="stat__trends-hour-text">9+ hours</span>
        </li>
        <li class="stat__trends-hour">
          <img
            class="stat__trends-hour-icon"
            src="/assets/images/icon-sleep.svg"
            alt=""
            width="16"
            height="16"
          />
          <span class="stat__trends-hour-text">7-8 hours</span>
        </li>
        <li class="stat__trends-hour">
          <img
            class="stat__trends-hour-icon"
            src="/assets/images/icon-sleep.svg"
            alt=""
            width="16"
            height="16"
          />
          <span class="stat__trends-hour-text">5-6 hours</span>
        </li>
        <li class="stat__trends-hour">
          <img
            class="stat__trends-hour-icon"
            src="/assets/images/icon-sleep.svg"
            alt=""
            width="16"
            height="16"
          />
          <span class="stat__trends-hour-text">3-4 hours</span>
        </li>
        <li class="stat__trends-hour">
          <img
            class="stat__trends-hour-icon"
            src="/assets/images/icon-sleep.svg"
            alt=""
            width="16"
            height="16"
          />
          <span class="stat__trends-hour-text">0-2 hours</span>
        </li>
      </ul>
      <ul ref="scrollRef" class="stat__trends-bars">
        <li v-for="item in limitData" :key="item.createdAt" class="stat__trends-bar">
          <teleport to="body">
            <Transition name="fade">
              <MoodPopover
                v-if="hoveredItem === item.createdAt"
                :style="popoverStyle"
                :item="item as Partial<MoodEntry>"
                :side="dialogSide"
              />
            </Transition>
          </teleport>
          <div
            class="stat__trends-bar-column"
            :style="{
              backgroundColor: moodMap[String(item.mood) as keyof typeof moodMap]?.color,
              height: sleepMap[String(item.sleepHours) as keyof typeof sleepMap]?.height,
            }"
            @mouseenter="(e) => showPopover(e.currentTarget as HTMLElement, item)"
            @mouseleave="hidePopover"
          >
            <img
              v-if="item.mood !== undefined"
              class="stat__trends-bar-img"
              :src="moodMap[String(item.mood) as keyof typeof moodMap].img"
              alt=""
              width="30"
              height="30"
            />
          </div>
          <div class="stat__trends-bar-date">
            <span class="stat__trends-bar-month">{{ getDate(item.createdAt).month }}</span>
            <span class="stat__trends-bar-number">{{ getDate(item.createdAt).day }}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/breakpoints' as *;
@use '@/assets/styles/_typography' as *;

.stat {
  &__trends {
    display: flex;
    max-width: 768px;
    width: 100%;
    padding: 26px;
    gap: 32px;
    border-radius: 16px;
    background-color: var(--neutral-0);
    outline: 1px solid var(--blue-100);
    flex-direction: column;
  }
  &__trends-title {
    margin: 0;
    @include text-preset(preset3);
    color: var(--neutral-900);
  }
  &__trends-block {
    position: relative;
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: space-between;
  }
  &__trends-hours {
    display: flex;
    margin: 0;
    gap: 40px;
    flex-direction: column;
  }
  &__trends-hour {
    display: flex;
    gap: 6px;
    align-items: center;
    &::after {
      content: '';
      width: 100%;
      border-bottom: 1px solid var(--blue-100);
    }
  }
  &__trends-hour-text {
    min-width: 68px;
    @include text-preset(preset9);
    color: var(--neutral-600);
  }
  &__trends-bars {
    position: absolute;
    display: flex;
    height: 100%;
    max-height: 314px;
    max-width: 626px;
    width: calc(100% - 84px);
    margin: 0;
    gap: 17px;
    right: 0;
    bottom: 0;
    overflow-x: auto;
    overflow-y: hidden;
    margin-left: auto;
    &:focus-visible {
      outline: 1px solid var(--neutral-600);
      outline-style: auto;
      outline-offset: 6px;
    }
  }
  &__trends-bar {
    display: flex;
    position: relative;
    min-width: 40px;
    gap: 11px;
    flex-direction: column;
    justify-content: flex-end;
  }
  &__trends-bar-column {
    position: relative;
    width: 100%;
    height: 0;
    background-color: var(--other-amber-300);
    border-radius: 40px;
    transition: height 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
    animation: increaseHeight 0.6s forwards;
    animation-delay: var(--delay, 0ms);
  }
  &__trends-bar-img {
    position: absolute;
    top: 5px;
    left: 50%;
    transform: translateX(-50%);
  }
  &__trends-bar-date {
    display: flex;
    gap: 6px;
    flex-direction: column;
    align-items: center;
  }
  &__trends-bar-month {
    @include text-preset(preset9);
    color: var(--neutral-600);
  }
  &__trends-bar-number {
    @include text-preset(preset8);
    color: var(--neutral-900);
  }

  /* Media */
  @include media-query-l {
    &__trends {
      max-width: initial;
      min-height: 437px;
    }
    &__trends-block {
      flex-grow: 1;
    }
    &__trends-bars {
      max-height: 300px;
      gap: 15px;
    }
    &__trends-hours {
      gap: 36px;
    }
  }
  @include media-query-sm {
    &__trends {
      padding: 20px 16px;
    }
    &__trends-title {
      @include text-preset(preset3mob);
    }
    &__trends-bars {
      max-height: 308px;
    }
    &__trends-hours {
      gap: 38px;
    }
  }
}
</style>
