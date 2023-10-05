import icon from "public/icon.png"

import { settings } from "~/utils"

/**
 * @description 创建通知
 * @class Creator
 */
class Creator {
  /**
   * @description 插件名称
   * @private
   * @static
   * @type {string}
   * @memberof Creator
   */
  private static displayName: string = chrome.runtime.getManifest().name

  /**
   * @description 插件版本
   * @private
   * @static
   * @type {string}
   * @memberof Creator
   */
  private static version: string = chrome.runtime.getManifest().version

  /**
   * @description 创建图片类型通知
   * @static
   * @param {NotificationsParams} params 通知需要的参数
   * @param {number} param.id 通知id(剧集id)
   * @param {string} param.cover 封面图片
   * @param {string} param.title 标题
   * @param {string} param.index 最新的集数名称
   * @param {number} param.time 剧集更新的时间戳 [可选]
   * @param {number} param.published 是否已更新
   * @return {*}  {Promise<void>} 无返回值
   * @memberof Creator
   */
  public static async imageNotice(alarmsCreate: Alarms.creator, params: NotificationsParams[]): Promise<void> {
    const silent: boolean = await settings("notice", "silent")

    if (params.length) {
      for (const obj in params) {
        const { id, cover, title, index, time, published } = params[obj]

        if (published) {
          chrome.notifications.create(String(id), {
            type: "image",
            title: title,
            message: index,
            contextMessage: this.displayName,
            iconUrl: icon,
            imageUrl: cover,
            silent: silent,
            eventTime: time * 1000,
          })

          alarmsCreate.clearNotice(String(id))
        }
      }
    }
  }

  /**
   * @description 创建更新完成通知
   * @static
   * @param {string} previousVersion 旧版本号
   * @memberof Creator
   */
  public static updateNotice(previousVersion: string): void {
    if (previousVersion === this.version) {
      return
    }

    chrome.notifications.create("update-notice", {
      type: "basic",
      title: "更新完成",
      message: `v${previousVersion} ~ v${this.version}`,
      contextMessage: this.displayName,
      iconUrl: icon,
    })
  }
}

/**
 * @description 处理通知
 * @class Handler
 */
class Handler {
  /**
   * @description 创建Tab
   * @static
   * @param {string} id 通知id(剧集id)
   * @return {*}  {Promise<void>} 无返回值
   * @memberof Handler
   */
  public static async createTab(id: string): Promise<void> {
    chrome.tabs.create({
      url: `https://www.bilibili.com/bangumi/play/ep${id}`,
    })
  }
}

const notifications = {
  create: Creator,
  handle: Handler,
}

export default notifications
