import type React from "react"
import { forwardRef } from "react"

import { PageProps } from "./types"

/**
 * @description 页面组件
 * @param {PageProps} props 页面Props
 * @return {*}  {React.ReactElement}
 */
function Page(props: PageProps, ref: React.Ref<HTMLDivElement>): React.ReactElement {
  const { children, empty, data, className } = props

  return (
    <div
      className={className}
      ref={ref}
    >
      {data?.length ? children : empty}
    </div>
  )
}

export default forwardRef(Page)
