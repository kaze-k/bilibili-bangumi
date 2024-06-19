import axios from "axios"
import type { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios"

interface BilibiliAPIResponse {
  code?: number
  message?: string
  result?: object | object[]
}

// 创建bilibili服务实例
const bilibili: AxiosInstance = axios.create({
  baseURL: "https://api.bilibili.com",
})

// 请求拦截器
bilibili.interceptors.request.use(
  (config: InternalAxiosRequestConfig<BilibiliAPIResponse>): InternalAxiosRequestConfig<BilibiliAPIResponse> => {
    return config
  },
  (error: Error): void => {
    console.warn(error)
  },
)

// 响应拦截器
bilibili.interceptors.response.use(
  (response: AxiosResponse<BilibiliAPIResponse>): AxiosResponse<BilibiliAPIResponse> => {
    return response
  },
  (error: Error): void => {
    if (error.name === "CanceledError") return
    console.warn(error)
  },
)

export default bilibili
