import styled from "styled-components"
import type { CSSProp, StyledComponent } from "styled-components"

import type { HoverBoxProps, SelectButtonProps, SelectItemProps } from "./types"

/**
 * @description 选中框
 * @param {HoverBoxProps} props 选中框Props
 * @return {*}  {CSSProp}
 */
const HoverBox: StyledComponent<"li", HoverBoxProps, HoverBoxProps, never> = styled.li<HoverBoxProps>(
  (props: HoverBoxProps): CSSProp => ({
    height: `${props.height}px`,
    transform: `translateY(${props.height * props.index}px)`,
  }),
)

/**
 * @description 选择组件按钮
 * @param {SelectButtonProps} props 选择组件按钮Props
 * @return {*}  {CSSProp}
 */
const SelectButton: StyledComponent<"div", SelectButtonProps, SelectButtonProps, never> = styled.div<SelectButtonProps>(
  (props: SelectButtonProps): CSSProp => ({
    backgroundColor: props.show && "var(--select-button-selected-bg-color)",
    color: props.show ? "var(--select-button-selected-color)" : "var(--select-button-color)",
  }),
)

/**
 * @description 选项元素
 * @param {SelectItemProps} props 选项元素Props
 * @return {*}  {CSSProp}
 */
const SelectItem: StyledComponent<"li", SelectItemProps, SelectItemProps, never> = styled.li<SelectItemProps>(
  (props: SelectItemProps): CSSProp => ({
    color: props.hover && "var(--select-item-selected-color)",
    pointerEvents: props.hover ? "none" : "auto",
  }),
)

export { HoverBox, SelectButton, SelectItem }
