import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { forwardRef, useCallback } from "react"
import type React from "react"
import { useDispatch, useSelector } from "react-redux"

import { RoundButton } from "~/components/base"
import type { AppDispatch, AppState } from "~/store"
import { setDarkMode } from "~/store/features/theme"

// 按钮标题属性
const TITLE = "切换主题"

// 主题图标
const ICON = {
  light: (
    <FontAwesomeIcon
      icon="sun"
      size="xl"
    />
  ),
  dark: (
    <FontAwesomeIcon
      icon="cloud-moon"
      size="xl"
    />
  ),
}

/**
 * @description 切换主题按钮组件
 * @param {unknown} _props 按钮props
 * @param {React.Ref<HTMLButtonElement>} ref 按钮ref
 * @return {*}  {React.ReactElement}
 */
function SwitchThemeButton(_props: unknown, ref: React.Ref<HTMLButtonElement>): React.ReactElement {
  const dispatch: AppDispatch = useDispatch()

  // 状态
  const darkMode: boolean = useSelector((state: AppState): boolean => state.theme.darkMode)

  // 主题图标
  const themeIcon: React.ReactElement = ICON[darkMode ? "dark" : "light"]

  /**
   * @description 切换深浅色主题的方法
   */
  const toggleThemeBtn: () => void = useCallback((): void => {
    dispatch(setDarkMode(!darkMode))
  }, [darkMode, dispatch])

  return (
    <RoundButton
      ref={ref}
      title={TITLE}
      onClick={toggleThemeBtn}
    >
      {themeIcon}
    </RoundButton>
  )
}

export default forwardRef(SwitchThemeButton)
