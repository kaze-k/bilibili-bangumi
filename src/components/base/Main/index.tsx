import { forwardRef } from "react"
import type React from "react"

import style from "./style.module.scss"
import type { MainProps } from "./types"

/**
 * @description 内容区组件
 * @param {MainProps} props 内容区组件Props
 * @param {React.Ref<HTMLDivElement>} ref 内容区组件ref
 * @return {*}  {React.ReactElement}
 */
function Main(props: MainProps, ref: React.Ref<HTMLDivElement>): React.ReactElement {
  const { className, children } = props

  return (
    <main
      ref={ref}
      className={`${style["main"]} ${className}`}
    >
      {children}
    </main>
  )
}

export default forwardRef(Main)
