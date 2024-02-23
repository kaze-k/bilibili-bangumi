import React, { createContext, useContext } from "react"

// 创建消息上下文
export const MessageContext: React.Context<Message> = createContext(null)

/**
 * @description 消息组件hook方法
 * @return {*}  {Message} 消息组件方法
 */
export const useMessage: () => Message = (): Message => useContext(MessageContext)
