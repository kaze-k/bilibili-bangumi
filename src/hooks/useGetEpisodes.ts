import { useCallback } from "react"
import { useDispatch } from "react-redux"

import type { AppDispatch } from "~/store"
import { EpisodeType } from "~/store/enums"
import { getAllEpisodes, getAnimeEpisodes, getGuoChuangEpisodes } from "~/store/features/data"

/**
 * @description 获取剧集信息
 * @param {EpisodeType} episodeType 剧集类别
 * @return {*}  {() => void} 处理信息的方法
 */
function useGetEpisodes(episodeType: EpisodeType): () => void {
  const dispatch: AppDispatch = useDispatch()

  /**
   * @description 处理信息的方法: 根据剧集类别的不同发送不同的通信
   */
  const handleData: () => void = useCallback((): void => {
    switch (episodeType) {
      case EpisodeType.ALL:
        dispatch(getAllEpisodes())
        break

      case EpisodeType.ANIME:
        dispatch(getAnimeEpisodes())
        break

      case EpisodeType.GUOCHUANG:
        dispatch(getGuoChuangEpisodes())
        break
    }
  }, [episodeType, dispatch])

  return handleData
}

export default useGetEpisodes
