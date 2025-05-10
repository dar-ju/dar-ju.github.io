import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', () => {
  const isDark = ref(window.matchMedia('(prefers-color-scheme: dark)').matches)

  const themeToggle = () => {
    isDark.value = !isDark.value  // Переключаем булевое значение
    localStorage.setItem('isDark', isDark.value.toString()) // Сохраняем в localStorage как строку
    document.body.classList.toggle('dark', isDark.value) // Переключаем класс на body для применения темной темы
  }

  // При загрузке страницы проверяем сохранённую тему в localStorage
  if (localStorage.getItem('isDark')) {
    isDark.value = localStorage.getItem('isDark') === 'true'
    document.body.classList.toggle('dark', isDark.value) // Применяем тему при загрузке
  }

  return { isDark, themeToggle }
})
