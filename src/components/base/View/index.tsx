import { forwardRef } from "react"
import type React from "react"

import style from "./style.module.scss"
import type { ViewProps } from "./types"

/**
 * @description 视图组件
 * @param {ViewProps} props 视图Props
 * @param {React.Ref<HTMLDivElement>} ref 视图ref
 * @return {*}  {React.ReactElement}
 */
function View(props: ViewProps, ref: React.Ref<HTMLDivElement>): React.ReactElement {
  const { children } = props

  return (
    <div
      ref={ref}
      className={style["view"]}
    >
      {children}
    </div>
  )
}

export default forwardRef(View)
