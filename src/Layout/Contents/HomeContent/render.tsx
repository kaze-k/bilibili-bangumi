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
  const datas: ContainerProps[][] = episodes?.map((data: ContainerProps[]): ContainerProps[] => {
    return data?.map((episode: ContainerProps): ContainerProps => {
      return { ...episode, nodeRef: createRef<HTMLDivElement>() }
    })
  })

  return datas?.map(
    (data: ContainerProps[], index: number): React.ReactElement => (
      <Page
        className={style["page"]}
        data={data}
        key={index}
        empty={noUpdate}
      >
        <TransitionGroup component={null}>{renderCards(data, "square_cover")}</TransitionGroup>
      </Page>
    ),
  )
}

export { renderPages }
