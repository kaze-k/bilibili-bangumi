import type React from "react"

import { GithubButton, SwitchThemeButton } from "~/components/Buttons/"

import style from "./style.module.scss"

// 头部标题
const HEADER = "更新日志"

/**
 * @description 更新日志页头部组件
 * @return {*}  {React.ReactElement}
 */
function ChangelogHeader(): React.ReactElement {
  return (
    <header className={style["header"]}>
      <div className={style["content"]}>
        <GithubButton />
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

export default ChangelogHeader
