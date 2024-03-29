import { joinUrl } from "~/utils"

const config = {
  baseURL: "https://api.bilibili.com",
}

/**
 * @description fetch请求
 * @param {ServiceParams} params 请求参数
 * @param {string} params.method 请求方法
 * @param {string} params.mode 请求模式
 * @param {AbortSignal} [params.signal] 取消请求
 * @param {string} params.url 接口URL
 * @param {TimelineParams | Info} params.query 接口参数
 * @return {*}  {ServiceReturn} 返回中止函数和请求结果
 */
function service(params: ServiceParams): ServiceReturn {
  const { method, mode, url, query } = params

  const controller: AbortController = new AbortController()
  const signal: AbortSignal = controller.signal

  return {
    abort: () => controller.abort(),
    ready: fetch(joinUrl({ ...config, url, query }), { method, mode, signal })
      .then((response: Response): Response | Promise<any> => {
        if (response.ok) {
          return response.json()
        }
        return response
      })
      .catch((error: Error): Error => {
        return error
      }),
  }
}

export default service
