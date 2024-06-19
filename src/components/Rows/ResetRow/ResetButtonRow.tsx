import { forwardRef } from "react"
import type React from "react"

import { ResetButton } from "~/components/Buttons"

import style from "../style.module.scss"

/**
 * @description 重置按钮行组件
 * @param {unknown} _props 重置按钮行组件Props
 * @param {React.Ref<HTMLDivElement>} ref 重置按钮行组件ref
 * @return {*}  {React.ReactElement}
 */
function ResetButtonRow(_props: unknown, ref: React.Ref<HTMLDivElement>): React.ReactElement {
  return (
    <div
      ref={ref}
      className={style["button-container"]}
    >
      <ResetButton />
    </div>
  )
}

export default forwardRef(ResetButtonRow)
