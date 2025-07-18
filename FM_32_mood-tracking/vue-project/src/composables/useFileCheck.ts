export const useFileCheck = (e: Event): boolean => {
  const input = e.target as HTMLInputElement
  if (!input.files || input.files.length === 0) return false

  const file = input.files[0]

  const maxSize = 250 * 1024
  const allowedTypes = ['image/png', 'image/jpeg']

  if (!allowedTypes.includes(file.type)) {
    input.value = ''
    return false
  }

  if (file.size > maxSize) {
    input.value = ''
    return false
  }

  return true
}
