import { useDispatch, useSelector } from "react-redux"
import { CSSTransition } from "react-transition-group"
import type { CSSTransitionClassNames } from "react-transition-group/CSSTransition"

import Row from "~/components/common/Row"
import Switch from "~/components/common/Switch"
import { toggleAutoClear } from "~/store/features/notice"
import { toTime } from "~/utils"

import style from "../style.module.scss"
import transition from "../transition.module.scss"

// 过渡动画类名
const classNames: CSSTransitionClassNames = {
  enter: transition.enter,
  enterActive: transition.enter_active,
  exit: transition.exit,
  exitActive: transition.exit_active,
}

const text = "自动清除通知"

/**
 * @description 自动清除通知行组件
 * @param {DarkModeProps} props 深色主题Props
 * @param {boolean} props.darkMode 深色主题 [可选]
 * @return {*}  {React.ReactElement}
 */
function AutoCleanRow(props: DarkModeProps): React.ReactElement {
  const dispatch: Dispatch = useDispatch()

  // 状态
  const notice: boolean = useSelector((state: State): boolean => state.notice.toggle)
  const autoClear: boolean = useSelector((state: State): boolean => state.notice.autoClear)
  const timeout: number = useSelector((state: State): number => state.notice.timeout)

  const explain = `开启后，通知信息会在${toTime(timeout)}分钟后自动清除`
  const tips = `通知信息会在${toTime(timeout)}分钟后自动清除`

  /**
   * @description 处理切换的方法: 切换自动清除通知开关
   */
  const handleSwitch: () => void = (): void => {
    dispatch(toggleAutoClear())
  }

  return (
    <CSSTransition
      in={notice}
      timeout={500}
      classNames={classNames}
      unmountOnExit
    >
      <div className={style.container}>
        <Row
          title={explain}
          text={text}
          darkMode={props.darkMode}
        >
          <Switch
            id="auto-clean-notice-switch"
            onChange={handleSwitch}
            checked={autoClear}
            darkMode={props.darkMode}
          />
        </Row>
        <CSSTransition
          in={autoClear}
          timeout={500}
          classNames={classNames}
          unmountOnExit
        >
          <div className={style.tips}>{tips}</div>
        </CSSTransition>
      </div>
    </CSSTransition>
  )
}

export default AutoCleanRow
