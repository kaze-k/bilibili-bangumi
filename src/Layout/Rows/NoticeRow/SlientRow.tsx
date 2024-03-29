import { useDispatch, useSelector } from "react-redux"
import { CSSTransition } from "react-transition-group"
import type { CSSTransitionClassNames } from "react-transition-group/CSSTransition"

import Row from "~/components/common/Row"
import Switch from "~/components/common/Switch"
import { toggleSilent } from "~/store/features/notice"

import style from "../style.module.scss"
import transition from "../transition.module.scss"

// 过渡动画类名
const classNames: CSSTransitionClassNames = {
  enter: transition.enter,
  enterActive: transition.enter_active,
  exit: transition.exit,
  exitActive: transition.exit_active,
}

const text = "静默通知"
const explain = "开启后，在通知显示时不发出声音或震动"

/**
 * @description 静默通知行组件
 * @param {DarkModeProps} props 深色主题Props
 * @param {boolean} props.darkMode 深色主题 [可选]
 * @return {*}  {React.ReactElement}
 */
function SilentRow(props: DarkModeProps): React.ReactElement {
  const dispatch: Dispatch = useDispatch()

  // 状态
  const notice: boolean = useSelector((state: State): boolean => state.notice.toggle)
  const silent: boolean = useSelector((state: State): boolean => state.notice.silent)

  /**
   * @description 处理切换的方法: 切换静默通知开关
   */
  const handleSwitch: () => void = (): void => {
    dispatch(toggleSilent())
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
            id="silent-notice-switch"
            onChange={handleSwitch}
            checked={silent}
            darkMode={props.darkMode}
          />
        </Row>
      </div>
    </CSSTransition>
  )
}

export default SilentRow
