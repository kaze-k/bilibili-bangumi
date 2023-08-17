interface ContentWrapperProps {
  darkMode?: boolean
  handleClick?: MouseEventHandler<HTMLDivElement>
  square_cover?: string
  title?: string
  delay?: boolean
  delay_reason?: string
  pub_index?: string
  views?: number
  danmakus?: number
  favorites?: number
  score?: number
  count?: number
  published?: boolean
}

interface ContainerProps {
  darkMode?: boolean
  pub_time?: string
  styles?: string[]
  likes?: number
  coins?: number
  favorite?: number
  share?: number
  reply?: number
  children?: ReactElement
}

interface ContainerItem {
  [key: string]: any
}

interface PageProps {
  index: number
}

type MainWheelEvent = React.WheelEvent<HTMLElement>
