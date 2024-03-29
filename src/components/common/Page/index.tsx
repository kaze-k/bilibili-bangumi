import styled, { CSSProp, StyledComponent } from "styled-components"

const Page: StyledComponent<"div", {}, DarkModeProps, never> = styled.div(
  (props: DarkModeProps): CSSProp => ({
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100vw",
    height: "100vh",
    overflow: "hidden",
    backgroundColor: props.darkMode ? "#000000" : "#ffffff",
  }),
)

export default Page
