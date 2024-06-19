import { forwardRef } from "react"
import type React from "react"

import { IconFont } from "~/components/base"

import style from "./style.module.scss"
import type { StatProps } from "./types"

/**
 * @description 状态组件
 * @param {StatProps} props 状态组件Props
 * @param {React.Ref<HTMLDivElement>} ref 状态组件ref
 * @return {*}  {React.ReactElement}
 */
function Stat(props: StatProps, ref: React.Ref<HTMLDivElement>): React.ReactElement {
  const { views, danmakus, favorites } = props

  return (
    <div
      ref={ref}
      className={style["stat"]}
    >
      <div title={`播放数：${views}`}>
        <IconFont icon="views" /> {views}
      </div>
      <div title={`弹幕数：${danmakus}`}>
        <IconFont icon="danmakus" /> {danmakus}
      </div>
      <div title={`追番数：${favorites}`}>
        <IconFont icon="heart" /> {favorites}
      </div>
    </div>
  )
}

export default forwardRef(Stat)
