import { createRef } from "react"

import { ActionType, dispatch } from "./store"
import type { MessageHandler, MessageOptions, MessageState, MessageType, Msgs } from "./types"

/**
 * @description 创建消息方法
 * @param {MessageType} type 消息类型
 * @param {string} [message=""] 消息内容
 * @param {MessageOptions} [opts] 消息选项
 * @return {*}  {MessageState} 消息对象
 */
const createMessage: (type: MessageType, message?: string, opts?: MessageOptions) => MessageState = (
  type: MessageType,
  message = "",
  opts?: MessageOptions,
): MessageState => ({
  createAt: Date.now(),
  nodeRef: createRef<HTMLDivElement>(),
  id: opts?.id || crypto.randomUUID(),
  type,
  message,
  ...opts,
})

/**
 * @description 创建消息处理方法
 * @param {MessageType} type 消息类型
 * @return {MessageHandler}  {MessageHandler} 消息处理方法
 */
const createHandler: (type: MessageType) => MessageHandler =
  (type: MessageType): MessageHandler =>
  (message?: string, opts?: MessageOptions): string => {
    const msg = createMessage(type, message, opts)
    dispatch({ type: ActionType.UPSERT_MESSAGE, payload: msg })
    return msg.id
  }

/**
 * @description 创建默认类型消息
 * @param {string} message 消息内容
 * @param {MessageOptions} [opts] 消息选项 [可选]
 *
 * @typeof {typeof message} message 消息对象
 * @property {MessageHandler} (message?: string, opts?: MessageOptions) => string 默认类型消息
 * @property {MessageHandler} success 成功类型消息
 * @property {MessageHandler} info 提示类型消息
 * @property {MessageHandler} warning 警告类型消息
 * @property {MessageHandler} error 错误类型消息
 * @property {MessageHandler} loading 加载类型消息
 * @property {MessageHandler} remove 删除消息
 * @property {MessageHandler} clear 清空消息
 * @property {MessageHandler} promise 创建异步消息
 */
const message: {
  (message: string, opts?: MessageOptions): string
  success: MessageHandler
  info: MessageHandler
  warning: MessageHandler
  error: MessageHandler
  loading: MessageHandler
  remove(id: string): void
  clear(): void
  promise<T>(promise: Promise<T>, msgs: Msgs, opts?: MessageOptions): Promise<T>
} = (message: string, opts?: MessageOptions): string => createHandler("default")(message, opts)

// 创建成功类型消息
message.success = createHandler("success")

// 创建提示类型消息
message.info = createHandler("info")

// 创建警告类型消息
message.warning = createHandler("warning")

// 创建错误类型消息
message.error = createHandler("error")

// 创建加载类型消息
message.loading = createHandler("loading")

// 删除消息
message.remove = (id: string): void => dispatch({ type: ActionType.REMOVE_MESSAGE, id })

// 清空消息
message.clear = (): void => dispatch({ type: ActionType.CLEAR_MESSAGE })

/**
 * @description 创建异步消息
 * @template T
 * @param {Promise<T>} promise 异步操作
 * @param {Msgs} msgs 消息内容
 * @param {MessageOptions} [opts] 消息选项 [可选]
 * @return {*}  {Promise<T>}
 */
message.promise = async <T>(promise: Promise<T>, msgs: Msgs, opts?: MessageOptions): Promise<T> => {
  try {
    const id: string = message.loading()
    await promise
      .then((): void => {
        dispatch({
          type: ActionType.UPDATE_MESSAGE,
          id,
          payload: {
            type: "success",
            message: msgs.success,
            ...opts,
          },
        })
      })
      .catch((): void => {
        dispatch({
          type: ActionType.UPDATE_MESSAGE,
          id,
          payload: {
            type: "error",
            message: msgs.error,
            ...opts,
          },
        })
      })

    return promise
  } catch (error: unknown) {
    console.error(error)
  }
}

export default message
