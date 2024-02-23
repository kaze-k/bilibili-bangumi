import React, { useCallback, useEffect, useState } from "react"
import { createPortal } from "react-dom"

import { MessageContext } from "."
import Message from "./Message"

/**
 * @description 消息配置器
 * @param {MessageProviderProps} props 消息配置器Props
 * @param {number} props.top 顶部距离 [可选]
 * @param {number} props.duration 消息显示时间 [可选]
 * @param {React.ReactElement} props.children 子组件
 * @return {*}  {React.ReactElement}
 */
function MessageProvider(props: MessageProviderProps): React.ReactElement {
  // 状态
  const [show, setShow] = useState<boolean>(false)
  const [msg, setMsg] = useState<string>("")
  const [msgOpts, setMsgOpts] = useState<MessageOptions>({
    duration: props.duration,
  })

  /**
   * @description 消息组件方法
   * @param {string} message 消息内容
   * @param {Partial<MessageOptions>} [options] 选项配置 [可选]
   * @param {number} [options.top] 顶部距离 [可选]
   * @param {boolean} [options.isLoading] 加载中 [可选]
   * @param {number} [options.duration] 消息显示时间 [可选]
   */
  const callback: MessageMethod = (message: string, options?: Partial<MessageOptions>): void => {
    setShow(true)
    setMsg(message)
    setMsgOpts((opts: MessageOptions): MessageOptions => ({ ...opts, ...options }))
  }

  /**
   * @description 创建消息组件
   * @return {*}  {React.ReactPortal}
   */
  const createMessage: () => React.ReactPortal = (): React.ReactPortal => {
    return (
      show &&
      createPortal(
        <Message
          message={msg}
          top={msgOpts.top}
          loading={msgOpts.isLoading}
        />,
        document.body,
      )
    )
  }

  // 当持续时间改变/显示状态改变时/加载状态改变: 改变消息组件的显示
  useEffect((): (() => void) => {
    let timer: NodeJS.Timeout

    if (msgOpts.isLoading) {
      setShow(true)
    } else {
      timer = setTimeout((): void => {
        setShow(false)
      }, msgOpts.duration)
    }

    return (): void => {
      clearTimeout(timer)
    }
  }, [msgOpts.duration, show, msgOpts.isLoading])

  // 消息组件方法
  const messageMethod: MessageMethod = useCallback(callback, [])

  return (
    <MessageContext.Provider value={messageMethod}>
      {createMessage()}
      {props.children}
    </MessageContext.Provider>
  )
}

export default MessageProvider
