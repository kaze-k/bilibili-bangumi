import getTimeline from "~/service/api/getTimeline"
import { settings } from "~/utils"

/**
 * @description 处理alarms
 * @class Handler
 */
class Handler {
  /**
   * @description 请求当天的时间表的信息
   * @private
   * @static
   * @param {EpisodesKey} episodesKey 查询信息的键名
   * @return {*}  {Promise<{}[]>} 返回当天的时间表信息
   * @memberof Handler
   */
  private static async get_response(episodesKey: EpisodesKey): Promise<{}[]> {
    let response: APIResponse

    if (episodesKey === "anime_episodes") {
      response = await getTimeline({ types: 1, before: 0, after: 0 })
    }

    if (episodesKey === "guochuang_episodes") {
      response = await getTimeline({ types: 4, before: 0, after: 0 })
    }

    const result: {}[] = response.result[0]["episodes"]

    // code: 0 请求成功
    if (!response.code) {
      return result
    }
  }

  /**
   * @description 提取时间表信息
   * @private
   * @static
   * @param {EpisodesKey} episodesKey 查询信息的键名
   * @return {*}  {Promise<{}[]>} 返回时间表信息
   * @memberof Handler
   */
  private static async get_episodesInfo(episodesKey: EpisodesKey): Promise<{}[]> {
    const result: {}[] = await this.get_response(episodesKey)

    const episodes_info: {}[] = result.map((obj: {}): {}[] => {
      const data: string = JSON.stringify(obj, ["ep_cover", "episode_id", "pub_index", "pub_ts", "title", "published"])

      return JSON.parse(data)
    })

    return episodes_info
  }

  /**
   * @description 处理通知信息
   * @private
   * @static
   * @param {EpisodesKey} episodesKey 查询信息的键名
   * @param {number} scheduledTime 即将更新的时间
   * @return {*}  {Promise<NotificationsParams[]>} 返回处理后的通知信息
   * @memberof Handler
   */
  private static async get_noticeInfo(episodesKey: EpisodesKey, scheduledTime: number): Promise<NotificationsParams[]> {
    const episodes_info: {}[] = await this.get_episodesInfo(episodesKey)
    const time: number = scheduledTime - 50 * 1000

    const notice_info: NotificationsParams[] = episodes_info
      .map((obj: {}): NotificationsParams => {
        if (time === obj["pub_ts"] * 1000) {
          const info: NotificationsParams = {
            cover: obj["ep_cover"],
            id: obj["episode_id"],
            index: obj["pub_index"],
            time: obj["pub_ts"],
            title: obj["title"],
            published: obj["published"],
          }

          return info
        }
      })
      .filter((value: NotificationsParams): NotificationsParams => {
        if (typeof value !== "undefined") {
          return value
        }
      })

    return notice_info
  }

  /**
   * @description 推送通知
   * @static
   * @param {Notifications.creator} noticeCreate 创建通知的对象
   * @param {EpisodesKey} episodesKey 查询信息的键名
   * @param {number} scheduledTime 即将更新的时间
   * @return {*}  {Promise<void>} 无返回值
   * @memberof Handler
   */
  public static async pushNotice(
    noticeCreate: Notifications.creator,
    episodesKey: EpisodesKey,
    scheduledTime: number,
  ): Promise<void> {
    const notice: boolean = await settings("notice")

    const now: number = Math.floor(Date.now() / 1000)
    const time: number = Math.floor(scheduledTime / 1000)

    if (notice && now === time) {
      const notice_info: NotificationsParams[] = await this.get_noticeInfo(episodesKey, scheduledTime)

      await noticeCreate.imageNotice(alarms.create, notice_info)

      await alarms.create.pushNotice(episodesKey)
    }
  }

  /**
   * @description 获取即将更新的时间
   * @static
   * @param {EpisodesKey} episodesKey 查询信息的键名
   * @return {*}  {Promise<number>} 返回即将更新的时间
   * @memberof Handler
   */
  public static async getTime(episodesKey: EpisodesKey): Promise<number> {
    const episodes: Storages = await chrome.storage.local.get(episodesKey)
    const data: {}[][] = episodes[episodesKey]

    const now: number = Date.now()

    for (const episodes in data) {
      for (const episode in data[episodes]) {
        const pub_ts: number = data[episodes][episode]["pub_ts"] * 1000
        if (now <= pub_ts) {
          const data_json: string = JSON.stringify(data[episodes][episode], ["pub_ts"])
          const time: number = JSON.parse(data_json)["pub_ts"]

          return time
        }
      }
    }
  }
}

/**
 * @description 创建alarms
 * @class Creator
 */
class Creator {
  /**
   * @description 更新信息alarms
   * - 每隔1个小时获取并存储一次番剧时间表
   * @static
   * @memberof Creator
   */
  public static updateData(): void {
    chrome.alarms.create("update_data", {
      periodInMinutes: 60,
    })
  }

  /**
   * @description 创建通知alarms
   * @static
   * @param {EpisodesKey} episodesKey 查询信息的键名
   * @return {*}  {Promise<void>} 无返回值
   * @memberof Creator
   */
  public static async pushNotice(episodesKey: EpisodesKey): Promise<void> {
    // 延迟50秒时间后向接口发起请求
    const timeout: number = 50 * 1000

    const time: number = (await alarms.handle.getTime(episodesKey)) * 1000 + timeout

    if (time) {
      chrome.alarms.create(`${episodesKey}_push_notice`, {
        when: time,
      })
    } else {
      this.pushNotice(episodesKey)
    }
  }

  /**
   * @description 自动清除通知
   * @static
   * @param {string} id 通知的id
   * @return {*}  {Promise<void>} 无返回值
   * @memberof Creator
   */
  public static async clearNotice(id: string): Promise<void> {
    const autoClear: boolean = await settings("notice", "autoClear")
    const timeout: number = await settings("notice", "timeout")

    const time: number = Date.now() + timeout

    if (autoClear) {
      chrome.alarms.create(`${id}`, {
        when: time,
      })
    }
  }
}

const alarms = {
  handle: Handler,
  create: Creator,
}

export default alarms
