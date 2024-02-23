interface MessageWrapperProps extends DarkModeProps {
  top?: number
}

type MessageMethod = (message: string, options?: Partial<MessageOptions>) => void

type Message = MessageMethod

type MessageContentProps = {
  loading?: boolean
  message: string
}

type MessageProps = {
  top?: MessageWrapperProps.top
  loading?: boolean
  message: string
}

type MessageOptions = {
  top?: MessageWrapperProps.top
  isLoading?: boolean
  duration: number
}

type MessageProviderProps = {
  top?: MessageOptions.top
  duration?: MessageOptions.duration
  children: React.ReactElement
}
