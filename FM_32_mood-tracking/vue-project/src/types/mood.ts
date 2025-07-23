export type MoodValue = -2 | -1 | 0 | 1 | 2

export interface MoodEntry {
  createdAt: string
  mood: MoodValue
  feelings: string[]
  journalEntry: string
  sleepHours: number
}

export interface MoodData {
  moodEntries: MoodEntry[]
}

export interface MoodEntryPartial {
  createdAt: string
  sleepHours: number
  mood?: number
  feelings?: string[]
  journalEntry?: string
}
