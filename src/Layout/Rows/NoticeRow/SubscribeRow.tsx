import { useDispatch, useSelector } from "react-redux"

import Row from "~/components/common/Row"
import Switch from "~/components/common/Switch"
import { disableNotice, enableNotice, toggleNotice } from "~/store/features/notice"

import style from "../style.module.scss"

const text = "追番"

/**
 * @description 追番行组件
 * @param {DarkModeProps} props 深色主题Props
 * @param {boolean} props.darkMode 深色主题 [可选]
 * @return {*}  {React.ReactElement}
 */
function SubscribeRow(props: DarkModeProps): React.ReactElement {
  const dispatch: Dispatch = useDispatch()

  // 状态
  const notice: boolean = useSelector((state: State): boolean => state.notice.toggle)

  /**
   * @description 处理切换的方法: 切换追番通知开关
   */
  const handleSwitch: () => void = (): void => {
    dispatch(toggleNotice())
    notice ? dispatch(disableNotice()) : dispatch(enableNotice())
  }

  return (
    <div className={style.container}>
      <Row
        text={text}
        darkMode={props.darkMode}
      >
        <Switch
          id="notice-switch"
          onChange={handleSwitch}
          checked={notice}
          darkMode={props.darkMode}
        />
      </Row>
    </div>
  )
}

export default SubscribeRow
