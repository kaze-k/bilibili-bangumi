import styled from "styled-components"
import type { CSSProp, StyledComponent } from "styled-components"

import type { WrapperProps } from "./types"

/**
 * @description 页面包裹层
 * @param {WrapperProps} props 页面包裹层Props
 * @return {*}  {CSSProp}
 */
const Wrapper: StyledComponent<"div", WrapperProps, WrapperProps, never> = styled.div<WrapperProps>(
  (props: WrapperProps): CSSProp => ({
    transform: `translateX(${-document.body.clientWidth * props.index}px)`,
  }),
)

export { Wrapper }
