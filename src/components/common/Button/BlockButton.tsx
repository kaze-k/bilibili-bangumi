import { BlockButtonDiv, ButtonBox } from "./components"
import style from "./style.module.scss"

/**
 * @description 块状按钮组件
 * @param {BlockButtonProps} props 按钮Props
 * @param {React.ReactElement | string} props.children 子组件
 * @param {React.MouseEventHandler<HTMLAnchorElement>} props.onClick 点击事件 [可选]
 * @param {string} props.title 标题 [可选]
 * @param {boolean} props.darkMode 深色主题 [可选]
 * @param {string} props.btnHeight 按钮高度 [可选]
 * @param {BtnTheme} props.btnTheme 按钮颜色主题 [可选]
 * @param {boolean} props.clickable 是否可点击
 * @return {*}  {React.ReactElement}
 */
function BlockButton(props: BlockButtonProps): React.ReactElement {
  const clickable: boolean = props.clickable ?? true

  return (
    <BlockButtonDiv
      className={style.block_button}
      title={props.title}
      darkMode={props.darkMode}
      clickable={clickable}
      btnTheme={props.btnTheme}
    >
      <ButtonBox
        onClick={clickable ? props.onClick : null}
        className={style.block_box}
        clickable={clickable}
        btnHeight={props.btnHeight}
        block
      >
        {props.children}
      </ButtonBox>
    </BlockButtonDiv>
  )
}

export default BlockButton
