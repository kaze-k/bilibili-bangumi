interface EpisodeIndexProps {
  published?: boolean
}

interface EpisodeProps extends EpisodeIndexProps {
  title: string
  index: string
}

export { EpisodeIndexProps, EpisodeProps }
