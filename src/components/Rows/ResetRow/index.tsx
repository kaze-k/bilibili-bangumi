import { forwardRef } from "react"
import type React from "react"

import style from "../style.module.scss"
import ResetButtonRow from "./ResetButtonRow"

/**
 * @description 重置设置行组件
 * @param {unknown} _props 重置设置行组件Props
 * @param {React.Ref<HTMLDivElement>} ref 重置设置行组件ref
 * @return {*}  {React.ReactElement}
 */
function ResetRow(_props: unknown, ref: React.Ref<HTMLDivElement>): React.ReactElement {
  return (
    <div
      ref={ref}
      className={style["wrapper"]}
    >
      <ResetButtonRow />
    </div>
  )
}

export default forwardRef(ResetRow)
