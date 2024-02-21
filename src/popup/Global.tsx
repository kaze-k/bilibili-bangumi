import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { update } from "~/store/features/data"
import { setDarkMode } from "~/store/features/theme"

function Global(props: { children: React.ReactElement }): React.ReactElement {
  const dispath: Dispatch = useDispatch()

  // 状态
  const system: boolean = useSelector((state: State): boolean => state.theme.system)

  // 查询系统主题
  const theme: MediaQueryList = window.matchMedia("(prefers-color-scheme: dark)")

  /**
   * @description 监听系统主题
   * @param {MediaQueryListEvent} event 事件
   */
  const themeListener: (event: MediaQueryListEvent) => void = (event: MediaQueryListEvent): void => {
    dispath(setDarkMode(event.matches))
  }

  /**
   * @description 监听在线: 当网络在线时，发送更新信息通信
   */
  const onlineListener: () => void = (): void => {
    if (window.navigator.onLine) {
      dispath(update())
    }
  }

  /**
   * @description 监听离线: 当网络离线时，提示离线
   */
  // TODO: 离线提示
  const offlineListener: () => void = (): void => {
    if (!window.navigator.onLine) {
      console.log("当前处于离线状态")
    }
  }

  // 当网络状态改变时: 监听在线/监听离线
  useEffect((): (() => void) => {
    window.addEventListener("online", onlineListener)
    window.addEventListener("offline", offlineListener)

    return (): void => {
      window.removeEventListener("online", onlineListener)
      window.removeEventListener("offline", offlineListener)
    }
  }, [window.navigator.onLine])

  // 当系统主题改变时/当主题状态改变时: 监听系统主题
  useEffect((): (() => void) => {
    if (!system) {
      return
    }

    theme.addEventListener("change", themeListener)

    return (): void => {
      theme.removeEventListener("change", themeListener)
    }
  }, [theme.matches, system])

  return <>{props.children}</>
}

export default Global
