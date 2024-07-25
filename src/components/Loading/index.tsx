import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { forwardRef } from "react"
import type React from "react"

import style from "./style.module.scss"
import LoadingProps from "./types"

/**
 * @description 加载动画组件
 * @param {LoadingProps} props 加载动画组件props
 * @param {React.Ref<HTMLDivElement>} ref 加载动画组件ref
 * @return {*}  {React.ReactElement}
 */
function Loading(props: LoadingProps, ref: React.Ref<HTMLDivElement>): React.ReactElement {
  const { icon = "spinner" } = props

  if (icon === "spinner") {
    return (
      <div
        ref={ref}
        className={style["spinner"]}
      >
        <FontAwesomeIcon
          icon="spinner"
          size="2xl"
          spin
        />
      </div>
    )
  }
}

export default forwardRef(Loading)
