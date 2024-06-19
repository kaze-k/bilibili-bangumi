import styled from "styled-components"
import type { CSSProp, StyledComponent } from "styled-components"

import type { ButtonBoxProps, ButtonDivProps } from "./types"

/**
 * @description 块状div按钮
 * @param {ButtonDivProps} props 块状div按钮Props
 * @return {*}  {CSSProp}
 */
const BlockButtonDiv: StyledComponent<"div", ButtonDivProps, ButtonDivProps, never> = styled.div<ButtonDivProps>(
  (props: ButtonDivProps): CSSProp => ({
    ":hover": props.clickable && {
      filter: "opacity(85%)",
    },
    filter: !props.clickable && "grayscale(100%) invert(10%)",
  }),
)

/**
 * @description 圆形div按钮
 * @param {ButtonDivProps} props 圆形div按钮Props
 * @return {*}  {CSSProp}
 */
const RoundButtonDiv: StyledComponent<"div", ButtonDivProps, ButtonDivProps, never> = styled.div<ButtonDivProps>(
  (props: ButtonDivProps): CSSProp => ({
    ":hover": props.clickable && {
      color: "var(--round-button-hover-text-color)",
      backgroundColor: "var(--round-button-hover-bg-color)",
    },
  }),
)

/**
 * @description 按钮盒子
 * @param {ButtonBoxProps} props 按钮盒子Props
 * @return {*}  {CSSProp}
 */
const ButtonBox: StyledComponent<"button", ButtonBoxProps, ButtonBoxProps, never> = styled.button<ButtonBoxProps>(
  (props: ButtonBoxProps): CSSProp => ({
    width: props.btnWidth,
    height: props.btnHeight,
    cursor: props.block ? (props.clickable ? "pointer" : "not-allowed") : props.clickable ? "pointer" : "default",
  }),
)

export { BlockButtonDiv, RoundButtonDiv, ButtonBox }
