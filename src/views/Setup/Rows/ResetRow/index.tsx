import React from "react"

import ResetButton from "~/components/Buttons/ResetButton"

import style from "./style.module.scss"

/**
 * @description 重置设置行组件
 * @param {DarkModeProps} props 深色主题Props
 * @param {boolean} props.darkMode 深色主题 [可选]
 * @return {*}  {React.ReactElement}
 */
function ResetRow(props: DarkModeProps): React.ReactElement {
  return (
    <div className={style.wrapper}>
      <div className={style.content}>
        <ResetButton darkMode={props.darkMode} />
      </div>
    </div>
  )
}

export default ResetRow
