type TimelineParams = {
  types: number
  before?: number
  after?: number
}

type Info = {
  season_id: number
}

type Query = {
  method: string
  mode: string
  url: string
  query?: TimelineParams | Info
}

type APIResponse = {
  code?: number
  message?: string
  result?: any
}
