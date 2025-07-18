import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useModalStore = defineStore('modal', () => {
  const isSettingsModalActive = ref(false)
  const isLogModalActive = ref(false)
  const currentLogStage = ref(1)
  const isWarnVisible = ref(false)

  const moodLevel = ref(null)
  const selectedFeelings = ref<string[]>([])
  const aboutText = ref('')
  const sleepLevel = ref('')

  return {
    isSettingsModalActive,
    isLogModalActive,
    currentLogStage,
    isWarnVisible,
    moodLevel,
    selectedFeelings,
    aboutText,
    sleepLevel,
  }
})
