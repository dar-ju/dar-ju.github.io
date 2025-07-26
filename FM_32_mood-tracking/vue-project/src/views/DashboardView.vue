<script setup lang="ts">
import HeaderMood from '@/components/dashboard/HeaderMood.vue'
import DashboardHello from '@/components/dashboard/DashboardHello.vue'
import DashboardCurrent from '@/components/dashboard/DashboardCurrent.vue'
import DashboardStat from '@/components/dashboard/DashboardStat.vue'
import ProfileSettings from '@/components/modals/profile/ProfileSettings.vue'
import LogMain from '@/components/modals/moodlog/LogMain.vue'
import { useModalStore } from '@/stores/modalStore'
import { useDataStore } from '@/stores/moodStore'
import { useUserStore } from '@/stores/userStore'
import { onBeforeUnmount, onMounted, watch } from 'vue'

const modalStore = useModalStore()
const moodStore = useDataStore()
const userStore = useUserStore()

function handleKeyDown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    modalStore.isLogModalActive = false
    modalStore.isSettingsModalActive = false
    modalStore.currentLogStage = 1
  }
}

onMounted(async () => {
  await moodStore.getData(userStore.user?.email || '', moodStore.NUMBER_OF_ITEMS)
  window.addEventListener('keydown', handleKeyDown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyDown)
})

watch(
  () => moodStore.data,
  () => {
    const totalDays = moodStore.data?.moods ? Object.keys(moodStore.data.moods).length : 0
    const lastLoggedDay = moodStore.data?.moods?.[totalDays - 1]?.createdAt?.split('T')[0] ?? ''
    const today = new Date()
    const formattedToday = today.toISOString().split('T')[0]
    if (lastLoggedDay === formattedToday) moodStore.isTodayLogged = true
  },
)
</script>

<template>
  <div>
    <header>
      <HeaderMood />
    </header>
    <main>
      <DashboardHello />
      <Transition name="fade" mode="in-out">
        <DashboardCurrent v-if="moodStore.isTodayLogged" />
      </Transition>
      <DashboardStat />
      <ProfileSettings />
      <LogMain />
    </main>
  </div>
</template>

<style lang="scss" scoped></style>
