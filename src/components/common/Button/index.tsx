import React from "react"
import styled, { CSSProp, StyledComponent } from "styled-components"

import style from "./style.module.scss"

/**
 * @description mini div按钮
 * @param {MiniButtonDivProps} props mini div按钮Props
 * @param {boolean} props.darkMode 深色主题 [可选]
 * @param {boolean} props.clickable 是否可点击
 * @return {*}  {CSSProp}
 */
const MiniButtonDiv: StyledComponent<"div", MiniButtonDivProps, any, never> = styled.div(
  (props: MiniButtonDivProps): CSSProp => ({
    ":hover": props.clickable && {
      filter: "opacity(85%)",
    },
    filter: !props.clickable && "grayscale(100%)",
  }),
)

/**
 * @description div按钮
 * @param {ButtonDivProps} props div按钮Props
 * @param {boolean} props.darkMode 深色主题 [可选]
 * @param {boolean} props.clickable 是否可点击
 * @return {*}  {CSSProp}
 */
const ButtonDiv: StyledComponent<"div", any, ButtonDivProps, never> = styled.div(
  (props: ButtonDivProps): CSSProp => ({
    ":hover": props.clickable && {
      color: props.darkMode ? "#343a43" : "#fb7299",
      backgroundColor: "#ffffff",
    },
  }),
)

/**
 * @description 按钮盒子
 * @param {ButtonBoxProps} props 按钮盒子Props
 * @param {boolean} props.clickable 是否可点击
 * @return {*}  {CSSProp}
 */
const ButtonBox: StyledComponent<"a", any, ButtonBoxProps, never> = styled.a(
  (props: ButtonBoxProps): CSSProp => ({
    cursor: props.mini ? (props.clickable ? "pointer" : "not-allowed") : props.clickable ? "pointer" : "default",
  }),
)

/**
 * @description 按钮组件
 * @param {ButtonProps} props 按钮Props
 * @param {React.ReactElement | string} props.children 子组件
 * @param {React.MouseEventHandler<HTMLAnchorElement>} props.onClick 点击事件 [可选]
 * @param {string} props.title 标题 [可选]
 * @param {boolean} props.darkMode 深色主题 [可选]
 * @param {boolean} props.mini mini类型 [可选]
 * @param {boolean} props.clickable 是否可点击
 * @return {*}  {React.ReactElement}
 */
function Button(props: ButtonProps): React.ReactElement {
  const clickable: boolean = props.clickable ?? true

  if (props.mini) {
    return (
      <MiniButtonDiv
        className={style.mini_button}
        title={props.title}
        darkMode={props.darkMode}
        clickable={clickable}
      >
        <ButtonBox
          onClick={clickable ? props.onClick : null}
          className={style.mini_icon_box}
          clickable={clickable}
          mini
        >
          {props.children}
        </ButtonBox>
      </MiniButtonDiv>
    )
  }

  return (
    <ButtonDiv
      className={style.button}
      title={props.title}
      darkMode={props.darkMode}
      clickable={clickable}
    >
      <ButtonBox
        onClick={clickable ? props.onClick : null}
        className={style.icon_box}
        clickable={clickable}
      >
        {props.children}
      </ButtonBox>
    </ButtonDiv>
  )
}

export default Button
