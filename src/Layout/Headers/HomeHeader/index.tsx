import React, { memo } from "react"
import { useSelector } from "react-redux"

import NoticeButton from "~/components/Buttons/NoticeButton"
import RefreshButton from "~/components/Buttons/RefreshButton"
import SetupButton from "~/components/Buttons/SetupButton"
import SwitchThemeButton from "~/components/Buttons/SwitchThemeButton"
import Search from "~/components/Search"
import Select from "~/components/Select"
import Disconnection from "~/components/common/Disconnection"
import Header from "~/components/common/Header"

import style from "./sytle.module.scss"

/**
 * @description 首页头部组件
 * @param {DarkModeProps} props 深色主题Props
 * @param {boolean} props.darkMode 深色主题 [可选]
 * @return {*}  {React.ReactElement}
 */
function HomeHeader(props: DarkModeProps): React.ReactElement {
  // 状态
  const currentIndex: number = useSelector((state: State): number => state.data.currentIndex)

  const selectElement: React.ReactElement = <Select darkMode={props.darkMode} />

  const disconnectionElement: React.ReactElement = <Disconnection />

  return (
    <Header
      className={style.header}
      darkMode={props.darkMode}
    >
      <div className={style.left}>{currentIndex !== null ? selectElement : disconnectionElement}</div>
      <div className={style.center}>
        <Search darkMode={props.darkMode} />
      </div>
      <div className={style.right}>
        <NoticeButton darkMode={props.darkMode} />
        <SwitchThemeButton darkMode={props.darkMode} />
        <RefreshButton darkMode={props.darkMode} />
        <SetupButton darkMode={props.darkMode} />
      </div>
    </Header>
  )
}

export default memo(HomeHeader)
