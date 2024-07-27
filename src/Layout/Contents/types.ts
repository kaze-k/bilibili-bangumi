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
  cover?: string
  square_cover?: string
  title?: string
  delay?: boolean
  delay_reason?: string
  pub_index?: string
  published?: number
  season_id?: number
}

export { ContainerProps }
