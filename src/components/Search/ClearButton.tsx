import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { forwardRef, useCallback } from "react"
import type React from "react"

import style from "./style.module.scss"
import type { SearchClearButtonProps } from "./types"

/**
 * @description 搜索清除按钮
 * @param {SearchClearButtonProps} props 搜索清除按钮Props
 * @param {React.Ref<HTMLButtonElement>} ref 搜索清除按钮ref
 * @return {*}  {React.ReactElement}
 */
function ClearButton(props: SearchClearButtonProps, ref: React.Ref<HTMLButtonElement>): React.ReactElement {
  const { handle } = props

  const handleClear: () => void = useCallback((): void => handle(""), [handle])

  return (
    <button
      ref={ref}
      className={style["clear-button"]}
      onClick={handleClear}
    >
      <FontAwesomeIcon
        icon="circle-xmark"
        size="lg"
      />
    </button>
  )
}

export default forwardRef(ClearButton)
