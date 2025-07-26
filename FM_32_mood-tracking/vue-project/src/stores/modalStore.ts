import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useModalStore = defineStore('modal', () => {
  const isSettingsModalActive = ref(false)
  const isLogModalActive = ref(false)
  const currentLogStage = ref(1)
  const isWarnVisible = ref(false)

  const moodData = ref({
    email: '',
    mood: null as number | null,
    feelings: [] as string[],
    journalEntry: '',
    sleepHours: '',
  })

  return {
    isSettingsModalActive,
    isLogModalActive,
    currentLogStage,
    isWarnVisible,
    moodData,
  }
})
