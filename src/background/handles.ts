import getInfo from "~/service/api/getInfo"
import getTimeline from "~/service/api/getTimeline"
import { settings } from "~/utils"

/**
 * @description 信息处理
 * @class Data
 */
class Data {
  /**
   * @description 获取剧集信息
   * @private
   * @param {EpisodesObj} episodesObj 剧集对象
   * @return {*}  {Promise<EpisodesObj>} 返回处理后的剧集对象
   * @memberof Data
   */
  private async get_episode_info(episodesObj: EpisodesObj): Promise<EpisodesObj> {
    const episodes: any[] = episodesObj.episodes

    for (const episode in episodes) {
      const data: APIResponse = await getInfo({ season_id: episodes[episode].season_id })
      const { rating, stat, styles } = data.result
      episodes[episode].info = { rating, stat, styles }
    }

    return episodesObj
  }

  /**
   * @description 过滤日期信息
   * @private
   * @param {any[]} result 获取的信息结果
   * @return {*}  {object[]} 返回过滤后的日期信息对象
   * @memberof Data
   */
  private filter_dates(result: any[]): object[] {
    const result_dates: object[] = []

    for (const index in result) {
      const dates_json: string = JSON.stringify(result[index], ["date", "date_ts", "day_of_week", "is_today"])
      const dates: object = JSON.parse(dates_json)
      result_dates.push(dates)
    }

    return result_dates
  }

  /**
   * @description 过滤剧集信息
   * @private
   * @param {any[]} result 获取的信息结果
   * @return {*}  {Promise<Array<[]>>} 返回过滤后的剧集信息对象
   * @memberof Data
   */
  private async filter_episodes(result: any[]): Promise<Array<[]>> {
    const result_episodes: Array<[]> = Array(result?.length).fill([])

    for (const index in result) {
      const episodesObj: EpisodesObj = {
        id: index,
        episodes: result[index].episodes,
      }

      const getEpisodesObj: EpisodesObj = await this.get_episode_info(episodesObj)
      if (getEpisodesObj.id === index) {
        result_episodes[getEpisodesObj.id] = getEpisodesObj.episodes
      }
    }

    return result_episodes
  }

  /**
   * @description 存储信息
   * @param {any[]} result 获取的信息结果
   * @param {EpisodesKey} episodesKey 存储剧集信息的键名
   * @param {DatesKey} datesKey 存储日期信息的键名
   * @return {*}  {Promise<void>} 无返回值
   * @memberof Data
   */
  public async storageData(result: any[], episodesKey: EpisodesKey, datesKey: DatesKey): Promise<void> {
    const result_dates: any[] = this.filter_dates(result)
    const result_episodes: any[] = await this.filter_episodes(result)

    const storages: Storages = {
      [episodesKey]: result_episodes,
      [datesKey]: result_dates,
    }

    const storage: boolean = await settings("storage")
    if (storage) {
      chrome.storage.local.set(storages)
    }
  }

  /**
   * @description 处理信息
   * @param {TimelineParams} timelineParams 时间表接口的参数
   * @return {*}  {Promise<void>} 无返回值
   * @memberof Data
   */
  public async handleData(timelineParams: TimelineParams): Promise<void> {
    const { types } = timelineParams

    if (types === 1) {
      const anime_timeline: APIResponse = await getTimeline(timelineParams)

      if (anime_timeline.result) {
        const anime: any[] = anime_timeline.result
        this.storageData(anime, "anime_episodes", "anime_dates")
      } else {
        chrome.storage.local.set({ anime_episodes: undefined, anime_dates: undefined })
      }
    }

    if (types === 4) {
      const guochuang_timeline: APIResponse = await getTimeline(timelineParams)

      if (guochuang_timeline.result) {
        const guochuang: any[] = guochuang_timeline.result
        this.storageData(guochuang, "guochuang_episodes", "guochuang_dates")
      } else {
        chrome.storage.local.set({ guochuang_episodes: undefined, guochuang_dates: undefined })
      }
    }
  }
}

const data: Data = new Data()

const handles = { data }

export default handles
