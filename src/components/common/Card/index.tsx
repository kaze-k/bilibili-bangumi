import React from "react"
import styled, { CSSProp, StyledComponent } from "styled-components"

import style from "./style.module.scss"

/**
 * @description 卡片包裹层
 * @param {DarkModeProps} props 深色主题Props
 * @param {boolean} props.darkMode 深色主题 [可选]
 * @return {*}  {CSSProp}
 */
const Wrapper: StyledComponent<"div", any, DarkModeProps, never> = styled.div(
  (props: DarkModeProps): CSSProp => ({
    color: props.darkMode ? "#ffffff" : "#000000",
    backgroundColor: props.darkMode ? "#343a43" : "#ffffff",
  }),
)

/**
 * @description 卡片头部
 * @param {DarkModeProps} props 深色主题Props
 * @param {boolean} props.darkMode 深色主题 [可选]
 * @return {*}  {CSSProp}
 */
const Header: StyledComponent<"div", any, DarkModeProps, never> = styled.div(
  (props: DarkModeProps): CSSProp => ({
    color: props.darkMode ? "#cccccc" : "#666666",
  }),
)

/**
 * @description 卡片组件
 * @param {CardProps} props 卡片Props
 * @param {React.ReactElement | React.ReactElement[]} props.headerLeft 头部左边内容 [可选]
 * @param {React.ReactElement | React.ReactElement[]} props.headerRight 头部右边内容 [可选]
 * @param {React.ReactElement | React.ReactElement[]} props.children 子组件
 * @param {React.ReactElement | React.ReactElement[]} props.footer 尾部内容 [可选]
 * @param {boolean} props.darkMode 深色主题 [可选]
 * @return {*}  {React.ReactElement}
 */
function Card(props: CardProps): React.ReactElement {
  return (
    <Wrapper
      className={style.card}
      darkMode={props.darkMode}
    >
      <Header
        className={style.header}
        darkMode={props.darkMode}
      >
        <div>{props.headerLeft}</div>
        <div>{props.headerRight}</div>
      </Header>
      {props.children}
      <div className={style.footer}>{props.footer}</div>
    </Wrapper>
  )
}

export default Card
