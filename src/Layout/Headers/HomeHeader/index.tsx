import type React from "react"
import { useSelector } from "react-redux"

import { NoticeButton, RefreshButton, SetupButton, SwitchThemeButton } from "~/components/Buttons"
import Disconnection from "~/components/Disconnection"
import Search from "~/components/Search"
import TypeSelector from "~/components/TypeSelector"
import type { AppState } from "~/store"
import { EpisodeType } from "~/store/enums"

import style from "./sytle.module.scss"

/**
 * @description 首页头部元素组件
 * @return {*}  {React.ReactElement}
 */
function ElementComponent(): React.ReactElement {
  // 状态
  const currentIndex: number = useSelector((state: AppState): number => state.data.currentIndex)

  if (currentIndex === null) return <Disconnection />
  return <TypeSelector />
}

/**
 * @description 首页刷新按钮
 * @return {*}  {React.ReactElement}
 */
function HomeRefreshButton(): React.ReactElement {
  // 状态
  const type: EpisodeType = useSelector((state: AppState): EpisodeType => state.episode.type)

  return <RefreshButton type={type} />
}

/**
 * @description 首页头部组件
 * @return {*}  {React.ReactElement}
 */
function HomeHeader(): React.ReactElement {
  return (
    <header className={style["header"]}>
      <div className={style["left"]}>
        <ElementComponent />
      </div>
      <div className={style["center"]}>
        <Search />
      </div>
      <div className={style["right"]}>
        <NoticeButton />
        <SwitchThemeButton />
        <HomeRefreshButton />
        <SetupButton />
      </div>
    </header>
  )
}

export default HomeHeader
