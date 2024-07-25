import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import type React from "react"
import { useEffect, useLayoutEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import ErrorPage from "~/components/ErrorPage"
import { Main } from "~/components/base"
import { useGetEpisodes } from "~/hooks"
import type { AppDispatch, AppState } from "~/store"
import { EpisodeType } from "~/store/enums"

import renderPage from "./render"
import style from "./style.module.scss"

/**
 * @description 渲染内容
 * @param {boolean} isWait 是否正在等待
 * @param {boolean} isError 是否发生错误
 * @param {[]} todayEpisodes 今日剧集
 * @return {*}  {React.ReactElement}
 */
function renderContent(isWait: boolean, isError: boolean, todayEpisodes: []): React.ReactElement {
  if (isWait)
    return (
      <FontAwesomeIcon
        icon={["fab", "bilibili"]}
        size="2xl"
        className={style["icon"]}
      />
    )
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
  const [isWait, setIsWait] = useState<boolean>(true)
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

  // 当今天更新的剧集信息获取成功时/当错误状态改变时: 停止等待
  useEffect((): void => {
    if (isError) setIsWait(false)
    else if (todayEpisodes === null) setIsWait(true)
    else setIsWait(false)
  }, [todayEpisodes, isError])

  return <Main className={style["main"]}>{renderContent(isWait, isError, todayEpisodes)}</Main>
}

export default UpdateContent
