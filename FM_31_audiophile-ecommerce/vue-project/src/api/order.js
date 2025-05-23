// const baseUrl = import.meta.env.VITE_API_BASE_URL

export const postOrderApi = async (val) => {
  try {
    const formData = new FormData()
    for (const key in val) {
      if (Object.hasOwnProperty.call(val, key)) {
        formData.append(key, val[key])
      }
    }
    const response = await fetch('http://wp-adm-audio.host1438437.hostland.pro/wp-json/contact-form-7/v1/contact-forms/6/feedback', {
      method: 'POST',
      body: formData
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Post data error')
    }
    const successData = await response.json()
    return successData
  } catch (err) {
    console.error('Post error:', err)
    throw err
  }
}
