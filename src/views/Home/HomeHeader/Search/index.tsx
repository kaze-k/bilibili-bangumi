import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useRef, useState } from "react"
import styled from "styled-components"

import style from "./style.module.scss"

/**
 * @description 输入框盒
 * @param {DarkModeProps} props 深色主题Props
 * @param {boolean} props.darkMode 深色主题 [可选]
 * @return {*}  {CSSProp}
 */
const InputBox: StyledComponent<"div", any, DarkModeProps, never> = styled.div(
  (props: DarkModeProps): CSSProp => ({
    border: props.darkMode ? "1px solid #343a43" : "1px solid #fb7299",
    backgroundColor: props.darkMode ? "#000000" : "#ffffff",
    ":hover": {
      border: props.darkMode ? "1px solid rgb(52, 58, 67, 0.5)" : "1px solid rgba(251, 114, 153, 0.5)",
    },
  }),
)

/**
 * @description 输入框
 * @param {DarkModeProps} props 深色主题Props
 * @param {boolean} props.darkMode 深色主题 [可选]
 * @return {*}  {CSSProp}
 */
const Input: StyledComponent<"input", any, DarkModeProps, never> = styled.input(
  (props: DarkModeProps): CSSProp => ({
    color: props.darkMode ? "#ffffff" : "#000000",
    backgroundColor: props.darkMode ? "#000000" : "#ffffff",
  }),
)

/**
 * @description 搜索框组件
 * @param {DarkModeProps} props 深色主题Props
 * @param {boolean} props.darkMode 深色主题 [可选]
 * @return {*}  {ReactElement}
 */
function Search(props: DarkModeProps): ReactElement {
  // 状态
  const [hasFocus, setHasFocus] = useState<boolean>(false)
  const [val, setVal] = useState<string>("")

  // 节点实例
  const inputRef: RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null)

  const placeholder: string = "bilibili 搜索动漫"

  /**
   * @description 处理清空的方法: 清空输入框的内容
   */
  const handleClear: () => void = (): void => {
    setVal("")
  }

  /**
   * @description 处理搜索的方法: 当输入框内有内容并且聚焦输入框，点击回车进行搜索
   * @param {SearchEvent} event 搜索框event
   */
  const handleSearch: (event: SearchEvent) => void = (event: SearchEvent): void => {
    if (val && hasFocus && event.key === "Enter") {
      chrome.tabs.create({
        url: `https://search.bilibili.com/bangumi?keyword=${val}`,
      })
    }
  }

  let clear: ReactElement
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
          onChange={(e: SearchChangeEvent): void => setVal(e.target.value)}
          onFocus={(): void => setHasFocus(true)}
          onBlur={(): void => setHasFocus(false)}
          placeholder={placeholder}
          darkMode={props.darkMode}
        />

        <div
          className={style.clear}
          onClick={handleClear}
          onMouseDown={(e: SearchMouseEvent): void => e.preventDefault()}
        >
          {clear}
        </div>
      </InputBox>
    </>
  )
}

export default Search
