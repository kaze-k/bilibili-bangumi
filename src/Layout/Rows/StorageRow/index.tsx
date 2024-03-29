import React from "react"

import style from "../style.module.scss"
import LocalStorageRow from "./LocalStorageRow"

const titleText = "存储"

/**
 * @description 存储行组件
 * @param {DarkModeProps} props 深色主题Props
 * @param {boolean} props.darkMode 深色主题 [可选]
 * @return {*}  {React.ReactElement}
 */
function StorageRow(props: DarkModeProps): React.ReactElement {
  return (
    <div className={style.wrapper}>
      <div className={style.title}>{titleText}</div>
      <LocalStorageRow darkMode={props.darkMode} />
    </div>
  )
}

export default StorageRow
