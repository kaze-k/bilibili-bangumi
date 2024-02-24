type MessageMethod = (message: string, options?: Partial<MessageOptions>) => void

type Message = MessageMethod

type MessageProps = {
  message: string
}

type MessageOptions = {
  duration: number
}

type MessageProviderProps = {
  duration?: MessageOptions.duration
  children: React.ReactElement
}
