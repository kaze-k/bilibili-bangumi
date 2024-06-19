import { useEffect, useLayoutEffect, useState } from "react"
import type React from "react"
import { useDispatch, useSelector } from "react-redux"

import { useGetEpisodes } from "~/hooks"
import type { AppDispatch, AppState } from "~/store"
import { EpisodeType } from "~/store/enums"

import ContentMain from "./ContentMain"
import ErrorMain from "./ErrorMain"
import LoadingMain from "./LoadingMain"

/**
 * @description 首页内容组件
 * @return {*}  {React.ReactElement}
 */
function HomeContent(): React.ReactElement {
  const dispatch: AppDispatch = useDispatch()

  // 状态
  const [loading, setLoading] = useState<boolean>(true)
  const isLoading: boolean = useSelector((state: AppState): boolean => state.data.isLoading)
  const episodes: [][] = useSelector((state: AppState): [][] => state.data.episodes)
  const isError: boolean = useSelector((state: AppState): boolean => state.data.isError)
  const type: EpisodeType = useSelector((state: AppState): EpisodeType => state.episode.type)

  // 获取剧集
  const handleData: () => void = useGetEpisodes(type)

  // 当页面渲染时: 发送获取剧集通信
  useLayoutEffect((): void => handleData(), [handleData])

  // 当剧集类别改变时/当索引值改变时/当存储信息改变时: 发送通信
  useEffect((): void => {
    if (isLoading !== null && !isLoading) handleData()
  }, [isLoading, handleData, dispatch])

  // 当剧集信息获取成功时/当错误状态改变时: 停止加载动画
  useEffect((): void => {
    if (isError) setLoading(false)
    else if (episodes.length) setLoading(false)
    else setLoading(true)
  }, [episodes.length, isError])

  if (loading) return <LoadingMain />
  if (isError && episodes.length === 0) return <ErrorMain />
  return <ContentMain />
}

export default HomeContent
