import type { AppState } from "~/store"

interface MessageRequest<T = object> {
  type?: string
  payload?: T
}

interface SyncStatePayload {
  state: Omit<AppState, "data">
  source: string
}

interface NotificationsParams {
  id: number
  ep_cover: string
  title: string
  index: string
  time?: number
  published: boolean
}

interface EpisodesInfo {
  rating: object
  stat: object
  styles: string[]
}

type SendResponse = (response?: unknown) => void

export { MessageRequest, SyncStatePayload, NotificationsParams, EpisodesInfo, SendResponse }
