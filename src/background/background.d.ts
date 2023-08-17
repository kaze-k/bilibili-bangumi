interface Storages {
  [key: string]: any
}

interface EpisodesObj {
  episodes: any[]
  id: string
}

interface MessageRequest {
  message?: string
}

interface NotificationsParams {
  id: number
  cover: string
  title: string
  index: string
  time?: number
}

type Alarm = chrome.alarms.Alarm

type MessageSender = chrome.runtime.MessageSender

type EpisodesKey = "anime_episodes" | "guochuang_episodes"

type DatesKey = "anime_dates" | "guochuang_dates"
