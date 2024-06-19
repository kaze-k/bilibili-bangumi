import type React from "react"

import { NoticeRow, ResetRow, StorageRow, ThemeRow } from "~/components/Rows"
import Version from "~/components/Version"
import { Main } from "~/components/base"

import style from "./style.module.scss"

/**
 * @description 设置选项页面内容组件
 * @return {*}  {React.ReactElement}
 */
function SettingContent(): React.ReactElement {
  return (
    <Main className={style["main"]}>
      <div className={style["wrapper"]}>
        <NoticeRow />
        <ThemeRow />
        <StorageRow />
        <ResetRow />
        <Version className={style["version"]} />
      </div>
    </Main>
  )
}

export default SettingContent
