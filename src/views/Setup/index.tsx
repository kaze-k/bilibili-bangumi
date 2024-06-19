import type React from "react"

import { SetupContent } from "~/Layout/Contents"
import { SetupHeader } from "~/Layout/Headers"

/**
 * @description 设置页组件
 * @return {*}  {React.ReactElement}
 */
function Setup(): React.ReactElement {
  return (
    <>
      <SetupHeader />
      <SetupContent />
    </>
  )
}

export default Setup
