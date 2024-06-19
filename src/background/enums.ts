/**
 * @description alarm类型
 * @enum {string}
 */
enum AlarmType {
  UPDATE_DATA = "update_data",
  ANIME_EPISODES_PUSH_NOTICE = "anime_episodes_push_notice",
  GUOCHUANG_EPISODES_PUSH_NOTICE = "guochuang_episodes_push_notice",
  GET_ANIME_EPISODES = "get-anime-episodes",
  GET_GUOCHUANG_EPISODES = "get-guochuang-episodes",
}

/**
 * @description 消息类型
 * @enum {string}
 */
enum MessageType {
  ABORT = "abort",
  UPDATE = "update",
  GET_ALL_EPISODES = "get_all_episodes",
  GET_ANIME_EPISODES = "get_anime_episodes",
  GET_GUOCHUANG_EPISODES = "get_guochuang_episodes",
  DATES = "dates",
  ENABLE_NOTICES = "enable_notice",
  DISABLE_NOTICES = "disable_notice",
  ENABLE_ANIME_NOTICE = "enable_anime_notice",
  DISABLE_ANIME_NOTICE = "disable_anime_notice",
  ENABLE_GUOCHUANG_NOTICE = "enable_guochuang_notice",
  DISABLE_GUOCHUANG_NOTICE = "disable_guochuang_notice",
}

/**
 * @description 番剧类型键
 * @enum {string}
 */
enum EpisodeTypeKey {
  ANIME_EPISODES = "anime_episodes",
  GUOCHUANG_EPISODES = "guochuang_episodes",
}

/**
 * @description 日期类型键
 * @enum {string}
 */
enum DateTypeKey {
  DATES = "dates",
}

/**
 * @description 通知id类型
 * @enum {string}
 */
enum NotificationIdType {
  UPDATE = "update-notice",
}

/**
 * @description 状态类型
 * @enum {string}
 */
enum StateType {
  UPDATE_STATES = "update_states",
  SYNC_STATES = "sync_states",
}

export { AlarmType, MessageType, EpisodeTypeKey, DateTypeKey, NotificationIdType, StateType }
