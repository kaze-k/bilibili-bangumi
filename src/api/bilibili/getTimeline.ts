import type { AxiosResponse } from "axios"

import { bilibili } from "~/service"

export interface TimelineParams {
  types: number
  before?: number
  after?: number
}

export interface TimelineResponse {
  code?: number
  message?: string
  result?: object[]
}

/**
 * @description 获取动漫时间表
 * @export
 * @param {TimelineParams} params 请求参数
 * @param {AbortSignal} [signal] 请求控制 [可选]
 * @return {*}  {Promise<AxiosResponse<TimelineResponse>>}
 */
export function getTimeline(params: TimelineParams, signal?: AbortSignal): Promise<AxiosResponse<TimelineResponse>> {
  return bilibili({
    method: "GET",
    url: "pgc/web/timeline",
    signal: signal,
    params: params,
  })
}
