import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useSelector } from "react-redux"

import RefreshButton from "~/components/Buttons/RefreshButton"

import style from "./style.module.scss"

/**
 * @description 断连提示组件
 * @param {DarkModeProps} props 深色主题 [可选]
 * @return {*}  {React.ReactElement}
 */
function Disconnection(props: DarkModeProps): React.ReactElement {
  // 状态
  const isError: boolean = useSelector((state: State): boolean => state.data.isError)

  if (isError) {
    return (
      <div className={style.refresh}>
        <RefreshButton darkMode={props.darkMode} />
      </div>
    )
  }

  return (
    <div
      className={style.disconnection}
      title="加载中"
    >
      <FontAwesomeIcon
        icon={"compact-disc"}
        size="2xl"
        spin
      />
    </div>
  )
}

export default Disconnection
