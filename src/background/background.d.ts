declare namespace Alarms {
  export class creator {
    clearNotice(id: string): Promise<void>
  }
}

declare namespace Handles {
  export class data {
    handleData(timelineParams: TimelineParams): Promise<void>
  }
}

declare namespace Notifications {
  export class creator {
    imageNotice(alarmCreate: Alarms.creator, params: NotificationsParams[]): Promise<void>
  }
}

type Storages = Json

type EpisodesObj = {
  episodes: any[]
  id: string
}

type MessageRequest = {
  message?: string
}

type NotificationsParams = {
  id: number
  cover: string
  title: string
  index: string
  time?: number
  published: number
}

type EpisodesKey = "anime_episodes" | "guochuang_episodes"

type DatesKey = "anime_dates" | "guochuang_dates"

type SendResponse = (response?: any) => void
