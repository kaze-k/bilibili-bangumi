import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"

import style from "./style.module.scss"

/**
 * @description 错误页面组件
 * @return {*}  {React.ReactElement}
 */
function ErrorPage(): React.ReactElement {
  const text = "加载失败!"

  return (
    <div className={style.error}>
      <FontAwesomeIcon
        icon={["far", "dizzy"]}
        size="2xl"
        className={style.icon}
      />
      <span>{text}</span>
    </div>
  )
}

export default ErrorPage
