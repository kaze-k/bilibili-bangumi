interface TimelineParams {
  types: number
  before?: number
  after?: number
}

interface Info {
  season_id: number
}

interface Query {
  method: string
  mode: string
  url: string
  query?: TimelineParams | Info
}

interface APIResponse {
  code?: number
  message?: string
  result?: any
}
