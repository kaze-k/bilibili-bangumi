import { useDispatch, useSelector } from "react-redux"

import Row from "~/components/common/Row"
import Switch from "~/components/common/Switch"
import { disableNotice, enableNotice, toggleNotice } from "~/store/features/notice"

import style from "./style.module.scss"

/**
 * @description 通知行组件
 * @param {DarkModeProps} props 深色主题Props
 * @param {boolean} props.darkMode 深色主题 [可选]
 * @return {*}  {ReactElement}
 */
function NoticeRow(props: DarkModeProps): ReactElement {
  const dispatch: Dispatch = useDispatch()

  const titleText: string = "通知"
  const text: string = "追番"

  // 状态
  const notice: boolean = useSelector((state: State): boolean => state.notice.notice)

  /**
   * @description 处理切换的方法: 切换通知开关
   */
  const handleSwitch: () => void = (): void => {
    dispatch(toggleNotice())
    notice ? dispatch(disableNotice()) : dispatch(enableNotice())
  }

  return (
    <div className={style.wrapper}>
      <div className={style.title_text}>{titleText}</div>
      <div className={style.content}>
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
    </div>
  )
}

export default NoticeRow
