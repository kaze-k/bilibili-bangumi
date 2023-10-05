import styled, { CSSProp, StyledComponent } from "styled-components"

/**
 * @description 头部
 * @param {DarkModeProps} props 深色主题Props
 * @param {boolean} props.darkMode 深色主题 [可选]
 * @return {*}  {CSSProp}
 */
const Header: StyledComponent<"header", any, DarkModeProps, never> = styled.header(
  (props: DarkModeProps): CSSProp => ({
    backgroundColor: props.darkMode ? "#343a43" : "#fb7299",
  }),
)

export default Header
