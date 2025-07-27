const baseUrl = 'https://darju.ru/moods'
import type { MoodData, MoodPostPayload } from '@/types/mood'

export const getMoodApi = async (email: string, numberOfItems: number): Promise<MoodData> => {
  try {
    const fetchResponse = await fetch(`${baseUrl}/api/moods`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, numberOfItems }),
    })
    const response = await fetchResponse.json()
    return response
  } catch (err) {
    throw new Error(`data response was not ok, error: ${err}`)
  }
}

export const postMoodApi = async (payload: MoodPostPayload): Promise<MoodData> => {
  try {
    const response = await fetch(`${baseUrl}/api/mood`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
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
