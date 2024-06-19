import { composeRef } from "rc-util/lib/ref"
import { forwardRef, useCallback, useRef } from "react"
import type React from "react"
import { useDispatch, useSelector } from "react-redux"
import { CSSTransition } from "react-transition-group"
import type { CSSTransitionClassNames } from "react-transition-group/CSSTransition"

import { Row, Switch } from "~/components/base"
import type { AppDispatch, AppState } from "~/store"
import { setAutoTheme } from "~/store/features/theme"

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

/**
 * @description 自动更换主题行组件
 * @param {unknown} _props 自动更换主题行组件Props
 * @param {React.Ref<HTMLDivElement>} ref 自动更换主题行组件ref
 * @return {*}  {React.ReactElement}
 */
function AutoThemeRow(_props: unknown, ref: React.Ref<HTMLDivElement>): React.ReactElement {
  const dispatch: AppDispatch = useDispatch()

  // 状态
  const system: boolean = useSelector((state: AppState): boolean => state.theme.system)
  const auto: boolean = useSelector((state: AppState): boolean => state.theme.auto)
  const am: number = useSelector((state: AppState): number => state.theme.am)
  const pm: number = useSelector((state: AppState): number => state.theme.pm)

  // 节点实例
  const nodeRef: React.Ref<HTMLDivElement> = useRef<HTMLDivElement>(null)
  const tipsRef: React.Ref<HTMLDivElement> = useRef<HTMLDivElement>(null)

  /**
   * @description 处理改变的方法: 切换自动更换主题的状态
   */
  const handleSwitch: () => void = useCallback((): void => {
    dispatch(setAutoTheme(!auto))
  }, [auto, dispatch])

  return (
    <CSSTransition
      in={!system}
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
            id="auto-switch"
            onChange={handleSwitch}
            checked={auto}
          />
        </Row>
        <CSSTransition
          in={auto}
          timeout={500}
          classNames={CLASSNAMES}
          nodeRef={tipsRef}
          unmountOnExit
        >
          <div
            className={style["tips"]}
            ref={tipsRef}
          >
            {getTips(am, pm)}
          </div>
        </CSSTransition>
      </div>
    </CSSTransition>
  )
}

export default forwardRef(AutoThemeRow)
