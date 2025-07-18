export function useFormatDate(date: Date): string {
  const days: string[] = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]

  const months: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  const day: number = date.getDate()
  const daySuffix: string = getDaySuffix(day)
  const dayOfWeek: string = days[date.getDay()]
  const month: string = months[date.getMonth()]
  const year: number = date.getFullYear()

  return `${dayOfWeek}, ${month} ${day}${daySuffix}, ${year}`
}

function getDaySuffix(day: number): string {
  if (day >= 11 && day <= 13) return 'th'
  switch (day % 10) {
    case 1:
      return 'st'
    case 2:
      return 'nd'
    case 3:
      return 'rd'
    default:
      return 'th'
  }
}
