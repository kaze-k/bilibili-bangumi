import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"

import { setStyle } from "~/store/features/episodeStyle"
import { toChineseStyle } from "~/utils"

import style from "./style.module.scss"

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

/**
 * @description 选项盒
 * @param {DarkModeProps} props 深色主题Props
 * @param {boolean} props.darkMode 深色主题 [可选]
 * @return {*}  {ReactElement}
 */
function SelectBox(props: DarkModeProps): ReactElement {
  const styles: Styles = ["all", "anime", "guochuang"]

  const dispatch: Dispatch = useDispatch()

  // 节点实例
  const selectItems: RefObject<HTMLUListElement> = useRef(null)

  // 状态
  const [hover, setHover] = useState<boolean[]>(Array(selectItems?.current?.children?.length).fill(false))
  const index: number = useSelector((state: State): number => state.episodeStyle.index)

  /**
   * @description 处理选中的方法: 修改存储选中的元素的索引值的数字
   */
  const handleHover: () => void = (): void => {
    const hovers: boolean[] = [...hover].fill(false)
    hovers[index] = true
    setHover(hovers)
  }

  /**
   * @description 处理点击的方法: 存储选择的类别
   * @param {(Style)} style 类别
   */
  const handleClick: (style: Style) => void = (style: Style): void => {
    dispatch(setStyle(style))
  }

  // 在索引值改变时: 触发处理选中的方法
  useEffect((): void => {
    handleHover()
  }, [index])

  const SelectItems: ReactElement[] = styles.map(
    (item: Style, index: number): ReactElement => (
      <SelectItem
        key={item}
        className={style.select_item}
        hover={hover[index]}
        onClick={(): void => handleClick(item)}
      >
        {toChineseStyle(item)}
      </SelectItem>
    ),
  )

  return (
    <SelectBoxDiv
      className={style.select_box}
      darkMode={props.darkMode}
    >
      <ul
        ref={selectItems}
        className={style.wrapper}
      >
        <HoverBox
          className={style.hover_box}
          index={index}
          darkMode={props.darkMode}
        />
        {SelectItems}
      </ul>
    </SelectBoxDiv>
  )
}

/**
 * @description 选择组件
 * @param {DarkModeProps} props 深色主题Props
 * @param {boolean} props.darkMode 深色主题 [可选]
 * @return {*}  {ReactElement}
 */
function Select(props: DarkModeProps): ReactElement {
  // 状态
  const [showSelect, setShowSelect] = useState<boolean>(false)
  const episodeStyle: Style = useSelector((state: State): Style => state.episodeStyle.episodeStyle)

  // 节点实例
  const selectRef: RefObject<HTMLDivElement> = useRef(null)

  /**
   * @description 处理点击的方法: 切换显示选项的值
   */
  const handleClick: () => void = (): void => {
    setShowSelect((show: boolean): boolean => !show)
  }

  /**
   * @description 监听事件的回调函数
   * @param {Event} event document event
   */
  const listener: (event: Event) => void = (event: Event): void => {
    if (selectRef.current.contains(event.target as Document)) {
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
        <span className={style.text}>{toChineseStyle(episodeStyle)}</span>
      </SelectButton>
      {showSelect && <SelectBox darkMode={props.darkMode} />}
    </div>
  )
}

export default Select
