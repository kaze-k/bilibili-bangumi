import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { forwardRef } from "react"
import type React from "react"

import style from "./style.module.scss"
import LoadingProps from "./types"

// 加载动画
const LOADING_ICON: React.ReactElement = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
  >
    <circle
      cx="4"
      cy="12"
      r="1.5"
      fill="currentColor"
    >
      <animate
        attributeName="r"
        dur="0.75s"
        repeatCount="indefinite"
        values="1.5;3;1.5"
      ></animate>
    </circle>
    <circle
      cx="12"
      cy="12"
      r="3"
      fill="currentColor"
    >
      <animate
        attributeName="r"
        dur="0.75s"
        repeatCount="indefinite"
        values="3;1.5;3"
      ></animate>
    </circle>
    <circle
      cx="20"
      cy="12"
      r="1.5"
      fill="currentColor"
    >
      <animate
        attributeName="r"
        dur="0.75s"
        repeatCount="indefinite"
        values="1.5;3;1.5"
      ></animate>
    </circle>
  </svg>
)

/**
 * @description 加载动画组件
 * @param {LoadingProps} props 加载动画组件props
 * @param {React.Ref<HTMLDivElement>} ref 加载动画组件ref
 * @return {*}  {React.ReactElement}
 */
function Loading(props: LoadingProps, ref: React.Ref<HTMLDivElement>): React.ReactElement {
  const { icon = "spinner" } = props

  if (icon === "loading") {
    return (
      <div
        ref={ref}
        className={style["loading"]}
      >
        {LOADING_ICON}
      </div>
    )
  }

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

export default forwardRef(Loading)
