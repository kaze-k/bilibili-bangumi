import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { forwardRef } from "react"
import type React from "react"

import style from "./style.module.scss"
import type { TimeProps } from "./types"

/**
 * @description 时间组件
 * @param {TimeProps} props 时间组件Props
 * @param {React.Ref<HTMLDivElement>} ref 时间组件ref
 * @return {*}  {React.ReactElement}
 */
function Time(props: TimeProps, ref: React.Ref<HTMLDivElement>): React.ReactElement {
  const { children } = props

  return (
    <div ref={ref}>
      <FontAwesomeIcon icon={["far", "clock"]} />
      <span className={style["time"]}>{children}</span>
    </div>
  )
}

export default forwardRef(Time)
