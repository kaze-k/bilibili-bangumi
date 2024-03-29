import React from "react"

import style from "../style.module.scss"
import ResetButtonRow from "./ResetButtonRow"

/**
 * @description 重置设置行组件
 * @param {DarkModeProps} props 深色主题Props
 * @param {boolean} props.darkMode 深色主题 [可选]
 * @return {*}  {React.ReactElement}
 */
function ResetRow(props: DarkModeProps): React.ReactElement {
  return (
    <div className={style.wrapper}>
      <ResetButtonRow darkMode={props.darkMode} />
    </div>
  )
}

export default ResetRow
