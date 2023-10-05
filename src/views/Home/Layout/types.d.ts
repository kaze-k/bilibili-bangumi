interface ContentWrapperProps extends DarkModeProps {
  handleClick?: React.MouseEventHandler<HTMLDivElement>
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

interface ContainerProps extends DarkModeProps {
  pub_time?: string
  styles?: string[]
  likes?: number
  coins?: number
  favorite?: number
  share?: number
  reply?: number
  children?: React.ReactElement
}

type ContainerItem = Json

type PageProps = {
  index: number
}
