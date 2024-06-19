import type React from "react"
import { createRef } from "react"
import { CSSTransition, TransitionGroup } from "react-transition-group"

import Card from "~/components/Card"
import EmptyPage from "~/components/EmptyPage"

import style from "./style.module.scss"
import transition from "./transition.module.scss"
import type { ContainerProps, PageProps } from "./types"

// 过渡动画类名
const CLASSNAMES = {
  enter: transition["enter"],
  enterActive: transition["enter-active"],
  exit: transition["exit"],
  exitActive: transition["exit-active"],
}

// 无数据时渲染的组件
const noUpdate: React.ReactElement = <EmptyPage text="今日无内容更新哦~" />

/**
 * @description 页面组件
 * @param {PageProps} props 页面Props
 * @return {*}  {React.ReactElement}
 */
function Page(props: PageProps): React.ReactElement {
  const { children, empty, episodes } = props

  return <div className={style["page"]}>{episodes.length ? children : empty}</div>
}

/**
 * @description 渲染剧集卡片
 * @param {ContainerProps} episode 剧集信息
 * @param {(episode_id: number, published: number, season_id: number) => void} handleClick 点击事件
 * @return {*}  {React.ReactElement}
 */
function renderEpisodeCard(
  episode: ContainerProps,
  handleClick: (episode_id: number, published: number, season_id: number) => void,
): React.ReactElement {
  return (
    <CSSTransition
      key={episode.episode_id}
      classNames={CLASSNAMES}
      timeout={500}
      nodeRef={episode.nodeRef}
      unmountOnExit
    >
      <div
        className={style["container"]}
        ref={episode.nodeRef}
      >
        <Card
          key={episode?.episode_id}
          pub_time={episode?.pub_time}
          styles={episode?.info?.styles}
          likes={episode?.info?.stat?.likes}
          coins={episode?.info?.stat?.coins}
          favorite={episode?.info?.stat?.favorite}
          share={episode?.info?.stat?.share}
          reply={episode?.info?.stat?.reply}
          handleClick={(): void => handleClick(episode?.episode_id, episode?.published, episode?.season_id)}
          square_cover={episode?.square_cover}
          title={episode?.title}
          delay={episode?.delay}
          delay_reason={episode?.delay_reason}
          pub_index={episode?.pub_index}
          views={episode?.info?.stat?.views}
          danmakus={episode?.info?.stat?.danmakus}
          favorites={episode?.info?.stat?.favorites}
          score={episode?.info?.rating?.score}
          count={episode?.info?.rating?.count}
          published={episode?.published}
        />
      </div>
    </CSSTransition>
  )
}

/**
 * @description 渲染剧集卡片
 * @param {ContainerProps[]} episodes 剧集列表
 * @return {*}  {React.ReactElement[]}
 */
function renderCards(episodes: ContainerProps[]): React.ReactElement[] {
  /**
   * @description
   * 处理点击的方法:
   * - 点击已更新的剧集跳转到最新一集的页面
   * - 点击未更新的剧集跳转到剧集的已更新的集数的页面
   * @param {number} episode_id 剧集episode id
   * @param {number} published 更新的时间戳
   * @param {number} season_id 剧集season id
   */
  const handleClick: (episode_id: number, published: number, season_id: number) => void = (
    episode_id: number,
    published: number,
    season_id: number,
  ): void => {
    if (published && episode_id) {
      chrome.tabs.create({
        url: `https://www.bilibili.com/bangumi/play/ep${episode_id}`,
      })
    } else {
      chrome.tabs.create({
        url: `https://www.bilibili.com/bangumi/play/ss${season_id}`,
      })
    }
  }

  return episodes.map((episode: ContainerProps): React.ReactElement => renderEpisodeCard(episode, handleClick))
}

/**
 * @description 渲染页面
 * @param {ContainerProps[][]} episodes 页面列表
 * @return {*}  {React.ReactElement[]}
 */
function renderPages(episodes: ContainerProps[][]): React.ReactElement[] {
  // 创建ref
  const pages: ContainerProps[][] = episodes.map((page: ContainerProps[]): ContainerProps[] => {
    return page.map((episode: ContainerProps): ContainerProps => {
      return { ...episode, nodeRef: createRef() }
    })
  })

  return pages.map(
    (page: ContainerProps[], index: number): React.ReactElement => (
      <Page
        episodes={page}
        key={index}
        empty={noUpdate}
      >
        <TransitionGroup component={null}>{renderCards(page)}</TransitionGroup>
      </Page>
    ),
  )
}

export default renderPages
