import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useRef, useState } from "react"

import { Input, InputBox } from "./components"
import style from "./style.module.scss"

const placeholder = "bilibili 搜索动漫"

/**
 * @description 搜索框组件
 * @param {DarkModeProps} props 深色主题Props
 * @param {boolean} props.darkMode 深色主题 [可选]
 * @return {*}  {React.ReactElement}
 */
function Search(props: DarkModeProps): React.ReactElement {
  // 状态
  const [hasFocus, setHasFocus] = useState<boolean>(false)
  const [val, setVal] = useState<string>("")

  // 节点实例
  const inputRef: React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null)

  /**
   * @description 处理清空的方法: 清空输入框的内容
   */
  const handleClear: () => void = (): void => {
    setVal("")
  }

  /**
   * @description 处理搜索的方法: 当输入框内有内容并且聚焦输入框，点击回车进行搜索
   * @param {React.KeyboardEvent<HTMLInputElement>} event 搜索框event
   */
  const handleSearch: (event: React.KeyboardEvent<HTMLInputElement>) => void = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ): void => {
    if (val && hasFocus && event.key === "Enter") {
      chrome.tabs.create({
        url: `https://search.bilibili.com/bangumi?keyword=${val}`,
      })
    }
  }

  let clear: React.ReactElement
  if (val) {
    clear = (
      <FontAwesomeIcon
        icon="circle-xmark"
        size="lg"
        className={props.darkMode ? style.icon_dark_mode : style.icon}
      />
    )
  }

  return (
    <>
      <InputBox
        className={style.input_box}
        darkMode={props.darkMode}
      >
        <FontAwesomeIcon
          icon="magnifying-glass"
          size="xl"
          style={{ color: `${props.darkMode ? "#343a43" : "#fb7299"}` }}
        />

        <Input
          ref={inputRef}
          value={val}
          className={style.input}
          type="text"
          onKeyDown={handleSearch}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setVal(e.target.value)}
          onFocus={(): void => setHasFocus(true)}
          onBlur={(): void => setHasFocus(false)}
          placeholder={placeholder}
          darkMode={props.darkMode}
        />

        <div
          className={style.clear}
          onClick={handleClear}
          onMouseDown={(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => e.preventDefault()}
        >
          {clear}
        </div>
      </InputBox>
    </>
  )
}

export default Search
