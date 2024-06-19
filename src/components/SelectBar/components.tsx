import styled from "styled-components"
import type { CSSProp, StyledComponent } from "styled-components"

import type { DayProps, HoverWrapperProps } from "./types"

/**
 * @description 选中框包裹层
 * @param {HoverWrapperProps} props 选中框包裹层Props
 * @return {*}  {CSSProp}
 */
const HoverWrapper: StyledComponent<"div", HoverWrapperProps, HoverWrapperProps, never> = styled.div<HoverWrapperProps>(
  (props: HoverWrapperProps): CSSProp => ({
    transform: `translateX(${(document.body.clientWidth / 7) * props.index}px)`,
  }),
)

/**
 * @description 导航栏元素的日期
 * @param {DayProps} props 导航栏元素的日期Props
 * @return {*}  {CSSProp}
 */
const Day: StyledComponent<"div", DayProps, DayProps, never> = styled.div<DayProps>(
  (props: DayProps): CSSProp => ({
    color: props.checked && props.today ? "var(--nav-item-selected-text-color)" : "var(--nav-item-text-color)",
    backgroundColor: props.checked && props.today && "var(--round-button-text-color)",
  }),
)

export { HoverWrapper, Day }
