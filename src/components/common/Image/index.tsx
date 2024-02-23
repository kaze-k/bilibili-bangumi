import React from "react"

import not_found from "~/assets/images/not_found.jpg"

import style from "./style.module.scss"

/**
 * @description 图片组件
 * @param {ImageProps} props 图片Props
 * @param {string} props.img 图片地址 [可选]
 * @param {string} props.title 图片名称 [可选]
 * @return {*}  {React.ReactElement}
 */
function Image(props: ImageProps): React.ReactElement {
  return (
    <img
      className={style.img}
      src={props.img || not_found}
      title={props.img ? `${props.title}` : "图片暂时无法显示"}
      alt="番剧封面"
      draggable="false"
    />
  )
}

export default Image
