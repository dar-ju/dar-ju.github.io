<script setup lang="ts">
import HeaderMood from '@/components/dashboard/HeaderMood.vue'
import DashboardHello from '@/components/dashboard/DashboardHello.vue'
import DashboardCurrent from '@/components/dashboard/DashboardCurrent.vue'
import DashboardStat from '@/components/dashboard/DashboardStat.vue'
import ProfileSettings from '@/components/modals/profile/ProfileSettings.vue'
import LogMain from '@/components/modals/moodlog/LogMain.vue'
import { useModalStore } from '@/stores/modals'
import { useDataStore } from '@/stores/moodData'
import { onBeforeUnmount, onMounted, watch } from 'vue'

const modal = useModalStore()
const mood = useDataStore()

function handleKeyDown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    modal.isLogModalActive = false
    modal.isSettingsModalActive = false
    modal.currentLogStage = 1
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyDown)
})

watch(
  () => mood.data,
  () => {
    const totalDays = mood.data?.moodEntries ? Object.keys(mood.data.moodEntries).length : 0
    const lastLoggedDay = mood.data?.moodEntries?.[totalDays - 1]?.createdAt?.split('T')[0] ?? ''
    const today = new Date()
    const formattedToday = today.toISOString().split('T')[0]
    if (lastLoggedDay === formattedToday) mood.isTodayLogged = true
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
      <Transition name="fade">
        <DashboardCurrent v-if="mood.isTodayLogged" />
      </Transition>
      <DashboardStat />
      <ProfileSettings />
      <LogMain />
    </main>
  </div>
</template>

<style lang="scss" scoped></style>
