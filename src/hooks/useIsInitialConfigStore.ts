import { isEqual } from "lodash"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

import { episodeStyleInitialState } from "~/store/features/episodeStyle"
import { noticeInitialState } from "~/store/features/notice"
import { themeInitialState } from "~/store/features/theme"

/**
 * @description 判断是否为初始设置hook
 * @return {*}  {boolean} 判断结果
 */
function useInitialConfigStore(): boolean {
  // 状态
  const [isInitial, setIsInitial] = useState<boolean>(false)
  const theme: ThemeState = useSelector((state: State): ThemeState => state.theme)
  const notice: NoticeState = useSelector((state: State): NoticeState => state.notice)
  const episodeStyle: EpisodeStyleState = useSelector((state: State): EpisodeStyleState => state.episodeStyle)

  // 初始值
  const themeInitial: ThemeState = themeInitialState()
  const noticeInitial: NoticeState = noticeInitialState()
  const episodeStyleInitial: EpisodeStyleState = episodeStyleInitialState()

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

    if (!isEqual(episodeStyle, episodeStyleInitial)) {
      setIsInitial(false)
      return
    }

    setIsInitial(true)
  }, [theme, notice, episodeStyle])

  return isInitial
}

export default useInitialConfigStore
