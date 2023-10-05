import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { DebouncedFunc, throttle } from "lodash"
import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import Button from "~/components/common/Button"
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
  const isError: boolean = useSelector((state: State): boolean => state.data.isError)
  const [spinned, setSpinned] = useState<boolean>(false)

  // 节流
  const handleThrottle: DebouncedFunc<() => void> = useCallback(
    throttle((): void => {
      setSpinned(false)
    }, 2000),
    [],
  )

  /**
   * @description 处理更新的方法: 发送更新信息通信
   */
  const handleUpdate: () => void = (): void => {
    if (!spinned) {
      dispatch(update())
    }
    setSpinned(true)
  }

  // 当有错误时/当组件不旋转时: 延迟停止旋转
  useEffect((): void => {
    if (isError) {
      setTimeout((): void => {
        handleThrottle()
      }, 2000)
    }
  })

  const icon: React.ReactElement = (
    <FontAwesomeIcon
      icon={"sync-alt"}
      size="2xl"
      spin={spinned}
    />
  )

  return (
    <Button
      title="刷新"
      onClick={handleUpdate}
      darkMode={props.darkMode}
    >
      {icon}
    </Button>
  )
}

export default RefreshButton
