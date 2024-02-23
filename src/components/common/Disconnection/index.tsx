import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { useSelector } from "react-redux"

import style from "./style.module.scss"

/**
 * @description 断连提示组件
 * @return {*}  {React.ReactElement}
 */
function Disconnection(): React.ReactElement {
  // 状态
  const isError: boolean = useSelector((state: State): boolean => state.data.isError)

  if (isError) {
    return (
      <div
        className={style.disconnection}
        title="加载失败"
      >
        <FontAwesomeIcon
          icon={"exclamation-circle"}
          size="2xl"
        />
      </div>
    )
  }

  return (
    <div
      className={style.disconnection}
      title="加载中"
    >
      <FontAwesomeIcon
        icon={"compact-disc"}
        size="2xl"
        spin
      />
    </div>
  )
}

export default Disconnection
