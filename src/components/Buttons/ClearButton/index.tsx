import { useDispatch } from "react-redux"

import Button from "~/components/common/Button"
import { useMessage } from "~/components/common/Message"
import { clearData } from "~/store/features/data"

/**
 * @description 清理本地存储按键组件
 * @param {DarkModeProps} props 深色主题Props
 * @param {boolean} props.darkMode 深色主题 [可选]
 * @return {*}  {React.ReactElement}
 */
function ClearButton(props: DarkModeProps): React.ReactElement {
  const dispatch: Dispatch = useDispatch()
  const message: Message = useMessage()

  const text = "清理"

  /**
   * @description 清除本地存储的方法: 清除本地存储并恢复缓存状态
   */
  const handleClear: () => void = (): void => {
    chrome.storage.local.clear()
    dispatch(clearData(null))
    message("已清理本地存储")
  }

  return (
    <Button
      title="清理存储"
      onClick={handleClear}
      darkMode={props.darkMode}
      mini
    >
      {text}
    </Button>
  )
}

export default ClearButton
