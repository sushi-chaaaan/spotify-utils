import { doFetch, handleResponse } from '@/utils/fetch'

export const callApi = async (url: string, options?: RequestInit) => {
  const response = await doFetch(url, options)
  const payload = await handleResponse(response)
  if (!payload.ok) {
    console.debug(await response.clone().text())
    throw new Error(payload.message)
  }
  return payload.data
}
