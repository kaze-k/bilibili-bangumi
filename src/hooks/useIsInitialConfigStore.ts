import { isEqual } from "lodash"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

import { episodeInitialState } from "~/store/features/episode"
import { noticeInitialState } from "~/store/features/notice"
import { themeInitialState } from "~/store/features/theme"

/**
 * @description 判断是否为初始设置hook
 * @return {*}  {boolean} 判断结果
 */
function useIsInitialConfigStore(): boolean {
  // 状态
  const [isInitial, setIsInitial] = useState<boolean>(false)
  const theme: ThemeState = useSelector((state: State): ThemeState => state.theme)
  const notice: NoticeState = useSelector((state: State): NoticeState => state.notice)
  const episode: EpisodeState = useSelector((state: State): EpisodeState => state.episode)

  // 初始值
  const themeInitial: ThemeState = themeInitialState()
  const noticeInitial: NoticeState = noticeInitialState()
  const episodeInitial: EpisodeState = episodeInitialState()

  // 当设置改变时: 判断是否为初始设置
  useEffect((): void => {
    if (!isEqual(theme, themeInitial)) {
      setIsInitial(false)
      return
    }

    if (!isEqual(notice, noticeInitial)) {
      setIsInitial(false)
      return
    }

    if (!isEqual(episode, episodeInitial)) {
      setIsInitial(false)
      return
    }

    setIsInitial(true)
  }, [theme, notice, episode])

  return isInitial
}

export default useIsInitialConfigStore
