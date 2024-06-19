import { forwardRef } from "react"
import type React from "react"

import { formatNum } from "~/utils"

import Info from "./Info"
import style from "./style.module.scss"
import { FooterProps } from "./type"

/**
 * @description 卡片底部组件
 * @param {FooterProps} props 卡片底部组件Props
 * @param {React.Ref<HTMLDivElement>} ref 卡片底部组件ref
 * @return {*}  {React.ReactElement}
 */
function Footer(props: FooterProps, ref: React.Ref<HTMLDivElement>): React.ReactElement {
  const { likes, coins, favorite, share, reply } = props

  return (
    <div
      ref={ref}
      className={style["footer"]}
    >
      <Info
        likes={formatNum(likes)}
        coins={formatNum(coins)}
        favorite={formatNum(favorite)}
        share={formatNum(share)}
        reply={formatNum(reply)}
      />
    </div>
  )
}

export default forwardRef(Footer)
