import type React from "react"
import { forwardRef } from "react"

import style from "./style.module.scss"
import type { TipsProps } from "./types"

type TipsComponent = React.ForwardRefExoticComponent<TipsProps & React.RefAttributes<HTMLDivElement>>

/**
 * @description 提示组件
 * @param {TipsProps} props 提示组件Props
 * @param {React.Ref<HTMLDivElement>} ref 提示组件ref
 * @return {*}  {React.ReactElement}
 */
const Tips: TipsComponent = forwardRef((props: TipsProps, ref: React.Ref<HTMLDivElement>): React.ReactElement => {
  const { children } = props

  return (
    <div
      className={style["tips"]}
      ref={ref}
    >
      {children}
    </div>
  )
})

Tips.displayName = "Tips"

export { Tips }
