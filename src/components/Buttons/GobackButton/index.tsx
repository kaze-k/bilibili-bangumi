import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useNavigate } from "react-router-dom"

import Button from "~/components/common/Button"

/**
 * @description 返回按钮组件
 * @param {DarkModeProps} props 深色主题Props
 * @param {boolean} props.darkMode 深色主题 [可选]
 * @return {*}  {ReactElement}
 */
function GoBackButton(props: DarkModeProps): ReactElement {
  const navigation: NavigateFunction = useNavigate()

  const icon: ReactElement = (
    <FontAwesomeIcon
      icon="angle-left"
      size="xl"
    />
  )

  return (
    <Button
      onClick={(): void => navigation(-1)}
      darkMode={props.darkMode}
    >
      {icon}
    </Button>
  )
}

export default GoBackButton
