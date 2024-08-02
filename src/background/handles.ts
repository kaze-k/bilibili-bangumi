import type { AxiosResponse } from "axios"

import { getInfo, getTimeline } from "~/api/bilibili"
import type { InfoResponse, TimelineParams, TimelineResponse } from "~/api/bilibili"

import { DateTypeKey, EpisodeTypeKey } from "./enums"
import type { EpisodesInfo } from "./types"

/**
 * @description 信息处理
 * @class Data
 */
class Data {
  /**
   * @description 请求控制器
   * @private
   * @static
   * @type {AbortController[]}
   * @memberof Data
   */
  private static controllers: AbortController[] = []

  /**
   * 私有数据类构造方法
   * @private
   * @memberof Data
   */
  private constructor() {
    return
  }

  /**
   * @description 取消请求
   * @static
   * @memberof Data
   */
  public static abort(): void {
    this.controllers.forEach((controller: AbortController): void => controller.abort())
  }

  /**
   * @description 转换日期信息
   * @private
   * @static
   * @param {object[]} results 获取的信息结果
   * @return {*}  {object[]} 返回过滤后的日期信息对象
   * @memberof Data
   */
  private static transform_dates(results: object[]): object[] {
    const dates: object[] = []

    // 过滤日期所需字段
    results.forEach((result: object): void => {
      const dates_json: string = JSON.stringify(result, ["date", "date_ts", "day_of_week", "is_today"])
      const date: object = JSON.parse(dates_json)

      dates.push(date)
    })

    return dates
  }

  /**
   * @description 转换剧集信息
   * @private
   * @static
   * @async
   * @param {object[]} results 获取的信息结果
   * @return {*}  {Promise<[][]>} 返回过滤后的剧集信息
   * @memberof Data
   */
  private static async transform_episodes(results: object[]): Promise<object[][]> {
    try {
      const results_episodes: object[][] = []
      const infoMap: Map<number, EpisodesInfo> = new Map<number, EpisodesInfo>()

      // 请求队列
      const requests: Promise<AxiosResponse<InfoResponse>>[] = []

      // 将剧集season_id放入map列表
      results.forEach((result: object): void => {
        const episodes: object[] = result["episodes"]

        episodes.forEach((episode: object): void => {
          const season_id: number = episode["season_id"]
          infoMap.set(season_id, null)
        })
      })

      // 构建请求队列
      for (const season_id of infoMap.keys()) {
        const controller = new AbortController()
        this.controllers.push(controller)

        const request: Promise<AxiosResponse<InfoResponse>> = getInfo({ season_id }, controller.signal)
        requests.push(request)
      }

      // 执行请求
      const requestResults: PromiseSettledResult<AxiosResponse<InfoResponse>>[] = await Promise.allSettled(requests)

      requestResults.forEach((result: PromiseSettledResult<AxiosResponse<InfoResponse>>): void => {
        if (result.status === "fulfilled") {
          const fulfilledResult: PromiseFulfilledResult<AxiosResponse<InfoResponse>> = result
          const data: InfoResponse = fulfilledResult.value?.data

          // 将剧集信息放入对应的map列表位置中
          if (data && data.result) {
            const { rating, stat, styles, season_id } = data.result as {
              rating: object
              stat: object
              styles: string[]
              season_id: number
            }

            infoMap.set(season_id, { rating, stat, styles })
          }
        }
      })

      // 将剧集信息放到对应的剧集信息对象中
      results.forEach((result: object): void => {
        const episodes: object[] = result["episodes"]

        episodes.forEach((episode: object): void => {
          const season_id: number = episode["season_id"]
          if (infoMap.has(season_id) && infoMap.get(season_id) !== null) {
            const { rating, stat, styles } = infoMap.get(season_id)
            episode["info"] = { rating, stat, styles }
          }
        })
      })

      // 将剧集信息从时间表中提取
      results.forEach((result: object): void => {
        const episodes: object[] = result["episodes"]
        results_episodes.push(episodes)
      })

      return results_episodes
    } catch (error: unknown) {
      throw error
    }
  }

  /**
   * @description 存储信息
   * @private
   * @static
   * @async
   * @param {object[]} result 获取的信息结果
   * @param {EpisodeTypeKey} episodeTypeKey 存储剧集信息的键名
   * @return {*}  {Promise<boolean>} 返回存储状态
   * @memberof Data
   */
  private static async storageData(result: object[], episodeTypeKey: EpisodeTypeKey): Promise<boolean> {
    try {
      // 转换日期信息
      const result_dates: object[] = this.transform_dates(result)
      // 转换剧集信息
      const result_episodes: object[][] = await this.transform_episodes(result)

      const storages: object = {
        [episodeTypeKey]: result_episodes,
        [DateTypeKey.DATES]: result_dates,
      }

      // 存储数据
      try {
        await chrome.storage.local.set(storages)
        return true
      } catch (error: unknown) {
        return false
      }
    } catch (error: unknown) {
      throw error
    }
  }

  /**
   * @description 处理时间表信息
   * @private
   * @static
   * @async
   * @param {TimelineParams} timelineParams 时间表接口的参数
   * @param {EpisodeTypeKey} episodeTypeKey 存储剧集信息的键名
   * @return {*}  {(Promise<boolean>)} 返回存储状态
   * @memberof Data
   */
  private static async handle_timeline_data(
    timelineParams: TimelineParams,
    episodeTypeKey: EpisodeTypeKey,
  ): Promise<boolean> {
    try {
      const controller = new AbortController()
      this.controllers.push(controller)

      const request: Promise<AxiosResponse<TimelineResponse>> = getTimeline(timelineParams, controller.signal)
      const timeline: AxiosResponse<TimelineResponse> = await request

      if (!timeline?.data?.result) return false

      // 存储数据
      const result: object[] = timeline?.data?.result

      const status: boolean = await this.storageData(result, episodeTypeKey)

      return status
    } catch (error: unknown) {
      throw error
    }
  }

  /**
   * @description 处理信息
   * @static
   * @async
   * @param {TimelineParams} timelineParams 时间表接口的参数
   * @return {*}  {Promise<boolean>} 返回存储状态
   * @memberof Data
   */
  public static async handleData(timelineParams: TimelineParams): Promise<boolean> {
    try {
      const { types } = timelineParams

      // 请求日漫时间表信息
      if (types === 1) {
        const status: boolean = await this.handle_timeline_data(timelineParams, EpisodeTypeKey.ANIME_EPISODES)

        return status
      }

      // 请求国创时间表信息
      if (types === 4) {
        const status: boolean = await this.handle_timeline_data(timelineParams, EpisodeTypeKey.GUOCHUANG_EPISODES)

        return status
      }
    } catch (error: unknown) {
      throw error
    }
  }
}

interface Handles {
  data: typeof Data
}

const handles: Handles = {
  data: Data,
}

export type { Handles }

export default handles
