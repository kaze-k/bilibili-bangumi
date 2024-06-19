import { useEffect, useLayoutEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import type { AppDispatch, AppState } from "~/store"
import { updateAutoTheme, updateDarkMode } from "~/store/features/theme"

/**
 * @description 监听主题状态: 当主题状态改变时，更新主题
 */
function useTheme(): void {
  const dispatch: AppDispatch = useDispatch()

  // 状态
  const darkMode: boolean = useSelector((state: AppState): boolean => state.theme.darkMode)
  const system: boolean = useSelector((state: AppState): boolean => state.theme.system)

  // 查询系统主题
  const theme: MediaQueryList = window.matchMedia("(prefers-color-scheme: dark)")

  // 当主题状态改变时: 同步设置主题标记
  useLayoutEffect((): void => {
    if (darkMode) document.documentElement.setAttribute("data-theme", "dark")
    else document.documentElement.setAttribute("data-theme", "light")
  }, [darkMode])

  // 首次挂载时: 同步更新自动更换主题的状态
  useLayoutEffect((): void => {
    dispatch(updateAutoTheme())
  }, [dispatch])

  // 监听系统主题: 当系统主题改变时，更新主题
  useEffect((): (() => void) => {
    if (!system) return

    /**
     * @description 监听系统主题
     * @param {MediaQueryListEvent} event 事件
     */
    const themeListener: (event: MediaQueryListEvent) => void = (event: MediaQueryListEvent): void => {
      dispatch(updateDarkMode(event.matches))
    }

    theme.addEventListener("change", themeListener)

    return (): void => theme.removeEventListener("change", themeListener)
  }, [theme, system, dispatch])
}

export default useTheme
