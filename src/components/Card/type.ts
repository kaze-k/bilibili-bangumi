import type React from "react"

interface HeaderProps {
  styles?: string[]
  pub_time?: string
}

interface ContentProps {
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
  published?: number
}

interface FooterProps {
  likes?: number
  coins?: number
  favorite?: number
  share?: number
  reply?: number
}

type CardProps = HeaderProps & ContentProps & FooterProps

export { HeaderProps, ContentProps, FooterProps, CardProps }
