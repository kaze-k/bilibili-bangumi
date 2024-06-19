import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { forwardRef } from "react"
import type React from "react"

import style from "./style.module.scss"
import type { EmptyPageProps } from "./types"

/**
 * @description 空白页面组件
 * @param {EmptyPageProps} props 空白页面组件props
 * @param {React.Ref<HTMLDivElement>} ref 空白页面组件ref
 * @return {*}  {React.ReactElement}
 */
function EmptyPage(props: EmptyPageProps, ref: React.Ref<HTMLDivElement>): React.ReactElement {
  const { text } = props

  return (
    <div
      ref={ref}
      className={style["no-update"]}
    >
      <FontAwesomeIcon
        className={style["icon"]}
        icon={["far", "grin-tongue-wink"]}
        size="2xl"
      />
      <span>{text}</span>
    </div>
  )
}

export default forwardRef(EmptyPage)
