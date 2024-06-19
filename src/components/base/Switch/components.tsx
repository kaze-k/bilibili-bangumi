import styled from "styled-components"
import type { CSSProp, StyledComponent } from "styled-components"

import type { ButtonSpanProps } from "./types"

/**
 * @description Label标签样式
 * @param {ButtonSpanProps} props Label标签样式Props
 * @return {*}  {CSSProp}
 */
const Label: StyledComponent<"label", ButtonSpanProps, ButtonSpanProps, never> = styled.label<ButtonSpanProps>(
  (props: ButtonSpanProps): CSSProp => ({
    backgroundColor: props.checked ? "var(--switch-label-checked-bg-color)" : "var(--switch-label-bg-color)",
    boxShadow: props.checked ? "var(--switch-label-checked-box-shadow)" : "var(--switch-label-box-shadow)",
    transition: props.checked
      ? "box-shadow ease-in-out 0.5s, background-color ease-in-out 0.5s"
      : "box-shadow cubic-bezier(0, 0, 0, 1) 0.5s, background-color cubic-bezier(0, 0, 0, 1) 0.5s",
  }),
)

/**
 * @description 按钮
 * @param {ButtonSpanProps} props 按钮Props
 * @return {*}  {CSSProp}
 */
const Button: StyledComponent<"span", ButtonSpanProps, ButtonSpanProps, never> = styled.span<ButtonSpanProps>(
  (props: ButtonSpanProps): CSSProp => ({
    left: props.checked ? "95%" : "5%",
    transform: props.checked ? "translateX(-100%) translateY(-50%)" : "translateY(-50%)",
    boxShadow: props.checked ? "var(--switch-button-checked-box-shadow)" : "var(--switch-button-box-shadow)",
  }),
)

export { Label, Button }
