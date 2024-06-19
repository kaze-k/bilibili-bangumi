import { forwardRef, useCallback } from "react"
import type React from "react"
import { useDispatch, useSelector } from "react-redux"

import { Row, Switch } from "~/components/base"
import type { AppDispatch, AppState } from "~/store"
import { setDarkMode } from "~/store/features/theme"

import style from "../style.module.scss"

// 行组件文本
const TEXT = "深色主题"

/**
 * @description 深色主题行组件
 * @param {unknown} _props 深色主题行组件Props
 * @param {React.Ref<HTMLDivElement>} ref 深色主题行组件ref
 * @return {*}  {React.ReactElement}
 */
function DarkModeThemeRow(_props: unknown, ref: React.Ref<HTMLDivElement>): React.ReactElement {
  const dispatch: AppDispatch = useDispatch()

  // 状态
  const darkMode: boolean = useSelector((state: AppState): boolean => state.theme.darkMode)

  /**
   * @description 处理改变的方法: 切换深色主题的状态
   */
  const handlChange: () => void = useCallback((): void => {
    dispatch(setDarkMode(!darkMode))
  }, [darkMode, dispatch])

  return (
    <div
      ref={ref}
      className={style["container"]}
    >
      <Row text={TEXT}>
        <Switch
          id="dark-switch"
          onChange={handlChange}
          checked={darkMode}
        />
      </Row>
    </div>
  )
}

export default forwardRef(DarkModeThemeRow)
