import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { forwardRef, useCallback, useState } from "react"
import type React from "react"

import ClearButton from "./ClearButton"
import style from "./style.module.scss"

// 搜索输入框提示文本
const PLACEHOLDER = "bilibili 搜索动漫"

/**
 * @description 搜索框的清空按钮
 * @param {React.Dispatch<React.SetStateAction<string>>} handle 清空输入框的方法
 * @return {*}  {React.ReactElement}
 */
function renderClearButton(handle: React.Dispatch<React.SetStateAction<string>>): React.ReactElement {
  return <ClearButton handle={handle} />
}

/**
 * @description 搜索框组件
 * @param {unknown} _props 搜索框组件props
 * @param {React.Ref<HTMLDivElement>} ref 搜索框组件ref
 * @return {*}  {React.ReactElement}
 */
function Search(_props: unknown, ref: React.Ref<HTMLDivElement>): React.ReactElement {
  // 状态
  const [hasFocus, setHasFocus] = useState<boolean>(false)
  const [val, setVal] = useState<string>("")

  /**
   * @description 处理搜索的方法: 当输入框内有内容并且聚焦输入框，点击回车进行搜索
   * @param {React.KeyboardEvent<HTMLInputElement>} event 搜索框event
   */
  const handleSearch: (event: React.KeyboardEvent<HTMLInputElement>) => void = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>): void => {
      if (val && hasFocus && event.key === "Enter") {
        chrome.tabs.create({
          url: `https://search.bilibili.com/bangumi?keyword=${val}`,
        })
      }
    },
    [val, hasFocus],
  )

  return (
    <div
      ref={ref}
      className={style["input-box"]}
    >
      <div className={style["icon"]}>
        <FontAwesomeIcon
          icon="magnifying-glass"
          size="xl"
        />
      </div>
      <input
        value={val}
        className={style["input"]}
        type="text"
        onKeyDown={handleSearch}
        onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setVal(e.target.value)}
        onFocus={(): void => setHasFocus(true)}
        onBlur={(): void => setHasFocus(false)}
        placeholder={PLACEHOLDER}
      />
      {val && renderClearButton(setVal)}
    </div>
  )
}

export default forwardRef(Search)
