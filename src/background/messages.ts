/**
 * @description popup页面通信
 * @class Popup
 */
class Popup {
  /**
   * @description 获取剧集信息
   * @static
   * @param {SendResponse} sendResponse 发送通信的方法
   * @param {EpisodesKey} episodesKey 存储剧集信息的键名
   * @return {*}  {Promise<void>} 无返回值
   * @memberof Popup
   */
  public static async getEpisodes(sendResponse: SendResponse, episodesKey: EpisodesKey): Promise<void> {
    const result: Storages = await chrome.storage.local.get(episodesKey)

    if (result[episodesKey]) {
      sendResponse({ data: result[episodesKey] })
    } else {
      this.getEpisodes(sendResponse, episodesKey)
    }
  }

  /**
   * @description 获取日期信息
   * @static
   * @param {SendResponse} sendResponse 发送通信的方法
   * @param {DatesKey} datesKey 存储日期信息的键名
   * @return {*}  {Promise<void>} 无返回值
   * @memberof Popup
   */
  public static async getDate(sendResponse: SendResponse, datesKey: DatesKey): Promise<void> {
    const result: Storages = await chrome.storage.local.get(datesKey)

    if (result[datesKey]) {
      sendResponse({ data: result[datesKey] })
    } else {
      this.getDate(sendResponse, datesKey)
    }
  }

  /**
   * @description 获取全部剧集信息
   * @static
   * @param {SendResponse} sendResponse 发送通信的方法
   * @return {*}  {Promise<void>} 无返回值
   * @memberof Popup
   */
  public static async getAllEpisodes(sendResponse: SendResponse): Promise<void> {
    const anime: Storages = await chrome.storage.local.get("anime_episodes")
    const guochuang: Storages = await chrome.storage.local.get("guochuang_episodes")

    if (anime["anime_episodes"]?.length === guochuang["guochuang_episodes"]?.length) {
      const episodes: {}[][] = []

      for (const i in anime["anime_episodes"]) {
        const episode: {}[] = [...anime["anime_episodes"][i], ...guochuang["guochuang_episodes"][i]]
        episodes.push(episode)
      }

      episodes.map((episode: {}[]): {}[] =>
        episode.sort((obj1: {}, obj2: {}): number => obj1["pub_ts"] - obj2["pub_ts"]),
      )

      sendResponse({ data: episodes })
    } else {
      this.getAllEpisodes(sendResponse)
    }
  }
}

const messages = {
  popup: Popup,
}

export default messages
