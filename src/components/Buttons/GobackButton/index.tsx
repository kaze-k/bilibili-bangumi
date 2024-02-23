import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { NavigateFunction, useNavigate } from "react-router-dom"

import Button from "~/components/common/Button"

/**
 * @description 返回按钮组件
 * @param {DarkModeProps} props 深色主题Props
 * @param {boolean} props.darkMode 深色主题 [可选]
 * @return {*}  {React.ReactElement}
 */
function GoBackButton(props: DarkModeProps): React.ReactElement {
  const navigation: NavigateFunction = useNavigate()

  const icon: React.ReactElement = (
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
