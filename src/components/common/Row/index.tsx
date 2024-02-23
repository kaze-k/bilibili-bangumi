import React from "react"
import styled, { CSSProp, StyledComponent } from "styled-components"

import style from "./style.module.scss"

/**
 * @description 行包裹层
 * @param {DarkModeProps} props 深色主题Props
 * @param {boolean} props.darkMode 深色主题 [可选]
 * @return {*}  {CSSProp}
 */
const RowWrapper: StyledComponent<"div", any, DarkModeProps, never> = styled.div(
  (props: DarkModeProps): CSSProp => ({
    backgroundColor: props.darkMode ? "#343a43" : "#f1f1f1",
  }),
)

/**
 * @description 文本
 * @param {TextProps} props 文本Props
 * @param {string} props.title 标题内容 [可选]
 * @return {*}  {CSSProp}
 */
const Text: StyledComponent<"div", any, TextProps, never> = styled.div(
  (props: TextProps): CSSProp => ({
    cursor: props.title ? "help" : "default",
  }),
)

/**
 * @description 行组件
 * @param {RowProps} props 行Props
 * @param {string} props.title 标题内容 [可选]
 * @param {string} props.text 文本 [可选]
 * @param {React.ReactElement} props.children 子组件
 * @param {boolean} props.darkMode 深色主题 [可选]
 * @return {*}  {React.ReactElement}
 */
function Row(props: RowProps): React.ReactElement {
  return (
    <RowWrapper
      className={style.row}
      darkMode={props.darkMode}
    >
      <Text
        title={props.title}
        className={style.text}
      >
        {props.text}
      </Text>
      <div>{props.children}</div>
    </RowWrapper>
  )
}

export default Row
