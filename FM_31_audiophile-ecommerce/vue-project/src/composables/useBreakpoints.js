import { ref, onMounted, onUnmounted } from 'vue'

export function useBreakpoints() {
  const width = ref(window.innerWidth)

  const onResize = () => {
    width.value = window.innerWidth
  }

  onMounted(() => {
    window.addEventListener('resize', onResize)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', onResize)
  })

  const isMobile = () => width.value <= 768
  const isTablet = () => width.value > 768 && width.value <= 1024
  const isDesktop = () => width.value > 1024

  return {
    width,
    isMobile,
    isTablet,
    isDesktop,
  }
}
