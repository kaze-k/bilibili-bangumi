import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"

import Button from "~/components/common/Button"
import { useMessage } from "~/components/common/Message"
import useInitialConfigStore from "~/hooks/useIsInitialConfigStore"
import { resetStyle } from "~/store/features/episodeStyle"
import { resetNotice } from "~/store/features/notice"
import { resetTheme } from "~/store/features/theme"

/**
 * @description 重置设置按钮组件
 * @param {DarkModeProps} props 深色主题Props
 * @param {boolean} props.darkMode 深色主题 [可选]
 * @return {*}  {React.ReactElement}
 */
function ResetButton(props: DarkModeProps): React.ReactElement {
  const dispatch: Dispatch = useDispatch()
  const message: ReturnType<typeof useMessage> = useMessage()

  const text = "重置"

  // 状态
  const [allowed, setAllowed] = useState<boolean>(true)
  const isInitial: boolean = useInitialConfigStore()

  /**
   * @description 重置设置的方法
   */
  const handleReset: () => void = (): void => {
    message.promise(
      Promise.all([dispatch(resetTheme(null)), dispatch(resetNotice(null)), dispatch(resetStyle(null))]).then(
        () => setAllowed(false),
        () => setAllowed(true),
      ),
      { success: "设置已重置", error: "设置重置失败" },
    )
  }

  // 当设置改变时: 改变按钮的可用性
  useEffect((): void => {
    if (!isInitial) {
      setAllowed(true)
    }
  }, [isInitial])

  return (
    <Button
      title="重置设置"
      onClick={handleReset}
      clickable={allowed}
      darkMode={props.darkMode}
      mini
    >
      {text}
    </Button>
  )
}

export default ResetButton
