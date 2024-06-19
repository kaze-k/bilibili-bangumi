import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { forwardRef } from "react"
import type React from "react"

import { MessageClearButton } from "./components"
import style from "./style.module.scss"
import type { MessageDefaultProps, MessageLoadingProps, MessageProps, MessageTypeProps } from "./types"

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
 * @description 默认消息组件
 * @param {MessageDefaultProps} props 默认消息组件Props
 * @param {React.Ref<HTMLDivElement>} ref 组件ref
 * @return {*}  {React.ReactElement}
 */
const MessageDefault: React.ForwardRefExoticComponent<MessageDefaultProps & React.RefAttributes<HTMLDivElement>> =
  forwardRef((props: MessageDefaultProps, ref: React.Ref<HTMLDivElement>): React.ReactElement => {
    const { id, message } = props

    return (
      <div
        className={style["message-default-wrapper"]}
        id={id}
        ref={ref}
      >
        <span className={style["message-content"]}>{message}</span>
      </div>
    )
  })

MessageDefault.displayName = "MessageDefault"

/**
 * @description 类型消息组件
 * @param {MessageTypeProps} props 类型消息组件Props
 * @param {React.Ref<HTMLDivElement>} ref 组件ref
 * @return {*}  {React.ReactElement}
 */
const MessageType: React.ForwardRefExoticComponent<MessageTypeProps & React.RefAttributes<HTMLDivElement>> = forwardRef(
  (props: MessageTypeProps, ref: React.Ref<HTMLDivElement>): React.ReactElement => {
    const { id, type, message } = props

    return (
      <div
        className={style["message-type-wrapper"]}
        id={id}
        ref={ref}
      >
        {MESSAGE_TYPE_ICON[type]}
        <span className={style["message-content"]}>{message}</span>
        <MessageClearButton id={id} />
      </div>
    )
  },
)

MessageType.displayName = "MessageType"

/**
 * @description 加载消息组件
 * @param {MessageLoadingProps} props 加载消息组件Props
 * @param {React.Ref<HTMLDivElement>} ref 组件ref
 * @return {*}  {React.ReactElement}
 */
const MessageLoading: React.ForwardRefExoticComponent<MessageLoadingProps & React.RefAttributes<HTMLDivElement>> =
  forwardRef((props: MessageLoadingProps, ref: React.Ref<HTMLDivElement>): React.ReactElement => {
    const { id } = props

    return (
      <div
        className={style["message-default-wrapper"]}
        id={id}
        ref={ref}
      >
        <FontAwesomeIcon
          icon="circle-notch"
          size="xl"
          spin
        />
      </div>
    )
  })

MessageLoading.displayName = "MessageLoading"

/**
 * @description 消息组件
 * @param {MessageProps} props 消息组件Props
 * @param {React.Ref<HTMLDivElement>} ref 组件ref
 * @return {*}  {React.ReactElement}
 */
function Message(props: MessageProps, ref: React.Ref<HTMLDivElement>): React.ReactElement {
  const { id, type, message } = props

  if (type === "default") {
    return (
      <MessageDefault
        ref={ref}
        message={message}
        id={id}
      />
    )
  }

  if (type === "loading") {
    return (
      <MessageLoading
        ref={ref}
        id={id}
      />
    )
  }

  return (
    <MessageType
      ref={ref}
      type={type}
      message={message}
      id={id}
    />
  )
}

export default forwardRef(Message)
