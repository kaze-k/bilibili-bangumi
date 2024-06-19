import styled from "styled-components"
import type { CSSProp, StyledComponent } from "styled-components"

import type { TextProps } from "./types"

/**
 * @description 文本
 * @param {TextProps} props 文本Props
 * @return {*}  {CSSProp}
 */
const Text: StyledComponent<"div", TextProps, TextProps, never> = styled.div<TextProps>(
  (props: TextProps): CSSProp => ({
    cursor: props.title ? "help" : "default",
  }),
)

export { Text }
