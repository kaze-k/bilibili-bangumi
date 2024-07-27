import type React from "react"
import { createRef } from "react"
import { TransitionGroup } from "react-transition-group"

import { EmptyPage, Page } from "~/components/Pages"

import { renderCards } from "../render"
import type { ContainerProps } from "../types"
import style from "./style.module.scss"

// 无数据时渲染的组件
const noUpdate: React.ReactElement = <EmptyPage text="今日无内容更新哦~" />

/**
 * @description 渲染页面
 * @param {ContainerProps[][]} episodes 页面列表
 * @return {*}  {React.ReactElement[]}
 */
function renderPages(episodes: ContainerProps[][]): React.ReactElement[] {
  // 创建ref
  const data: ContainerProps[][] = episodes?.map((page: ContainerProps[]): ContainerProps[] => {
    return page?.map((episode: ContainerProps): ContainerProps => {
      return { ...episode, nodeRef: createRef() }
    })
  })

  return data?.map(
    (page: ContainerProps[], index: number): React.ReactElement => (
      <Page
        className={style["page"]}
        data={page}
        key={index}
        empty={noUpdate}
      >
        <TransitionGroup component={null}>{renderCards(page, "square_cover")}</TransitionGroup>
      </Page>
    ),
  )
}

export { renderPages }
