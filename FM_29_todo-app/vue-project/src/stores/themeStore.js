import { ref, onMounted } from 'vue'
import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', () => {
  const isDark = ref(false)

  const themeToggle = () => {
    isDark.value = !isDark.value
    localStorage.setItem('isDark', isDark.value.toString())
    document.body.classList.toggle('dark', isDark.value)
  }

  onMounted(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const storedTheme = localStorage.getItem('isDark')

    if (storedTheme) {
      isDark.value = storedTheme === 'true'
    } else if (prefersDark) {
      isDark.value = true
    }

    document.body.classList.toggle('dark', isDark.value)
  })

  return { isDark, themeToggle }
})
