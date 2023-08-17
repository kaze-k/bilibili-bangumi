import pkg from "package.json"
import icon from "public/icon.png"

import { settings } from "~/utils"

/**
 * @description 创建通知
 * @class Creator
 */
class Creator {
  /**
   * @description 创建图片类型通知
   * @param {NotificationsParams} params 通知需要的参数
   * @param {number} param.id 通知id(剧集id)
   * @param {string} param.cover 封面图片
   * @param {string} param.title 标题
   * @param {string} param.index 最新的集数名称
   * @param {number} param.time 剧集更新的时间戳 [可选]
   * @memberof Creator
   */
  public imageNotice(params: NotificationsParams): void {
    for (const obj in params) {
      const { id, cover, title, index } = params[obj]

      chrome.notifications.create(`${id}`, {
        type: "image",
        title: title,
        message: index,
        contextMessage: `${pkg.displayName}`,
        iconUrl: icon,
        imageUrl: cover,
      })
    }
  }
}

/**
 * @description 处理通知
 * @class Handler
 */
class Handler {
  /**
   * @description 创建Tab
   * @param {string} id 通知id(剧集id)
   * @return {*}  {Promise<void>}
   * @memberof Handler
   */
  public async createTab(id: string): Promise<void> {
    chrome.tabs.create({
      url: `https://www.bilibili.com/bangumi/play/ep${id}`,
    })
  }

  /**
   * @description 自动清除通知
   * @param {string} id 通知id
   * @param {number} timeout 触发清除通知的时间
   * @return {*}  {Promise<void>} 无返回值
   * @memberof Handler
   */
  // TODO: 设计一个自动清除通知的设置
  public async autoClear(id: string, timeout: number): Promise<void> {
    const autoClear: boolean = await settings("notice", "autoClear")

    if (autoClear) {
      setTimeout((): void => {
        chrome.notifications.clear(`${id}`)
      }, timeout)
    }
  }
}

const create: Creator = new Creator()
const handle: Handler = new Handler()

const notifications = { create, handle }

export default notifications
