import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"

import { BlockButton } from "~/components/common/Button"
import { useMessage } from "~/components/common/Message"
import useIsInitialConfigStore from "~/hooks/useIsInitialConfigStore"
import { persistor } from "~/store"
import { resetType } from "~/store/features/episode"
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

  const text = "重置设置"

  // 状态
  const [allowed, setAllowed] = useState<boolean>(true)
  const isInitial: boolean = useIsInitialConfigStore()

  /**
   * @description 重置设置的方法
   */
  const handleReset: () => void = (): void => {
    message.promise(
      Promise.all([persistor.purge(), dispatch(resetTheme()), dispatch(resetNotice()), dispatch(resetType())]).then(
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
    <BlockButton
      title="重置设置"
      onClick={handleReset}
      clickable={allowed}
      darkMode={props.darkMode}
      btnHeight={"35px"}
      btnTheme={{
        color: { light: "#f1f1f1", dark: "#f1f1f1" },
        backgroundColor: { light: "#fb7299", dark: "#fb7299" },
      }}
    >
      {text}
    </BlockButton>
  )
}

export default ResetButton
