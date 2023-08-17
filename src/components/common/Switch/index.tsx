import styled from "styled-components"

import style from "./style.module.scss"

/**
 * @description Label标签样式
 * @param {LabelProps} props Label标签样式Props
 * @param {string} props.htmlFor Label指向的元素
 * @param {boolean} props.checked 是否选中
 * @param {boolean} props.darkMode 深色主题 [可选]
 * @return {*}  {CSSProp}
 */
const Label: StyledComponent<"label", any, LabelProps, never> = styled.label(
  (props: LabelProps): CSSProp => ({
    backgroundColor: props.checked ? "#fb7299" : props.darkMode ? "#000000" : "#fdfdfd",
    borderColor: props.checked ? "#fb7299" : "transparent",
    boxShadow: props.checked ? "#fb7299 0 0 0 16px inset" : "none",
    transition: props.checked
      ? "border-color ease 0.4s, box-shadow ease 0.4s, background-color ease 0.4s"
      : "border cubic-bezier(0, 0, 0, 1) 0.4s, box-shadow cubic-bezier(0, 0, 0, 1) 0.4s",
  }),
)

/**
 * @description 按钮
 * @param {ButtonSpanProps} props 按钮Props
 * @param {boolean} props.checked 是否选中
 * @param {boolean} props.darkMode 深色主题 [可选]
 * @return {*}  {CSSProp}
 */
const ButtonSpan: StyledComponent<"span", any, ButtonSpanProps, never> = styled.span(
  (props: ButtonSpanProps): CSSProp => ({
    left: props.checked ? "95%" : "5%",
    transform: props.checked ? "translateX(-100%) translateY(-50%)" : "translateY(-50%)",
    backgroundColor: props.darkMode ? "#2a333f" : "#fbfbfb",
    boxShadow: props.checked ? "-2px 0px 2px 1px rgba(10, 10, 10, 0.1)" : "2px 0px 2px 1px rgba(10, 10, 10, 0.1)",
  }),
)

/**
 * @description 开关组件
 * @param {SwitchProps} props 开关组件Props
 * @param {boolean} props.checked 是否选中
 * @param {ChangeEventHandler<HTMLInputElement>} props.onChange 改变事件
 * @param {string} props.id 元素id
 * @param {boolean} props.darkMode 深色主题 [可选]
 * @return {*}  {ReactElement}
 */
function Switch(props: SwitchProps): ReactElement {
  return (
    <div className={style.switch_box}>
      <input
        id={props.id}
        className={style.input}
        type="checkbox"
        defaultChecked={props.checked}
        onChange={props.onChange}
      />
      <Label
        htmlFor={props.id}
        className={style.label}
        darkMode={props.darkMode}
        checked={props.checked}
      >
        <ButtonSpan
          className={style.button}
          darkMode={props.darkMode}
          checked={props.checked}
        />
      </Label>
    </div>
  )
}

export default Switch
