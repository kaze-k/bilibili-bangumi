import React from "react"
import styled, { CSSProp, StyledComponent } from "styled-components"

import style from "./style.module.scss"

/**
 * @description 块状div按钮
 * @param {BlockButtonDivProps} props 块状div按钮Props
 * @param {boolean} props.darkMode 深色主题 [可选]
 * @param {BtnTheme} props.btnTheme 按钮颜色主题 [可选]
 * @param {boolean} props.clickable 是否可点击
 * @return {*}  {CSSProp}
 */
const BlockButtonDiv: StyledComponent<"div", BlockButtonDivProps, any, never> = styled.div(
  (props: BlockButtonDivProps): CSSProp => ({
    color: props.darkMode ? props.btnTheme?.color?.dark : props.btnTheme?.color?.light,
    backgroundColor: props.darkMode ? props.btnTheme?.backgroundColor?.dark : props.btnTheme?.backgroundColor?.light,
    ":hover": props.clickable && {
      filter: "opacity(85%)",
    },
    filter: !props.clickable && "grayscale(100%) invert(10%)",
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
 * @param {string} props.btnHeight 按钮高度 [可选]
 * @param {boolean} props.clickable 是否可点击
 * @param {boolean} props.block block模式
 * @return {*}  {CSSProp}
 */
const ButtonBox: StyledComponent<"a", any, ButtonBoxProps, never> = styled.a(
  (props: ButtonBoxProps): CSSProp => ({
    height: props.btnHeight,
    cursor: props.block ? (props.clickable ? "pointer" : "not-allowed") : props.clickable ? "pointer" : "default",
  }),
)

/**
 * @description 按钮组件
 * @param {ButtonProps} props 按钮Props
 * @param {React.ReactElement | string} props.children 子组件
 * @param {React.MouseEventHandler<HTMLAnchorElement>} props.onClick 点击事件 [可选]
 * @param {string} props.title 标题 [可选]
 * @param {boolean} props.darkMode 深色主题 [可选]
 * @param {boolean} props.clickable 是否可点击
 * @return {*}  {React.ReactElement}
 */
function Button(props: ButtonProps): React.ReactElement {
  const clickable: boolean = props.clickable ?? true

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

/**
 * @description 块状按钮组件
 * @param {BlockButtonProps} props 按钮Props
 * @param {React.ReactElement | string} props.children 子组件
 * @param {React.MouseEventHandler<HTMLAnchorElement>} props.onClick 点击事件 [可选]
 * @param {string} props.title 标题 [可选]
 * @param {boolean} props.darkMode 深色主题 [可选]
 * @param {string} props.btnHeight 按钮高度 [可选]
 * @param {BtnTheme} props.btnTheme 按钮颜色主题 [可选]
 * @param {boolean} props.clickable 是否可点击
 * @return {*}  {React.ReactElement}
 */
function BlockButton(props: BlockButtonProps): React.ReactElement {
  const clickable: boolean = props.clickable ?? true

  return (
    <BlockButtonDiv
      className={style.block_button}
      title={props.title}
      darkMode={props.darkMode}
      clickable={clickable}
      btnTheme={props.btnTheme}
    >
      <ButtonBox
        onClick={clickable ? props.onClick : null}
        className={style.block_box}
        clickable={clickable}
        btnHeight={props.btnHeight}
        block
      >
        {props.children}
      </ButtonBox>
    </BlockButtonDiv>
  )
}

export { Button, BlockButton }
