import { useDispatch, useSelector } from "react-redux"
import { CSSTransition } from "react-transition-group"
import type { CSSTransitionClassNames } from "react-transition-group/CSSTransition"

import Row from "~/components/common/Row"
import Switch from "~/components/common/Switch"
import { toggleAutoTheme } from "~/store/features/theme"
import { formatTime } from "~/utils"

import style from "../style.module.scss"
import transition from "../transition.module.scss"

// 过渡动画类名
const classNames: CSSTransitionClassNames = {
  enter: transition.enter,
  enterActive: transition.enter_active,
  exit: transition.exit,
  exitActive: transition.exit_active,
}

const text = "自动"
const time: number = new Date().getHours()

/**
 * @description 自动更换主题行组件
 * @param {DarkModeProps} props 深色主题Props
 * @param {boolean} props.darkMode 深色主题 [可选]
 * @return {*}  {React.ReactElement}
 */
function AutoThemeRow(props: DarkModeProps): React.ReactElement {
  const dispatch: Dispatch = useDispatch()

  // 状态
  const system: boolean = useSelector((state: State): boolean => state.theme.system)
  const auto: boolean = useSelector((state: State): boolean => state.theme.auto)
  const am: number = useSelector((state: State): number => state.theme.am)
  const pm: number = useSelector((state: State): number => state.theme.pm)

  let tips: string
  if (am <= time && time < pm) {
    tips = `${formatTime(am)} - ${formatTime(pm)} 保持浅色主题`
  } else {
    tips = `${formatTime(pm)} - ${formatTime(am)} 保持深色主题`
  }

  /**
   * @description 处理改变的方法: 切换自动更换主题的状态
   */
  const handleSwitch: () => void = (): void => {
    dispatch(toggleAutoTheme())
  }

  return (
    <CSSTransition
      in={!system}
      timeout={500}
      classNames={classNames}
      unmountOnExit
    >
      <div className={style.container}>
        <Row
          text={text}
          darkMode={props.darkMode}
        >
          <Switch
            id="auto-switch"
            onChange={handleSwitch}
            checked={auto}
            darkMode={props.darkMode}
          />
        </Row>
        <CSSTransition
          in={auto}
          timeout={300}
          classNames={classNames}
          unmountOnExit
        >
          <div className={style.tips}>{tips}</div>
        </CSSTransition>
      </div>
    </CSSTransition>
  )
}

export default AutoThemeRow
