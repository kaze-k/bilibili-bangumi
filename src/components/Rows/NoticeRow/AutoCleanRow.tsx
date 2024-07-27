import type React from "react"
import { forwardRef, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { CSSTransitionClassNames } from "react-transition-group/CSSTransition"

import { Row, Switch } from "~/components/base"
import withTransition from "~/hocs/withTransition"
import type { ComponentWithTransition } from "~/hocs/withTransition"
import type { AppDispatch, AppState } from "~/store"
import { setAutoClear } from "~/store/features/notice"
import { toTime } from "~/utils"

import { Tips } from "../components"
import style from "../style.module.scss"
import transition from "../transition.module.scss"
import type { TipsProps } from "../types"

// 过渡动画类名
const CLASSNAMES: CSSTransitionClassNames = {
  enter: transition["enter"],
  enterActive: transition["enter-active"],
  exit: transition["exit"],
  exitActive: transition["exit-active"],
}

// 行组件文本
const TEXT = "自动清除通知"

// 过渡动画提示组件
const TipsWithTransition: ComponentWithTransition<TipsProps, HTMLDivElement> = withTransition<
  TipsProps,
  HTMLDivElement
>(Tips, CLASSNAMES)

/**
 * @description 自动清除通知行组件
 * @param {unknown} _props 自动清除通知行组件Props
 * @param {React.Ref<HTMLDivElement>} ref 自动清除通知行组件ref
 * @return {*}  {React.ReactElement}
 */
function AutoCleanRow(_props: unknown, ref: React.Ref<HTMLDivElement>): React.ReactElement {
  const dispatch: AppDispatch = useDispatch()

  // 状态
  const autoClear: boolean = useSelector((state: AppState): boolean => state.notice.autoClear)
  const timeout: number = useSelector((state: AppState): number => state.notice.timeout)

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
    <div
      ref={ref}
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
      <TipsWithTransition
        inProp={autoClear}
        unmountOnExit
      >
        {tips}
      </TipsWithTransition>
    </div>
  )
}

export default forwardRef(AutoCleanRow)
