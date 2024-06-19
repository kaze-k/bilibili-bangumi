import type React from "react"

interface EpisodeStat {
  likes?: number
  coins?: number
  favorite?: number
  share?: number
  reply?: number
  views?: number
  danmakus?: number
  favorites?: number
}

interface EpisodeRating {
  score?: number
  count?: number
}

interface EpisodeInfo {
  styles?: string[]
  stat?: EpisodeStat
  rating?: EpisodeRating
}

interface ContainerProps {
  nodeRef: React.Ref<HTMLDivElement>
  episode_id: number
  pub_time?: string
  info?: EpisodeInfo
  square_cover?: string
  title?: string
  delay?: boolean
  delay_reason?: string
  pub_index?: string
  published?: number
  season_id?: number
}

interface PageProps {
  episodes: ContainerProps[]
  children?: React.ReactNode
  empty?: React.ReactNode
}

interface WrapperProps {
  index: number
}

export { ContainerProps, PageProps, WrapperProps }
