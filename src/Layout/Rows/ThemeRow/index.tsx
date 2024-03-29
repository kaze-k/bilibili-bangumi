import React from "react"

import style from "../style.module.scss"
import AutoThemeRow from "./AutoThemeRow"
import DarkModeThemeRow from "./DarkModeThemeRow"
import SystemThemeRow from "./SystemThemeRow"

const titleText = "外观"

/**
 * @description 主题行组件
 * @param {DarkModeProps} props 深色主题Props
 * @param {boolean} props.darkMode 深色主题 [可选]
 * @return {*}  {React.ReactElement}
 */
function ThemeRow(props: DarkModeProps): React.ReactElement {
  return (
    <div className={style.wrapper}>
      <div className={style.title}>{titleText}</div>
      <DarkModeThemeRow darkMode={props.darkMode} />
      <SystemThemeRow darkMode={props.darkMode} />
      <AutoThemeRow darkMode={props.darkMode} />
    </div>
  )
}

export default ThemeRow
