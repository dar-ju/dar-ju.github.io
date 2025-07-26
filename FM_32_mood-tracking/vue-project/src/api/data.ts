const baseUrl = import.meta.env.VITE_BASE_URL

import type { MoodData } from '@/types/mood'

export const getMoodApi = async (email, numberOfItems): Promise<MoodData> => {
  try {
    const fetchResponse = await fetch(`${baseUrl}/api/moods`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, numberOfItems }),
    })
    const response = await fetchResponse.json()
    return response
  } catch (err) {
    throw new Error(`data response was not ok, error: ${err}`)
  }
}

export const postMoodApi = async ({ email, mood, feelings, journalEntry, sleepHours }) => {
  try {
    const response = await fetch(`${baseUrl}/api/mood`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, mood, feelings, journalEntry, sleepHours }),
    })
    if (!response.ok) {
      const { error } = await response.json()
      throw new Error(error)
    }
    return await response.json()
  } catch (error) {
    console.error('Mood post error:', error)
    throw error
  }
}
