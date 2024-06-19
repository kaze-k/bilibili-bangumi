import icon from "public/icon.png"

import { PersistKey } from "~/store/enums"
import { settings } from "~/utils"

import type { Alarms } from "./alarms"
import { NotificationIdType } from "./enums"
import type { NotificationsParams } from "./types"

/**
 * @description 创建通知
 * @class Creator
 */
class Creator {
  /**
   * @description 插件名称
   * @private
   * @static
   * @readonly
   * @type {string}
   * @memberof Creator
   */
  private static readonly displayName: string = chrome.runtime.getManifest().name

  /**
   * @description 插件版本
   * @private
   * @static
   * @readonly
   * @type {string}
   * @memberof Creator
   */
  private static readonly version: string = chrome.runtime.getManifest().version

  /**
   * 私有创建类构造方法
   * @private
   * @memberof Creator
   */
  private constructor() {
    return
  }

  /**
   * @description 创建图片类型通知
   * @static
   * @async
   * @param {Alarms} alarms alarms对象
   * @param {NotificationsParams[]} params 通知需要的参数
   * @return {*}  {Promise<void>}
   * @memberof Creator
   */
  public static async imageNotice(alarms: Alarms, params: NotificationsParams[]): Promise<void> {
    // 获取静默通知设置
    const silent: boolean = (await settings<boolean>(PersistKey.NOTICE, "silent")) ?? false

    // 创建通知
    params.forEach(({ id, ep_cover, title, index, time }: NotificationsParams): void => {
      // index不为空字符，创建通知
      if (index.length) {
        chrome.notifications.create(String(id), {
          type: "image",
          title: title,
          message: index,
          contextMessage: this.displayName,
          iconUrl: icon,
          imageUrl: ep_cover,
          silent: silent,
          eventTime: time * 1000,
        })
      }

      // 自动清除通知
      alarms.create.clearNotice(String(id))
    })
  }

  /**
   * @description 创建更新完成通知
   * @static
   * @param {string} previousVersion 旧版本号
   * @memberof Creator
   */
  public static updateNotice(previousVersion: string): void {
    if (previousVersion === this.version) return

    // 创建更新完成的通知
    chrome.notifications.create(NotificationIdType.UPDATE, {
      type: "basic",
      title: "更新完成",
      message: `v${previousVersion} ~ v${this.version}`,
      contextMessage: this.displayName,
      iconUrl: icon,
      buttons: [{ title: "更新日志" }],
    })
  }
}

/**
 * @description 处理通知
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
   * @description 打开通知
   * @static
   * @async
   * @param {string} id 通知id(剧集id)
   * @return {*}  {Promise<void>}
   * @memberof Handler
   */
  public static async open(id: string): Promise<void> {
    const windows: chrome.windows.Window[] = await chrome.windows.getAll()

    // 检查有无窗口
    if (windows.length === 0) {
      // 创建窗口
      chrome.windows.create({ url: `https://www.bilibili.com/bangumi/play/ep${id}`, state: "maximized" })
      return
    }

    // 创建Tab
    chrome.tabs.create({
      url: `https://www.bilibili.com/bangumi/play/ep${id}`,
    })
  }

  /**
   * @description 更新日志
   * @static
   * @async
   * @param {string} notificationId 消息id
   * @param {number} buttonIndex 按钮索引
   * @return {*}  {Promise<void>}
   * @memberof Handler
   */
  public static async update(notificationId: string, buttonIndex: number): Promise<void> {
    // 打开更新日志
    if (notificationId === NotificationIdType.UPDATE && buttonIndex === 0) {
      const windows: chrome.windows.Window[] = await chrome.windows.getAll()

      // 检查有无窗口
      if (windows.length === 0) {
        // 创建窗口
        chrome.windows.create({ url: chrome.runtime.getURL("CHANGELOG.html"), state: "maximized" })
        return
      }

      // 创建Tab
      chrome.tabs.create({
        url: chrome.runtime.getURL("CHANGELOG.html"),
      })
    }
  }
}

interface Notifications {
  create: typeof Creator
  handle: typeof Handler
}

const notifications: Notifications = {
  create: Creator,
  handle: Handler,
}

export type { Notifications }

export default notifications
