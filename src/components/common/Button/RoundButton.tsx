import { ButtonBox, ButtonDiv } from "./components"
import style from "./style.module.scss"

/**
 * @description 按钮组件
 * @param {ButtonProps} props 按钮Props
 * @param {React.ReactElement | string} props.children 子组件
 * @param {React.MouseEventHandler<HTMLAnchorElement>} props.onClick 点击事件 [可选]
 * @param {string} props.title 标题 [可选]
 * @param {boolean} props.darkMode 深色主题 [可选]
 * @param {boolean} props.clickable 是否可点击
 * @return {*}  {React.ReactElement}
 */
function RoundButton(props: ButtonProps): React.ReactElement {
  const clickable: boolean = props.clickable ?? true

  return (
    <ButtonDiv
      className={style.button}
      title={props.title}
      darkMode={props.darkMode}
      clickable={clickable}
    >
      <ButtonBox
        onClick={clickable ? props.onClick : null}
        className={style.icon_box}
        clickable={clickable}
      >
        {props.children}
      </ButtonBox>
    </ButtonDiv>
  )
}

export default RoundButton
