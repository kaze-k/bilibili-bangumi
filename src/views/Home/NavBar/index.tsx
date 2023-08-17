import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import NavItem from "~/components/common/NavItem"
import { getAnimeDates, getGuoChuangDates, setChecked, setIndex } from "~/store/features/data"
import { toChineseDay } from "~/utils"

import { Hover, Nav, NavDefault } from "./components"
import style from "./style.module.scss"

/**
 * @description 导航栏组件
 * @param {DarkModeProps} props 深色主题Props
 * @param {boolean} props.darkMode 深色主题 [可选]
 * @return {*}  {ReactElement}
 */
function NavBar(props: DarkModeProps): ReactElement {
  const dispatch: Dispatch = useDispatch()

  // 状态
  const [loading, setLoading] = useState<boolean>(true)
  const change: boolean = useSelector((state: State): boolean => state.storage.change)
  const [rendered, setRendered] = useState<boolean>(false)
  const dates: Array<[]> = useSelector((state: State): Array<[]> => state.data.dates)
  const currentIndex: number = useSelector((state: State): number => state.data.currentIndex)
  const episodeStyle: string = useSelector((state: State): string => state.episodeStyle.episodeStyle)
  const checked: boolean[] = useSelector((state: State): boolean[] => state.data.checked)

  // nav的节点实例
  const navRef: RefObject<HTMLElement> = useRef<HTMLElement>(null)

  /**
   * @description 导航栏滚动的方法: 当按住`CTRL`键时可以对页面进行滚动，否则只滚动导航栏
   * @param {NavWheelEvent} event 导航栏滚动event
   */
  const handleScroll: (event: NavWheelEvent) => void = (event: NavWheelEvent): void => {
    if (event.ctrlKey) {
      const currentChecked: boolean[] = [...checked].fill(false)
      if (event.deltaY > 0) {
        if (currentIndex >= dates.length - 1) {
          return
        }

        currentChecked[currentIndex + 1] = true
        dispatch(setIndex(currentIndex + 1))
        handleChange(currentIndex + 1)
        dispatch(setChecked(currentIndex + 1))
      } else if (event.deltaY < 0) {
        if (currentIndex <= 0) {
          return
        }

        currentChecked[currentIndex - 1] = true
        dispatch(setIndex(currentIndex - 1))
        handleChange(currentIndex - 1)
        dispatch(setChecked(currentIndex - 1))
      }
    } else {
      const x: number = event.deltaY + navRef.current.scrollLeft
      navRef.current.scrollTo({ left: x, behavior: "smooth" })
    }
  }

  const handleClick: (i: number) => void = (i: number): void => {
    const x: number =
      (navRef.current.childNodes[i] as HTMLElement).offsetLeft -
      navRef.current.clientWidth / 2 +
      (navRef.current.childNodes[i] as HTMLElement).clientWidth / 2

    if (rendered) {
      navRef.current.scrollTo({ left: x, behavior: "smooth" })
    } else {
      navRef.current.scrollTo({ left: x, behavior: "auto" })
      setRendered(true)
    }
  }

  /**
   * @description 处理改变的方法: 当索引改变时计算滚动的位置
   * @param {number} i 索引值
   */
  const handleChange: (i: number) => void = (i: number): void => {
    dispatch(setChecked(i))

    handleClick(i)

    dispatch(setIndex(i))
  }

  /**
   * @description 处理信息的方法: 根据不同的剧集类别发送不同的通信
   */
  const handleData: () => void = (): void => {
    switch (episodeStyle) {
      case "all":
        dispatch(getAnimeDates())
        break

      case "anime":
        dispatch(getAnimeDates())
        break

      case "guochuang":
        dispatch(getGuoChuangDates())
        break
    }
  }

  // 当日期信息改变时: 发送通信/设置加载动画/设置索引值为中间值
  useEffect((): void => {
    if (dates.length) {
      setLoading(false)
    } else {
      setLoading(true)
      handleData()
    }

    if (dates.length && currentIndex !== Math.floor(dates.length / 2)) {
      dispatch(setIndex(Math.floor(dates.length / 2)))
    }
  }, [dates.length])

  // 当剧集类别改变时/当存储信息改变时: 发送通信
  useEffect((): void => {
    if (dates.length) {
      handleData()
    }
  }, [episodeStyle, change])

  // 当索引值改变时/当加载动画改变时: 触发处理改变的方法
  useEffect((): void => {
    if (typeof currentIndex !== "undefined" && dates.length && !loading) {
      handleChange(currentIndex)
    }
  }, [currentIndex, loading])

  // 导航栏元素
  const navItems: ReactElement[] = dates?.map(
    (item: NavItem, index: number): ReactElement => (
      <NavItem
        onChange={(): void => handleChange(index)}
        onClick={(): void => handleClick(index)}
        key={item.date_ts}
        current={index}
        date={item.date}
        day={toChineseDay(item.day_of_week)}
        today={item.is_today}
        name="nav-item"
        for={item.date_ts}
        checked={checked[index]}
        darkMode={props.darkMode}
      />
    ),
  )

  if (loading) {
    return (
      <NavDefault
        ref={navRef}
        className={style.nav}
        darkMode={props.darkMode}
      />
    )
  }

  return (
    <Nav
      onWheel={(e: NavWheelEvent): void => handleScroll(e)}
      ref={navRef}
      className={style.nav}
      darkMode={props.darkMode}
    >
      {navItems}
      <Hover index={currentIndex} />
    </Nav>
  )
}

export default NavBar
