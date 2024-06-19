import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { forwardRef } from "react"
import type React from "react"
import { useSelector } from "react-redux"

import type { AppState } from "~/store"

import style from "./style.module.scss"

/**
 * @description 断连提示组件
 * @param {unknown} _props 断连提示组件Props
 * @param {React.Ref<HTMLDivElement>} ref 断连提示组件ref
 * @return {*}  {React.ReactElement}
 */
function Disconnection(_props: unknown, ref: React.Ref<HTMLDivElement>): React.ReactElement {
  // 状态
  const isError: boolean = useSelector((state: AppState): boolean => state.data.isError)

  if (isError) {
    return (
      <div
        ref={ref}
        className={style["disconnection"]}
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
      ref={ref}
      className={style["disconnection"]}
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

export default forwardRef(Disconnection)
