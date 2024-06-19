import { useEffect } from "react"

import { useMessage } from "~/components/Message"
import type { Message } from "~/components/Message/types"

/**
 * @description 监听离线状态: 当网络离线时提示离线
 */
function useOfflineStatus(): void {
  const message: Message = useMessage()

  // 当网络离线时: 提示离线
  useEffect((): (() => void) => {
    /**
     * @description 监听离线: 当网络离线时，提示离线
     */
    const offlineListener: () => void = (): void => {
      if (!window.navigator.onLine) {
        message.warning("当前处于离线状态")
      }
    }

    window.addEventListener("offline", offlineListener)

    return (): void => window.removeEventListener("offline", offlineListener)
  }, [message])
}

export default useOfflineStatus
