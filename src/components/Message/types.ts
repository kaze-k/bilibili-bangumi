import type React from "react"

import { ActionType } from "./ActionType"

interface MessageContainerProps {
  top: number
}

type MessageType = "success" | "info" | "warning" | "error" | "default" | "loading"

interface StoreOptions {
  duration?: number
}

interface MessageOptions {
  id?: string
  duration?: number
}

type MessageHandler = (message?: string, opts?: MessageOptions) => string

interface Msgs {
  success: string
  error: string
}

interface MessageStoreOptions {
  limit?: number
  reverse?: boolean
  storeOptions?: StoreOptions
}

interface MessageProviderOptions {
  limit?: number
  reverse?: boolean
  duration?: number
}

interface MessageProviderProps {
  children: React.ReactNode
  options?: MessageProviderOptions
}

interface MessageClearButtonProps {
  id: string
}

interface MessageDefaultProps {
  id: string
  message: string
}

interface MessageTypeProps {
  id: string
  message: string
  type: "success" | "info" | "warning" | "error"
}

interface MessageLoadingProps {
  id: string
}

interface MessageProps {
  id: string
  type: MessageType
  message: string
}

interface MessagerProps {
  state: MessageState[]
}

interface MessageState {
  createAt: number
  nodeRef: React.RefObject<HTMLDivElement>
  type: MessageType
  id: string
  message: string
  duration?: number
}

type MessagePayload = Partial<Omit<MessageState, "id">>

interface Message {
  (message: string, opts?: MessageOptions): string
  success: MessageHandler
  info: MessageHandler
  warning: MessageHandler
  error: MessageHandler
  loading: MessageHandler
  remove(id: string): void
  clear(): void
  promise<T>(promise: Promise<T>, msgs: Msgs, opts?: MessageOptions): Promise<T>
}

type UseMessage = () => Message

type Action =
  | {
      type: ActionType.UPSERT_MESSAGE
      payload: MessageState
    }
  | {
      type: ActionType.ADD_MESSAGE
      payload: MessageState
    }
  | {
      type: ActionType.REMOVE_MESSAGE
      id: string
    }
  | {
      type: ActionType.CLEAR_MESSAGE
    }
  | {
      type: ActionType.UPDATE_MESSAGE
      id: string
      payload: MessagePayload
    }

export {
  MessageType,
  MessageOptions,
  MessageState,
  MessageHandler,
  Msgs,
  MessageContainerProps,
  MessageClearButtonProps,
  MessageDefaultProps,
  MessageTypeProps,
  MessageLoadingProps,
  MessageProps,
  MessageProviderProps,
  MessagerProps,
  StoreOptions,
  MessageStoreOptions,
  Message,
  UseMessage,
  Action,
}
