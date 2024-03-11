type MessageContainerProps = {
  top: number
}

type MessageType = "success" | "info" | "warning" | "error" | "default" | "loading"

type StoreOptions = {
  duration?: number
}

type MessageOptions = {
  id?: string
  duration?: number
}

type MessageHandler = (message?: sting, opts?: MessageOptions) => string

type Msgs = {
  success: string
  error: string
}

type MessageStoreOptions = {
  limit?: number
  reverse?: boolean
  storeOptions?: StoreOptions
}

type MessageProviderOptions = {
  limit?: number
  reverse?: boolean
  duration?: number
}

type MessageProviderProps = {
  children: React.ReactNode
  options?: MessageProviderOptions
}

interface MessageClearButtonProps extends DarkModeProps {
  id: string
}

interface MessageDefaultProps extends DarkModeProps {
  id: string
  message: string
}

interface MessageTypeProps extends DarkModeProps {
  id: string
  message: string
  type: "success" | "info" | "warning" | "error"
}

interface MessageLoadingProps extends DarkModeProps {
  id: string
}

interface MessageProps extends DarkModeProps {
  id: string
  type: MessageType
  message: string
}

interface MessagerProps extends DarkModeProps {
  state: MessageState[]
}

type MessageState = {
  createAt: number
  type: MessageType
  id: string
  message: string
  duration?: number
}

type MessagePayload = Partial<Omit<MessageState, "id">>
