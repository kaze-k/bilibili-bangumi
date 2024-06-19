import { forwardRef } from "react"
import type React from "react"

import { EpisodeIndex } from "./components"
import style from "./style.module.scss"
import type { EpisodeProps } from "./types"

/**
 * @description 剧集组件
 * @param {EpisodeProps} props 剧集Props
 * @param {React.Ref<HTMLDivElement>} ref 剧集组件ref
 * @return {*}  {React.ReactElement}
 */
function Episode(props: EpisodeProps, ref: React.Ref<HTMLDivElement>): React.ReactElement {
  const { title, index, published } = props

  return (
    <div
      ref={ref}
      className={style["episode"]}
    >
      <div
        className={style["title"]}
        title={title}
      >
        {title}
      </div>
      <EpisodeIndex
        className={style["index"]}
        title={index}
        published={published}
      >
        {index}
      </EpisodeIndex>
    </div>
  )
}

export default forwardRef(Episode)
