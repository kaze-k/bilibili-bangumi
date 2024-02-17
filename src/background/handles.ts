import getInfo from "~/service/api/getInfo"
import getTimeline from "~/service/api/getTimeline"
import { settings } from "~/utils"

/**
 * @description 信息处理
 * @class Data
 */
class Data {
  /**
   * 私有数据类构造函数
   * @private
   * @memberof Data
   */
  private constructor() {}

  /**
   * @description 获取剧集信息
   * @private
   * @static
   * @async
   * @param {any} episodesObj 剧集对象
   * @return {*}  {Promise<any>} 返回处理后的剧集对象
   * @memberof Data
   */
  private static async get_episode_info(episodesObj: any): Promise<any> {
    const episodes: any[] = episodesObj.episodes

    const promises: Promise<APIResponse>[] = []

    for (const episode of episodes) {
      const data: Promise<APIResponse> = getInfo({ season_id: episode.season_id })
      promises.push(data)
    }

    await Promise.allSettled(promises).then((result: PromiseFulfilledResult<APIResponse>[]): void => {
      for (const index in result) {
        if (result[index].status === "fulfilled") {
          if (result[index].value && result[index].value.result) {
            const { rating, stat, styles } = result[index].value.result
            episodes[index].info = { rating, stat, styles }
          }
        }
      }
    })

    return episodesObj
  }

  /**
   * @description 过滤日期信息
   * @private
   * @static
   * @param {any[]} result 获取的信息结果
   * @return {*}  {{}[]} 返回过滤后的日期信息对象
   * @memberof Data
   */
  private static filter_dates(result: any[]): {}[] {
    const result_dates: {}[] = []

    for (const index in result) {
      const dates_json: string = JSON.stringify(result[index], ["date", "date_ts", "day_of_week", "is_today"])
      const dates: {} = JSON.parse(dates_json)
      result_dates.push(dates)
    }

    return result_dates
  }

  /**
   * @description 过滤剧集信息
   * @private
   * @static
   * @async
   * @param {any[]} result 获取的信息结果
   * @return {*}  {Promise<[][]>} 返回过滤后的剧集信息
   * @memberof Data
   */
  private static async filter_episodes(result: any[]): Promise<[][]> {
    const results_episodes: [][] = Array(result?.length).fill([])

    const promises: Promise<any>[] = []

    for (const res of result) {
      const episodes: Promise<any> = this.get_episode_info(res)
      promises.push(episodes)
    }

    await Promise.allSettled(promises).then((result: PromiseFulfilledResult<any>[]): void => {
      for (const index in result) {
        if (result[index].status === "fulfilled") {
          if (result[index].value && result[index].value.episodes) {
            results_episodes[index] = result[index].value.episodes
          }
        }
      }
    })

    return results_episodes
  }

  /**
   * @description 存储信息
   * @private
   * @static
   * @async
   * @param {any[]} result 获取的信息结果
   * @param {EpisodesKey} episodesKey 存储剧集信息的键名
   * @param {DatesKey} datesKey 存储日期信息的键名
   * @return {*}  {Promise<boolean | undefined>} 返回true或undefined
   * @memberof Data
   */
  private static async storageData(
    result: any[],
    episodesKey: EpisodesKey,
    datesKey: DatesKey,
  ): Promise<boolean | undefined> {
    const result_dates: {}[] = this.filter_dates(result)
    const result_episodes: [][] = await this.filter_episodes(result)

    const storages: Storages = {
      [episodesKey]: result_episodes,
      [datesKey]: result_dates,
    }

    const storage: boolean = await settings("storage")
    if (storage) {
      await chrome.storage.local.set(storages)

      return true
    }
  }

  /**
   * @description 处理信息
   * @static
   * @async
   * @param {TimelineParams} timelineParams 时间表接口的参数
   * @return {*}  {Promise<boolean | undefined>} 返回true或undefined
   * @memberof Data
   */
  public static async handleData(timelineParams: TimelineParams): Promise<boolean | undefined> {
    const { types } = timelineParams

    if (types === 1) {
      const anime_timeline: APIResponse = await getTimeline(timelineParams)

      if (anime_timeline.result) {
        const anime: any[] = anime_timeline.result
        const result: boolean | undefined = await this.storageData(anime, "anime_episodes", "anime_dates")

        return result
      }
    }

    if (types === 4) {
      const guochuang_timeline: APIResponse = await getTimeline(timelineParams)

      if (guochuang_timeline.result) {
        const guochuang: any[] = guochuang_timeline.result
        const result: boolean | undefined = await this.storageData(guochuang, "guochuang_episodes", "guochuang_dates")

        return result
      }
    }
  }
}

const handles = {
  data: Data,
}

export default handles
