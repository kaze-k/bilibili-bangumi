import React from "react"
import styled, { CSSProp, StyledComponent } from "styled-components"

import style from "./style.module.scss"

/**
 * @description Nav
 * @param {DarkModeProps} props 深色主题Props
 * @param {boolean} props.darkMode 深色主题 [可选]
 * @return {*}  {CSSProp}
 */
const Nav: StyledComponent<"nav", any, DarkModeProps, never> = styled.nav(
  (props: DarkModeProps): CSSProp => ({
    backgroundColor: props.darkMode ? "#343a43" : "#fb7299",
  }),
)

/**
 * @description 默认Nav
 * @param {DarkModeProps} props 深色主题Props
 * @param {boolean} props.darkMode 深色主题 [可选]
 * @return {*}  {CSSProp}
 */
const NavDefault: StyledComponent<"nav", any, DarkModeProps, never> = styled.nav(
  (props: DarkModeProps): CSSProp => ({
    backgroundColor: props.darkMode ? "#000000" : "#ffffff",
  }),
)

/**
 * @description 选中框包裹层
 * @param {HoverWrapperProps} props 选中框包裹层Props
 * @param {number} props.index 索引值
 * @return {*}  {CSSProp}
 */
const HoverWrapper: StyledComponent<"div", any, HoverWrapperProps, never> = styled.div(
  (props: HoverWrapperProps): CSSProp => ({
    transform: `translateX(${(document.body.clientWidth / 7) * props.index}px)`,
  }),
)

/**
 * @description 选中框
 * @param {HoverWrapperProps} props 选中框Props
 * @param {number} props.index 索引值
 * @return {*}  {React.ReactElement}
 */
function Hover(props: HoverWrapperProps): React.ReactElement {
  return (
    <HoverWrapper
      className={style.hover_wrapper}
      index={props.index}
    >
      <div className={style.hover}></div>
    </HoverWrapper>
  )
}

export { Nav, NavDefault, Hover }
