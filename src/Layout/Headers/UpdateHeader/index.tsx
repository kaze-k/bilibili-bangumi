import type React from "react"
import { useSelector } from "react-redux"

import RefreshButton from "~/components/Buttons/RefreshButton"
import SwitchThemeButton from "~/components/Buttons/SwitchThemeButton"
import Search from "~/components/Search"
import type { AppState } from "~/store"
import { EpisodeType } from "~/store/enums"

import style from "./style.module.scss"

/**
 * @description 更新页刷新按钮
 * @return {*}  {React.ReactElement}
 */
function UpdateRefreshButton(): React.ReactElement {
  // 状态
  const todayType: EpisodeType = useSelector((state: AppState): EpisodeType => state.episode.todayType)

  return <RefreshButton type={todayType} />
}

/**
 * @description 更新页头部组件
 * @return {*}  {React.ReactElement}
 */
function UpdateHeader(): React.ReactElement {
  return (
    <header className={style["header"]}>
      <div className={style["side"]}>
        <SwitchThemeButton />
      </div>
      <div className={style["center"]}>
        <Search />
      </div>
      <div className={style["side"]}>
        <UpdateRefreshButton />
      </div>
    </header>
  )
}

export default UpdateHeader
