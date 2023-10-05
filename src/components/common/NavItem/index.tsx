import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styled, { CSSProp, StyledComponent } from "styled-components"

import style from "./style.module.scss"

/**
 * @description 导航栏元素的日期
 * @param {DayProps} props 导航栏元素的日期Props
 * @param {boolean} props.today 是否是今天 [可选]
 * @param {boolean} props.checked 是否选中元素
 * @param {boolean} props.darkMode 深色主题 [可选]
 * @return {*}  {CSSProp}
 */
const Day: StyledComponent<"div", any, DayProps, never> = styled.div(
  (props: DayProps): CSSProp => ({
    color: props.checked && props.today ? (props.darkMode ? "#343a43" : "#fb7299") : "#ffffff",
    backgroundColor: props.checked && props.today ? "#ffffff" : "transparent",
  }),
)

/**
 * @description 导航栏元素组件
 * @param {NavItmeProps} props 导航栏元素Props
 * @param {React.ChangeEventHandler<HTMLInputElement>} props.onChange 改变事件 [可选]
 * @param {React.MouseEventHandler<HTMLInputElement>} props.onClick 点击事件 [可选]
 * @param {string} props.date 日期 [可选]
 * @param {string} props.day 星期几 [可选]
 * @param {number} props.today 是否是今天 [可选]
 * @param {number} props.current 当前索引值
 * @param {boolean} props.checked 是否选中 [可选]
 * @param {string} props.name 元素名称
 * @param {string} props.for 元素id
 * @param {boolean} props.darkMode 深色主题 [可选]
 * @return {*}  {React.ReactElement}
 */
function NavItem(props: NavItmeProps): React.ReactElement {
  let today: React.ReactElement
  if (props.today) {
    today = (
      <FontAwesomeIcon
        icon="circle"
        className={style.icon}
      />
    )
  }

  return (
    <div className={style.wrapper}>
      <input
        type="radio"
        id={props.for}
        name={props.name}
        onChange={props.onChange}
        onClick={props.onClick}
        className={style.radio}
        defaultChecked={props.checked}
      />
      <label
        htmlFor={props.for}
        className={style.label}
      >
        <div className={style.container}>
          <div>
            <Day
              className={style.day}
              today={Boolean(props.today)}
              checked={props.checked}
              darkMode={props.darkMode}
            >
              {props.day}
            </Day>
            <div className={style.date}>{props.date}</div>
          </div>
          <div className={style.today}>{today}</div>
        </div>
      </label>
    </div>
  )
}

export default NavItem
