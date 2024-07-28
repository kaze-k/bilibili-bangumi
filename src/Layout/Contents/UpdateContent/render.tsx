import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { createRef } from "react"
import { TransitionGroup } from "react-transition-group"

import { EmptyPage, ErrorPage, Page } from "~/components/Pages"

import { renderCards } from "../render"
import type { ContainerProps } from "../types"
import style from "./style.module.scss"

// 无数据时渲染的组件
const noUpdate: React.ReactElement = <EmptyPage text="今日无内容更新哦~" />

/**
 * @description 渲染页面
 * @param {ContainerProps[]} episodes 页面列表
 * @return {*}  {React.ReactElement[]}
 */
function renderPage(episodes: ContainerProps[]): React.ReactElement {
  // 创建ref
  const data: ContainerProps[] = episodes?.map(
    (episode: ContainerProps): ContainerProps => ({ ...episode, nodeRef: createRef<HTMLDivElement>() }),
  )

  return (
    <Page
      className={style["page"]}
      data={data}
      empty={noUpdate}
    >
      <TransitionGroup component={null}>{renderCards(data, "cover")}</TransitionGroup>
    </Page>
  )
}

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

export { renderPage, renderContent }
