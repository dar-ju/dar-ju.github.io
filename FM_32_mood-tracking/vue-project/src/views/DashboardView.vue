<script setup lang="ts">
import HeaderMood from '@/components/dashboard/HeaderMood.vue'
import DashboardHello from '@/components/dashboard/DashboardHello.vue'
import DashboardStat from '@/components/dashboard/DashboardStat.vue'
import ProfileSettings from '@/components/modals/profile/ProfileSettings.vue'
import LogMain from '@/components/modals/moodlog/LogMain.vue'
import { useModalStore } from '@/stores/modals'
import { onBeforeUnmount, onMounted } from 'vue'

const modal = useModalStore()

function handleKeyDown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    modal.isLogModalActive = false
    modal.currentLogStage = 1
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyDown)
})
</script>

<template>
  <HeaderMood />
  <DashboardHello />
  <DashboardStat />
  <ProfileSettings />
  <LogMain />
</template>

<style lang="scss" scoped></style>
