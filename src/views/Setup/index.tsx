import React from "react"
import { useSelector } from "react-redux"

import Main from "~/components/common/Main"

import NoticeRow from "./Rows/NoticeRow"
import ResetRow from "./Rows/ResetRow"
import StorageRow from "./Rows/StorageRow"
import ThemeRow from "./Rows/ThemeRow"
import SetupHeader from "./SetupHeader"
import Version from "./Version"
import style from "./style.module.scss"

/**
 * @description 设置页组件
 * @return {*}  {React.ReactElement}
 */
function Setup(): React.ReactElement {
  // 状态
  const darkMode: boolean = useSelector((state: State): boolean => state.theme.darkMode)

  return (
    <>
      <SetupHeader darkMode={darkMode} />
      <Main
        className={style.main}
        darkMode={darkMode}
      >
        <div className={style.wrapper}>
          <NoticeRow darkMode={darkMode} />
          <ThemeRow darkMode={darkMode} />
          <StorageRow darkMode={darkMode} />
          <ResetRow darkMode={darkMode} />
          <Version />
        </div>
      </Main>
    </>
  )
}

export default Setup
