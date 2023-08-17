import { settings } from "~/utils"

/**
 * @description 处理alarms
 * @class Handler
 */
class Handler {
  /**
   * @description 处理通知信息
   * @param {EpisodesKey} episodesKey 查询信息的键名
   * @return {*}  {Promise<Array<object>>} 返回处理后的通知信息
   * @memberof Handler
   */
  public async handleNoticeInfo(episodesKey: EpisodesKey): Promise<Array<object>> {
    const episodes: Storages = await chrome.storage.local.get(episodesKey)
    const data: Array<Array<object>> = episodes[episodesKey]

    const now: number = Date.now()

    const future_episodes: Array<object> = []
    for (const items in data) {
      for (const item in data[items]) {
        const pub_ts: number = data[items][item]["pub_ts"] * 1000
        if (now <= pub_ts) {
          const data_json: string = JSON.stringify(data[items][item], [
            "episode_id",
            "ep_cover",
            "pub_index",
            "title",
            "pub_ts",
          ])

          if (future_episodes[0] && future_episodes[0]["pub_ts"] === data[items][item]["pub_ts"]) {
            future_episodes.push(JSON.parse(data_json))
          }

          if (!future_episodes.length) {
            future_episodes.push(JSON.parse(data_json))
          }
        }
      }
    }

    return future_episodes
  }

  /**
   * @description 存储通知信息
   * @param {object} future_episodes 通知信息
   * @param {EpisodesKey} episodesKey 存储信息的键名
   * @memberof Handler
   */
  public storeNoticeInfo(future_episodes: Array<object>, episodesKey: EpisodesKey): void {
    const notices: Array<object> = []
    for (const future_episode in future_episodes) {
      const notice_data: NotificationsParams = {
        id: future_episodes[future_episode]["episode_id"],
        cover: future_episodes[future_episode]["ep_cover"],
        index: future_episodes[future_episode]["pub_index"],
        title: future_episodes[future_episode]["title"],
        time: future_episodes[future_episode]["pub_ts"],
      }
      notices.push(notice_data)
    }

    chrome.storage.local.set({ [`${episodesKey}_notices`]: notices })
  }

  /**
   * @description 推送通知
   * @param {(params: NotificationsParams) => void} imageNotice 通知的方法
   * @param {EpisodesKey} episodesKey 存储通知信息的键名
   * @return {*}  {Promise<void>} 无返回值
   * @memberof Handler
   */
  public async pushNotice(imageNotice: (params: NotificationsParams) => void, episodesKey: EpisodesKey): Promise<void> {
    const notice: boolean = await settings("notice")

    const data: Storages = await chrome.storage.local.get(`${episodesKey}_notices`)

    const now: number = Date.now()

    // TODO: 设计一个超过5秒后也通知的设置
    // 超过5秒后不再通知
    const sec: number = 5 * 1000
    const when: boolean =
      data[`${episodesKey}_notices`][0]["time"] * 1000 + sec > now &&
      now >= data[`${episodesKey}_notices`][0]["time"] * 1000

    if (data[`${episodesKey}_notices`] && when && notice) {
      imageNotice(data[`${episodesKey}_notices`])
    }

    await alarms.create.pushNotice(episodesKey)
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
   * - 每天00:00获取并存储一次番剧时间表
   * @memberof Creator
   */
  public updateData(): void {
    chrome.alarms.create("update_data", {
      periodInMinutes: 60,
      when: new Date().setHours(0, 0, 0, 0),
    })
  }

  /**
   * @description 创建通知alarms
   * @param {EpisodesKey} episodesKey 查询信息的键名
   * @return {*}  {Promise<void>} 无返回值
   * @memberof Creator
   */
  public async pushNotice(episodesKey: EpisodesKey): Promise<void> {
    const future_episodes: Array<object> = await alarms.handle.handleNoticeInfo(episodesKey)
    if (future_episodes.length) {
      const time: number = future_episodes[0]["pub_ts"]

      chrome.alarms.create(`${episodesKey}_push_notice`, {
        when: time * 1000,
      })

      alarms.handle.storeNoticeInfo(future_episodes, episodesKey)
    } else {
      this.pushNotice(episodesKey)
    }
  }
}

const handle: Handler = new Handler()
const create: Creator = new Creator()

const alarms = { handle, create }

export default alarms
