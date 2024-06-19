import { forwardRef } from "react"
import type React from "react"

import { ButtonBox, RoundButtonDiv } from "./components"
import style from "./style.module.scss"
import type { RoundButtonProps } from "./types"

/**
 * @description 按钮组件
 * @param {RoundButtonProps} props 按钮Props
 * @param {React.Ref<HTMLButtonElement>} ref 按钮ref
 * @return {*}  {React.ReactElement}
 */
function RoundButton(props: RoundButtonProps, ref: React.Ref<HTMLButtonElement>): React.ReactElement {
  const { children, onClick, title, clickable = true } = props

  // 点击事件
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = clickable ? onClick : null

  return (
    <RoundButtonDiv
      className={style["round-button"]}
      title={title}
      clickable={clickable}
    >
      <ButtonBox
        ref={ref}
        className={style["round-box"]}
        onClick={handleClick}
        clickable={clickable}
      >
        {children}
      </ButtonBox>
    </RoundButtonDiv>
  )
}

export default forwardRef(RoundButton)
