import type React from "react"

import { MessageProvider } from "~/components/Message"
import { useSyncStates, useTheme } from "~/hooks"
import RouterView from "~/router/changelog"

/**
 * @description changelog组件
 * @return {*}  {React.ReactElement}
 */
function Changelog(): React.ReactElement {
  useTheme()
  useSyncStates("changelog")

  return (
    <MessageProvider options={{ limit: 3, reverse: true, duration: 3000 }}>
      <RouterView />
    </MessageProvider>
  )
}

export default Changelog
