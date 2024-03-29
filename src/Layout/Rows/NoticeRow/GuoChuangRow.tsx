import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { CSSTransition } from "react-transition-group"
import type { CSSTransitionClassNames } from "react-transition-group/CSSTransition"

import Row from "~/components/common/Row"
import Switch from "~/components/common/Switch"
import { disableGuoChuangNotice, enableGuoChuangNotice, toggleGuoChuangNotice } from "~/store/features/notice"

import style from "../style.module.scss"
import transition from "../transition.module.scss"

// 过渡动画类名
const classNames: CSSTransitionClassNames = {
  enter: transition.enter,
  enterActive: transition.enter_active,
  exit: transition.exit,
  exitActive: transition.exit_active,
}

const text = "国创"

/**
 * @description 国创通知行组件
 * @param {DarkModeProps} props 深色主题Props
 * @param {boolean} props.darkMode 深色主题 [可选]
 * @return {*}  {React.ReactElement}
 */
function GuoChuangRow(props: DarkModeProps): React.ReactElement {
  const dispatch: Dispatch = useDispatch()

  // 状态
  const notice: boolean = useSelector((state: State): boolean => state.notice.toggle)
  const guochuangNotice: boolean = useSelector((state: State): boolean => state.notice.guochuangNotice)

  /**
   * @description 处理切换的方法: 切换国创通知开关
   */
  const handleSwitch: () => void = (): void => {
    dispatch(toggleGuoChuangNotice())
  }

  // 当国创通知状态改变时: 切换国创通知的开关
  useEffect(() => {
    guochuangNotice ? dispatch(enableGuoChuangNotice()) : dispatch(disableGuoChuangNotice())
  }, [guochuangNotice])

  return (
    <CSSTransition
      in={notice}
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
            id="guochuang-notice-switch"
            onChange={handleSwitch}
            checked={guochuangNotice}
            darkMode={props.darkMode}
          />
        </Row>
      </div>
    </CSSTransition>
  )
}

export default GuoChuangRow
