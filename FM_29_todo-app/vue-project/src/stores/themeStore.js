import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', () => {
  const isDark = ref(window.matchMedia('(prefers-color-scheme: dark)').matches)

  const themeToggle = () => {
    isDark.value = !isDark.value
    localStorage.setItem('isDark', isDark.value.toString())
    document.body.classList.toggle('dark', isDark.value)
  }

  if (localStorage.getItem('isDark')) {
    isDark.value = localStorage.getItem('isDark') === 'true'
    document.body.classList.toggle('dark', isDark.value)
  }

  return { isDark, themeToggle }
})
