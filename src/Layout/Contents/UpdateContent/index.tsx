import type React from "react"
import { useEffect, useLayoutEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import ErrorPage from "~/components/ErrorPage"
import Loading from "~/components/Loading"
import { Main } from "~/components/base"
import { useGetEpisodes } from "~/hooks"
import type { AppDispatch, AppState } from "~/store"
import { EpisodeType } from "~/store/enums"

import renderPage from "./render"
import style from "./style.module.scss"

/**
 * @description 渲染内容
 * @param {boolean} isLoading 是否正在加载
 * @param {boolean} isError 是否发生错误
 * @param {[]} todayEpisodes 今日剧集
 * @return {*}  {React.ReactElement}
 */
function renderContent(isLoading: boolean, isError: boolean, todayEpisodes: []): React.ReactElement {
  if (isLoading) return <Loading icon="loading" />
  if (isError && todayEpisodes === null) return <ErrorPage text="加载失败" />
  return renderPage(todayEpisodes)
}

/**
 * @description 更新内容组件
 * @return {*}  {React.ReactElement}
 */
function UpdateContent(): React.ReactElement {
  const dispatch: AppDispatch = useDispatch()

  // 状态
  const [loading, setLoading] = useState<boolean>(true)
  const todayEpisodes: [] = useSelector((state: AppState): [] => state.data.todayEpisodes)
  const isLoading: boolean = useSelector((state: AppState): boolean => state.data.isLoading)
  const isError: boolean = useSelector((state: AppState): boolean => state.data.isError)
  const todayType: EpisodeType = useSelector((state: AppState): EpisodeType => state.episode.todayType)

  // 获取剧集
  const handleData: () => void = useGetEpisodes(todayType)

  // 当页面渲染时: 发送获取剧集的通信
  useLayoutEffect((): void => handleData(), [handleData])

  // 当剧集类别改变时/当索引值改变时/当存储信息改变时: 发送通信
  useEffect((): void => {
    if (isLoading !== null && !isLoading) handleData()
  }, [isLoading, handleData, dispatch])

  // 当今天更新的剧集信息获取成功时/当错误状态改变时: 停止加载动画
  useEffect((): void => {
    if (isError) setLoading(false)
    else if (todayEpisodes === null) setLoading(true)
    else setLoading(false)
  }, [todayEpisodes, isError])

  return <Main className={style["main"]}>{renderContent(loading, isError, todayEpisodes)}</Main>
}

export default UpdateContent
