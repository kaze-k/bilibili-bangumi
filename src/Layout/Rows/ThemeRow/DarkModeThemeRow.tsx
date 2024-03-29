import { useDispatch, useSelector } from "react-redux"

import Row from "~/components/common/Row"
import Switch from "~/components/common/Switch"
import { toggleDarkMode } from "~/store/features/theme"

import style from "../style.module.scss"

const text = "深色主题"

/**
 * @description 深色主题行组件
 * @param {DarkModeProps} props 深色主题Props
 * @param {boolean} props.darkMode 深色主题 [可选]
 * @return {*}  {React.ReactElement}
 */
function DarkModeThemeRow(props: DarkModeProps): React.ReactElement {
  const dispatch: Dispatch = useDispatch()

  // 状态
  const darkMode: boolean = useSelector((state: State): boolean => state.theme.darkMode)

  /**
   * @description 处理改变的方法: 切换深色主题的状态
   */
  const handlChange: () => void = (): void => {
    dispatch(toggleDarkMode())
  }

  return (
    <div className={style.container}>
      <Row
        text={text}
        darkMode={props.darkMode}
      >
        <Switch
          id="dark-switch"
          onChange={handlChange}
          checked={darkMode}
          darkMode={props.darkMode}
        />
      </Row>
    </div>
  )
}

export default DarkModeThemeRow
