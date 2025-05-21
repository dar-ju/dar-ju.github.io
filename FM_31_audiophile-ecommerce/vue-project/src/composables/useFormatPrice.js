export const useFormatPrice = (value) => {
  if (!value) return ''
  return new Intl.NumberFormat('en-US').format(value)
}
