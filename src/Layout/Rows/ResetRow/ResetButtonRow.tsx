import ResetButton from "~/components/Buttons/ResetButton"

import style from "../style.module.scss"

/**
 * @description 重置按钮行组件
 * @param {DarkModeProps} props 深色主题Props
 * @param {boolean} props.darkMode 深色主题 [可选]
 * @return {*}  {React.ReactElement}
 */
function ResetButtonRow(props: DarkModeProps): React.ReactElement {
  return (
    <div className={style.button_container}>
      <ResetButton darkMode={props.darkMode} />
    </div>
  )
}

export default ResetButtonRow
