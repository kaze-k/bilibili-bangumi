import type React from "react"
import { forwardRef, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { CSSTransitionClassNames } from "react-transition-group/CSSTransition"

import { withTransition } from "~/hocs"
import type { ComponentWithTransition } from "~/hocs"
import type { AppDispatch, AppState } from "~/store"
import { setNotice } from "~/store/features/notice"

import style from "../style.module.scss"
import transition from "../transition.module.scss"
import AnimeRow from "./AnimeRow"
import AutoCleanRow from "./AutoCleanRow"
import GuoChuangRow from "./GuoChuangRow"
import SilentRow from "./SlientRow"
import SubscribeRow from "./SubscribeRow"

// 行组件标题文本
const TITLE_TEXT = "通知"

// 过渡动画类名
const CLASSNAMES: CSSTransitionClassNames = {
  enter: transition["enter"],
  enterActive: transition["enter-active"],
  exit: transition["exit"],
  exitActive: transition["exit-active"],
}

// 过渡动画番剧通知行组件
const AnimeRowWithTransition: ComponentWithTransition<unknown, HTMLDivElement> = withTransition<
  unknown,
  HTMLDivElement
>(AnimeRow, CLASSNAMES)

// 过渡动画国创通知行组件
const GuoChuangRowWithTransition: ComponentWithTransition<unknown, HTMLDivElement> = withTransition<
  unknown,
  HTMLDivElement
>(GuoChuangRow, CLASSNAMES)

// 过渡动画静默通知行组件
const SilentRowWithTransition: ComponentWithTransition<unknown, HTMLDivElement> = withTransition<
  unknown,
  HTMLDivElement
>(SilentRow, CLASSNAMES)

// 过渡动画自动清除通知行组件
const AutoCleanRowWithTransition: ComponentWithTransition<unknown, HTMLDivElement> = withTransition<
  unknown,
  HTMLDivElement
>(AutoCleanRow, CLASSNAMES)

/**
 * @description 通知行组件
 * @param {unknown} _props 通知行Props
 * @param {React.Ref<HTMLDivElement>} ref 通知行ref
 * @return {*}  {React.ReactElement}
 */
function NoticeRow(_props: unknown, ref: React.Ref<HTMLDivElement>): React.ReactElement {
  const dispatch: AppDispatch = useDispatch()

  // 状态
  const notice: boolean = useSelector((state: AppState): boolean => state.notice.toggle)
  const animeNotice: boolean = useSelector((state: AppState): boolean => state.notice.animeNotice)
  const guochuangNotice: boolean = useSelector((state: AppState): boolean => state.notice.guochuangNotice)

  // 当番剧通知状态改变时/当国创通知状态改变时: 切换通知状态(番剧通知和国创通知都关闭时, 将通知关闭)
  useEffect(() => {
    if (notice && !animeNotice && !guochuangNotice) {
      dispatch(setNotice(!notice))
    }
  }, [notice, animeNotice, guochuangNotice, dispatch])

  return (
    <div
      ref={ref}
      className={style["wrapper"]}
    >
      <div className={style["title"]}>{TITLE_TEXT}</div>
      <SubscribeRow />
      <AnimeRowWithTransition
        inProp={notice}
        unmountOnExit
      />
      <GuoChuangRowWithTransition
        inProp={notice}
        unmountOnExit
      />
      <SilentRowWithTransition
        inProp={notice}
        unmountOnExit
      />
      <AutoCleanRowWithTransition
        inProp={notice}
        unmountOnExit
      />
    </div>
  )
}

export default forwardRef(NoticeRow)
