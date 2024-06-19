import { forwardRef } from "react"
import type React from "react"

import { IconFont } from "~/components/base"

import style from "./style.module.scss"
import type { IconType, InfoProps } from "./types"

// 组件图标信息
const ICONS_INFO: IconType[] = [
  { name: "点赞", icon: "like", prop: "likes" },
  { name: "投币", icon: "coins", prop: "coins" },
  { name: "收藏", icon: "favorite", prop: "favorite" },
  { name: "分享", icon: "share", prop: "share" },
  { name: "评论", icon: "reply", prop: "reply" },
]

/**
 * @description 信息组件
 * @param {InfoProps} props 信息Props
 * @param {React.Ref<HTMLDivElement>} ref 信息组件ref
 * @return {*}  {React.ReactElement}
 */
function Info(props: InfoProps, ref: React.Ref<HTMLDivElement>): React.ReactElement {
  return (
    <div
      ref={ref}
      className={style["info"]}
    >
      {ICONS_INFO.map(
        ({ name, icon, prop }: IconType): React.ReactElement => (
          <span
            key={icon}
            title={name}
          >
            <IconFont
              icon={icon}
              size="20px"
              block
            />
            {props[prop]}
          </span>
        ),
      )}
    </div>
  )
}

export default forwardRef(Info)
