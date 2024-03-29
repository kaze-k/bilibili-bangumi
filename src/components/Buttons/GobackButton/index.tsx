import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { NavigateFunction, useNavigate } from "react-router-dom"

import { RoundButton } from "~/components/common/Button"
import { useMessage } from "~/components/common/Message"

/**
 * @description 返回按钮组件
 * @param {DarkModeProps} props 深色主题Props
 * @param {boolean} props.darkMode 深色主题 [可选]
 * @return {*}  {React.ReactElement}
 */
function GoBackButton(props: DarkModeProps): React.ReactElement {
  const navigation: NavigateFunction = useNavigate()
  const message: ReturnType<typeof useMessage> = useMessage()

  /**
   * @description 返回的方法: 返回上一页并清除消息
   */
  const handleGoback: () => void = (): void => {
    navigation(-1)
    message.clear()
  }

  const icon: React.ReactElement = (
    <FontAwesomeIcon
      icon="angle-left"
      size="xl"
    />
  )

  return (
    <RoundButton
      onClick={handleGoback}
      darkMode={props.darkMode}
    >
      {icon}
    </RoundButton>
  )
}

export default GoBackButton
