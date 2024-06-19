import type { AxiosResponse } from "axios"

import { bilibili } from "~/service"

export interface InfoParams {
  season_id: number
}

export interface InfoResponse {
  code?: number
  message?: string
  result?: object
}

/**
 * @description 获取番剧信息
 * @export
 * @param {InfoParams} params 请求参数
 * @param {AbortSignal} [signal] 请求控制 [可选]
 * @return {*}  {Promise<AxiosResponse<InfoResponse>>}
 */
export function getInfo(params: InfoParams, signal?: AbortSignal): Promise<AxiosResponse<InfoResponse>> {
  return bilibili({
    method: "GET",
    url: "pgc/view/web/season",
    signal: signal,
    params: params,
  })
}
