import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useDispatch } from "react-redux"

import Button from "~/components/common/Button"
import { toggleDarkMode } from "~/store/features/theme"

/**
 * @description 切换主题按钮组件
 * @param {DarkModeProps} props 深色主题Props
 * @param {boolean} props.darkMode 深色主题 [可选]
 * @return {*}  {ReactElement}
 */
function SwitchThemeButton(props: DarkModeProps): ReactElement {
  const dispatch: Dispatch = useDispatch()

  /**
   * @description 切换深浅色主题的方法
   */
  const toggleThemeBtn: () => void = (): void => {
    dispatch(toggleDarkMode(null))
  }

  let icon: ReactElement
  if (props.darkMode) {
    icon = (
      <FontAwesomeIcon
        icon="cloud-moon"
        size="xl"
      />
    )
  } else {
    icon = (
      <FontAwesomeIcon
        icon="sun"
        size="xl"
      />
    )
  }

  return (
    <Button
      title="切换主题"
      onClick={toggleThemeBtn}
      darkMode={props.darkMode}
    >
      {icon}
    </Button>
  )
}

export default SwitchThemeButton
