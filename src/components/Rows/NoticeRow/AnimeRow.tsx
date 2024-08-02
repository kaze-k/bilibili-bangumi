import type React from "react"
import { forwardRef, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"

import { Row, Switch } from "~/components/base"
import type { AppDispatch, AppState } from "~/store"
import { setAnimeNotice } from "~/store/features/notice"

import style from "../style.module.scss"

// 行组件文本
const TEXT = "番剧"

/**
 * @description 番剧通知行组件
 * @param {unknown} _props 番剧通知行Props
 * @param {React.Ref<HTMLDivElement>} ref 番剧通知行ref
 * @return {*}  {React.ReactElement}
 */
function AnimeRow(_props: unknown, ref: React.Ref<HTMLDivElement>): React.ReactElement {
  const dispatch: AppDispatch = useDispatch()

  // 状态
  const animeNotice: boolean = useSelector((state: AppState): boolean => state.notice.animeNotice)

  /**
   * @description 处理切换的方法: 切换番剧通知的开关
   */
  const handleSwitch: () => void = useCallback((): void => {
    dispatch(setAnimeNotice(!animeNotice))
  }, [animeNotice, dispatch])

  return (
    <div
      ref={ref}
      className={style["container"]}
    >
      <Row text={TEXT}>
        <Switch
          id="anime-notice-switch"
          onChange={handleSwitch}
          checked={animeNotice}
        />
      </Row>
    </div>
  )
}

export default forwardRef(AnimeRow)
