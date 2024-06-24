import axios from 'axios'
import { API_URL } from '@/api/api'

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 8000,
  withCredentials: true,
})

// fetcher for swr
export const fetcher = (url) => axiosInstance.get(url).then((res) => res.data)
export const fetchWithToken = (url, token) => {
  axiosInstance.get(`${url}&${token}`).then((res) => res.data)
}

export const fetcherWithObject = ({ url, args }) => {
  const extraParams = new URLSearchParams(args)
  const andSymbol = extraParams.toString() ? '&' : ''

  const combinedUrl = url + andSymbol + extraParams.toString()

  console.log(combinedUrl)

  axiosInstance.get(combinedUrl).then((res) => res.data)
}

export default axiosInstance