import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"

import { toChineseStyle } from "~/utils"

import SelectBox from "./SelectBox"
import { SelectButton } from "./components"
import style from "./style.module.scss"

/**
 * @description 选择组件
 * @param {DarkModeProps} props 深色主题Props
 * @param {boolean} props.darkMode 深色主题 [可选]
 * @return {*}  {React.ReactElement}
 */
function Select(props: DarkModeProps): React.ReactElement {
  // 状态
  const [showSelect, setShowSelect] = useState<boolean>(false)
  const type: episodeType = useSelector((state: State): episodeType => state.episode.type)

  // 节点实例
  const selectRef: React.RefObject<HTMLDivElement> = useRef(null)

  /**
   * @description 处理点击的方法: 切换显示选项的值
   */
  const handleClick: () => void = (): void => {
    setShowSelect((show: boolean): boolean => !show)
  }

  /**
   * @description 监听事件的回调方法
   * @param {Event} event document event
   */
  const listener: (event: Event) => void = (event: Event): void => {
    if (selectRef?.current?.contains(event.target as Document)) {
      return
    }
    setShowSelect(false)
  }

  // 当显示选项盒的时候: 监听document的点击事件和滚动事件
  useEffect((): (() => void) => {
    if (showSelect) {
      document.addEventListener("click", listener, false)
      document.addEventListener("wheel", listener, false)
      return (): void => {
        document.removeEventListener("click", listener, false)
        document.removeEventListener("wheel", listener, false)
      }
    }
  }, [showSelect])

  const selectbox: React.ReactElement = <SelectBox darkMode={props.darkMode} />

  return (
    <div
      ref={selectRef}
      className={style.select}
    >
      <SelectButton
        show={showSelect}
        onClick={handleClick}
        className={style.button}
        darkMode={props.darkMode}
      >
        <FontAwesomeIcon icon="filter" />
        <span className={style.text}>{toChineseStyle(type)}</span>
      </SelectButton>
      {showSelect && selectbox}
    </div>
  )
}

export default Select
