import { composeRef } from "rc-util/lib/ref"
import { forwardRef, useCallback, useRef } from "react"
import type React from "react"
import { useDispatch, useSelector } from "react-redux"
import { CSSTransition } from "react-transition-group"
import type { CSSTransitionClassNames } from "react-transition-group/CSSTransition"

import { Row, Switch } from "~/components/base"
import type { AppDispatch, AppState } from "~/store"
import { setAnimeNotice } from "~/store/features/notice"

import style from "../style.module.scss"
import transition from "../transition.module.scss"

// 过渡动画类名
const CLASSNAMES: CSSTransitionClassNames = {
  enter: transition["enter"],
  enterActive: transition["enter-active"],
  exit: transition["exit"],
  exitActive: transition["exit-active"],
}

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
  const notice: boolean = useSelector((state: AppState): boolean => state.notice.toggle)
  const animeNotice: boolean = useSelector((state: AppState): boolean => state.notice.animeNotice)

  // 节点实例
  const nodeRef: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null)

  /**
   * @description 处理切换的方法: 切换番剧通知的开关
   */
  const handleSwitch: () => void = useCallback((): void => {
    dispatch(setAnimeNotice(!animeNotice))
  }, [animeNotice, dispatch])

  return (
    <CSSTransition
      in={notice}
      timeout={500}
      classNames={CLASSNAMES}
      nodeRef={nodeRef}
      unmountOnExit
    >
      <div
        ref={composeRef(ref, nodeRef)}
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
    </CSSTransition>
  )
}

export default forwardRef(AnimeRow)
