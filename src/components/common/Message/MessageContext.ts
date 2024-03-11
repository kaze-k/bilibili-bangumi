import React, { createContext } from "react"

import message from "./handler"

// 消息上下文
const MessageContext: React.Context<typeof message> = createContext(message)

export default MessageContext
