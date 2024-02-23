import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { useSelector } from "react-redux"
import styled, { CSSProp, StyledComponent } from "styled-components"

import style from "./style.module.scss"

/**
 * @description 包裹层
 * @param {MessageWrapperProps} props 深色主题Props
 * @param {boolean} props.darkMode 深色主题 [可选]
 * @param {number} props.top 顶部距离 [可选]
 * @return {*}  {CSSProp}
 */
const Wrapper: StyledComponent<"div", any, MessageWrapperProps, never> = styled.div(
  (props: MessageWrapperProps): CSSProp => ({
    color: props.darkMode ? "#ffffff" : "#000000",
    backgroundColor: props.darkMode ? "rgba(0 0 0 / 20%)" : "rgba(255 255 255 / 20%)",
    borderColor: props.darkMode ? "rgba(255 255 255 / 50%)" : "rgba(0 0 0 / 50%)",
    top: typeof props.top !== "undefined" ? props.top : document.querySelector("header").clientHeight,
  }),
)

/**
 * @description 消息内容组件
 * @param {MessageContentProps} props 消息内容组件Props
 * @param {boolean} props.loading 加载中 [可选]
 * @param {string} props.message 消息内容
 * @return {*}  {React.ReactElement}
 */
function Content(props: MessageContentProps): React.ReactElement {
  if (props.loading) {
    return (
      <FontAwesomeIcon
        icon="circle-notch"
        size="xl"
        spin
      />
    )
  }

  return <span className={style.content}>{props.message}</span>
}

/**
 * @description 消息组件
 * @param {MessageProps} props 消息组件Props
 * @param {number} props.top 顶部距离 [可选]
 * @param {boolean} props.loading 加载中 [可选]
 * @param {string} props.message 消息内容
 * @return {*}  {React.ReactElement}
 */
function Message(props: MessageProps): React.ReactElement {
  // 状态
  const darkMode: boolean = useSelector((state: State): boolean => state.theme.darkMode)

  return (
    <Wrapper
      className={style.wrapper}
      darkMode={darkMode}
      top={props.top}
    >
      <Content
        loading={props.loading}
        message={props.message}
      />
    </Wrapper>
  )
}

export default Message
