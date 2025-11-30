import { forwardRef } from "react"
import type React from "react"

import Tag from "./Tag"
import Time from "./Time"
import style from "./style.module.scss"
import type { HeaderProps } from "./type"

/**
 * @description 卡片头部组件
 * @param {HeaderProps} props 卡片头部组件Props
 * @param {React.Ref<HTMLDivElement>} ref 卡片头部组件ref
 * @return {*}  {React.ReactElement}
 */
function Header(props: HeaderProps, ref: React.Ref<HTMLDivElement>): React.ReactElement {
  const { styles, pub_time } = props

  return (
    <div
      ref={ref}
      className={style["header"]}
    >
      <Time>{pub_time}</Time>
      <div>
        {styles?.map(
          (style: string): React.ReactElement => (
            <Tag key={style}>{style}</Tag>
          ),
        )}
      </div>
    </div>
  )
}

export default forwardRef(Header)
