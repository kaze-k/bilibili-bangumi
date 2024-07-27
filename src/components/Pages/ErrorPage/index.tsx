import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { forwardRef } from "react"
import type React from "react"

import style from "./style.module.scss"
import type { ErrorPageProps } from "./types"

/**
 * @description 错误页面组件
 * @param {ErrorPageProps} props 错误页面组件props
 * @param {React.Ref<HTMLDivElement>} ref 错误页面组件ref
 * @return {*}  {React.ReactElement}
 */
function ErrorPage(props: ErrorPageProps, ref: React.Ref<HTMLDivElement>): React.ReactElement {
  const { text } = props

  return (
    <div
      ref={ref}
      className={style["error"]}
    >
      <FontAwesomeIcon
        icon={["far", "dizzy"]}
        size="2xl"
        className={style["icon"]}
      />
      <span>{text}</span>
    </div>
  )
}

export default forwardRef(ErrorPage)
