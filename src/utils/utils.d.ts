type Params = {
  baseURL: string
  url: string
  query?: TimelineParams | Info
}

type episodeType = "all" | "anime" | "guochuang"

type ToChineseStyleReturn = "全部" | "番剧" | "国创"

type ToTimeOpt = "ms" | "s" | "m" | "h"
