import { useDispatch, useSelector } from "react-redux"

import Row from "~/components/common/Row"
import Switch from "~/components/common/Switch"
import { toggleAutoTheme, toggleDarkMode, toggleSysTheme } from "~/store/features/theme"
import { formatTime } from "~/utils"

import style from "./style.module.scss"

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

  const text = "深色主题"

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

/**
 * @description 自动更换主题行组件
 * @param {DarkModeProps} props 深色主题Props
 * @param {boolean} props.darkMode 深色主题 [可选]
 * @return {*}  {React.ReactElement}
 */
function AutoThemeRow(props: DarkModeProps): React.ReactElement {
  const dispatch: Dispatch = useDispatch()

  // 状态
  const auto: boolean = useSelector((state: State): boolean => state.theme.auto)
  const am: number = useSelector((state: State): number => state.theme.am)
  const pm: number = useSelector((state: State): number => state.theme.pm)

  const text = "自动"

  const time: number = new Date().getHours()
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

  const tipsElement: React.ReactElement = <div className={style.tips}>{tips}</div>

  return (
    <>
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
      {auto && tipsElement}
    </>
  )
}

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

  const text = "跟随系统"

  /**
   * @description 处理改变的方法: 切换跟随系统主题的状态
   */
  const handleSwitch: () => void = (): void => {
    dispatch(toggleSysTheme())
  }

  let showAuto: React.ReactElement
  if (!system) {
    showAuto = (
      <div className={style.container}>
        <AutoThemeRow darkMode={props.darkMode} />
      </div>
    )
  }

  return (
    <div>
      <div className={style.container}>
        <div>
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
      </div>
      {showAuto}
    </div>
  )
}

/**
 * @description 主题行组件
 * @param {DarkModeProps} props 深色主题Props
 * @param {boolean} props.darkMode 深色主题 [可选]
 * @return {*}  {React.ReactElement}
 */
function ThemeRow(props: DarkModeProps): React.ReactElement {
  const titleText = "外观"

  return (
    <div className={style.wrapper}>
      <div className={style.title_text}>{titleText}</div>
      <DarkModeThemeRow darkMode={props.darkMode} />
      <SystemThemeRow darkMode={props.darkMode} />
    </div>
  )
}

export default ThemeRow
