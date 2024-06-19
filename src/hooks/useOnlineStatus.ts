import { useEffect } from "react"
import { useDispatch } from "react-redux"

import type { AppDispatch } from "~/store"
import { update } from "~/store/features/data"

/**
 * @description 监听在线状态: 当网络在线时自动更新数据
 */
function useOnlineStatus(): void {
  const dispatch: AppDispatch = useDispatch()

  // 当网络在线时: 请求更新信息
  useEffect((): (() => void) => {
    /**
     * @description 监听在线: 当网络在线时，发送更新信息通信
     */
    const onlineListener: () => void = (): void => {
      if (window.navigator.onLine) {
        dispatch(update())
      }
    }

    window.addEventListener("online", onlineListener)

    return (): void => window.removeEventListener("online", onlineListener)
  }, [dispatch])
}

export default useOnlineStatus
