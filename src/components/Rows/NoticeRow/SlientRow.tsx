import { composeRef } from "rc-util/lib/ref"
import { forwardRef, useCallback, useRef } from "react"
import type React from "react"
import { useDispatch, useSelector } from "react-redux"
import { CSSTransition } from "react-transition-group"
import type { CSSTransitionClassNames } from "react-transition-group/CSSTransition"

import { Row, Switch } from "~/components/base"
import type { AppDispatch, AppState } from "~/store"
import { setSilent } from "~/store/features/notice"

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
const TEXT = "静默通知"
// 提示文本
const EXPLAIN = "开启后，在通知显示时不发出声音或震动"

/**
 * @description 静默通知行组件
 * @param {unknown} _props 静默通知行组件Props
 * @param {React.Ref<HTMLDivElement>} ref 静默通知行组件ref
 * @return {*}  {React.ReactElement}
 */
function SilentRow(_props: unknown, ref: React.Ref<HTMLDivElement>): React.ReactElement {
  const dispatch: AppDispatch = useDispatch()

  // 状态
  const notice: boolean = useSelector((state: AppState): boolean => state.notice.toggle)
  const silent: boolean = useSelector((state: AppState): boolean => state.notice.silent)

  // 节点实例
  const nodeRef: React.Ref<HTMLDivElement> = useRef<HTMLDivElement>(null)

  /**
   * @description 处理切换的方法: 切换静默通知开关
   */
  const handleSwitch: () => void = useCallback((): void => {
    dispatch(setSilent(!silent))
  }, [silent, dispatch])

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
          title={EXPLAIN}
          text={TEXT}
        >
          <Switch
            id="silent-notice-switch"
            onChange={handleSwitch}
            checked={silent}
          />
        </Row>
      </div>
    </CSSTransition>
  )
}

export default forwardRef(SilentRow)
