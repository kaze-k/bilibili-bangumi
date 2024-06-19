import { forwardRef } from "react"
import type React from "react"

import { formatNum } from "~/utils"

import Episode from "./Episode"
import Image from "./Image"
import Rating from "./Rating"
import Stat from "./Stat"
import style from "./style.module.scss"
import type { ContentProps } from "./type"

/**
 * @description 内容包裹
 * @param {ContentProps} props 内容包裹Props
 * @param {React.Ref<HTMLDivElement>} ref 内容包裹ref
 * @return {*}  {React.ReactElement}
 */
function Content(props: ContentProps, ref: React.Ref<HTMLDivElement>): React.ReactElement {
  const {
    handleClick,
    square_cover,
    title,
    delay,
    delay_reason,
    pub_index,
    views,
    danmakus,
    favorites,
    score,
    count,
    published,
  } = props

  // 更新的剧集
  const episodeIndex: string = delay ? delay_reason : pub_index

  return (
    <div
      ref={ref}
      className={style["content"]}
      onClick={handleClick}
    >
      <Image
        img={square_cover}
        title={title}
      />
      <div className={style["context"]}>
        <Episode
          published={Boolean(published)}
          title={title}
          index={episodeIndex}
        />
        <Stat
          views={formatNum(views)}
          danmakus={formatNum(danmakus)}
          favorites={formatNum(favorites)}
        />
      </div>
      <Rating
        score={score}
        count={formatNum(count)}
      />
    </div>
  )
}

export default forwardRef(Content)
