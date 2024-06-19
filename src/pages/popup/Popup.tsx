import type React from "react"

import { MessageProvider } from "~/components/Message"
import { useOfflineStatus, useSyncStates, useTheme } from "~/hooks"
import RouterView from "~/router/popup"

/**
 * @description popup组件
 * @return {*}  {React.ReactElement}
 */
function Popup(): React.ReactElement {
  useTheme()
  useOfflineStatus()
  useSyncStates("popup")

  return (
    <MessageProvider options={{ limit: 3, reverse: true, duration: 3000 }}>
      <RouterView />
    </MessageProvider>
  )
}

export default Popup
