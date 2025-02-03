export const getDataApi = async () => {
  try {
    const fetchResponse = await fetch('../data/data.json')
    const response = await fetchResponse.json()
    console.log(response);

    return response
  } catch (err) {
    throw new Error(`data response was not ok, error: ${err}`)
  }
}
