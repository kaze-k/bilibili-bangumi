import { useEffect } from "react"

import message from "./handler"
import { useStore } from "./store"

/**
 * @description 处理消息状态队列hook
 * @param {MessageStoreOptions} [messageStoreOptions={}] 消息提供器选项
 * @param {number} messageStoreOptions.limit 消息数量
 * @param {boolean} messageStoreOptions.reverse 消息顺序
 * @param {StoreOptions} messageStoreOptions.storeOptions 消息状态选项时间
 * @param {number} messageStoreOptions.storeOptions.duration 消息持续时间
 * @return {*}  {MessageState[]}
 */
const useMessageStore: (messageStoreOptions?: MessageStoreOptions) => MessageState[] = (
  messageStoreOptions: MessageStoreOptions = {},
): MessageState[] => {
  // 消息状态队列
  const state: MessageState[] = useStore(messageStoreOptions.storeOptions)

  // 当消息状态队列变化时: 设置定时器队列
  useEffect((): (() => void) => {
    if (state.length > messageStoreOptions.limit) {
      setTimeout((): void => {
        message.remove(state[0].id)
      }, 100)
      return
    }

    const now: number = Date.now()

    const timeouts: NodeJS.Timeout[] = state.map((m) => {
      if (m.duration === Infinity) {
        return
      }

      const ms: number = m.duration - (now - m.createAt)

      return setTimeout((): void => {
        message.remove(m.id)
      }, ms)
    })

    return (): void => {
      timeouts.forEach((t: NodeJS.Timeout): void => t && clearTimeout(t))
    }
  }, [state])

  return messageStoreOptions.reverse ? state.reverse() : state
}

export default useMessageStore
