import styled, { CSSProp, StyledComponent } from "styled-components"

/**
 * @description 输入框盒
 * @param {DarkModeProps} props 深色主题Props
 * @param {boolean} props.darkMode 深色主题 [可选]
 * @return {*}  {CSSProp}
 */
const InputBox: StyledComponent<"div", any, DarkModeProps, never> = styled.div(
  (props: DarkModeProps): CSSProp => ({
    border: props.darkMode ? "1px solid #343a43" : "1px solid #fb7299",
    backgroundColor: props.darkMode ? "#000000" : "#ffffff",
    ":hover": {
      border: props.darkMode ? "1px solid rgb(52, 58, 67, 0.5)" : "1px solid rgba(251, 114, 153, 0.5)",
    },
  }),
)

/**
 * @description 输入框
 * @param {DarkModeProps} props 深色主题Props
 * @param {boolean} props.darkMode 深色主题 [可选]
 * @return {*}  {CSSProp}
 */
const Input: StyledComponent<"input", any, DarkModeProps, never> = styled.input(
  (props: DarkModeProps): CSSProp => ({
    color: props.darkMode ? "#ffffff" : "#000000",
    backgroundColor: props.darkMode ? "#000000" : "#ffffff",
  }),
)

export { InputBox, Input }
