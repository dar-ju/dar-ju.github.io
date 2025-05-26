const baseUrl = import.meta.env.VITE_API_BASE_URL

export const getFooterDataApi = async () => {
  try {
    const fetchResponse = await fetch(`${baseUrl}/sections?acf_format=standard&_fields=id,title,slug,acf&slug=footer-description`)
    const response = await fetchResponse.json()
    return response
  } catch (err) {
    throw new Error(`footer data response was not ok: ${err}`)
  }
}

export const getInvitationDataApi = async () => {
  try {
    const fetchResponse = await fetch(`${baseUrl}/sections?acf_format=standard&_fields=id,title,slug,acf&slug=invitation`)
    const response = await fetchResponse.json()
    return response
  } catch (err) {
    throw new Error(`invitation data response was not ok: ${err}`)
  }
}
