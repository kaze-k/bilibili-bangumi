import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { NavigateFunction, useNavigate } from "react-router-dom"

import Button from "~/components/common/Button"
import { useMessage } from "~/components/common/Message"

/**
 * @description 进入设置页面按钮组件
 * @param {DarkModeProps} props 深色主题Props
 * @param {boolean} props.darkMode 深色主题 [可选]
 * @return {*}  {React.ReactElement}
 */
function SetupButton(props: DarkModeProps): React.ReactElement {
  const navigation: NavigateFunction = useNavigate()
  const message = useMessage()

  const icon: React.ReactElement = (
    <FontAwesomeIcon
      icon="gear"
      size="xl"
    />
  )

  /**
   * @description 处理点击的方法: 进入设置页面并清除消息
   */
  const handleClick = () => {
    navigation("/settings")
    message.clear()
  }

  return (
    <Button
      title="设置"
      onClick={handleClick}
      darkMode={props.darkMode}
    >
      {icon}
    </Button>
  )
}

export default SetupButton
