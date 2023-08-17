import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import Main from "~/components/common/Main"
import { updateAutoTheme } from "~/store/features/theme"

import NoticeRow from "./Rows/NoticeRow"
import ResetRow from "./Rows/ResetRow"
import StorageRow from "./Rows/StorageRow"
import ThemeRow from "./Rows/ThemeRow"
import SetupHeader from "./SetupHeader"
import style from "./style.module.scss"

/**
 * @description 设置页组件
 * @return {*}  {ReactElement}
 */
function Setup(): ReactElement {
  const dispatch: Dispatch = useDispatch()

  // 状态
  const darkMode: boolean = useSelector((state: State): boolean => state.theme.darkMode)

  // 首次挂载时: 更新自动更换主题的状态
  useEffect((): void => {
    dispatch(updateAutoTheme())
  }, [])

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
        </div>
      </Main>
    </>
  )
}

export default Setup
