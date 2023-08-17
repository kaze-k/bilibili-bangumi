import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useNavigate } from "react-router-dom"

import Button from "~/components/common/Button"

/**
 * @description 进入设置页面按钮组件
 * @param {DarkModeProps} props 深色主题Props
 * @param {boolean} props.darkMode 深色主题 [可选]
 * @return {*}  {ReactElement}
 */
function SetupButton(props: DarkModeProps): ReactElement {
  const navigation: NavigateFunction = useNavigate()

  const icon: ReactElement = (
    <FontAwesomeIcon
      icon="gear"
      size="xl"
    />
  )

  return (
    <Button
      title="设置"
      onClick={(): void => navigation("/settings")}
      darkMode={props.darkMode}
    >
      {icon}
    </Button>
  )
}

export default SetupButton
