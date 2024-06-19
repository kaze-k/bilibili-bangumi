import { useEffect } from "react"

import message from "./handler"
import { useStore } from "./store"
import type { MessageState, MessageStoreOptions } from "./types"

/**
 * @description 处理消息状态队列hook
 * @param {MessageStoreOptions} [messageStoreOptions={}] 消息提供器选项
 * @return {*}  {MessageState[]}
 */
const useMessageStore: (messageStoreOptions?: MessageStoreOptions) => MessageState[] = (
  messageStoreOptions: MessageStoreOptions = {},
): MessageState[] => {
  const { limit, reverse, storeOptions } = messageStoreOptions

  // 消息状态队列
  const state: MessageState[] = useStore(storeOptions)

  // 当消息状态队列变化时: 设置定时器队列
  useEffect((): (() => void) => {
    if (state.length > limit) {
      setTimeout((): void => {
        message.remove(reverse ? state[state.length - 1].id : state[0].id)
      }, 100)
      return
    }

    const now: number = Date.now()

    const timeouts: NodeJS.Timeout[] = state.map((m: MessageState): NodeJS.Timeout => {
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
  }, [limit, reverse, state])

  return reverse ? state.reverse() : state
}

export default useMessageStore
