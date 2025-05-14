async function getJob() {
  try {
    const response = await fetch('./data.json')
    const data = response.json()
    return data;
  } catch (err) {
    console.error('data read error:', err)
  }
}

export const getJobApi = () => {
  return getJob()
}
