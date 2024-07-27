import type React from "react"
import { forwardRef, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { CSSTransitionClassNames } from "react-transition-group/CSSTransition"

import { Row, Switch } from "~/components/base"
import withTransition from "~/hocs/withTransition"
import type { ComponentWithTransition } from "~/hocs/withTransition"
import type { AppDispatch, AppState } from "~/store"
import { setAutoTheme } from "~/store/features/theme"

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
const TEXT = "自动"

/**
 * @description 获取提示文本
 * @param {number} am 早上时间
 * @param {number} pm 晚上时间
 * @return {*}  {string} 提示文本
 */
function getTips(am: number, pm: number): string {
  const time: number = new Date().getHours()

  let tips: string
  if (am <= time && time < pm) {
    tips = `${am}:00 - ${pm}:00 保持浅色主题`
  } else {
    tips = `${pm}:00 - ${am}:00 保持深色主题`
  }

  return tips
}

// 过渡动画提示组件
const TipsWithTransition: ComponentWithTransition<TipsProps, HTMLDivElement> = withTransition<
  TipsProps,
  HTMLDivElement
>(Tips, CLASSNAMES)

/**
 * @description 自动更换主题行组件
 * @param {unknown} _props 自动更换主题行组件Props
 * @param {React.Ref<HTMLDivElement>} ref 自动更换主题行组件ref
 * @return {*}  {React.ReactElement}
 */
function AutoThemeRow(_props: unknown, ref: React.Ref<HTMLDivElement>): React.ReactElement {
  const dispatch: AppDispatch = useDispatch()

  // 状态
  const auto: boolean = useSelector((state: AppState): boolean => state.theme.auto)
  const am: number = useSelector((state: AppState): number => state.theme.am)
  const pm: number = useSelector((state: AppState): number => state.theme.pm)

  /**
   * @description 处理改变的方法: 切换自动更换主题的状态
   */
  const handleSwitch: () => void = useCallback((): void => {
    dispatch(setAutoTheme(!auto))
  }, [auto, dispatch])

  return (
    <div
      ref={ref}
      className={style["container"]}
    >
      <Row text={TEXT}>
        <Switch
          id="auto-switch"
          onChange={handleSwitch}
          checked={auto}
        />
      </Row>
      <TipsWithTransition
        inProp={auto}
        unmountOnExit
      >
        {getTips(am, pm)}
      </TipsWithTransition>
    </div>
  )
}

export default forwardRef(AutoThemeRow)
