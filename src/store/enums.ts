/**
 * @description 持久化key
 * @enum {string}
 */
enum PersistKey {
  PREFIX = "bilibili-bangumi:",
  EPISODE = "episode",
  NOTICE = "notice",
  THEME = "theme",
}

/**
 * @description 剧集类型
 * @enum {string}
 */
enum EpisodeType {
  ALL = "all",
  ANIME = "anime",
  GUOCHUANG = "guochuang",
}

export { PersistKey, EpisodeType }
