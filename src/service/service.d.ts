type TimelineParams = {
  types: number
  before?: number
  after?: number
}

type Info = {
  season_id: number
}

type ServiceParams = {
  method: string
  mode: RequestMode
  url: string
  query?: TimelineParams | Info
}

type ServiceReturn = {
  abort: () => void
  ready: Promise<APIResponse>
}

type APIResponse = {
  code?: number
  message?: string
  result?: any
}
