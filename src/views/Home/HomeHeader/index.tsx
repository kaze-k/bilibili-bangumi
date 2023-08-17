import NoticeButton from "~/components/Buttons/NoticeButton"
import SetupButton from "~/components/Buttons/SetupButton"
import SwitchThemeButton from "~/components/Buttons/SwitchThemeButton"
import Header from "~/components/common/Header"

import Search from "./Search"
import Select from "./Select"
import style from "./sytle.module.scss"

/**
 * @description 首页头部组件
 * @param {DarkModeProps} props 深色主题Props
 * @param {boolean} props.darkMode 深色主题 [可选]
 * @return {*}  {ReactElement}
 */
function HomeHeader(props: DarkModeProps): ReactElement {
  return (
    <Header
      className={style.header}
      darkMode={props.darkMode}
    >
      <div className={style.left}>
        <Select darkMode={props.darkMode} />
      </div>
      <div className={style.center}>
        <Search darkMode={props.darkMode} />
      </div>
      <div className={style.right}>
        <NoticeButton darkMode={props.darkMode} />
        <SwitchThemeButton darkMode={props.darkMode} />
        <SetupButton darkMode={props.darkMode} />
      </div>
    </Header>
  )
}

export default HomeHeader
