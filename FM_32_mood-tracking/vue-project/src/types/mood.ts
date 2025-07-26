export type MoodValue = -2 | -1 | 0 | 1 | 2

export interface MoodEntry {
  createdAt: string
  mood: MoodValue
  feelings: string[]
  journalEntry: string
  sleepHours: number
}

export interface MoodData {
  moods: MoodEntry[]
}

export interface MoodEntryPartial {
  createdAt: string
  sleepHours: number
  mood?: number
  feelings?: string[]
  journalEntry?: string
}

export interface MoodPostPayload {
  email: string
  mood: number | null
  feelings: string[]
  journalEntry: string
  sleepHours: string | number
}

export interface MoodAverageData {
  titleImg: string | null
  title: string
  arrowImg: string | null
  descr: string
  bckgColor: string
}
