import type React from "react"
import { forwardRef } from "react"
import { useSelector } from "react-redux"
import type { CSSTransitionClassNames } from "react-transition-group/CSSTransition"

import withTransition from "~/hocs/withTransition"
import type { ComponentWithTransition } from "~/hocs/withTransition"
import { AppState } from "~/store"

import style from "../style.module.scss"
import transition from "../transition.module.scss"
import AutoThemeRow from "./AutoThemeRow"
import DarkModeThemeRow from "./DarkModeThemeRow"
import SystemThemeRow from "./SystemThemeRow"

// 行组件标题文本
const TITLE_TEXT = "外观"

// 过渡动画类名
const CLASSNAMES: CSSTransitionClassNames = {
  enter: transition["enter"],
  enterActive: transition["enter-active"],
  exit: transition["exit"],
  exitActive: transition["exit-active"],
}

// 过渡动画自动主题行组件
const AutoThemeRowWithTransition: ComponentWithTransition<unknown, HTMLDivElement> = withTransition<
  unknown,
  HTMLDivElement
>(AutoThemeRow, CLASSNAMES)

/**
 * @description 主题行组件
 * @param {unknown} _props 主题行组件Props
 * @param {React.Ref<HTMLDivElement>} ref 主题行组件ref
 * @return {*}  {React.ReactElement}
 */
function ThemeRow(_props: unknown, ref: React.Ref<HTMLDivElement>): React.ReactElement {
  // 状态
  const system: boolean = useSelector((state: AppState): boolean => state.theme.system)

  return (
    <div
      ref={ref}
      className={style["wrapper"]}
    >
      <div className={style["title"]}>{TITLE_TEXT}</div>
      <DarkModeThemeRow />
      <SystemThemeRow />
      <AutoThemeRowWithTransition
        inProp={!system}
        unmountOnExit
      />
    </div>
  )
}

export default forwardRef(ThemeRow)
