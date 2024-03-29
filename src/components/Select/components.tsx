import styled, { CSSProp, StyledComponent } from "styled-components"

/**
 * @description 选中框
 * @param {HoverBoxProps} props 选中框Props
 * @param {number} props.index 选中的元素索引值
 * @param {boolean} props.darkMode 深色主题 [可选]
 * @return {*}  {CSSProp}
 */
const HoverBox: StyledComponent<"li", any, HoverBoxProps, never> = styled.li(
  (props: HoverBoxProps): CSSProp => ({
    transform: `translateY(${26 * props.index}px)`,
    backgroundColor: props.darkMode ? "rgba(0, 0, 0, 0.5)" : "rgba(235, 235, 235, 0.5)",
  }),
)

/**
 * @description 选择组件按钮
 * @param {SelectButtonProps} props 选择组件按钮Props
 * @param {boolean} props.show 是否显示选项
 * @param {boolean} props.darkMode 深色主题 [可选]
 * @return {*}  {CSSProp}
 */
const SelectButton: StyledComponent<"div", any, SelectButtonProps, never> = styled.div(
  (props: SelectButtonProps): CSSProp => ({
    backgroundColor: props.show && "#fff",
    color: props.show ? (props.darkMode ? "#343a43" : "#fb7299") : "#ffffff",
    ":hover": {
      color: props.darkMode ? "#343a43" : "#fb7299",
    },
  }),
)

/**
 * @description 选项盒包裹层
 * @param {DarkModeProps} props 深色主题Props
 * @param {boolean} props.darkMode 深色主题 [可选]
 * @return {*}  {CSSProp}
 */
const SelectBoxDiv: StyledComponent<"div", any, DarkModeProps, never> = styled.div(
  (props: DarkModeProps): CSSProp => ({
    color: props.darkMode ? "#ffffff" : "#000000",
    backgroundColor: props.darkMode ? "#343a43" : "#ffffff",
    boxShadow: props.darkMode ? "#000000 0 0 5px" : "#888888 0 0 5px",
  }),
)

/**
 * @description 选项元素
 * @param {SelectItemProps} props 选项元素Props
 * @param {boolean} props.hover 是否选中
 * @return {*}  {CSSProp}
 */
const SelectItem: StyledComponent<"li", any, SelectItemProps, never> = styled.li(
  (props: SelectItemProps): CSSProp => ({
    color: props.hover && "#fb7299",
  }),
)

export { HoverBox, SelectButton, SelectBoxDiv, SelectItem }
