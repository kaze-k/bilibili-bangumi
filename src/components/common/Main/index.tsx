import styled from "styled-components"

/**
 * @description 内容区
 * @param {DarkModeProps} props 深色主题Props
 * @param {boolean} props.darkMode 深色主题 [可选]
 * @return {*}  {CSSProp}
 */
const Main: StyledComponent<"main", any, DarkModeProps, never> = styled.main(
  (props: DarkModeProps): CSSProp => ({
    backgroundColor: props.darkMode ? "#000000" : "#ffffff",
  }),
)

export default Main
