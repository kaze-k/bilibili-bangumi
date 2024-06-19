import { isEqual, omit } from "lodash"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

import type { AppState } from "~/store"
import { episodeInitialState } from "~/store/features/episode"
import { noticeInitialState } from "~/store/features/notice"
import { themeInitialState } from "~/store/features/theme"
import type { EpisodeState, NoticeState, ThemeState } from "~/store/types"

/**
 * @description 判断是否为初始状态hook
 * @return {*}  {boolean} 判断结果
 */
function useIsInitialState(): boolean {
  // 状态
  const [isInitial, setIsInitial] = useState<boolean>(false)
  const theme: ThemeState = useSelector((state: AppState): ThemeState => state.theme)
  const notice: NoticeState = useSelector((state: AppState): NoticeState => state.notice)
  const episode: EpisodeState = useSelector((state: AppState): EpisodeState => state.episode)

  // 初始值
  const themeInitial: ThemeState = themeInitialState()
  const noticeInitial: NoticeState = noticeInitialState()
  const episodeInitial: EpisodeState = episodeInitialState()

  // 当设置改变时: 判断是否为初始设置
  useEffect((): void => {
    const isThemeInitial: boolean = isEqual(omit(theme, ["_persist"]), themeInitial)
    const isNoticeInitial: boolean = isEqual(omit(notice, ["_persist"]), noticeInitial)
    const isEpisodeInitial: boolean = isEqual(omit(episode, ["_persist"]), episodeInitial)

    setIsInitial(isThemeInitial && isNoticeInitial && isEpisodeInitial)
  }, [episodeInitial, noticeInitial, themeInitial, theme, notice, episode])

  return isInitial
}

export default useIsInitialState
