import type React from "react"

import { MessageProvider } from "~/components/Message"
import { useSyncStates, useTheme } from "~/hooks"
import RouterView from "~/router/options"

/**
 * @description options组件
 * @return {*}  {React.ReactElement}
 */
function Options(): React.ReactElement {
  useTheme()
  useSyncStates("options")

  return (
    <MessageProvider options={{ limit: 3, reverse: true, duration: 3000 }}>
      <RouterView />
    </MessageProvider>
  )
}

export default Options
