import { AppState } from "~/store"

import { DateTypeKey, EpisodeTypeKey, MessageType, StateType } from "./enums"
import type { MessageRequest, SendResponse, SyncStatePayload } from "./types"

/**
 * @description 剧集信息通信
 * @class Episode
 */
class Episode {
  /**
   * 私有popup类构造方法
   * @private
   * @memberof Popup
   */
  private constructor() {
    return
  }

  /**
   * @description 获取剧集信息
   * @static
   * @async
   * @param {SendResponse} sendResponse 发送通信的方法
   * @param {MessageType.GET_ANIME_EPISODES | MessageType.GET_GUOCHUANG_EPISODES} episodeKey 存储剧集信息的键名
   * @return {*}  {Promise<void>}
   * @memberof Popup
   */
  public static async getEpisodes(
    sendResponse: SendResponse,
    episodeKey: MessageType.GET_ANIME_EPISODES | MessageType.GET_GUOCHUANG_EPISODES,
  ): Promise<void> {
    try {
      // 获取本地缓存的剧集信息
      let key: EpisodeTypeKey
      if (episodeKey === MessageType.GET_ANIME_EPISODES) key = EpisodeTypeKey.ANIME_EPISODES
      if (episodeKey === MessageType.GET_GUOCHUANG_EPISODES) key = EpisodeTypeKey.GUOCHUANG_EPISODES

      const result: object = await chrome.storage.local.get(key)
      if (typeof result[key] === "undefined") return sendResponse({ data: [] })

      sendResponse({ data: result[key] })
    } catch (error: unknown) {
      throw error
    }
  }

  /**
   * @description 获取日期信息
   * @static
   * @async
   * @param {SendResponse} sendResponse 发送通信的方法
   * @return {*}  {Promise<void>}
   * @memberof Popup
   */
  public static async getDate(sendResponse: SendResponse): Promise<void> {
    try {
      // 获取本地缓存的日期信息
      const result: object = await chrome.storage.local.get(DateTypeKey.DATES)
      if (typeof result[DateTypeKey.DATES] === "undefined") return sendResponse({ data: [] })

      sendResponse({ data: result[DateTypeKey.DATES] })
    } catch (error: unknown) {
      throw error
    }
  }

  /**
   * @description 获取全部剧集信息
   * @static
   * @async
   * @param {SendResponse} sendResponse 发送通信的方法
   * @return {*}  {Promise<void>}
   * @memberof Popup
   */
  public static async getAllEpisodes(sendResponse: SendResponse): Promise<void> {
    try {
      // 获取本地缓存的日漫剧集信息
      const anime: object = await chrome.storage.local.get(EpisodeTypeKey.ANIME_EPISODES)
      // 获取本地缓存的国创剧集信息
      const guochuang: object = await chrome.storage.local.get(EpisodeTypeKey.GUOCHUANG_EPISODES)

      const anime_episodes: object[][] = anime[EpisodeTypeKey.ANIME_EPISODES]
      const guochuang_episodes: object[][] = guochuang[EpisodeTypeKey.GUOCHUANG_EPISODES]

      if (typeof anime_episodes === "undefined" && Array.isArray(guochuang_episodes)) {
        return sendResponse({ data: guochuang_episodes })
      } else if (typeof guochuang_episodes === "undefined" && Array.isArray(anime_episodes)) {
        return sendResponse({ data: anime_episodes })
      } else if (typeof anime_episodes === "undefined" && typeof guochuang_episodes === "undefined") {
        return sendResponse({ data: [] })
      }

      // 对剧集信息进行合并
      const episodes: object[][] = Array(Math.max(anime_episodes.length, guochuang_episodes.length))
        .fill(null)
        .map((_episode: object[], index: number): object[] => [...anime_episodes[index], ...guochuang_episodes[index]])

      // 对剧集信息进行排序
      episodes.forEach((episode: object[]): object[] =>
        episode.sort((obj1: object, obj2: object): number => obj1["pub_ts"] - obj2["pub_ts"]),
      )

      sendResponse({ data: episodes })
    } catch (error: unknown) {
      throw error
    }
  }
}

/**
 * @description 状态信息通信
 * @class State
 */
class State {
  /**
   * @description 状态
   * @private
   * @static
   * @type {Omit<AppState, "data">}
   * @memberof State
   */
  private static state: Omit<AppState, "data">

  /**
   * 私有状态类构造方法
   * @memberof State
   */
  private constructor() {
    return
  }

  /**
   * @description 同步状态
   * @static
   * @param {MessageRequest<SyncStatePayload>} message 消息
   * @memberof State
   */
  public static sync(message: MessageRequest<SyncStatePayload>): void {
    const newState: Omit<AppState, "data"> = message.payload.state
    const source: string = message.payload.source

    if (JSON.stringify(newState) !== JSON.stringify(this.state)) {
      this.state = newState

      chrome.runtime.sendMessage<MessageRequest<SyncStatePayload>>({
        type: StateType.UPDATE_STATES,
        payload: { state: this.state, source: source },
      })
    }
  }
}

interface Messages {
  episode: typeof Episode
  state: typeof State
}

const messages: Messages = {
  episode: Episode,
  state: State,
}

export type { Messages }

export default messages
