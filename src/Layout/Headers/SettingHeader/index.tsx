import type React from "react"

import { NoticeButton, SwitchThemeButton } from "~/components/Buttons"

import style from "./style.module.scss"

// 头部标题
const HEADER = "设置选项"

/**
 * @description 设置页头部组件
 * @return {*}  {React.ReactElement}
 */
function SettingHeader(): React.ReactElement {
  return (
    <header className={style["header"]}>
      <div className={style["content"]}>
        <NoticeButton />
      </div>
      <div className={style["title"]}>
        <span>{HEADER}</span>
      </div>
      <div className={style["content"]}>
        <SwitchThemeButton />
      </div>
    </header>
  )
}

export default SettingHeader
