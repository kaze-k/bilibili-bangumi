import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { memo, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { Button } from "~/components/common/Button"
import { update } from "~/store/features/data"

/**
 * @description 清理本地存储按键组件
 * @param {DarkModeProps} props 深色主题Props
 * @param {boolean} props.darkMode 深色主题 [可选]
 * @return {*}  {React.ReactElement}
 */
function RefreshButton(props: DarkModeProps): React.ReactElement {
  const dispatch: Dispatch = useDispatch()

  // 状态
  const [allowed, setAllowed] = useState<boolean>(true)
  const isLoading: boolean = useSelector((state: State): boolean => state.data.isLoading)

  /**
   * @description 处理更新的方法: 发送更新信息通信
   */
  const handleUpdate: () => void = (): void => {
    if (!isLoading) {
      dispatch(update())
    }
  }

  // 当加载状态改变时: 改变按钮的可用性
  useEffect((): void => {
    if (isLoading) {
      setAllowed(false)
    } else {
      setAllowed(true)
    }
  }, [isLoading])

  const icon: React.ReactElement = (
    <FontAwesomeIcon
      icon={"redo-alt"}
      size="xl"
      spin={isLoading}
    />
  )

  return (
    <Button
      title="刷新"
      onClick={handleUpdate}
      clickable={allowed}
      darkMode={props.darkMode}
    >
      {icon}
    </Button>
  )
}

export default memo(RefreshButton)
