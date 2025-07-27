const cloudName = 'dhgsvt499'
const uploadPreset = 'moods-imgs'

export const uploadToCloudinary = async (file: File): Promise<string | null> => {
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', uploadPreset)

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    })
    const data = await response.json()
    if (data.secure_url) {
      return data.secure_url
    } else {
      console.error('Upload failed:', data)
      return null
    }
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error)
    return null
  }
}
