import { forwardRef } from "react"
import type React from "react"

import { HoverWrapper } from "./components"
import style from "./style.module.scss"
import type { HoverProps } from "./types"

/**
 * @description 选中框
 * @param {HoverProps} props 选中框Props
 * @param {React.Ref<HTMLDivElement>} ref 选中框ref
 * @return {*}  {React.ReactElement}
 */
function Hover(props: HoverProps, ref: React.Ref<HTMLDivElement>): React.ReactElement {
  const { index } = props

  return (
    <HoverWrapper
      ref={ref}
      className={style["hover-wrapper"]}
      index={index}
    >
      <div className={style["hover"]}></div>
    </HoverWrapper>
  )
}

export default forwardRef(Hover)
