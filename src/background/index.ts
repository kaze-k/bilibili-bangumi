import alarms from "./alarms"
import { AlarmType, EpisodeTypeKey, MessageType, StateType } from "./enums"
import handles from "./handles"
import messages from "./messages"
import notifications from "./notifications"
import type { MessageRequest, SendResponse, SyncStatePayload } from "./types"

// 安装触发的事件
chrome.runtime.onInstalled.addListener((details: chrome.runtime.InstalledDetails): void => {
  if (details.reason === "install") {
    alarms.create.updateData()
  }

  if (details.reason == "update") {
    notifications.create.updateNotice(details.previousVersion)
  }
})

// 浏览器启动触发的事件
chrome.runtime.onStartup.addListener((): void => {
  Promise.allSettled([
    handles.data.handleData({ types: 1, before: 7, after: 7 }),
    handles.data.handleData({ types: 4, before: 7, after: 7 }),
  ])
})

// 接收通信触发的事件
chrome.runtime.onMessage.addListener(
  (message: MessageRequest, _sender: chrome.runtime.MessageSender, sendResponse: SendResponse): boolean | undefined => {
    switch (message.type) {
      // 终止请求
      case MessageType.ABORT:
        handles.data.abort()
        sendResponse(true)
        return false

      // 更新信息
      case MessageType.UPDATE:
        Promise.all([
          handles.data.handleData({ types: 1, before: 7, after: 7 }),
          handles.data.handleData({ types: 4, before: 7, after: 7 }),
        ])
          .then((result: boolean[]): void => sendResponse(result.every((value: boolean): boolean => value)))
          .catch((): void => sendResponse(false))
        return true

      // 获取日漫和国创的信息
      case MessageType.GET_ALL_EPISODES:
        messages.episode.getAllEpisodes(sendResponse)
        return true

      // 获取日漫信息
      case MessageType.GET_ANIME_EPISODES:
        messages.episode.getEpisodes(sendResponse, message.type)
        return true

      // 获取国创信息
      case MessageType.GET_GUOCHUANG_EPISODES:
        messages.episode.getEpisodes(sendResponse, message.type)
        return true

      // 获取日期信息
      case MessageType.DATES:
        messages.episode.getDate(sendResponse)
        return true

      // 开启通知
      case MessageType.ENABLE_NOTICES:
        Promise.all([
          alarms.create.pushNotice(EpisodeTypeKey.ANIME_EPISODES),
          alarms.create.pushNotice(EpisodeTypeKey.GUOCHUANG_EPISODES),
        ])
          .then((result: boolean[]): void => sendResponse(result.every((value: boolean): boolean => value)))
          .catch((): void => sendResponse(false))
        return true

      // 禁止通知
      case MessageType.DISABLE_NOTICES:
        Promise.all([
          chrome.alarms.clear(AlarmType.ANIME_EPISODES_PUSH_NOTICE),
          chrome.alarms.clear(AlarmType.GUOCHUANG_EPISODES_PUSH_NOTICE),
        ])
          .then((result: boolean[]): void => sendResponse(result.every((value: boolean): boolean => value)))
          .catch((): void => sendResponse(false))
        return true

      // 开启番剧通知
      case MessageType.ENABLE_ANIME_NOTICE:
        alarms.create
          .pushNotice(EpisodeTypeKey.ANIME_EPISODES)
          .then((result: boolean): void => sendResponse(result))
          .catch((): void => sendResponse(false))
        return true

      // 禁止番剧通知
      case MessageType.DISABLE_ANIME_NOTICE:
        chrome.alarms
          .clear(AlarmType.ANIME_EPISODES_PUSH_NOTICE)
          .then((result: boolean): void => sendResponse(result))
          .catch((): void => sendResponse(false))
        return true

      // 开启国创通知
      case MessageType.ENABLE_GUOCHUANG_NOTICE:
        alarms.create
          .pushNotice(EpisodeTypeKey.GUOCHUANG_EPISODES)
          .then((result: boolean): void => sendResponse(result))
          .catch((): void => sendResponse(false))
        return true

      // 禁止国创通知
      case MessageType.DISABLE_GUOCHUANG_NOTICE:
        chrome.alarms
          .clear(AlarmType.GUOCHUANG_EPISODES_PUSH_NOTICE)
          .then((result: boolean): void => sendResponse(result))
          .catch((): void => sendResponse(false))
        return true

      case StateType.SYNC_STATES:
        // 同步状态
        messages.state.sync(message as MessageRequest<SyncStatePayload>)
        return false
    }
  },
)

// alarm触发的事件
chrome.alarms.onAlarm.addListener((alarm: chrome.alarms.Alarm): void => {
  switch (alarm.name) {
    // 更新信息
    case AlarmType.UPDATE_DATA:
      Promise.allSettled([
        handles.data.handleData({ types: 1, before: 7, after: 7 }),
        handles.data.handleData({ types: 4, before: 7, after: 7 }),
      ])
      break

    // 推送日漫更新通知
    case AlarmType.ANIME_EPISODES_PUSH_NOTICE:
      handles.data
        .handleData({ types: 1, before: 7, after: 7 })
        .then(
          (): Promise<void> =>
            alarms.handle.pushNotice(notifications, EpisodeTypeKey.ANIME_EPISODES, alarm.scheduledTime),
        )
        .catch((error: unknown): void => {
          throw error
        })
      break

    // 推送国创更新通知
    case AlarmType.GUOCHUANG_EPISODES_PUSH_NOTICE:
      handles.data
        .handleData({ types: 4, before: 7, after: 7 })
        .then(
          (): Promise<void> =>
            alarms.handle.pushNotice(notifications, EpisodeTypeKey.GUOCHUANG_EPISODES, alarm.scheduledTime),
        )
        .catch((error: unknown): void => {
          throw error
        })
      break

    case AlarmType.GET_ANIME_EPISODES:
      handles.data
        .handleData({ types: 4, before: 7, after: 7 })
        .then((): Promise<boolean> => alarms.create.pushNotice(EpisodeTypeKey.GUOCHUANG_EPISODES))
        .then((result: boolean): Promise<boolean> => result && chrome.alarms.clear(alarm.name))
        .catch((error: unknown): void => {
          throw error
        })
      break

    case AlarmType.GET_GUOCHUANG_EPISODES:
      handles.data
        .handleData({ types: 1, before: 7, after: 7 })
        .then((): Promise<boolean> => alarms.create.pushNotice(EpisodeTypeKey.ANIME_EPISODES))
        .then((result: boolean): Promise<boolean> => result && chrome.alarms.clear(alarm.name))
        .catch((error: unknown): void => {
          throw error
        })
      break

    default:
      // 清除通知
      if (!isNaN(Number(alarm.name))) {
        chrome.notifications.clear(alarm.name)
      }
      break
  }
})

// 点击通知触发的事件
chrome.notifications.onClicked.addListener((notificationId: string): void => {
  notifications.handle.open(notificationId)
})

// 点击通知按钮触发的事件
chrome.notifications.onButtonClicked.addListener((notificationId: string, buttonIndex: number): void => {
  notifications.handle.update(notificationId, buttonIndex)
})
