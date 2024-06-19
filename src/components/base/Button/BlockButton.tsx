import { forwardRef } from "react"
import type React from "react"

import { BlockButtonDiv, ButtonBox } from "./components"
import style from "./style.module.scss"
import type { BlockButtonProps } from "./types"

/**
 * @description 块状按钮组件
 * @param {BlockButtonProps} props 按钮Props
 * @param {React.Ref<HTMLButtonElement>} ref 按钮ref
 * @return {*}  {React.ReactElement}
 */
function BlockButton(props: BlockButtonProps, ref: React.Ref<HTMLButtonElement>): React.ReactElement {
  const { children, onClick, title, btnWidth, btnHeight, clickable = true } = props

  // 点击事件
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = clickable ? onClick : null

  return (
    <BlockButtonDiv
      className={style["block-button"]}
      title={title}
      clickable={clickable}
    >
      <ButtonBox
        ref={ref}
        className={style["block-box"]}
        onClick={handleClick}
        clickable={clickable}
        btnWidth={btnWidth}
        btnHeight={btnHeight}
        block
      >
        {children}
      </ButtonBox>
    </BlockButtonDiv>
  )
}

export default forwardRef(BlockButton)
