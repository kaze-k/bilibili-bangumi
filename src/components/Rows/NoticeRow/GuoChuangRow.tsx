import { composeRef } from "rc-util/lib/ref"
import { forwardRef, useCallback, useRef } from "react"
import type React from "react"
import { useDispatch, useSelector } from "react-redux"
import { CSSTransition } from "react-transition-group"
import type { CSSTransitionClassNames } from "react-transition-group/CSSTransition"

import { Row, Switch } from "~/components/base"
import type { AppDispatch, AppState } from "~/store"
import { setGuoChuangNotice } from "~/store/features/notice"

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
const TEXT = "国创"

/**
 * @description 国创通知行组件
 * @param {unknown} _props 国创通知行组件Props
 * @param {React.Ref<HTMLDivElement>} ref 国创通知行组件ref
 * @return {*}  {React.ReactElement}
 */
function GuoChuangRow(_props: unknown, ref: React.Ref<HTMLDivElement>): React.ReactElement {
  const dispatch: AppDispatch = useDispatch()

  // 状态
  const notice: boolean = useSelector((state: AppState): boolean => state.notice.toggle)
  const guochuangNotice: boolean = useSelector((state: AppState): boolean => state.notice.guochuangNotice)

  // 节点实例
  const nodeRef: React.Ref<HTMLDivElement> = useRef<HTMLDivElement>(null)

  /**
   * @description 处理切换的方法: 切换国创通知开关
   */
  const handleSwitch: () => void = useCallback((): void => {
    dispatch(setGuoChuangNotice(!guochuangNotice))
  }, [guochuangNotice, dispatch])

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
            id="guochuang-notice-switch"
            onChange={handleSwitch}
            checked={guochuangNotice}
          />
        </Row>
      </div>
    </CSSTransition>
  )
}

export default forwardRef(GuoChuangRow)
