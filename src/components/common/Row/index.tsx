import styled from "styled-components"

import style from "./style.module.scss"

/**
 * @description 行包裹层
 * @param {DarkModeProps} props 深色主题Props
 * @param {boolean} props.darkMode 深色主题 [可选]
 * @return {*}  {CSSProp}
 */
const RowWrapper: StyledComponent<"div", any, DarkModeProps, never> = styled.div(
  (props: DarkModeProps): CSSProp => ({
    backgroundColor: props.darkMode ? "#343a43" : "#f1f1f1",
  }),
)

/**
 * @description 行组件
 * @param {RowProps} props 行Props
 * @param {string} props.text 文本 [可选]
 * @param {ReactElement} props.children 子组件
 * @param {boolean} props.darkMode 深色主题 [可选]
 * @return {*}  {ReactElement}
 */
function Row(props: RowProps): ReactElement {
  return (
    <RowWrapper
      className={style.row}
      darkMode={props.darkMode}
    >
      <div className={style.text}>{props.text}</div>
      <div>{props.children}</div>
    </RowWrapper>
  )
}

export default Row
