/**
 * @description popup页面通信
 * @class Popup
 */
class Popup {
  /**
   * @description 获取剧集信息
   * @param {(response?: any) => void} sendResponse 发送通信的方法
   * @param {EpisodesKey} episodesKey 存储剧集信息的键名
   * @return {*}  {Promise<void>} 无返回值
   * @memberof Popup
   */
  public async GetEpisodes(sendResponse: (response?: any) => void, episodesKey: EpisodesKey): Promise<void> {
    const result: Storages = await chrome.storage.local.get(episodesKey)

    if (result[episodesKey]) {
      sendResponse({ data: result[episodesKey] })
    } else {
      this.GetEpisodes(sendResponse, episodesKey)
    }
  }

  /**
   * @description 获取日期信息
   * @param {(response?: any) => void} sendResponse 发送通信的方法
   * @param {DatesKey} datesKey 存储日期信息的键名
   * @return {*}  {Promise<void>} 无返回值
   * @memberof Popup
   */
  public async GetDate(sendResponse: (response?: any) => void, datesKey: DatesKey): Promise<void> {
    const result: Storages = await chrome.storage.local.get(datesKey)

    if (result[datesKey]) {
      sendResponse({ data: result[datesKey] })
    } else {
      this.GetDate(sendResponse, datesKey)
    }
  }

  /**
   * @description 获取全部剧集信息
   * @param {(response?: any) => void} sendResponse 发送通信的方法
   * @return {*}  {Promise<void>} 无返回值
   * @memberof Popup
   */
  public async GetAllEpisodes(sendResponse: (response?: any) => void): Promise<void> {
    const anime: Storages = await chrome.storage.local.get("anime_episodes")
    const guochuang: Storages = await chrome.storage.local.get("guochuang_episodes")

    if (anime["anime_episodes"]?.length === guochuang["guochuang_episodes"]?.length) {
      const episodes: object[][] = []

      for (const i in anime["anime_episodes"]) {
        const episode: object[] = [...anime["anime_episodes"][i], ...guochuang["guochuang_episodes"][i]]
        episodes.push(episode)
      }

      episodes.map((episode: object[]): object[] =>
        episode.sort((obj1: object, obj2: object): number => obj1["pub_ts"] - obj2["pub_ts"]),
      )

      sendResponse({ data: episodes })
    } else {
      this.GetAllEpisodes(sendResponse)
    }
  }
}

const popup: Popup = new Popup()

const messages = { popup }

export default messages
