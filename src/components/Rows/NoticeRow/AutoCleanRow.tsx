import { composeRef } from "rc-util/lib/ref"
import { forwardRef, useCallback, useRef } from "react"
import type React from "react"
import { useDispatch, useSelector } from "react-redux"
import { CSSTransition } from "react-transition-group"
import type { CSSTransitionClassNames } from "react-transition-group/CSSTransition"

import { Row, Switch } from "~/components/base"
import type { AppDispatch, AppState } from "~/store"
import { setAutoClear } from "~/store/features/notice"
import { toTime } from "~/utils"

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
const TEXT = "自动清除通知"

/**
 * @description 自动清除通知行组件
 * @param {unknown} _props 自动清除通知行组件Props
 * @param {React.Ref<HTMLDivElement>} ref 自动清除通知行组件ref
 * @return {*}  {React.ReactElement}
 */
function AutoCleanRow(_props: unknown, ref: React.Ref<HTMLDivElement>): React.ReactElement {
  const dispatch: AppDispatch = useDispatch()

  // 状态
  const notice: boolean = useSelector((state: AppState): boolean => state.notice.toggle)
  const autoClear: boolean = useSelector((state: AppState): boolean => state.notice.autoClear)
  const timeout: number = useSelector((state: AppState): number => state.notice.timeout)

  // 节点实例
  const nodeRef: React.Ref<HTMLDivElement> = useRef<HTMLDivElement>(null)
  const tipsRef: React.Ref<HTMLDivElement> = useRef<HTMLDivElement>(null)

  // 提示文本
  const explain = `开启后，通知信息会在${toTime(timeout)}分钟后自动清除`
  const tips = `通知信息会在${toTime(timeout)}分钟后自动清除`

  /**
   * @description 处理切换的方法: 切换自动清除通知开关
   */
  const handleSwitch: () => void = useCallback((): void => {
    dispatch(setAutoClear(!autoClear))
  }, [autoClear, dispatch])

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
        <Row
          title={explain}
          text={TEXT}
        >
          <Switch
            id="auto-clean-notice-switch"
            onChange={handleSwitch}
            checked={autoClear}
          />
        </Row>
        <CSSTransition
          in={autoClear}
          timeout={500}
          classNames={CLASSNAMES}
          nodeRef={tipsRef}
          unmountOnExit
        >
          <div
            className={style["tips"]}
            ref={tipsRef}
          >
            {tips}
          </div>
        </CSSTransition>
      </div>
    </CSSTransition>
  )
}

export default forwardRef(AutoCleanRow)
