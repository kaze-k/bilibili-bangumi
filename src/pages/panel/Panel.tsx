import type React from "react"

import { MessageProvider } from "~/components/Message"
import { useFetchData, useOfflineStatus, useOnlineStatus, useSyncStates, useTheme } from "~/hooks"
import RouterView from "~/router/panel"

/**
 * @description Panel组件
 * @return {*}  {React.ReactElement}
 */
function Panel(): React.ReactElement {
  useTheme()
  useFetchData()
  useOnlineStatus()
  useOfflineStatus()
  useSyncStates("panel")

  return (
    <MessageProvider options={{ limit: 3, reverse: true, duration: 3000 }}>
      <RouterView />
    </MessageProvider>
  )
}

export default Panel
