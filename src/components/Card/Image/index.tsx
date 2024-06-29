import { forwardRef } from "react"
import type React from "react"

import unfound from "~/assets/images/unfound.jpg"

import style from "./style.module.scss"
import type { ImageProps } from "./types"

// 描述图片文字
const ALT_TEXT = "番剧封面"
// 默认图片标题属性
const DEFAULT_TITLE = "图片暂时无法显示"

/**
 * @description 图片组件
 * @param {ImageProps} props 图片Props
 * @param {React.Ref<HTMLImageElement>} ref 图片组件ref
 * @return {*}  {React.ReactElement}
 */
function Image(props: ImageProps, ref: React.Ref<HTMLImageElement>): React.ReactElement {
  const { img = unfound, title } = props

  // 图片地址
  const src: string = img.length === 0 ? unfound : img

  // 图片标题
  const title_text: string = img !== unfound && img.length !== 0 ? title : DEFAULT_TITLE

  return (
    <img
      ref={ref}
      className={style["img"]}
      src={src}
      title={title_text}
      alt={ALT_TEXT}
      draggable="false"
    />
  )
}

export default forwardRef(Image)
