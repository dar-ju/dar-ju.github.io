<script setup lang="ts">
import HeaderMood from '@/components/dashboard/HeaderMood.vue'
import DashboardHello from '@/components/dashboard/DashboardHello.vue'
import DashboardCurrent from '@/components/dashboard/DashboardCurrent.vue'
import DashboardStat from '@/components/dashboard/DashboardStat.vue'
import ProfileSettings from '@/components/modals/profile/ProfileSettings.vue'
import LogMain from '@/components/modals/moodlog/LogMain.vue'
import { useModalStore } from '@/stores/modals'
import { useDataStore } from '@/stores/moodData'
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'

const modal = useModalStore()
const mood = useDataStore()

const isTodayLogged = ref(false)

function handleKeyDown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    modal.isLogModalActive = false
    modal.currentLogStage = 1
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
  // console.log(new Date(mood.data.moodEntries?.createdAt))
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyDown)
})

watch(
  () => mood.data,
  () => {
    const totalDays = Object.keys(mood.data?.moodEntries).length
    const lastLoggedDay = mood.data.moodEntries[totalDays - 1].createdAt.split('T')[0]
    const today = new Date()
    const formattedToday = today.toISOString().split('T')[0]
    if (lastLoggedDay === formattedToday) isTodayLogged.value = true
  },
)
</script>

<template>
  <HeaderMood />
  <DashboardHello />
  <Transition name="fade">
    <DashboardCurrent v-if="isTodayLogged" />
  </Transition>
  <DashboardStat />
  <ProfileSettings />
  <LogMain />
</template>

<style lang="scss" scoped></style>
