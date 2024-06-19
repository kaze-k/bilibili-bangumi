import { forwardRef } from "react"
import type React from "react"

import { Text } from "./components"
import style from "./style.module.scss"
import type { RowProps } from "./types"

/**
 * @description 行组件
 * @param {RowProps} props 行Props
 * @param {React.Ref<HTMLDivElement>} ref 行组件ref
 * @return {*}  {React.ReactElement}
 */
function Row(props: RowProps, ref: React.Ref<HTMLDivElement>): React.ReactElement {
  const { title, text, children } = props

  return (
    <div
      ref={ref}
      className={style["row"]}
    >
      <Text
        className={style["text"]}
        title={title}
      >
        {text}
      </Text>
      <div>{children}</div>
    </div>
  )
}

export default forwardRef(Row)
