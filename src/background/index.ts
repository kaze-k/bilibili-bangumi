import alarms from "./alarms"
import handles from "./handles"
import messages from "./messages"
import notifications from "./notifications"

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
  Promise.all([
    handles.data.handleData({ types: 1, before: 7, after: 7 }),
    handles.data.handleData({ types: 4, before: 7, after: 7 }),
  ])
})

// 接收通信触发的事件
chrome.runtime.onMessage.addListener(
  (request: MessageRequest, sender: chrome.runtime.MessageSender, sendResponse: SendResponse): boolean | undefined => {
    switch (request.message) {
      // 更新信息
      case "update":
        Promise.allSettled([
          handles.data.handleData({ types: 1, before: 7, after: 7 }),
          handles.data.handleData({ types: 4, before: 7, after: 7 }),
        ]).then(
          (value: [PromiseSettledResult<boolean | undefined>, PromiseSettledResult<boolean | undefined>]): void => {
            const result: boolean = value.every(
              (obj: PromiseSettledResult<boolean | undefined>): boolean =>
                obj.status === "fulfilled" && typeof obj.value !== "undefined",
            )

            if (result) {
              sendResponse(false)
            } else {
              sendResponse(null)
            }
          },
        )
        break

      // 获取日漫和国创的信息
      case "all_episodes":
        messages.popup.getAllEpisodes(sendResponse)
        break

      // 获取日漫信息
      case "anime_episodes":
        messages.popup.getEpisodes(sendResponse, request.message)
        break

      // 获取国创信息
      case "guochuang_episodes":
        messages.popup.getEpisodes(sendResponse, request.message)
        break

      // 获取日漫时间表
      case "anime_dates":
        messages.popup.getDate(sendResponse, request.message)
        break

      // 获取国创时间表
      case "guochuang_dates":
        messages.popup.getDate(sendResponse, request.message)
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

      // 开启番剧通知
      case "enable_anime_notice":
        alarms.create.pushNotice("anime_episodes")
        break

      // 禁止番剧通知
      case "disable_anime_notice":
        chrome.alarms.clear("anime_episodes_push_notice")
        break

      // 开启国创通知
      case "enable_guochuang_notice":
        alarms.create.pushNotice("guochuang_episodes")
        break

      // 禁止国创通知
      case "disable_guochuang_notice":
        chrome.alarms.clear("guochuang_episodes_push_notice")
        break
    }

    return true
  },
)

// alarm触发的事件
chrome.alarms.onAlarm.addListener((alarm: chrome.alarms.Alarm): void => {
  // 清除通知
  if (!isNaN(Number(alarm.name))) {
    chrome.notifications.clear(alarm.name)
  }

  switch (alarm.name) {
    // 更新信息
    case "update_data":
      Promise.all([
        handles.data.handleData({ types: 1, before: 7, after: 7 }),
        handles.data.handleData({ types: 4, before: 7, after: 7 }),
      ])
      break

    // 推送日漫更新通知
    case "anime_episodes_push_notice":
      alarms.handle.pushNotice(notifications.create, "anime_episodes", alarm.scheduledTime)
      Promise.all([
        handles.data.handleData({ types: 1, before: 7, after: 7 }),
        handles.data.handleData({ types: 4, before: 7, after: 7 }),
      ])
      break

    // 推送国创更新通知
    case "guochuang_episodes_push_notice":
      alarms.handle.pushNotice(notifications.create, "guochuang_episodes", alarm.scheduledTime)
      Promise.all([
        handles.data.handleData({ types: 1, before: 7, after: 7 }),
        handles.data.handleData({ types: 4, before: 7, after: 7 }),
      ])
      break
  }
})

// 点击通知触发的事件
chrome.notifications.onClicked.addListener((notificationId: string): void => {
  notifications.handle.createTab(notificationId)
})
