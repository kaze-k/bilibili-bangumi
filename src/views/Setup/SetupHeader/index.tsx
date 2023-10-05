import GoBackButton from "~/components/Buttons/GobackButton"
import SwitchThemeButton from "~/components/Buttons/SwitchThemeButton"
import Header from "~/components/common/Header"

import style from "./style.module.scss"

/**
 * @description 设置页头部组件
 * @param {DarkModeProps} props 深色主题Props
 * @param {boolean} props.darkMode 深色主题 [可选]
 * @return {*}  {React.ReactElement}
 */
function SetupHeader(props: DarkModeProps): React.ReactElement {
  const header = "设置"

  return (
    <Header
      className={style.header}
      darkMode={props.darkMode}
    >
      <div className={style.content}>
        <div className={style.item}>
          <GoBackButton darkMode={props.darkMode} />
        </div>
      </div>
      <div className={style.title}>
        <span>{header}</span>
      </div>
      <div className={style.content}>
        <div className={style.item}>
          <SwitchThemeButton darkMode={props.darkMode} />
        </div>
      </div>
    </Header>
  )
}

export default SetupHeader
