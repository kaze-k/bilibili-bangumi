import { useContext } from "react"

import MessageContext from "./MessageContext"
import MessageProvider from "./MessageProvider"

/**
 * @description 消息组件hook方法
 */
const useMessage = () => useContext(MessageContext)

export { useMessage, MessageProvider }
