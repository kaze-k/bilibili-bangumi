import type React from "react"

import { GoBackButton, SwitchThemeButton } from "~/components/Buttons"

import style from "./style.module.scss"

// 头部标题
const HEADER = "设置"

/**
 * @description 设置页头部组件
 * @return {*}  {React.ReactElement}
 */
function SetupHeader(): React.ReactElement {
  return (
    <header className={style["header"]}>
      <div className={style["content"]}>
        <GoBackButton />
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

export default SetupHeader
