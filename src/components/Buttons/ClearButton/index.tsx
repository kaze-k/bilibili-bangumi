import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"

import Button from "~/components/common/Button"
import { useMessage } from "~/components/common/Message"
import useGetStorageInUse from "~/hooks/useGetStorageInUse"
import { clearData } from "~/store/features/data"

/**
 * @description 清理本地存储按键组件
 * @param {DarkModeProps} props 深色主题Props
 * @param {boolean} props.darkMode 深色主题 [可选]
 * @return {*}  {React.ReactElement}
 */
function ClearButton(props: DarkModeProps): React.ReactElement {
  const dispatch: Dispatch = useDispatch()
  const message: ReturnType<typeof useMessage> = useMessage()

  const text = "清理"

  // 状态
  const [allowed, setAllowed] = useState<boolean>(true)
  const [size] = useGetStorageInUse()

  /**
   * @description 清除本地存储的方法: 清除本地存储并恢复缓存状态
   */
  const handleClear: () => void = (): void => {
    message.promise(
      Promise.all([chrome.storage.local.clear(), dispatch(clearData(null))]).then(
        () => setAllowed(false),
        () => setAllowed(true),
      ),
      {
        success: "存储已清理",
        error: "存储清理失败",
      },
    )
  }

  // 当size变化时: 允许按钮点击
  useEffect((): void => {
    if (size !== 0) {
      setAllowed(true)
    }
  }, [size])

  return (
    <Button
      title="清理存储"
      onClick={handleClear}
      clickable={allowed}
      darkMode={props.darkMode}
      mini
    >
      {text}
    </Button>
  )
}

export default ClearButton
