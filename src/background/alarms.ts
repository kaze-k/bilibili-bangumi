import { PersistKey } from "~/store/enums"
import { settings } from "~/utils"

import { AlarmType, EpisodeTypeKey } from "./enums"
import type { Notifications } from "./notifications"
import type { NotificationsParams } from "./types"

/**
 * @description 处理alarms
 * @class Handler
 */
class Handler {
  /**
   * 私有处理类构造方法
   * @private
   * @memberof Handler
   */
  private constructor() {
    return
  }

  /**
   * @description 提取时间表信息
   * @private
   * @static
   * @async
   * @param {EpisodeTypeKey} episodeTypeKey 查询信息的键名
   * @return {*}  {Promise<object[] | undefined>} 返回时间表信息
   * @memberof Handler
   */
  private static async get_episodes_info(episodeTypeKey: EpisodeTypeKey): Promise<object[] | undefined> {
    try {
      // 请求时间表信息
      const result: object = await chrome.storage.local.get(episodeTypeKey)

      if (typeof result[episodeTypeKey] === "undefined") return

      // 提取时间表信息
      const episodes: object[][] = result[episodeTypeKey]

      // 过滤剧集信息字段
      const episodes_info: object[] = episodes
        .find((arr: object[]): boolean => arr === episodes[Math.floor(episodes.length / 2)])
        .map((obj: object): object[] => {
          const data: string = JSON.stringify(obj, [
            "ep_cover",
            "episode_id",
            "pub_index",
            "pub_ts",
            "title",
            "published",
          ])

          return JSON.parse(data)
        })

      return episodes_info
    } catch (error: unknown) {
      throw error
    }
  }

  /**
   * @description 处理通知信息
   * @private
   * @static
   * @async
   * @param {EpisodeTypeKey} episodeTypeKey 查询信息的键名
   * @param {number} scheduledTime 即将更新的时间
   * @return {*}  {Promise<NotificationsParams[] | undefined>} 返回处理后的通知信息
   * @memberof Handler
   */
  private static async get_notice_info(
    episodeTypeKey: EpisodeTypeKey,
    scheduledTime: number,
  ): Promise<NotificationsParams[] | undefined> {
    try {
      // 提取时间表信息
      const episodes_info: object[] | undefined = await this.get_episodes_info(episodeTypeKey)

      if (typeof episodes_info === "undefined") return

      const time: number = scheduledTime / 1000

      // 获取最新的通知信息
      const notice_info: NotificationsParams[] = episodes_info
        .map((obj: object): NotificationsParams => {
          if (time === obj["pub_ts"]) {
            const info: NotificationsParams = {
              ep_cover: obj["ep_cover"],
              id: obj["episode_id"],
              index: obj["pub_index"],
              time: obj["pub_ts"],
              title: obj["title"],
              published: Boolean(obj["published"]),
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
    } catch (error: unknown) {
      throw error
    }
  }

  /**
   * @description 推送通知
   * @static
   * @async
   * @param {Notifications} notifications 创建通知的对象
   * @param {EpisodeTypeKey} episodeTypeKey 查询信息的键名
   * @param {number} scheduledTime 即将更新的时间
   * @return {*}  {Promise<void>}
   * @memberof Handler
   */
  public static async pushNotice(
    notifications: Notifications,
    episodeTypeKey: EpisodeTypeKey,
    scheduledTime: number,
  ): Promise<void> {
    try {
      // 获取通知设置
      const notice: boolean = await settings<boolean>(PersistKey.NOTICE, "toggle")

      const now: number = Math.floor(Date.now() / 100000)
      const time: number = Math.floor(scheduledTime / 100000)

      if (notice && now === time) {
        // 获取通知信息
        const notice_info: NotificationsParams[] | undefined = await this.get_notice_info(episodeTypeKey, scheduledTime)

        if (typeof notice_info === "undefined") return

        // 创建通知
        await notifications.create.imageNotice(alarms, notice_info)
      }

      // 创建通知alarms
      if (notice) await alarms.create.pushNotice(episodeTypeKey)
    } catch (error: unknown) {
      throw error
    }
  }

  /**
   * @description 获取即将更新的时间
   * @static
   * @async
   * @param {EpisodeTypeKey} episodeTypeKey 查询信息的键名
   * @return {*}  {Promise<number | undefined>} 返回即将更新的时间
   * @memberof Handler
   */
  public static async getTime(episodeTypeKey: EpisodeTypeKey): Promise<number | undefined> {
    try {
      // 获取本地缓存的时间表信息
      const times: object = await chrome.storage.local.get(episodeTypeKey)
      const data: object[][] = times[episodeTypeKey]

      if (typeof data === "undefined") return

      const now: number = Date.now()

      // 当前时间小于或等于即将更新的时间，返回即将更新的时间
      for (const episodes of data) {
        for (const episode of episodes) {
          const pub_ts: number = episode["pub_ts"] * 1000
          if (now <= pub_ts) {
            return pub_ts
          }
        }
      }
    } catch (error: unknown) {
      throw error
    }
  }
}

/**
 * @description 创建alarms
 * @class Creator
 */
class Creator {
  /**
   * 私有创建类构造方法
   * @private
   * @memberof Creator
   */
  private constructor() {
    return
  }

  /**
   * @description 更新信息alarms
   * - 每隔30分钟获取并存储一次番剧时间表
   * @static
   * @memberof Creator
   */
  public static updateData(): void {
    chrome.alarms.create(AlarmType.UPDATE_DATA, {
      periodInMinutes: 30,
    })
  }

  /**
   * @description 创建通知alarms
   * @static
   * @async
   * @param {EpisodeTypeKey} episodeTypeKey 查询信息的键名
   * @return {*}  {Promise<boolean>}
   * @memberof Creator
   */
  public static async pushNotice(episodeTypeKey: EpisodeTypeKey): Promise<boolean> {
    try {
      const time: number | undefined = await alarms.handle.getTime(episodeTypeKey)

      let noticeName: string
      if (typeof time === "undefined") {
        if (episodeTypeKey === EpisodeTypeKey.ANIME_EPISODES) noticeName = AlarmType.GET_ANIME_EPISODES
        else if (episodeTypeKey === EpisodeTypeKey.GUOCHUANG_EPISODES) noticeName = AlarmType.GET_GUOCHUANG_EPISODES
        else return false

        // 创建获取推送通知alarms
        chrome.alarms.create(noticeName, {
          periodInMinutes: 1,
        })

        return false
      }

      if (episodeTypeKey === EpisodeTypeKey.ANIME_EPISODES) noticeName = AlarmType.ANIME_EPISODES_PUSH_NOTICE
      else if (episodeTypeKey === EpisodeTypeKey.GUOCHUANG_EPISODES)
        noticeName = AlarmType.GUOCHUANG_EPISODES_PUSH_NOTICE
      else return false

      // 创建推送通知alarms
      chrome.alarms.create(noticeName, {
        when: time,
      })

      // 获取推送通知alarms
      const alarm: chrome.alarms.Alarm = await chrome.alarms.get(noticeName)
      if (alarm.name && alarm.scheduledTime) return true

      return false
    } catch (error: unknown) {
      throw error
    }
  }

  /**
   * @description 自动清除通知
   * @static
   * @async
   * @param {string} id 通知的id
   * @return {*}  {Promise<void>}
   * @memberof Creator
   */
  public static async clearNotice(id: string): Promise<void> {
    try {
      // 获取自动清除通知设置
      const autoClear: boolean = await settings<boolean>(PersistKey.NOTICE, "autoClear")
      // 获取通知超时设置
      const timeout: number = await settings<number>(PersistKey.NOTICE, "timeout")

      // 创建自动清除通知alarms
      if (autoClear && timeout) {
        const time: number = Date.now() + timeout

        chrome.alarms.create(`${id}`, {
          when: time,
        })
      }
    } catch (error: unknown) {
      throw error
    }
  }
}

interface Alarms {
  handle: typeof Handler
  create: typeof Creator
}

const alarms: Alarms = {
  handle: Handler,
  create: Creator,
}

export type { Alarms }

export default alarms
