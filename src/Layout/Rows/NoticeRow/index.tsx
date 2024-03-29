import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { toggleNotice } from "~/store/features/notice"

import style from "../style.module.scss"
import AnimeRow from "./AnimeRow"
import AutoCleanRow from "./AutoCleanRow"
import GuoChuangRow from "./GuoChuangRow"
import SilentRow from "./SlientRow"
import SubscribeRow from "./SubscribeRow"

const titleText = "通知"

/**
 * @description 通知行组件
 * @param {DarkModeProps} props 深色主题Props [可选]
 * @return {*}  {React.ReactElement}
 */
function NoticeRow(props: DarkModeProps): React.ReactElement {
  const dispatch: Dispatch = useDispatch()

  // 状态
  const notice: boolean = useSelector((state: State): boolean => state.notice.toggle)
  const animeNotice: boolean = useSelector((state: State): boolean => state.notice.animeNotice)
  const guochuangNotice: boolean = useSelector((state: State): boolean => state.notice.guochuangNotice)

  // 当番剧通知状态改变时/当国创通知状态改变时: 切换通知状态(番剧通知和国创通知都关闭时, 将通知关闭)
  useEffect(() => {
    if (notice && !animeNotice && !guochuangNotice) {
      dispatch(toggleNotice())
    }
  }, [animeNotice, guochuangNotice])

  return (
    <div className={style.wrapper}>
      <div className={style.title}>{titleText}</div>
      <SubscribeRow darkMode={props.darkMode} />
      <AnimeRow darkMode={props.darkMode} />
      <GuoChuangRow darkMode={props.darkMode} />
      <SilentRow darkMode={props.darkMode} />
      <AutoCleanRow darkMode={props.darkMode} />
    </div>
  )
}

export default NoticeRow
