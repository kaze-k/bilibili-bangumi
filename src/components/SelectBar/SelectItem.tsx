import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { forwardRef } from "react"
import type React from "react"

import { Day } from "./components"
import style from "./style.module.scss"
import type { NavItmeProps } from "./types"

/**
 * @description 渲染今天标记图标
 * @param {boolean} today 是否是今天
 * @return {*}  {React.ReactElement}
 */
function renderTodayIcon(today: boolean): React.ReactElement {
  if (today) {
    return (
      <FontAwesomeIcon
        className={style["icon"]}
        icon="circle"
      />
    )
  }
}

/**
 * @description 导航栏元素组件
 * @param {NavItmeProps} props 导航栏元素Props
 * @param {React.Ref<HTMLInputElement>} ref 导航栏元素组件ref
 * @return {*}  {React.ReactElement}
 */
function SelectItem(props: NavItmeProps, ref: React.Ref<HTMLInputElement>): React.ReactElement {
  const { today, checked, onClick, date, day, name, id } = props

  return (
    <div
      ref={ref}
      className={style["wrapper"]}
    >
      <input
        className={style["radio"]}
        type="radio"
        id={id}
        name={name}
        onClick={onClick}
        defaultChecked={checked}
      />
      <label
        className={style["label"]}
        htmlFor={id}
      >
        <div className={style["container"]}>
          <div className={style["time-box"]}>
            <Day
              className={style["day"]}
              today={Boolean(today)}
              checked={checked}
            >
              {day}
            </Day>
            <div className={style["date"]}>{date}</div>
          </div>
          <div className={style["today"]}>{renderTodayIcon(today)}</div>
        </div>
      </label>
    </div>
  )
}

export default forwardRef(SelectItem)
