import styled from "styled-components"

import style from "./style.module.scss"

/**
 * @description mini div按钮
 * @param {DarkModeProps} props 深色主题Props
 * @param {boolean} props.darkMode 深色主题 [可选]
 * @return {*}  {CSSProp}
 */
const MiniButtonDiv: StyledComponent<"div", any, DarkModeProps, never> = styled.div(
  (props: DarkModeProps): CSSProp => ({
    color: props.darkMode ? "#fb7299" : "#ffffff",
    backgroundColor: props.darkMode ? "#24282d" : "#fb7299",
    ":hover": {
      color: props.darkMode ? "#fb7299" : "#ffffff",
      backgroundColor: props.darkMode ? "#24282d" : "#fb7299",
    },
    ":active": {
      backgroundColor: props.darkMode ? "#777777" : "#f791ae",
    },
  }),
)

/**
 * @description div按钮
 * @param {DarkModeProps} props 深色主题Props
 * @param {boolean} props.darkMode 深色主题 [可选]
 * @return {*}  {CSSProp}
 */
const ButtonDiv: StyledComponent<"div", any, DarkModeProps, never> = styled.div(
  (props: DarkModeProps): CSSProp => ({
    ":hover": {
      color: props.darkMode ? "#343a43" : "#fb7299",
      backgroundColor: "#ffffff",
    },
  }),
)

/**
 * @description 按钮组件
 * @param {ButtonProps} props 按钮Props
 * @param {ReactElement | string} props.children 子组件
 * @param {MouseEventHandler<HTMLAnchorElement>} props.onClick 点击事件 [可选]
 * @param {string} props.title 标题 [可选]
 * @param {boolean} props.darkMode 深色主题 [可选]
 * @param {boolean} props.mini mini类型 [可选]
 * @return {*}  {ReactElement}
 */
function Button(props: ButtonProps): ReactElement {
  const miniButton: ReactElement = (
    <MiniButtonDiv
      className={style.mini_button}
      title={props.title}
      darkMode={props.darkMode}
    >
      <a
        onClick={props.onClick}
        className={style.mini_icon_box}
      >
        {props.children}
      </a>
    </MiniButtonDiv>
  )

  if (props.mini) {
    return miniButton
  }

  return (
    <ButtonDiv
      className={style.button}
      title={props.title}
      darkMode={props.darkMode}
    >
      <a
        onClick={props.onClick}
        className={style.icon_box}
      >
        {props.children}
      </a>
    </ButtonDiv>
  )
}

export default Button
