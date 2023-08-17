import alarms from "./alarms"
import handles from "./handles"
import messages from "./messages"
import notifications from "./notifications"

// 安装触发的事件
chrome.runtime.onInstalled.addListener((): void => {
  alarms.create.updateData()
})

// 浏览器启动触发的事件
chrome.runtime.onStartup.addListener((): void => {
  handles.data.handleData({ types: 1, before: 7, after: 7 })
  handles.data.handleData({ types: 4, before: 7, after: 7 })
})

// 接收通信触发的事件
chrome.runtime.onMessage.addListener(
  (request: MessageRequest, sender: MessageSender, sendResponse: (response?: any) => void): boolean | undefined => {
    switch (request.message) {
      // 更新信息
      case "update":
        handles.data.handleData({ types: 1, before: 7, after: 7 })
        handles.data.handleData({ types: 4, before: 7, after: 7 })
        break

      // 获取日漫和国创的信息
      case "all_episodes":
        messages.popup.GetAllEpisodes(sendResponse)
        break

      // 获取日漫信息
      case "anime_episodes":
        messages.popup.GetEpisodes(sendResponse, request.message)
        break

      // 获取国创信息
      case "guochuang_episodes":
        messages.popup.GetEpisodes(sendResponse, request.message)
        break

      // 获取日漫时间表
      case "anime_dates":
        messages.popup.GetDate(sendResponse, request.message)
        break

      // 获取国创时间表
      case "guochuang_dates":
        messages.popup.GetDate(sendResponse, request.message)
        break

      // 开启通知
      case "enable_notice":
        alarms.create.pushNotice("anime_episodes")
        alarms.create.pushNotice("guochuang_episodes")
        break

      // 禁止通知
      case "disable_notice":
        chrome.alarms.clear("anime_episodes_push_notice")
        chrome.alarms.clear("guochuang_episodes_push_notice")
        break
    }

    return true
  },
)

// alarm触发的事件
chrome.alarms.onAlarm.addListener((alarm: Alarm): void => {
  switch (alarm.name) {
    // 更新信息
    case "update_data":
      handles.data.handleData({ types: 1, before: 7, after: 7 })
      handles.data.handleData({ types: 4, before: 7, after: 7 })
      break

    // 推送日漫更新通知
    case "anime_episodes_push_notice":
      alarms.handle.pushNotice(notifications.create.imageNotice, "anime_episodes")
      handles.data.handleData({ types: 1, before: 7, after: 7 })
      handles.data.handleData({ types: 4, before: 7, after: 7 })
      break

    // 推送国创更新通知
    case "guochuang_episodes_push_notice":
      alarms.handle.pushNotice(notifications.create.imageNotice, "guochuang_episodes")
      handles.data.handleData({ types: 1, before: 7, after: 7 })
      handles.data.handleData({ types: 4, before: 7, after: 7 })
      break
  }
})

// 点击通知触发的事件
chrome.notifications.onClicked.addListener((notificationId: string): void => {
  notifications.handle.createTab(notificationId)
})
