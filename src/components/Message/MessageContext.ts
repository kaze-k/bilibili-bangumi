import { createContext } from "react"
import type React from "react"

import message from "./handler"
import type { Message } from "./types"

// 消息上下文
const MessageContext: React.Context<Message> = createContext(message)

export default MessageContext
