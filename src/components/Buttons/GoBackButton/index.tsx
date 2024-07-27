import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { forwardRef, useCallback } from "react"
import type React from "react"
import { useNavigate } from "react-router-dom"
import type { NavigateFunction } from "react-router-dom"

import { RoundButton } from "~/components/base"

// 按钮标题属性
const TITLE = "返回"

/**
 * @description 返回按钮组件
 * @param {unknown} _props 按钮props
 * @param {React.Ref<HTMLButtonElement>} ref 按钮ref
 * @return {*}  {React.ReactElement}
 */
function GoBackButton(_props: unknown, ref: React.Ref<HTMLButtonElement>): React.ReactElement {
  const navigation: NavigateFunction = useNavigate()

  /**
   * @description 返回的方法: 返回上一页并清除消息
   */
  const handleGoback: () => void = useCallback((): void => {
    navigation(-1)
  }, [navigation])

  return (
    <RoundButton
      ref={ref}
      title={TITLE}
      onClick={handleGoback}
    >
      <FontAwesomeIcon
        icon="chevron-left"
        size="xl"
      />
    </RoundButton>
  )
}

export default forwardRef(GoBackButton)
