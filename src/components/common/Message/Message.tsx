import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"

import { MessageButtonWrapper, MessageWrapper } from "./components"
import message from "./handler"
import style from "./style.module.scss"

// 消息类型图标
const MESSAGE_TYPE_ICON = {
  info: (
    <FontAwesomeIcon
      icon="circle-info"
      size="xl"
      style={{ color: "blue" }}
    />
  ),
  warning: (
    <FontAwesomeIcon
      icon="triangle-exclamation"
      size="xl"
      style={{ color: "orange" }}
    />
  ),
  error: (
    <FontAwesomeIcon
      icon="bomb"
      size="xl"
      style={{ color: "red" }}
    />
  ),
  success: (
    <FontAwesomeIcon
      icon="circle-check"
      size="xl"
      style={{ color: "green" }}
    />
  ),
}

/**
 * @description 消息清除按钮
 * @param {MessageClearButtonProps} props 消息清除按钮Props
 * @param {boolean} props.darkMode 深色主题 [可选]
 * @param {string} props.id 消息id
 * @return {*}  {React.ReactElement}
 */
function MessageClearButton(props: MessageClearButtonProps): React.ReactElement {
  /**
   * @description 删除消息方法
   */
  const handleClear: () => void = (): void => {
    message.remove(props.id)
  }

  return (
    <MessageButtonWrapper
      darkMode={props.darkMode}
      onClick={handleClear}
    >
      <FontAwesomeIcon
        icon="circle-xmark"
        size="xl"
        className={style.message_button}
      />
    </MessageButtonWrapper>
  )
}

/**
 * @description 默认消息组件
 * @param {MessageDefaultProps} props 默认消息组件Props
 * @param {boolean} props.darkMode 深色主题 [可选]
 * @param {string} props.id 消息id
 * @param {string} props.message 消息内容
 * @return {*}  {React.ReactElement}
 */
function MessageDefault(props: MessageDefaultProps): React.ReactElement {
  return (
    <MessageWrapper
      className={style.message_default_wrapper}
      darkMode={props.darkMode}
      id={props.id}
    >
      <span className={style.message_content}>{props.message}</span>
    </MessageWrapper>
  )
}

/**
 * @description 类型消息组件
 * @param {MessageTypeProps} props 类型消息组件Props
 * @param {boolean} props.darkMode 深色主题 [可选]
 * @param {string} props.id 消息id
 * @param {"success" | "info" | "warning" | "error"} props.type 消息类型
 * @param {string} props.message 消息内容
 * @return {*}  {React.ReactElement}
 */
function MessageType(props: MessageTypeProps): React.ReactElement {
  return (
    <MessageWrapper
      className={style.message_type_wrapper}
      darkMode={props.darkMode}
      id={props.id}
    >
      {MESSAGE_TYPE_ICON[props.type]}
      <span className={style.message_content}>{props.message}</span>
      <MessageClearButton
        id={props.id}
        darkMode={props.darkMode}
      />
    </MessageWrapper>
  )
}

/**
 * @description 加载消息组件
 * @param {MessageLoadingProps} props 加载消息组件Props
 * @param {boolean} props.darkMode 深色主题 [可选]
 * @param {string} props.id 消息id
 * @return {*}  {React.ReactElement}
 */
function MessageLoading(props: MessageLoadingProps): React.ReactElement {
  return (
    <MessageWrapper
      className={style.message_default_wrapper}
      darkMode={props.darkMode}
      id={props.id}
    >
      <FontAwesomeIcon
        icon="circle-notch"
        size="xl"
        spin
      />
    </MessageWrapper>
  )
}

/**
 * @description 消息组件
 * @param {MessageProps} props 消息组件Props
 * @param {boolean} props.darkMode 深色主题 [可选]
 * @param {string} props.id 消息id
 * @param {MessageType} props.type 消息类型
 * @param {string} props.message 消息内容
 * @return {*}  {React.ReactElement}
 */
function Message(props: MessageProps): React.ReactElement {
  if (props.type === "default") {
    return (
      <MessageDefault
        message={props.message}
        id={props.id}
        darkMode={props.darkMode}
      />
    )
  }

  if (props.type === "loading") {
    return (
      <MessageLoading
        id={props.id}
        darkMode={props.darkMode}
      />
    )
  }

  return (
    <MessageType
      type={props.type}
      message={props.message}
      id={props.id}
      darkMode={props.darkMode}
    />
  )
}

export default Message
