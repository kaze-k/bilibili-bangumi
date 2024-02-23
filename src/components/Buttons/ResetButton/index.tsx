import { useDispatch } from "react-redux"

import Button from "~/components/common/Button"
import { useMessage } from "~/components/common/Message"
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
  const message: Message = useMessage()

  const text = "重置"

  /**
   * @description 重置设置的方法
   */
  const handleReset: () => void = (): void => {
    dispatch(resetTheme(null))
    dispatch(resetNotice(null))
    dispatch(resetStyle(null))
    message("已重置设置")
  }

  return (
    <Button
      title="重置设置"
      onClick={handleReset}
      darkMode={props.darkMode}
      mini
    >
      {text}
    </Button>
  )
}

export default ResetButton
