import { useDispatch, useSelector } from "react-redux"

import Row from "~/components/common/Row"
import Switch from "~/components/common/Switch"
import { toggleSysTheme } from "~/store/features/theme"

import style from "../style.module.scss"

const text = "跟随系统"

/**
 * @description 跟随系统主题行组件
 * @param {DarkModeProps} props 深色主题Props
 * @param {boolean} props.darkMode 深色主题 [可选]
 * @return {*}  {React.ReactElement}
 */
function SystemThemeRow(props: DarkModeProps): React.ReactElement {
  const dispatch: Dispatch = useDispatch()

  // 状态
  const system: boolean = useSelector((state: State): boolean => state.theme.system)

  /**
   * @description 处理改变的方法: 切换跟随系统主题的状态
   */
  const handleSwitch: () => void = (): void => {
    dispatch(toggleSysTheme())
  }

  return (
    <div className={style.container}>
      <Row
        text={text}
        darkMode={props.darkMode}
      >
        <Switch
          id="system-switch"
          onChange={handleSwitch}
          checked={system}
          darkMode={props.darkMode}
        />
      </Row>
    </div>
  )
}

export default SystemThemeRow
