import type React from "react"
import { CSSTransition } from "react-transition-group"
import type { CSSTransitionClassNames } from "react-transition-group/CSSTransition"

import Animation from "~/components/Animation"
import Card from "~/components/Card"

import style from "./style.module.scss"
import transition from "./transition.module.scss"
import type { ContainerProps } from "./types"

// 过渡动画类名
const CLASSNAMES: CSSTransitionClassNames = {
  enter: transition["enter"],
  enterActive: transition["enter-active"],
  exit: transition["exit"],
  exitActive: transition["exit-active"],
}

// 过渡动画
const KEYFRAMES: Keyframe[] = [
  { transform: "translateY(120px)", opacity: 0.5 },
  { transform: "translateY(0)", opacity: 1 },
]

// 过渡动画选项
const KEYFRAME_OPTIONS: KeyframeAnimationOptions = {
  duration: 500,
  easing: "ease-in-out",
  fill: "forwards",
}

/**
 * @description 渲染剧集卡片
 * @param {ContainerProps} episode 剧集信息
 * @param {(episode_id: number, published: number, season_id: number) => void} handleClick 点击事件
 * @param {("square_cover" | "cover")} cover 剧集封面
 * @return {*}  {React.ReactElement}
 */
function renderEpisodeCard(
  episode: ContainerProps,
  handleClick: (episode_id: number, published: number, season_id: number) => void,
  cover: "square_cover" | "cover",
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
        <Animation
          key={episode?.episode_id}
          keyframes={KEYFRAMES}
          options={KEYFRAME_OPTIONS}
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
            square_cover={episode[cover]}
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
        </Animation>
      </div>
    </CSSTransition>
  )
}

/**
 * @description 渲染卡片列表
 * @param {ContainerProps[]} episodes 剧集列表
 * @param {("square_cover" | "cover")} cover 剧集封面
 * @return {*}  {React.ReactElement[]}
 */
function renderCards(episodes: ContainerProps[], cover: "square_cover" | "cover"): React.ReactElement[] {
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

  return episodes?.map((episode: ContainerProps): React.ReactElement => renderEpisodeCard(episode, handleClick, cover))
}

export { renderEpisodeCard, renderCards }
