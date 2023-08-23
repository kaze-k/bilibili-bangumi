import { joinUrl } from "~/utils"

const config = {
  baseURL: "https://api.bilibili.com",
}

/**
 * @description fetch请求
 * @param {Query} query 请求参数
 * @param {string} query.method 请求方法
 * @param {string} query.mode 请求模式
 * @param {string} query.url 接口URL
 * @param {TimelineParams | Info} query.query 接口参数
 * @return {*}  {Promise<APIResponse>} 返回API获取的信息
 */
async function service(query: Query): Promise<APIResponse> {
  return fetch(joinUrl({ ...config, ...query }))
    .then((response: Response): Response | Promise<any> => {
      if (response.ok) {
        return response.json()
      }
      return response
    })
    .catch((error: Error): Error => {
      return error
    })
}

export default service
