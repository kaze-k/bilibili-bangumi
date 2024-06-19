import { forwardRef } from "react"
import type React from "react"

import style from "../style.module.scss"
import AutoThemeRow from "./AutoThemeRow"
import DarkModeThemeRow from "./DarkModeThemeRow"
import SystemThemeRow from "./SystemThemeRow"

// 行组件标题文本
const TITLE_TEXT = "外观"

/**
 * @description 主题行组件
 * @param {unknown} _props 主题行组件Props
 * @param {React.Ref<HTMLDivElement>} ref 主题行组件ref
 * @return {*}  {React.ReactElement}
 */
function ThemeRow(_props: unknown, ref: React.Ref<HTMLDivElement>): React.ReactElement {
  return (
    <div
      ref={ref}
      className={style["wrapper"]}
    >
      <div className={style["title"]}>{TITLE_TEXT}</div>
      <DarkModeThemeRow />
      <SystemThemeRow />
      <AutoThemeRow />
    </div>
  )
}

export default forwardRef(ThemeRow)
