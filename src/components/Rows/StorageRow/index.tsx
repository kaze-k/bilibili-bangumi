import { forwardRef } from "react"
import type React from "react"

import style from "../style.module.scss"
import LocalStorageRow from "./LocalStorageRow"

// 行组件标题文本
const TITLE_TEXT = "存储"

/**
 * @description 存储行组件
 * @param {unknown} _props 存储行组件Props
 * @param {React.Ref<HTMLDivElement>} ref 存储行组件ref
 * @return {*}  {React.ReactElement}
 */
function StorageRow(_props: unknown, ref: React.Ref<HTMLDivElement>): React.ReactElement {
  return (
    <div
      ref={ref}
      className={style["wrapper"]}
    >
      <div className={style["title"]}>{TITLE_TEXT}</div>
      <LocalStorageRow />
    </div>
  )
}

export default forwardRef(StorageRow)
