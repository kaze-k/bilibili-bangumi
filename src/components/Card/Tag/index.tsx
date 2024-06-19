import { forwardRef } from "react"
import type React from "react"

import style from "./style.module.scss"
import type { TagProps } from "./types"

/**
 * @description 标签组件
 * @param {TageProps} props 标签组件Props
 * @param {React.Ref<HTMLSpanElement>} ref 标签组件ref
 * @return {*}  {React.ReactElement}
 */
function Tag(props: TagProps, ref: React.Ref<HTMLSpanElement>): React.ReactElement {
  const { children } = props

  return (
    <span
      ref={ref}
      className={style["tag"]}
    >
      {children}
    </span>
  )
}

export default forwardRef(Tag)
