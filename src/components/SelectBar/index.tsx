import { composeRef } from "rc-util/lib/ref"
import { forwardRef, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react"
import type React from "react"
import { useDispatch, useSelector } from "react-redux"

import type { AppDispatch, AppState } from "~/store"
import { getDates, setChecked, setIndex } from "~/store/features/data"
import { toChineseDay } from "~/utils"

import Hover from "./Hover"
import SelectItem from "./SelectItem"
import style from "./style.module.scss"

/**
 * @description 渲染选项
 * @param {[][]} dates 日期
 * @param {(i: number) => void} handleChange 处理改变的方法
 * @param {(i: number) => void} handleClick 处理点击的方法
 * @param {boolean[]} checked 是否选中
 * @return {*}  {React.ReactElement[]}
 */
function renderSelectItems(
  dates: [][],
  handleChange: (i: number) => void,
  handleClick: (i: number) => void,
  checked: boolean[],
): React.ReactElement[] {
  const selectItems: React.ReactElement[] = dates?.map(
    (item: object, index: number): React.ReactElement => (
      <SelectItem
        key={item["date_ts"]}
        onChange={(): void => handleChange(index)}
        onClick={(): void => handleClick(index)}
        date={item["date"]}
        day={toChineseDay(item["day_of_week"])}
        today={item["is_today"]}
        name="nav-item"
        id={item["date_ts"]}
        checked={checked[index]}
      />
    ),
  )

  return selectItems
}

/**
 * @description 渲染选择框
 * @param {number} currentIndex 当前索引
 * @return {*}  {React.ReactElement}
 */
function renderHover(currentIndex: number): React.ReactElement {
  return <Hover index={currentIndex} />
}

/**
 * @description 导航栏组件
 * @param {unknown} _props 导航栏组件props
 * @param {React.Ref<HTMLDivElement>} ref 导航栏组件ref
 * @return {*}  {React.ReactElement}
 */
function SelectBar(_props: unknown, ref: React.Ref<HTMLDivElement>): React.ReactElement {
  const dispatch: AppDispatch = useDispatch()

  // 状态
  const [loading, setLoading] = useState<boolean>(true)
  const [rendered, setRendered] = useState<boolean>(false)
  const dates: [][] = useSelector((state: AppState): [][] => state.data.dates)
  const currentIndex: number = useSelector((state: AppState): number => state.data.currentIndex)
  const checked: boolean[] = useSelector((state: AppState): boolean[] => state.data.checked)
  const isLoading: boolean = useSelector((state: AppState): boolean => state.data.isLoading)

  // nav的节点实例
  const navRef: React.RefObject<HTMLElement> = useRef<HTMLElement>(null)

  /**
   * @description 导航栏点击的方法
   * @param {number} i 索引值
   */
  const handleClick: (i: number) => void = useCallback(
    (i: number): void => {
      const x: number =
        (navRef.current.childNodes[i] as HTMLElement)?.offsetLeft -
        navRef.current.clientWidth / 2 +
        (navRef.current.childNodes[i] as HTMLElement)?.clientWidth / 2

      if (rendered) {
        navRef.current.scrollTo({ left: x, behavior: "smooth" })
      } else {
        navRef.current.scrollTo({ left: x, behavior: "auto" })
        setRendered(true)
      }

      dispatch(setChecked(i))
      dispatch(setIndex(i))
    },
    [rendered, dispatch],
  )

  /**
   * @description 处理改变的方法: 当索引改变时计算滚动的位置
   * @param {number} i 索引值
   */
  const handleChange: (i: number) => void = useCallback(
    (i: number): void => {
      dispatch(setChecked(i))
      handleClick(i)
      dispatch(setIndex(i))
    },
    [handleClick, dispatch],
  )

  /**
   * @description 导航栏滚动的方法: 当按住`CTRL`键时可以对页面进行滚动，否则只滚动导航栏
   * @param {React.WheelEvent<HTMLElement>} event 导航栏滚动event
   */
  const handleScroll: (event: React.WheelEvent<HTMLElement>) => void = useCallback(
    (event: React.WheelEvent<HTMLElement>): void => {
      if (!event.ctrlKey) {
        const x: number = event.deltaY + navRef.current.scrollLeft
        navRef.current.scrollTo({ left: x, behavior: "smooth" })
        return
      }

      const currentChecked: boolean[] = [...checked].fill(false)

      if (event.deltaY > 0 && currentIndex < dates.length - 1) {
        currentChecked[currentIndex + 1] = true
        dispatch(setIndex(currentIndex + 1))
        handleChange(currentIndex + 1)
        dispatch(setChecked(currentIndex + 1))
      } else if (event.deltaY < 0 && currentIndex > 0) {
        currentChecked[currentIndex - 1] = true
        dispatch(setIndex(currentIndex - 1))
        handleChange(currentIndex - 1)
        dispatch(setChecked(currentIndex - 1))
      }
    },
    [checked, currentIndex, dates.length, handleChange, dispatch],
  )

  // 当页面渲染时: 发送获取日期通信
  useLayoutEffect((): void => {
    dispatch(getDates())
  }, [dispatch])

  // 更新完成时: 发送获取日期通信
  useEffect((): void => {
    if (isLoading !== null && !isLoading) dispatch(getDates())
  }, [isLoading, dispatch])

  // 当有日期信息时: 发送通信/设置加载动画/设置索引值为中间值
  useLayoutEffect((): void => {
    if (dates.length) {
      setLoading(false)
      dispatch(setIndex(Math.floor(dates.length / 2)))
    } else {
      setLoading(true)
    }
  }, [dates.length, dispatch])

  // 当索引值改变时/当加载动画改变时: 触发处理改变的方法
  useLayoutEffect((): void => {
    if (currentIndex !== null && dates.length && !loading) handleChange(currentIndex)
  }, [currentIndex, dates.length, loading, handleChange])

  if (dates.length) {
    return (
      <nav
        ref={composeRef(ref, navRef)}
        className={style["nav"]}
        onWheel={(e: React.WheelEvent<HTMLElement>): void => handleScroll(e)}
      >
        {renderSelectItems(dates, handleChange, handleClick, checked)}
        {loading !== null && !loading && renderHover(currentIndex)}
      </nav>
    )
  }
}

export default forwardRef(SelectBar)
