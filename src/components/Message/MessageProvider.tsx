import { useEffect, useState } from "react"
import type React from "react"
import { createPortal } from "react-dom"

import MessageContext from "./MessageContext"
import Messager from "./Messager"
import message from "./handler"
import type { MessageProviderProps, MessageState } from "./types"
import useMessageStore from "./useMessageStore"

/**
 * @description 消息提供器
 * @param {MessageProviderProps} props 消息提供器Props
 * @return {*}  {React.ReactElement}
 */
function MessageProvider(props: MessageProviderProps): React.ReactElement {
  const { children, options = {} } = props

  const { limit, reverse, duration } = options

  const messageStoreOptions = {
    limit: limit,
    reverse: reverse,
    storeOptions: {
      duration: duration,
    },
  }

  // 消息状态队列
  const state: MessageState[] = useMessageStore(messageStoreOptions)

  // 状态
  const [show, setShow] = useState<boolean>(false)

  // 当有消息时: 显示消息发送器
  // 当没有消息时: 移除消息发送器
  useEffect((): (() => void) => {
    let timer: NodeJS.Timeout

    if (state.length > 0) {
      setShow(true)
    } else {
      timer = setTimeout((): void => setShow(false), 300)
    }

    return (): void => clearTimeout(timer)
  }, [state.length])

  return (
    <MessageContext.Provider value={message}>
      {show && createPortal(<Messager state={state} />, document.body)}
      {children}
    </MessageContext.Provider>
  )
}

export default MessageProvider
