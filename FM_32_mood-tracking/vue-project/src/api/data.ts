export const getDataApi = async () => {
  try {
    const fetchResponse = await fetch('/data.json')
    const response = await fetchResponse.json()
    // const response = data
    // return response.find((el) => el.id === productId)
    return response
  } catch (err) {
    throw new Error(`data response was not ok, error: ${err}`)
  }
}
