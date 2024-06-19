import type React from "react"
import { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"

import { Main } from "~/components/base"
import type { AppDispatch, AppState } from "~/store"
import { setIndex } from "~/store/features/data"

import { Wrapper } from "./components"
import renderPages from "./render"
import style from "./style.module.scss"

/**
 * @description 内容组件
 * @return {*}  {React.ReactElement}
 */
function ContentMain(): React.ReactElement {
  const dispatch: AppDispatch = useDispatch()

  // 状态
  const episodes: [][] = useSelector((state: AppState): [][] => state.data.episodes)
  const dates: [][] = useSelector((state: AppState): [][] => state.data.dates)
  const currentIndex: number = useSelector((state: AppState): number => state.data.currentIndex)

  /**
   * @description 处理滚动的方法: 当按住`CTRL`键并滚动鼠标滚轮时滚动
   * @param {React.WheelEvent<HTMLElement>} event 滚动event
   */
  const handleScroll: (event: React.WheelEvent<HTMLElement>) => void = useCallback(
    (event: React.WheelEvent<HTMLElement>): void => {
      if (!event.ctrlKey) return
      if (event.deltaY > 0 && currentIndex < dates.length - 1) dispatch(setIndex(currentIndex + 1))
      else if (event.deltaY < 0 && currentIndex > 0) dispatch(setIndex(currentIndex - 1))
    },
    [currentIndex, dates.length, dispatch],
  )

  return (
    <Main className={style["main"]}>
      <Wrapper
        className={style["wrapper"]}
        index={currentIndex}
        onWheel={(e: React.WheelEvent<HTMLElement>): void => handleScroll(e)}
      >
        {renderPages(episodes)}
      </Wrapper>
    </Main>
  )
}

export default ContentMain
