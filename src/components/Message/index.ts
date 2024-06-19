import { useContext } from "react"

import MessageContext from "./MessageContext"
import MessageProvider from "./MessageProvider"
import type { Message, UseMessage } from "./types"

/**
 * @description 消息组件hook方法
 */
const useMessage: UseMessage = (): Message => useContext(MessageContext)

export { useMessage, MessageProvider }
