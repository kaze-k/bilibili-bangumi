import React, { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { useSelector } from "react-redux"

import MessageContext from "./MessageContext"
import Messager from "./Messager"
import message from "./handler"
import useMessageStore from "./useMessageStore"

/**
 * @description 消息提供器
 * @param {MessageProviderProps} props 消息提供器Props
 * @param {React.ReactNode} props.children 子组件
 * @param {MessageProviderOptions} props.options 消息提供器配置项
 * @param {number} props.options.limit 消息数量
 * @param {boolean} props.options.reverse 消息顺序
 * @param {number} props.options.duration 消息持续时间
 * @return {*}  {React.ReactElement}
 */
function MessageProvider(props: MessageProviderProps): React.ReactElement {
  const messageStoreOptions = {
    limit: props?.options?.limit,
    reverse: props?.options?.reverse,
    storeOptions: {
      duration: props?.options?.duration,
    },
  }

  // 消息状态队列
  const state: MessageState[] = useMessageStore(messageStoreOptions)

  // 状态
  const [show, setShow] = useState<boolean>(false)
  const darkMode: boolean = useSelector((state: State): boolean => state.theme.darkMode)

  // 当有消息时: 显示消息发送器
  // 当没有消息时: 移除消息发送器
  useEffect((): void => {
    if (state.length) {
      setShow(true)
    } else {
      setShow(false)
    }
  }, [state])

  return (
    <MessageContext.Provider value={message}>
      {show &&
        createPortal(
          <Messager
            state={state}
            darkMode={darkMode}
          />,
          document.body,
        )}
      {props.children}
    </MessageContext.Provider>
  )
}

export default MessageProvider
